// Grader for Lesson 13 / Stage 2. A per-row localized element generates a .texts entity, fed
// by an Equipment.texts CSV with locale-specific values.
const fs = require("fs");
const path = require("path");
const read = (f) => fs.readFileSync(path.join(__dirname, "..", f), "utf8");
const schema = read("db/schema.cds");

function header(csv) {
  const first = csv.split(/\r?\n/).map((s) => s.trim()).find((s) => s && !s.startsWith("#")) || "";
  const delim = first.includes(";") && !first.includes(",") ? ";" : ",";
  return first.split(delim).map((s) => s.trim()).filter(Boolean);
}

describe("Lesson 13 / s02 - localized data", () => {
  test("Equipment has a localized element", () => {
    expect(/\bnotes\b\s*:\s*localized\s+String/.test(schema)).toBe(true);
  });
  test("a .texts CSV provides translations keyed by ID and locale", () => {
    const cols = header(read("db/data/assetcare-Equipment.texts.csv"));
    expect(cols).toContain("ID");
    expect(cols).toContain("locale");
  });
});
