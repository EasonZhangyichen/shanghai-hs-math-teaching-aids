import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(new URL("./index.html", import.meta.url), "utf8");
const visibleResourceFiles = [
  ["src/index.html", source],
  ["teacher-script.md", await readFile(new URL("../teacher-script.md", import.meta.url), "utf8")],
  ["student-task.md", await readFile(new URL("../student-task.md", import.meta.url), "utf8")],
  ["review.md", await readFile(new URL("../review.md", import.meta.url), "utf8")]
];

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

function cssRuleContaining(pattern, label, text) {
  const matches = Array.from(source.matchAll(new RegExp(`${pattern}\\s*\\{([\\s\\S]*?)\\n\\s*\\}`, "gm")));
  const match = matches.find((candidate) => candidate[1].includes(text));
  assert.ok(match, `Expected to find CSS rule for ${label} containing ${text}`);
  return match[1];
}

function pixelValue(rule, property) {
  const match = rule.match(new RegExp(`${property}\\s*:\\s*(\\d+)px`));
  assert.ok(match, `Expected ${property} pixel value in rule`);
  return Number(match[1]);
}

test("platform iframe layout uses the available first-screen height", () => {
  const boardRule = cssRule(".board-wrap");
  const panelRule = cssRuleContaining("^\\s*\\.panel", ".panel", "overflow-y");

  assert.match(boardRule, /var\(--workspace-height\)/);
  assert.match(panelRule, /var\(--workspace-height\)/);
  assert.doesNotMatch(boardRule, /52svh/);
  assert.doesNotMatch(panelRule, /52svh/);
});

test("readout and control density fit the iframe panel without shrinking touch targets below 40px", () => {
  const readoutRule = cssRule(".readout");
  const buttonRule = cssRuleByPattern("\\.tool-button,\\s*\\.angle-button", ".tool-button, .angle-button");

  assert.ok(pixelValue(readoutRule, "min-height") <= 50, "readout cards should stay compact enough for first-screen panel visibility");
  assert.ok(pixelValue(buttonRule, "min-height") >= 40, "buttons should remain touch-friendly");
  assert.ok(pixelValue(buttonRule, "min-height") <= 42, "buttons should not consume excessive vertical space in the iframe header and angle row");
});

test("drag handles keep a large enough invisible touch area after platform iframe scaling", () => {
  const match = source.match(/const hit = createSvg\("circle", \{[\s\S]*?r:\s*(\d+),[\s\S]*?class:\s*"hit-handle"/);
  assert.ok(match, "Expected draggable endpoints to include an invisible hit-handle radius");
  assert.ok(Number(match[1]) >= 32, "hit-handle radius should survive platform iframe scaling as a classroom touch target");
});

test("platform iframe keeps the board and readout beside each other in narrow preview columns", () => {
  const workspaceRule = cssRule(".workspace");
  const singleColumnBreakpoint = source.match(/@media \(max-width: (\d+)px\) \{\s*\.workspace \{/m);

  assert.match(workspaceRule, /minmax\(300px, 1fr\) minmax\(236px, 320px\)/);
  assert.ok(singleColumnBreakpoint, "Expected a single-column media query for genuinely small screens");
  assert.ok(Number(singleColumnBreakpoint[1]) <= 560, "platform iframe previews around 560px wide should remain two-column");
});

test("visible pi fractions use stacked math instead of slash-delimited text", () => {
  for (const [filename, text] of visibleResourceFiles) {
    assert.doesNotMatch(text, /(?:\d+)?π\/\d+/, `${filename} should not expose pi fractions as slash-delimited text`);
  }

  assert.match(source, /math-frac/, "index.html should include stacked fraction markup for classroom readouts");
});
