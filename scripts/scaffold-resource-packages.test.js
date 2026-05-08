import assert from "node:assert/strict";
import { cp, mkdtemp, readdir, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

import YAML from "yaml";

import { scaffoldResourcePackages } from "./scaffold-resource-packages.js";

const repoRoot = fileURLToPath(new URL("../", import.meta.url));

async function makeTempProject() {
  const tempRoot = await mkdtemp(path.join(tmpdir(), "shanghai-hs-math-scaffold-"));

  await cp(path.join(repoRoot, "content/curriculum"), path.join(tempRoot, "content/curriculum"), {
    recursive: true,
  });
  await cp(path.join(repoRoot, "content/diagnosis"), path.join(tempRoot, "content/diagnosis"), {
    recursive: true,
  });
  await rm(path.join(tempRoot, "content/diagnosis/SH-HS-MATH-HJ-B2-C07-L07-D01"), {
    recursive: true,
    force: true,
  });
  await rm(path.join(tempRoot, "content/diagnosis/SH-HS-MATH-HJ-B2-C08-L02-D01"), {
    recursive: true,
    force: true,
  });

  return tempRoot;
}

test("dry-runs planned diagnosis scaffolds without writing packages", async () => {
  const tempRoot = await makeTempProject();

  try {
    const result = await scaffoldResourcePackages({
      rootDir: tempRoot,
      type: "diagnosis",
      limit: 2,
      write: false,
    });

    assert.equal(result.write, false);
    assert.deepEqual(
      result.created.map((item) => item.id),
      ["SH-HS-MATH-HJ-B1-C05-L03-D01", "SH-HS-MATH-HJ-B2-C06-L03-D01"],
    );
    assert.deepEqual(result.skipped, []);

    await assert.rejects(
      readdir(path.join(tempRoot, "content/diagnosis/SH-HS-MATH-HJ-B1-C05-L03-D01")),
      /ENOENT/,
    );
    await assert.rejects(
      readdir(path.join(tempRoot, "content/diagnosis/SH-HS-MATH-HJ-B2-C06-L03-D01")),
      /ENOENT/,
    );
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
});

test("writes a diagnosis scaffold with required package files", async () => {
  const tempRoot = await makeTempProject();
  const resourceId = "SH-HS-MATH-HJ-B2-C07-L07-D01";
  const packageDir = path.join(tempRoot, "content/diagnosis", resourceId);

  try {
    const result = await scaffoldResourcePackages({
      rootDir: tempRoot,
      ids: [resourceId],
      write: true,
    });

    assert.equal(result.write, true);
    assert.deepEqual(result.created.map((item) => item.id), [resourceId]);

    const files = await readdir(packageDir);
    assert.deepEqual(files.sort(), [
      "README.md",
      "item-bank.yaml",
      "metadata.yaml",
      "review.md",
      "scoring-rubric.md",
      "teacher-notes.md",
    ]);

    const metadata = YAML.parse(await readFile(path.join(packageDir, "metadata.yaml"), "utf8"));
    assert.equal(metadata.id, resourceId);
    assert.equal(metadata.resource_type, "diagnosis");
    assert.equal(metadata.curriculum.lesson_id, "SH-HS-MATH-HJ-B2-C07-L07");
    assert.equal(metadata.platform_card.availability, "metadata_ready");
    assert.equal(metadata.files.item_bank, "item-bank.yaml");

    const itemBank = YAML.parse(await readFile(path.join(packageDir, "item-bank.yaml"), "utf8"));
    assert.equal(itemBank.resource_id, resourceId);
    assert.deepEqual(itemBank.items, []);
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
});

test("writes an applet scaffold with metadata, scripts, review, and HTML placeholder", async () => {
  const tempRoot = await makeTempProject();
  const resourceId = "SH-HS-MATH-HJ-B2-C07-L01-A01";
  const packageDir = path.join(tempRoot, "content/applets", resourceId);

  try {
    const result = await scaffoldResourcePackages({
      rootDir: tempRoot,
      ids: [resourceId],
      write: true,
    });

    assert.equal(result.write, true);
    assert.deepEqual(result.created.map((item) => item.id), [resourceId]);

    const files = await readdir(packageDir);
    assert.deepEqual(files.sort(), ["README.md", "metadata.yaml", "review.md", "src", "student-task.md", "teacher-script.md"]);

    const metadata = YAML.parse(await readFile(path.join(packageDir, "metadata.yaml"), "utf8"));
    assert.equal(metadata.id, resourceId);
    assert.equal(metadata.resource_type, "applet");
    assert.equal(metadata.implementation.html_src_status, "scaffolded");
    assert.equal(metadata.files.src_entry, "src/index.html");

    const html = await readFile(path.join(packageDir, "src/index.html"), "utf8");
    assert.match(html, /SH-HS-MATH-HJ-B2-C07-L01-A01/);
    assert.match(html, /sh-hs-math-applet-sdk/);
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
});

test("writes a Manim scaffold with storyboard, scene, and metadata", async () => {
  const tempRoot = await makeTempProject();
  const resourceId = "SH-HS-MATH-HJ-B2-C07-L01-M01";
  const packageDir = path.join(tempRoot, "content/manim", resourceId);

  try {
    const result = await scaffoldResourcePackages({
      rootDir: tempRoot,
      ids: [resourceId],
      write: true,
    });

    assert.equal(result.write, true);
    assert.deepEqual(result.created.map((item) => item.id), [resourceId]);

    const files = await readdir(packageDir);
    assert.deepEqual(files.sort(), ["README.md", "metadata.yaml", "review.md", "scene.py", "storyboard.md"]);

    const metadata = YAML.parse(await readFile(path.join(packageDir, "metadata.yaml"), "utf8"));
    assert.equal(metadata.id, resourceId);
    assert.equal(metadata.resource_type, "manim_clip");
    assert.equal(metadata.render_plan.phase, "scene_draft");
    assert.equal(metadata.platform_card.availability, "metadata_ready");

    const scene = await readFile(path.join(packageDir, "scene.py"), "utf8");
    assert.match(scene, /class SHHSMATHHJB2C07L01M01Scene/);
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
});

test("skips existing resource packages instead of overwriting them", async () => {
  const tempRoot = await makeTempProject();
  const resourceId = "SH-HS-MATH-HJ-B2-C07-L02-D01";

  try {
    const result = await scaffoldResourcePackages({
      rootDir: tempRoot,
      ids: [resourceId],
      write: true,
    });

    assert.deepEqual(result.created, []);
    assert.deepEqual(result.skipped, [
      {
        id: resourceId,
        reason: "already_exists",
        packagePath: "content/diagnosis/SH-HS-MATH-HJ-B2-C07-L02-D01",
      },
    ]);

    const metadata = YAML.parse(
      await readFile(path.join(tempRoot, "content/diagnosis", resourceId, "metadata.yaml"), "utf8"),
    );
    assert.equal(metadata.platform_card.availability, "item_bank_ready");
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
});
