import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(new URL("./index.html", import.meta.url), "utf8");
const readme = await readFile(new URL("../README.md", import.meta.url), "utf8");
const teacherScript = await readFile(new URL("../teacher-script.md", import.meta.url), "utf8");
const review = await readFile(new URL("../review.md", import.meta.url), "utf8");
const metadata = await readFile(new URL("../metadata.yaml", import.meta.url), "utf8");

test("platform iframe compact mode keeps key controls inside the 560px target", () => {
  assert.match(source, /@media\s*\(max-height:\s*620px\)\s*and\s*\(min-width:\s*781px\)/);
  assert.match(source, /grid-template-rows:\s*minmax\(270px,\s*1fr\)\s*auto/);
  assert.match(source, /height:\s*clamp\(270px,\s*40svh,\s*320px\)/);
  assert.match(source, /max-height:\s*calc\(100svh\s*-\s*70px\)/);
  assert.match(source, /min-height:\s*32px/);
  assert.match(source, /\.panel \.section:first-child > \.strategy-box\s*\{[\s\S]*?display:\s*none/);
});

test("formal notation uses AD and AE while oral shorthand stays explicitly bounded", () => {
  assert.doesNotMatch(source, /[^\u4e00-\u9fa5A-Za-z]D\s*=\s*m\s*p/);
  assert.doesNotMatch(source, /[^\u4e00-\u9fa5A-Za-z]E\s*=\s*n\s*q/);
  assert.match(source, /AD = mp/);
  assert.match(source, /AE = nq/);
  assert.match(readme, /AD = m p[\s\S]*AE = n q/);
  assert.match(teacherScript, /正式板书优先写 `AD = mp`、`AE = nq`/);
  assert.match(metadata, /以 A 为共同起点/);
  assert.match(review, /hold_for_platform_iframe_fit/);
  assert.match(review, /暂不建议：`math_review`、`browser_review`、`classroom_trial`、`release_candidate` 或 `published`/);
});

test("zero first coefficient does not leave a leading plus sign in AB/BC basis", () => {
  const fmtDefinition = source.match(/function fmt\(value\) \{[\s\S]*?\n      \}/)?.[0];
  const termDefinition = source.match(/function term\(coef, symbol, first = false\) \{[\s\S]*?\n      \}/)?.[0];
  const joinTermsDefinition = source.match(/function joinTerms\(terms\) \{[\s\S]*?\n      \}/)?.[0];

  assert.ok(fmtDefinition, "Expected fmt function in HTML source");
  assert.ok(termDefinition, "Expected term function in HTML source");
  assert.ok(joinTermsDefinition, "Expected joinTerms function in HTML source");

  const { term, joinTerms } = new Function(
    `${fmtDefinition}\n${termDefinition}\n${joinTermsDefinition}\nreturn { term, joinTerms };`
  )();

  assert.equal(joinTerms([term(0, "p", true), term(0.65, "r")]), "0.65r");
  assert.equal(joinTerms([term(-0.4, "p", true), term(0.65, "q")]), "-0.4p + 0.65q");
});
