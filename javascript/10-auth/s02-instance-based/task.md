# Instance-based access

Role checks decide *whether* you can touch an entity. Often you need finer control: *which
rows* you may touch. CAP expresses this with a `where` clause inside `@restrict` — row-level
(instance-based) authorization, still declarative, still enforced by the runtime.

## A where clause referencing the user

```cds
annotate MaintenanceService.WorkOrder with @(restrict: [
  { grant: 'READ', to: 'authenticated-user' },
  { grant: '*',    to: 'authenticated-user', where: 'createdBy = $user' }
]);
```

The second rule grants all operations, but only on rows where `createdBy = $user`. `$user` is
the current user's id; `createdBy` comes from the `managed` aspect (Lesson 3). So everyone can
read work orders, but you can only change the ones you raised. The runtime adds the condition
to the query automatically — you never filter by hand, and the rule can never be bypassed.

`where` can use any model path and user attributes (`$user.<attr>`, e.g. a country or plant the
user is assigned to), enabling scoping like "only my plant's equipment".

## Your task

In `srv/auth.cds`, add an instance-based `@restrict` on `WorkOrder`: READ for any authenticated
user, and write (`*`) only where `createdBy = $user`.

## What the check insists on, and what is yours

- Enforced: a `@restrict` on `WorkOrder` with a `where` clause referencing `$user` and
  `createdBy`.
- Yours: which operations you scope, and whether you use `createdBy` or a user attribute.

<div class="hint">

```cds
{ grant: '*', to: 'authenticated-user', where: 'createdBy = $user' }
```

</div>

## Seeing it run

```
npx cds watch
```

Create a work order as `alice`, then try to modify it as `bob` — `bob` is blocked, because the
row's `createdBy` is `alice`. Reading still works for both.
