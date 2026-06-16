// Grader for Lesson 11 / Stage 2 (TypeScript). A lean-draft handler targets the '.drafts'
// sibling, so it runs only for draft instances.
const fs = require("fs");
const path = require("path");
const impl = fs.readFileSync(path.join(__dirname, "..", "srv/maintenance-service.ts"), "utf8");

describe("Lesson 11 / s02 (TS) - draft-specific handlers", () => {
  test("is TypeScript (imports cds)", () => {
    expect(/import\s+cds\s+from\s+['"]@sap\/cds['"]/.test(impl)).toBe(true);
  });
  test("a handler targets WorkOrder.drafts (draft instances only)", () => {
    expect(/['"]WorkOrder\.drafts['"]/.test(impl)).toBe(true);
  });
  test("it is a before/after/on registration", () => {
    expect(/\.(before|after|on)\s*\(/.test(impl)).toBe(true);
  });
});
