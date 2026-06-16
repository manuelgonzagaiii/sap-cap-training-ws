# Deep insert and transactions (TypeScript)

Two ideas finish the query lesson: writing a whole document in one statement (deep insert),
and grouping writes so they all succeed or all roll back (transactions).

## Deep insert

Because `WorkOrder.items` is a composition, you insert a work order *and* its line items in a
single statement by nesting the children in `entries`:

```ts
INSERT.into('assetcare.WorkOrder').entries({
  orderNo: 'WO-6001',
  equipment_ID: '1111...1101',
  items: [
    { part_ID: '3333...3301', quantity: 2 },
    { part_ID: '3333...3303', quantity: 1 },
  ],
});
```

CAP creates the `WorkOrderItem` rows, generates their keys, and sets their parent foreign key
to the new work order — the whole document written as one tree.

## Transactions

When several writes must all succeed or all roll back, wrap them in `cds.tx`:

```ts
await cds.tx(async () => {
  await cds.run(createWorkOrder('WO-6001', equipmentId, items));
  await cds.run(restock(partId, -2));
});
```

If any statement throws, CAP rolls the whole block back; otherwise it commits. A single
`await`-ed query is auto-wrapped in its own transaction, so you reach for `cds.tx` only to
group operations. You will use exactly these patterns inside handlers next lesson.

## Your task

In `queries.ts`, complete `createWorkOrder` so it returns a **deep** INSERT into `WorkOrder`
whose `entries` include `orderNo`, `equipment_ID`, and the nested `items` array.

## What the check insists on, and what is yours

- Enforced: the file is TypeScript; `createWorkOrder` builds an INSERT into `WorkOrder` with
  `entries` carrying the nested `items`.
- Yours: the header fields; the transaction code above is to run, not graded (it executes
  rather than building a query).

<div class="hint">

```ts
return INSERT.into('assetcare.WorkOrder').entries({ orderNo, equipment_ID: equipmentId, items });
```

</div>

## Seeing it run

```
npx cds repl --run .
```

```ts
const q = require('./queries')
await cds.tx(async () => {
  await cds.run(q.createWorkOrder('WO-6001', '11111111-1111-1111-1111-111111111101', [
    { part_ID: '33333333-3333-3333-3333-333333333301', quantity: 2 },
  ]))
})
```

Next lesson moves these queries into real custom event handlers, where business logic lives.
