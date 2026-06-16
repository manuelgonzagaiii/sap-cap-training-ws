// Grader for Lesson 5 / Stage 2. A stored calculated element on SparePart (same-row columns)
// and an on-read calculated element on WorkOrderItem that navigates the part association.
const fs = require("fs");
const path = require("path");
const read = (f) => fs.readFileSync(path.join(__dirname, "..", f), "utf8");
const cds = read("db/schema.cds");

const body = (name) =>
  (cds.match(new RegExp("entity\\s+" + name + "\\s*:[^{]*\\{([\\s\\S]*?)\\}")) || [, ""])[1];
const calc = (entityBody, name) => {
  const m = entityBody.match(new RegExp("\\b" + name + "\\b\\s*:[^=;{]*=\\s*([^;]+);"));
  return m ? m[1] : null;
};

describe("Lesson 5 / s02 - stored and association-based calculations", () => {
  const inv = calc(body("SparePart"), "inventoryValue");
  const lt = calc(body("WorkOrderItem"), "lineTotal");

  test("SparePart.inventoryValue is a stored calculated element over stock and price", () => {
    expect(inv).not.toBeNull();
    expect(/\bstock\b/.test(inv) && /\bprice\b/.test(inv)).toBe(true);
    expect(/\bstored\b/.test(inv)).toBe(true);
  });
  test("WorkOrderItem.lineTotal is on-read and navigates to the part's price", () => {
    expect(lt).not.toBeNull();
    expect(/\bquantity\b/.test(lt)).toBe(true);
    expect(/\bpart\b/.test(lt)).toBe(true);
    expect(/\bstored\b/.test(lt)).toBe(false);
  });
});
