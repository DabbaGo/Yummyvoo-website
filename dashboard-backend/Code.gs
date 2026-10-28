/**
 * YummyVoo Kitchen Engagements — Google Sheets Backend
 * -----------------------------------------------------
 * Deploy this as a Google Apps Script Web App to expose a tiny JSON API
 * backed by a Google Sheet. See SETUP.md in the same folder for step-by-step.
 *
 * Endpoints (all return JSON):
 *   GET  ?action=list&token=XXX                 -> { ok, rows: [...] }
 *   POST { action: 'create', token, entry }     -> { ok, row }
 *   POST { action: 'update', token, id, entry } -> { ok, row }
 *   POST { action: 'delete', token, id }        -> { ok }
 */

// ============================================================
// CONFIG — edit these two values after creating the script.
// ============================================================
// Fill these in INSIDE the Apps Script editor at script.google.com (NOT here).
// This file is a template committed to git; the live values live only in your
// Apps Script project. See SETUP.md.
const SHEET_ID = 'PASTE_YOUR_GOOGLE_SHEET_ID_HERE';
const API_TOKEN = 'PASTE_A_LONG_RANDOM_STRING_HERE';
// ============================================================

const SHEET_NAME = 'engagements';
const HEADERS = [
  'id',
  'date',
  'kitchen',
  'type',        // 'positive' | 'negative'
  'category',    // Review | Order | Complaint | Compliment | Social | Other
  'source',      // Zomato | Swiggy | Instagram | WhatsApp | Direct | Other
  'rating',      // 1..5 or ''
  'notes',
  'resolved',    // 'yes' | 'no' | ''
  'createdAt',
  'updatedAt',
];

function getSheet_() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sh.setFrozenRows(1);
  } else if (sh.getLastRow() === 0) {
    sh.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sh.setFrozenRows(1);
  }
  return sh;
}

function readAll_() {
  const sh = getSheet_();
  const last = sh.getLastRow();
  if (last < 2) return [];
  const values = sh.getRange(2, 1, last - 1, HEADERS.length).getValues();
  return values
    .map((row) => {
      const obj = {};
      HEADERS.forEach((h, i) => { obj[h] = row[i]; });
      return obj;
    })
    .filter((r) => r.id);
}

function findRowIndexById_(id) {
  const sh = getSheet_();
  const last = sh.getLastRow();
  if (last < 2) return -1;
  const ids = sh.getRange(2, 1, last - 1, 1).getValues();
  for (let i = 0; i < ids.length; i++) {
    if (String(ids[i][0]) === String(id)) return i + 2; // 1-based + header row
  }
  return -1;
}

function newId_() {
  return 'eng_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
}

function nowIso_() { return new Date().toISOString(); }

function sanitizeEntry_(e) {
  return {
    date: String(e.date || '').slice(0, 10),
    kitchen: String(e.kitchen || '').slice(0, 120),
    type: e.type === 'negative' ? 'negative' : 'positive',
    category: String(e.category || 'Other').slice(0, 60),
    source: String(e.source || 'Other').slice(0, 60),
    rating: e.rating === '' || e.rating == null ? '' : Math.max(1, Math.min(5, Number(e.rating) || 0)) || '',
    notes: String(e.notes || '').slice(0, 2000),
    resolved: e.resolved === 'yes' ? 'yes' : (e.resolved === 'no' ? 'no' : ''),
  };
}

function rowFromEntry_(id, entry, createdAt, updatedAt) {
  return [
    id,
    entry.date,
    entry.kitchen,
    entry.type,
    entry.category,
    entry.source,
    entry.rating,
    entry.notes,
    entry.resolved,
    createdAt,
    updatedAt,
  ];
}

function respond_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function checkToken_(token) {
  if (!API_TOKEN || API_TOKEN === 'CHANGE_ME_TO_A_LONG_RANDOM_STRING') {
    throw new Error('Server token not configured.');
  }
  if (String(token || '') !== String(API_TOKEN)) {
    throw new Error('Unauthorized');
  }
}

function doGet(e) {
  try {
    const params = (e && e.parameter) || {};
    checkToken_(params.token);
    const action = params.action || 'list';
    if (action === 'list') {
      return respond_({ ok: true, rows: readAll_() });
    }
    return respond_({ ok: false, error: 'Unknown action' });
  } catch (err) {
    return respond_({ ok: false, error: String(err.message || err) });
  }
}

function doPost(e) {
  try {
    const body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    checkToken_(body.token);
    const action = body.action;
    const sh = getSheet_();

    if (action === 'create') {
      const entry = sanitizeEntry_(body.entry || {});
      const id = newId_();
      const now = nowIso_();
      const row = rowFromEntry_(id, entry, now, now);
      sh.appendRow(row);
      return respond_({ ok: true, row: Object.fromEntries(HEADERS.map((h, i) => [h, row[i]])) });
    }

    if (action === 'update') {
      const id = body.id;
      const idx = findRowIndexById_(id);
      if (idx === -1) return respond_({ ok: false, error: 'Not found' });
      const existing = sh.getRange(idx, 1, 1, HEADERS.length).getValues()[0];
      const existingObj = Object.fromEntries(HEADERS.map((h, i) => [h, existing[i]]));
      const entry = sanitizeEntry_({ ...existingObj, ...(body.entry || {}) });
      const row = rowFromEntry_(id, entry, existingObj.createdAt || nowIso_(), nowIso_());
      sh.getRange(idx, 1, 1, HEADERS.length).setValues([row]);
      return respond_({ ok: true, row: Object.fromEntries(HEADERS.map((h, i) => [h, row[i]])) });
    }

    if (action === 'delete') {
      const idx = findRowIndexById_(body.id);
      if (idx === -1) return respond_({ ok: false, error: 'Not found' });
      sh.deleteRow(idx);
      return respond_({ ok: true });
    }

    return respond_({ ok: false, error: 'Unknown action' });
  } catch (err) {
    return respond_({ ok: false, error: String(err.message || err) });
  }
}