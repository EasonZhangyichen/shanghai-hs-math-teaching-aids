#!/usr/bin/env node

import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import YAML from "yaml";

const CURRICULUM_PATH = "content/curriculum/index.yaml";
const OUTPUT_PATH = "content/production/resource-backlog.json";

const RESOURCE_DIRS = {
  applet: "content/applets",
  manim_clip: "content/manim",
  diagnosis: "content/diagnosis",
};

const TYPE_SUMMARY_ORDER = ["applet", "manim_clip", "diagnosis"];

const TRACK_BY_TYPE = {
  applet: "track/trig-sample-pack",
  manim_clip: "track/manim-pipeline",
  diagnosis: "track/review-system",
};

const TYPE_LABELS = {
  applet: "Applet",
  manim_clip: "Manim Clip",
  diagnosis: "Diagnosis",
};

export async function generateResourceBacklog({ rootDir = process.cwd() } = {}) {
  const curriculum = await readYaml(path.join(rootDir, CURRICULUM_PATH));
  const curriculumEntries = indexCurriculumEntries(curriculum);
  const implementedResources = await loadImplementedResources(rootDir);
  const items = curriculumEntries.map((record) =>
    buildBacklogItem({
      record,
      implementedResource: implementedResources.get(record.entry.proposed_resource_id),
      mvpLessonIds: new Set((curriculum.mvp?.focus_lessons ?? []).map((lesson) => lesson.id)),
    }),
  );

  return {
    schemaVersion: "0.1.0",
    source: {
      curriculum: CURRICULUM_PATH,
      implementedResourceRoots: RESOURCE_DIRS,
    },
    purpose: "把课程图谱中的 digital_entry_points 转换成可分派、可验证、可跨对话推进的资源生产 backlog。",
    workflow: {
      sourceOfTruth: "content/curriculum/index.yaml",
      unitOfWork: "一个 backlog item 对应一个可独立推进的资源包或审核任务。",
      updateRule: "新增或修改资源包后运行 npm run generate:backlog 与 npm run verify。",
    },
    summary: summarizeItems(items),
    items,
  };
}

export async function writeResourceBacklog({
  rootDir = process.cwd(),
  outputPath = path.join(rootDir, OUTPUT_PATH),
} = {}) {
  const backlog = await generateResourceBacklog({ rootDir });
  const absoluteOutputPath = path.isAbsolute(outputPath) ? outputPath : path.join(rootDir, outputPath);

  await mkdir(path.dirname(absoluteOutputPath), { recursive: true });
  await writeFile(absoluteOutputPath, `${JSON.stringify(backlog, null, 2)}\n`, "utf8");

  return absoluteOutputPath;
}

function indexCurriculumEntries(curriculum) {
  const records = [];

  for (const volume of ensureArray(curriculum.volumes)) {
    for (const chapter of ensureArray(volume.chapters)) {
      const sectionByLessonId = new Map();
      for (const section of ensureArray(chapter.sections)) {
        for (const lessonId of ensureArray(section.lesson_ids)) {
          sectionByLessonId.set(lessonId, section);
        }
      }

      const priorityByLessonId = new Map();
      for (const priority of ensureArray(chapter.chapter_resource_priorities)) {
        priorityByLessonId.set(priority.lesson_id, priority);
      }

      for (const lesson of ensureArray(chapter.lessons)) {
        const section = sectionByLessonId.get(lesson.id) ?? null;
        const lessonPriority = priorityByLessonId.get(lesson.id) ?? null;

        ensureArray(lesson.digital_entry_points).forEach((entry, entryIndex) => {
          records.push({
            entry,
            entryIndex,
            volume,
            chapter,
            section,
            lesson,
            lessonPriority,
          });
        });
      }
    }
  }

  return records;
}

async function loadImplementedResources(rootDir) {
  const resources = new Map();

  for (const [resourceType, relativeDir] of Object.entries(RESOURCE_DIRS)) {
    const root = path.join(rootDir, relativeDir);
    let entries = [];

    try {
      entries = await readdir(root, { withFileTypes: true });
    } catch (error) {
      if (error.code === "ENOENT") {
        continue;
      }
      throw error;
    }

    for (const entry of entries.filter((item) => item.isDirectory())) {
      const packageDir = path.join(root, entry.name);
      const metadataPath = path.join(packageDir, "metadata.yaml");
      let metadata;

      try {
        metadata = await readYaml(metadataPath);
      } catch (error) {
        if (error.code === "ENOENT") {
          continue;
        }
        throw error;
      }

      resources.set(metadata.id, {
        id: metadata.id,
        type: metadata.resource_type ?? resourceType,
        status: metadata.status ?? "draft",
        version: metadata.version ?? null,
        title: metadata.title ?? entry.name,
        availability: metadata.platform_card?.availability ?? "metadata_ready",
        packagePath: toRepoPath(rootDir, packageDir),
        metadataPath: toRepoPath(rootDir, metadataPath),
      });
    }
  }

  return resources;
}

