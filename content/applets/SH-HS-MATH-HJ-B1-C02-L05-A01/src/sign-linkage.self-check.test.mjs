import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(new URL("./index.html", import.meta.url), "utf8");
const metadata = await readFile(new URL("../metadata.yaml", import.meta.url), "utf8");
const readme = await readFile(new URL("../README.md", import.meta.url), "utf8");
const teacherScript = await readFile(new URL("../teacher-script.md", import.meta.url), "utf8");
const studentTask = await readFile(new URL("../student-task.md", import.meta.url), "utf8");
const review = await readFile(new URL("../review.md", import.meta.url), "utf8");

const classroomText = [source, readme, teacherScript, studentTask].join("\n");
const helperBlock = source.match(/\/\/ self-check helpers: start([\s\S]*?)\/\/ self-check helpers: end/)?.[1] ?? "";

test("resource stays in draft self-check status", () => {
  assert.match(metadata, /^status:\s*draft$/m);
  assert.match(metadata, /review_status:\s*self_checked_draft/);
  assert.doesNotMatch(metadata, /review_status:\s*(math_review|classroom_trial|published)/);
  assert.match(review, /不升级到 `math_review`/);
});

test("html exposes draggable roots, draggable opening, and player events", () => {
  assert.match(source, /data-drag-role="left-root"/);
  assert.match(source, /data-drag-role="right-root"/);
  assert.match(source, /data-drag-role="opening"/);
  assert.match(source, /player:init/);
  assert.match(source, /applet:ready/);
  assert.match(source, /applet:stateChanged/);
});

test("classroom wording links graph position with solution intervals", () => {
  assert.match(classroomText, /图像在 x 轴上方/);
  assert.match(classroomText, /图像在 x 轴下方/);
  assert.match(classroomText, /解集区间/);
  assert.match(classroomText, /开口向上/);
  assert.match(classroomText, /开口向下/);
  assert.match(classroomText, /f\(x\)\s*&gt;\s*0|f\(x\)\s*>\s*0/);
  assert.match(classroomText, /f\(x\)\s*&lt;\s*0|f\(x\)\s*<\s*0/);
});

test("sign-pattern helper flips intervals when opening direction changes", () => {
  assert.ok(helperBlock, "Expected self-check helper block in index.html");
  const { solveSignPattern } = new Function(`${helperBlock}\nreturn { solveSignPattern };`)();

  const upward = solveSignPattern({ a: 1, mode: "two_roots", leftRoot: -2, rightRoot: 2, center: 0 });
  assert.equal(upward.positiveText, "(-∞, -2) ∪ (2, +∞)");
  assert.equal(upward.negativeText, "(-2, 2)");
  assert.equal(upward.aboveWhere, "两侧");
  assert.equal(upward.belowWhere, "中间");

  const downward = solveSignPattern({ a: -1, mode: "two_roots", leftRoot: -2, rightRoot: 2, center: 0 });
  assert.equal(downward.positiveText, "(-2, 2)");
  assert.equal(downward.negativeText, "(-∞, -2) ∪ (2, +∞)");
  assert.equal(downward.aboveWhere, "中间");
  assert.equal(downward.belowWhere, "两侧");
});

test("sign-pattern helper covers repeated-root and no-real-root boundaries", () => {
  assert.ok(helperBlock, "Expected self-check helper block in index.html");
  const { solveSignPattern } = new Function(`${helperBlock}\nreturn { solveSignPattern };`)();

  const repeatedUp = solveSignPattern({ a: 1, mode: "double_root", leftRoot: 1, rightRoot: 1, center: 1 });
  assert.equal(repeatedUp.positiveText, "(-∞, 1) ∪ (1, +∞)");
  assert.equal(repeatedUp.negativeText, "∅");
  assert.equal(repeatedUp.zeroText, "{1}");

  const noRealDown = solveSignPattern({ a: -1, mode: "no_real", leftRoot: -1, rightRoot: 1, center: 0 });
  assert.equal(noRealDown.positiveText, "∅");
  assert.equal(noRealDown.negativeText, "R");
  assert.equal(noRealDown.zeroText, "∅");
});

test("visible math avoids horizontal fraction and English placeholders", () => {
  const visibleTeachingDocs = [readme, teacherScript, studentTask].join("\n").replace(/`[^`]*`/g, "");
  assert.doesNotMatch(classroomText, /\bTODO\b|\bplaceholder\b|lorem/i);
  assert.doesNotMatch(visibleTeachingDocs, /[A-Za-z0-9αβ]+\s*\/\s*[A-Za-z0-9αβ]+/);
  assert.match(source, /<math[\s\S]*?<msup>/);
});
