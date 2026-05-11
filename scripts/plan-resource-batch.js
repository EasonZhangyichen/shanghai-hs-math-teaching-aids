#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import YAML from "yaml";

const BACKLOG_PATH = "content/production/resource-backlog.json";
const CURRICULUM_PATH = "content/curriculum/index.yaml";

const DEFAULT_PRODUCTION_LIMIT = 3;
const DEFAULT_REVIEW_LIMIT = 3;
const DEFAULT_SOURCE_CHECK_LIMIT = 6;
const DEFAULT_HOLD_LIMIT = 6;

const PRIORITY_WEIGHT = new Map([
  ["mvp", 0],
  ["chapter_backlog", 1],
  ["follow_up", 2],
  ["follow_up_optional", 3],
]);

const TYPE_WEIGHT = new Map([
  ["applet", 0],
  ["manim_clip", 1],
  ["diagnosis", 2],
]);

export async function planResourceBatch({
  rootDir = process.cwd(),
  backlog = null,
  curriculum = null,
  metadataById = null,
  productionLimit = DEFAULT_PRODUCTION_LIMIT,
  reviewLimit = DEFAULT_REVIEW_LIMIT,
  sourceCheckLimit = DEFAULT_SOURCE_CHECK_LIMIT,
  holdLimit = DEFAULT_HOLD_LIMIT,
} = {}) {
  const resolvedBacklog = backlog ?? (await readJson(path.join(rootDir, BACKLOG_PATH)));
  const resolvedCurriculum = curriculum ?? (await readYaml(path.join(rootDir, CURRICULUM_PATH)));
  const curriculumIndex = indexCurriculumSource(resolvedCurriculum);
  const resolvedMetadataById = metadataById ?? (await loadResourceMetadata(rootDir, resolvedBacklog.items ?? []));

  const productionCandidates = [];
  const reviewCandidates = [];
  const sourceCheckCandidates = [];
  const holdCandidates = [];

  for (const item of resolvedBacklog.items ?? []) {
    const plannedItem = analyzeBacklogItem({
      item,
      curriculumIndex,
      metadata: resolvedMetadataById.get(item.id) ?? null,
    });

    if (plannedItem.bucket === "production") {
      productionCandidates.push(plannedItem);
    } else if (plannedItem.bucket === "review") {
      reviewCandidates.push(plannedItem);
    } else if (plannedItem.bucket === "source_check") {
      sourceCheckCandidates.push(plannedItem);
    } else {
      holdCandidates.push(plannedItem);
    }
  }

  productionCandidates.sort(compareProductionCandidates);
  reviewCandidates.sort(compareReviewCandidates);
  sourceCheckCandidates.sort(compareQueueCandidates);
  holdCandidates.sort(compareQueueCandidates);

  return {
    dryRun: true,
    source: {
      backlog: BACKLOG_PATH,
      curriculum: CURRICULUM_PATH,
    },
    limits: {
      production: productionLimit,
      review: reviewLimit,
      sourceCheck: sourceCheckLimit,
      hold: holdLimit,
    },
    summary: {
      totalItems: resolvedBacklog.items?.length ?? 0,
      productionCandidates: productionCandidates.length,
      reviewCandidates: reviewCandidates.length,
      sourceCheckOnly: sourceCheckCandidates.length,
      held: holdCandidates.length,
      recommendedProduction: Math.min(productionLimit, productionCandidates.length),
      recommendedReview: Math.min(reviewLimit, reviewCandidates.length),
    },
    productionLine: productionCandidates.slice(0, productionLimit),
    reviewLine: reviewCandidates.slice(0, reviewLimit),
    sourceCheckQueue: sourceCheckCandidates.slice(0, sourceCheckLimit),
    holdQueue: holdCandidates.slice(0, holdLimit),
    guardrails: [
      "本报告只读生成，不写入 backlog、课程图谱或资源包。",
      "blocked planned item 与未终核 planned item 只进入来源终核队列。",
      "8.3 边界待确认项保持暂缓，不进入 scaffold 或完整制作建议。",
      "纸笔、普通板书或静态讲解更合适的内容保持低优先级或暂不数字化。",
    ],
  };
}

