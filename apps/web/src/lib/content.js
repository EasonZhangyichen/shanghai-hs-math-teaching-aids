import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

import YAML from "yaml";

const CURRICULUM_PATH = "content/curriculum/index.yaml";
const APPLETS_DIR = "content/applets";
const MANIM_DIR = "content/manim";
const DIAGNOSIS_DIR = "content/diagnosis";

export async function loadTeacherWorkspace({ rootDir = process.cwd() } = {}) {
  const curriculum = await readYaml(path.join(rootDir, CURRICULUM_PATH));
  const appletPackages = await loadAppletPackages(rootDir);
  const manimPackages = await loadManimPackages(rootDir);
  const diagnosisPackages = await loadDiagnosisPackages(rootDir);
  const resourcePackages = [...appletPackages, ...manimPackages, ...diagnosisPackages];
  const resourcesById = new Map(resourcePackages.map((resource) => [resource.id, resource]));
  const resourcesByLesson = groupBy(resourcePackages, (resource) => resource.lessonId);

  const lessonsById = {};
  const lessons = [];
  let chapterCount = 0;

  const volumes = ensureArray(curriculum.volumes).map((volume) => {
    const chapters = ensureArray(volume.chapters).map((chapter) => {
      chapterCount += 1;
      const chapterLessons = new Map(ensureArray(chapter.lessons).map((lesson) => [lesson.id, lesson]));

      const sections = ensureArray(chapter.sections).map((section) => {
        const sectionLessons = ensureArray(section.lesson_ids)
          .map((lessonId) => chapterLessons.get(lessonId))
          .filter(Boolean)
          .map((lesson) => {
            const teacherLesson = buildLesson({
              lesson,
              volume,
              chapter,
              section,
              resourcesById,
              resourcesByLesson,
            });
            lessonsById[teacherLesson.id] = teacherLesson;
            lessons.push(teacherLesson);
            return {
              id: teacherLesson.id,
              textbookRef: teacherLesson.textbookRef,
              title: teacherLesson.title,
              status: teacherLesson.status,
              resourceCount: teacherLesson.resources.length,
              hasImplementedApplet: teacherLesson.resources.some(
                isImplementedResource,
              ),
            };
          });

        return {
          id: section.id,
          textbookLabel: section.textbook_label,
          title: section.title,
          lessons: sectionLessons,
        };
      });

      return {
        id: chapter.id,
        number: chapter.number,
        title: chapter.title,
        status: chapter.status,
        verification: chapter.verification,
        chapterRole: chapter.chapter_role,
        sections,
        lessonCount: ensureArray(chapter.lessons).length,
      };
    });

    return {
      id: volume.id,
      title: volume.title,
      status: volume.status,
      coreStrands: ensureArray(volume.core_strands),
      chapters,
    };
  });

  const implementedAppletCount = appletPackages.length;
  const implementedManimCount = manimPackages.length;
  const implementedDiagnosisCount = diagnosisPackages.length;
  const resourceIndex = buildResourceIndex(lessons);
  const resourceFacets = buildResourceFacets(resourceIndex);
  const plannedResourceCount = lessons
    .flatMap((lesson) => lesson.resources)
    .filter((resource) => resource.availability === "proposed").length;

  return {
    sources: {
      curriculum: CURRICULUM_PATH,
      applets: appletPackages.map((resource) => resource.package.path),
      manim: manimPackages.map((resource) => resource.package.path),
      diagnosis: diagnosisPackages.map((resource) => resource.package.path),
    },
    project: curriculum.project,
    tree: { volumes },
    lessons,
    lessonsById,
    resourceIndex,
    resourceFacets,
    mvp: curriculum.mvp,
    resourceTypes: curriculum.resource_types,
    summary: {
      volumeCount: volumes.length,
      chapterCount,
      lessonCount: lessons.length,
      implementedAppletCount,
      implementedManimCount,
      implementedDiagnosisCount,
      plannedResourceCount,
    },
  };
}

