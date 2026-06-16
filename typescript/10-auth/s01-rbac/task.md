# Lesson 10 · Authentication and authorization

A real service must know *who* is calling and *what* they may do. CAP separates the two:
**authentication** establishes the user (handled by the platform — a JWT from XSUAA/IAS in the
cloud, or mock users locally), and **authorization** is declared on your model with
annotations the runtime enforces on every request. This stage covers role-based access.

## Authentication, locally

You do not stand up an identity provider to develop. CAP's `mocked` auth strategy (the dev
default) lets you define users with roles and sign in with HTTP Basic auth. Define them in
`package.json` (or `.cdsrc.json`):

```json
{ "cds": { "requires": { "auth": { "users": {
  "alice": { "roles": ["Maintenance.Manager"] },
  "bob":   { "roles": ["authenticated-user"] }
} } } } }
```

Then call as `alice:` (no password). Anonymous requests get 401. In production the same model
is enforced against real JWT roles — no code change.

## @requires and @restrict

- **`@requires`** gates a service, entity, or action by (pseudo-)role:
  `annotate MaintenanceService with @(requires: 'authenticated-user');`. Pseudo-roles include
  `authenticated-user` (any signed-in user) and `system-user` (technical calls).
- **`@restrict`** grants specific operations to specific roles:
  ```cds
  annotate MaintenanceService.SparePart with @(restrict: [
    { grant: 'READ', to: 'authenticated-user' },
    { grant: ['CREATE','UPDATE','DELETE'], to: 'Maintenance.Manager' }
  ]);
  ```
  `grant` is the operation(s), `to` the role(s). Checks combine across service → entity →
  action.

Keep authorization in its own file (`srv/auth.cds`) so it does not clutter the model — CAP
auto-loads every `.cds` under `srv/`.

## Your task

In `srv/auth.cds`: require an authenticated user for `MaintenanceService`, and restrict
`SparePart` so any authenticated user can READ but only the `Maintenance.Manager` role can
write.

## What the check insists on, and what is yours

- Enforced: a `@requires` of `authenticated-user` on the service; a `@restrict` on `SparePart`
  with `grant`/`to` rules.
- Yours: the role names you invent (`Maintenance.Manager` is a suggestion) and which entities
  you lock down further.

<div class="hint">

```cds
annotate MaintenanceService with @(requires: 'authenticated-user');
annotate MaintenanceService.SparePart with @(restrict: [
  { grant: 'READ', to: 'authenticated-user' },
  { grant: ['CREATE','UPDATE','DELETE'], to: 'Maintenance.Manager' }
]);
```

</div>

## Seeing it run

```
npx cds watch
```

`curl localhost:4004/odata/v4/maintenance/SparePart` → 401; `curl alice:@localhost:4004/...`
→ 200. Try writing as `bob` (no manager role) → 403.
