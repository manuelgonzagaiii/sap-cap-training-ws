# Lesson 6 · Querying with CQL and cds.ql

So far the generic providers have answered every query for you over OData. Now you learn to
write queries yourself in code — the same queries your custom handlers (next lesson) and your
tests will use. CAP's query language is **CQL**, and in Node.js you build CQL with the
**`cds.ql`** API: the global `SELECT`, `INSERT`, `UPDATE`, `DELETE` builders.

## Build first, run later

A crucial idea: `cds.ql` builders **construct a query object; they do not run it**. `SELECT.from('Equipment')` returns a plain object (a **CQN** — Core Query Notation — the machine-readable form of the query). You run it separately, by `await`-ing it or with `cds.run(query)`. Separating "describe the query" from "execute it" is what lets you compose queries, pass them around, test them, and run them in a transaction.

That is why, in this lesson, each helper **returns** a query instead of running it. You will run them yourself in the REPL.

## SELECT

```cds
SELECT.from('assetcare.Equipment')                       // all rows
SELECT.from('assetcare.Equipment').where({ status_code: 'DN' })  // filtered
SELECT.one.from('assetcare.SparePart').where({ ID: id }) // a single row
```

- `.from(entity)` chooses the source. `.where(...)` filters. `.columns(...)`, `.orderBy(...)`,
  `.limit(...)` refine it.
- `.one` makes it return a single object instead of an array — perfect for a by-ID lookup.
- `status_code` is the foreign-key column of the `status` association (Lesson 3), so filtering
  by `{ status_code: 'DN' }` finds all down equipment.

## Your task

Open `queries.js` and complete the three SELECT builders: `allEquipment`, `downEquipment`
(filtered to status `'DN'`), and `sparePartById` (a single row by ID).

## What the check insists on, and what is yours

- Enforced: each function builds a `SELECT` on the right entity; `downEquipment` filters by
  status; `sparePartById` narrows to one row by ID.
- Yours: the exact style — builder calls (`SELECT.from(...).where(...)`), a tagged template
  (`` SELECT`...from Equipment` ``), or a plain CQN object are all accepted, because they all
  describe the same query.

<div class="hint">

```js
return SELECT.from('assetcare.Equipment').where({ status_code: 'DN' });
```

</div>

## Seeing it run

Queries are built here but run in the REPL. From this stage's folder:

```
npx cds repl --run .
```

That loads the AssetCare model and seed data. Then:

```js
const q = require('./queries')
await q.downEquipment()        // runs the SELECT against the in-memory database
await q.sparePartById('33333333-3333-3333-3333-333333333301')
```

You will get back real rows — the same query objects, now executed.