function isImplementedResource(resource) {
  return ["metadata_ready", "video_ready", "item_bank_ready", "interactive_ready"].includes(resource?.availability);
}

async function loadAppletPackages(rootDir) {
  const appletsRoot = path.join(rootDir, APPLETS_DIR);

  if (!(await exists(appletsRoot))) {
    return [];
  }

  const entries = await readdir(appletsRoot, { withFileTypes: true });
  const directories = entries.filter((entry) => entry.isDirectory());

  const packages = await Promise.all(
    directories.map(async (entry) => {
      const packageDir = path.join(appletsRoot, entry.name);
      const metadataPath = path.join(packageDir, "metadata.yaml");

      if (!(await exists(metadataPath))) {
        return null;
      }

      const metadata = await readYaml(metadataPath);
      const packagePath = toRepoPath(rootDir, packageDir);
      const teacherScript = await readMarkdownEntry({
        rootDir,
        filePath: path.join(packageDir, metadata.files?.teacher_script ?? "teacher-script.md"),
        kind: "teacher_script",
      });
      const studentTask = await readMarkdownEntry({
        rootDir,
        filePath: path.join(packageDir, metadata.files?.student_task ?? "student-task.md"),
        kind: "student_task",
      });

      return {
        id: metadata.id,
        lessonId: metadata.curriculum?.lesson_id,
        resourceType: metadata.resource_type,
        title: metadata.title,
        subtitle: metadata.subtitle,
        status: metadata.status,
        version: metadata.version,
        metadata,
        package: {
          path: packagePath,
          files: {
            metadata: toRepoPath(rootDir, metadataPath),
            readme: toRepoPath(rootDir, path.join(packageDir, metadata.files?.readme ?? "README.md")),
            teacherScript: teacherScript?.path ?? null,
            studentTask: studentTask?.path ?? null,
            reviewRecord: toRepoPath(rootDir, path.join(packageDir, metadata.files?.review_record ?? "review.md")),
            srcEntry: metadata.files?.src_entry ? toRepoPath(rootDir, path.join(packageDir, metadata.files.src_entry)) : null,
          },
          teacherScript,
          studentTask,
        },
      };
    }),
  );

  return packages.filter(Boolean).sort((left, right) => left.id.localeCompare(right.id));
}

async function loadManimPackages(rootDir) {
  const manimRoot = path.join(rootDir, MANIM_DIR);

  if (!(await exists(manimRoot))) {
    return [];
  }

  const entries = await readdir(manimRoot, { withFileTypes: true });
  const directories = entries.filter((entry) => entry.isDirectory());

  const packages = await Promise.all(
    directories.map(async (entry) => {
      const packageDir = path.join(manimRoot, entry.name);
      const metadataPath = path.join(packageDir, "metadata.yaml");

      if (!(await exists(metadataPath))) {
        return null;
      }

      const metadata = await readYaml(metadataPath);
      const packagePath = toRepoPath(rootDir, packageDir);
      const storyboard = await readMarkdownEntry({
        rootDir,
        filePath: path.join(packageDir, metadata.files?.storyboard ?? "storyboard.md"),
        kind: "storyboard",
      });
      const outputMp4 = metadata.files?.output_mp4
        ? path.join(packageDir, metadata.files.output_mp4)
        : null;
      const outputWebm = metadata.files?.output_webm
        ? path.join(packageDir, metadata.files.output_webm)
        : null;
      const poster = metadata.files?.poster ? path.join(packageDir, metadata.files.poster) : null;

      return {
        id: metadata.id,
        lessonId: metadata.curriculum?.lesson_id,
        resourceType: metadata.resource_type,
        title: metadata.title,
        subtitle: metadata.subtitle,
        status: metadata.status,
        version: metadata.version,
        metadata,
        package: {
          path: packagePath,
          files: {
            metadata: toRepoPath(rootDir, metadataPath),
            readme: toRepoPath(rootDir, path.join(packageDir, metadata.files?.readme ?? "README.md")),
            storyboard: storyboard?.path ?? null,
            scene: toRepoPath(rootDir, path.join(packageDir, metadata.files?.scene ?? "scene.py")),
            reviewRecord: toRepoPath(rootDir, path.join(packageDir, metadata.files?.review_record ?? "review.md")),
            outputMp4: outputMp4 ? toRepoPath(rootDir, outputMp4) : null,
            outputWebm: outputWebm ? toRepoPath(rootDir, outputWebm) : null,
            poster: poster ? toRepoPath(rootDir, poster) : null,
          },
          media: {
            hasOutputMp4: outputMp4 ? await exists(outputMp4) : false,
            hasOutputWebm: outputWebm ? await exists(outputWebm) : false,
            hasPoster: poster ? await exists(poster) : false,
          },
          storyboard,
        },
      };
    }),
  );

  return packages.filter(Boolean).sort((left, right) => left.id.localeCompare(right.id));
}

