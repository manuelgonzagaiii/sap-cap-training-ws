using { MaintenanceService } from './maintenance-service';

// Require an authenticated user for the whole service: anonymous requests get 401.
annotate MaintenanceService with @(requires: 'authenticated-user');

// Role-based access on spare parts: anyone signed in may read; only managers may change.
annotate MaintenanceService.SparePart with @(restrict: [
  { grant: 'READ', to: 'authenticated-user' },
  { grant: ['CREATE', 'UPDATE', 'DELETE'], to: 'Maintenance.Manager' }
]);
