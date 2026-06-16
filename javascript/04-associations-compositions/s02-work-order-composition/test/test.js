// Grader for Lesson 4 / Stage 2. WorkOrder is a document: a to-one to Equipment plus a
// composition of WorkOrderItem children that backlink to their parent. The service exposes
// the work order.
const fs = require("fs");
const path = require("path");
const read = (f) => fs.readFileSync(path.join(__dirname, "..", f), "utf8");
const cds = read("db/schema.cds");
const srv = read("srv/maintenance-service.cds");

const body = (name) =>
  (cds.match(new RegExp("entity\\s+" + name + "\\s*:[^{]*\\{([\\s\\S]*?)\\}")) || [, ""])[1];

describe("Lesson 4 / s02 - work-order composition", () => {
  test("WorkOrder contains a composition of many WorkOrderItem", () => {
    expect(/Composition\s+of\s+many\s+WorkOrderItem\s+on\s+\w+\.\w+\s*=\s*\$self/.test(body("WorkOrder"))).toBe(true);
  });
  test("WorkOrder has a to-one association to Equipment", () => {
    expect(/\bequipment\b\s*:\s*Association\s+to\s+Equipment\b/.test(body("WorkOrder"))).toBe(true);
  });
  test("WorkOrderItem backlinks to its parent WorkOrder", () => {
    expect(/\bparent\b\s*:\s*Association\s+to\s+WorkOrder\b/.test(body("WorkOrderItem"))).toBe(true);
  });
  test("the service exposes WorkOrder", () => {
    expect(/WorkOrder\s+as\s+projection\s+on\s+assetcare\.WorkOrder\b/.test(srv)).toBe(true);
  });
});
