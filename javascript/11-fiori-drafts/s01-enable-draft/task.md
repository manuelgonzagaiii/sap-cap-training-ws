# Lesson 11 · Fiori drafts

SAP Fiori's signature editing experience is the **draft**: you start editing, your changes are
saved as you go (surviving a refresh or a lost connection), and nothing becomes "real" until
you activate it. Implementing that by hand — shadow tables, locks, concurrent-edit protection
— would be a project in itself. In CAP it is one annotation.

## @odata.draft.enabled

```cds
annotate MaintenanceService.WorkOrder with @odata.draft.enabled;
```

That single line makes `WorkOrder` draft-enabled. CAP generates a draft sibling of the entity,
adds the draft administrative data, and implements the **draft choreography**:

1. **Create a draft** — POST to the collection.
2. **Edit the draft** — PATCH the instance with `IsActiveEntity=false` (repeatedly, save-as-
   you-go).
3. **Activate** — POST `…/draftActivate`, turning the draft into the active record.

Drafts also bring edit locks (two people cannot edit the same record at once) and automatic
garbage collection of abandoned drafts — all from the annotation. Put draft annotations in
their own `srv/drafts.cds` to keep concerns separated.

(For entities with `localized` fields you use `@fiori.draft.enabled` instead, which also
drafts the translation texts.)

## Your task

In `srv/drafts.cds`, annotate `WorkOrder` with `@odata.draft.enabled`.

## What the check insists on, and what is yours

- Enforced: `WorkOrder` is annotated `@odata.draft.enabled`.
- Yours: which other entities you draft-enable (each composition root is its own draft root).

<div class="hint">

```cds
annotate MaintenanceService.WorkOrder with @odata.draft.enabled;
```

</div>

## Seeing it run

```
npx cds watch
```

POST an empty `{}` to `WorkOrder` to get a draft, PATCH it with `IsActiveEntity=false`, then
POST to `…/draftActivate`. The work order only appears as active after activation.
