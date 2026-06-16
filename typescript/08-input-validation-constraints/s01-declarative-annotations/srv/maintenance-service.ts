import cds from '@sap/cds';
const { SELECT } = cds.ql;

export default class MaintenanceService extends cds.ApplicationService {
  async init() {

    // (from the previous stage) default the order number on new work orders
    this.before('CREATE', 'WorkOrder', (req) => {
      if (!req.data.orderNo) req.data.orderNo = 'WO-' + Date.now();
    });

    // Fill the virtual openWorkOrders count after each Equipment is read.
    this.after('READ', 'Equipment', async (rows) => {
      for (const row of Array.isArray(rows) ? rows : [rows]) {
        if (!row) continue;
        const wos = await SELECT.from('assetcare.WorkOrder').where({ equipment_ID: row.ID });
        row.openWorkOrders = wos.length;
      }
    });

    // Refuse any write that would drive a spare part's stock below zero.
    this.before(['CREATE', 'UPDATE'], 'SparePart', (req) => {
      if (req.data.stock != null && req.data.stock < 0) req.reject(400, 'Stock cannot be negative');
    });

    await super.init();
  }
}
