// Grader for Lesson 10 / Stage 1. Declarative role-based access control via @requires and
// @restrict. Enforced by the runtime - no handler code.
const fs = require("fs");
const path = require("path");
const auth = fs.readFileSync(path.join(__dirname, "..", "srv/auth.cds"), "utf8");

describe("Lesson 10 / s01 - role-based access control", () => {
  test("the service requires an authenticated user", () => {
    expect(/requires\s*:/.test(auth)).toBe(true);
    expect(/authenticated-user/.test(auth)).toBe(true);
  });
  test("SparePart is restricted with grant/to rules", () => {
    expect(/annotate\s+MaintenanceService\.SparePart\s+with[\s\S]*restrict/.test(auth)).toBe(true);
    expect(/grant\s*:/.test(auth) && /to\s*:/.test(auth)).toBe(true);
  });
});
