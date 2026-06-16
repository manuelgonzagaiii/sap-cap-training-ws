using { MaintenanceService } from './maintenance-service';

annotate MaintenanceService with @(requires: 'authenticated-user');

annotate MaintenanceService.SparePart with @(restrict: [
  { grant: 'READ', to: 'authenticated-user' },
  { grant: ['CREATE', 'UPDATE', 'DELETE'], to: 'Maintenance.Manager' }
]);

// Instance-based (row-level) access: a user may read all work orders, but only change the
// ones they created. The where clause references model data ($user is the current user id;
// createdBy comes from the managed aspect).
annotate MaintenanceService.WorkOrder with @(restrict: [
  { grant: 'READ', to: 'authenticated-user' },
  { grant: '*', to: 'authenticated-user', where: 'createdBy = $user' }
]);
