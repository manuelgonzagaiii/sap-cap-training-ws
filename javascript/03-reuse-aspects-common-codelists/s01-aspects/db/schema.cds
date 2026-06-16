namespace assetcare;
using { cuid, managed } from '@sap/cds/common';

/**
 * Equipment now reuses two standard aspects instead of hand-rolling its own key and
 * audit fields: cuid adds `key ID : UUID`, managed adds createdAt/createdBy/
 * modifiedAt/modifiedBy, filled automatically.
 */
entity Equipment : cuid, managed {
  tag      : String;
  model    : String;
  serialNo : String;
}

entity Manufacturer : cuid, managed {
  name    : String;
  country : String;
}
