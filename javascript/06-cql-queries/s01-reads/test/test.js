// Grader for Lesson 6 / Stage 1. Each function must build a SELECT against the right entity.
// Tolerant of style: builder calls, tagged templates, or plain CQN all read the same here -
// we check the operation, the target entity, and the filter, not exact wording.
const fs = require("fs");
const path = require("path");
const src = fs.readFileSync(path.join(__dirname, "..", "queries.js"), "utf8");

const ret = (name) => {
  const m = src.match(new RegExp(name + "\\s*\\([^)]*\\)\\s*\\{[\\s\\S]*?return([\\s\\S]*?);"));
  return m ? m[1] : "";
};

describe("Lesson 6 / s01 - reading with SELECT", () => {
  test("allEquipment builds a SELECT on Equipment", () => {
    const q = ret("allEquipment");
    expect(/SELECT/.test(q) && /Equipment/.test(q)).toBe(true);
  });
  test("downEquipment selects Equipment filtered by status", () => {
    const q = ret("downEquipment");
    expect(/SELECT/.test(q) && /Equipment/.test(q)).toBe(true);
    expect(/where|\.where/.test(q)).toBe(true);
    expect(/DN|status/.test(q)).toBe(true);
  });
  test("sparePartById selects a single SparePart by ID", () => {
    const q = ret("sparePartById");
    expect(/SELECT/.test(q) && /SparePart/.test(q)).toBe(true);
    expect(/\.one\b/.test(q) || /where/.test(q)).toBe(true);
    expect(/\bID\b|\bid\b/.test(q)).toBe(true);
  });
});
