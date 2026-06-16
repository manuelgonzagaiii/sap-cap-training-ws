# AssetCare: authoring conventions and continuity rules

These are the rules for writing each stage of the course. The guided project grows one
codebase across many lessons in two parallel tracks, so consistency between stages matters
more than anything else. The golden rule:

> Build a thing once, then extend it. A later stage must never quietly re-create something
> an earlier stage already built.

Read this before populating any stage. The per-stage checklist is at the end. This file is
the CAP/AssetCare port of the conventions used in the sibling training projects; the
mechanics (markers, the `[[PH:]]` placeholder pipeline) are identical, only the domain and
the stack-specific ladders differ.

## 1. One CDS namespace and one growing model

Use a single namespace everywhere: `assetcare`. Do not let `assetCare`, `am`, or `eam` creep
in as alternatives.

The project layout is the standard CAP one and grows in place, never sideways:

```
db/
  schema.cds            # the domain model: Equipment, Location, Manufacturer, WorkOrder, ...
  data/                 # CSV seed data (assetcare-<Entity>.csv)
  i18n/                 # data/code-list translations
srv/
  maintenance-service.cds   # the main service (projections, actions, events)
  maintenance-service.js    # JS-track handlers  (.ts in the TS track)
  i18n/                     # service messages
app/
  <fiori apps>          # Fiori elements annotations + apps, added from Lesson 12
```

Entities are introduced once in `db/schema.cds` and then extended with `extend` or new
aspects in later lessons (temporal warranty in Lesson 17, personal-data annotations in
Lesson 27, tenant extension fields in Lesson 30). A later lesson never redefines an entity
from scratch.

## 2. One service, projected for each use case

There is one primary service, `MaintenanceService`, that grows lesson by lesson. When a
lesson needs an admin-only or analytics-only surface, add a projection or a second service
on the same model — never a parallel re-modelling of the same entities.

## 3. One money representation

Amounts are modelled once: a `Decimal` `amount` paired with a `currency` association to
`sap.common.Currencies` (via `@sap/cds/common`), annotated with `@Measures.ISOCurrency`.
Introduced in Lesson 3 and reused everywhere (WorkOrderItem unitCost, SparePart price). Do
not invent a second money shape later.

## 4. One status/CodeList vocabulary

`WorkOrderStatus` and `Priority` are `sap.common.CodeList`-based, introduced in Lesson 3
with localized texts, and reused thereafter. Equipment status and inspection result are
enums on the entity. Pick the representation once per concept and keep it.

## 5. The local open-source ladder (no paid services, ever)

Teach the CAP-native or local-OSS option first, then show the production binding as the
"when you deploy" variant. Never make a paid system a hard dependency of a task (see
CLAUDE.md B5).

| Capability        | Local / dev (taught first)                  | Production variant (shown, not required) |
|-------------------|---------------------------------------------|------------------------------------------|
| Database          | SQLite (`@cap-js/sqlite`, in-memory)        | PostgreSQL (`@cap-js/postgres`, Docker) -> HANA |
| Authentication    | mocked auth (mock users/roles/tenants)      | Keycloak (real OIDC/JWT) -> XSUAA / IAS  |
| Messaging         | file-based / local messaging                | Redis (`redis-messaging`) -> Event Mesh / Event Hub |
| Attachments       | binaries in the DB (`@cap-js/attachments`)  | MinIO (S3) -> Document Management / Object Store |
| Email             | Mailpit (local SMTP) via Nodemailer         | (no paid mail service)                   |
| Remote ERP backend| a second local CAP "mock ERP" OData service | S/4HANA via destination (theory)         |
| Launchpad         | CAP Fiori preview / open FLP sandbox        | SAP Build Work Zone + App Router         |

## 6. Track parity: JavaScript and TypeScript

The two tracks teach the identical curriculum and reach the same app. The CDS model
(`db/schema.cds`, `srv/*.cds`) is language-neutral and is effectively shared content — keep
it byte-identical between tracks. Only the handler and test files differ:

- JavaScript track: `srv/*.js` handlers, `test/*.test.js` graders, JSDoc typing.
- TypeScript track: `srv/*.ts` handlers, `@cds-models` types from cds-typer, typed graders.
  The `00-typescript-setup` prologue establishes this toolchain before Lesson 1.

When you populate a stage in one track, mirror it in the other in the same pass so they do
not drift.

## 7. Forward-reference discipline

Order matters in a guided project. A stage may only rely on what an earlier stage actually
built. If a lesson needs a building block that does not exist yet, either add the stage that
builds it earlier, or reword the lesson to use what is already there. Do not describe a
later lesson's feature as if it already exists.

## Per-stage populate checklist

When filling a stage, replace the scaffolded stubs and do the following:

1. `task.md` — the real description. Lead with the reasoning (what it is, why it exists, the
   trade-offs, the mental model), then the instructions, then a worked example and a genuine
   hint. State plainly which parts of the answer are the learner's free choice and which the
   check insists on, and why (CLAUDE.md A7).
2. The solution — author each editable file as `<realname>.tmpl` with `[[PH:hint]]answer[[/PH]]`
   markers over the real learning points, then run `node tools/build-placeholders.mjs <stage-dir>`
   to emit the clean, runnable file(s) and the placeholder offsets in `task-info.yaml`. In a
   framework lesson the file carries forward, so blank only what is new in this stage. A stage
   typically edits several files (`db/schema.cds.tmpl`, `srv/maintenance-service.cds.tmpl`,
   a handler) — each gets its own `.tmpl` and its own placeholders block.
3. `test/<name>.test.js` (graded stages) — real Jest checks that grade validity, not exact
   wording (A7). A different valid answer must pass; an invalid value must fail. Regex/parse
   the `.cds` source, compile to CSN and inspect it, read config, or spin the service up with
   `cds.test` — whatever fits the learning point. Mark the test `visible: false`.
4. Verify the stage in isolation with `npm test` (or `cds test`), then drop a `.populated`
   marker in the lesson directory so the scaffolder leaves the hand-authored lesson alone.
5. Run `node tools/validate-course.mjs` (fix any error), then open the stage in the IDE and
   confirm the rendered blanks look right.

## Markers

- `.scaffold-generated` — written by `tools/scaffold-course.mjs` into dirs it creates. `--clean`
  only removes dirs carrying this marker.
- `.populated` — drop this by hand in a lesson directory once it has real content. The
  scaffolder never overwrites or cleans a dir that carries it.
