import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

import YAML from "yaml";

const CURRICULUM_PATH = "content/curriculum/index.yaml";
const APPLETS_DIR = "content/applets";

export async function loadTeacherWorkspace({ rootDir = process.cwd() } = {}) {
  const curriculum = await readYaml(path.join(rootDir, CURRICULUM_PATH));
  const appletPackages = await loadAppletPackages(rootDir);
  const appletsById = new Map(appletPackages.map((resource) => [resource.id, resource]));
  const appletsByLesson = groupBy(appletPackages, (resource) => resource.lessonId);

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
              appletsById,
              appletsByLesson,
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
                (resource) => resource.availability === "metadata_ready",
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
  const plannedResourceCount = lessons
    .flatMap((lesson) => lesson.resources)
    .filter((resource) => resource.availability === "proposed").length;

  return {
    sources: {
      curriculum: CURRICULUM_PATH,
      applets: appletPackages.map((resource) => resource.package.path),
    },
    project: curriculum.project,
    tree: { volumes },
    lessons,
    lessonsById,
    mvp: curriculum.mvp,
    resourceTypes: curriculum.resource_types,
    summary: {
      volumeCount: volumes.length,
      chapterCount,
      lessonCount: lessons.length,
      implementedAppletCount,
      plannedResourceCount,
    },
  };
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

function buildLesson({ lesson, volume, chapter, section, appletsById, appletsByLesson }) {
  const resources = buildResourceCards({
    lesson,
    appletsById,
    lessonApplets: appletsByLesson.get(lesson.id) ?? [],
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

function buildResourceCards({ lesson, appletsById, lessonApplets }) {
  const cards = ensureArray(lesson.digital_entry_points).map((entry) => {
    const packageResource = appletsById.get(entry.proposed_resource_id);

    if (packageResource) {
      return buildImplementedAppletCard(entry, packageResource);
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
      package: null,
    };
  });

  const proposedIds = new Set(cards.map((card) => card.id));
  const unlistedAppletCards = lessonApplets
    .filter((resource) => !proposedIds.has(resource.id))
    .map((resource) => buildImplementedAppletCard(null, resource));

  return [...cards, ...unlistedAppletCards];
}

function buildImplementedAppletCard(entry, packageResource) {
  return {
    id: packageResource.id,
    resourceType: packageResource.resourceType,
    title: packageResource.title,
    subtitle: packageResource.subtitle,
    cognitiveAction: packageResource.metadata.pedagogy?.cognitive_action ?? entry?.cognitive_action ?? null,
    note: entry?.note ?? packageResource.metadata.pedagogy?.primary_teaching_problem ?? "",
    availability: "metadata_ready",
    status: packageResource.status,
    version: packageResource.version,
    metadataPreview: buildMetadataPreview(packageResource.metadata),
    package: packageResource.package,
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
    interactionDesign: {
      primaryControl: metadata.interaction_design?.primary_control,
      teacherControls: ensureArray(metadata.interaction_design?.teacher_controls),
      studentControls: ensureArray(metadata.interaction_design?.student_controls),
      stagedReveal: ensureArray(metadata.interaction_design?.staged_reveal),
    },
    dataContract: metadata.data_contract,
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

function toRepoPath(rootDir, filePath) {
  return path.relative(rootDir, filePath).split(path.sep).join("/");
}
