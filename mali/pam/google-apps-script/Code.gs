/**
 * PAM — Registro de membresías en Google Sheets
 *
 * Configuración:
 * 1. Crea una hoja de cálculo en Google Drive (ej. "PAM Registros").
 * 2. Extiende → Apps Script, pega este código y guarda.
 * 3. Ejecuta setupSheet() una vez (autoriza permisos).
 * 4. Ejecuta configurarActivadoresPam() una vez (correos automáticos).
 * 5. Implementar → Nueva implementación → Aplicación web:
 *    - Ejecutar como: Yo
 *    - Quién tiene acceso: Cualquier persona
 * 6. Copia la URL de implementación en PAM_REGISTRO_API (membership.html).
 */

var SHEET_NAME = 'Registros';

var HEADERS = [
  'registrado_en',
  'nombres',
  'apellidos',
  'dni',
  'celular',
  'correo',
  'direccion',
  'ciudad',
  'distrito',
  'genero',
  'fecha_nacimiento',
  'como_te_enteraste',
  'plan',
  'frecuencia',
  'checkout_url',
  'acepta_privacidad',
  // Vacío hasta integrar webhook de Mercado Pago. Valores posibles:
  // pending | in_process | approved | authorized | rejected | cancelled | refunded | charged_back
  'estado_mercado_pago',
  // mensaje_bienvenida — ver WelcomeEmail.gs
  'mensaje_bienvenida',
  // Se calcula al confirmar el pago (bienvenida). Formato yyyy-MM-dd
  'fecha_caducidad',
  // aviso_caducidad — ver CaducidadEmail.gs
  'aviso_caducidad'
];

/** Estado inicial al registrar desde el front. */
var MENSAJE_BIENVENIDA_DEFAULT = 'PENDIENTE';

function setupSheet() {
  var sheet = getOrCreateSheet_();
  syncSheetHeaders_(sheet);
}

function doGet() {
  return jsonResponse_({ success: true, message: 'PAM Registro API activa' });
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error('Cuerpo de solicitud vacío');
    }

    var data = JSON.parse(e.postData.contents);
    var sheet = getOrCreateSheet_();

    syncSheetHeaders_(sheet);

    sheet.appendRow([
      ahoraLima_(),
      data.nombres || '',
      data.apellidos || '',
      data.dni || '',
      data.celular || '',
      data.correo || '',
      data.direccion || '',
      data.ciudad || '',
      data.distrito || '',
      data.genero || '',
      data.fecha_nacimiento || '',
      data.como_te_enteraste || '',
      data.plan || '',
      data.frecuencia || '',
      data.checkout_url || '',
      data.acepta_privacidad === true ? 'Sí' : 'No',
      '', // estado_mercado_pago — sin integración MP aún
      MENSAJE_BIENVENIDA_DEFAULT,
      '', // fecha_caducidad — se calcula al confirmar pago
      'PENDIENTE' // aviso_caducidad
    ]);

    return jsonResponse_({ success: true });
  } catch (err) {
    return jsonResponse_({ success: false, error: err.message });
  }
}

/**
 * Añade columnas nuevas a hojas ya existentes sin borrar datos.
 * Ejecutar setupSheet() una vez tras desplegar cambios de columnas.
 */
function syncSheetHeaders_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
    return;
  }

  var existing = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var missing = HEADERS.filter(function (header) {
    return existing.indexOf(header) === -1;
  });

  if (missing.length === 0) return;

  var startCol = existing.length + 1;
  sheet.getRange(1, startCol, 1, startCol + missing.length - 1).setValues([missing]);
  sheet.getRange(1, 1, 1, sheet.getLastColumn()).setFontWeight('bold');
  sheet.setFrozenRows(1);
}

function getOrCreateSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  return sheet;
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
