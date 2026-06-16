// Grader for Lesson 9 / Stage 1 (TypeScript).
const fs = require("fs");
const path = require("path");
const read = (f) => fs.readFileSync(path.join(__dirname, "..", f), "utf8");
const cds = read("db/schema.cds");
const impl = read("srv/maintenance-service.ts");

describe("Lesson 9 / s01 (TS) - a bound action", () => {
  test("WorkOrder has a completed flag and a completeWorkOrder action", () => {
    expect(/completed\s*:\s*Boolean/.test(cds)).toBe(true);
    expect(/actions\s*\{[\s\S]*action\s+completeWorkOrder/.test(cds)).toBe(true);
  });
  test("the handler is TypeScript and implements the action", () => {
    expect(/import\s+cds\s+from\s+['"]@sap\/cds['"]/.test(impl) && /export\s+default\s+class/.test(impl)).toBe(true);
    expect(/\.on\s*\(\s*['"]completeWorkOrder['"]/.test(impl)).toBe(true);
  });
});
