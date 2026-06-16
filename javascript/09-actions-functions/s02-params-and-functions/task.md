# Parameters and unbound functions

Now add a bound action that takes a **parameter** and returns a **value**, and an **unbound
function** on the service.

## Parameters and return types

Action and function signatures are typed, just like entity elements:

```cds
} actions {
  action adjustStock(by: Integer) returns Integer;
}
```

`adjustStock` takes an integer `by` and returns the resulting stock. Parameters are optional
unless marked `not null`; the return type can be a scalar, a structured type, or even an
entity. Implement it by reading the parameter from `req.data`:

```js
this.on('adjustStock', 'SparePart', async (req) => {
  const part = await SELECT.one.from(req.subject);
  const newStock = (part.stock ?? 0) + req.data.by;
  await UPDATE(req.subject).with({ stock: newStock });
  return newStock;
});
```

## Unbound functions

An **unbound** operation belongs to the service, not an instance. Declare it directly in the
service. Use a **function** (GET, no side effects) for queries:

```cds
service MaintenanceService {
  // ...
  function lowStockCount() returns Integer;
}
```

```js
this.on('lowStockCount', async () => {
  const rows = await SELECT.from('assetcare.SparePart').where('stock < reorderLevel');
  return rows.length;
});
```

Rule of thumb: **action** when it changes data (POST), **function** when it only reads (GET).

## Your task

1. In `db/schema.cds`, declare the bound `action adjustStock(by: Integer) returns Integer` on
   `SparePart`.
2. In `srv/maintenance-service.cds`, declare the unbound `function lowStockCount() returns
   Integer`.
3. In `srv/maintenance-service.js`, implement both with `on` handlers.

## What the check insists on, and what is yours

- Enforced: `adjustStock(by: Integer) returns Integer` is declared; `lowStockCount() returns
  Integer` is declared as a function; both are implemented with `this.on(...)`.
- Yours: the exact stock arithmetic, what "low" means, and any extra parameters.

<div class="hint">

```cds
} actions { action adjustStock(by: Integer) returns Integer; }   // on SparePart
function lowStockCount() returns Integer;                        // in the service
```

</div>

## Seeing it run

```
npx cds watch
```

GET `/odata/v4/maintenance/lowStockCount()` for the count; POST to a spare part's
`adjustStock` with `{ "by": 25 }` to change its stock and read the new value back.

That completes Phase B — your service now has real business logic, validation, and operations
beyond CRUD.
