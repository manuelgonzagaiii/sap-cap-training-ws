# Lesson 5 · Projections, calculated and virtual elements

Your model now holds the raw facts. But APIs often need *derived* values — a display label, a
line total, a count — and lean, purpose-shaped views rather than the full entity. This lesson
adds computed fields and curated read models without duplicating data or writing handlers:
calculated elements (this stage and the next) and virtual elements plus tailored projections
(the last stage).

## Calculated elements

A **calculated element** is a model element defined by an expression instead of stored data:

```cds
displayName : String = tag || ' - ' || model;
```

This is an **on-read** calculation. Nothing is stored; CAP substitutes the expression into the
SQL every time the element is read, so the value is always consistent with its inputs. Keeping
the derivation in the model — rather than in each handler or each client — means every query,
every UI, every export computes it the same way. That is the whole point: one definition, one
truth.

The `||` operator concatenates strings (here with a ` - ` separator). Calculated elements can
use functions (`upper()`, `length()`), arithmetic, and even navigate associations (next
stage). One rule: a calculated element on the base entity is read through a service projection,
which our `MaintenanceService.Equipment` already is, so it shows up over OData automatically.

## Your task

In `db/schema.cds`, add an on-read calculated `displayName` to `Equipment`, derived from `tag`
and `model`.

## What the check insists on, and what is yours

- Enforced: `Equipment` has a calculated `displayName` (`= <expression>`) that uses both `tag`
  and `model`, and it is on-read (no `stored` keyword).
- Yours: the exact expression and separator — `tag || ' - ' || model`, `model || ' (' || tag
  || ')'`, whatever reads well to you.

<div class="hint">

```cds
displayName : String = tag || ' - ' || model;
```

The `=` makes it calculated; leaving off `stored` makes it on-read.

</div>

## Seeing it run

```
npx cds watch
```

Read `Equipment` over OData: each row now carries a `displayName` computed from your data, with
no column added to the table and no handler written.
