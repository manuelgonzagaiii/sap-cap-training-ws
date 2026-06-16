# Stored and association-based calculations

On-read calculations are recomputed on every read. Sometimes you want the opposite — the value
computed once and *persisted* — and sometimes the value depends on a *related* row. This stage
covers both: a stored calculation and an on-read calculation that navigates an association.

## Stored (on-write) calculations

Add the keyword `stored` and the expression is materialised as a real database column,
computed when the row is written:

```cds
inventoryValue : Decimal = stock * price stored;
```

CAP translates this to a `GENERATED ALWAYS AS (stock * price) STORED` column. Use `stored`
when you want to **sort, filter or index** on the derived value, or when it is expensive to
recompute — you trade a little write cost and storage for fast reads. The catch: a stored
column can only use columns of the **same row**. It cannot navigate associations, because those
live in other tables.

## On-read calculations across associations

When the value depends on a related entity, it must be on-read. A work-order line's total is
its quantity times the *part's* price — and the price lives on `SparePart`, reached through the
`part` association:

```cds
lineTotal : Decimal = quantity * part.price;
```

CAP resolves `part.price` with a join at read time. This cannot be `stored` (the price is in
another table and could change), which is exactly why on-read and stored both exist: pick on-
read for cross-row or volatile values, stored for same-row values you query heavily.

## Your task

In `db/schema.cds`:

1. Add a **stored** `inventoryValue` to `SparePart`, computed from `stock` and `price`.
2. Add an **on-read** `lineTotal` to `WorkOrderItem`, computed from `quantity` and the part's
   price (`part.price`).

## What the check insists on, and what is yours

- Enforced: `inventoryValue` uses `stock` and `price` and is `stored`; `lineTotal` uses
  `quantity` and `part`(`.price`) and is on-read (no `stored`).
- Yours: the precision of the decimals and any rounding you add.

<div class="hint">

```cds
inventoryValue : Decimal = stock * price stored;   // same-row -> can be stored
lineTotal      : Decimal = quantity * part.price;  // crosses an association -> on-read
```

</div>

## Seeing it run

```
npx cds watch
```

Read `SparePart` (note `inventoryValue` is a real persisted column) and
`WorkOrder?$expand=items` — each item now reports its `lineTotal`, joined from its part on the
fly.
