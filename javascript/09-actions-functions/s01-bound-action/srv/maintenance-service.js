const cds = require('@sap/cds');

class MaintenanceService extends cds.ApplicationService {
  async init() {

    // (from Lesson 7)
    this.before('CREATE', 'WorkOrder', (req) => {
      if (!req.data.orderNo) req.data.orderNo = 'WO-' + Date.now();
    });
    this.after('READ', 'Equipment', async (rows) => {
      for (const row of Array.isArray(rows) ? rows : [rows]) {
        if (!row) continue;
        const wos = await SELECT.from('assetcare.WorkOrder').where({ equipment_ID: row.ID });
        row.openWorkOrders = wos.length;
      }
    });
    this.before(['CREATE', 'UPDATE'], 'SparePart', (req) => {
      if (req.data.stock != null && req.data.stock < 0) req.reject(400, 'Stock cannot be negative');
    });

    // Implement the bound action: mark the targeted work order as completed.
    this.on('completeWorkOrder', 'WorkOrder', async (req) => {
      await UPDATE(req.subject).with({ completed: true });
      return req.subject;
    });

    await super.init();
  }
}

module.exports = MaintenanceService;
