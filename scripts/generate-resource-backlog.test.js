import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

import { generateResourceBacklog, writeResourceBacklog } from "./generate-resource-backlog.js";

const repoRoot = fileURLToPath(new URL("../", import.meta.url));

test("generates a deterministic backlog from curriculum entry points and implemented resources", async () => {
  const backlog = await generateResourceBacklog({ rootDir: repoRoot });

  assert.equal(backlog.source.curriculum, "content/curriculum/index.yaml");
  assert.equal(backlog.summary.total, 37);
  assert.equal(backlog.summary.implemented, 25);
  assert.equal(backlog.summary.planned, 12);
  assert.deepEqual(backlog.summary.byType.applet, { total: 23, implemented: 14, planned: 9 });
  assert.deepEqual(backlog.summary.byType.manim_clip, { total: 4, implemented: 4, planned: 0 });
  assert.deepEqual(backlog.summary.byType.diagnosis, { total: 10, implemented: 7, planned: 3 });

  const functionRepresentationApplet = backlog.items.find((item) => item.id === "SH-HS-MATH-HJ-B1-C05-L02-A01");
  assert.equal(functionRepresentationApplet.status, "planned");
  assert.equal(functionRepresentationApplet.availability, "planned");
  assert.equal(functionRepresentationApplet.type, "applet");
  assert.equal(functionRepresentationApplet.lessonTitle, "函数的表示方法");
  assert.equal(functionRepresentationApplet.chapterTitle, "函数的概念、性质及应用");
  assert.equal(functionRepresentationApplet.packagePath, null);
  assert.equal(functionRepresentationApplet.recommendedTrack, "track/trig-sample-pack");

  const functionParityDiagnosis = backlog.items.find((item) => item.id === "SH-HS-MATH-HJ-B1-C05-L03-D01");
  assert.equal(functionParityDiagnosis.status, "planned");
  assert.equal(functionParityDiagnosis.type, "diagnosis");
  assert.equal(functionParityDiagnosis.recommendedTrack, "track/review-system");

  const monotonicityApplet = backlog.items.find((item) => item.id === "SH-HS-MATH-HJ-B1-C05-L04-A01");
  assert.equal(monotonicityApplet.status, "planned");
  assert.equal(monotonicityApplet.type, "applet");

  const bisectionApplet = backlog.items.find((item) => item.id === "SH-HS-MATH-HJ-B1-C05-L08-A01");
  assert.equal(bisectionApplet.status, "planned");
  assert.equal(bisectionApplet.type, "applet");

  const angleMeasureApplet = backlog.items.find((item) => item.id === "SH-HS-MATH-HJ-B2-C06-L02-A01");
  assert.equal(angleMeasureApplet.status, "planned");
  assert.equal(angleMeasureApplet.availability, "planned");
  assert.equal(angleMeasureApplet.type, "applet");
  assert.equal(angleMeasureApplet.chapterTitle, "三角");
  assert.equal(angleMeasureApplet.lessonTitle, "任意角及其度量");
  assert.equal(angleMeasureApplet.priority, "chapter_backlog");
  assert.equal(angleMeasureApplet.packagePath, null);
  assert.match(angleMeasureApplet.note, /不做普通换算刷题/);

  const trigRatioDiagnosis = backlog.items.find((item) => item.id === "SH-HS-MATH-HJ-B2-C06-L03-D01");
  assert.equal(trigRatioDiagnosis.status, "planned");
  assert.equal(trigRatioDiagnosis.type, "diagnosis");
  assert.equal(trigRatioDiagnosis.recommendedTrack, "track/review-system");
  assert.match(trigRatioDiagnosis.nextAction, /创建 Diagnosis 资源包/);

  const sineApplet = backlog.items.find((item) => item.id === "SH-HS-MATH-HJ-B2-C07-L01-A01");
  assert.equal(sineApplet.status, "implemented");
  assert.equal(sineApplet.packagePath, "content/applets/SH-HS-MATH-HJ-B2-C07-L01-A01");
  assert.equal(sineApplet.recommendedTrack, "track/trig-sample-pack");
  assert.match(sineApplet.nextAction, /审校|试读/);

  const sineManim = backlog.items.find((item) => item.id === "SH-HS-MATH-HJ-B2-C07-L01-M01");
  assert.equal(sineManim.status, "implemented");
  assert.equal(sineManim.availability, "video_ready");
  assert.equal(sineManim.packagePath, "content/manim/SH-HS-MATH-HJ-B2-C07-L01-M01");
  assert.equal(sineManim.recommendedTrack, "track/manim-pipeline");

  const sinePropertiesApplet = backlog.items.find((item) => item.id === "SH-HS-MATH-HJ-B2-C07-L02-A01");
  assert.equal(sinePropertiesApplet.status, "implemented");
  assert.equal(sinePropertiesApplet.availability, "metadata_ready");
  assert.equal(sinePropertiesApplet.packagePath, "content/applets/SH-HS-MATH-HJ-B2-C07-L02-A01");
  assert.equal(sinePropertiesApplet.metadataPath, "content/applets/SH-HS-MATH-HJ-B2-C07-L02-A01/metadata.yaml");
  assert.equal(sinePropertiesApplet.recommendedTrack, "track/trig-sample-pack");
  assert.match(sinePropertiesApplet.nextAction, /审校|试读/);

  const sineDiagnosis = backlog.items.find((item) => item.id === "SH-HS-MATH-HJ-B2-C07-L02-D01");
  assert.equal(sineDiagnosis.status, "implemented");
  assert.equal(sineDiagnosis.availability, "item_bank_ready");
  assert.equal(sineDiagnosis.type, "diagnosis");
  assert.equal(sineDiagnosis.packagePath, "content/diagnosis/SH-HS-MATH-HJ-B2-C07-L02-D01");
  assert.equal(sineDiagnosis.metadataPath, "content/diagnosis/SH-HS-MATH-HJ-B2-C07-L02-D01/metadata.yaml");
  assert.equal(sineDiagnosis.recommendedTrack, "track/review-system");
  assert.equal(sineDiagnosis.priority, "mvp");
  assert.match(sineDiagnosis.threadPrompt, /SH-HS-MATH-HJ-B2-C07-L02-D01/);

  const cosineApplet = backlog.items.find((item) => item.id === "SH-HS-MATH-HJ-B2-C07-L03-A01");
  assert.equal(cosineApplet.status, "implemented");
  assert.equal(cosineApplet.availability, "metadata_ready");
  assert.equal(cosineApplet.type, "applet");
  assert.equal(cosineApplet.packagePath, "content/applets/SH-HS-MATH-HJ-B2-C07-L03-A01");
  assert.equal(cosineApplet.metadataPath, "content/applets/SH-HS-MATH-HJ-B2-C07-L03-A01/metadata.yaml");
  assert.equal(cosineApplet.recommendedTrack, "track/trig-sample-pack");
  assert.equal(cosineApplet.priority, "chapter_backlog");
  assert.match(cosineApplet.nextAction, /审校|试读/);

  const phaseCompareApplet = backlog.items.find((item) => item.id === "SH-HS-MATH-HJ-B2-C07-L03-A02");
  assert.equal(phaseCompareApplet.status, "implemented");
  assert.equal(phaseCompareApplet.availability, "metadata_ready");
  assert.equal(phaseCompareApplet.type, "applet");
  assert.equal(phaseCompareApplet.packagePath, "content/applets/SH-HS-MATH-HJ-B2-C07-L03-A02");
  assert.equal(phaseCompareApplet.metadataPath, "content/applets/SH-HS-MATH-HJ-B2-C07-L03-A02/metadata.yaml");
  assert.equal(phaseCompareApplet.recommendedTrack, "track/trig-sample-pack");
  assert.equal(phaseCompareApplet.priority, "chapter_backlog");
  assert.match(phaseCompareApplet.nextAction, /审校|试读/);

  const cosinePropertiesApplet = backlog.items.find((item) => item.id === "SH-HS-MATH-HJ-B2-C07-L04-A01");
  assert.equal(cosinePropertiesApplet.status, "implemented");
  assert.equal(cosinePropertiesApplet.availability, "metadata_ready");
  assert.equal(cosinePropertiesApplet.type, "applet");
  assert.equal(cosinePropertiesApplet.packagePath, "content/applets/SH-HS-MATH-HJ-B2-C07-L04-A01");
  assert.equal(cosinePropertiesApplet.metadataPath, "content/applets/SH-HS-MATH-HJ-B2-C07-L04-A01/metadata.yaml");
  assert.equal(cosinePropertiesApplet.recommendedTrack, "track/trig-sample-pack");
  assert.equal(cosinePropertiesApplet.priority, "chapter_backlog");
  assert.match(cosinePropertiesApplet.nextAction, /审校|试读/);

  const cosinePropertiesDiagnosis = backlog.items.find(
    (item) => item.id === "SH-HS-MATH-HJ-B2-C07-L04-D01",
  );
  assert.equal(cosinePropertiesDiagnosis.status, "implemented");
  assert.equal(cosinePropertiesDiagnosis.availability, "item_bank_ready");
  assert.equal(cosinePropertiesDiagnosis.type, "diagnosis");
  assert.equal(
    cosinePropertiesDiagnosis.packagePath,
    "content/diagnosis/SH-HS-MATH-HJ-B2-C07-L04-D01",
  );
  assert.equal(
    cosinePropertiesDiagnosis.metadataPath,
    "content/diagnosis/SH-HS-MATH-HJ-B2-C07-L04-D01/metadata.yaml",
  );
  assert.equal(cosinePropertiesDiagnosis.recommendedTrack, "track/review-system");
  assert.equal(cosinePropertiesDiagnosis.priority, "chapter_backlog");
  assert.match(cosinePropertiesDiagnosis.threadPrompt, /SH-HS-MATH-HJ-B2-C07-L04-D01/);

  const parameterLabApplet = backlog.items.find((item) => item.id === "SH-HS-MATH-HJ-B2-C07-L05-A01");
  assert.equal(parameterLabApplet.status, "implemented");
  assert.equal(parameterLabApplet.availability, "metadata_ready");
  assert.equal(parameterLabApplet.type, "applet");
  assert.equal(parameterLabApplet.packagePath, "content/applets/SH-HS-MATH-HJ-B2-C07-L05-A01");
  assert.equal(parameterLabApplet.metadataPath, "content/applets/SH-HS-MATH-HJ-B2-C07-L05-A01/metadata.yaml");
  assert.equal(parameterLabApplet.recommendedTrack, "track/trig-sample-pack");
  assert.equal(parameterLabApplet.priority, "mvp");

  const transformOrderManim = backlog.items.find((item) => item.id === "SH-HS-MATH-HJ-B2-C07-L05-M01");
  assert.equal(transformOrderManim.status, "implemented");
  assert.equal(transformOrderManim.availability, "video_ready");
  assert.equal(transformOrderManim.type, "manim_clip");
  assert.equal(transformOrderManim.packagePath, "content/manim/SH-HS-MATH-HJ-B2-C07-L05-M01");
  assert.equal(transformOrderManim.metadataPath, "content/manim/SH-HS-MATH-HJ-B2-C07-L05-M01/metadata.yaml");
  assert.equal(transformOrderManim.recommendedTrack, "track/manim-pipeline");
  assert.equal(transformOrderManim.priority, "mvp");
  assert.match(transformOrderManim.nextAction, /审校|分镜/);

  const parameterDiagnosis = backlog.items.find((item) => item.id === "SH-HS-MATH-HJ-B2-C07-L05-D01");
  assert.equal(parameterDiagnosis.status, "implemented");
  assert.equal(parameterDiagnosis.availability, "item_bank_ready");
  assert.equal(parameterDiagnosis.type, "diagnosis");
  assert.equal(parameterDiagnosis.packagePath, "content/diagnosis/SH-HS-MATH-HJ-B2-C07-L05-D01");
  assert.equal(parameterDiagnosis.metadataPath, "content/diagnosis/SH-HS-MATH-HJ-B2-C07-L05-D01/metadata.yaml");
  assert.equal(parameterDiagnosis.recommendedTrack, "track/review-system");
  assert.equal(parameterDiagnosis.priority, "mvp");
  assert.match(parameterDiagnosis.threadPrompt, /SH-HS-MATH-HJ-B2-C07-L05-D01/);

  const tangentGraphApplet = backlog.items.find((item) => item.id === "SH-HS-MATH-HJ-B2-C07-L06-A01");
  assert.equal(tangentGraphApplet.status, "implemented");
  assert.equal(tangentGraphApplet.availability, "metadata_ready");
  assert.equal(tangentGraphApplet.type, "applet");
  assert.equal(tangentGraphApplet.packagePath, "content/applets/SH-HS-MATH-HJ-B2-C07-L06-A01");
  assert.equal(tangentGraphApplet.metadataPath, "content/applets/SH-HS-MATH-HJ-B2-C07-L06-A01/metadata.yaml");
  assert.equal(tangentGraphApplet.recommendedTrack, "track/trig-sample-pack");
  assert.equal(tangentGraphApplet.priority, "follow_up");
  assert.match(tangentGraphApplet.nextAction, /审校|试读/);

  const tangentAsymptoteManim = backlog.items.find((item) => item.id === "SH-HS-MATH-HJ-B2-C07-L06-M01");
  assert.equal(tangentAsymptoteManim.status, "implemented");
  assert.equal(tangentAsymptoteManim.availability, "video_ready");
  assert.equal(tangentAsymptoteManim.type, "manim_clip");
  assert.equal(tangentAsymptoteManim.packagePath, "content/manim/SH-HS-MATH-HJ-B2-C07-L06-M01");
  assert.equal(
    tangentAsymptoteManim.metadataPath,
    "content/manim/SH-HS-MATH-HJ-B2-C07-L06-M01/metadata.yaml",
  );
  assert.equal(tangentAsymptoteManim.recommendedTrack, "track/manim-pipeline");
  assert.equal(tangentAsymptoteManim.priority, "follow_up");
  assert.match(tangentAsymptoteManim.nextAction, /审校|分镜/);

  const tangentPropertiesApplet = backlog.items.find((item) => item.id === "SH-HS-MATH-HJ-B2-C07-L07-A01");
  assert.equal(tangentPropertiesApplet.status, "implemented");
  assert.equal(tangentPropertiesApplet.availability, "metadata_ready");
  assert.equal(tangentPropertiesApplet.type, "applet");
  assert.equal(tangentPropertiesApplet.packagePath, "content/applets/SH-HS-MATH-HJ-B2-C07-L07-A01");
  assert.equal(
    tangentPropertiesApplet.metadataPath,
    "content/applets/SH-HS-MATH-HJ-B2-C07-L07-A01/metadata.yaml",
  );
  assert.equal(tangentPropertiesApplet.recommendedTrack, "track/trig-sample-pack");
  assert.equal(tangentPropertiesApplet.priority, "chapter_backlog");
  assert.match(tangentPropertiesApplet.nextAction, /审校|试读/);

  const tangentPropertiesDiagnosis = backlog.items.find(
    (item) => item.id === "SH-HS-MATH-HJ-B2-C07-L07-D01",
  );
  assert.equal(tangentPropertiesDiagnosis.status, "implemented");
  assert.equal(tangentPropertiesDiagnosis.availability, "item_bank_ready");
  assert.equal(tangentPropertiesDiagnosis.type, "diagnosis");
  assert.equal(
    tangentPropertiesDiagnosis.packagePath,
    "content/diagnosis/SH-HS-MATH-HJ-B2-C07-L07-D01",
  );
  assert.equal(
    tangentPropertiesDiagnosis.metadataPath,
    "content/diagnosis/SH-HS-MATH-HJ-B2-C07-L07-D01/metadata.yaml",
  );
  assert.equal(tangentPropertiesDiagnosis.recommendedTrack, "track/review-system");
  assert.equal(tangentPropertiesDiagnosis.priority, "chapter_backlog");
  assert.match(tangentPropertiesDiagnosis.threadPrompt, /SH-HS-MATH-HJ-B2-C07-L07-D01/);

  const vectorConceptApplet = backlog.items.find((item) => item.id === "SH-HS-MATH-HJ-B2-C08-L01-A01");
  assert.equal(vectorConceptApplet.status, "implemented");
  assert.equal(vectorConceptApplet.availability, "metadata_ready");
  assert.equal(vectorConceptApplet.type, "applet");
  assert.equal(vectorConceptApplet.lessonTitle, "向量的概念");
  assert.equal(vectorConceptApplet.chapterTitle, "平面向量");
  assert.equal(vectorConceptApplet.packagePath, "content/applets/SH-HS-MATH-HJ-B2-C08-L01-A01");
  assert.equal(vectorConceptApplet.metadataPath, "content/applets/SH-HS-MATH-HJ-B2-C08-L01-A01/metadata.yaml");
  assert.equal(vectorConceptApplet.recommendedTrack, "track/trig-sample-pack");
  assert.equal(vectorConceptApplet.priority, "chapter_backlog");
  assert.match(vectorConceptApplet.threadPrompt, /复核并推进 SH-HS-MATH-HJ-B2-C08-L01-A01/);

  const vectorAddSubtractApplet = backlog.items.find((item) => item.id === "SH-HS-MATH-HJ-B2-C08-L02-A01");
  assert.equal(vectorAddSubtractApplet.status, "implemented");
  assert.equal(vectorAddSubtractApplet.availability, "metadata_ready");
  assert.equal(vectorAddSubtractApplet.packagePath, "content/applets/SH-HS-MATH-HJ-B2-C08-L02-A01");
  assert.equal(
    vectorAddSubtractApplet.metadataPath,
    "content/applets/SH-HS-MATH-HJ-B2-C08-L02-A01/metadata.yaml",
  );

  const vectorScalarApplet = backlog.items.find((item) => item.id === "SH-HS-MATH-HJ-B2-C08-L03-A01");
  assert.equal(vectorScalarApplet.status, "implemented");
  assert.equal(vectorScalarApplet.availability, "metadata_ready");
  assert.equal(vectorScalarApplet.packagePath, "content/applets/SH-HS-MATH-HJ-B2-C08-L03-A01");
  assert.equal(vectorScalarApplet.metadataPath, "content/applets/SH-HS-MATH-HJ-B2-C08-L03-A01/metadata.yaml");

  const vectorProjectionApplet = backlog.items.find((item) => item.id === "SH-HS-MATH-HJ-B2-C08-L04-A01");
  assert.equal(vectorProjectionApplet.status, "implemented");
  assert.equal(vectorProjectionApplet.availability, "metadata_ready");
  assert.equal(vectorProjectionApplet.packagePath, "content/applets/SH-HS-MATH-HJ-B2-C08-L04-A01");
  assert.equal(
    vectorProjectionApplet.metadataPath,
    "content/applets/SH-HS-MATH-HJ-B2-C08-L04-A01/metadata.yaml",
  );

  const vectorDotProductApplet = backlog.items.find((item) => item.id === "SH-HS-MATH-HJ-B2-C08-L05-A01");
  assert.equal(vectorDotProductApplet.status, "implemented");
  assert.equal(vectorDotProductApplet.availability, "metadata_ready");
  assert.equal(vectorDotProductApplet.packagePath, "content/applets/SH-HS-MATH-HJ-B2-C08-L05-A01");
  assert.equal(
    vectorDotProductApplet.metadataPath,
    "content/applets/SH-HS-MATH-HJ-B2-C08-L05-A01/metadata.yaml",
  );

  const vectorApplicationApplet = backlog.items.find((item) => item.id === "SH-HS-MATH-HJ-B2-C08-L10-A01");
  assert.equal(vectorApplicationApplet.status, "implemented");
  assert.equal(vectorApplicationApplet.availability, "metadata_ready");
  assert.equal(vectorApplicationApplet.packagePath, "content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01");
  assert.equal(
    vectorApplicationApplet.metadataPath,
    "content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01/metadata.yaml",
  );

  const vectorProjectionManim = backlog.items.find((item) => item.id === "SH-HS-MATH-HJ-B2-C08-L04-M01");
  assert.equal(vectorProjectionManim.status, "implemented");
  assert.equal(vectorProjectionManim.availability, "metadata_ready");
  assert.equal(vectorProjectionManim.type, "manim_clip");
  assert.equal(vectorProjectionManim.title, "投影有向长度导入动画");
  assert.equal(vectorProjectionManim.packagePath, "content/manim/SH-HS-MATH-HJ-B2-C08-L04-M01");
  assert.equal(vectorProjectionManim.metadataPath, "content/manim/SH-HS-MATH-HJ-B2-C08-L04-M01/metadata.yaml");
  assert.equal(vectorProjectionManim.recommendedTrack, "track/manim-pipeline");

  const vectorAddSubtractDiagnosis = backlog.items.find((item) => item.id === "SH-HS-MATH-HJ-B2-C08-L02-D01");
  assert.equal(vectorAddSubtractDiagnosis.status, "implemented");
  assert.equal(vectorAddSubtractDiagnosis.availability, "metadata_ready");
  assert.equal(vectorAddSubtractDiagnosis.type, "diagnosis");
  assert.equal(vectorAddSubtractDiagnosis.title, "加减法方向四类短诊断");
  assert.equal(vectorAddSubtractDiagnosis.packagePath, "content/diagnosis/SH-HS-MATH-HJ-B2-C08-L02-D01");
  assert.equal(
    vectorAddSubtractDiagnosis.metadataPath,
    "content/diagnosis/SH-HS-MATH-HJ-B2-C08-L02-D01/metadata.yaml",
  );
  assert.equal(vectorAddSubtractDiagnosis.recommendedTrack, "track/review-system");

  const vectorDotProductDiagnosis = backlog.items.find((item) => item.id === "SH-HS-MATH-HJ-B2-C08-L05-D01");
  assert.equal(vectorDotProductDiagnosis.status, "implemented");
  assert.equal(vectorDotProductDiagnosis.availability, "metadata_ready");
  assert.equal(vectorDotProductDiagnosis.type, "diagnosis");
  assert.equal(vectorDotProductDiagnosis.title, "数量积正负误区诊断");
  assert.equal(vectorDotProductDiagnosis.packagePath, "content/diagnosis/SH-HS-MATH-HJ-B2-C08-L05-D01");
  assert.equal(
    vectorDotProductDiagnosis.metadataPath,
    "content/diagnosis/SH-HS-MATH-HJ-B2-C08-L05-D01/metadata.yaml",
  );
  assert.equal(vectorDotProductDiagnosis.recommendedTrack, "track/review-system");

  const vectorApplicationDiagnosis = backlog.items.find((item) => item.id === "SH-HS-MATH-HJ-B2-C08-L10-D01");
  assert.equal(vectorApplicationDiagnosis.status, "implemented");
  assert.equal(vectorApplicationDiagnosis.availability, "metadata_ready");
  assert.equal(vectorApplicationDiagnosis.type, "diagnosis");
  assert.equal(vectorApplicationDiagnosis.title, "向量应用第一步诊断");
  assert.equal(vectorApplicationDiagnosis.packagePath, "content/diagnosis/SH-HS-MATH-HJ-B2-C08-L10-D01");
  assert.equal(
    vectorApplicationDiagnosis.metadataPath,
    "content/diagnosis/SH-HS-MATH-HJ-B2-C08-L10-D01/metadata.yaml",
  );
  assert.equal(vectorApplicationDiagnosis.recommendedTrack, "track/review-system");

  assert.equal(backlog.items.some((item) => item.id === "SH-HS-MATH-HJ-B2-C08-L08-A01"), false);
  assert.equal(backlog.items.some((item) => item.id === "SH-HS-MATH-HJ-B2-C08-L09-A01"), false);

  const complexPlaneApplet = backlog.items.find((item) => item.id === "SH-HS-MATH-HJ-B2-C09-L03-A01");
  assert.equal(complexPlaneApplet.status, "planned");
  assert.equal(complexPlaneApplet.availability, "planned");
  assert.equal(complexPlaneApplet.packagePath, null);
  assert.equal(complexPlaneApplet.metadataPath, null);
  assert.equal(complexPlaneApplet.chapterTitle, "复数");
  assert.equal(complexPlaneApplet.lessonTitle, "复平面、复数的向量表示与加法几何意义");
  assert.equal(complexPlaneApplet.recommendedTrack, "track/trig-sample-pack");
  assert.equal(complexPlaneApplet.priority, "chapter_backlog");
  assert.match(complexPlaneApplet.nextAction, /创建 Applet 资源包/);
  assert.match(complexPlaneApplet.threadPrompt, /创建并推进 SH-HS-MATH-HJ-B2-C09-L03-A01/);

  const modulusApplet = backlog.items.find((item) => item.id === "SH-HS-MATH-HJ-B2-C09-L04-A01");
  assert.equal(modulusApplet.status, "planned");
  assert.equal(modulusApplet.lessonTitle, "复数的模");
  assert.equal(modulusApplet.priority, "chapter_backlog");

  const complexMultiplicationApplet = backlog.items.find((item) => item.id === "SH-HS-MATH-HJ-B2-C09-L07-A01");
  assert.equal(complexMultiplicationApplet.status, "planned");
  assert.equal(complexMultiplicationApplet.lessonTitle, "三角形式下复数的乘除、乘方与开方运算");
  assert.equal(complexMultiplicationApplet.priority, "follow_up_optional");
  assert.equal(backlog.items.some((item) => item.id === "SH-HS-MATH-HJ-B2-C09-L01-A01"), false);
});

test("writes the backlog as stable pretty JSON", async () => {
  const tempRoot = await mkdtemp(path.join(tmpdir(), "shanghai-hs-math-backlog-"));

  try {
    const outputPath = await writeResourceBacklog({
      rootDir: repoRoot,
      outputPath: path.join(tempRoot, "resource-backlog.json"),
    });
    const written = JSON.parse(await readFile(outputPath, "utf8"));

    assert.equal(written.summary.total, 37);
    assert.equal(written.summary.implemented, 25);
    assert.equal(written.summary.planned, 12);
    assert.equal(written.items[0].id, "SH-HS-MATH-HJ-B1-C05-L02-A01");
    assert.ok(
      JSON.stringify(written, null, 2).includes(
        '"id": "SH-HS-MATH-HJ-B2-C09-L07-A01"',
      ),
    );
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
});