function analyzeBacklogItem({ item, curriculumIndex, metadata }) {
  const source = getSourceCredibility({ item, curriculumIndex });
  const digitalNecessity = assessDigitalNecessity(item);
  const isEightThreeBoundary = isB2C08EightThreeItem(item);

  if (isEightThreeBoundary) {
    return buildPlanItem({
      item,
      source,
      digitalNecessity,
      bucket: "hold",
      suggestedAction: "hold_8_3_boundary",
      maxSuggestedState: null,
      reason: "8.3 课时边界仍待纸质教材或已登录 dolearning 终核，不进入 scaffold 或完整制作建议。",
      guardrails: ["等待 8.3 三课时/四小节边界终核。"],
    });
  }

  if (digitalNecessity.level === "low") {
    return buildPlanItem({
      item,
      source,
      digitalNecessity,
      bucket: "hold",
      suggestedAction: "hold_low_digital_necessity",
      maxSuggestedState: null,
      reason: digitalNecessity.reason,
      guardrails: ["先保留为教师脚本、纸笔任务或普通诊断，不进入数字资源制作。"],
    });
  }

  if (item.status === "planned") {
    if (item.scaffoldPolicy !== "ready_for_resource_work") {
      return buildPlanItem({
        item,
        source,
        digitalNecessity,
        bucket: "source_check",
        suggestedAction: "source_check_only",
        maxSuggestedState: "source_verified_before_scaffold",
        reason: `scaffoldPolicy=${item.scaffoldPolicy ?? "missing"}，只允许先做来源终核。`,
        guardrails: ["不创建资源包", "不 scaffold", "不渲染"],
      });
    }

    if (source.blocksPlannedProduction) {
      return buildPlanItem({
        item,
        source,
        digitalNecessity,
        bucket: "source_check",
        suggestedAction: "source_check_only",
        maxSuggestedState: "source_verified_before_scaffold",
        reason: source.reason,
        guardrails: ["先终核课时边界和数字化必要性，再由总控决定是否恢复生产。"],
      });
    }

    return buildPlanItem({
      item,
      source,
      digitalNecessity,
      bucket: "production",
      suggestedAction: "dry_run_scaffold_candidate",
      maxSuggestedState: "draft",
      reason: "来源与 scaffoldPolicy 已满足进入 dry-run scaffold 候选的最低条件。",
      guardrails: ["仍需先 dry-run 清单，不直接写资源包。"],
    });
  }

  if (item.status === "implemented" && isExistingScaffold(item, metadata)) {
    return buildPlanItem({
      item,
      source,
      digitalNecessity,
      bucket: "production",
      suggestedAction: "refine_existing_scaffold",
      maxSuggestedState: "self_checked_draft",
      reason: "资源包已存在但仍是骨架或 metadata_ready 状态，适合小步精修，不建议直接进入完整发布前状态。",
      guardrails: ["只精修已存在资源包", "保留来源未终核风险", "不处理 8.3 暂缓项"],
    });
  }

  if (item.status === "implemented") {
    return buildPlanItem({
      item,
      source,
      digitalNecessity,
      bucket: "review",
      suggestedAction: "review_existing_resource",
      maxSuggestedState: "math_review_or_browser_review",
      reason: "资源已落地，下一步更适合做数学审校、课堂试读或浏览器复核。",
      guardrails: ["只给状态建议", "不把资源改成最终发布状态"],
    });
  }

  return buildPlanItem({
    item,
    source,
    digitalNecessity,
    bucket: "hold",
    suggestedAction: "hold_unknown_status",
    maxSuggestedState: null,
    reason: `未知资源状态：${item.status ?? "missing"}。`,
    guardrails: ["先由总控确认 backlog 状态字段。"],
  });
}

