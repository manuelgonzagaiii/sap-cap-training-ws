# Curriculum Roadmap

One guided project — AssetCare, an asset and maintenance management app — built lesson by
lesson. Every lesson is a framework lesson (code carries forward). The list below is the
contract for what we populate, lesson by lesson. Both the `javascript/` and `typescript/`
tracks follow the same sequence; the TypeScript track adds a setup prologue.

The aim is full coverage of the CAP feature surface (including the rare corners), grown on
a single domain. Versions and APIs are grounded in the official CAP docs (cap.cloud.sap),
targeting @sap/cds 9.9.x on the Node.js stack.

## Phase A · Foundations and domain modelling
1. Hello CAP — `cds init`/`cds add`, a CDS entity and service, zero-code OData V4 via
   generic providers, `cds watch`, namespaces
2. Local PostgreSQL persistence — database services, `@cap-js/postgres`,
   `cds deploy --to postgres`, CSV seed data, `cds env` db config (SQLite for the fast loop)
3. Reuse aspects, common types and CodeLists — `@sap/cds/common` (managed, cuid, Country,
   Currency), `sap.common.CodeList`, aspects, localized CodeList texts
4. Associations and compositions — managed associations (to-one/to-many), compositions of
   many (header–detail), deep read via `$expand`, ON-condition associations
5. Projections, calculated and virtual elements — service projections, on-read and stored
   calculated elements, virtual elements, curated read models
6. Querying with CQL / `cds.ql` — SELECT/INSERT/UPSERT/UPDATE/DELETE, CQN, deep
   insert/upsert, transactions (`cds.tx`), `cds repl` query mode

## Phase B · Business logic and validation
7. Custom business logic — event handlers `before`/`on`/`after`, the request object and
   context, lifecycle events, handler registration patterns
8. Input validation and declarative constraints — `@mandatory`, `@assert.range`,
   `@assert.format`, `@assert.target`, declarative `@assert` CASE constraints, i18n messages
9. Custom actions and functions — bound/unbound/collection-bound, actions in aspects, the
   typed JS API, parameters and return types, media-returning functions

## Phase C · Security and the Fiori UI
10. Authentication and authorization — `@requires`, `@restrict` (grant/to/where),
    instance-based access with `$user`, pseudo-roles, mocked auth users in dev
11. Fiori drafts — `@odata.draft.enabled`, lean draft, `.drafts` handlers, draft locks and
    garbage collection, `@fiori.draft.enabled` for localized data
12. Serving Fiori elements UIs — UI annotations (LineItem, SelectionFields, HeaderInfo,
    Facets, FieldGroup), value helps and TextArrangement, list/object pages, `app/` files
13. Localization and i18n — localized String elements and `_texts`, i18n bundles,
    externalized annotation texts, locale normalization and fallback

## Phase D · Rich data and search
14. Media and attachments — LargeBinary with `@Core.MediaType`, `@Core.ContentDisposition`,
    streamed upload/download, media in actions; `@cap-js/attachments` (and the MinIO S3 variant)
15. Full-text and fuzzy search — OData `$search`, `@cds.search` (include/exclude, across
    associations), ranking and fuzziness
16. Recursive hierarchies — self-associations, `@hierarchy` /
    `@Aggregation.RecursiveHierarchy`, Fiori TreeTable for functional locations
17. Temporal data — temporal aspect / `@cds.valid.from`/`to`, time slices, as-of-now and
    time-travel queries (on PostgreSQL)
18. Analytics — OData `$apply` (groupby/aggregate), aggregation over associations, SQL
    window functions, analytical projections / KPIs

## Phase E · Integration and eventing
19. Background jobs and scheduling — `cds.spawn` (detached transactions, `every`),
    privileged/tenant context, graceful shutdown, to auto-generate maintenance work orders
20. Messaging and events — declaring CDS events, `srv.emit`/`on`, the transactional outbox
    (`cds.outboxed`/`unboxed`), brokers (file-based locally, Event Mesh / Cloud Application
    Event Hub / Redis), low-level topics
21. Remote services — `cds import` (EDMX to CSN), consuming remote OData via
    `cds.connect.to`, mocking the remote service locally, remote media, receiving ERP events
22. Protocols and API surface — `@protocol`/`@odata`/`@rest`/`@graphql`/`@path`/`@endpoints`,
    OData V2 vs V4, the `@cap-js/graphql` adapter, OpenAPI / Swagger UI, `cds export` client package
23. Error handling and messages — `req.error`/`req.reject`/`req.warn`, multiple-error
    collection, i18n message bundles, error sanitization

## Phase F · Types, quality and governance
24. TypeScript and typed development — cds-typer, `@cap-js/cds-types`, `cds watch` with tsx,
    typed handlers, enums and arrays (the JS track covers the JSDoc-typing equivalent)
25. Testing CAP applications — `cds.test` (`@cap-js/cds-test`), `cds.test.in()`, Vitest
    (recommended) and Jest/Mocha, integration tests with profiles and resolved bindings
26. Change tracking and audit history — `@cap-js/change-tracking` (`@changelog`,
    changeTracked), tracked entities/fields, the Change History UI facet, reacting to change events
27. Data privacy — `@PersonalData` (EntitySemantics, DataSubjectRole, FieldSemantics),
    IsPotentiallyPersonal/Sensitive, `@cap-js/audit-logging`, Personal Data Management, Data Retention

## Phase G · SaaS and delivery
28. Feature toggles — `fts/` feature folders, extending entities/UI behind a feature,
    per-user/per-tenant feature vectors, feature-gated logic
29. Multitenancy — `cds add multitenancy` / `@sap/cds-mtxs`, the MTX sidecar services,
    tenant subscribe/unsubscribe and provisioning, tenant-isolated databases, lifecycle hooks
30. Extensibility — tenant extensions (extend entities/services), ExtensibilityService,
    extension projects, extending array-valued UI annotations, extension data
31. Productive deployment to SAP BTP — `cds add hana,xsuaa,mta` / kyma / approuter,
    `cds build` and `cds up` (CF default or Kyma), service bindings (`cds bind`), schema
    evolution (`cds deploy --script` for Postgres), GitHub Actions facet (taught as theory
    plus the locally reproducible parts — no paid system is required to pass a task)

## TypeScript prologue (TS track only)
- 00 · TypeScript Setup and Tooling — `cds add typescript`, `@cap-js/cds-types`, cds-typer
  and the `@cds-models` folder (`#cds-models/...` imports), `cds watch` running TS via tsx

---

### Feature coverage map (high level)
- Domain modelling: entities, types, aspects/mixins, associations vs compositions, managed
  and temporal data, localized data, currencies/units, calculated/virtual elements, enums,
  `@sap/cds/common`
- Services: OData V4 (and V2), REST, GraphQL; generic providers; projections; actions and
  functions; events; providing and consuming services; remote services / mashups
- Runtime: custom handlers, CQL/`cds.ql`, transactions, concurrency (ETags + locking),
  background jobs, messaging and the transactional outbox
- Security and governance: authentication strategies, RBAC and instance-based authorization,
  input validation, audit logging, change tracking, data privacy / PDM, security hardening
- UI and experience: Fiori drafts, Fiori elements annotations, value helps, i18n,
  hierarchies, media/attachments, search, analytics
- SaaS and delivery: multitenancy (MTX), extensibility, feature toggles, telemetry/
  observability, deployment to Cloud Foundry and Kyma
- Cross-cutting: the `@cap-js` plugin ecosystem, model reflection, open types and custom
  OData vocabularies, WebSocket, notifications
