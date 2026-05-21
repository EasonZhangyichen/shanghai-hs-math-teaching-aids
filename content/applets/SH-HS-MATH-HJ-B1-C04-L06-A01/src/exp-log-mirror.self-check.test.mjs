import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function readOptional(url) {
  try {
    return await readFile(url, "utf8");
  } catch (error) {
    if (error?.code === "ENOENT") return "";
    throw error;
  }
}

const source = await readOptional(new URL("./index.html", import.meta.url));
const visibleIndexMarkup = source.replace(/<script\b[\s\S]*?<\/script>/gi, "");
const readme = await readOptional(new URL("../README.md", import.meta.url));
const teacherScript = await readOptional(new URL("../teacher-script.md", import.meta.url));
const studentTask = await readOptional(new URL("../student-task.md", import.meta.url));
const review = await readOptional(new URL("../review.md", import.meta.url));
const metadata = await readOptional(new URL("../metadata.yaml", import.meta.url));
const docs = [readme, teacherScript, studentTask, review, metadata].join("\n");
const visibleText = `${visibleIndexMarkup}\n${docs}`;

test("applet includes a visible y=x mirror reference line", () => {
  assert.match(source, /class:\s*"mirror-line"/, "SVG should draw the mirror reference line with a stable class");
  assert.match(visibleIndexMarkup, />y = x</, "The reference line label should be visible to students");
  assert.match(visibleIndexMarkup, /镜像参照线|镜像线/, "The line should be named as a mirror reference");
});

test("visible explanations state the inverse-function relationship explicitly", () => {
  assert.match(visibleText, /互为反函数/);
  assert.match(visibleText, /交换坐标/);
  assert.match(visibleText, /关于直线 y = x 对称/);
});

test("logarithm formulas render the base as a real subscript", () => {
  assert.match(visibleIndexMarkup, /log<sub>a<\/sub>\s*x/);
  assert.doesNotMatch(visibleIndexMarkup, /log_a\s*x/);
  assert.match(docs, /log_a x/);
});

test("domain range and monotonicity correspondence is represented in the applet", () => {
  assert.match(visibleText, /定义域/);
  assert.match(visibleText, /值域/);
  assert.match(visibleText, /单调/);
  assert.match(visibleText, /指数函数的定义域 R 与对数函数的值域 R 对应/);
  assert.match(visibleText, /指数函数的值域 \(0, \+∞\) 与对数函数的定义域 \(0, \+∞\) 对应/);
});

test("metadata remains in the requested draft boundary", () => {
  assert.match(metadata, /^status:\s*"draft"$/m);
  assert.match(metadata, /^\s*review_status:\s*"self_checked_draft"$/m);
  assert.doesNotMatch(metadata, /^(?:status|\s*review_status):\s*(?:math_review|pedagogy_review|classroom_trial|stable|published|stable_approved)\s*$/m);
});
