# A second entity

You have seen the full loop once: model an entity, project it through a service, get an API.
The reason CAP feels productive is that the loop is always the same. To prove it, add a
second entity and watch the same three moves work again.

## Manufacturer

A `Manufacturer` makes the equipment you maintain. For now it is a standalone table — name
and country — with its own UUID key. It is not yet connected to `Equipment`; relationships
(associations and compositions) are a lesson of their own, and wiring them up too early
hides what is actually happening. One concept at a time.

This is also why the namespace matters. Both entities live under `assetcare`, so in the
service you refer to them as `assetcare.Equipment` and `assetcare.Manufacturer`. The
namespace keeps a growing model organised and unambiguous as it fills with dozens of
entities over the coming lessons.

## Your task

Two files, carried forward from the previous stages:

1. In `db/schema.cds`, fill in the new `Manufacturer` entity (its name and a key). The
   `Equipment` entity above it is already there.
2. In `srv/maintenance-service.cds`, expose `Manufacturer` through the service, the same way
   `Equipment` is exposed.

## What the check insists on, and what is yours

- Enforced: `Equipment` is still defined; a `Manufacturer` entity exists with a key; and the
  service exposes `Manufacturer` as a projection on `assetcare.Manufacturer`.
- Yours: the manufacturer's descriptive fields and their types, and the key's name and type.

<div class="hint">

In the model:

```cds
entity Manufacturer {
  key ID  : UUID;
  name    : String;
  country : String;
}
```

In the service, alongside the existing Equipment line:

```cds
entity Manufacturer as projection on assetcare.Manufacturer;
```

</div>

## Seeing it run

```
npx cds watch
```

Open http://localhost:4004 and you will now see both `Equipment` and `Manufacturer` served
by `MaintenanceService`. You have modelled two business objects and stood up a complete
OData V4 API for them without writing any procedural code — that is the baseline CAP gives
you, and everything from here adds real behaviour on top of it.

In the next lesson you move this off the in-memory database and onto a real local PostgreSQL,
with seed data you can actually query.
