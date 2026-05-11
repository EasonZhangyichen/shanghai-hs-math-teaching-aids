import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

import { loadTeacherWorkspace } from "./content.js";

const repoRoot = fileURLToPath(new URL("../../../../", import.meta.url));

test("loads the curriculum tree for the teacher workspace", async () => {
  const workspace = await loadTeacherWorkspace({ rootDir: repoRoot });

  assert.equal(workspace.project.name, "沪教版高中数学数字教具云平台");
  assert.equal(workspace.summary.lessonCount, 70);
  assert.equal(workspace.summary.implementedAppletCount, 14);
  assert.equal(workspace.summary.implementedManimCount, 4);
  assert.equal(workspace.summary.implementedDiagnosisCount, 7);
  assert.equal(workspace.summary.plannedResourceCount, 19);

  const b1 = workspace.tree.volumes.find((volume) => volume.id === "B1");
  assert.ok(b1, "B1 volume should be present");
  assert.equal(b1.chapters[0].id, "SH-HS-MATH-HJ-B1-C01");
  assert.equal(b1.chapters[1].id, "SH-HS-MATH-HJ-B1-C02");
  assert.equal(b1.chapters[2].id, "SH-HS-MATH-HJ-B1-C03");
  assert.equal(b1.chapters[3].id, "SH-HS-MATH-HJ-B1-C04");
  assert.equal(b1.chapters[4].id, "SH-HS-MATH-HJ-B1-C05");
  assert.equal(b1.chapters[0].status, "draft");
  assert.equal(b1.chapters[1].verification.needs_manual_textbook_check, true);
  assert.equal(b1.chapters[2].verification.needs_manual_textbook_check, true);
  assert.equal(b1.chapters[0].sections[0].lessons[0].id, "SH-HS-MATH-HJ-B1-C01-L01");
  assert.equal(b1.chapters[1].sections[2].lessons[0].id, "SH-HS-MATH-HJ-B1-C02-L08");
  assert.equal(b1.chapters[2].sections[0].lessons[0].id, "SH-HS-MATH-HJ-B1-C03-L01");
  assert.equal(b1.chapters[3].sections[2].lessons[1].id, "SH-HS-MATH-HJ-B1-C04-L06");
  assert.equal(b1.chapters[4].sections[0].lessons[0].id, "SH-HS-MATH-HJ-B1-C05-L01");
  assert.equal(b1.chapters[4].sections[2].lessons[2].id, "SH-HS-MATH-HJ-B1-C05-L08");

  const b2 = workspace.tree.volumes.find((volume) => volume.id === "B2");
  assert.ok(b2, "B2 volume should be present");
  assert.equal(b2.status, "mvp_focus");
  assert.equal(b2.chapters[0].id, "SH-HS-MATH-HJ-B2-C06");
  assert.equal(b2.chapters[0].sections[0].lessons[0].id, "SH-HS-MATH-HJ-B2-C06-L01");
  assert.equal(b2.chapters[0].sections[2].lessons[1].id, "SH-HS-MATH-HJ-B2-C06-L10");
  assert.equal(b2.chapters[1].id, "SH-HS-MATH-HJ-B2-C07");
  assert.equal(b2.chapters[1].sections[0].lessons[0].id, "SH-HS-MATH-HJ-B2-C07-L01");
  assert.equal(b2.chapters[2].id, "SH-HS-MATH-HJ-B2-C08");
  assert.equal(b2.chapters[2].sections[0].lessons[0].id, "SH-HS-MATH-HJ-B2-C08-L01");
  assert.equal(b2.chapters[2].sections[3].lessons[0].id, "SH-HS-MATH-HJ-B2-C08-L10");
  assert.equal(b2.chapters[3].id, "SH-HS-MATH-HJ-B2-C09");
  assert.equal(b2.chapters[3].sections[1].lessons[0].id, "SH-HS-MATH-HJ-B2-C09-L03");
  assert.equal(b2.chapters[3].sections[3].lessons[1].id, "SH-HS-MATH-HJ-B2-C09-L07");
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

test("links the cosine unit-circle applet to lesson L03", async () => {
  const workspace = await loadTeacherWorkspace({ rootDir: repoRoot });
  const lesson = workspace.lessonsById["SH-HS-MATH-HJ-B2-C07-L03"];
  const applet = lesson.resources.find((resource) => resource.id === "SH-HS-MATH-HJ-B2-C07-L03-A01");
  const phaseCompareApplet = lesson.resources.find((resource) => resource.id === "SH-HS-MATH-HJ-B2-C07-L03-A02");

  assert.equal(lesson.title, "余弦函数的图像");
  assert.ok(applet, "cosine applet card should be attached to lesson L03");
  assert.equal(applet.availability, "metadata_ready");
  assert.equal(applet.status, "draft");
  assert.equal(applet.metadataPreview.implementation.phase, "runnable_prototype");
  assert.equal(applet.metadataPreview.implementation.html_src_status, "runnable");
  assert.equal(applet.package.files.srcEntry, "content/applets/SH-HS-MATH-HJ-B2-C07-L03-A01/src/index.html");
  assert.deepEqual(applet.player, {
    kind: "iframe",
    isRunnable: true,
    src: "content/applets/SH-HS-MATH-HJ-B2-C07-L03-A01/src/index.html",
    title: "单位圆到余弦曲线",
    sandbox: "allow-scripts allow-same-origin",
  });
  assert.equal(applet.package.teacherScript.title, "教师脚本：单位圆到余弦曲线");
  assert.equal(applet.package.studentTask.title, "学生活动：从单位圆生成余弦曲线");
  assert.ok(phaseCompareApplet, "phase comparison applet card should be attached to lesson L03");
  assert.equal(phaseCompareApplet.availability, "metadata_ready");
  assert.equal(phaseCompareApplet.status, "draft");
  assert.equal(phaseCompareApplet.metadataPreview.implementation.phase, "runnable_prototype");
  assert.equal(
    phaseCompareApplet.package.files.srcEntry,
    "content/applets/SH-HS-MATH-HJ-B2-C07-L03-A02/src/index.html",
  );
  assert.deepEqual(phaseCompareApplet.player, {
    kind: "iframe",
    isRunnable: true,
    src: "content/applets/SH-HS-MATH-HJ-B2-C07-L03-A02/src/index.html",
    title: "正弦与余弦相位对照",
    sandbox: "allow-scripts allow-same-origin",
  });
});

test("links the cosine properties comparison applet to lesson L04", async () => {
  const workspace = await loadTeacherWorkspace({ rootDir: repoRoot });
  const lesson = workspace.lessonsById["SH-HS-MATH-HJ-B2-C07-L04"];
  const applet = lesson.resources.find((resource) => resource.id === "SH-HS-MATH-HJ-B2-C07-L04-A01");

  assert.equal(lesson.title, "余弦函数的性质");
  assert.ok(applet, "cosine properties applet card should be attached to lesson L04");
  assert.equal(applet.availability, "metadata_ready");
  assert.equal(applet.status, "draft");
  assert.equal(applet.metadataPreview.implementation.phase, "runnable_prototype");
  assert.equal(applet.metadataPreview.implementation.html_src_status, "runnable");
  assert.equal(applet.package.files.srcEntry, "content/applets/SH-HS-MATH-HJ-B2-C07-L04-A01/src/index.html");
  assert.deepEqual(applet.player, {
    kind: "iframe",
    isRunnable: true,
    src: "content/applets/SH-HS-MATH-HJ-B2-C07-L04-A01/src/index.html",
    title: "正弦余弦性质对照板",
    sandbox: "allow-scripts allow-same-origin",
  });
  assert.equal(applet.package.teacherScript.title, "教师脚本：正弦余弦性质对照板");
  assert.equal(applet.package.studentTask.title, "学生活动：比较余弦函数性质");
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

test("cosine applet exposes a runnable SDK-compatible HTML entry", async () => {
  const entryPath = path.join(repoRoot, "content/applets/SH-HS-MATH-HJ-B2-C07-L03-A01/src/index.html");
  const html = await readFile(entryPath, "utf8");

  assert.match(html, /SH-HS-MATH-HJ-B2-C07-L03-A01/);
  assert.match(html, /sh-hs-math-applet-sdk/);
  assert.match(html, /applet:ready/);
  assert.match(html, /applet:stateChanged/);
  assert.match(html, /player:init/);
  assert.match(html, /theta_changed/);
  assert.match(html, /cosine_value/);
});

test("cosine properties applet exposes a runnable SDK-compatible HTML entry", async () => {
  const entryPath = path.join(repoRoot, "content/applets/SH-HS-MATH-HJ-B2-C07-L04-A01/src/index.html");
  const html = await readFile(entryPath, "utf8");

  assert.match(html, /SH-HS-MATH-HJ-B2-C07-L04-A01/);
  assert.match(html, /sh-hs-math-applet-sdk/);
  assert.match(html, /applet:ready/);
  assert.match(html, /applet:stateChanged/);
  assert.match(html, /player:init/);
  assert.match(html, /x_changed/);
  assert.match(html, /cosine_value/);
});

test("links the parameter lab applet and rendered transform-order Manim to lesson L05", async () => {
  const workspace = await loadTeacherWorkspace({ rootDir: repoRoot });
  const lesson = workspace.lessonsById["SH-HS-MATH-HJ-B2-C07-L05"];
  const applet = lesson.resources.find((resource) => resource.id === "SH-HS-MATH-HJ-B2-C07-L05-A01");
  const manim = lesson.resources.find((resource) => resource.id === "SH-HS-MATH-HJ-B2-C07-L05-M01");
  const diagnosis = lesson.resources.find((resource) => resource.id === "SH-HS-MATH-HJ-B2-C07-L05-D01");

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
  assert.equal(manim.availability, "video_ready");
  assert.equal(manim.metadataPreview.renderPlan.phase, "rendered");
  assert.equal(manim.package.storyboard.title, "分镜：图像变换顺序解释");
  assert.equal(manim.package.media.hasOutputMp4, true);
  assert.equal(manim.package.media.hasOutputWebm, true);
  assert.equal(manim.package.media.hasPoster, true);
  assert.deepEqual(manim.player, {
    kind: "video",
    isRunnable: true,
    title: "图像变换顺序解释",
    poster: "content/manim/SH-HS-MATH-HJ-B2-C07-L05-M01/dist/final/SH-HS-MATH-HJ-B2-C07-L05-M01-poster.png",
    sources: [
      {
        src: "content/manim/SH-HS-MATH-HJ-B2-C07-L05-M01/dist/final/SH-HS-MATH-HJ-B2-C07-L05-M01.webm",
        type: "video/webm",
      },
      {
        src: "content/manim/SH-HS-MATH-HJ-B2-C07-L05-M01/dist/final/SH-HS-MATH-HJ-B2-C07-L05-M01.mp4",
        type: "video/mp4",
      },
    ],
  });
  assert.equal(diagnosis.availability, "item_bank_ready");
  assert.equal(diagnosis.metadataPreview.diagnosisDesign.itemSummary.totalItems, 6);
  assert.equal(diagnosis.package.files.itemBank, "content/diagnosis/SH-HS-MATH-HJ-B2-C07-L05-D01/item-bank.yaml");
  assert.equal(diagnosis.player, null);
  assert.equal(workspace.summary.plannedResourceCount, 19);
});

test("lists the B2 C09 complex-number draft applet candidates as planned resources", async () => {
  const workspace = await loadTeacherWorkspace({ rootDir: repoRoot });
  const complexPlaneLesson = workspace.lessonsById["SH-HS-MATH-HJ-B2-C09-L03"];
  const modulusLesson = workspace.lessonsById["SH-HS-MATH-HJ-B2-C09-L04"];
  const multiplicationLesson = workspace.lessonsById["SH-HS-MATH-HJ-B2-C09-L07"];

  assert.equal(complexPlaneLesson.status, "draft");
  assert.equal(complexPlaneLesson.title, "复平面、复数的向量表示与加法几何意义");
  assert.equal(complexPlaneLesson.resources.length, 1);
  assert.equal(complexPlaneLesson.resources[0].id, "SH-HS-MATH-HJ-B2-C09-L03-A01");
  assert.equal(complexPlaneLesson.resources[0].resourceType, "applet");
  assert.equal(complexPlaneLesson.resources[0].title, "复平面点向量对应与加法构造板");
  assert.equal(complexPlaneLesson.resources[0].cognitiveAction, "对应");
  assert.equal(
    complexPlaneLesson.resources[0].note,
    "拖动复平面上的点，同步显示复数代数形式、原点向量、坐标分量和加法平行四边形；只覆盖表示对应与加法几何意义，不做通用复数计算器。",
  );
  assert.equal(complexPlaneLesson.resources[0].availability, "proposed");
  assert.equal(complexPlaneLesson.resources[0].status, "planned");
  assert.equal(complexPlaneLesson.resources[0].quality.reviewStatus, "planned");
  assert.equal(complexPlaneLesson.resources[0].metadataPreview, null);
  assert.equal(complexPlaneLesson.resources[0].player, null);
  assert.equal(complexPlaneLesson.resources[0].package, null);

  assert.equal(modulusLesson.resources[0].id, "SH-HS-MATH-HJ-B2-C09-L04-A01");
  assert.equal(modulusLesson.resources[0].availability, "proposed");
  assert.equal(modulusLesson.resources[0].title, "模与共轭几何对照板");

  assert.equal(multiplicationLesson.resources[0].id, "SH-HS-MATH-HJ-B2-C09-L07-A01");
  assert.equal(multiplicationLesson.resources[0].availability, "proposed");
  assert.equal(multiplicationLesson.resources[0].title, "复数乘法旋转缩放实验室");
});

test("links the vector projection applet and Manim scaffold to lesson B2 C08 L04", async () => {
  const workspace = await loadTeacherWorkspace({ rootDir: repoRoot });
  const lesson = workspace.lessonsById["SH-HS-MATH-HJ-B2-C08-L04"];
  const applet = lesson.resources.find((resource) => resource.id === "SH-HS-MATH-HJ-B2-C08-L04-A01");
  const manim = lesson.resources.find((resource) => resource.id === "SH-HS-MATH-HJ-B2-C08-L04-M01");

  assert.equal(lesson.title, "向量的投影");
  assert.equal(lesson.resources.length, 2);
  assert.deepEqual(
    lesson.resources.map((resource) => resource.resourceType),
    ["applet", "manim_clip"],
  );
  assert.equal(applet.availability, "metadata_ready");
  assert.equal(applet.player, null);
  assert.equal(manim.availability, "metadata_ready");
  assert.equal(manim.metadataPreview.renderPlan.phase, "scene_draft");
  assert.equal(manim.package.storyboard.title, "分镜：投影有向长度导入动画");
  assert.equal(manim.package.media.hasOutputMp4, false);
  assert.equal(manim.package.media.hasOutputWebm, false);
  assert.equal(manim.package.media.hasPoster, false);
  assert.equal(manim.player, null);
});

test("links the tangent graph applet and rendered asymptote Manim to lesson L06", async () => {
  const workspace = await loadTeacherWorkspace({ rootDir: repoRoot });
  const lesson = workspace.lessonsById["SH-HS-MATH-HJ-B2-C07-L06"];
  const applet = lesson.resources.find((resource) => resource.id === "SH-HS-MATH-HJ-B2-C07-L06-A01");
  const manim = lesson.resources.find((resource) => resource.id === "SH-HS-MATH-HJ-B2-C07-L06-M01");

  assert.equal(lesson.title, "正切函数的图像");
  assert.equal(lesson.resources.length, 2);
  assert.deepEqual(
    lesson.resources.map((resource) => resource.resourceType),
    ["applet", "manim_clip"],
  );
  assert.equal(applet.availability, "metadata_ready");
  assert.equal(applet.metadataPreview.implementation.phase, "runnable_prototype");
  assert.equal(applet.package.files.srcEntry, "content/applets/SH-HS-MATH-HJ-B2-C07-L06-A01/src/index.html");
  assert.deepEqual(applet.player, {
    kind: "iframe",
    isRunnable: true,
    src: "content/applets/SH-HS-MATH-HJ-B2-C07-L06-A01/src/index.html",
    title: "正切函数图像生成器",
    sandbox: "allow-scripts allow-same-origin",
  });
  assert.equal(manim.availability, "video_ready");
  assert.equal(manim.metadataPreview.renderPlan.phase, "rendered");
  assert.equal(manim.package.storyboard.title, "分镜：为什么正切图像有渐近线");
  assert.equal(manim.package.media.hasOutputMp4, true);
  assert.equal(manim.package.media.hasOutputWebm, true);
  assert.equal(manim.package.media.hasPoster, true);
  assert.deepEqual(manim.player, {
    kind: "video",
    isRunnable: true,
    title: "为什么正切图像有渐近线",
    poster: "content/manim/SH-HS-MATH-HJ-B2-C07-L06-M01/dist/final/SH-HS-MATH-HJ-B2-C07-L06-M01-poster.png",
    sources: [
      {
        src: "content/manim/SH-HS-MATH-HJ-B2-C07-L06-M01/dist/final/SH-HS-MATH-HJ-B2-C07-L06-M01.webm",
        type: "video/webm",
      },
      {
        src: "content/manim/SH-HS-MATH-HJ-B2-C07-L06-M01/dist/final/SH-HS-MATH-HJ-B2-C07-L06-M01.mp4",
        type: "video/mp4",
      },
    ],
  });
});

test("links the tangent properties applet to lesson L07", async () => {
  const workspace = await loadTeacherWorkspace({ rootDir: repoRoot });
  const lesson = workspace.lessonsById["SH-HS-MATH-HJ-B2-C07-L07"];
  const applet = lesson.resources.find((resource) => resource.id === "SH-HS-MATH-HJ-B2-C07-L07-A01");
  const diagnosis = lesson.resources.find((resource) => resource.id === "SH-HS-MATH-HJ-B2-C07-L07-D01");

  assert.equal(workspace.summary.implementedAppletCount, 14);
  assert.equal(lesson.title, "正切函数的性质");
  assert.equal(lesson.resources.length, 2);
  assert.deepEqual(
    lesson.resources.map((resource) => resource.resourceType),
    ["applet", "diagnosis"],
  );
  assert.equal(applet.availability, "metadata_ready");
  assert.equal(applet.metadataPreview.pedagogy.cognitiveAction, "比较");
  assert.equal(applet.metadataPreview.implementation.phase, "runnable_prototype");
  assert.equal(applet.package.files.srcEntry, "content/applets/SH-HS-MATH-HJ-B2-C07-L07-A01/src/index.html");
  assert.deepEqual(applet.player, {
    kind: "iframe",
    isRunnable: true,
    src: "content/applets/SH-HS-MATH-HJ-B2-C07-L07-A01/src/index.html",
    title: "正切性质分段观察",
    sandbox: "allow-scripts allow-same-origin",
  });
  assert.equal(diagnosis.availability, "item_bank_ready");
  assert.equal(diagnosis.metadataPreview.diagnosisDesign.itemSummary.totalItems, 6);
  assert.equal(diagnosis.package.files.itemBank, "content/diagnosis/SH-HS-MATH-HJ-B2-C07-L07-D01/item-bank.yaml");
  assert.equal(diagnosis.player, null);
});

test("builds resource filter facets for teacher preparation searches", async () => {
  const workspace = await loadTeacherWorkspace({ rootDir: repoRoot });

  assert.ok(workspace.resourceFacets, "workspace should expose resource filter facets");
  assert.ok(workspace.resourceIndex, "workspace should expose a flat resource search index");
  assert.equal(workspace.resourceIndex.length, 44);
  assert.equal(workspace.resourceFacets.volumes.some((option) => option.id === "B2" && option.count > 0), true);
  assert.equal(
    workspace.resourceFacets.chapters.some(
      (option) => option.id === "SH-HS-MATH-HJ-B2-C08" && option.volumeId === "B2" && option.count === 10,
    ),
    true,
  );
  assert.equal(
    workspace.resourceFacets.lessons.some(
      (option) =>
        option.id === "SH-HS-MATH-HJ-B2-C08-L04" &&
        option.chapterId === "SH-HS-MATH-HJ-B2-C08" &&
        option.count === 2,
    ),
    true,
  );
  assert.deepEqual(
    workspace.resourceFacets.resourceTypes.map((option) => option.id).sort(),
    ["applet", "diagnosis", "manim_clip"],
  );
  assert.equal(
    workspace.resourceFacets.reviewStatuses.some(
      (option) => option.id === "self_checked_draft" && option.label === "自检草稿" && option.count > 0,
    ),
    true,
  );
});

test("marks B2 C08 scaffold resources as draft scaffold work only", async () => {
  const workspace = await loadTeacherWorkspace({ rootDir: repoRoot });
  const vectorResources = workspace.resourceIndex.filter((resource) => resource.chapterId === "SH-HS-MATH-HJ-B2-C08");

  assert.equal(vectorResources.length, 10);
  assert.equal(vectorResources.some((resource) => resource.id === "SH-HS-MATH-HJ-B2-C08-L04-M01"), true);
  assert.equal(vectorResources.some((resource) => resource.resourceType === "diagnosis"), true);

  for (const resource of vectorResources) {
    assert.equal(resource.quality.contentStatus, "draft");
    assert.equal(resource.quality.reviewStatus, "self_checked_draft");
    assert.notEqual(resource.quality.reviewStatus, "published");
    assert.notEqual(resource.quality.reviewStatus, "release_candidate");
    assert.notEqual(resource.quality.reviewStatus, "math_review_passed");
    assert.ok(
      resource.quality.displayStates.every((state) => ["draft", "scaffold", "self_checked_draft"].includes(state)),
      `${resource.id} should only display draft/scaffold/self_checked_draft states`,
    );
  }

  const scaffoldApplet = workspace.resourceIndex.find((resource) => resource.id === "SH-HS-MATH-HJ-B2-C08-L01-A01");
  assert.equal(scaffoldApplet.quality.implementationStage, "scaffold");
  assert.equal(scaffoldApplet.quality.readinessLabel, "骨架待精修");
  assert.equal(scaffoldApplet.player, null);
});
