// Grader for Lesson 2 / Stage 2. The dev database must resolve to sqlite. We accept either
// a profile form (requires.db.[development].kind) or a plain form (requires.db.kind), and
// the file name is yours.
const fs = require("fs");
const path = require("path");
const read = (f) => fs.readFileSync(path.join(__dirname, "..", f), "utf8");

describe("Lesson 2 / s02 - configure the database", () => {
  let cfg;
  test(".cdsrc.json is valid JSON", () => {
    expect(() => {
      cfg = JSON.parse(read(".cdsrc.json"));
    }).not.toThrow();
  });

  test("declares a database under cds.requires.db", () => {
    const db = cfg && cfg.requires && cfg.requires.db;
    expect(db).toBeTruthy();
  });

  test("the development database is sqlite", () => {
    const db = cfg.requires.db;
    const devKind = db.kind || (db["[development]"] && db["[development]"].kind);
    expect(devKind).toBe("sqlite");
  });
});
