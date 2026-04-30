import assert from "node:assert/strict";
import { cp, mkdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

import { validateContent } from "./validate-content.js";

const repoRoot = fileURLToPath(new URL("../", import.meta.url));

test("validates the current curriculum and resource packages", async () => {
  const result = await validateContent({ rootDir: repoRoot });

  assert.deepEqual(result.errors, []);
  assert.equal(result.counts.lessons, 7);
  assert.equal(result.counts.applets, 1);
  assert.equal(result.counts.manimClips, 1);
  assert.ok(result.resources.some((resource) => resource.id === "SH-HS-MATH-HJ-B2-C07-L01-A01"));
  assert.ok(result.resources.some((resource) => resource.id === "SH-HS-MATH-HJ-B2-C07-L01-M01"));
});

test("reports missing rendered Manim media when a package is video_ready", async () => {
  const tempRoot = path.join(
    tmpdir(),
    `shanghai-hs-math-content-validation-${process.pid}-${Date.now()}`,
  );

  try {
    await mkdir(path.join(tempRoot, "content"), { recursive: true });
    await cp(path.join(repoRoot, "content/curriculum"), path.join(tempRoot, "content/curriculum"), {
      recursive: true,
    });
    await cp(path.join(repoRoot, "packages/applet-sdk"), path.join(tempRoot, "packages/applet-sdk"), {
      recursive: true,
    });
    await cp(path.join(repoRoot, "packages/manim-pipeline"), path.join(tempRoot, "packages/manim-pipeline"), {
      recursive: true,
    });
    await cp(
      path.join(repoRoot, "content/manim/SH-HS-MATH-HJ-B2-C07-L01-M01"),
      path.join(tempRoot, "content/manim/SH-HS-MATH-HJ-B2-C07-L01-M01"),
      { recursive: true },
    );
    await rm(
      path.join(
        tempRoot,
        "content/manim/SH-HS-MATH-HJ-B2-C07-L01-M01/dist/final/SH-HS-MATH-HJ-B2-C07-L01-M01.webm",
      ),
    );

    const result = await validateContent({ rootDir: tempRoot });

    assert.ok(
      result.errors.some((error) =>
        error.includes("SH-HS-MATH-HJ-B2-C07-L01-M01 files.output_webm is missing"),
      ),
    );
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
});
