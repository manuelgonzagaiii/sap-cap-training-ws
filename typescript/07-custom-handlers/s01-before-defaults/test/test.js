// Grader for Lesson 7 / Stage 1 (TypeScript).
const fs = require("fs");
const path = require("path");
const src = fs.readFileSync(path.join(__dirname, "..", "srv/maintenance-service.ts"), "utf8");

describe("Lesson 7 / s01 (TS) - before handlers", () => {
  test("is a TypeScript cds.ApplicationService subclass", () => {
    expect(/import\s+cds\s+from\s+['"]@sap\/cds['"]/.test(src)).toBe(true);
    expect(/export\s+default\s+class\s+\w+\s+extends\s+cds\.ApplicationService/.test(src)).toBe(true);
  });
  test("registers a before CREATE handler on WorkOrder", () => {
    expect(/\.before\s*\(\s*['"]CREATE['"]\s*,\s*['"]WorkOrder['"]/.test(src)).toBe(true);
  });
  test("the handler defaults the order number", () => {
    expect(/orderNo/.test(src)).toBe(true);
  });
});
