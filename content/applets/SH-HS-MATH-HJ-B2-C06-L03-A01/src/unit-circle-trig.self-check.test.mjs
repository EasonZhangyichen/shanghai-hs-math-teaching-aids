import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(new URL("./index.html", import.meta.url), "utf8");
const metadata = await readFile(new URL("../metadata.yaml", import.meta.url), "utf8");
const visibleMarkup = source.match(/<body>([\s\S]*?)<script>/)?.[1] ?? "";
const dynamicHtml = Array.from(source.matchAll(/innerHTML\s*=\s*`([\s\S]*?)`/g), (match) => match[1]).join("\n");
const classroomText = `${visibleMarkup}\n${dynamicHtml}`;

test("resource status stays draft and self_checked_draft", () => {
  assert.match(metadata, /^status:\s*"?draft"?$/m);
  assert.match(metadata, /^\s*review_status:\s*"?self_checked_draft"?$/m);
  assert.match(metadata, /^\s*html_src_status:\s*"?runnable"?$/m);
  assert.doesNotMatch(metadata, /(?:math_review|pedagogy_review|classroom_trial|stable|published|stable_approved)/);
});

test("visible model ties terminal side, point coordinate, and trig meanings", () => {
  assert.match(classroomText, /终边/);
  assert.match(classroomText, /单位圆上的点\s*P/);
  assert.match(classroomText, /P\s*=\s*\(\s*cos\s*θ\s*,\s*sin\s*θ\s*\)/);
  assert.match(classroomText, /cos\s*θ\s*=\s*x/);
  assert.match(classroomText, /sin\s*θ\s*=\s*y/);
  assert.match(classroomText, /tan\s*θ\s*=/);
  assert.match(source, /id="terminalRay"/);
  assert.match(source, /id="cosSegment"/);
  assert.match(source, /id="sinSegment"/);
  assert.match(source, /id="tanSegment"/);
  assert.match(source, /id="tangentLine"/);
});

test("quadrant signs are observable through state and color classes", () => {
  assert.match(source, /id="quadrantGrid"/);
  for (const quadrant of ["I", "II", "III", "IV"]) {
    assert.match(source, new RegExp(`data-quadrant="${quadrant}"`));
  }
  assert.match(source, /\.sign-badge\.positive/);
  assert.match(source, /\.sign-badge\.negative/);
  assert.match(source, /\.quadrant-card\.is-active/);
  assert.match(source, /updateQuadrantCards/);
  assert.match(source, /classList\.toggle\("positive"/);
  assert.match(source, /classList\.toggle\("negative"/);
});

test("degree and radian labels use pi math formatting", () => {
  assert.match(classroomText, /角度/);
  assert.match(classroomText, /弧度/);
  assert.match(source, /class="math-frac"/);
  assert.match(source, /π/);
  assert.match(source, /3π/);
  assert.doesNotMatch(source, /\bpi\s*\/\s*2\b/i);
  assert.doesNotMatch(source, /\b3\s*pi\s*\/\s*2\b/i);
});

test("platform protocol and touch affordances are present", () => {
  assert.match(source, /player:init/);
  assert.match(source, /applet:ready/);
  assert.match(source, /applet:stateChanged/);
  assert.match(source, /class:\s*"hit-handle"/);
  assert.match(source, /r:\s*(?:3[8-9]|[4-9]\d)/);
  assert.match(source, /touch-action:\s*none/);
});
