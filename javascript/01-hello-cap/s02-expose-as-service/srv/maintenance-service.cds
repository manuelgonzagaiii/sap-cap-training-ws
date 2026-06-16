using { assetcare } from '../db/schema';

/**
 * A service is a facade. It chooses which entities to expose, and how, without
 * touching the domain model. CAP serves it as OData V4 with full CRUD and no
 * handler code.
 */
service MaintenanceService {
  entity Equipment as projection on assetcare.Equipment;
}