async function loadDiagnosisPackages(rootDir) {
  const diagnosisRoot = path.join(rootDir, DIAGNOSIS_DIR);

  if (!(await exists(diagnosisRoot))) {
    return [];
  }

  const entries = await readdir(diagnosisRoot, { withFileTypes: true });
  const directories = entries.filter((entry) => entry.isDirectory());

  const packages = await Promise.all(
    directories.map(async (entry) => {
      const packageDir = path.join(diagnosisRoot, entry.name);
      const metadataPath = path.join(packageDir, "metadata.yaml");

      if (!(await exists(metadataPath))) {
        return null;
      }

      const metadata = await readYaml(metadataPath);
      const packagePath = toRepoPath(rootDir, packageDir);
      const itemBankPath = path.join(packageDir, metadata.files?.item_bank ?? "item-bank.yaml");
      const itemBank = (await exists(itemBankPath)) ? await readYaml(itemBankPath) : null;
      const teacherNotes = await readMarkdownEntry({
        rootDir,
        filePath: path.join(packageDir, metadata.files?.teacher_notes ?? "teacher-notes.md"),
        kind: "teacher_notes",
      });
      const scoringRubric = await readMarkdownEntry({
        rootDir,
        filePath: path.join(packageDir, metadata.files?.scoring_rubric ?? "scoring-rubric.md"),
        kind: "scoring_rubric",
      });

      return {
        id: metadata.id,
        lessonId: metadata.curriculum?.lesson_id,
        resourceType: metadata.resource_type,
        title: metadata.title,
        subtitle: metadata.subtitle,
        status: metadata.status,
        version: metadata.version,
        metadata,
        package: {
          path: packagePath,
          files: {
            metadata: toRepoPath(rootDir, metadataPath),
            readme: toRepoPath(rootDir, path.join(packageDir, metadata.files?.readme ?? "README.md")),
            itemBank: toRepoPath(rootDir, itemBankPath),
            scoringRubric: scoringRubric?.path ?? null,
            teacherNotes: teacherNotes?.path ?? null,
            reviewRecord: toRepoPath(rootDir, path.join(packageDir, metadata.files?.review_record ?? "review.md")),
          },
          itemBank: itemBank
            ? {
                title: itemBank.title,
                itemCount: ensureArray(itemBank.items).length,
                totalScore: itemBank.total_score ?? 0,
                estimatedMinutes: itemBank.estimated_minutes ?? metadata.pedagogy?.estimated_classroom_minutes ?? null,
                misconceptionTags: ensureArray(itemBank.misconception_tags),
              }
            : null,
          teacherNotes,
          scoringRubric,
        },
      };
    }),
  );

  return packages.filter(Boolean).sort((left, right) => left.id.localeCompare(right.id));
}

