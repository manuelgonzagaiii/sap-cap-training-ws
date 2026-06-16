# Compositions: the work-order document

Maintenance work is a document: a work order with a header (what, which equipment) and a set
of line items (which spare parts, how many). That "header with contained details" shape is
everywhere in business software — orders and items, invoices and lines, surveys and answers.
CAP models it with a **composition**.

## Composition vs association

They look similar but mean opposite things about *ownership*:

- An **association** is a reference to something that exists on its own. `Equipment.manufacturer`
  points at a manufacturer, but deleting the equipment does not delete the manufacturer.
- A **composition** is containment. A `WorkOrderItem` only exists as part of its `WorkOrder`.
  Create the work order with its items in one request and CAP inserts them together; delete
  the work order and its items go with it. The child has no independent life.

That single modelling choice gives you deep insert, deep update, and cascading delete for
free, plus draft editing later. You write:

```cds
entity WorkOrder : cuid, managed {
  items : Composition of many WorkOrderItem on items.parent = $self;
}
entity WorkOrderItem : cuid {
  parent : Association to WorkOrder;   // the backlink the composition points at
}
```

The `on items.parent = $self` says "my items are the WorkOrderItems whose `parent` is me".
The child carries the backlink (`parent`), exactly like a to-many association — a composition
*is* a to-many, with containment semantics added.

The work order also needs a plain association to the `Equipment` it concerns (that equipment
is not owned by the order — it is referenced), and each item references a `SparePart`.

## Your task

In `db/schema.cds`, complete `WorkOrder` and `WorkOrderItem`:

1. `WorkOrder.equipment` — a to-one association to `Equipment`.
2. `WorkOrder.items` — a composition of many `WorkOrderItem`, backlinked on `$self`.
3. `WorkOrderItem.parent` — the association back to `WorkOrder`.

Then expose `WorkOrder` in `srv/maintenance-service.cds`. The items are reached through the
work order, so they need no projection of their own.

## What the check insists on, and what is yours

- Enforced: `WorkOrder` has a `Composition of many WorkOrderItem` backlinked on `$self`, a
  to-one `equipment` association to `Equipment`, and `WorkOrderItem` backlinks to `WorkOrder`;
  the service exposes `WorkOrder`.
- Yours: extra header fields (a date, a priority — priorities get their own treatment later),
  and how the item references its part.

<div class="hint">

A composition is a to-many plus ownership:

```cds
items : Composition of many WorkOrderItem on items.parent = $self;
```

</div>

## Seeing it run

```
npx cds watch
```

POST a work order with nested `items` in one JSON body — CAP generates the keys and links the
items to the new order automatically (a "deep insert"). The next stage seeds some and reads
them back with `$expand`.
