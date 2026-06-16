using { MaintenanceService } from './maintenance-service';

// Externalize labels: reference bundle keys instead of hard-coding text, so the UI can be
// translated without touching the model.
annotate MaintenanceService.WorkOrder with @title: '{i18n>WorkOrder}';
annotate MaintenanceService.WorkOrder:description with @title: '{i18n>Description}';