function buildLesson({ lesson, volume, chapter, section, resourcesById, resourcesByLesson }) {
  const resources = buildResourceCards({
    lesson,
    resourcesById,
    lessonPackages: resourcesByLesson.get(lesson.id) ?? [],
  });

  return {
    id: lesson.id,
    textbookRef: lesson.textbook_ref,
    title: lesson.title,
    status: lesson.status,
    estimatedPeriods: lesson.estimated_periods,
    volume: {
      id: volume.id,
      title: volume.title,
    },
    chapter: {
      id: chapter.id,
      number: chapter.number,
      title: chapter.title,
    },
    section: {
      id: section.id,
      textbookLabel: section.textbook_label,
      title: section.title,
    },
    coreKnowledge: ensureArray(lesson.core_knowledge),
    prerequisites: ensureArray(lesson.prerequisites),
    successors: ensureArray(lesson.successors),
    teachingPainPoints: ensureArray(lesson.teaching_pain_points),
    digitalEntryPoints: ensureArray(lesson.digital_entry_points),
    diagnosisFocus: ensureArray(lesson.diagnosis_focus),
    coreCompetencies: ensureArray(lesson.core_competencies),
    resources,
  };
}

function buildResourceCards({ lesson, resourcesById, lessonPackages }) {
  const cards = ensureArray(lesson.digital_entry_points).map((entry) => {
    const packageResource = resourcesById.get(entry.proposed_resource_id);

    if (packageResource) {
      return buildImplementedResourceCard(entry, packageResource);
    }

    return {
      id: entry.proposed_resource_id,
      resourceType: entry.type,
      title: entry.title,
      cognitiveAction: entry.cognitive_action,
      note: entry.note,
      availability: "proposed",
      status: "planned",
      version: null,
      metadataPreview: null,
      quality: buildPlannedResourceQuality(),
      player: null,
      package: null,
    };
  });

  const proposedIds = new Set(cards.map((card) => card.id));
  const unlistedPackageCards = lessonPackages
    .filter((resource) => !proposedIds.has(resource.id))
    .map((resource) => buildImplementedResourceCard(null, resource));

  return [...cards, ...unlistedPackageCards];
}

function buildImplementedResourceCard(entry, packageResource) {
  const metadataAvailability = packageResource.metadata.platform_card?.availability;

  return {
    id: packageResource.id,
    resourceType: packageResource.resourceType,
    title: packageResource.title,
    subtitle: packageResource.subtitle,
    cognitiveAction: packageResource.metadata.pedagogy?.cognitive_action ?? entry?.cognitive_action ?? null,
    note: entry?.note ?? packageResource.metadata.pedagogy?.primary_teaching_problem ?? "",
    availability: metadataAvailability ?? "metadata_ready",
    status: packageResource.status,
    version: packageResource.version,
    metadataPreview: buildMetadataPreview(packageResource.metadata),
    quality: buildImplementedResourceQuality(packageResource, metadataAvailability ?? "metadata_ready"),
    player: buildResourcePlayer(packageResource),
    package: packageResource.package,
  };
}

function buildResourceIndex(lessons) {
  return lessons.flatMap((lesson) =>
    lesson.resources.map((resource) => ({
      id: resource.id,
      resourceType: resource.resourceType,
      title: resource.title,
      subtitle: resource.subtitle ?? null,
      note: resource.note ?? "",
      cognitiveAction: resource.cognitiveAction ?? null,
      availability: resource.availability,
      status: resource.status,
      version: resource.version,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      textbookRef: lesson.textbookRef,
      volumeId: lesson.volume.id,
      volumeTitle: lesson.volume.title,
      chapterId: lesson.chapter.id,
      chapterNumber: lesson.chapter.number,
      chapterTitle: lesson.chapter.title,
      sectionId: lesson.section.id,
      sectionTitle: lesson.section.title,
      sectionTextbookLabel: lesson.section.textbookLabel,
      quality: resource.quality,
      player: resource.player,
      packagePath: resource.package?.path ?? null,
    })),
  );
}

