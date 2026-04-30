import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

import { loadTeacherWorkspace } from "./content.js";

const repoRoot = fileURLToPath(new URL("../../../../", import.meta.url));

test("loads the B2 trigonometry curriculum tree for the teacher workspace", async () => {
  const workspace = await loadTeacherWorkspace({ rootDir: repoRoot });

  assert.equal(workspace.project.name, "沪教版高中数学数字教具云平台");
  assert.equal(workspace.summary.lessonCount, 7);

  const b2 = workspace.tree.volumes.find((volume) => volume.id === "B2");
  assert.ok(b2, "B2 volume should be present");
  assert.equal(b2.status, "mvp_focus");
  assert.equal(b2.chapters[0].id, "SH-HS-MATH-HJ-B2-C07");
  assert.equal(b2.chapters[0].sections[0].lessons[0].id, "SH-HS-MATH-HJ-B2-C07-L01");
});

test("links the sample applet package to lesson L01 with script and activity entries", async () => {
  const workspace = await loadTeacherWorkspace({ rootDir: repoRoot });
  const lesson = workspace.lessonsById["SH-HS-MATH-HJ-B2-C07-L01"];
  const applet = lesson.resources.find((resource) => resource.id === "SH-HS-MATH-HJ-B2-C07-L01-A01");

  assert.equal(lesson.title, "正弦函数的图像");
  assert.ok(applet, "sample applet card should be attached to lesson L01");
  assert.equal(applet.availability, "metadata_ready");
  assert.equal(applet.status, "draft");
  assert.equal(applet.metadataPreview.implementation.phase, "runnable_prototype");
  assert.equal(applet.metadataPreview.implementation.html_src_status, "runnable");
  assert.equal(applet.package.files.srcEntry, "content/applets/SH-HS-MATH-HJ-B2-C07-L01-A01/src/index.html");
  assert.equal(applet.package.teacherScript.title, "教师脚本：单位圆到正弦曲线");
  assert.equal(applet.package.studentTask.title, "学生活动：从单位圆生成正弦曲线");
});

test("sample applet exposes a runnable SDK-compatible HTML entry", async () => {
  const entryPath = path.join(repoRoot, "content/applets/SH-HS-MATH-HJ-B2-C07-L01-A01/src/index.html");
  const html = await readFile(entryPath, "utf8");

  assert.match(html, /SH-HS-MATH-HJ-B2-C07-L01-A01/);
  assert.match(html, /sh-hs-math-applet-sdk/);
  assert.match(html, /applet:ready/);
  assert.match(html, /applet:stateChanged/);
  assert.match(html, /player:init/);
  assert.match(html, /theta_changed/);
});

test("keeps proposed lesson resources visible even when no playable applet exists yet", async () => {
  const workspace = await loadTeacherWorkspace({ rootDir: repoRoot });
  const lesson = workspace.lessonsById["SH-HS-MATH-HJ-B2-C07-L05"];

  assert.equal(lesson.resources.length, 3);
  assert.deepEqual(
    lesson.resources.map((resource) => resource.resourceType),
    ["applet", "manim_clip", "diagnosis"],
  );
  assert.ok(lesson.resources.every((resource) => resource.availability === "proposed"));
  assert.ok(workspace.summary.plannedResourceCount >= 10);
});
