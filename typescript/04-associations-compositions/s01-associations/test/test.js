// Grader for Lesson 4 / Stage 1. Equipment gets a managed to-one association to
// Manufacturer; Manufacturer gets the reverse to-many via a backlink.
const fs = require("fs");
const path = require("path");
const read = (f) => fs.readFileSync(path.join(__dirname, "..", f), "utf8");
const cds = read("db/schema.cds");

const body = (name) =>
  (cds.match(new RegExp("entity\\s+" + name + "\\s*:[^{]*\\{([\\s\\S]*?)\\}")) || [, ""])[1];

describe("Lesson 4 / s01 - associations", () => {
  test("Equipment has a to-one association to Manufacturer", () => {
    expect(/\bmanufacturer\b\s*:\s*Association\s+to\s+Manufacturer\b/.test(body("Equipment"))).toBe(true);
  });
  test("Manufacturer has a to-many backlink to its Equipment", () => {
    expect(/Association\s+to\s+many\s+Equipment\s+on\s+\w+\.\w+\s*=\s*\$self/.test(body("Manufacturer"))).toBe(true);
  });
});
