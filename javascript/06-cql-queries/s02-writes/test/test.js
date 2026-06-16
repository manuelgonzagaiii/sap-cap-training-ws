// Grader for Lesson 6 / Stage 2. Each write builder must use the right operation on the right
// entity. Tolerant of style; we check the verb, the target, and the filter where relevant.
const fs = require("fs");
const path = require("path");
const src = fs.readFileSync(path.join(__dirname, "..", "queries.js"), "utf8");

const ret = (name) => {
  const m = src.match(new RegExp(name + "\\s*\\([^)]*\\)\\s*\\{[\\s\\S]*?return([\\s\\S]*?);"));
  return m ? m[1] : "";
};

describe("Lesson 6 / s02 - writing with INSERT, UPDATE, DELETE", () => {
  test("addSparePart builds an INSERT into SparePart", () => {
    const q = ret("addSparePart");
    expect(/INSERT/.test(q) && /SparePart/.test(q)).toBe(true);
    expect(/entries|columns|values|rows/.test(q)).toBe(true);
  });
  test("restock builds an UPDATE on SparePart that changes stock for one row", () => {
    const q = ret("restock");
    expect(/UPDATE/.test(q) && /SparePart/.test(q)).toBe(true);
    expect(/\.set\b/.test(q)).toBe(true);
    expect(/stock/.test(q)).toBe(true);
    expect(/where/.test(q)).toBe(true);
  });
  test("scrapEquipment builds a DELETE from Equipment by ID", () => {
    const q = ret("scrapEquipment");
    expect(/DELETE/.test(q) && /Equipment/.test(q)).toBe(true);
    expect(/where/.test(q)).toBe(true);
  });
});
