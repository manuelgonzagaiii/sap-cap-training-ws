# Lesson 4 · Associations and compositions

Until now every entity stood alone. Real data is a graph: equipment is made by a
manufacturer, a work order is raised against equipment and contains line items. This lesson
connects AssetCare's entities — first with associations (this stage), then with compositions
to model a true document (next stages). These are the relationships that make CAP's generated
OData navigation and deep reads possible.

## Associations: pointers between entities

An **association** is a typed reference from one entity to another — the model-level
equivalent of a foreign key, but you navigate it by name instead of joining by hand.

- A **managed to-one** association is the simple case: `manufacturer : Association to
  Manufacturer`. CAP automatically adds the foreign-key column (`manufacturer_ID`) and the
  join condition. You never manage the key yourself; that is what "managed" means.
- A **to-many** association has no column of its own — it is the reverse view of a to-one on
  the other side. You express it with a **backlink**: `equipments : Association to many
  Equipment on equipments.manufacturer = $self`. Read that as "all Equipment whose
  `manufacturer` points back at me (`$self`)". It produces no extra column; it is resolved by
  the existing `manufacturer_ID` on Equipment.

Together they make the relationship navigable both ways: from an equipment to its maker, and
from a maker to all its equipment — which is exactly what OData `$expand` walks.

## Your task

In `db/schema.cds`:

1. Give `Equipment` a managed to-one `manufacturer` association to `Manufacturer`.
2. Give `Manufacturer` the reverse to-many `equipments` association, using a backlink on
   `$self`.

The seed `Equipment` CSV now has a `manufacturer_ID` column (the managed FK) linking each
asset to a manufacturer, so the navigation returns real data.

## What the check insists on, and what is yours

- Enforced: `Equipment.manufacturer` is a to-one `Association to Manufacturer`;
  `Manufacturer.equipments` is a `to many Equipment` backlink ending in `= $self`.
- Yours: the association names (`manufacturer`/`equipments` are conventional but the check
  accepts your backlink as long as it targets the right entity with a `$self` condition) and
  any other fields.

<div class="hint">

```cds
entity Equipment : cuid, managed {
  // ...
  manufacturer : Association to Manufacturer;
}
entity Manufacturer : cuid, managed {
  // ...
  equipments : Association to many Equipment on equipments.manufacturer = $self;
}
```

</div>

## Seeing it run

```
npx cds watch
```

Try `Equipment?$expand=manufacturer` — each asset now carries its manufacturer inline. Try
`Manufacturer?$expand=equipments` for the reverse. One model, navigation both ways, zero
handler code.