function buildBacklogItem({ record, implementedResource, mvpLessonIds }) {
  const { entry, volume, chapter, section, lesson, lessonPriority } = record;
  const resourceId = entry.proposed_resource_id;
  const isImplemented = Boolean(implementedResource);
  const priority = mvpLessonIds.has(lesson.id)
    ? "mvp"
    : lessonPriority?.priority ?? "chapter_backlog";
  const recommendedTrack = TRACK_BY_TYPE[entry.type] ?? "develop";

  return {
    id: resourceId,
    type: entry.type,
    status: isImplemented ? "implemented" : "planned",
    availability: implementedResource?.availability ?? "planned",
    title: implementedResource?.title ?? entry.title,
    proposedTitle: entry.title,
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    textbookRef: lesson.textbook_ref,
    volumeId: volume.id,
    volumeTitle: volume.title,
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    sectionId: section?.id ?? null,
    sectionTitle: section?.title ?? null,
    cognitiveAction: entry.cognitive_action,
    teachingPainPoints: ensureArray(lesson.teaching_pain_points),
    note: entry.note,
    priority,
    priorityReason: mvpLessonIds.has(lesson.id)
      ? "MVP focus lesson"
      : lessonPriority?.reason ?? null,
    packagePath: implementedResource?.packagePath ?? null,
    metadataPath: implementedResource?.metadataPath ?? null,
    recommendedTrack,
    nextAction: buildNextAction({ type: entry.type, isImplemented, availability: implementedResource?.availability }),
    threadPrompt: buildThreadPrompt({ resourceId, type: entry.type, lesson, recommendedTrack, isImplemented }),
  };
}

function buildNextAction({ type, isImplemented, availability }) {
  if (isImplemented && type === "applet") {
    return "完成数学边界复核、课堂节奏试读和浏览器交互验证，再决定是否进入 math_review。";
  }

  if (isImplemented && type === "manim_clip" && availability === "video_ready") {
    return "完成数学审校、分镜节奏复核和课堂播放口径确认，再决定是否进入 math_review。";
  }

  if (isImplemented) {
    return "核对 metadata、资源文件和审核记录，补齐缺口后运行内容校验。";
  }

  if (type === "applet") {
    return "创建 Applet 资源包，先写 metadata、教师脚本、学生任务和 review，再实现最小可运行 HTML 原型。";
  }

  if (type === "manim_clip") {
    return "创建 Manim 资源包，先写 metadata、storyboard、scene.py 和 review，再渲染 mp4/webm/poster。";
  }

  if (type === "diagnosis") {
    return "创建 Diagnosis 资源包，先写 metadata、item-bank、scoring-rubric、teacher-notes 和 review。";
  }

  return "根据资源类型创建资源包并补齐 metadata、教学脚本、审核记录和校验。";
}

function buildThreadPrompt({ resourceId, type, lesson, recommendedTrack, isImplemented }) {
  const typeLabel = TYPE_LABELS[type] ?? type;
  const action = isImplemented ? "复核并推进" : "创建并推进";

  return `请先读取项目锚点文件和 content/production/resource-backlog.json，然后切到 ${recommendedTrack}。这次只${action} ${resourceId}（${typeLabel}），对应课时 ${lesson.id}「${lesson.title}」。先确认教学痛点、认知动作、文件规范和验收标准，再动手；完成后运行 npm run generate:backlog 和 npm run verify，更新 docs/01-current-state.md 与 docs/02-next-actions.md，并提交。`;
}

function summarizeItems(items) {
  const implemented = items.filter((item) => item.status === "implemented").length;
  const total = items.length;

  return {
    total,
    implemented,
    planned: total - implemented,
    byType: Object.fromEntries(
      TYPE_SUMMARY_ORDER.map((type) => {
        const typeItems = items.filter((item) => item.type === type);
        const typeImplemented = typeItems.filter((item) => item.status === "implemented").length;

        return [
          type,
          {
            total: typeItems.length,
            implemented: typeImplemented,
            planned: typeItems.length - typeImplemented,
          },
        ];
      }),
    ),
  };
}

async function readYaml(filePath) {
  return YAML.parse(await readFile(filePath, "utf8"));
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

function toRepoPath(rootDir, absolutePath) {
  return path.relative(rootDir, absolutePath).split(path.sep).join("/");
}

const isCli = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];

if (isCli) {
  const repoRoot = fileURLToPath(new URL("../", import.meta.url));
  const outputPath = await writeResourceBacklog({ rootDir: repoRoot });
  const backlog = JSON.parse(await readFile(outputPath, "utf8"));

  console.log(
    `Generated ${toRepoPath(repoRoot, outputPath)} with ${backlog.summary.total} resource work items (${backlog.summary.implemented} implemented, ${backlog.summary.planned} planned).`,
  );
}