function buildResourceFacets(resourceIndex) {
  return {
    volumes: countOptions(resourceIndex, (resource) => ({
      id: resource.volumeId,
      label: resource.volumeTitle,
    })),
    chapters: countOptions(resourceIndex, (resource) => ({
      id: resource.chapterId,
      label: `第 ${resource.chapterNumber} 章 ${resource.chapterTitle}`,
      volumeId: resource.volumeId,
    })),
    lessons: countOptions(resourceIndex, (resource) => ({
      id: resource.lessonId,
      label: `${resource.textbookRef} ${resource.lessonTitle}`,
      volumeId: resource.volumeId,
      chapterId: resource.chapterId,
    })),
    resourceTypes: countOptions(resourceIndex, (resource) => ({
      id: resource.resourceType,
      label: resourceTypeLabel(resource.resourceType),
    })),
    reviewStatuses: countOptions(resourceIndex, (resource) => ({
      id: resource.quality.reviewStatus,
      label: workflowStatusLabel(resource.quality.reviewStatus),
    })),
  };
}

function countOptions(resources, optionFn) {
  const optionsById = new Map();

  for (const resource of resources) {
    const option = optionFn(resource);
    if (!option?.id) {
      continue;
    }

    const current = optionsById.get(option.id);
    if (current) {
      current.count += 1;
    } else {
      optionsById.set(option.id, { ...option, count: 1 });
    }
  }

  return [...optionsById.values()].sort((left, right) => left.label.localeCompare(right.label, "zh-Hans-CN"));
}

function buildPlannedResourceQuality() {
  return {
    contentStatus: "planned",
    implementationStage: "planned",
    reviewStatus: "planned",
    readinessLabel: "规划中",
    displayStates: ["planned"],
    labels: {
      contentStatus: workflowStatusLabel("planned"),
      implementationStage: workflowStatusLabel("planned"),
      reviewStatus: workflowStatusLabel("planned"),
    },
  };
}

function buildImplementedResourceQuality(packageResource, availability) {
  const contentStatus = packageResource.status ?? "draft";
  const implementationStage = getImplementationStage(packageResource, availability);
  const reviewStatus = packageResource.metadata.compliance?.review_status ?? contentStatus;
  const displayStates = uniqueCompact([contentStatus, implementationStage, reviewStatus]);

  return {
    contentStatus,
    implementationStage,
    reviewStatus,
    readinessLabel: readinessLabel({ packageResource, availability, implementationStage }),
    displayStates,
    labels: {
      contentStatus: workflowStatusLabel(contentStatus),
      implementationStage: workflowStatusLabel(implementationStage),
      reviewStatus: workflowStatusLabel(reviewStatus),
    },
  };
}

function getImplementationStage(packageResource, availability) {
  if (packageResource.resourceType === "applet") {
    const htmlSrcStatus = packageResource.metadata.implementation?.html_src_status;
    const phase = packageResource.metadata.implementation?.phase;

    if (htmlSrcStatus === "runnable") {
      return "runnable";
    }

    if (htmlSrcStatus === "scaffolded" || phase === "content_spec_only") {
      return "scaffold";
    }

    return htmlSrcStatus ?? phase ?? availability ?? "metadata_ready";
  }

  if (packageResource.resourceType === "manim_clip") {
    if (availability === "video_ready" && (packageResource.package.media.hasOutputWebm || packageResource.package.media.hasOutputMp4)) {
      return "video_ready";
    }

    if (packageResource.metadata.render_plan?.phase === "scene_draft" || availability === "metadata_ready") {
      return "scaffold";
    }

    return packageResource.metadata.render_plan?.phase ?? availability ?? "metadata_ready";
  }

  if (packageResource.resourceType === "diagnosis") {
    const questionTypes = ensureArray(packageResource.metadata.diagnosis_design?.item_summary?.question_types);

    if (availability === "interactive_ready" || availability === "item_bank_ready") {
      return availability;
    }

    if (availability === "metadata_ready" && questionTypes.includes("draft_placeholder")) {
      return "scaffold";
    }

    return availability ?? "metadata_ready";
  }

  return availability ?? "metadata_ready";
}

