using { assetcare } from '../db/schema';

service MaintenanceService {

  entity Equipment as projection on assetcare.Equipment {
    *,
    virtual openWorkOrders : Integer
  };

  entity Manufacturer    as projection on assetcare.Manufacturer;
  entity SparePart       as projection on assetcare.SparePart;
  entity EquipmentStatus as projection on assetcare.EquipmentStatus;
  entity WorkOrder       as projection on assetcare.WorkOrder;

  entity WorkOrderList as projection on assetcare.WorkOrder {
    ID,
    orderNo,
    description,
    equipment.tag as equipmentTag
  };

  // An unbound, side-effect-free operation on the service as a whole.
  function lowStockCount() returns Integer;
}
