import cds from '@sap/cds';

// The implementation of MaintenanceService. CAP auto-links this file to the service of the
// same name and runs the handlers you register here around the generic CRUD it provides.
export default class MaintenanceService extends cds.ApplicationService {
  async init() {

    // Give every new work order an order number if the client did not supply one.
    this.before('CREATE', 'WorkOrder', (req) => {
      if (!req.data.orderNo) req.data.orderNo = 'WO-' + Date.now();
    });

    await super.init();
  }
}
