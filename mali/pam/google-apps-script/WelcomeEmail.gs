/**
 * Mensaje de bienvenida PAM — envío desde pam@mali.pe
 *
 * IMPORTANTE: el proyecto Apps Script y la hoja deben estar en la cuenta pam@mali.pe
 * (Implementar → Ejecutar como: Yo). Si no, el correo sale desde otra cuenta @mali.pe.
 * En Google Workspace, pam@mali.pe debe ser alias o cuenta con permiso "Enviar como".
 *
 * Al enviar la bienvenida (pago confirmado) se calcula fecha_caducidad automáticamente.
 *
 * Uso manual: enviarMensajesBienvenidaPendientes()
 * Activador: configurarActivadoresPam() en CaducidadEmail.gs
 */

var MENSAJE_BIENVENIDA = {
  PENDIENTE: 'PENDIENTE',
  ENVIADO: 'ENVIADO',
  ERROR_DATOS: 'ERROR_DATOS',
  ERROR_TEMP: 'ERROR_TEMP'
};

/**
 * Procesa filas elegibles y actualiza mensaje_bienvenida según resultado.
 */
function enviarMensajesBienvenidaPendientes() {
  var sheet = getOrCreateSheet_();
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var col = indexRegistroHeaders_(headers);

  if (col.mensaje_bienvenida === -1 || col.correo === -1) {
    throw new Error('Faltan columnas en la hoja. Ejecuta setupSheet() primero.');
  }

  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return;

  var rows = sheet.getRange(2, 1, lastRow, headers.length).getValues();
  var resumen = { enviados: 0, sin_pago: 0, error_datos: 0, error_temp: 0, omitidos: 0 };

  rows.forEach(function (row, i) {
    var rowIndex = i + 2;
    var estadoActual = normalizarEstadoBienvenida_(row[col.mensaje_bienvenida]);

    if (!esEstadoProcesable_(estadoActual)) {
      resumen.omitidos++;
      return;
    }

    if (!esPagoConfirmado_(row[col.estado_mercado_pago])) {
      resumen.sin_pago++;
      return;
    }

    var correo = String(row[col.correo] || '').trim();
    if (!esCorreoValido_(correo)) {
      setEstadoBienvenida_(sheet, rowIndex, col.mensaje_bienvenida, MENSAJE_BIENVENIDA.ERROR_DATOS);
      resumen.error_datos++;
      return;
    }

    var nombres = String(row[col.nombres] || '').trim();
    var apellidos = col.apellidos !== -1 ? String(row[col.apellidos] || '').trim() : '';
    var plan = String(row[col.plan] || '').trim();
    var frecuencia = row[col.frecuencia];

    try {
      sendWelcomeEmail_(correo, nombres, apellidos, plan);
      setEstadoBienvenida_(sheet, rowIndex, col.mensaje_bienvenida, MENSAJE_BIENVENIDA.ENVIADO);
      fijarFechaCaducidadTrasAlta_(sheet, rowIndex, col, frecuencia);
      resumen.enviados++;
    } catch (err) {
      Logger.log('Bienvenida fila ' + rowIndex + ': ' + err.message);
      setEstadoBienvenida_(sheet, rowIndex, col.mensaje_bienvenida, MENSAJE_BIENVENIDA.ERROR_TEMP);
      resumen.error_temp++;
    }
  });

  Logger.log(
    'Bienvenida — enviados: ' + resumen.enviados +
    ', sin_pago: ' + resumen.sin_pago +
    ', error_datos: ' + resumen.error_datos +
    ', error_temp: ' + resumen.error_temp +
    ', omitidos: ' + resumen.omitidos
  );
}

/**
 * Ancla la suscripción al día del alta (pago confirmado) y deja listo el aviso de caducidad.
 */
function fijarFechaCaducidadTrasAlta_(sheet, rowIndex, col, frecuencia) {
  if (col.fecha_caducidad === -1) return;

  var fecha = calcularFechaCaducidad_(new Date(), frecuencia);
  sheet.getRange(rowIndex, col.fecha_caducidad + 1).setValue(fecha);

  if (col.aviso_caducidad !== -1) {
    sheet.getRange(rowIndex, col.aviso_caducidad + 1).setValue(AVISO_CADUCIDAD_DEFAULT);
  }
}

/**
 * Prueba con la última fila de la hoja (cambia el correo destino abajo).
 */
function probarMensajeBienvenida() {
  var correoPrueba = 'tu-correo@ejemplo.com'; // ← pon aquí tu correo real
  var sheet = getOrCreateSheet_();
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var col = indexRegistroHeaders_(headers);
  var lastRow = sheet.getLastRow();

  var nombres = 'María';
  var apellidos = 'García';
  var plan = 'Amigo';

  if (lastRow >= 2 && col.nombres !== -1) {
    var row = sheet.getRange(lastRow, 1, lastRow, headers.length).getValues()[0];
    nombres = String(row[col.nombres] || nombres).trim();
    apellidos = col.apellidos !== -1 ? String(row[col.apellidos] || apellidos).trim() : apellidos;
    plan = col.plan !== -1 ? String(row[col.plan] || plan).trim() : plan;
  }

  sendWelcomeEmail_(correoPrueba, nombres, apellidos, plan);
}

function sendWelcomeEmail_(to, nombres, apellidos, plan) {
  var nombre = formatNombreSaludo_(nombres, apellidos);
  var planTexto = plan ? ' al plan ' + plan : '';

  var subject = 'Bienvenido/a al Programa Amigos del MALI';
  var body = [
    'Hola ' + nombre + ',',
    '',
    '¡Gracias por unirte al Programa Amigos del Museo de Arte de Lima' + planTexto + '!',
    '',
    'Pronto recibirás más información sobre tus beneficios como miembro.',
    '',
    'Con cariño,',
    'Equipo PAM — Museo de Arte de Lima',
    '',
    '—',
    'Si tienes consultas, responde a este mensaje.'
  ].join('\n');

  GmailApp.sendEmail(to, subject, body, getOpcionesEmailPam_(body.replace(/\n/g, '<br>')));
}

function normalizarEstadoBienvenida_(value) {
  var estado = String(value || '').trim();

  if (estado.toLowerCase() === 'sí' || estado.toLowerCase() === 'si') {
    return MENSAJE_BIENVENIDA.ENVIADO;
  }
  if (estado.toLowerCase() === 'no' || estado === 'PENDIENTE_CUOTA') {
    return MENSAJE_BIENVENIDA.PENDIENTE;
  }

  return estado;
}

function esEstadoProcesable_(estado) {
  if (!estado || estado === MENSAJE_BIENVENIDA.PENDIENTE) return true;
  if (estado === MENSAJE_BIENVENIDA.ERROR_TEMP) return true;
  return false;
}

function setEstadoBienvenida_(sheet, rowIndex, colIndex, estado) {
  sheet.getRange(rowIndex, colIndex + 1).setValue(estado);
}
