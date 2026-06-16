import cds from '@sap/cds';
const { SELECT, INSERT, UPDATE, DELETE } = cds.ql;

// --- reads + writes from previous stages ---
export function allEquipment() { return SELECT.from('assetcare.Equipment'); }
export function downEquipment() { return SELECT.from('assetcare.Equipment').where({ status_code: 'DN' }); }
export function sparePartById(id: string) { return SELECT.one.from('assetcare.SparePart').where({ ID: id }); }
export function addSparePart(part: Record<string, any>) { return INSERT.into('assetcare.SparePart').entries(part); }
export function restock(id: string, qty: number) { return UPDATE('assetcare.SparePart').set('stock +=', qty).where({ ID: id }); }
export function scrapEquipment(id: string) { return DELETE.from('assetcare.Equipment').where({ ID: id }); }

/**
 * Create a work order together with its line items in ONE deep insert. The nested `items`
 * array becomes WorkOrderItem rows, linked to the new work order automatically.
 */
export function createWorkOrder(orderNo: string, equipmentId: string, items: Array<Record<string, any>>) {
  return INSERT.into('assetcare.WorkOrder').entries({ orderNo, equipment_ID: equipmentId, items });
}
