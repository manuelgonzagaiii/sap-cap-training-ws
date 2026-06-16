// Grader for Lesson 5 / Stage 1. Equipment gains an on-read calculated element that derives
// a display name from tag and model. The exact expression is the learner's.
const fs = require("fs");
const path = require("path");
const read = (f) => fs.readFileSync(path.join(__dirname, "..", f), "utf8");
const cds = read("db/schema.cds");

const equipment = (cds.match(/entity\s+Equipment\s*:[^{]*\{([\s\S]*?)\}/) || [, ""])[1];
const calc = equipment.match(/\bdisplayName\b\s*:[^=;{]*=\s*([^;]+);/);

describe("Lesson 5 / s01 - on-read calculated element", () => {
  test("Equipment has a calculated displayName element", () => {
    expect(calc).not.toBeNull();
  });
  test("displayName derives from tag and model", () => {
    expect(/\btag\b/.test(calc[1])).toBe(true);
    expect(/\bmodel\b/.test(calc[1])).toBe(true);
  });
  test("displayName is on-read, not stored", () => {
    expect(/\bstored\b/.test(calc[1])).toBe(false);
  });
});
