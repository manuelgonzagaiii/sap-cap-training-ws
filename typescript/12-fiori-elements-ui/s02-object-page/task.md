# Object page and value help

The list report shows many records; clicking one opens the **object page**. You compose it
from field groups arranged into facets, and you make foreign-key fields user-friendly with
value helps — all still annotations.

## Field groups and facets

```cds
annotate MaintenanceService.WorkOrder with @(UI: {
  FieldGroup #Details : { Data: [
    { Value: orderNo }, { Value: description }, { Value: equipment_ID }, { Value: completed }
  ] },
  Facets : [
    { $Type: 'UI.ReferenceFacet', Label: 'Details', Target: '@UI.FieldGroup#Details' }
  ]
});
```

- **`FieldGroup #Details`** — a named group of fields (the `#Details` is a qualifier so you can
  have several).
- **`Facets`** — the sections of the object page. A `UI.ReferenceFacet` points (`Target`) at a
  FieldGroup (or a related entity's `@UI.LineItem`) to render it as a section.

Multiple `annotate … with @UI` statements on the same entity merge, so the object-page
annotations sit happily alongside the list-page ones from the previous stage.

## Value help

A field backed by a code list should offer a dropdown, not a raw code. Annotate the code-list
entity:

```cds
annotate MaintenanceService.EquipmentStatus with @cds.odata.valuelist;
```

CAP then emits a `Common.ValueList` for every association that targets it (e.g.
`Equipment.status`), and Fiori renders a value-help dialog — no per-field wiring.

## Your task

In `app/fiori.cds`, add a `FieldGroup #Details` and a `Facets` array with a `ReferenceFacet`
that targets it, and annotate `EquipmentStatus` with `@cds.odata.valuelist`.

## What the check insists on, and what is yours

- Enforced: a `FieldGroup` with `Data`; a `Facets` array containing a `ReferenceFacet` that
  targets a `@UI.FieldGroup`; `EquipmentStatus` annotated `@cds.odata.valuelist`.
- Yours: which fields go in the group, how many facets, and the labels.

<div class="hint">

```cds
Facets: [ { $Type: 'UI.ReferenceFacet', Label: 'Details', Target: '@UI.FieldGroup#Details' } ]
```

</div>

## Seeing it run

```
npx cds watch
```

Open a work order in the Fiori preview: the object page shows your Details section, and status
fields offer a value-help dropdown from the code list.
