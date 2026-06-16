// Grader for Lesson 7 / Stage 2 (TypeScript).
const fs = require("fs");
const path = require("path");
const src = fs.readFileSync(path.join(__dirname, "..", "srv/maintenance-service.ts"), "utf8");

describe("Lesson 7 / s02 (TS) - after handlers and guards", () => {
  test("is TypeScript (imports cds)", () => {
    expect(/import\s+cds\s+from\s+['"]@sap\/cds['"]/.test(src)).toBe(true);
  });
  test("registers an after READ handler on Equipment that fills openWorkOrders", () => {
    expect(/\.after\s*\(\s*['"]READ['"]\s*,\s*['"]Equipment['"]/.test(src)).toBe(true);
    expect(/openWorkOrders/.test(src)).toBe(true);
  });
  test("a before handler on SparePart guards stock and rejects bad input", () => {
    expect(/\.before\s*\([^)]*SparePart/.test(src)).toBe(true);
    expect(/stock/.test(src) && /reject|error/.test(src)).toBe(true);
  });
});
