// Grader for Lesson 7 / Stage 1. A service implementation class registers a before-CREATE
// handler that defaults the work order's number.
const fs = require("fs");
const path = require("path");
const src = fs.readFileSync(path.join(__dirname, "..", "srv/maintenance-service.js"), "utf8");

describe("Lesson 7 / s01 - before handlers", () => {
  test("implements the service as a cds.ApplicationService subclass", () => {
    expect(/extends\s+cds\.ApplicationService/.test(src)).toBe(true);
  });
  test("registers a before CREATE handler on WorkOrder", () => {
    expect(/\.before\s*\(\s*['"]CREATE['"]\s*,\s*['"]WorkOrder['"]/.test(src)).toBe(true);
  });
  test("the handler defaults the order number", () => {
    expect(/orderNo/.test(src)).toBe(true);
  });
});
