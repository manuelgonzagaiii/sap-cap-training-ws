// Grader for Lesson 9 / Stage 1. A bound action is declared on WorkOrder and implemented in
// the service handler.
const fs = require("fs");
const path = require("path");
const read = (f) => fs.readFileSync(path.join(__dirname, "..", f), "utf8");
const cds = read("db/schema.cds");
const impl = read("srv/maintenance-service.js");

describe("Lesson 9 / s01 - a bound action", () => {
  test("WorkOrder has a completed flag", () => {
    expect(/completed\s*:\s*Boolean/.test(cds)).toBe(true);
  });
  test("a bound action completeWorkOrder is declared in an actions block", () => {
    expect(/actions\s*\{[\s\S]*action\s+completeWorkOrder/.test(cds)).toBe(true);
  });
  test("the action is implemented with an on-handler", () => {
    expect(/\.on\s*\(\s*['"]completeWorkOrder['"]/.test(impl)).toBe(true);
  });
});
