# Lesson 3 · Reuse aspects, common types and code lists

Your model works, but it is about to repeat itself. Every entity needs a key. Most need to
record who created and changed each row, and when. Many need currencies, countries, or a set
of allowed status values. If you hand-write all of that on every entity, you copy the same
lines forever and they drift apart over time.

CAP's answer is reuse, and it ships a small standard library for exactly this:
`@sap/cds/common`. This lesson refactors AssetCare to lean on it — first with aspects
(this stage), then reuse types like `Currency` (next stage), then code lists with
translatable texts (last stage). The model gets shorter and more consistent, not longer.

## Aspects: reusable fragments of a model

An **aspect** is a named bundle of elements and annotations you can mix into an entity. You
apply one with a colon: `entity Equipment : someAspect { ... }`. The entity gets everything
the aspect declares, as if you had typed it yourself. You can apply several at once, comma-
separated. This is composition for data models — define a concern once, reuse it everywhere.

Two aspects from `@sap/cds/common` cover what almost every entity needs:

- **`cuid`** adds `key ID : UUID` — a canonical, auto-generated unique key. You stop writing
  the key line by hand, and every entity keys the same way.
- **`managed`** adds `createdAt`, `createdBy`, `modifiedAt`, `modifiedBy`, and fills them
  automatically on insert and update. You get audit metadata for free, filled by the runtime.

Because `cuid` provides the key, you remove the explicit `key ID : UUID;` line — the aspect
is the single source of that decision now.

## Your task

Open `db/schema.cds` and:

1. Import `cuid` and `managed` from `@sap/cds/common`.
2. Apply both aspects to `Equipment` and to `Manufacturer`.

Your seed CSVs still use the `ID` column, which is exactly what `cuid` provides, so the data
keeps loading.

## What the check insists on, and what is yours

- Enforced: both entities reuse `cuid` and `managed`, imported from `@sap/cds/common`.
- Yours: the order you list the aspects, any extra elements you keep, and whether you also
  factor them into your own combined aspect (for example `aspect primary : cuid, managed {}`)
  — a perfectly valid alternative the check still accepts as long as cuid and managed end up
  applied.

<div class="hint">

```cds
using { cuid, managed } from '@sap/cds/common';

entity Equipment : cuid, managed {
  tag : String;
  // ...no hand-written key needed; cuid provides it
}
```

</div>

## Seeing it run

```
npx cds watch
```

Read an `Equipment` row over OData: alongside your own fields you will now see `ID` plus
`createdAt`/`createdBy` populated automatically. You wrote less and got more.
