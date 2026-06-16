# Lesson 9 · Custom actions and functions

CRUD covers create, read, update, delete. But business verbs — *complete this work order*,
*adjust this stock*, *how many parts are low?* — are not CRUD. CAP models them as **actions**
(they change data, called with POST) and **functions** (side-effect-free, called with GET).
You declare them in the model and implement them in a handler. This lesson starts with a bound
action.

## Bound vs unbound

- A **bound** action/function operates on a specific entity instance — like a method. It is
  declared in an `actions { }` block on the entity and called on a single row.
- An **unbound** one is a free operation on the service (next stage).

## Declaring a bound action

Add an `actions` block after the entity body:

```cds
entity WorkOrder : cuid, managed {
  // ...elements...
  completed : Boolean default false;
} actions {
  action completeWorkOrder();
}
```

`completeWorkOrder()` takes no parameters and returns nothing; it just acts on the work order
it is called on. (The service already exposes `WorkOrder`, so the action comes along with it.)

## Implementing it

In the service handler, register an `on` handler for the action. `req.subject` is the targeted
instance as a query you can run against:

```js
this.on('completeWorkOrder', 'WorkOrder', async (req) => {
  await UPDATE(req.subject).with({ completed: true });
  return req.subject;
});
```

`UPDATE(req.subject)` updates exactly the work order the action was invoked on.

## Your task

1. In `db/schema.cds`, declare the bound `action completeWorkOrder()` in the `WorkOrder`
   actions block (the `completed` flag is already added).
2. In `srv/maintenance-service.js`, implement it with an `on('completeWorkOrder', ...)` handler
   that sets `completed` to true on `req.subject`.

## What the check insists on, and what is yours

- Enforced: `WorkOrder` has a `completed : Boolean`; a bound `action completeWorkOrder` is
  declared; the handler implements it with `this.on('completeWorkOrder', ...)`.
- Yours: whether the action returns the updated order, sets a timestamp too, etc.

<div class="hint">

```cds
} actions { action completeWorkOrder(); }
```
```js
this.on('completeWorkOrder', 'WorkOrder', (req) => UPDATE(req.subject).with({ completed: true }));
```

</div>

## Seeing it run

```
npx cds watch
```

POST to `/odata/v4/maintenance/WorkOrder(<id>)/MaintenanceService.completeWorkOrder` — the work
order comes back `completed: true`.
