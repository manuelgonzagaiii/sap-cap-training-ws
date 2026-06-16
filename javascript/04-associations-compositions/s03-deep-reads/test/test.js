// Grader for Lesson 4 / Stage 3. Equipment gains a to-many backlink to its work orders, and
// seed data links work orders and their items so deep reads return a real graph.
const fs = require("fs");
const path = require("path");
const read = (f) => fs.readFileSync(path.join(__dirname, "..", f), "utf8");
const cds = read("db/schema.cds");

const body = (name) =>
  (cds.match(new RegExp("entity\\s+" + name + "\\s*:[^{]*\\{([\\s\\S]*?)\\}")) || [, ""])[1];
const header = (csv) => {
  const first = csv.split(/\r?\n/).map((s) => s.trim()).find((s) => s && !s.startsWith("#")) || "";
  const delim = first.includes(";") && !first.includes(",") ? ";" : ",";
  return first.split(delim).map((s) => s.trim()).filter(Boolean);
};

describe("Lesson 4 / s03 - backlinks and deep reads", () => {
  test("Equipment has a to-many backlink to its WorkOrders", () => {
    expect(/Association\s+to\s+many\s+WorkOrder\s+on\s+\w+\.\w+\s*=\s*\$self/.test(body("Equipment"))).toBe(true);
  });
  test("work orders are seeded with an equipment foreign key", () => {
    expect(header(read("db/data/assetcare-WorkOrder.csv"))).toContain("equipment_ID");
  });
  test("work-order items are seeded linking to parent and part", () => {
    const cols = header(read("db/data/assetcare-WorkOrderItem.csv"));
    expect(cols).toContain("parent_ID");
    expect(cols).toContain("part_ID");
  });
});
