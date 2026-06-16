using { MaintenanceService } from '../srv/maintenance-service';

// SAP Fiori elements builds the entire list report from these annotations - no UI code.
annotate MaintenanceService.WorkOrder with @(UI: {
  HeaderInfo: {
    TypeName       : 'Work Order',
    TypeNamePlural : 'Work Orders',
    Title          : { Value: orderNo }
  },
  SelectionFields: [ orderNo, equipment_ID ],
  LineItem: [
    { Value: orderNo },
    { Value: description },
    { Value: completed }
  ]
});
