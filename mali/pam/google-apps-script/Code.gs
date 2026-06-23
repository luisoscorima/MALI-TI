/**
 * PAM — Registro de membresías en Google Sheets
 *
 * Configuración:
 * 1. Crea una hoja de cálculo en Google Drive (ej. "PAM Registros").
 * 2. Extiende → Apps Script, pega este código y guarda.
 * 3. Ejecuta setupSheet() una vez (autoriza permisos).
 * 4. Implementar → Nueva implementación → Aplicación web:
 *    - Ejecutar como: Yo
 *    - Quién tiene acceso: Cualquier persona
 * 5. Copia la URL de implementación en PAM_REGISTRO_API (membership.html) línea 1997.
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
  'acepta_privacidad'
];

function setupSheet() {
  var sheet = getOrCreateSheet_();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
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

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      data.registrado_en || new Date().toISOString(),
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
      data.acepta_privacidad === true ? 'Sí' : 'No'
    ]);

    return jsonResponse_({ success: true });
  } catch (err) {
    return jsonResponse_({ success: false, error: err.message });
  }
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
