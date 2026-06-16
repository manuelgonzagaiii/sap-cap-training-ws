using { MaintenanceService } from '../srv/maintenance-service';

annotate MaintenanceService.WorkOrder with @(UI: {
  HeaderInfo      : {
    TypeName       : 'Work Order',
    TypeNamePlural : 'Work Orders',
    Title          : { Value: orderNo }
  },
  SelectionFields : [ orderNo, equipment_ID ],
  LineItem        : [
    { Value: orderNo },
    { Value: description },
    { Value: completed }
  ]
});

// The object page: group fields, then surface the group as a facet on the detail page.
annotate MaintenanceService.WorkOrder with @(UI: {
  FieldGroup #Details: { Data: [
    { Value: orderNo },
    { Value: description },
    { Value: equipment_ID },
    { Value: completed }
  ] },
  Facets: [
    { $Type: 'UI.ReferenceFacet', Label: 'Details', Target: '@UI.FieldGroup#Details' }
  ]
});

// Give the equipment-status code list a value-help dropdown wherever it is referenced.
annotate MaintenanceService.EquipmentStatus with @cds.odata.valuelist;
