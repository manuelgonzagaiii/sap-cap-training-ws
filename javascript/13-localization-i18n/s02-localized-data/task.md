# Localized data and translations

Bundles translate *labels* — text that is part of the app. But some text is *data* that itself
needs translating per row: an equipment note, a product description. CAP handles this with the
`localized` modifier, the same mechanism behind the localized CodeList in Lesson 3, now on an
ordinary business field.

## The localized modifier

```cds
entity Equipment : cuid, managed {
  // ...
  notes : localized String;
}
```

Marking `notes` as `localized` makes CAP generate a separate `Equipment.texts` entity, keyed by
the equipment's `ID` plus a `locale`, holding one translation per language. It also wires a
`localized` association so reads automatically return the text in the user's language, falling
back to the base value. You model one word; CAP builds the translation table, the navigation,
and the fallback view.

## Seeding translations

Translations are seed data for the generated `.texts` entity. The file is named after it —
`assetcare-Equipment.texts.csv` — with the key columns plus `locale`:

```
ID,locale,notes
1111...1101,de,Hauptkuehlpumpe der Anlage
```

Each row is one field, in one language, for one record.

## Your task

1. In `db/schema.cds`, make `Equipment.notes` a `localized String`.
2. The German translations in `db/data/assetcare-Equipment.texts.csv` are provided — note its
   `ID`/`locale`/`notes` columns.

## What the check insists on, and what is yours

- Enforced: an element marked `localized String` on `Equipment`; an `Equipment.texts` CSV with
  `ID` and `locale` columns.
- Yours: which field(s) you localize and which languages you ship.

<div class="hint">

```cds
notes : localized String;
```

</div>

## Seeing it run

```
npx cds watch
```

Read `Equipment` with `Accept-Language: de` — `notes` comes back in German; with `en` (or no
header) it falls back to the base value. One keyword, full per-row localization.

That completes Phase C: your service is secured, draft-enabled, annotated for Fiori, and fully
localizable.
