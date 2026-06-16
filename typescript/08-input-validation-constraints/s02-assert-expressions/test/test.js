// Grader for Lesson 8 / Stage 2. A declarative @assert CASE expression encodes a cross-field
// business rule (reorderLevel must not exceed stock).
const fs = require("fs");
const path = require("path");
const cds = fs.readFileSync(path.join(__dirname, "..", "db/schema.cds"), "utf8");

describe("Lesson 8 / s02 - declarative @assert constraints", () => {
  test("SparePart has a reorderLevel element", () => {
    expect(/reorderLevel\s*:/.test(cds)).toBe(true);
  });
  test("a declarative @assert CASE expression is defined", () => {
    expect(/@assert\s*:\s*\(?\s*case/i.test(cds)).toBe(true);
  });
  test("the rule compares reorderLevel against stock", () => {
    const m = cds.match(/@assert\s*:\s*\(([\s\S]*?)\)\s*;/);
    const expr = m ? m[1] : "";
    expect(/reorderLevel/.test(expr) && /stock/.test(expr)).toBe(true);
  });
});
