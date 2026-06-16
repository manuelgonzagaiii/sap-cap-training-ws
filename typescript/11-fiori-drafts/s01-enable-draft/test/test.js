// Grader for Lesson 11 / Stage 1. One annotation turns on the entire Fiori draft flow.
const fs = require("fs");
const path = require("path");
const drafts = fs.readFileSync(path.join(__dirname, "..", "srv/drafts.cds"), "utf8");

describe("Lesson 11 / s01 - enabling drafts", () => {
  test("WorkOrder is draft-enabled", () => {
    expect(/annotate\s+MaintenanceService\.WorkOrder\s+with\s+@odata\.draft\.enabled/.test(drafts)).toBe(true);
  });
});
