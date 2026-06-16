#!/usr/bin/env node
// Pre-flight linter for the EduTools course tree. EduTools fails quietly ("loaded with
// errors" buried in the log) and a framework lesson whose first stage is invalid will not
// open at all, so check before opening the IDE. Uses light line parsing (no YAML dep).
//
// Checks: every course-info content entry exists and has section-info.yaml; every
// section-info content entry is a lesson with lesson-info.yaml; every lesson-info content
// entry is a task with task-info.yaml carrying a type:; every file declared under a task's
// files: exists on disk; a theory task declares task.md; an edu task declares a test file;
// a framework lesson has no theory/choice stage. Warnings (fatal only with --strict): a
// *.tmpl left in a task dir, and a declared file missing.
//
// Usage: node tools/validate-course.mjs [--strict]
// Node, no dependencies. Port of the Python reference course's validate_course.py.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const STRICT = process.argv.slice(2).includes("--strict");

const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);
const exists = (p) => fs.existsSync(p);
const read = (p) => fs.readFileSync(p, "utf8");

function contentList(text) {
  // items under a top-level `content:` key
  const lines = text.split(/\r?\n/);
  const out = [];
  let inContent = false;
  for (const line of lines) {
    if (/^content:\s*$/.test(line)) {
      inContent = true;
      continue;
    }
    if (inContent) {
      const m = line.match(/^\s+-\s+(.+?)\s*$/);
      if (m) out.push(m[1]);
      else if (line.trim() !== "" && !/^\s/.test(line)) inContent = false; // dedent ends the list
    }
  }
  return out;
}

function fileNames(text) {
  // `- name: X` entries under files:
  return [...text.matchAll(/^\s*-\s+name:\s*(.+?)\s*$/gm)].map((m) => m[1].replace(/^["']|["']$/g, ""));
}

function typeOf(text) {
  const m = text.match(/^type:\s*(\S+)\s*$/m);
  return m ? m[1] : null;
}

function checkTask(taskDir) {
  const info = path.join(taskDir, "task-info.yaml");
  if (!exists(info)) {
    err(`task missing task-info.yaml: ${path.relative(ROOT, taskDir)}`);
    return;
  }
  const text = read(info);
  const type = typeOf(text);
  if (!type) err(`task-info.yaml has no type: ${path.relative(ROOT, info)}`);

  const declared = fileNames(text);
  for (const name of declared) {
    if (!exists(path.join(taskDir, name))) err(`declared file missing on disk: ${path.relative(ROOT, taskDir)}/${name}`);
  }
  if (type === "theory" && !declared.includes("task.md")) err(`theory task must declare task.md: ${path.relative(ROOT, taskDir)}`);
  if (type === "edu" && !declared.some((n) => /test/.test(n))) err(`edu task must declare a test file: ${path.relative(ROOT, taskDir)}`);

  for (const name of fs.readdirSync(taskDir)) {
    if (name.endsWith(".tmpl")) warn(`author-only .tmpl present (not shipped): ${path.relative(ROOT, taskDir)}/${name}`);
  }
  return type;
}

function checkLesson(lessonDir) {
  const info = path.join(lessonDir, "lesson-info.yaml");
  if (!exists(info)) {
    err(`lesson missing lesson-info.yaml: ${path.relative(ROOT, lessonDir)}`);
    return;
  }
  const text = read(info);
  const isFramework = /^type:\s*framework\s*$/m.test(text);
  const tasks = contentList(text);
  if (!tasks.length) err(`lesson has empty content: ${path.relative(ROOT, info)}`);
  const types = [];
  for (const t of tasks) {
    const taskDir = path.join(lessonDir, t);
    if (!exists(taskDir)) {
      err(`lesson content entry has no folder: ${path.relative(ROOT, lessonDir)}/${t}`);
      continue;
    }
    const ty = checkTask(taskDir);
    if (ty) types.push(ty);
  }
  if (isFramework && types.some((t) => t === "theory" || t === "choice")) {
    err(`framework lesson must not contain theory/choice stages (drop "type: framework"): ${path.relative(ROOT, lessonDir)}`);
  }
}

function checkSection(sectionDir) {
  const info = path.join(sectionDir, "section-info.yaml");
  if (!exists(info)) {
    err(`section missing section-info.yaml: ${path.relative(ROOT, sectionDir)}`);
    return;
  }
  const lessons = contentList(read(info));
  if (!lessons.length) warn(`section has empty content: ${path.relative(ROOT, info)}`);
  for (const l of lessons) {
    const lessonDir = path.join(sectionDir, l);
    if (!exists(lessonDir)) err(`section content entry has no folder: ${path.relative(ROOT, sectionDir)}/${l}`);
    else checkLesson(lessonDir);
  }
}

function main() {
  const courseInfo = path.join(ROOT, "course-info.yaml");
  if (!exists(courseInfo)) {
    err("course-info.yaml missing at repo root");
  } else {
    const sections = contentList(read(courseInfo));
    if (!sections.length) err("course-info.yaml has empty content");
    for (const s of sections) {
      const dir = path.join(ROOT, s);
      if (!exists(dir)) err(`course content entry has no folder: ${s}`);
      else checkSection(dir);
    }
  }

  for (const w of warnings) console.log(`warning: ${w}`);
  for (const e of errors) console.log(`error:   ${e}`);
  const failed = errors.length > 0 || (STRICT && warnings.length > 0);
  console.log(`\n${errors.length} error(s), ${warnings.length} warning(s).`);
  process.exit(failed ? 1 : 0);
}

main();
