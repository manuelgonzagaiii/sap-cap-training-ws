# Lesson 7 · Custom business logic: event handlers (TypeScript)

The generic providers handle plain CRUD; real rules — defaults, derivations, checks, side
effects — go in **event handlers**. This is the TypeScript implementation of the service.

## The service implementation file

CAP links `srv/maintenance-service.ts` to the `MaintenanceService` defined in
`srv/maintenance-service.cds`. The modern shape is a class extending `cds.ApplicationService`,
registering handlers in `init()`:

```ts
import cds from '@sap/cds';
export default class MaintenanceService extends cds.ApplicationService {
  async init() {
    this.before('CREATE', 'WorkOrder', (req) => { /* ... */ });
    await super.init();
  }
}
```

`import cds from '@sap/cds'` gives the typed API; `await super.init()` lets the framework wire
its generic handlers after yours.

## before / on / after

- **before** — runs first; validate or modify `req.data` before the write. Defaults and checks.
- **on** — *is* the implementation (the generic provider). You override it for custom actions
  (next lesson).
- **after** — runs last, with the result; enrich what goes back.

Here you use **before CREATE** to default a work order's `orderNo` when the client omitted it.

## Your task

In `srv/maintenance-service.ts`, register a `before('CREATE', 'WorkOrder', ...)` handler that
sets `req.data.orderNo` when missing.

## What the check insists on, and what is yours

- Enforced: a TypeScript `cds.ApplicationService` subclass that registers a before-CREATE
  handler on `WorkOrder` defaulting `orderNo`.
- Yours: how you generate the number, and any extra defaults.

<div class="hint">

```ts
this.before('CREATE', 'WorkOrder', (req) => {
  if (!req.data.orderNo) req.data.orderNo = 'WO-' + Date.now();
});
```

</div>

## Seeing it run

```
npx cds watch
```

`cds watch` runs your `.ts` via tsx. POST a `WorkOrder` without an `orderNo` and read it back —
it has one now.
