// Grader for Lesson 6 / Stage 2 (TypeScript).
const fs = require("fs");
const path = require("path");
const src = fs.readFileSync(path.join(__dirname, "..", "queries.ts"), "utf8");

const ret = (name) => {
  const m = src.match(new RegExp(name + "\\s*\\([^)]*\\)\\s*\\{[\\s\\S]*?return([\\s\\S]*?);"));
  return m ? m[1] : "";
};

describe("Lesson 6 / s02 (TS) - writing with INSERT, UPDATE, DELETE", () => {
  test("is TypeScript (imports cds, exports functions)", () => {
    expect(/import\s+cds\s+from\s+['"]@sap\/cds['"]/.test(src) && /export\s+function/.test(src)).toBe(true);
  });
  test("addSparePart builds an INSERT into SparePart", () => {
    const q = ret("addSparePart");
    expect(/INSERT/.test(q) && /SparePart/.test(q) && /entries|columns|values|rows/.test(q)).toBe(true);
  });
  test("restock builds an UPDATE on SparePart that changes stock for one row", () => {
    const q = ret("restock");
    expect(/UPDATE/.test(q) && /SparePart/.test(q) && /\.set\b/.test(q) && /stock/.test(q) && /where/.test(q)).toBe(true);
  });
  test("scrapEquipment builds a DELETE from Equipment by ID", () => {
    const q = ret("scrapEquipment");
    expect(/DELETE/.test(q) && /Equipment/.test(q) && /where/.test(q)).toBe(true);
  });
});
