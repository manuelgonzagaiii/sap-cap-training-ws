# After handlers and guards

Two more handler shapes complete the picture: **after** (enrich the result) and **before**
used as a **guard** (reject bad input).

## after: enrich the result

An `after` handler receives the rows the query produced and can adjust them before they reach
the client. This is exactly how you fill a **virtual element** — the `openWorkOrders` slot you
declared on the Equipment projection back in Lesson 5. There is no column for it; you compute
it per row:

```js
this.after('READ', 'Equipment', async (rows) => {
  for (const row of Array.isArray(rows) ? rows : [rows]) {
    if (!row) continue;
    const wos = await SELECT.from('assetcare.WorkOrder').where({ equipment_ID: row.ID });
    row.openWorkOrders = wos.length;
  }
});
```

Note you write CQL (Lesson 6) right inside the handler, and a read can return one object or an
array, so you normalise to an array.

## before as a guard

A `before` handler that calls `req.reject` (or `req.error`) stops the request with a clear
error — an imperative check for rules that are awkward to express declaratively. Here: never
let a spare part's stock go negative.

```js
this.before(['CREATE', 'UPDATE'], 'SparePart', (req) => {
  if (req.data.stock != null && req.data.stock < 0) req.reject(400, 'Stock cannot be negative');
});
```

`req.reject(code, message)` ends the request; `req.error(...)` collects an error but lets
other checks run too. (The next lesson does the same kind of validation *declaratively*, with
annotations — both styles have their place.)

## Your task

In `srv/maintenance-service.js`, add: an `after('READ', 'Equipment', ...)` handler that fills
`openWorkOrders`, and a `before(['CREATE','UPDATE'], 'SparePart', ...)` handler that rejects a
negative `stock`.

## What the check insists on, and what is yours

- Enforced: an after-READ handler on `Equipment` that sets `openWorkOrders`; a before handler
  on `SparePart` that inspects `stock` and rejects/errors on a bad value.
- Yours: how you define "open", the error message and status code, and whether you use
  `reject` or `error`.

<div class="hint">

```js
this.after('READ', 'Equipment', async (rows) => { /* fill row.openWorkOrders */ });
this.before(['CREATE','UPDATE'], 'SparePart', (req) => { /* req.reject on negative stock */ });
```

</div>

## Seeing it run

```
npx cds watch
```

Read `Equipment` — each row reports `openWorkOrders`. Try to PATCH a `SparePart` with
`stock: -5` and you get your rejection instead of a corrupted row.
