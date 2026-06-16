# Configure the database

So far CAP has been guessing your database for you: with `@cap-js/sqlite` installed it spins
up an in-memory SQLite on every start, loads your CSVs, and throws it all away when you stop.
That is a great default for experiments, but the moment you care about *which* database, in
*which* environment, you make the choice explicit. You do that with configuration, not code.

## cds.requires.db

CAP reads its configuration from `cds.requires`. The database is one required service, keyed
`db`. You set its `kind` — `sqlite`, `postgres`, `hana`, and so on — and CAP loads the
matching implementation. This is the same `requires` mechanism you will later use for
messaging, remote services and auth, so it is worth meeting properly now.

Configuration can live in `package.json` (under a `cds` key) or in a dedicated `.cdsrc.json`
file. We use `.cdsrc.json` because it keeps app configuration in one obvious place.

## Profiles: different settings per environment

A real app uses different databases in different situations: a quick local file or in-memory
DB while developing, a managed database in production. CAP expresses this with **profiles**.
A key written as `[development]` or `[production]` only applies when that profile is active.
`cds watch` runs the `development` profile by default; production deployment runs
`production`.

In this stage you configure the `development` database as SQLite, persisted to a file so
your data survives a restart (`credentials.url` is the file). The next stage adds a
`production` profile for PostgreSQL.

## Your task

Open `.cdsrc.json` and fill in the development database `kind` and the SQLite file name.

## What the check insists on, and what is yours

- Enforced: `.cdsrc.json` is valid JSON and the development database resolves to `sqlite`
  (a real, supported kind — not a typo). A plain `requires.db.kind` instead of a
  `[development]` profile is also accepted.
- Yours: the database file name, and whether you keep it in-memory (`:memory:`) or in a file.

<div class="hint">

```json
{
  "requires": {
    "db": {
      "[development]": {
        "kind": "sqlite",
        "credentials": { "url": "db.sqlite" }
      }
    }
  }
}
```

</div>

## Seeing it run

```
npx cds deploy   # creates db.sqlite and loads your CSV data into it
npx cds watch    # serves against that database
```

Stop and restart `cds watch`: your seeded rows are still there, because they now live in a
file rather than in memory.
