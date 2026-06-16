# Lesson 12 · Serving Fiori elements UIs

SAP Fiori elements builds complete, standardised UIs — list reports, object pages, filter
bars, value helps — from **annotations** on your service, with no hand-written UI code. The
backend skill is writing those `@UI` annotations; CAP serves them in the OData metadata and a
Fiori elements app renders them. This lesson annotates the work-order UI.

## @UI annotations

UI annotations live in a `.cds` file under `app/` (separated from the model), referencing the
service:

```cds
using { MaintenanceService } from '../srv/maintenance-service';

annotate MaintenanceService.WorkOrder with @(UI: {
  HeaderInfo      : { TypeName: 'Work Order', TypeNamePlural: 'Work Orders', Title: { Value: orderNo } },
  SelectionFields : [ orderNo, equipment_ID ],
  LineItem        : [ { Value: orderNo }, { Value: description }, { Value: completed } ]
});
```

- **`HeaderInfo`** — the entity's display name and the title field of each record.
- **`SelectionFields`** — which fields appear as filters in the filter bar.
- **`LineItem`** — the columns of the list/table, each a `{ Value: <field> }` record (you can
  add `Label`, criticality, etc.).

These terms come from the standard OData `UI` vocabulary; the SAP Fiori CDS language server
offers code completion for them.

## Your task

In `app/fiori.cds`, complete the WorkOrder `@UI` annotation: a `SelectionFields` filter list
and a `LineItem` column list (orderNo, description, completed). `HeaderInfo` is provided.

## What the check insists on, and what is yours

- Enforced: `WorkOrder` is annotated with `@UI` declaring `HeaderInfo`, `SelectionFields`, and
  a `LineItem` with at least one `{ Value: ... }` column.
- Yours: which fields you filter on and show, their order, and any labels.

<div class="hint">

```cds
SelectionFields : [ orderNo, equipment_ID ],
LineItem        : [ { Value: orderNo }, { Value: description }, { Value: completed } ]
```

</div>

## Seeing it run

```
npx cds watch
```

Open the served index page — CAP lists a Fiori preview for `WorkOrder`. The list shows your
columns and the filter bar shows your selection fields, all from the annotation.
