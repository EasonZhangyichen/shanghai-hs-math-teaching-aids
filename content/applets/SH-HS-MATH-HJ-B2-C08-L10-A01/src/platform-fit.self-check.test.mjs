import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(new URL("./index.html", import.meta.url), "utf8");
const readme = await readFile(new URL("../README.md", import.meta.url), "utf8");
const teacherScript = await readFile(new URL("../teacher-script.md", import.meta.url), "utf8");
const studentTask = await readFile(new URL("../student-task.md", import.meta.url), "utf8");
const review = await readFile(new URL("../review.md", import.meta.url), "utf8");
const metadata = await readFile(new URL("../metadata.yaml", import.meta.url), "utf8");

const formalPromotionStatuses = [
  "math_review",
  "browser_review",
  "classroom_trial",
  "release_candidate",
  "published"
];
const asciiPathArrowPattern = new RegExp("\\x2d>");

const visibleSlashForms = [
  /AD\/AB\s*=\s*m/,
  /AE\/AC\s*=\s*n/,
  /m\s*=\s*AD\/AB/,
  /n\s*=\s*AE\/AC/,
  /AB\s*\/\s*AC/,
  /AB\s*\/\s*BC/,
  /1\/4/,
  /1\/3/,
  /1\/2/,
  /2\/3/,
  /3\/4/
];

const docsAndMetadata = {
  readme,
  teacherScript,
  studentTask,
  review,
  metadata
};

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
  assert.match(
    review,
    /(?:暂不建议：`math_review`、`browser_review`、`classroom_trial`、`release_candidate` 或 `published`|(?:本轮)?(?:不触发|不升级到|不进入|不得升级到|暂不进入)[^。\n]*(?:更高正式流转|正式流转|math_review|browser_review|classroom_trial|release_candidate|published))/
  );
  assert.match(review, /建议[：:][^。\n]*维持 `self_checked_draft`/);
  assert.match(metadata, /^status:\s*draft$/m);
  assert.match(metadata, /^\s*review_status:\s*self_checked_draft$/m);
  for (const status of formalPromotionStatuses) {
    assert.doesNotMatch(metadata, new RegExp(`^(?:status|\\s*review_status):\\s*${status}\\s*$`, "m"));
  }
});

test("documentation and metadata avoid ASCII path arrows", () => {
  for (const [name, text] of Object.entries(docsAndMetadata)) {
    assert.doesNotMatch(text, asciiPathArrowPattern, `${name} should use → or Chinese wording instead of ASCII arrows`);
  }

  for (const pathText of ["D → A → E", "D → B → C → E", "D → B → E"]) {
    assert.match(readme, new RegExp(pathText));
    assert.match(teacherScript, new RegExp(pathText));
    assert.match(studentTask, new RegExp(pathText));
    assert.match(review, new RegExp(pathText));
    assert.match(metadata, new RegExp(pathText));
  }
});

test("classroom-visible ratios and basis pairs avoid plain slash notation", () => {
  for (const pattern of visibleSlashForms) {
    assert.doesNotMatch(source, pattern);
  }

  assert.match(source, /class="frac"/);
  assert.match(source, /class="basis-pair"/);
  assert.match(source, /function ratioHtml\(value\)/);

  const docs = [readme, teacherScript, studentTask, review, metadata].join("\n");
  for (const pattern of visibleSlashForms) {
    assert.doesNotMatch(docs, pattern);
  }
  assert.match(readme, /\\frac\{AD\}\{AB\}\s*=\s*m/);
  assert.match(teacherScript, /\\frac\{AD\}\{AB\}\s*=\s*m/);
  assert.match(studentTask, /\\frac\{AD\}\{AB\}\s*=\s*m/);
});

test("common ratio readouts render as stacked fractions", () => {
  const helperStart = source.indexOf("      function fmt(value)");
  const helperEnd = source.indexOf("      function term(coef", helperStart);
  assert.notEqual(helperStart, -1, "Expected fmt helper in HTML source");
  assert.notEqual(helperEnd, -1, "Expected term helper after ratio helpers");

  const helperDefinitions = source.slice(helperStart, helperEnd);
  const { ratioHtml } = new Function(`${helperDefinitions}\nreturn { ratioHtml };`)();

  for (const value of [0.25, 0.33, 0.5, 0.67, 0.75]) {
    const rendered = ratioHtml(value);
    assert.match(rendered, /class="frac"/);
    assert.doesNotMatch(rendered, /\d\/\d/);
  }
});

test("zero first coefficient does not leave a leading plus sign in AB and BC basis", () => {
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
