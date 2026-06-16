// Grader for Lesson 9 / Stage 2 (TypeScript).
const fs = require("fs");
const path = require("path");
const read = (f) => fs.readFileSync(path.join(__dirname, "..", f), "utf8");
const cds = read("db/schema.cds");
const srv = read("srv/maintenance-service.cds");
const impl = read("srv/maintenance-service.ts");

describe("Lesson 9 / s02 (TS) - parameters and unbound functions", () => {
  test("adjustStock is declared with an Integer parameter and Integer return", () => {
    expect(/action\s+adjustStock\s*\(\s*by\s*:\s*Integer\s*\)\s*returns\s+Integer/.test(cds)).toBe(true);
  });
  test("an unbound function lowStockCount returns Integer", () => {
    expect(/function\s+lowStockCount\s*\(\s*\)\s*returns\s+Integer/.test(srv)).toBe(true);
  });
  test("both are implemented in the TypeScript handler", () => {
    expect(/import\s+cds\s+from\s+['"]@sap\/cds['"]/.test(impl)).toBe(true);
    expect(/\.on\s*\(\s*['"]adjustStock['"]/.test(impl) && /\.on\s*\(\s*['"]lowStockCount['"]/.test(impl)).toBe(true);
  });
});
