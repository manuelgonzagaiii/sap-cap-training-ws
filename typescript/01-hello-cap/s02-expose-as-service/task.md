# Expose it as a service

You have a data model, but nothing is reachable over the network yet. A model on its own is
just a description. To turn it into a running API you define a **service**.

## Why a service is separate from the model

The model in `db/schema.cds` is your domain — the full, normalised truth about your data. A
**service** is a *facade* over that truth: it decides which entities to expose, under what
name, and in what shape, for one particular use case. Keeping the two apart is deliberate:

- The domain model can stay clean and complete.
- Different services can expose different slices of it (an admin service, a public service,
  an analytics service) without ever duplicating the model.
- You can reshape the API later without touching the underlying data.

When you expose an entity `as projection on` a model entity, CAP wires up a full OData V4
endpoint for it — read, create, update, delete, paging, filtering, sorting — with **no
handler code**. That generated behaviour is called a *generic provider*. You only write code
later for the parts that are genuinely specific to your business.

## The three pieces you write

- `using { assetcare } from '../db/schema';` — pull the model into this file so the service
  can refer to it. The path is relative, pointing at `db/schema.cds`.
- `service MaintenanceService { ... }` — declare the service. Its name becomes part of the
  URL and is referenced by later lessons, so keep it `MaintenanceService`.
- `entity Equipment as projection on assetcare.Equipment;` — expose the model's `Equipment`
  through the service.

## Your task

Open `srv/maintenance-service.cds` and fill in the blanks: the imported namespace, the
service name, and the projection that exposes `Equipment`. `db/schema.cds` from the previous
stage is shown read-only for reference.

## What the check insists on, and what is yours

- Enforced: the service imports `../db/schema`, is named `MaintenanceService`, and exposes
  `Equipment` as a projection on `assetcare.Equipment` (later lessons rely on these).
- Yours: you may expose additional entities, add `@path`/annotations, or arrange the file
  however you like, as long as the above holds.

<div class="hint">

```cds
using { assetcare } from '../db/schema';

service MaintenanceService {
  entity Equipment as projection on assetcare.Equipment;
}
```

</div>

## Seeing it run

From this stage's folder:

```
npx cds watch
```

Open the URL it prints (by default http://localhost:4004). You will see the
`MaintenanceService` listed with an `Equipment` set. Click it, or open
`/odata/v4/maintenance/Equipment`, to get a live OData response — empty for now, because we
have not added any data, but fully functional. That whole API came from your model and three
lines of service definition.
