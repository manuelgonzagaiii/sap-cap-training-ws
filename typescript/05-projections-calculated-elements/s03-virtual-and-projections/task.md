# Virtual elements and curated projections

The last two stages computed values from data. This stage covers the two remaining shaping
tools: a **virtual element** (a field with no value yet, filled by code at runtime) and a
**curated projection** (a lean, tailored view rather than the whole entity). Both live in the
service, not the database.

## Virtual elements

Sometimes a service needs to return a field that is neither stored nor derivable by an
expression — it is computed in application code per request. You declare a placeholder for it:

```cds
entity Equipment as projection on assetcare.Equipment {
  *,
  virtual openWorkOrders : Integer
};
```

`virtual` means: include this element in the API contract and the OData metadata, but do not
read it from the database. It comes back empty until a custom handler fills it. We will write
that handler in Lesson 7 (a count of each equipment's open work orders) — declaring the slot
now is how the model and the code agree on the shape. This is the modern syntax: a typed
`virtual` element with no expression.

## Curated projections

`as projection on X` does not have to mean "everything". List a subset of columns and you get a
lean read model — fewer fields over the wire, a shape built for one screen. And with a **path
expression** you can flatten a related field into a plain column:

```cds
entity WorkOrderList as projection on assetcare.WorkOrder {
  ID,
  orderNo,
  description,
  equipment.tag as equipmentTag
};
```

`equipment.tag as equipmentTag` reaches across the `equipment` association and surfaces the
tag as a flat column — no `$expand` needed by the client, no join written by you. This is how
you tailor exactly what a list page consumes while the full `WorkOrder` entity stays available
for detail views.

## Your task

In `srv/maintenance-service.cds`:

1. Add a `virtual openWorkOrders : Integer` to the `Equipment` projection.
2. In the `WorkOrderList` projection, flatten the related equipment's `tag` into a column
   named `equipmentTag` using a path expression.

## What the check insists on, and what is yours

- Enforced: the `Equipment` projection has a `virtual` element; a `WorkOrderList` projection
  exists and flattens a related field with an `assoc.field as alias` path expression.
- Yours: the virtual element's name, the columns you include in the list, and the alias names.

<div class="hint">

```cds
*, virtual openWorkOrders : Integer        // a runtime-filled placeholder
equipment.tag as equipmentTag              // flatten across an association
```

</div>

## Seeing it run

```
npx cds watch
```

Read `WorkOrderList` — a compact projection with `equipmentTag` already flattened in. Read
`Equipment` and you will see `openWorkOrders` in the metadata, empty for now; we fill it with a
handler in Lesson 7, where we add custom business logic.
