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
  assert.equal(workspace.summary.implementedManimCount, 1);

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
  assert.deepEqual(applet.player, {
    kind: "iframe",
    isRunnable: true,
    src: "content/applets/SH-HS-MATH-HJ-B2-C07-L01-A01/src/index.html",
    title: "单位圆到正弦曲线",
    sandbox: "allow-scripts allow-same-origin",
  });
  assert.equal(applet.package.teacherScript.title, "教师脚本：单位圆到正弦曲线");
  assert.equal(applet.package.studentTask.title, "学生活动：从单位圆生成正弦曲线");
});

test("links the rendered Manim clip to lesson L01 with stable video entries", async () => {
  const workspace = await loadTeacherWorkspace({ rootDir: repoRoot });
  const lesson = workspace.lessonsById["SH-HS-MATH-HJ-B2-C07-L01"];
  const manim = lesson.resources.find((resource) => resource.id === "SH-HS-MATH-HJ-B2-C07-L01-M01");

  assert.ok(manim, "sample Manim clip should be attached to lesson L01");
  assert.equal(manim.availability, "video_ready");
  assert.equal(manim.metadataPreview.renderPlan.phase, "rendered");
  assert.equal(manim.package.storyboard.title, "分镜：正弦曲线的来源");
  assert.equal(manim.package.media.hasOutputMp4, true);
  assert.equal(manim.package.media.hasOutputWebm, true);
  assert.equal(manim.package.media.hasPoster, true);
  assert.deepEqual(manim.player, {
    kind: "video",
    isRunnable: true,
    title: "正弦曲线的来源",
    poster: "content/manim/SH-HS-MATH-HJ-B2-C07-L01-M01/dist/final/SH-HS-MATH-HJ-B2-C07-L01-M01-poster.png",
    sources: [
      {
        src: "content/manim/SH-HS-MATH-HJ-B2-C07-L01-M01/dist/final/SH-HS-MATH-HJ-B2-C07-L01-M01.webm",
        type: "video/webm",
      },
      {
        src: "content/manim/SH-HS-MATH-HJ-B2-C07-L01-M01/dist/final/SH-HS-MATH-HJ-B2-C07-L01-M01.mp4",
        type: "video/mp4",
      },
    ],
  });
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

test("links the parameter lab applet while keeping other L05 resources proposed", async () => {
  const workspace = await loadTeacherWorkspace({ rootDir: repoRoot });
  const lesson = workspace.lessonsById["SH-HS-MATH-HJ-B2-C07-L05"];
  const applet = lesson.resources.find((resource) => resource.id === "SH-HS-MATH-HJ-B2-C07-L05-A01");
  const pendingResources = lesson.resources.filter((resource) => resource.id !== "SH-HS-MATH-HJ-B2-C07-L05-A01");

  assert.equal(lesson.resources.length, 3);
  assert.deepEqual(
    lesson.resources.map((resource) => resource.resourceType),
    ["applet", "manim_clip", "diagnosis"],
  );
  assert.equal(applet.availability, "metadata_ready");
  assert.equal(applet.metadataPreview.implementation.phase, "runnable_prototype");
  assert.equal(applet.package.files.srcEntry, "content/applets/SH-HS-MATH-HJ-B2-C07-L05-A01/src/index.html");
  assert.deepEqual(applet.player, {
    kind: "iframe",
    isRunnable: true,
    src: "content/applets/SH-HS-MATH-HJ-B2-C07-L05-A01/src/index.html",
    title: "三角函数参数变化实验室",
    sandbox: "allow-scripts allow-same-origin",
  });
  assert.ok(pendingResources.every((resource) => resource.availability === "proposed"));
  assert.ok(pendingResources.every((resource) => resource.player === null));
  assert.ok(workspace.summary.plannedResourceCount >= 10);
});
