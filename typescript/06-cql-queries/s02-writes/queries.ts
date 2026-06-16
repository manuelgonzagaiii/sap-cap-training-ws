import cds from '@sap/cds';
const { SELECT, INSERT, UPDATE, DELETE } = cds.ql;

// --- reads (from the previous stage) ---
export function allEquipment() { return SELECT.from('assetcare.Equipment'); }
export function downEquipment() { return SELECT.from('assetcare.Equipment').where({ status_code: 'DN' }); }
export function sparePartById(id: string) { return SELECT.one.from('assetcare.SparePart').where({ ID: id }); }

// --- writes ---

/** Add a new spare part. */
export function addSparePart(part: Record<string, any>) {
  return INSERT.into('assetcare.SparePart').entries(part);
}

/** Increase a spare part's stock by qty (atomic increment). */
export function restock(id: string, qty: number) {
  return UPDATE('assetcare.SparePart').set('stock +=', qty).where({ ID: id });
}

/** Remove an equipment record. */
export function scrapEquipment(id: string) {
  return DELETE.from('assetcare.Equipment').where({ ID: id });
}
