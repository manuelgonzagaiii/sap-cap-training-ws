# Deploy to PostgreSQL

SQLite is perfect for the inner loop, but it is not what you run in production. PostgreSQL
is: a real, free, open-source relational database you can run anywhere — including on your
own machine in Docker, with no account and no cost. In this stage you add a `production`
profile that uses PostgreSQL, and you learn the commands that create its schema and load
your data.

## Why a separate production profile

You do not want to swap your config back and forth by hand. Profiles let both databases
coexist: `development` stays on SQLite (fast, zero infrastructure), `production` uses
PostgreSQL (realistic, durable). CAP picks the right one based on the active profile, so the
same model and the same code run on both — which is exactly the portability CAP promises.

PostgreSQL support comes from the `@cap-js/postgres` plugin (already a dependency). Setting
`kind: postgres` under `[production]` is all the wiring CAP needs; the plugin registers
itself.

## The local container

`pg.yaml` (shown read-only) is what `cds add postgres` generates: a tiny Docker Compose file
that runs PostgreSQL locally. You start it with:

```
docker compose -f pg.yaml up -d
```

That is the only "infrastructure" this course ever asks for, and it is one command on free
software.

## Your task

Open `.cdsrc.json` and fill in the `[production]` database `kind`. The `[development]`
profile from the previous stage is already there.

## What the check insists on, and what is yours

- Enforced: the `production` database resolves to `postgres`, the `development` database is
  still `sqlite`, and `pg.yaml` defines a postgres container on port 5432.
- Yours: any additional connection settings you want to add (a database name, a pool size);
  the defaults are fine for local work.

<div class="hint">

```json
"[production]": {
  "kind": "postgres"
}
```

</div>

## Seeing it run

Start the database, then create its schema and load the seed data, then run against it:

```
docker compose -f pg.yaml up -d
npx cds deploy --to postgres
npx cds watch --profile production
```

`cds deploy --to postgres` translates your CDS model into PostgreSQL DDL, creates the
tables, and imports your CSV rows. Add `--dry` to print the SQL instead of running it — a
good way to see exactly what CAP generates. When you are done, stop the container with
`docker compose -f pg.yaml down`.

That is the whole portability story: one model, SQLite while you build, PostgreSQL when it
counts, the same code on both. Next lesson we make the model itself richer with reusable
aspects, currencies and code lists.