function buildPlanItem({
  item,
  source,
  digitalNecessity,
  bucket,
  suggestedAction,
  maxSuggestedState,
  reason,
  guardrails,
}) {
  return {
    id: item.id,
    type: item.type,
    title: item.title ?? item.proposedTitle ?? item.id,
    status: item.status,
    availability: item.availability,
    lessonId: item.lessonId,
    lessonTitle: item.lessonTitle,
    textbookRef: item.textbookRef,
    chapterId: item.chapterId,
    chapterTitle: item.chapterTitle,
    priority: item.priority,
    scaffoldPolicy: item.scaffoldPolicy,
    bucket,
    suggestedAction,
    maxSuggestedState,
    reason,
    sourceCredibility: source,
    digitalNecessity,
    guardrails,
    threadPrompt: item.threadPrompt ?? null,
  };
}

function getSourceCredibility({ item, curriculumIndex }) {
  const chapterSource = curriculumIndex.chapterById.get(item.chapterId) ?? {
    confidence: "unknown",
    textbookOutlineStatus: null,
    needsManualTextbookCheck: true,
    periodStatus: null,
    sourceAudit: null,
    notes: null,
  };
  const lessonSource = curriculumIndex.lessonById.get(item.lessonId) ?? {
    status: null,
    periodStatus: null,
  };
  const lessonNeedsManual = /needs_manual|未终核|终核|draft/i.test(
    [lessonSource.status, lessonSource.periodStatus].filter(Boolean).join("\n"),
  );
  const blocksPlannedProduction = Boolean(chapterSource.needsManualTextbookCheck || lessonNeedsManual);

  return {
    confidence: chapterSource.confidence,
    textbookOutlineStatus: chapterSource.textbookOutlineStatus,
    needsManualTextbookCheck: chapterSource.needsManualTextbookCheck,
    periodStatus: chapterSource.periodStatus,
    lessonSourceStatus: lessonSource.status,
    lessonPeriodStatus: lessonSource.periodStatus,
    sourceAudit: chapterSource.sourceAudit,
    blocksPlannedProduction,
    reason: blocksPlannedProduction
      ? "章节或课时仍需纸质教材、教师用书或已登录平台终核，planned item 不进入 scaffold 或完整制作建议。"
      : "章节来源已满足 planned item 进入 dry-run 候选的最低条件。",
  };
}

function indexCurriculumSource(curriculum) {
  const chapterById = new Map();
  const lessonById = new Map();

  for (const volume of ensureArray(curriculum?.volumes)) {
    for (const chapter of ensureArray(volume.chapters)) {
      const verification = chapter.verification ?? {};
      const periodStatus = verification.period_status ?? null;
      const needsManualTextbookCheck = Boolean(verification.needs_manual_textbook_check);
      const confidence = needsManualTextbookCheck
        ? periodStatus === "8.3_boundary_pending_manual_check"
          ? "boundary_pending"
          : "needs_manual_check"
        : "verified";

      chapterById.set(chapter.id, {
        confidence,
        textbookOutlineStatus: verification.textbook_outline_status ?? null,
        needsManualTextbookCheck,
        periodStatus,
        sourceAudit: verification.source_audit ?? null,
        notes: verification.notes ?? null,
      });

      for (const lesson of ensureArray(chapter.lessons)) {
        lessonById.set(lesson.id, {
          status: lesson.source_status ?? null,
          periodStatus: lesson.period_status ?? null,
        });
      }
    }
  }

  return { chapterById, lessonById };
}

