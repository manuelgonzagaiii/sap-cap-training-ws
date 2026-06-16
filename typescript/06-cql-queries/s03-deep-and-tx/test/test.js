// Grader for Lesson 6 / Stage 3 (TypeScript).
const fs = require("fs");
const path = require("path");
const src = fs.readFileSync(path.join(__dirname, "..", "queries.ts"), "utf8");

const ret = (name) => {
  const m = src.match(new RegExp(name + "\\s*\\([^)]*\\)\\s*\\{[\\s\\S]*?return([\\s\\S]*?);"));
  return m ? m[1] : "";
};

describe("Lesson 6 / s03 (TS) - deep insert", () => {
  const q = ret("createWorkOrder");
  test("is TypeScript (imports cds, exports functions)", () => {
    expect(/import\s+cds\s+from\s+['"]@sap\/cds['"]/.test(src) && /export\s+function/.test(src)).toBe(true);
  });
  test("createWorkOrder builds an INSERT into WorkOrder with nested items", () => {
    expect(/INSERT/.test(q) && /WorkOrder/.test(q)).toBe(true);
    expect(/entries/.test(q)).toBe(true);
    expect(/items/.test(q)).toBe(true);
  });
});
