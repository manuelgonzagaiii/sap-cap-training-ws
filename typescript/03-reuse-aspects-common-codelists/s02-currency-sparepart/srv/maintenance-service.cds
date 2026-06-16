using { assetcare } from '../db/schema';

service MaintenanceService {
  entity Equipment    as projection on assetcare.Equipment;
  entity Manufacturer as projection on assetcare.Manufacturer;
  entity SparePart    as projection on assetcare.SparePart;
}
