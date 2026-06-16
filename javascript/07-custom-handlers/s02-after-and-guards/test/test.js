// Grader for Lesson 7 / Stage 2. An after-READ handler fills the virtual openWorkOrders, and
// a before handler guards spare-part stock against going negative.
const fs = require("fs");
const path = require("path");
const src = fs.readFileSync(path.join(__dirname, "..", "srv/maintenance-service.js"), "utf8");

describe("Lesson 7 / s02 - after handlers and guards", () => {
  test("registers an after READ handler on Equipment", () => {
    expect(/\.after\s*\(\s*['"]READ['"]\s*,\s*['"]Equipment['"]/.test(src)).toBe(true);
  });
  test("the after handler fills openWorkOrders", () => {
    expect(/openWorkOrders/.test(src)).toBe(true);
  });
  test("a before handler on SparePart guards stock and rejects bad input", () => {
    expect(/\.before\s*\([^)]*SparePart/.test(src)).toBe(true);
    expect(/stock/.test(src)).toBe(true);
    expect(/reject|error/.test(src)).toBe(true);
  });
});
