// Grader for Lesson 10 / Stage 2. Instance-based authorization: a @restrict rule with a
// where clause referencing the current user.
const fs = require("fs");
const path = require("path");
const auth = fs.readFileSync(path.join(__dirname, "..", "srv/auth.cds"), "utf8");

describe("Lesson 10 / s02 - instance-based access", () => {
  test("WorkOrder is restricted", () => {
    expect(/annotate\s+MaintenanceService\.WorkOrder\s+with[\s\S]*restrict/.test(auth)).toBe(true);
  });
  test("a where clause scopes access to the current user's own rows", () => {
    expect(/where\s*:/.test(auth)).toBe(true);
    expect(/\$user/.test(auth)).toBe(true);
    expect(/createdBy/.test(auth)).toBe(true);
  });
});
