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

entity EquipmentStatus : sap.common.CodeList {
  key code : String(20);
}
