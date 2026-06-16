# After handlers and guards (TypeScript)

Two more handler shapes: **after** (enrich the result) and **before** as a **guard** (reject
bad input).

## after: enrich the result

An `after` handler receives the result rows and can adjust them. This is how you fill the
**virtual** `openWorkOrders` element declared on the Equipment projection (Lesson 5) — there is
no column for it, you compute it per row, writing CQL right in the handler:

```ts
import cds from '@sap/cds';
const { SELECT } = cds.ql;

this.after('READ', 'Equipment', async (rows) => {
  for (const row of Array.isArray(rows) ? rows : [rows]) {
    if (!row) continue;
    const wos = await SELECT.from('assetcare.WorkOrder').where({ equipment_ID: row.ID });
    row.openWorkOrders = wos.length;
  }
});
```

A read can return one object or an array, so you normalise to an array.

## before as a guard

A `before` handler that calls `req.reject` stops the request with a clear error — an imperative
check for rules awkward to express declaratively (the next lesson does validation
*declaratively*):

```ts
this.before(['CREATE', 'UPDATE'], 'SparePart', (req) => {
  if (req.data.stock != null && req.data.stock < 0) req.reject(400, 'Stock cannot be negative');
});
```

## Your task

In `srv/maintenance-service.ts`, add the `after('READ', 'Equipment', ...)` handler that fills
`openWorkOrders`, and the `before(['CREATE','UPDATE'], 'SparePart', ...)` guard against negative
`stock`.

## What the check insists on, and what is yours

- Enforced: an after-READ handler on `Equipment` setting `openWorkOrders`; a before handler on
  `SparePart` that inspects `stock` and rejects/errors on a bad value.
- Yours: the definition of "open", the message and status, `reject` vs `error`.

<div class="hint">

```ts
this.after('READ', 'Equipment', async (rows) => { /* fill row.openWorkOrders */ });
this.before(['CREATE','UPDATE'], 'SparePart', (req) => { /* req.reject on negative stock */ });
```

</div>

## Seeing it run

```
npx cds watch
```

Read `Equipment` (each row has `openWorkOrders`); PATCH a `SparePart` to `stock: -5` and your
rejection fires.
