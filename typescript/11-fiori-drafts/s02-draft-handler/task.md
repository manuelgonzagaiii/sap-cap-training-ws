# Draft-specific handlers

A draft is a distinct, editable shadow of the active record, so sometimes you want logic that
runs **only while editing a draft** — not on the saved data. CAP's *lean draft* model gives
the draft its own addressable entity, the `.drafts` sibling, and you register handlers against
it separately.

## Active vs draft handlers

```js
this.before('CREATE', 'WorkOrder', ...)          // active entity
this.before('NEW',    'WorkOrder.drafts', ...)   // draft instances only
```

Using the `<entity>.drafts` suffix targets the draft choreography events — `NEW` (a draft is
started), `PATCH` (the draft is edited), `SAVE` (the draft is activated), `EDIT`/`DISCARD`.
This keeps draft-time behaviour cleanly separated from the active-record behaviour you wrote in
Lesson 7; each handler only fires for its intended target.

Here you default a work order's `description` the moment a draft is started, so the user begins
with a sensible placeholder rather than a blank field.

## Your task

In `srv/maintenance-service.js`, add a `before('NEW', 'WorkOrder.drafts', ...)` handler that
defaults `req.data.description` when a draft is created.

## What the check insists on, and what is yours

- Enforced: a handler registered against `WorkOrder.drafts`.
- Yours: which draft event you hook (`NEW`/`PATCH`/`SAVE`) and what it does.

<div class="hint">

```js
this.before('NEW', 'WorkOrder.drafts', (req) => {
  if (!req.data.description) req.data.description = 'New work order';
});
```

</div>

## Seeing it run

```
npx cds watch
```

Create a draft work order (POST `{}`) and read it back with `IsActiveEntity=false`: the
`description` is pre-filled. Create an *active* record directly and the draft handler does not
fire — proof the `.drafts` targeting works.
