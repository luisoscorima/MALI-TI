/**
 * Aviso de caducidad de suscripción PAM — envío ~5 días antes desde pam@mali.pe
 *
 * Ejecutar una vez: configurarActivadoresPam()
 * Prueba manual: probarAvisoCaducidad()
 */

var DIAS_ANTES_AVISO_CADUCIDAD = 5;

var AVISO_CADUCIDAD = {
  PENDIENTE: 'PENDIENTE',
  ENVIADO: 'ENVIADO',
  ERROR_DATOS: 'ERROR_DATOS',
  ERROR_TEMP: 'ERROR_TEMP'
};

var AVISO_CADUCIDAD_DEFAULT = AVISO_CADUCIDAD.PENDIENTE;

/**
 * Revisa la hoja cada día (activador) y envía avisos cuando faltan 5 días o menos.
 */
function enviarAvisosCaducidadPendientes() {
  var sheet = getOrCreateSheet_();
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var col = indexRegistroHeaders_(headers);

  if (col.aviso_caducidad === -1 || col.fecha_caducidad === -1 || col.correo === -1) {
    throw new Error('Faltan columnas. Ejecuta setupSheet() primero.');
  }

  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return;

  var rows = sheet.getRange(2, 1, lastRow, headers.length).getValues();
  var resumen = { enviados: 0, aun_no_toca: 0, sin_fecha: 0, sin_pago: 0, error_datos: 0, error_temp: 0, omitidos: 0 };

  rows.forEach(function (row, i) {
    var rowIndex = i + 2;
    var estadoAviso = normalizarEstadoAvisoCaducidad_(row[col.aviso_caducidad]);

    if (!esEstadoAvisoProcesable_(estadoAviso)) {
      resumen.omitidos++;
      return;
    }

    if (!esPagoConfirmado_(row[col.estado_mercado_pago])) {
      resumen.sin_pago++;
      return;
    }

    var fechaCaducidad = row[col.fecha_caducidad];
    if (!fechaCaducidad) {
      resumen.sin_fecha++;
      return;
    }

    var diasRestantes = diasHastaCaducidad_(fechaCaducidad);
    if (diasRestantes === null) {
      setEstadoAvisoCaducidad_(sheet, rowIndex, col.aviso_caducidad, AVISO_CADUCIDAD.ERROR_DATOS);
      resumen.error_datos++;
      return;
    }

    if (diasRestantes > DIAS_ANTES_AVISO_CADUCIDAD || diasRestantes < 1) {
      resumen.aun_no_toca++;
      return;
    }

    var correo = String(row[col.correo] || '').trim();
    if (!esCorreoValido_(correo)) {
      setEstadoAvisoCaducidad_(sheet, rowIndex, col.aviso_caducidad, AVISO_CADUCIDAD.ERROR_DATOS);
      resumen.error_datos++;
      return;
    }

    var nombres = String(row[col.nombres] || '').trim();
    var apellidos = col.apellidos !== -1 ? String(row[col.apellidos] || '').trim() : '';
    var plan = String(row[col.plan] || '').trim();

    try {
      sendCaducidadEmail_(correo, nombres, apellidos, plan, fechaCaducidad, diasRestantes);
      setEstadoAvisoCaducidad_(sheet, rowIndex, col.aviso_caducidad, AVISO_CADUCIDAD.ENVIADO);
      resumen.enviados++;
    } catch (err) {
      Logger.log('Caducidad fila ' + rowIndex + ': ' + err.message);
      setEstadoAvisoCaducidad_(sheet, rowIndex, col.aviso_caducidad, AVISO_CADUCIDAD.ERROR_TEMP);
      resumen.error_temp++;
    }
  });

  Logger.log(
    'Caducidad — enviados: ' + resumen.enviados +
    ', aun_no_toca: ' + resumen.aun_no_toca +
    ', sin_fecha: ' + resumen.sin_fecha +
    ', sin_pago: ' + resumen.sin_pago +
    ', error_datos: ' + resumen.error_datos +
    ', error_temp: ' + resumen.error_temp +
    ', omitidos: ' + resumen.omitidos
  );
}

/**
 * Filas con pago confirmado pero sin fecha_caducidad (p. ej. registros antiguos).
 * Usa registrado_en + frecuencia como aproximación hasta integrar Mercado Pago.
 */
