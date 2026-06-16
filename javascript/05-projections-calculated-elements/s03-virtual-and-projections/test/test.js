// Grader for Lesson 5 / Stage 3. The Equipment projection declares a virtual element, and a
// curated WorkOrderList projection flattens a related field via a path expression.
const fs = require("fs");
const path = require("path");
const read = (f) => fs.readFileSync(path.join(__dirname, "..", f), "utf8");
const srv = read("srv/maintenance-service.cds");

const projection = (entity, on) =>
  (srv.match(new RegExp("entity\\s+" + entity + "\\s+as\\s+projection\\s+on\\s+" + on + "\\s*\\{([\\s\\S]*?)\\}")) || [, ""])[1];

describe("Lesson 5 / s03 - virtual elements and curated projections", () => {
  test("the Equipment projection declares a virtual element", () => {
    expect(/\bvirtual\b\s+\w+\s*:/.test(projection("Equipment", "assetcare\\.Equipment"))).toBe(true);
  });
  test("a curated WorkOrderList projection exists", () => {
    expect(/entity\s+WorkOrderList\s+as\s+projection\s+on\s+assetcare\.WorkOrder/.test(srv)).toBe(true);
  });
  test("WorkOrderList flattens a related field with a path expression (assoc.field as alias)", () => {
    const block = projection("WorkOrderList", "assetcare\\.WorkOrder");
    expect(/\w+\.\w+\s+as\s+\w+/.test(block)).toBe(true);
  });
});
