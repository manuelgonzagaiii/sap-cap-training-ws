// Grader for the TypeScript prologue. tsconfig must wire @sap/cds to the CAP type
// definitions and declare the #cds-models alias. The exact paths can vary slightly.
const fs = require("fs");
const path = require("path");
const read = (f) => fs.readFileSync(path.join(__dirname, "..", f), "utf8");

describe("TypeScript setup - tsconfig.json", () => {
  let cfg;
  test("tsconfig.json is valid JSON", () => {
    expect(() => {
      cfg = JSON.parse(read("tsconfig.json"));
    }).not.toThrow();
  });
  test("@sap/cds resolves to the CAP type definitions (@cap-js/cds-types)", () => {
    const p = cfg.compilerOptions && cfg.compilerOptions.paths;
    const target = p && (p["@sap/cds"] || []);
    expect(JSON.stringify(target)).toMatch(/cds-types/);
  });
  test("the #cds-models alias is declared", () => {
    const p = cfg.compilerOptions && cfg.compilerOptions.paths;
    expect(p && Object.keys(p).some((k) => k.startsWith("#cds-models"))).toBe(true);
  });
});