function rellenarFechasCaducidadFaltantes() {
  var sheet = getOrCreateSheet_();
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var col = indexRegistroHeaders_(headers);

  if (col.fecha_caducidad === -1) {
    throw new Error('Falta columna fecha_caducidad. Ejecuta setupSheet() primero.');
  }

  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return;

  var rows = sheet.getRange(2, 1, lastRow, headers.length).getValues();
  var actualizados = 0;

  rows.forEach(function (row, i) {
    if (row[col.fecha_caducidad]) return;
    if (!esPagoConfirmado_(row[col.estado_mercado_pago])) return;

    var inicio = row[col.registrado_en] || new Date();
    var frecuencia = row[col.frecuencia];
    var fecha = calcularFechaCaducidad_(inicio, frecuencia);

    if (!fecha) return;

    sheet.getRange(i + 2, col.fecha_caducidad + 1).setValue(fecha);
    actualizados++;
  });

  Logger.log('Fechas de caducidad rellenadas: ' + actualizados);
}

/**
 * Crea los activadores automáticos (ejecutar una sola vez desde el editor).
 * - Bienvenida: cada hora
 * - Caducidad: cada día a las 8:00 (hora Lima)
 */
function configurarActivadoresPam() {
  var funciones = [
    'enviarMensajesBienvenidaPendientes',
    'enviarAvisosCaducidadPendientes'
  ];

  ScriptApp.getProjectTriggers().forEach(function (trigger) {
    if (funciones.indexOf(trigger.getHandlerFunction()) !== -1) {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  ScriptApp.newTrigger('enviarMensajesBienvenidaPendientes')
    .timeBased()
    .everyHours(1)
    .create();

  ScriptApp.newTrigger('enviarAvisosCaducidadPendientes')
    .timeBased()
    .everyDays(1)
    .atHour(8)
    .inTimezone(PAM_TIMEZONE)
    .create();

  Logger.log('Activadores PAM configurados.');
}

function probarAvisoCaducidad() {
  sendCaducidadEmail_('tu-correo@ejemplo.com', 'María', 'García', 'Amigo', '2026-12-31', 5);
}

function sendCaducidadEmail_(to, nombres, apellidos, plan, fechaCaducidad, diasRestantes) {
  var nombre = formatNombreSaludo_(nombres, apellidos);
  var planTexto = plan ? ' (' + plan + ')' : '';
  var fechaTexto = formatearFechaLima_(fechaCaducidad);
  var diasTexto = diasRestantes === 1 ? '1 día' : diasRestantes + ' días';

  var subject = 'Tu membresía PAM vence pronto';
  var body = [
    'Hola ' + nombre + ',',
    '',
    'Te escribimos del Programa Amigos del Museo de Arte de Lima.',
    '',
    'Tu suscripción' + planTexto + ' vence el ' + fechaTexto + ' (faltan ' + diasTexto + ').',
    '',
    'Para seguir disfrutando de tus beneficios, renueva antes de esa fecha.',
    'Si ya renovaste, puedes ignorar este mensaje.',
    '',
    'Con cariño,',
    'Equipo PAM — Museo de Arte de Lima',
    '',
    '—',
    'Si tienes consultas, responde a este mensaje.'
  ].join('\n');

  GmailApp.sendEmail(to, subject, body, getOpcionesEmailPam_(body.replace(/\n/g, '<br>')));
}

function normalizarEstadoAvisoCaducidad_(value) {
  var estado = String(value || '').trim();
  if (!estado) return AVISO_CADUCIDAD.PENDIENTE;
  if (estado.toLowerCase() === 'sí' || estado.toLowerCase() === 'si') return AVISO_CADUCIDAD.ENVIADO;
  if (estado.toLowerCase() === 'no') return AVISO_CADUCIDAD.PENDIENTE;
  return estado;
}

function esEstadoAvisoProcesable_(estado) {
  if (estado === AVISO_CADUCIDAD.PENDIENTE) return true;
  if (estado === AVISO_CADUCIDAD.ERROR_TEMP) return true;
  return false;
}

function setEstadoAvisoCaducidad_(sheet, rowIndex, colIndex, estado) {
  sheet.getRange(rowIndex, colIndex + 1).setValue(estado);
}
