// AssetCare query helpers. Each function BUILDS a cds.ql query and returns it; you run them
// yourself in the cds REPL (see the task description). Building a query and running it are
// separate steps in CAP - which is exactly what makes queries composable and testable.
const cds = require('@sap/cds');
const { SELECT } = cds.ql;

/** All equipment. */
function allEquipment() {
  return SELECT.from('assetcare.Equipment');
}

/** Only equipment that is currently down (status code 'DN'). */
function downEquipment() {
  return SELECT.from('assetcare.Equipment').where({ status_code: 'DN' });
}

/** The single spare part with the given ID. */
function sparePartById(id) {
  return SELECT.one.from('assetcare.SparePart').where({ ID: id });
}

module.exports = { allEquipment, downEquipment, sparePartById };
