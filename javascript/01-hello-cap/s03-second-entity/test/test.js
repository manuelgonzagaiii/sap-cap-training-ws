// Grader for Lesson 1 / Stage 3. Equipment must still be there, a Manufacturer entity is
// added with a key, and the service exposes Manufacturer too.
const fs = require("fs");
const path = require("path");
const read = (f) => fs.readFileSync(path.join(__dirname, "..", f), "utf8");
const schema = read("db/schema.cds");
const srv = read("srv/maintenance-service.cds");

describe("Lesson 1 / s03 - a second entity", () => {
  test("Equipment is still defined", () => {
    expect(/entity\s+Equipment\s*\{/.test(schema)).toBe(true);
  });

  test("defines an entity named Manufacturer", () => {
    expect(/entity\s+Manufacturer\s*\{/.test(schema)).toBe(true);
  });

  test("Manufacturer has a key element (any name and type)", () => {
    const body = schema.match(/entity\s+Manufacturer\s*\{([\s\S]*?)\}/);
    expect(body).not.toBeNull();
    expect(/key\s+\w+\s*:\s*\w[\w.()]*/.test(body[1])).toBe(true);
  });

  test("the service exposes Manufacturer as a projection on assetcare.Manufacturer", () => {
    expect(/as\s+projection\s+on\s+assetcare\.Manufacturer\b/.test(srv)).toBe(true);
  });
});
