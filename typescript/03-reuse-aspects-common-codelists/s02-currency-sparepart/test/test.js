// Grader for Lesson 3 / Stage 2. A SparePart entity carries a Decimal price and a currency
// modelled with the Currency reuse type, and the service exposes it.
const fs = require("fs");
const path = require("path");
const read = (f) => fs.readFileSync(path.join(__dirname, "..", f), "utf8");
const cds = read("db/schema.cds");
const srv = read("srv/maintenance-service.cds");

function commonImports(src) {
  const m = src.match(/using\s*\{([^}]*)\}\s*from\s*['"]@sap\/cds\/common['"]/);
  return m ? m[1].split(",").map((s) => s.trim()).filter(Boolean) : [];
}
const sparePart = (cds.match(/entity\s+SparePart\s*:[^{]*\{([\s\S]*?)\}/) || [, ""])[1];

describe("Lesson 3 / s02 - reuse types and SparePart", () => {
  test("imports the Currency reuse type from @sap/cds/common", () => {
    expect(commonImports(cds)).toContain("Currency");
  });
  test("SparePart has a Decimal price", () => {
    expect(/\bprice\b\s*:\s*Decimal/.test(sparePart)).toBe(true);
  });
  test("SparePart has a currency modelled with the Currency reuse type", () => {
    expect(/\bcurrency\b\s*:\s*Currency\b/.test(sparePart)).toBe(true);
  });
  test("the service exposes SparePart", () => {
    expect(/SparePart\s+as\s+projection\s+on\s+assetcare\.SparePart\b/.test(srv)).toBe(true);
  });
});
