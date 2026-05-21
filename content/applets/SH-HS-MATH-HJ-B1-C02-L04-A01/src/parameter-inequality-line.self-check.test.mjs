import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import vm from "node:vm";
import test from "node:test";

const packageRoot = new URL("../", import.meta.url);
const sourceUrl = new URL("./index.html", import.meta.url);

async function fileExists(relativePath) {
  try {
    await access(new URL(relativePath, packageRoot));
    return true;
  } catch {
    return false;
  }
}

function extractFunction(source, name) {
  const start = source.indexOf(`function ${name}(`);
  assert.notEqual(start, -1, `Expected function ${name} in index.html`);
  const braceStart = source.indexOf("{", start);
  let depth = 0;
  for (let index = braceStart; index < source.length; index += 1) {
    const character = source[index];
    if (character === "{") depth += 1;
    if (character === "}") depth -= 1;
    if (depth === 0) {
      return source.slice(start, index + 1);
    }
  }
  assert.fail(`Could not extract function ${name}`);
}

function loadSolver(source) {
  const script = [
    extractFunction(source, "flipRelation"),
    extractFunction(source, "compareWithZero"),
    extractFunction(source, "solveInequality"),
    "solveInequality;"
  ].join("\n");
  return vm.runInNewContext(script);
}

function plain(value) {
  return JSON.parse(JSON.stringify(value));
}

test("resource package includes the required draft applet files", async () => {
  const requiredFiles = [
    "metadata.yaml",
    "README.md",
    "teacher-script.md",
    "student-task.md",
    "review.md",
    "src/index.html"
  ];

  for (const filePath of requiredFiles) {
    assert.equal(await fileExists(filePath), true, `${filePath} should exist`);
  }
});

test("linear inequality solver handles parameter sign, endpoint style, and degenerate cases", async () => {
  const source = await readFile(sourceUrl, "utf8");
  const solveInequality = loadSolver(source);

  assert.deepEqual(plain(solveInequality(2, -4, "le")), {
    kind: "ray",
    critical: 2,
    solvedRelation: "le",
    direction: "left",
    endpoint: "closed",
    zeroCoefficient: false
  });

  assert.deepEqual(plain(solveInequality(-2, 4, "lt")), {
    kind: "ray",
    critical: 2,
    solvedRelation: "gt",
    direction: "right",
    endpoint: "open",
    zeroCoefficient: false
  });

  assert.equal(solveInequality(0, -1, "lt").kind, "all");
  assert.equal(solveInequality(0, 1, "lt").kind, "empty");
  assert.equal(solveInequality(0, 0, "le").kind, "all");
  assert.equal(solveInequality(0, 0, "gt").kind, "empty");
});

test("classroom-facing math uses stacked fractions and avoids placeholder notation", async () => {
  const files = [
    ["src/index.html", await readFile(sourceUrl, "utf8")],
    ["README.md", await readFile(new URL("../README.md", import.meta.url), "utf8")],
    ["teacher-script.md", await readFile(new URL("../teacher-script.md", import.meta.url), "utf8")],
    ["student-task.md", await readFile(new URL("../student-task.md", import.meta.url), "utf8")],
    ["review.md", await readFile(new URL("../review.md", import.meta.url), "utf8")]
  ];
  const source = files[0][1];
  const visibleMarkup = source.match(/<body>([\s\S]*?)<script>/)?.[1] ?? "";
  const visibleJsTemplates = Array.from(source.matchAll(/return `([\s\S]*?)`;/g), (match) => match[1]).join("\n");
  const classroomText = `${visibleMarkup}\n${visibleJsTemplates}\n${files.slice(1).map(([, text]) => text).join("\n")}`;

  assert.match(source, /math-frac/, "index.html should include stacked fraction markup");
  assert.match(source, /aria-label="a分之负b"/, "critical point fraction should have Chinese-readable fallback");
  assert.doesNotMatch(classroomText, /theta|pi over|π\/|->|-\s*b\s*\/\s*a|x0|x_0/i);
  assert.doesNotMatch(classroomText, /\b(over)\b/i);
});

test("applet remains offline and in draft self-check status", async () => {
  const source = await readFile(sourceUrl, "utf8");
  const metadata = await readFile(new URL("../metadata.yaml", import.meta.url), "utf8");
  const sourceWithoutNamespaces = source.replace(/http:\/\/www\.w3\.org\/2000\/svg/g, "");

  assert.doesNotMatch(sourceWithoutNamespaces, /https?:\/\//i, "index.html should not depend on network assets");
  assert.match(metadata, /^status:\s*draft$/m);
  assert.match(metadata, /review_status:\s*self_checked_draft/);
  assert.doesNotMatch(metadata, /^status:\s*(math_review|pedagogy_review|classroom_trial|stable)$/m);
});
