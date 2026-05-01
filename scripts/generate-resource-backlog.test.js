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
  assert.equal(backlog.summary.total, 15);
  assert.equal(backlog.summary.implemented, 6);
  assert.equal(backlog.summary.planned, 9);
  assert.deepEqual(backlog.summary.byType.applet, { total: 8, implemented: 3, planned: 5 });
  assert.deepEqual(backlog.summary.byType.manim_clip, { total: 3, implemented: 2, planned: 1 });
  assert.deepEqual(backlog.summary.byType.diagnosis, { total: 4, implemented: 1, planned: 3 });

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
  assert.equal(transformOrderManim.availability, "metadata_ready");
  assert.equal(transformOrderManim.type, "manim_clip");
  assert.equal(transformOrderManim.packagePath, "content/manim/SH-HS-MATH-HJ-B2-C07-L05-M01");
  assert.equal(transformOrderManim.metadataPath, "content/manim/SH-HS-MATH-HJ-B2-C07-L05-M01/metadata.yaml");
  assert.equal(transformOrderManim.recommendedTrack, "track/manim-pipeline");
  assert.equal(transformOrderManim.priority, "mvp");
  assert.match(transformOrderManim.nextAction, /metadata|资源文件|审核记录/);
});

test("writes the backlog as stable pretty JSON", async () => {
  const tempRoot = await mkdtemp(path.join(tmpdir(), "shanghai-hs-math-backlog-"));

  try {
    const outputPath = await writeResourceBacklog({
      rootDir: repoRoot,
      outputPath: path.join(tempRoot, "resource-backlog.json"),
    });
    const written = JSON.parse(await readFile(outputPath, "utf8"));

    assert.equal(written.summary.total, 15);
    assert.equal(written.summary.implemented, 6);
    assert.equal(written.items[0].id, "SH-HS-MATH-HJ-B2-C07-L01-A01");
    assert.ok(
      JSON.stringify(written, null, 2).includes(
        '"id": "SH-HS-MATH-HJ-B2-C07-L05-M01"',
      ),
    );
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
});