function readinessLabel({ packageResource, availability, implementationStage }) {
  if (implementationStage === "scaffold") {
    return "骨架待精修";
  }

  if (packageResource.resourceType === "applet" && implementationStage === "runnable") {
    return "可运行预览";
  }

  if (packageResource.resourceType === "manim_clip" && implementationStage === "video_ready") {
    return "视频已就绪";
  }

  if (availability === "item_bank_ready") {
    return "题组已就绪";
  }

  if (availability === "interactive_ready") {
    return "互动诊断可用";
  }

  return workflowStatusLabel(availability);
}

function workflowStatusLabel(status) {
  return (
    {
      draft: "草稿",
      planned: "规划中",
      scaffold: "骨架",
      self_checked_draft: "自检草稿",
      math_review: "数学审校",
      math_review_passed: "数学审校通过",
      browser_review: "浏览器复核",
      classroom_trial: "课堂试用",
      release_candidate: "候选发布",
      published: "已发布",
      runnable: "可运行",
      metadata_ready: "metadata 已就绪",
      video_ready: "视频已就绪",
      item_bank_ready: "题组已就绪",
      interactive_ready: "互动诊断可用",
    }[status] ?? status
  );
}

function resourceTypeLabel(type) {
  return (
    {
      applet: "HTML Applet",
      manim_clip: "Manim 动画",
      diagnosis: "诊断任务",
    }[type] ?? type
  );
}

function buildResourcePlayer(packageResource) {
  if (packageResource.resourceType === "diagnosis") {
    return null;
  }

  if (packageResource.resourceType === "manim_clip") {
    return buildManimPlayer(packageResource);
  }

  const srcEntry = packageResource.package.files.srcEntry;
  const htmlSrcStatus = packageResource.metadata.implementation?.html_src_status;

  if (packageResource.resourceType !== "applet" || !srcEntry || htmlSrcStatus !== "runnable") {
    return null;
  }

  return {
    kind: "iframe",
    isRunnable: true,
    src: srcEntry,
    title: packageResource.title,
    sandbox: "allow-scripts allow-same-origin",
  };
}

function buildManimPlayer(packageResource) {
  const availability = packageResource.metadata.platform_card?.availability;
  const hasVideo = packageResource.package.media.hasOutputWebm || packageResource.package.media.hasOutputMp4;

  if (availability !== "video_ready" || !hasVideo) {
    return null;
  }

  const sources = [
    packageResource.package.media.hasOutputWebm && packageResource.package.files.outputWebm
      ? { src: packageResource.package.files.outputWebm, type: "video/webm" }
      : null,
    packageResource.package.media.hasOutputMp4 && packageResource.package.files.outputMp4
      ? { src: packageResource.package.files.outputMp4, type: "video/mp4" }
      : null,
  ].filter(Boolean);

  return {
    kind: "video",
    isRunnable: true,
    title: packageResource.title,
    poster: packageResource.package.media.hasPoster ? packageResource.package.files.poster : null,
    sources,
  };
}

