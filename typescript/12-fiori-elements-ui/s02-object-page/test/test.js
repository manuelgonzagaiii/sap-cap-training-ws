// Grader for Lesson 12 / Stage 2. The object page: a FieldGroup surfaced via a ReferenceFacet,
// plus a value help on the status code list.
const fs = require("fs");
const path = require("path");
const ui = fs.readFileSync(path.join(__dirname, "..", "app/fiori.cds"), "utf8");

describe("Lesson 12 / s02 - object page and value help", () => {
  test("defines a FieldGroup with Data", () => {
    expect(/FieldGroup\s*#?\w*\s*:\s*\{[\s\S]*Data\s*:/.test(ui)).toBe(true);
  });
  test("exposes it via a Facets ReferenceFacet", () => {
    expect(/Facets\s*:/.test(ui)).toBe(true);
    expect(/ReferenceFacet/.test(ui)).toBe(true);
    expect(/@UI\.FieldGroup/.test(ui)).toBe(true);
  });
  test("EquipmentStatus is a value help", () => {
    expect(/EquipmentStatus\s+with\s+@cds\.odata\.valuelist/.test(ui)).toBe(true);
  });
});
