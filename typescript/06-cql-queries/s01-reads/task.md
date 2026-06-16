# Lesson 6 · Querying with CQL and cds.ql (TypeScript)

This is the TypeScript port of the CQL lesson. The query API is identical to JavaScript — the
difference is TypeScript syntax (`import`/`export`, typed parameters) and the editor's
type-checking and completion that come with it.

CAP's query language is **CQL**, and in Node.js you build it with the **`cds.ql`** API: the
`SELECT`, `INSERT`, `UPDATE`, `DELETE` builders, destructured from `cds.ql`.

## Build first, run later

`cds.ql` builders **construct a query object (a CQN) — they do not run it**.
`SELECT.from('assetcare.Equipment')` returns a plain object; you run it separately with
`await`/`cds.run`. That separation is what makes queries composable, testable, and
transaction-friendly — so each helper here *returns* a query.

## SELECT in TypeScript

```ts
import cds from '@sap/cds';
const { SELECT } = cds.ql;

export function downEquipment() {
  return SELECT.from('assetcare.Equipment').where({ status_code: 'DN' });
}
export function sparePartById(id: string) {
  return SELECT.one.from('assetcare.SparePart').where({ ID: id });
}
```

- `import cds from '@sap/cds'` gives you the typed CAP API (thanks to the `tsconfig` path you
  set in the setup lesson).
- `.from`, `.where`, `.one` work exactly as in JavaScript.
- Typed parameters (`id: string`) are the TypeScript dividend — the compiler and editor catch
  mistakes before you run anything.

Entities are referenced here by name (`'assetcare.Equipment'`). The fully-typed alternative —
importing generated entity classes from `#cds-models/assetcare` and passing them to
`SELECT.from(...)` — is the focus of the typed-development lesson; the setup is already in
place for it.

## Your task

Open `queries.ts` and complete the three SELECT builders: `allEquipment`, `downEquipment`
(filtered to status `'DN'`), and `sparePartById` (one row by ID).

## What the check insists on, and what is yours

- Enforced: the file imports `cds` and `export`s the functions (it is TypeScript); each builds
  a `SELECT` on the right entity; `downEquipment` filters by status; `sparePartById` narrows
  to one row by ID.
- Yours: the exact query style — builder, tagged template, or plain CQN all pass.

<div class="hint">

```ts
return SELECT.from('assetcare.Equipment').where({ status_code: 'DN' });
```

</div>

## Seeing it run

```
npx cds repl --run .
```

`cds watch`/`cds repl` detect `tsconfig.json` and run your TypeScript via `tsx` — no build
step. Then:

```ts
const q = require('./queries')
await q.downEquipment()
```
