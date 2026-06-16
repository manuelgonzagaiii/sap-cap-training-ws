const cds = require('@sap/cds');
const { SELECT, INSERT, UPDATE, DELETE } = cds.ql;

// --- reads (from the previous stage) ---
function allEquipment() { return SELECT.from('assetcare.Equipment'); }
function downEquipment() { return SELECT.from('assetcare.Equipment').where({ status_code: 'DN' }); }
function sparePartById(id) { return SELECT.one.from('assetcare.SparePart').where({ ID: id }); }

// --- writes ---

/** Add a new spare part. */
function addSparePart(part) {
  return INSERT.into('assetcare.SparePart').entries(part);
}

/** Increase a spare part's stock by qty (atomic increment). */
function restock(id, qty) {
  return UPDATE('assetcare.SparePart').set('stock +=', qty).where({ ID: id });
}

/** Remove an equipment record. */
function scrapEquipment(id) {
  return DELETE.from('assetcare.Equipment').where({ ID: id });
}

module.exports = { allEquipment, downEquipment, sparePartById, addSparePart, restock, scrapEquipment };
