# Lesson 1 · Hello CAP

Welcome to the build. Over this first lesson you create the heart of a CAP application —
a data model — and get a fully working web API out of it without writing a single line of
handler code. Three short stages:

1. Model your first entity (this stage).
2. Expose it as a service that answers HTTP requests.
3. Add a second entity and see the pattern repeat.

By the end you will understand what CAP actually does for you, so the "magic" is never
magic again.

## What is CAP, and what is CDS?

CAP (the SAP Cloud Application Programming Model) is a framework for building services and
their databases. You describe your data and services *declaratively*, and CAP generates the
plumbing: database tables, an OData web API, input handling, and more.

The language you describe things in is **CDS** (Core Data Services), written in `.cds`
files using a notation called CDL. You write the model once; CAP derives the SQL schema and
the API from it. That "say it once" idea is the whole point — there is a single source of
truth, and everything else is generated from it.

## The two things you write here

- **A namespace.** A namespace is a stable prefix for every name in your model, so your
  `Equipment` never collides with someone else's `Equipment`. We use `assetcare`. Think of
  it like a package name. Everything we model lives under `assetcare.*`.

- **An entity.** An entity is a business object that becomes a database table — here,
  `Equipment`, one physical asset the maintenance team looks after. Inside it you declare
  *elements* (the columns), each as `name : Type`. One element is marked `key`: the unique
  identifier for each row. We use a `UUID` key, which CAP can fill in automatically — a
  good default because it never clashes, even across systems.

## Your task

Open `db/schema.cds` and fill in the highlighted blanks:

- the namespace (`assetcare`),
- the entity name (`Equipment`),
- a key element (for example `key ID : UUID`).

The other elements (`tag`, `model`, `serialNo`) are already there as examples of what an
entity's data looks like.

## What the check insists on, and what is yours

The check is strict only about what the rest of the course is built on, and free about the
rest:

- Enforced: the namespace must be `assetcare`, there must be an entity named `Equipment`,
  and it must have a key plus at least one more element. Later lessons reference these names.
- Yours to choose: the key's name and type (any valid key works — `ID : UUID`, `code :
  String`, whatever you justify), and which descriptive elements you add and their types.

<div class="hint">

An entity looks like this:

```cds
namespace assetcare;

entity Equipment {
  key ID   : UUID;
  tag      : String;
}
```

The `key` modifier marks the unique identifier; `UUID` lets CAP generate the value for you.

</div>

## Seeing it run

From this stage's folder you can start CAP with:

```
npx cds watch
```

At this stage you have a model but no service yet, so CAP will report that it found no
service definitions to serve — that is expected. You give it a service to expose in the
next stage. Stop the server with Ctrl+C.
