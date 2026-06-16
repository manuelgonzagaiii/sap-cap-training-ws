# Declarative @assert constraints

The single-purpose annotations cover common cases. For a *business rule* — especially one that
spans several fields — CAP offers the general `@assert` constraint: a CASE expression that
returns an **error message string** when the rule is violated, and nothing when it holds.

## @assert with a CASE expression

```cds
annotate SparePart with {
  reorderLevel @assert: (case
    when reorderLevel > stock then 'Reorder level cannot exceed stock'
  end);
}
```

Read it plainly: *if* `reorderLevel` is greater than `stock`, the constraint fails with that
message; otherwise it passes. You can list several `when … then …` branches for several
conditions, reference any field of the entity (so cross-field rules are easy), even check
associations with `exists`. The returned string can be literal text or an i18n key, so the
message localizes. The runtime evaluates the constraint on every write and pushes it down to
the database where it can.

This is the declarative counterpart to the imperative `req.reject` guard you wrote in Lesson
7 — prefer declarative when the rule is about the data itself; reach for a handler when it
needs external context.

## Your task

`SparePart` now has a `reorderLevel`. In `db/schema.cds`, complete the `annotate SparePart`
block with an `@assert` CASE expression that rejects a `reorderLevel` greater than `stock`.

## What the check insists on, and what is yours

- Enforced: a declarative `@assert: (case …)` constraint whose condition compares
  `reorderLevel` to `stock`.
- Yours: the message text (literal or an i18n key) and any additional `when` branches.

<div class="hint">

```cds
reorderLevel @assert: (case when reorderLevel > stock then 'Reorder level cannot exceed stock' end);
```

</div>

## Seeing it run

```
npx cds watch
```

PATCH a `SparePart` so `reorderLevel` exceeds its `stock` — the write is rejected with your
message. One line of model, enforced on every channel.
