// Grader for Lesson 6 / Stage 1 (TypeScript). Same query checks as the JS track, plus the
// TypeScript idioms: importing cds and exporting the functions.
const fs = require("fs");
const path = require("path");
const src = fs.readFileSync(path.join(__dirname, "..", "queries.ts"), "utf8");

const ret = (name) => {
  const m = src.match(new RegExp(name + "\\s*\\([^)]*\\)\\s*\\{[\\s\\S]*?return([\\s\\S]*?);"));
  return m ? m[1] : "";
};

describe("Lesson 6 / s01 (TS) - reading with SELECT", () => {
  test("uses TypeScript: imports cds and exports the helpers", () => {
    expect(/import\s+cds\s+from\s+['"]@sap\/cds['"]/.test(src)).toBe(true);
    expect(/export\s+function/.test(src)).toBe(true);
  });
  test("allEquipment builds a SELECT on Equipment", () => {
    const q = ret("allEquipment");
    expect(/SELECT/.test(q) && /Equipment/.test(q)).toBe(true);
  });
  test("downEquipment selects Equipment filtered by status", () => {
    const q = ret("downEquipment");
    expect(/SELECT/.test(q) && /Equipment/.test(q) && /where|\.where/.test(q) && /DN|status/.test(q)).toBe(true);
  });
  test("sparePartById selects a single SparePart by ID", () => {
    const q = ret("sparePartById");
    expect(/SELECT/.test(q) && /SparePart/.test(q)).toBe(true);
    expect(/\.one\b/.test(q) || /where/.test(q)).toBe(true);
    expect(/\bID\b|\bid\b/.test(q)).toBe(true);
  });
});
