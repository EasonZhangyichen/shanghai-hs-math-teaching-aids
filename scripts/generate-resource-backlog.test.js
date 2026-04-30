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
  assert.equal(backlog.summary.implemented, 2);
  assert.equal(backlog.summary.planned, 13);
  assert.deepEqual(backlog.summary.byType.applet, { total: 8, implemented: 1, planned: 7 });
  assert.deepEqual(backlog.summary.byType.manim_clip, { total: 3, implemented: 1, planned: 2 });
  assert.deepEqual(backlog.summary.byType.diagnosis, { total: 4, implemented: 0, planned: 4 });

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

  const sineDiagnosis = backlog.items.find((item) => item.id === "SH-HS-MATH-HJ-B2-C07-L02-D01");
  assert.equal(sineDiagnosis.status, "planned");
  assert.equal(sineDiagnosis.type, "diagnosis");
  assert.equal(sineDiagnosis.packagePath, null);
  assert.equal(sineDiagnosis.recommendedTrack, "track/review-system");
  assert.equal(sineDiagnosis.priority, "mvp");
  assert.match(sineDiagnosis.threadPrompt, /SH-HS-MATH-HJ-B2-C07-L02-D01/);
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
