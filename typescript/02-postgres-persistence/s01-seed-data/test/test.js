// Grader for Lesson 2 / Stage 1. Validity, not conformity: the CSV columns must be real
// elements of the entity (consistency with YOUR model), the key must be present, and there
// must be at least one data row. The actual values are yours.
const fs = require("fs");
const path = require("path");
const read = (f) => fs.readFileSync(path.join(__dirname, "..", f), "utf8");
const schema = read("db/schema.cds");

function elementsOf(cds, entity) {
  const m = cds.match(new RegExp("entity\\s+" + entity + "\\s*\\{([\\s\\S]*?)\\}"));
  if (!m) return { names: [], key: null };
  const names = [];
  let key = null;
  for (let line of m[1].split(/[;\n]/)) {
    line = line.replace(/\/\/.*$/, "").trim();
    const mm = line.match(/^(key\s+)?([A-Za-z_]\w*)\s*:/);
    if (mm) {
      names.push(mm[2]);
      if (mm[1]) key = mm[2];
    }
  }
  return { names, key };
}

function rows(csv) {
  return csv.split(/\r?\n/).map((s) => s.trim()).filter((s) => s && !s.startsWith("#"));
}
function header(csv) {
  const first = rows(csv)[0] || "";
  const delim = first.includes(";") && !first.includes(",") ? ";" : ",";
  return first.split(delim).map((s) => s.trim()).filter(Boolean);
}

function checkSeed(entity, file) {
  describe(`Lesson 2 / s01 - seed data for ${entity}`, () => {
    const csv = read(file);
    const { names, key } = elementsOf(schema, entity);
    const cols = header(csv);

    test("every CSV column is an element of the entity", () => {
      expect(cols.length).toBeGreaterThan(0);
      for (const c of cols) expect(names).toContain(c);
    });
    test("the CSV includes the key column", () => {
      expect(key).not.toBeNull();
      expect(cols).toContain(key);
    });
    test("there is at least one data row", () => {
      expect(rows(csv).length).toBeGreaterThanOrEqual(2); // header + >=1 row
    });
  });
}

checkSeed("Equipment", "db/data/assetcare-Equipment.csv");
checkSeed("Manufacturer", "db/data/assetcare-Manufacturer.csv");
