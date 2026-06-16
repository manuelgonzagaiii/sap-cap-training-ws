# Parameters and unbound functions (TypeScript)

Add a bound action with a **parameter** and a **return**, and an **unbound function** on the
service.

## Parameters and return types

```cds
} actions {
  action adjustStock(by: Integer) returns Integer;
}
```

Read the parameter from `req.data` and return a value:

```ts
this.on('adjustStock', 'SparePart', async (req) => {
  const part: any = await SELECT.one.from(req.subject);
  const newStock = (part.stock ?? 0) + req.data.by;
  await UPDATE(req.subject).with({ stock: newStock });
  return newStock;
});
```

## Unbound functions

An unbound operation belongs to the service. Use a **function** (GET) for reads:

```cds
service MaintenanceService {
  // ...
  function lowStockCount() returns Integer;
}
```

```ts
this.on('lowStockCount', async () => {
  const rows = await SELECT.from('assetcare.SparePart').where('stock < reorderLevel');
  return rows.length;
});
```

Action when it changes data (POST); function when it only reads (GET).

## Your task

1. In `db/schema.cds`, declare `action adjustStock(by: Integer) returns Integer` on `SparePart`.
2. In `srv/maintenance-service.cds`, declare `function lowStockCount() returns Integer`.
3. In `srv/maintenance-service.ts`, implement both with `on` handlers.

## What the check insists on, and what is yours

- Enforced: `adjustStock(by: Integer) returns Integer` and `lowStockCount() returns Integer`
  declared; both implemented in the TypeScript handler.
- Yours: the stock arithmetic and the definition of "low".

<div class="hint">

```cds
} actions { action adjustStock(by: Integer) returns Integer; }
function lowStockCount() returns Integer;
```

</div>

## Seeing it run

```
npx cds watch
```

GET `.../lowStockCount()`; POST a spare part's `adjustStock` with `{ "by": 25 }`. That completes
Phase B on the TypeScript track.
