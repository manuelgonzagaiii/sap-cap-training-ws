# Lesson 8 · Input validation and declarative constraints

In the last lesson you rejected bad input with handler code. Often you do not need code at
all: CAP enforces validation **declaratively**, from annotations on the model. You state the
rule once, and the runtime checks every CREATE and UPDATE — over OData, REST, GraphQL, and in
your own writes — returning a clear, localizable error. Less code, enforced everywhere.

## The core validation annotations

- **`@mandatory`** — the field must be provided (and non-empty) on input.
- **`@assert.range`** — a numeric/date value must fall in a range. Closed by default,
  `[0,100]`; parentheses make a bound exclusive, `[(0),_]` means "greater than 0"; `_` is
  infinity. `[0,_]` is "zero or more".
- **`@assert.format`** — a string must match a regular expression, e.g. `'^SP-\d+$'`. Add
  `@assert.format.message` for a custom message.
- **`@assert.target`** — a managed association's referenced row must actually exist; otherwise
  the write is rejected with a user-friendly error.

Annotations attach to an element either before it or inline after its type:

```cds
@mandatory
@assert.format: '^SP-\d+$'
partNo : String;

stock : Integer @assert.range: [0,_];
manufacturer : Association to Manufacturer @assert.target;
```

## Your task

In `db/schema.cds`, add:
- `@assert.target` on `Equipment.manufacturer`,
- `@mandatory` and `@assert.format` (pattern `SP-<digits>`) on `SparePart.partNo`,
- `@assert.range` on `SparePart.stock` (zero or more),
- `@assert.range` on `WorkOrderItem.quantity` (greater than zero).

## What the check insists on, and what is yours

- Enforced: the model uses `@assert.target`, `@mandatory`, `@assert.format`, and
  `@assert.range`.
- Yours: the exact regex pattern, the precise bounds, and any custom `.message` text you add.

<div class="hint">

```cds
stock : Integer @assert.range: [0,_];
quantity : Integer @assert.range: [(0),_];   // strictly positive
```

</div>

## Seeing it run

```
npx cds watch
```

POST a `SparePart` with `partNo: 'X1'` (wrong format) or a `WorkOrderItem` with `quantity: 0`,
and CAP rejects it with a validation error — no handler involved.
