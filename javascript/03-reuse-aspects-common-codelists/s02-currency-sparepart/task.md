# Reuse types: currencies and a spare part

Aspects bundled reusable *structure* (a key, audit fields). `@sap/cds/common` also gives you
reusable *types* for the values every business app keeps re-modelling: money, countries,
languages, time zones. This stage introduces the first real money in AssetCare — spare-part
prices — using the `Currency` reuse type, and adds the `SparePart` entity that later lessons
build on.

## Why a reuse type for currency

A price is meaningless without its currency: `12.50` is not money, `12.50 EUR` is. You could
store a plain `currency : String`, but then nothing connects `'EUR'` to the fact that the
Euro has the symbol `€` and two minor units. CAP models currency properly as a **managed
association** to the standard `sap.common.Currencies` code list, and packages that as a one-
word reuse type:

```cds
type Currency : Association to sap.common.Currencies;
```

When you write `currency : Currency`, CAP creates a foreign-key column `currency_code` (which
your CSV fills with `'EUR'`, `'USD'`, …) and lets a UI later resolve the symbol and name. The
same library offers `Country`, `Language` and `Timezone` in exactly the same shape — learn
one, you know all four.

A note on amounts: money is a `Decimal`, never a floating-point `Double` — you do not want
rounding errors in prices. Pairing a `Decimal` amount with a `Currency` is the standard CAP
way to model money. (The UI annotation that ties them together for display,
`@Measures.ISOCurrency`, comes with the Fiori lesson.)

## Your task

1. In `db/schema.cds`, add `Currency` to the import from `@sap/cds/common`, and give
   `SparePart` a `Decimal` `price` and a `currency` typed as `Currency`.
2. In `srv/maintenance-service.cds`, expose `SparePart` through the service.

A seed file `db/data/assetcare-SparePart.csv` is provided; notice its `currency_code` column
— that is the foreign key the `currency` association produces.

## What the check insists on, and what is yours

- Enforced: `Currency` is imported from `@sap/cds/common`; `SparePart` has a `Decimal` price
  and a `currency : Currency`; the service exposes `SparePart`.
- Yours: the other spare-part fields, the precision of the `Decimal` (for example
  `Decimal(9,2)`), and the seed values.

<div class="hint">

```cds
using { cuid, managed, Currency } from '@sap/cds/common';

entity SparePart : cuid, managed {
  partNo   : String;
  price    : Decimal;
  currency : Currency;
}
```

</div>

## Seeing it run

```
npx cds watch
```

Read `SparePart` over OData: each row has `price` and `currency_code`. The price now carries
its currency, the honest way to model money.
