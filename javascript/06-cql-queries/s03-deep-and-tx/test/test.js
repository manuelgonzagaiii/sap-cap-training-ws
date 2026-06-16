// Grader for Lesson 6 / Stage 3. The deep insert must target WorkOrder and carry the nested
// items so CAP creates the children in one statement.
const fs = require("fs");
const path = require("path");
const src = fs.readFileSync(path.join(__dirname, "..", "queries.js"), "utf8");

const ret = (name) => {
  const m = src.match(new RegExp(name + "\\s*\\([^)]*\\)\\s*\\{[\\s\\S]*?return([\\s\\S]*?);"));
  return m ? m[1] : "";
};

describe("Lesson 6 / s03 - deep insert", () => {
  const q = ret("createWorkOrder");
  test("createWorkOrder builds an INSERT into WorkOrder", () => {
    expect(/INSERT/.test(q) && /WorkOrder/.test(q)).toBe(true);
  });
  test("it provides entries", () => {
    expect(/entries/.test(q)).toBe(true);
  });
  test("the entries include the nested items (deep insert)", () => {
    expect(/items/.test(q)).toBe(true);
  });
});
