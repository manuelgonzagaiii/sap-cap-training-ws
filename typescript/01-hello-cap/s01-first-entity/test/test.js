// Grader for Lesson 1 / Stage 1. Validity, not conformity: it checks that you built a
// real CDS entity, while leaving field names, types and extra fields up to you.
const fs = require("fs");
const path = require("path");
const read = (f) => fs.readFileSync(path.join(__dirname, "..", f), "utf8");
const cds = read("db/schema.cds");

describe("Lesson 1 / s01 - your first CDS entity", () => {
  test("declares the assetcare namespace", () => {
    expect(/namespace\s+assetcare\s*;/.test(cds)).toBe(true);
  });

  test("defines an entity named Equipment", () => {
    expect(/entity\s+Equipment\s*\{/.test(cds)).toBe(true);
  });

  test("Equipment has a key element (any name and type)", () => {
    expect(/key\s+\w+\s*:\s*\w[\w.()]*/.test(cds)).toBe(true);
  });

  test("Equipment has at least one non-key element", () => {
    const body = cds.match(/entity\s+Equipment\s*\{([\s\S]*?)\}/);
    expect(body).not.toBeNull();
    const elements = body[1]
      .split(/[;\n]/)
      .map((s) => s.replace(/\/\/.*$/, "").trim())
      .filter(Boolean);
    const nonKey = elements.filter((e) => !/^key\b/.test(e) && /:/.test(e));
    expect(nonKey.length).toBeGreaterThanOrEqual(1);
  });
});
