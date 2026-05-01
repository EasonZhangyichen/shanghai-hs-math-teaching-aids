import assert from "node:assert/strict";
import { cp, mkdir, rm, writeFile } from "node:fs/promises";
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
  assert.equal(result.counts.applets, 3);
  assert.equal(result.counts.manimClips, 2);
  assert.ok(result.resources.some((resource) => resource.id === "SH-HS-MATH-HJ-B2-C07-L01-A01"));
  assert.ok(result.resources.some((resource) => resource.id === "SH-HS-MATH-HJ-B2-C07-L02-A01"));
  assert.ok(result.resources.some((resource) => resource.id === "SH-HS-MATH-HJ-B2-C07-L05-A01"));
  assert.ok(result.resources.some((resource) => resource.id === "SH-HS-MATH-HJ-B2-C07-L01-M01"));
  assert.ok(result.resources.some((resource) => resource.id === "SH-HS-MATH-HJ-B2-C07-L05-M01"));
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
    await cp(path.join(repoRoot, "packages/diagnosis-sdk"), path.join(tempRoot, "packages/diagnosis-sdk"), {
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

test("validates a Diagnosis metadata package against curriculum and required files", async () => {
  const tempRoot = path.join(
    tmpdir(),
    `shanghai-hs-math-diagnosis-validation-${process.pid}-${Date.now()}`,
  );
  const diagnosisDir = path.join(tempRoot, "content/diagnosis/SH-HS-MATH-HJ-B2-C07-L02-D01");

  try {
    await mkdir(diagnosisDir, { recursive: true });
    await cp(path.join(repoRoot, "content/curriculum"), path.join(tempRoot, "content/curriculum"), {
      recursive: true,
    });
    await cp(path.join(repoRoot, "packages/applet-sdk"), path.join(tempRoot, "packages/applet-sdk"), {
      recursive: true,
    });
    await cp(path.join(repoRoot, "packages/manim-pipeline"), path.join(tempRoot, "packages/manim-pipeline"), {
      recursive: true,
    });
    await cp(path.join(repoRoot, "packages/diagnosis-sdk"), path.join(tempRoot, "packages/diagnosis-sdk"), {
      recursive: true,
    });

    await writeFile(
      path.join(diagnosisDir, "metadata.yaml"),
      `schema_version: "0.1.0"
id: "SH-HS-MATH-HJ-B2-C07-L02-D01"
version: "0.1.0"
status: "draft"
resource_type: "diagnosis"
title: "正弦函数性质诊断"
subtitle: "围绕周期、单调区间和对称性的课堂即时诊断"

curriculum:
  region: "上海"
  stage: "高中"
  subject: "数学"
  edition: "沪教版"
  volume_id: "B2"
  volume_title: "必修第二册"
  chapter_id: "SH-HS-MATH-HJ-B2-C07"
  chapter_title: "三角函数"
  section_id: "SH-HS-MATH-HJ-B2-C07-S01"
  section_title: "正弦函数的图像与性质"
  lesson_id: "SH-HS-MATH-HJ-B2-C07-L02"
  textbook_ref: "7.1.2"
  lesson_title: "正弦函数的性质"

pedagogy:
  cognitive_action: "比较"
  estimated_classroom_minutes: 8
  primary_teaching_problem: "学生容易背诵正弦函数性质，却在单调区间端点、周期遗漏和对称元素判断中暴露混淆。"
  learning_goals:
    - "识别正弦函数性质判断中的关键错误类型。"
    - "用图像和单位圆解释周期、单调区间和对称性。"
  prerequisites:
    - "正弦函数图像"
    - "函数性质的语言表达"
  successors:
    - "SH-HS-MATH-HJ-B2-C07-L03"
    - "SH-HS-MATH-HJ-B2-C07-L05"
  core_competencies:
    - "逻辑推理"
    - "直观想象"
  classroom_use: "新授课后 6 到 8 分钟即时诊断，也可作为作业讲评前的错因分流。"

diagnosis_design:
  diagnostic_focus:
    - "能否写出完整的一般解形式。"
    - "能否区分单调区间和局部观察区间。"
  misconception_tags:
    - id: "period_omission"
      title: "周期遗漏"
      description: "只写一个区间或一个关键点，遗漏加 2kpi 的一般形式。"
    - id: "monotonic_endpoint_confusion"
      title: "单调端点混淆"
      description: "把端点、开闭区间或相邻周期段混用。"
  item_summary:
    total_items: 4
    question_types:
      - "single_choice"
      - "short_explanation"
    estimated_minutes: 8
  feedback_strategy:
    immediate_feedback: "按错因标签给出图像回看提示和一句关键追问。"
    teacher_dashboard_notes: "统计每个错因标签的命中人数，用于决定是否回到单位圆或图像性质。"

scoring:
  mastery_threshold: 0.75
  grading_mode: "tagged_misconception"
  retry_policy: "课堂内允许一次订正，保留首次错因标签。"

platform_card:
  availability: "metadata_ready"
  preview_behavior: "metadata_placeholder"
  embed_strategy: "首期显示诊断目标、错因标签和题组摘要；后续接入诊断播放器。"

files:
  readme: "README.md"
  item_bank: "item-bank.yaml"
  scoring_rubric: "scoring-rubric.md"
  teacher_notes: "teacher-notes.md"
  review_record: "review.md"

compliance:
  copyright_note: "本诊断包为原创题组设计，不复制教材正文、官方课件或商业题库。"
  review_status: "self_checked_draft"
`,
      "utf8",
    );
    await writeFile(path.join(diagnosisDir, "README.md"), "# 正弦函数性质诊断\n", "utf8");
    await writeFile(path.join(diagnosisDir, "item-bank.yaml"), "items: []\n", "utf8");
    await writeFile(path.join(diagnosisDir, "scoring-rubric.md"), "# 评分规则\n", "utf8");
    await writeFile(path.join(diagnosisDir, "teacher-notes.md"), "# 教师说明\n", "utf8");
    await writeFile(path.join(diagnosisDir, "review.md"), "# 审核记录\n", "utf8");

    const result = await validateContent({ rootDir: tempRoot });
    const diagnosis = result.resources.find((resource) => resource.id === "SH-HS-MATH-HJ-B2-C07-L02-D01");

    assert.deepEqual(result.errors, []);
    assert.equal(result.counts.diagnoses, 1);
    assert.equal(diagnosis.resourceType, "diagnosis");
    assert.equal(diagnosis.availability, "metadata_ready");
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
});
