// Grader for Lesson 1 / Stage 2. Checks that a service exposes Equipment over OData;
// the service may expose more, and the projection may be named differently, as long as
// Equipment is reachable.
const fs = require("fs");
const path = require("path");
const read = (f) => fs.readFileSync(path.join(__dirname, "..", f), "utf8");
const srv = read("srv/maintenance-service.cds");

describe("Lesson 1 / s02 - expose Equipment as a service", () => {
  test("imports the data model with using ... from '../db/schema'", () => {
    expect(/using\s*\{[^}]*\bassetcare\b[^}]*\}\s*from\s*['"]\.\.\/db\/schema['"]/.test(srv)).toBe(true);
  });

  test("defines a service named MaintenanceService", () => {
    expect(/service\s+MaintenanceService\s*\{/.test(srv)).toBe(true);
  });

  test("exposes Equipment as a projection on assetcare.Equipment", () => {
    expect(/as\s+projection\s+on\s+assetcare\.Equipment\b/.test(srv)).toBe(true);
  });
});
