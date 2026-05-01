#!/usr/bin/env node

import { mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import YAML from "yaml";

import { generateResourceBacklog } from "./generate-resource-backlog.js";

const RESOURCE_DIRS = {
  diagnosis: "content/diagnosis",
};

const REQUIRED_DIAGNOSIS_FILES = {
  readme: "README.md",
  itemBank: "item-bank.yaml",
  metadata: "metadata.yaml",
  review: "review.md",
  scoringRubric: "scoring-rubric.md",
  teacherNotes: "teacher-notes.md",
};

export async function scaffoldResourcePackages({
  rootDir = process.cwd(),
  type = null,
  ids = [],
  limit = null,
  write = false,
} = {}) {
  const backlog = await generateResourceBacklog({ rootDir });
  const requestedIds = new Set(ids);
  const selectedItems = selectItems({ items: backlog.items, requestedIds, type, limit });
  const result = {
    write,
    created: [],
    skipped: [],
  };

  for (const item of selectedItems) {
    if (item.status !== "planned") {
      result.skipped.push({
        id: item.id,
        reason: "already_exists",
        packagePath: item.packagePath,
      });
      continue;
    }

    if (item.type !== "diagnosis") {
      result.skipped.push({
        id: item.id,
        reason: "unsupported_type",
        type: item.type,
      });
      continue;
    }

    const packagePath = path.posix.join(RESOURCE_DIRS.diagnosis, item.id);
    const packageDir = path.join(rootDir, packagePath);

    if (await exists(packageDir)) {
      result.skipped.push({
        id: item.id,
        reason: "already_exists",
        packagePath,
      });
      continue;
    }

    const files = buildDiagnosisFiles(item);
    const createdRecord = {
      id: item.id,
      type: item.type,
      packagePath,
      files: Object.keys(files).sort(),
    };

    if (write) {
      await mkdir(packageDir, { recursive: true });
      await Promise.all(
        Object.entries(files).map(([fileName, contents]) =>
          writeFile(path.join(packageDir, fileName), contents, "utf8"),
        ),
      );
    }

    result.created.push(createdRecord);
  }

  return result;
}

function selectItems({ items, requestedIds, type, limit }) {
  let selected = items;

  if (requestedIds.size > 0) {
    selected = selected.filter((item) => requestedIds.has(item.id));
  }

  if (type) {
    selected = selected.filter((item) => item.type === type);
  }

  selected = selected.filter((item) => item.status === "planned" || requestedIds.has(item.id));

  if (limit !== null) {
    selected = selected.slice(0, limit);
  }

  return selected;
}

function buildDiagnosisFiles(item) {
  const metadata = buildDiagnosisMetadata(item);
  const itemBank = buildItemBank(item);

  return {
    [REQUIRED_DIAGNOSIS_FILES.readme]: buildReadme(item),
    [REQUIRED_DIAGNOSIS_FILES.itemBank]: `${YAML.stringify(itemBank)}\n`,
    [REQUIRED_DIAGNOSIS_FILES.metadata]: `${YAML.stringify(metadata)}\n`,
    [REQUIRED_DIAGNOSIS_FILES.review]: buildReview(item),
    [REQUIRED_DIAGNOSIS_FILES.scoringRubric]: buildScoringRubric(item),
    [REQUIRED_DIAGNOSIS_FILES.teacherNotes]: buildTeacherNotes(item),
  };
}

function buildDiagnosisMetadata(item) {
  return {
    schema_version: "0.1.0",
    id: item.id,
    version: "0.1.0",
    status: "draft",
    resource_type: "diagnosis",
    title: item.title,
    subtitle: `围绕${item.lessonTitle}的课堂即时诊断草稿`,
    curriculum: {
      region: "上海",
      stage: "高中",
      subject: "数学",
      edition: "沪教版",
      volume_id: item.volumeId,
      volume_title: item.volumeTitle,
      chapter_id: item.chapterId,
      chapter_title: item.chapterTitle,
      section_id: item.sectionId,
      section_title: item.sectionTitle,
      lesson_id: item.lessonId,
      textbook_ref: item.textbookRef,
      lesson_title: item.lessonTitle,
    },
    pedagogy: {
      cognitive_action: item.cognitiveAction,
      estimated_classroom_minutes: 8,
      primary_teaching_problem: item.teachingPainPoints[0] ?? item.note,
      learning_goals: [
        `识别${item.lessonTitle}学习中的典型错因。`,
        `用“${item.cognitiveAction}”方式解释学生答案背后的数学理解偏差。`,
        "根据错因标签选择课堂回讲或补救练习路径。",
      ],
      prerequisites: [`${item.lessonTitle}相关先修知识`],
      successors: ["后续课时学习与综合应用"],
      core_competencies: ["逻辑推理", "数学运算", "直观想象"],
      classroom_use: "课堂末尾 6 到 8 分钟即时诊断，也可作为作业讲评前的错因分流。",
    },
    diagnosis_design: {
      diagnostic_focus: buildDiagnosticFocus(item),
      misconception_tags: [
        {
          id: "concept_expression_gap",
          title: "概念表达不完整",
          description: "学生能回忆局部结论，但不能写成完整、可推广的数学表达。",
        },
        {
          id: "representation_mixup",
          title: "表征混淆",
          description: "学生在图像、符号或语言表征之间转换时混淆对象或条件。",
        },
      ],
      item_summary: {
        total_items: 1,
        question_types: ["draft_placeholder"],
        estimated_minutes: 8,
      },
      feedback_strategy: {
        immediate_feedback: "首版 scaffold 仅提供题组结构，后续按具体错因补充即时反馈。",
        teacher_dashboard_notes: "教师端先显示诊断目标和错因标签草稿，题组定稿后再展示统计口径。",
      },
    },
    scoring: {
      mastery_threshold: 0.75,
      grading_mode: "tagged_misconception",
      retry_policy: "课堂内允许一次订正，保留首次错因标签。",
    },
    platform_card: {
      availability: "metadata_ready",
      preview_behavior: "metadata_placeholder",
      embed_strategy: "首期显示诊断目标、错因标签和文件入口；题组定稿后升级为 item_bank_ready。",
    },
    files: {
      readme: REQUIRED_DIAGNOSIS_FILES.readme,
      item_bank: REQUIRED_DIAGNOSIS_FILES.itemBank,
      scoring_rubric: REQUIRED_DIAGNOSIS_FILES.scoringRubric,
      teacher_notes: REQUIRED_DIAGNOSIS_FILES.teacherNotes,
      review_record: REQUIRED_DIAGNOSIS_FILES.review,
    },
    compliance: {
      copyright_note: "本 scaffold 仅生成原创资源骨架，不复制教材正文、官方课件、教案或商业题库。",
      review_status: "self_checked_draft",
    },
  };
}

function buildDiagnosticFocus(item) {
  const focus = [
    item.note,
    ...item.teachingPainPoints.map((painPoint) => `能否暴露并解释：${painPoint}`),
  ].filter(Boolean);

  return focus.length > 0 ? focus : [`围绕${item.lessonTitle}设计课堂即时诊断。`];
}

function buildItemBank(item) {
  return {
    schema_version: "0.1.0",
    resource_id: item.id,
    title: `${item.title}题组草稿`,
    estimated_minutes: 8,
    total_score: 0,
    mastery_threshold: 0.75,
    misconception_tags: ["concept_expression_gap", "representation_mixup"],
    items: [],
  };
}

function buildReadme(item) {
  return `# ${item.title}

资源 ID：\`${item.id}\`

对应课时：\`${item.lessonId}\`「${item.lessonTitle}」

本目录由资源 scaffold 命令生成，用于承载 ${item.lessonTitle} 的 Diagnosis 草稿。生成后应由资源生产对话补齐题组、错因标签、评分细则和教师讲评路径。

## 教学痛点

${item.teachingPainPoints.map((painPoint) => `- ${painPoint}`).join("\n")}

## 认知动作

${item.cognitiveAction}

## 资源说明

- \`metadata.yaml\`：资源身份、课时归属、诊断设计草稿和平台卡片状态。
- \`item-bank.yaml\`：题组草稿入口，当前为空题组。
- \`scoring-rubric.md\`：评分规则草稿。
- \`teacher-notes.md\`：教师使用说明草稿。
- \`review.md\`：审核记录草稿。
`;
}

function buildScoringRubric(item) {
  return `# 评分规则

资源 ID：\`${item.id}\`

## 当前状态

本文件由 scaffold 命令生成，当前只定义评分框架。题组定稿时需要补充每题分值、部分得分规则、掌握阈值说明和订正规则。

## 默认掌握阈值

- 掌握阈值：75%。
- 评分模式：按错因标签诊断。
- 订正规则：课堂内允许一次订正，保留首次错因标签。
`;
}

function buildTeacherNotes(item) {
  return `# 教师说明

资源 ID：\`${item.id}\`

## 使用时机

建议在「${item.lessonTitle}」新授课末尾 6 到 8 分钟使用，也可作为作业讲评前的错因分流。

## 讲评方向

${item.teachingPainPoints.map((painPoint) => `- ${painPoint}`).join("\n")}

## 后续补充

题组定稿时应补齐：学生作答入口、错因标签统计规则、回讲路径和补救资源链接。
`;
}

function buildReview(item) {
  return `# 审核记录

资源 ID：\`${item.id}\`

当前状态：\`draft\`

审核状态：\`self_checked_draft\`

## Scaffold 自检

- 已对齐课时 \`${item.lessonId}\`「${item.lessonTitle}」。
- 已生成 Diagnosis 必备文件。
- 当前为资源骨架，不代表题组已经完成数学审校。

## 待补充

- 题目、答案和错因标签映射。
- 数学表达和边界条件复核。
- 教研审核和课堂试用记录。
`;
}

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

function parseArgs(argv) {
  const options = {
    ids: [],
    type: null,
    limit: null,
    write: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];

    if (arg === "--write") {
      options.write = true;
    } else if (arg === "--type") {
      options.type = next;
      index += 1;
    } else if (arg === "--limit") {
      options.limit = Number.parseInt(next, 10);
      index += 1;
    } else if (arg === "--id") {
      options.ids.push(next);
      index += 1;
    } else if (arg === "--ids") {
      options.ids.push(...next.split(",").map((id) => id.trim()).filter(Boolean));
      index += 1;
    }
  }

  return options;
}

const isCli = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];

if (isCli) {
  const repoRoot = fileURLToPath(new URL("../", import.meta.url));
  const options = parseArgs(process.argv.slice(2));
  const result = await scaffoldResourcePackages({ rootDir: repoRoot, ...options });

  const mode = result.write ? "Created" : "Dry run";
  console.log(`${mode}: ${result.created.length} resource package scaffold(s).`);
  for (const item of result.created) {
    console.log(`- ${item.id} -> ${item.packagePath}`);
  }
  for (const item of result.skipped) {
    console.log(`- skipped ${item.id}: ${item.reason}`);
  }
  if (!result.write) {
    console.log("Add --write to create files.");
  }
}
