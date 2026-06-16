# Lesson 13 · Localization and i18n

A product used in more than one country needs more than one language — for its labels and for
its data. CAP handles both with almost no code: **text bundles** for UI labels and messages
(this stage), and **localized data** for per-row translatable content (next stage). You have
already met one slice of this (the localized CodeList in Lesson 3); now you generalise it.

## Externalized text bundles

Hard-coding `'Work Order'` in an annotation means it can never be translated. Instead you put
the text in an `i18n` bundle and reference its key:

```properties
# _i18n/i18n.properties
WorkOrder   = Work Order
Description = Description
```

```cds
annotate MaintenanceService.WorkOrder with @title: '{i18n>WorkOrder}';
annotate MaintenanceService.WorkOrder:description with @title: '{i18n>Description}';
```

`{i18n>WorkOrder}` tells CAP to resolve the label from the bundle at runtime, in the user's
language. Add `_i18n/i18n_de.properties` with German values and German users see German labels,
falling back to the default bundle when a key is missing. The default bundle lives in
`_i18n/i18n.properties`; CAP merges the most specific language down to it.

## Your task

1. In `_i18n/i18n.properties`, define label entries as `key = value`.
2. In `srv/labels.cds`, annotate `WorkOrder` and its `description` with `@title` referencing
   those keys via `{i18n>...}`.

## What the check insists on, and what is yours

- Enforced: the bundle has `key = value` entries; annotations reference them with
  `{i18n>...}`.
- Yours: the keys and their default text, and which elements you label.

<div class="hint">

```cds
annotate MaintenanceService.WorkOrder:description with @title: '{i18n>Description}';
```

</div>

## Seeing it run

```
npx cds watch
```

Open `$metadata` (or the Fiori preview) with `Accept-Language: en` — labels come from your
bundle. Add `i18n_de.properties` and request with `Accept-Language: de` to see them switch.
