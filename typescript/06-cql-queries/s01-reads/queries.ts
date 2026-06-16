// AssetCare query helpers (TypeScript). Each function BUILDS a cds.ql query and returns it;
// you run them yourself in the cds REPL. Building and running are separate steps in CAP.
import cds from '@sap/cds';
const { SELECT } = cds.ql;

/** All equipment. */
export function allEquipment() {
  return SELECT.from('assetcare.Equipment');
}

/** Only equipment that is currently down (status code 'DN'). */
export function downEquipment() {
  return SELECT.from('assetcare.Equipment').where({ status_code: 'DN' });
}

/** The single spare part with the given ID. */
export function sparePartById(id: string) {
  return SELECT.one.from('assetcare.SparePart').where({ ID: id });
}
