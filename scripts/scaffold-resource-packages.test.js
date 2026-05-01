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
      ["SH-HS-MATH-HJ-B2-C07-L04-D01", "SH-HS-MATH-HJ-B2-C07-L05-D01"],
    );
    assert.deepEqual(result.skipped, []);

    await assert.rejects(
      readdir(path.join(tempRoot, "content/diagnosis/SH-HS-MATH-HJ-B2-C07-L04-D01")),
      /ENOENT/,
    );
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
});

test("writes a diagnosis scaffold with required package files", async () => {
  const tempRoot = await makeTempProject();
  const resourceId = "SH-HS-MATH-HJ-B2-C07-L04-D01";
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
    assert.equal(metadata.curriculum.lesson_id, "SH-HS-MATH-HJ-B2-C07-L04");
    assert.equal(metadata.platform_card.availability, "metadata_ready");
    assert.equal(metadata.files.item_bank, "item-bank.yaml");

    const itemBank = YAML.parse(await readFile(path.join(packageDir, "item-bank.yaml"), "utf8"));
    assert.equal(itemBank.resource_id, resourceId);
    assert.deepEqual(itemBank.items, []);
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
