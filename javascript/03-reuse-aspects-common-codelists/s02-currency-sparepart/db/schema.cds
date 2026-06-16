namespace assetcare;
using { cuid, managed, Currency } from '@sap/cds/common';

entity Equipment : cuid, managed {
  tag      : String;
  model    : String;
  serialNo : String;
}

entity Manufacturer : cuid, managed {
  name    : String;
  country : String;
}

/**
 * A spare part used in maintenance. It carries a price, and a price needs a currency.
 * `Currency` is a reuse type: a managed association to the standard sap.common.Currencies
 * code list. It gives you a `currency_code` foreign key (e.g. 'EUR') for free, and lets a
 * UI show the right symbol later.
 */
entity SparePart : cuid, managed {
  partNo   : String;
  name     : String;
  stock    : Integer;
  price    : Decimal;
  currency : Currency;
}