function buildMetadataPreview(metadata) {
  return {
    id: metadata.id,
    version: metadata.version,
    status: metadata.status,
    resourceType: metadata.resource_type,
    title: metadata.title,
    subtitle: metadata.subtitle,
    curriculum: metadata.curriculum,
    pedagogy: {
      cognitiveAction: metadata.pedagogy?.cognitive_action,
      estimatedClassroomMinutes: metadata.pedagogy?.estimated_classroom_minutes,
      primaryTeachingProblem: metadata.pedagogy?.primary_teaching_problem,
      learningGoals: ensureArray(metadata.pedagogy?.learning_goals),
      prerequisites: ensureArray(metadata.pedagogy?.prerequisites),
      successors: ensureArray(metadata.pedagogy?.successors),
      coreCompetencies: ensureArray(metadata.pedagogy?.core_competencies),
    },
    mathematicalScope: metadata.mathematical_scope,
    representations: ensureArray(metadata.representations),
    narrativeDesign: {
      targetDurationSeconds: metadata.narrative_design?.target_duration_seconds,
      beats: ensureArray(metadata.narrative_design?.beats),
      pausePoints: ensureArray(metadata.narrative_design?.pause_points),
    },
    interactionDesign: {
      primaryControl: metadata.interaction_design?.primary_control,
      teacherControls: ensureArray(metadata.interaction_design?.teacher_controls),
      studentControls: ensureArray(metadata.interaction_design?.student_controls),
      stagedReveal: ensureArray(metadata.interaction_design?.staged_reveal),
    },
    dataContract: metadata.data_contract,
    renderPlan: metadata.render_plan,
    diagnosisDesign: {
      diagnosticFocus: ensureArray(metadata.diagnosis_design?.diagnostic_focus),
      misconceptionTags: ensureArray(metadata.diagnosis_design?.misconception_tags),
      itemSummary: metadata.diagnosis_design?.item_summary
        ? {
            totalItems: metadata.diagnosis_design.item_summary.total_items,
            questionTypes: ensureArray(metadata.diagnosis_design.item_summary.question_types),
            estimatedMinutes: metadata.diagnosis_design.item_summary.estimated_minutes,
          }
        : null,
      feedbackStrategy: metadata.diagnosis_design?.feedback_strategy,
    },
    scoring: metadata.scoring,
    platformCard: metadata.platform_card,
    files: metadata.files,
    feedbackAndDiagnosis: metadata.feedback_and_diagnosis,
    visualSemantics: metadata.visual_semantics,
    implementation: metadata.implementation,
    compliance: metadata.compliance,
  };
}

async function readYaml(filePath) {
  const text = await readFile(filePath, "utf8");
  return YAML.parse(text);
}

async function readMarkdownEntry({ rootDir, filePath, kind }) {
  if (!(await exists(filePath))) {
    return null;
  }

  const markdown = await readFile(filePath, "utf8");
  const lines = markdown.split(/\r?\n/);
  const title = lines.find((line) => line.startsWith("# "))?.replace(/^#\s+/, "").trim() ?? path.basename(filePath);
  const sections = lines
    .filter((line) => /^##\s+/.test(line))
    .map((line) => line.replace(/^##\s+/, "").trim());
  const summary = extractLeadSummary(lines);

  return {
    kind,
    path: toRepoPath(rootDir, filePath),
    title,
    summary,
    sections,
  };
}

function extractLeadSummary(lines) {
  const leadLines = [];
  let afterTitle = false;

  for (const line of lines) {
    if (line.startsWith("# ")) {
      afterTitle = true;
      continue;
    }

    if (!afterTitle) {
      continue;
    }

    if (line.startsWith("## ")) {
      break;
    }

    const trimmed = line.trim();
    if (trimmed) {
      leadLines.push(trimmed);
    }
  }

  return leadLines.slice(0, 3).join(" ");
}

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

function groupBy(items, keyFn) {
  const groups = new Map();

  for (const item of items) {
    const key = keyFn(item);
    if (!key) {
      continue;
    }
    const current = groups.get(key) ?? [];
    current.push(item);
    groups.set(key, current);
  }

  return groups;
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

function uniqueCompact(values) {
  return [...new Set(values.filter(Boolean))];
}

function toRepoPath(rootDir, filePath) {
  return path.relative(rootDir, filePath).split(path.sep).join("/");
}
