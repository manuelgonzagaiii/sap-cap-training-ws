// Grader for Lesson 2 / Stage 3. Production must resolve to postgres, development must stay
// sqlite, and the local postgres container file must be present and sane.
const fs = require("fs");
const path = require("path");
const read = (f) => fs.readFileSync(path.join(__dirname, "..", f), "utf8");

describe("Lesson 2 / s03 - deploy to PostgreSQL", () => {
  let cfg;
  test(".cdsrc.json is valid JSON", () => {
    expect(() => {
      cfg = JSON.parse(read(".cdsrc.json"));
    }).not.toThrow();
  });

  test("the production database is postgres", () => {
    const db = cfg.requires.db;
    const prodKind = db["[production]"] && db["[production]"].kind;
    expect(prodKind).toBe("postgres");
  });

  test("the development database is still sqlite", () => {
    const db = cfg.requires.db;
    const devKind = db.kind || (db["[development]"] && db["[development]"].kind);
    expect(devKind).toBe("sqlite");
  });

  test("pg.yaml defines a local postgres container on port 5432", () => {
    const pg = read("pg.yaml");
    expect(/image:\s*postgres/.test(pg)).toBe(true);
    expect(/5432/.test(pg)).toBe(true);
  });
});
