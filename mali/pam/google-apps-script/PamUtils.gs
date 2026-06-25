/**
 * Utilidades compartidas PAM (fechas, validación, columnas).
 */

var PAM_TIMEZONE = 'America/Lima';
var PAM_FROM_NAME = 'Programa Amigos del MALI';
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

function indexRegistroHeaders_(headers) {
  function idx(name) {
    return headers.indexOf(name);
  }

  return {
    registrado_en: idx('registrado_en'),
    nombres: idx('nombres'),
    correo: idx('correo'),
    plan: idx('plan'),
    frecuencia: idx('frecuencia'),
    estado_mercado_pago: idx('estado_mercado_pago'),
    mensaje_bienvenida: idx('mensaje_bienvenida'),
    fecha_caducidad: idx('fecha_caducidad'),
    aviso_caducidad: idx('aviso_caducidad')
  };
}
