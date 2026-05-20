import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(new URL("./index.html", import.meta.url), "utf8");
const metadata = await readFile(new URL("../metadata.yaml", import.meta.url), "utf8");
const visibleMarkup = source.match(/<body>([\s\S]*?)<script>/)?.[1] ?? "";
const visibleJsMessages = Array.from(source.matchAll(/return `([\s\S]*?)`;/g), (match) => match[1]).join("\n");
const classroomVisibleText = `${visibleMarkup}\n${visibleJsMessages}`;

function cssRule(selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = source.match(new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\n\\s*\\}`, "m"));
  assert.ok(match, `Expected to find CSS rule for ${selector}`);
  return match[1];
}

function cssRuleByPattern(pattern, label) {
  const matches = Array.from(source.matchAll(new RegExp(`${pattern}\\s*\\{([\\s\\S]*?)\\n\\s*\\}`, "gm")));
  assert.ok(matches.length > 0, `Expected to find CSS rule for ${label}`);
  return matches.at(-1)[1];
}

function cssRuleContaining(pattern, label, expected) {
  const matches = Array.from(source.matchAll(new RegExp(`${pattern}\\s*\\{([\\s\\S]*?)\\n\\s*\\}`, "gm")));
  assert.ok(matches.length > 0, `Expected to find CSS rule for ${label}`);
  const match = matches.find((candidate) => expected.test(candidate[1]));
  assert.ok(match, `Expected CSS rule for ${label} to contain ${expected}`);
  return match[1];
}

function pixelValue(rule, property) {
  const match = rule.match(new RegExp(`${property}\\s*:\\s*(\\d+)px`));
  assert.ok(match, `Expected ${property} pixel value in rule`);
  return Number(match[1]);
}

test("projection applet is eligible for platform iframe QA without changing content status", () => {
  assert.match(metadata, /status:\s*draft/);
  assert.match(metadata, /review_status:\s*self_checked_draft/);
  assert.match(metadata, /html_src_status:\s*runnable/);
});

test("projection applet uses iframe-height layout and classroom touch targets", () => {
  const boardRule = cssRule(".board-wrap");
  const panelRule = cssRuleContaining("\\.panel", ".panel", /var\(--workspace-height\)/);
  const buttonRule = cssRuleContaining(
    "\\.step-button,\\s*\\.tool-button,\\s*\\.preset-button",
    ".step-button, .tool-button, .preset-button",
    /min-height\s*:\s*\d+px/
  );
  const workspaceRule = cssRule(".workspace");
  const workspaceHeightMatch = source.match(/--workspace-height:\s*clamp\((\d+)px,\s*calc\(100svh - (\d+)px\),\s*(\d+)px\)/);
  const hitRadiusMatch = source.match(/r:\s*(\d+),[\s\S]*class:\s*"hit-handle"/);

  assert.ok(workspaceHeightMatch, "expected workspace height to use a clamp tied to iframe viewport height");
  assert.ok(
    Number(workspaceHeightMatch[2]) >= 128,
    "wrapped iframe headers need enough vertical budget so the workspace stays in the first screen",
  );
  assert.match(source, /--workspace-height:\s*clamp\(/);
  assert.match(boardRule, /var\(--workspace-height\)/);
  assert.match(panelRule, /var\(--workspace-height\)/);
  assert.match(workspaceRule, /minmax\(300px, 1fr\) minmax\(236px, 320px\)/);
  assert.ok(pixelValue(buttonRule, "min-height") >= 40, "buttons should remain at least 40px tall for touch");
  assert.match(source, /class:\s*"hit-handle"/, "expected invisible drag hit handles for vector endpoints");
  assert.ok(hitRadiusMatch, "expected invisible drag hit handles for vector endpoints");
  assert.ok(Number(hitRadiusMatch[1]) >= 42, "hit handles should survive platform iframe scaling");
});

test("classroom-facing labels use mathematical wording instead of data field names", () => {
  const forbiddenFieldNames = [
    ["angle", "degrees"].join("_"),
    ["cos", "theta"].join("_"),
    ["signed", "projection"].join("_"),
    ["dot", "sign"].join("_"),
  ];
  for (const fieldName of forbiddenFieldNames) {
    assert.doesNotMatch(classroomVisibleText, new RegExp(fieldName), `${fieldName} should stay out of visible teaching UI`);
  }
  assert.match(classroomVisibleText, /夹角\s*θ/);
  assert.match(classroomVisibleText, /cos\s*θ/);
  assert.match(classroomVisibleText, /有向投影长度/);
  assert.match(classroomVisibleText, /数量积符号/);
});

test("projection explanation stays geometric and does not foreground coordinate readings", () => {
  assert.doesNotMatch(source, /F\s*\$\{fmtPoint\(stats\.foot\)\}/, "step 2 message should not render F as coordinate-form text");
  assert.doesNotMatch(source, /addText\(grid,\s*String\(x\)/, "grid should not show x-axis coordinate numbers");
  assert.doesNotMatch(source, /addText\(grid,\s*String\(y\)/, "grid should not show y-axis coordinate numbers");
  assert.match(classroomVisibleText, /垂足\s*F/);
  assert.match(classroomVisibleText, /方向轴上的有向位置/);
});

test("compact iframe mode removes optional panel blocks instead of relying on internal scrolling", () => {
  assert.match(
    source,
    /@media\s*\(max-height:\s*620px\)\s*\{[\s\S]*?\.panel-inner\s*\{[\s\S]*?overflow:\s*hidden/,
    "560px iframe height should not rely on a scrollable panel",
  );
  assert.match(
    source,
    /@media\s*\(max-height:\s*620px\)\s*\{[\s\S]*?\.summary-box,\s*\.legend\s*\{[\s\S]*?display:\s*none/,
    "optional summary and legend should be removed in compact iframe mode",
  );
});
