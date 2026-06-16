# INSERT, UPDATE and DELETE (TypeScript)

The same `cds.ql` write builders as the JavaScript track, in TypeScript with typed parameters.

```ts
INSERT.into('assetcare.SparePart').entries(part)
UPDATE('assetcare.SparePart').set('stock +=', qty).where({ ID: id })
DELETE.from('assetcare.Equipment').where({ ID: id })
```

- **INSERT** — `.into(entity).entries(obj | [obj, ...])`.
- **UPDATE** — `UPDATE(entity).set(...).where(...)`. The shorthand `'stock +=', qty` does an
  **atomic** increment in the database (safer than read-then-write under concurrency). Always
  scope an update with `.where`.
- **DELETE** — `.from(entity).where(...)`.

These build queries; you run them with `await`/`cds.run`, and group them in a transaction when
they must succeed together (next stage). Note the typed parameters: `qty: number`,
`id: string` — the compiler checks your call sites for you.

## Your task

In `queries.ts`, complete `addSparePart` (INSERT), `restock` (UPDATE with an atomic stock
increase, scoped by ID), and `scrapEquipment` (DELETE by ID).

## What the check insists on, and what is yours

- Enforced: the file is TypeScript (imports `cds`, `export`s the functions); `addSparePart`
  is an INSERT into `SparePart`; `restock` is an UPDATE that `.set`s `stock` scoped by
  `.where`; `scrapEquipment` is a DELETE from `Equipment` scoped by `.where`.
- Yours: absolute set (`{ stock: qty }`) versus atomic (`'stock +=', qty`) — both pass; prefer
  atomic.

<div class="hint">

```ts
return UPDATE('assetcare.SparePart').set('stock +=', qty).where({ ID: id });
```

</div>

## Seeing it run

```
npx cds repl --run .
```

```ts
const q = require('./queries')
await q.addSparePart({ partNo: 'SP-200', name: 'Seal kit', stock: 10, price: 4.5, currency_code: 'EUR' })
await q.restock('33333333-3333-3333-3333-333333333301', 50)
```
