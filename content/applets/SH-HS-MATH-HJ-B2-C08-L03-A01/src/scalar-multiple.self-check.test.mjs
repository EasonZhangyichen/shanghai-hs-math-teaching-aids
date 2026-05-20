import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import test from "node:test";
import assert from "node:assert/strict";

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = await readFile(join(__dirname, "index.html"), "utf8");

function cssRule(selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = html.match(new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\n\\s*\\}`, "m"));
  assert.ok(match, `Expected to find CSS rule for ${selector}`);
  return match[1];
}

function cssRuleByPattern(pattern, label) {
  const matches = Array.from(html.matchAll(new RegExp(`${pattern}\\s*\\{([\\s\\S]*?)\\n\\s*\\}`, "gm")));
  assert.ok(matches.length > 0, `Expected to find CSS rule for ${label}`);
  return matches.at(-1)[1];
}

function cssRuleContaining(pattern, label, expected) {
  const matches = Array.from(html.matchAll(new RegExp(`${pattern}\\s*\\{([\\s\\S]*?)\\n\\s*\\}`, "gm")));
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

test("scalar multiple applet exposes the required exploration controls and states", () => {
  assert.match(html, /data-testid="lambda-slider"/);
  assert.match(html, /data-testid="vector-board"/);
  assert.match(html, /data-testid="drag-base-vector"/);
  assert.match(html, /lambda-sign-positive/);
  assert.match(html, /lambda-sign-zero/);
  assert.match(html, /lambda-sign-negative/);
  assert.match(html, /零向量/);
  assert.match(html, /方向相反/);
  assert.match(html, /applet:state_changed/);
});

test("scalar multiple applet fits a platform iframe without shrinking touch targets", () => {
  const boardRule = cssRule(".board-wrap");
  const panelRule = cssRuleContaining("\\.panel", ".panel", /var\(--workspace-height\)/);
  const buttonRule = cssRuleByPattern("\\.step-button,\\s*\\.tool-button,\\s*\\.lambda-button", ".step-button, .tool-button, .lambda-button");
  const sliderRule = cssRule('input[type="range"]');
  const workspaceRule = cssRule(".workspace");

  assert.match(html, /--workspace-height:\s*clamp\(/);
  assert.match(boardRule, /var\(--workspace-height\)/);
  assert.match(panelRule, /var\(--workspace-height\)/);
  assert.match(workspaceRule, /minmax\(300px, 1fr\) minmax\(236px, 320px\)/);
  assert.ok(pixelValue(buttonRule, "min-height") >= 40, "buttons should remain at least 40px tall for touch");
  assert.ok(pixelValue(sliderRule, "min-height") >= 40, "lambda slider should preserve a classroom touch target");
  assert.match(html, /id="base-hit"[\s\S]*class="hit-handle"/, "expected a transparent drag hit area for the base vector endpoint");
});

test("scalar multiple applet keeps the grid from reading as x/y coordinate-axis training", () => {
  assert.doesNotMatch(html, /textContent\s*=\s*"x"/, "visible x-axis label should not be generated");
  assert.doesNotMatch(html, /textContent\s*=\s*"y"/, "visible y-axis label should not be generated");
  assert.doesNotMatch(html, /\.axis-label\b/, "axis label styling should not remain as a visible affordance");
  assert.match(html, /浅色网格只作方向和长度参照/);
});

test("scalar multiple applet uses Chinese mathematical wording in accessible labels", () => {
  const ariaLabels = Array.from(html.matchAll(/aria-label="([^"]*)"/g), (match) => match[1]);
  assert.ok(ariaLabels.length > 0, "expected aria-label text to inspect");
  assert.ok(
    ariaLabels.every((label) => !/lambda/i.test(label)),
    `aria-label text should prefer λ wording instead of English lambda: ${ariaLabels.join(" | ")}`,
  );
  assert.ok(
    ariaLabels.every((label) => !/坐标轴读数/.test(label)),
    `aria-label text should describe the grid as a reference instead of coordinate-axis reading: ${ariaLabels.join(" | ")}`,
  );
  assert.ok(
    ariaLabels.some((label) => /浅色网格只作方向和长度参照/.test(label)),
    "expected the vector board aria-label to frame the grid as a direction/length reference",
  );
  assert.ok(ariaLabels.includes("调节实数 λ"));
  assert.ok(ariaLabels.includes("快速设置实数 λ"));
});
