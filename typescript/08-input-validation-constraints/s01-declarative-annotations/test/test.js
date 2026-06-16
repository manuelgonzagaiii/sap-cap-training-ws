// Grader for Lesson 8 / Stage 1. The model declares the four validation annotations. The
// runtime enforces them on writes - no handler code.
const fs = require("fs");
const path = require("path");
const cds = fs.readFileSync(path.join(__dirname, "..", "db/schema.cds"), "utf8");

describe("Lesson 8 / s01 - declarative validation annotations", () => {
  test("an association is validated with @assert.target", () => {
    expect(/@assert\.target/.test(cds)).toBe(true);
  });
  test("a required field is marked @mandatory", () => {
    expect(/@mandatory/.test(cds)).toBe(true);
  });
  test("a string field is format-constrained with @assert.format", () => {
    expect(/@assert\.format/.test(cds)).toBe(true);
  });
  test("a numeric field is range-constrained with @assert.range", () => {
    expect(/@assert\.range/.test(cds)).toBe(true);
  });
});
