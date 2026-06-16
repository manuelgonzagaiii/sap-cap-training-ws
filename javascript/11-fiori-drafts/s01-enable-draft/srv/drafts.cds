using { MaintenanceService } from './maintenance-service';

// Turn on the SAP Fiori draft choreography for work orders: users create a draft, edit it
// across sessions, then activate it. CAP generates the whole draft machinery from this one
// annotation.
annotate MaintenanceService.WorkOrder with @odata.draft.enabled;
