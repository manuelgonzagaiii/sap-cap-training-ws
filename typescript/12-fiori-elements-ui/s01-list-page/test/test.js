// Grader for Lesson 12 / Stage 1. A Fiori elements list report driven entirely by @UI
// annotations - HeaderInfo, SelectionFields, LineItem.
const fs = require("fs");
const path = require("path");
const ui = fs.readFileSync(path.join(__dirname, "..", "app/fiori.cds"), "utf8");

describe("Lesson 12 / s01 - list page annotations", () => {
  test("annotates WorkOrder with @UI", () => {
    expect(/annotate\s+MaintenanceService\.WorkOrder\s+with[\s\S]*\bUI\s*:/.test(ui)).toBe(true);
  });
  test("declares HeaderInfo, SelectionFields and LineItem", () => {
    expect(/HeaderInfo/.test(ui)).toBe(true);
    expect(/SelectionFields/.test(ui)).toBe(true);
    expect(/LineItem/.test(ui)).toBe(true);
  });
  test("LineItem lists at least one column value", () => {
    const m = ui.match(/LineItem\s*:\s*\[([\s\S]*?)\]/);
    expect(m && /Value\s*:/.test(m[1])).toBe(true);
  });
});
