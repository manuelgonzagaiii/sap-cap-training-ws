# Deep insert and transactions

Two ideas finish the query lesson: writing a whole document in one statement (deep insert),
and making several statements succeed or fail as a unit (transactions).

## Deep insert

Because `WorkOrder.items` is a composition (Lesson 4), you can insert a work order *and* its
line items in a single statement — just nest the children in `entries`:

```js
INSERT.into('assetcare.WorkOrder').entries({
  orderNo: 'WO-6001',
  equipment_ID: '1111...1101',
  items: [
    { part_ID: '3333...3301', quantity: 2 },
    { part_ID: '3333...3303', quantity: 1 },
  ],
});
```

CAP sees the nested `items`, creates the `WorkOrderItem` rows, generates their keys, and sets
their `parent` foreign key to the new work order — all automatically. That is the payoff of
modelling containment as a composition: the document is written as one tree.

## Transactions

When several writes must all succeed or all roll back — book out parts *and* update stock *and*
log the change — wrap them in a transaction. The modern, safe form is functional:

```js
await cds.tx(async () => {
  await cds.run(createWorkOrder('WO-6001', equipmentId, items));
  await cds.run(restock(partId, -2));
});
```

Everything inside the callback runs in one database transaction: if any statement throws, CAP
rolls the whole block back; if it returns, CAP commits. You rarely manage `begin`/`commit`/
`rollback` by hand. (A single `await`-ed query is auto-wrapped in its own transaction, so you
only reach for `cds.tx` when you need to group operations.)

You will use exactly these patterns inside custom handlers in the next lesson.

## Your task

In `queries.js`, complete `createWorkOrder` so it returns a **deep** INSERT into `WorkOrder`
whose `entries` include `orderNo`, `equipment_ID`, and the nested `items` array.

## What the check insists on, and what is yours

- Enforced: `createWorkOrder` builds an INSERT into `WorkOrder` with `entries` that carry the
  nested `items`.
- Yours: the exact header fields you include; the transaction code above is explained for you
  to run, not graded (it is execution, not a query you build).

<div class="hint">

```js
return INSERT.into('assetcare.WorkOrder').entries({ orderNo, equipment_ID: equipmentId, items });
```

</div>

## Seeing it run

```
npx cds repl --run .
```

```js
const q = require('./queries')
await cds.tx(async () => {
  await cds.run(q.createWorkOrder('WO-6001', '11111111-1111-1111-1111-111111111101', [
    { part_ID: '33333333-3333-3333-3333-333333333301', quantity: 2 },
  ]))
})
await q.allEquipment()   // and read back via $expand in cds watch: WorkOrder?$expand=items
```

Next lesson we move these queries into real custom event handlers, where business logic lives.
