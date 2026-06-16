# Lesson 2 · Local persistence and PostgreSQL

In Lesson 1 your service worked, but every response was empty and everything lived in an
in-memory database that vanished on restart. This lesson makes the data real: first by
seeding it, then by choosing where it is stored — SQLite for fast local work, PostgreSQL
for a production-shaped database you run yourself in Docker. No paid database, no cloud.

Three stages:

1. Seed the database from CSV files (this stage).
2. Make the database choice explicit with `cds.requires.db`.
3. Add PostgreSQL for production and deploy to it.

## How CAP loads initial data

CAP looks for CSV files under `db/data/` and loads them into the database automatically
when the server starts. The rule that ties a CSV to an entity is the **file name**: it must
be the entity's *fully-qualified* name with a hyphen, then `.csv`. Our namespace is
`assetcare` and the entity is `Equipment`, so the file is:

```
db/data/assetcare-Equipment.csv
```

Inside, the **first line is a header** naming the columns, and each column must be an
*element of the entity*. The remaining lines are rows of data. That is the whole format —
comma-separated values whose header lines up with your model.

This is also a small but important lesson in consistency: the CSV is only correct if its
columns exist on the entity. Get a column name wrong and CAP cannot map it. So the header is
the part that matters, and it is the part you write.

## Your task

Two files are started for you with sample rows. Fill in the **header line** of each:

- `db/data/assetcare-Equipment.csv` — the columns of `Equipment`.
- `db/data/assetcare-Manufacturer.csv` — the columns of `Manufacturer`.

Use the element names from your `db/schema.cds` (shown read-only), starting with the key.

## What the check insists on, and what is yours

- Enforced: every column in each header must be a real element of the matching entity, the
  key column must be present, and there must be at least one data row. (The check reads your
  own `schema.cds`, so it follows the field names *you* chose in Lesson 1.)
- Yours: the actual rows — how many, and what values. Keep the key values unique.

<div class="hint">

For an entity declared as `entity Equipment { key ID : UUID; tag : String; model : String; serialNo : String; }`, the header is:

```
ID,tag,model,serialNo
```

The key (`ID`) comes first by convention; the rest follow in any order, as long as each name
matches an element.

</div>

## Seeing it run

```
npx cds watch
```

Open `/odata/v4/maintenance/Equipment` (or the link on the index page). This time you get
your seeded rows back, served as OData. `cds watch` reloads the CSVs whenever you change
them.
