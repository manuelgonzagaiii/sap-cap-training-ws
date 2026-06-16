# Lesson 7 · Custom business logic: event handlers

The generic providers handle plain CRUD. Real applications need rules — defaults,
derivations, checks, side effects. You add them with **event handlers**: functions CAP runs
at precise moments around each request. This lesson writes the service's implementation.

## The service implementation file

CAP links a handler file to a service by name: the service `MaintenanceService` defined in
`srv/maintenance-service.cds` is implemented by `srv/maintenance-service.js`. The modern
shape is a class extending `cds.ApplicationService`, registering handlers in `init()`:

```js
const cds = require('@sap/cds');
class MaintenanceService extends cds.ApplicationService {
  async init() {
    this.before('CREATE', 'WorkOrder', (req) => { /* ... */ });
    await super.init();
  }
}
module.exports = MaintenanceService;
```

`await super.init()` lets the framework finish wiring the generic handlers after yours.

## before / on / after

Each handler attaches to a phase of an event (CREATE/READ/UPDATE/DELETE, or a custom one):

- **before** — runs first. Validate or *modify the incoming data* (`req.data`) before it is
  written. Perfect for defaults and checks.
- **on** — *is* the implementation. The generic provider is CAP's own `on` handler; you
  override it only for custom behaviour (we use it for actions next lesson).
- **after** — runs last, with the *result* in hand. Adjust or enrich what goes back to the
  client.

Here you use **before CREATE** to default a work order's `orderNo` when the client did not
send one — exactly the kind of derivation that belongs in the service, not in every client.
`req.data` is the incoming payload; you simply set a field on it.

## Your task

In `srv/maintenance-service.js`, register a `before('CREATE', 'WorkOrder', ...)` handler that
sets `req.data.orderNo` when it is missing.

## What the check insists on, and what is yours

- Enforced: the service is a `cds.ApplicationService` subclass; it registers a before-CREATE
  handler on `WorkOrder`; the handler defaults `orderNo`.
- Yours: how you generate the number (a timestamp, a counter, a prefix scheme) and any other
  defaults you add.

<div class="hint">

```js
this.before('CREATE', 'WorkOrder', (req) => {
  if (!req.data.orderNo) req.data.orderNo = 'WO-' + Date.now();
});
```

</div>

## Seeing it run

```
npx cds watch
```

POST a `WorkOrder` without an `orderNo` (to `/odata/v4/maintenance/WorkOrder`) and read it
back — it now has one, filled by your handler.
