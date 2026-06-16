// Grader for Lesson 13 / Stage 1. Labels live in an i18n bundle and are referenced from
// annotations with {i18n>key}.
const fs = require("fs");
const path = require("path");
const read = (f) => fs.readFileSync(path.join(__dirname, "..", f), "utf8");
const bundle = read("_i18n/i18n.properties");
const labels = read("srv/labels.cds");

describe("Lesson 13 / s01 - externalized text bundles", () => {
  test("the i18n bundle defines key = value entries", () => {
    expect(/^\s*\w+\s*=\s*\S+/m.test(bundle)).toBe(true);
  });
  test("annotations reference bundle keys with {i18n>...}", () => {
    expect(/@title\s*:\s*'?\{i18n>\w+\}/.test(labels)).toBe(true);
  });
});
