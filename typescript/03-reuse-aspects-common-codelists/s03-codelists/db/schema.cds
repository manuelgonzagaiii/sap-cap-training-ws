namespace assetcare;
using { cuid, managed, Currency } from '@sap/cds/common';

entity Equipment : cuid, managed {
  tag      : String;
  model    : String;
  serialNo : String;
  status : Association to EquipmentStatus;
}

entity Manufacturer : cuid, managed {
  name    : String;
  country : String;
}

entity SparePart : cuid, managed {
  partNo   : String;
  name     : String;
  stock    : Integer;
  price    : Decimal;
  currency : Currency;
}

/**
 * A code list of equipment statuses. Reusing sap.common.CodeList contributes `name` and
 * `descr` as LOCALIZED texts, so the labels can be translated per language. We add the key.
 */
entity EquipmentStatus : sap.common.CodeList {
  key code : String(20);
}
