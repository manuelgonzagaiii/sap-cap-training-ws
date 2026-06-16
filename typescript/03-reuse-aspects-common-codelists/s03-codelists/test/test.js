// Grader for Lesson 3 / Stage 3. A code list entity reuses sap.common.CodeList, Equipment
// points at it, and translated texts are provided in the _texts CSV.
const fs = require("fs");
const path = require("path");
const read = (f) => fs.readFileSync(path.join(__dirname, "..", f), "utf8");
const cds = read("db/schema.cds");

const equipment = (cds.match(/entity\s+Equipment\s*:[^{]*\{([\s\S]*?)\}/) || [, ""])[1];

function header(csv) {
  const first = csv.split(/\r?\n/).map((s) => s.trim()).find((s) => s && !s.startsWith("#")) || "";
  const delim = first.includes(";") && !first.includes(",") ? ";" : ",";
  return first.split(delim).map((s) => s.trim()).filter(Boolean);
}

describe("Lesson 3 / s03 - code lists with localized texts", () => {
  test("EquipmentStatus reuses sap.common.CodeList", () => {
    expect(/entity\s+EquipmentStatus\s*:[^{]*\bsap\.common\.CodeList\b/.test(cds)).toBe(true);
  });
  test("Equipment has a status association to EquipmentStatus", () => {
    expect(/\bstatus\b\s*:\s*Association\s+to\s+EquipmentStatus\b/.test(equipment)).toBe(true);
  });
  test("the code list has base data with a code column", () => {
    expect(header(read("db/data/assetcare-EquipmentStatus.csv"))).toContain("code");
  });
  test("translated texts are provided with code and locale columns", () => {
    const cols = header(read("db/data/assetcare-EquipmentStatus_texts.csv"));
    expect(cols).toContain("code");
    expect(cols).toContain("locale");
  });
});
