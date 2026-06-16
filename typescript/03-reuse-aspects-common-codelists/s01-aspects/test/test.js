// Grader for Lesson 3 / Stage 1. Both entities must reuse the cuid and managed aspects
// from @sap/cds/common. The aspect order is free.
const fs = require("fs");
const path = require("path");
const read = (f) => fs.readFileSync(path.join(__dirname, "..", f), "utf8");
const cds = read("db/schema.cds");

function commonImports(src) {
  const m = src.match(/using\s*\{([^}]*)\}\s*from\s*['"]@sap\/cds\/common['"]/);
  return m ? m[1].split(",").map((s) => s.trim()).filter(Boolean) : [];
}
function aspectsOf(src, entity) {
  const m = src.match(new RegExp("entity\\s+" + entity + "\\s*:\\s*([^\\{]+)\\{"));
  return m ? m[1].split(",").map((s) => s.trim()).filter(Boolean) : [];
}

describe("Lesson 3 / s01 - reusable aspects", () => {
  test("imports cuid and managed from @sap/cds/common", () => {
    const imp = commonImports(cds);
    expect(imp).toContain("cuid");
    expect(imp).toContain("managed");
  });

  for (const entity of ["Equipment", "Manufacturer"]) {
    test(`${entity} applies the cuid and managed aspects`, () => {
      const a = aspectsOf(cds, entity);
      expect(a).toContain("cuid");
      expect(a).toContain("managed");
    });
  }
});
