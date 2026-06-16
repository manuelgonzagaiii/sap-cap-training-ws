# INSERT, UPDATE and DELETE

Reading is half the story. The same `cds.ql` API builds the three write operations, and they
read like plain English once you know the shape.

## The three write builders

```js
INSERT.into('assetcare.SparePart').entries(part)            // add row(s)
UPDATE('assetcare.SparePart').set('stock +=', qty).where({ ID: id })  // change rows
DELETE.from('assetcare.Equipment').where({ ID: id })        // remove rows
```

- **INSERT** — `.into(entity).entries(obj | [obj, ...])`. One object inserts one row; an array
  inserts many. (There are also `.columns(...).rows(...)` and `.values(...)` forms for tabular
  data.)
- **UPDATE** — `UPDATE(entity).set({...}).where({...})`. `.set` can take plain values
  (`{ stock: 0 }`) or an expression. The shorthand `'stock +=', qty` does an **atomic**
  increment in the database — safer than read-then-write under concurrency, which is exactly
  the kind of thing you will care about in real handlers. Always pair an update with a
  `.where` unless you really mean every row.
- **DELETE** — `.from(entity).where({...})`. Same rule: scope it with `.where`.

These still only *build* queries. You run them with `await`/`cds.run`, and — when several must
succeed or fail together — inside a transaction, which is the next stage.

## Your task

In `queries.js`, complete `addSparePart` (INSERT), `restock` (UPDATE with an atomic stock
increase, scoped by ID), and `scrapEquipment` (DELETE by ID).

## What the check insists on, and what is yours

- Enforced: `addSparePart` is an INSERT into `SparePart` with an entries/values payload;
  `restock` is an UPDATE on `SparePart` that `.set`s `stock` and is scoped by `.where`;
  `scrapEquipment` is a DELETE from `Equipment` scoped by `.where`.
- Yours: absolute set (`{ stock: qty }`) versus atomic (`'stock +=', qty`) — both are valid;
  the check just wants `stock` updated for the right row. Prefer the atomic form and the task
  explains why.

<div class="hint">

```js
return UPDATE('assetcare.SparePart').set('stock +=', qty).where({ ID: id });
```

</div>

## Seeing it run

```
npx cds repl --run .
```

```js
const q = require('./queries')
await q.addSparePart({ partNo: 'SP-200', name: 'Seal kit', stock: 10, price: 4.5, currency_code: 'EUR' })
await q.restock('33333333-3333-3333-3333-333333333301', 50)
await q.sparePartById('33333333-3333-3333-3333-333333333301')   // see the new stock
```
