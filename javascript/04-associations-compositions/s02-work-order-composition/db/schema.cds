namespace assetcare;
using { cuid, managed, Currency } from '@sap/cds/common';

entity Equipment : cuid, managed {
  tag          : String;
  model        : String;
  serialNo     : String;
  status       : Association to EquipmentStatus;
  manufacturer : Association to Manufacturer;
}

entity Manufacturer : cuid, managed {
  name       : String;
  country    : String;
  equipments : Association to many Equipment on equipments.manufacturer = $self;
}

entity SparePart : cuid, managed {
  partNo   : String;
  name     : String;
  stock    : Integer;
  price    : Decimal;
  currency : Currency;
}

/**
 * A WorkOrder is a document: a header plus contained line items. The items are a
 * COMPOSITION - they belong to the work order, are created and deleted with it, and have no
 * life of their own. That containment is what separates a composition from an association.
 */
entity WorkOrder : cuid, managed {
  orderNo     : String;
  description : String;
  equipment : Association to Equipment;
  items : Composition of many WorkOrderItem on items.parent = $self;
}

entity WorkOrderItem : cuid {
  parent : Association to WorkOrder;
  part     : Association to SparePart;
  quantity : Integer;
}

entity EquipmentStatus : sap.common.CodeList {
  key code : String(20);
}
