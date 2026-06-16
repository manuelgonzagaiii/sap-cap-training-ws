# Code lists with localized texts

Some fields are not free text — they come from a fixed, governed set of values: an
equipment status, a priority, an order type. The right way to model these in CAP is a **code
list**: a small entity of allowed codes, each with a human-readable, *translatable* label.
This stage adds an `EquipmentStatus` code list, points `Equipment` at it, and gives its
labels a German translation.

## sap.common.CodeList

`@sap/cds/common` defines a `CodeList` aspect:

```cds
aspect sap.common.CodeList {
  name  : localized String(111);
  descr : localized String(1111);
}
```

Reuse it and add a key, and you have a proper code list:

```cds
entity EquipmentStatus : sap.common.CodeList {
  key code : String(20);
}
```

The important word is `localized`. It tells CAP that `name` and `descr` can differ per
language. Behind the scenes CAP generates a second table, `EquipmentStatus.texts`, keyed by
`code` + `locale`, and serves the right language to each user with automatic fallback. You
get translation support without modelling any of that machinery yourself.

`Equipment` then refers to a status the same way it referred to a currency — with an
association:

```cds
status : Association to EquipmentStatus;
```

This is the same code-list-by-association pattern you saw with `Currency`; the only
difference is that this code list is yours, not a standard one.

## Seeding a code list and its translations

Two CSV files under `db/data/`:

- `assetcare-EquipmentStatus.csv` — the codes and their default (English) labels:
  columns `code,name,descr`.
- `assetcare-EquipmentStatus_texts.csv` — the translations: columns `code,locale,name,descr`.
  The `_texts` suffix and the `locale` column are how CAP knows this file feeds the generated
  texts table. Each row is one label in one language.

## Your task

1. In `db/schema.cds`, make `EquipmentStatus` reuse `sap.common.CodeList`, and add a
   `status` association from `Equipment` to it.
2. In `db/data/assetcare-EquipmentStatus_texts.csv`, write the header that matches the texts
   table. German rows are provided.

## What the check insists on, and what is yours

- Enforced: `EquipmentStatus` reuses `sap.common.CodeList`; `Equipment` has a `status`
  association to it; the base CSV has a `code` column; the texts CSV has `code` and `locale`
  columns.
- Yours: which status codes exist, their labels, and which languages you translate into.

<div class="hint">

The texts file header lines up with the generated `.texts` table:

```
code,locale,name,descr
```

and a row looks like `DN,de,Außer Betrieb,Anlage ist nicht betriebsbereit`.

</div>

## Seeing it run

```
npx cds watch
```

Request `EquipmentStatus` with a German locale (for example add the header
`Accept-Language: de`, or append `?sap-locale=de`): the labels come back translated, falling
back to English where a translation is missing. One small model, full localization.

Next lesson we connect the entities to each other for real — associations and compositions.