function assessDigitalNecessity(item) {
  const text = [item.note, item.priorityReason, item.title, item.proposedTitle]
    .filter(Boolean)
    .join("\n");

  if (/暂不数字化|纸笔.*更合适|普通板书.*更合适|静态.*足够|合并或取消|低优先级|降级为/.test(text)) {
    return {
      level: "low",
      reason: "该候选文本显示普通板书、纸笔任务、静态讲解或合并取消更合适，暂不进入数字化生产。",
    };
  }

  if (item.priority === "follow_up_optional" || /选学|\*9\.4/.test(text)) {
    return {
      level: "optional",
      reason: "数字化可能有价值，但属于选学或后续可选项，应低于核心生产和审核候选。",
    };
  }

  if (/动态|拖动|拖拽|联动|多表征|即时反馈|错因|诊断|动画|连续|逼近|几何|参数|可视化|投影|模拟|对称|变换/.test(text)) {
    return {
      level: "strong",
      reason: "文本包含动态变化、多表征联动、几何直观、错因诊断或动画叙事价值。",
    };
  }

  return {
    level: "moderate",
    reason: "文本未显示明显低必要性，但生产前仍需总控复核数字化价值。",
  };
}

function isB2C08EightThreeItem(item) {
  if (item.chapterId !== "SH-HS-MATH-HJ-B2-C08") {
    return false;
  }

  return /^8\.3(?:\.|$)/.test(String(item.textbookRef ?? "")) || /C08-L0[6-9]-/.test(item.id ?? "");
}

function isExistingScaffold(item, metadata) {
  if (!metadata) {
    return item.availability === "metadata_ready" && item.chapterId === "SH-HS-MATH-HJ-B2-C08";
  }

  if (item.type === "applet") {
    return (
      metadata.implementation?.html_src_status === "scaffolded" ||
      metadata.implementation?.phase === "content_spec_only"
    );
  }

  if (item.type === "manim_clip") {
    return metadata.render_plan?.phase === "scene_draft";
  }

  if (item.type === "diagnosis") {
    return (metadata.platform_card?.availability ?? item.availability) === "metadata_ready";
  }

  return false;
}

function compareProductionCandidates(left, right) {
  const actionWeight = new Map([
    ["refine_existing_scaffold", 0],
    ["dry_run_scaffold_candidate", 1],
  ]);

  return (
    weight(actionWeight, left.suggestedAction) - weight(actionWeight, right.suggestedAction) ||
    weight(PRIORITY_WEIGHT, left.priority) - weight(PRIORITY_WEIGHT, right.priority) ||
    weight(TYPE_WEIGHT, left.type) - weight(TYPE_WEIGHT, right.type) ||
    left.id.localeCompare(right.id)
  );
}

function compareReviewCandidates(left, right) {
  return (
    weight(PRIORITY_WEIGHT, left.priority) - weight(PRIORITY_WEIGHT, right.priority) ||
    reviewReadinessWeight(left) - reviewReadinessWeight(right) ||
    weight(TYPE_WEIGHT, left.type) - weight(TYPE_WEIGHT, right.type) ||
    left.id.localeCompare(right.id)
  );
}

function compareQueueCandidates(left, right) {
  return (
    weight(PRIORITY_WEIGHT, left.priority) - weight(PRIORITY_WEIGHT, right.priority) ||
    weight(TYPE_WEIGHT, left.type) - weight(TYPE_WEIGHT, right.type) ||
    left.id.localeCompare(right.id)
  );
}

function reviewReadinessWeight(item) {
  if (item.availability === "video_ready" || item.availability === "item_bank_ready") {
    return 0;
  }

  return 1;
}

function weight(weightMap, value) {
  return weightMap.get(value) ?? 99;
}

async function loadResourceMetadata(rootDir, items) {
  const metadataById = new Map();

  for (const item of items) {
    if (!item.metadataPath) {
      continue;
    }

    try {
      metadataById.set(item.id, await readYaml(path.join(rootDir, item.metadataPath)));
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }
  }

  return metadataById;
}

