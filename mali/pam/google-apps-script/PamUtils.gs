/**
 * Utilidades compartidas PAM (fechas, validación, columnas).
 */

var PAM_TIMEZONE = 'America/Lima';
var PAM_FROM_NAME = 'Programa Amigos del MALI';
var PAM_FROM_EMAIL = 'pam@mali.pe';
var PAM_REPLY_TO = 'pam@mali.pe';
var MP_ESTADOS_PAGO_OK = ['approved', 'authorized'];

/**
 * Calcula fecha de fin de suscripción según frecuencia (mensual / anual).
 * Devuelve texto yyyy-MM-dd para la hoja.
 */
function calcularFechaCaducidad_(fechaInicio, frecuencia) {
  var start = fechaInicio instanceof Date ? new Date(fechaInicio.getTime()) : new Date(fechaInicio);
  if (isNaN(start.getTime())) return '';

  var result = new Date(start.getTime());
  var f = String(frecuencia || '').toLowerCase();

  if (f.indexOf('anual') !== -1) {
    result.setFullYear(result.getFullYear() + 1);
  } else {
    result.setMonth(result.getMonth() + 1);
  }

  return Utilities.formatDate(result, PAM_TIMEZONE, 'yyyy-MM-dd');
}

/** Días calendario desde hoy (Lima) hasta fecha_caducidad. */
function diasHastaCaducidad_(fechaCaducidad) {
  var caducidad = parseFechaSheet_(fechaCaducidad);
  if (!caducidad) return null;

  var hoyStr = Utilities.formatDate(new Date(), PAM_TIMEZONE, 'yyyy-MM-dd');
  var hoy = parseFechaSheet_(hoyStr);
  var diffMs = caducidad.getTime() - hoy.getTime();

  return Math.round(diffMs / (24 * 60 * 60 * 1000));
}

function parseFechaSheet_(value) {
  if (!value) return null;

  if (value instanceof Date && !isNaN(value.getTime())) {
    var copy = new Date(value.getTime());
    copy.setHours(12, 0, 0, 0);
    return copy;
  }

  var str = String(value).trim();
  if (!str) return null;

  var iso = str.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) {
    return new Date(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3]), 12, 0, 0, 0);
  }

  var parsed = new Date(str);
  if (isNaN(parsed.getTime())) return null;
  parsed.setHours(12, 0, 0, 0);
  return parsed;
}

function formatearFechaLima_(value) {
  var fecha = parseFechaSheet_(value);
  if (!fecha) return '';
  return Utilities.formatDate(fecha, PAM_TIMEZONE, 'dd/MM/yyyy');
}

function esCorreoValido_(correo) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(correo || '').trim());
}

function esPagoConfirmado_(estadoMp) {
  return MP_ESTADOS_PAGO_OK.indexOf(String(estadoMp || '').trim().toLowerCase()) !== -1;
}

/** Fecha/hora actual en Lima para la columna registrado_en. */
function ahoraLima_() {
  return Utilities.formatDate(new Date(), PAM_TIMEZONE, 'yyyy-MM-dd HH:mm:ss');
}

/** Saludo personalizado: primer nombre + primer apellido. */
function formatNombreSaludo_(nombres, apellidos) {
  var n = String(nombres || '').trim();
  var a = String(apellidos || '').trim();
  var primerNombre = n ? n.split(/\s+/)[0] : '';
  var primerApellido = a ? a.split(/\s+/)[0] : '';

  if (primerNombre && primerApellido) {
    return primerNombre + ' ' + primerApellido;
  }
  if (primerNombre) return primerNombre;
  if (primerApellido) return primerApellido;
  return 'amigo/a del museo';
}

function getOpcionesEmailPam_(htmlBody) {
  return {
    name: PAM_FROM_NAME,
    from: PAM_FROM_EMAIL,
    replyTo: PAM_REPLY_TO,
    htmlBody: htmlBody
  };
}

function indexRegistroHeaders_(headers) {
  function idx(name) {
    return headers.indexOf(name);
  }

  return {
    registrado_en: idx('registrado_en'),
    nombres: idx('nombres'),
    apellidos: idx('apellidos'),
    correo: idx('correo'),
    plan: idx('plan'),
    frecuencia: idx('frecuencia'),
    estado_mercado_pago: idx('estado_mercado_pago'),
    mensaje_bienvenida: idx('mensaje_bienvenida'),
    fecha_caducidad: idx('fecha_caducidad'),
    aviso_caducidad: idx('aviso_caducidad')
  };
}
