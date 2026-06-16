# Backlinks and deep reads

You can navigate from a work order to its equipment, but not yet from an equipment to its
work orders. This stage adds that reverse view and seeds enough data to read the whole graph
in a single request — the payoff for all the modelling you just did.

## One more backlink

The relationship between `Equipment` and `WorkOrder` already exists: `WorkOrder.equipment`
holds the foreign key. To walk it the other way, add a to-many backlink on `Equipment`:

```cds
workOrders : Association to many WorkOrder on workOrders.equipment = $self;
```

This is the same backlink pattern as `Manufacturer.equipments` — and it is an *unmanaged*
to-many: it adds no column, it is purely a query defined by the `on` condition. Read it as
"all WorkOrders whose `equipment` is me". Now the graph is fully navigable: manufacturer →
equipment → work orders → items → spare part.

## Deep reads with $expand

Once associations and compositions exist, OData's `$expand` lets a client pull a whole
sub-tree in one call, and CAP turns it into the right joins automatically — no handler code.
With the seeded data you can ask for a work order and everything under and around it:

```
GET /odata/v4/maintenance/WorkOrder?$expand=equipment,items($expand=part)
```

That returns each work order with its equipment inline and its line items, each item with its
spare part. The same model also powers deep *writes*: POST a work order with nested `items`
and CAP inserts the lot, generating keys and foreign keys for you.

## Your task

1. In `db/schema.cds`, add the `workOrders` to-many backlink on `Equipment`.
2. The seed files `assetcare-WorkOrder.csv` and `assetcare-WorkOrderItem.csv` are provided —
   note how `equipment_ID`, `parent_ID` and `part_ID` wire the graph together.

## What the check insists on, and what is yours

- Enforced: `Equipment` has a `to many WorkOrder` backlink ending in `= $self`; the work-order
  and item seed files carry the foreign keys that link the graph (`equipment_ID`, `parent_ID`,
  `part_ID`).
- Yours: the backlink's name and the seed contents.

<div class="hint">

```cds
workOrders : Association to many WorkOrder on workOrders.equipment = $self;
```

</div>

## Seeing it run

```
npx cds watch
```

Open `WorkOrder?$expand=equipment,items($expand=part)` and read the full document back in one
response. Then try `Equipment?$expand=workOrders` for the reverse. You have modelled a real
business document and its surrounding graph, and CAP serves all of it for free.

Next lesson we shape what the service exposes with projections, calculated and virtual
elements.