export function formatBatchPlanMarkdown(plan) {
  return [
    "# 资源工厂批次规划 dry-run",
    "",
    "本报告只读生成，用于总控选择下一轮生产线/审核线候选；不会写入 backlog、课程图谱或资源包。",
    "",
    "## 摘要",
    "",
    `- backlog item 总数：${plan.summary.totalItems}`,
    `- 生产线候选：${plan.summary.productionCandidates}，本次建议 ${plan.summary.recommendedProduction} 个`,
    `- 审核线候选：${plan.summary.reviewCandidates}，本次建议 ${plan.summary.recommendedReview} 个`,
    `- 仅来源终核：${plan.summary.sourceCheckOnly}`,
    `- 暂缓/低优先级：${plan.summary.held}`,
    "",
    formatSection("## 生产线候选", plan.productionLine),
    "",
    formatSection("## 审核线候选", plan.reviewLine),
    "",
    formatSection("## 来源终核队列", plan.sourceCheckQueue),
    "",
    formatSection("## 暂缓与低优先级", plan.holdQueue),
    "",
    "## 守则",
    "",
    ...plan.guardrails.map((guardrail) => `- ${guardrail}`),
    "",
  ].join("\n");
}

function formatSection(title, items) {
  if (items.length === 0) {
    return `${title}\n\n暂无候选。`;
  }

  return [
    title,
    "",
    ...items.map((item, index) =>
      [
        `${index + 1}. \`${item.id}\` ${item.title}`,
        `   - 类型/状态：${item.type} / ${item.status} / ${item.availability ?? "unknown"}`,
        `   - 章节课时：${item.chapterTitle ?? item.chapterId} / ${item.lessonTitle ?? item.lessonId}`,
        `   - 建议动作：${item.suggestedAction}`,
        `   - 最高建议状态：${item.maxSuggestedState ?? "不建议推进状态"}`,
        `   - 来源可信度：${item.sourceCredibility.confidence}`,
        `   - 数字化必要性：${item.digitalNecessity.level}，${item.digitalNecessity.reason}`,
        `   - 原因：${item.reason}`,
        `   - 边界：${item.guardrails.join("；")}`,
      ].join("\n"),
    ),
  ].join("\n");
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function readYaml(filePath) {
  return YAML.parse(await readFile(filePath, "utf8"));
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

function parseCliArgs(argv) {
  const options = {
    productionLimit: DEFAULT_PRODUCTION_LIMIT,
    reviewLimit: DEFAULT_REVIEW_LIMIT,
    sourceCheckLimit: DEFAULT_SOURCE_CHECK_LIMIT,
    holdLimit: DEFAULT_HOLD_LIMIT,
    json: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];

    if (arg === "--json") {
      options.json = true;
    } else if (arg === "--production-limit") {
      options.productionLimit = parsePositiveInteger(next, arg);
      index += 1;
    } else if (arg === "--review-limit") {
      options.reviewLimit = parsePositiveInteger(next, arg);
      index += 1;
    } else if (arg === "--source-check-limit") {
      options.sourceCheckLimit = parsePositiveInteger(next, arg);
      index += 1;
    } else if (arg === "--hold-limit") {
      options.holdLimit = parsePositiveInteger(next, arg);
      index += 1;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return options;
}

function parsePositiveInteger(value, flag) {
  const parsed = Number.parseInt(value, 10);

  if (!Number.isInteger(parsed) || parsed < 0) {
    throw new Error(`${flag} expects a non-negative integer`);
  }

  return parsed;
}

const isCli = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];

if (isCli) {
  const repoRoot = fileURLToPath(new URL("../", import.meta.url));
  const { json, ...options } = parseCliArgs(process.argv.slice(2));
  const plan = await planResourceBatch({ rootDir: repoRoot, ...options });

  if (json) {
    console.log(JSON.stringify(plan, null, 2));
  } else {
    console.log(formatBatchPlanMarkdown(plan));
  }
}
