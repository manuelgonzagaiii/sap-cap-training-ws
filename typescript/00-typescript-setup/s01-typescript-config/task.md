# TypeScript setup and tooling

Welcome to the TypeScript track. Everything you learned about CAP — the model, services,
associations, queries — is identical here; the difference is that you write the *code* in
TypeScript and get full type-safety and editor completion. This short prologue sets up the
toolchain once. The lessons that follow mirror the JavaScript track, in TypeScript.

## What `cds add typescript` does

In a real project you run one command:

```
cds add typescript
```

It scaffolds three things:

1. **`tsconfig.json`** — the TypeScript compiler settings, including two `paths` entries that
   make CAP's types resolve.
2. **Dev dependencies** — `typescript`, `tsx`, `@cap-js/cds-typer`, `@cap-js/cds-types`,
   `@types/node` (already in this course's `package.json`).
3. **A `#cds-models` import mapping** in `package.json` so generated model types resolve at
   runtime (`"imports": { "#cds-models/*": "./@cds-models/*/index.js" }`).

You complete the `tsconfig.json` here so you understand what it wires up.

## The two `paths` entries

- **`"@sap/cds": ["./node_modules/@cap-js/cds-types"]`** — when you `import cds from
  '@sap/cds'`, TypeScript pulls the API type declarations from `@cap-js/cds-types`. This is
  what makes `cds.ql`, `cds.connect`, request objects, and the rest typed.
- **`"#cds-models/*": ["./@cds-models/*"]`** — the design-time half of the `#cds-models`
  alias. `cds-typer` generates TypeScript classes for your entities into `@cds-models/`, and
  you import them as `import { WorkOrder } from '#cds-models/assetcare'`. You will use these
  typed entities heavily in the typed-development lesson; the alias is set up now so it is
  ready.

## How TypeScript runs (no build step in dev)

Since `cds watch` detects `tsconfig.json`, it runs your `.ts` sources directly through `tsx` —
no manual `tsc` compile in development. `cds-typer` also runs automatically on first start so
the `#cds-models` imports resolve. A separate `tsc` build only matters for production
deployment.

## Your task

Complete `tsconfig.json`: fill in the `@sap/cds` path (pointing at `@cap-js/cds-types`) and
the `#cds-models/*` alias path.

## What the check insists on, and what is yours

- Enforced: `tsconfig.json` is valid JSON; `@sap/cds` resolves to `@cap-js/cds-types`; a
  `#cds-models` alias is declared.
- Yours: the other compiler options — stricter or looser settings are your call, as long as
  the two CAP path mappings are present.

<div class="hint">

```json
"paths": {
  "@sap/cds": ["./node_modules/@cap-js/cds-types"],
  "#cds-models/*": ["./@cds-models/*"]
}
```

</div>

## Seeing it work

After `npm install`, `npx cds watch` prints `Detected tsconfig.json. Running with tsx.` and
serves your TypeScript sources directly. From the next lesson on, you write `.ts`.
