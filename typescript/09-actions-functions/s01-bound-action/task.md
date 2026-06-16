# Lesson 9 · Custom actions and functions (TypeScript)

Business verbs — *complete this work order* — are not CRUD. CAP models them as **actions**
(change data, POST) and **functions** (read-only, GET): declared in the model, implemented in
the handler. This stage adds a bound action, in TypeScript.

## Declaring a bound action

A bound action operates on a single entity instance. Declare it in an `actions { }` block on
the entity (this part of the model is the same regardless of handler language):

```cds
entity WorkOrder : cuid, managed {
  // ...
  completed : Boolean default false;
} actions {
  action completeWorkOrder();
}
```

## Implementing it (TypeScript)

In the `.ts` service handler, register an `on` handler. `req.subject` is the targeted instance:

```ts
this.on('completeWorkOrder', 'WorkOrder', async (req) => {
  await UPDATE(req.subject).with({ completed: true });
  return req.subject;
});
```

## Your task

1. In `db/schema.cds`, declare `action completeWorkOrder()` in the `WorkOrder` actions block
   (the `completed` flag is already there).
2. In `srv/maintenance-service.ts`, implement it with `this.on('completeWorkOrder', ...)`.

## What the check insists on, and what is yours

- Enforced: `completed : Boolean`; a bound `action completeWorkOrder`; a TypeScript handler
  (`import cds`, `export default class`) implementing it.
- Yours: whether the action returns the order, stamps a time, etc.

<div class="hint">

```ts
this.on('completeWorkOrder', 'WorkOrder', (req) => UPDATE(req.subject).with({ completed: true }));
```

</div>

## Seeing it run

```
npx cds watch
```

POST to `.../WorkOrder(<id>)/MaintenanceService.completeWorkOrder` — the order returns
`completed: true`.
