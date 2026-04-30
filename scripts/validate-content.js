#!/usr/bin/env node

import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import Ajv2020 from "ajv/dist/2020.js";
import YAML from "yaml";

const CURRICULUM_PATH = "content/curriculum/index.yaml";
const APPLETS_DIR = "content/applets";
const MANIM_DIR = "content/manim";
const APPLET_SCHEMA_PATH = "packages/applet-sdk/schemas/applet-metadata.schema.json";
const MANIM_SCHEMA_PATH = "packages/manim-pipeline/schemas/manim-clip-metadata.schema.json";

const RESOURCE_PATTERNS = {
  applet: /^SH-HS-MATH-HJ-(?:B[0-9]+|XB[0-9]+)-C[0-9]{2}-L[0-9]{2}-A[0-9]{2}$/,
  manim_clip: /^SH-HS-MATH-HJ-(?:B[0-9]+|XB[0-9]+)-C[0-9]{2}-L[0-9]{2}-M[0-9]{2}$/,
};

export async function validateContent({ rootDir = process.cwd() } = {}) {
  const errors = [];
  const warnings = [];
  const resources = [];

  const curriculum = await readYaml(path.join(rootDir, CURRICULUM_PATH));
  const curriculumIndex = indexCurriculum(curriculum, errors);
  const schemaValidators = await loadSchemaValidators(rootDir);

  const applets = await loadResourceDirectories({
    rootDir,
    relativeDir: APPLETS_DIR,
    expectedType: "applet",
    errors,
  });
  const manimClips = await loadResourceDirectories({
    rootDir,
    relativeDir: MANIM_DIR,
    expectedType: "manim_clip",
    errors,
  });

  for (const resource of [...applets, ...manimClips]) {
    await validateResourcePackage({
      resource,
      curriculumIndex,
      schemaValidators,
      rootDir,
      errors,
      warnings,
    });
    resources.push({
      id: resource.metadata.id,
      resourceType: resource.metadata.resource_type,
      lessonId: resource.metadata.curriculum?.lesson_id,
      availability: resource.metadata.platform_card?.availability ?? "metadata_ready",
      packagePath: resource.packagePath,
    });
  }

  return {
    errors,
    warnings,
    resources,
    counts: {
      lessons: curriculumIndex.lessonIds.size,
      digitalEntryPoints: curriculumIndex.resourceEntries.size,
      applets: applets.length,
      manimClips: manimClips.length,
      implementedResources: applets.length + manimClips.length,
    },
  };
}

function indexCurriculum(curriculum, errors) {
  const lessonIds = new Set();
  const lessons = new Map();
  const resourceEntries = new Map();

  for (const volume of ensureArray(curriculum.volumes)) {
    for (const chapter of ensureArray(volume.chapters)) {
      const sectionByLessonId = new Map();

      for (const section of ensureArray(chapter.sections)) {
        for (const lessonId of ensureArray(section.lesson_ids)) {
          sectionByLessonId.set(lessonId, section);
        }
      }

      for (const lesson of ensureArray(chapter.lessons)) {
        if (lessonIds.has(lesson.id)) {
          errors.push(`curriculum lesson id is duplicated: ${lesson.id}`);
          continue;
        }

        const section = sectionByLessonId.get(lesson.id);
        lessonIds.add(lesson.id);
        lessons.set(lesson.id, { lesson, section, chapter, volume });

        for (const entry of ensureArray(lesson.digital_entry_points)) {
          const resourceId = entry.proposed_resource_id;
          if (!resourceId) {
            errors.push(`${lesson.id} has a digital_entry_points item without proposed_resource_id`);
            continue;
          }

          if (resourceEntries.has(resourceId)) {
            errors.push(`curriculum proposed_resource_id is duplicated: ${resourceId}`);
            continue;
          }

          resourceEntries.set(resourceId, { entry, lesson });
        }
      }
    }
  }

  return { lessonIds, lessons, resourceEntries };
}

async function loadResourceDirectories({ rootDir, relativeDir, expectedType, errors }) {
  const absoluteDir = path.join(rootDir, relativeDir);

  if (!(await exists(absoluteDir))) {
    return [];
  }

  const entries = await readdir(absoluteDir, { withFileTypes: true });
  const directories = entries.filter((entry) => entry.isDirectory());
  const resources = [];

  for (const directory of directories) {
    const packageDir = path.join(absoluteDir, directory.name);
    const metadataPath = path.join(packageDir, "metadata.yaml");

    if (!(await isFile(metadataPath))) {
      errors.push(`${toRepoPath(rootDir, packageDir)} is missing metadata.yaml`);
      continue;
    }

    const metadata = await readYaml(metadataPath);
    resources.push({
      directoryName: directory.name,
      packageDir,
      packagePath: toRepoPath(rootDir, packageDir),
      metadata,
      expectedType,
    });
  }

  return resources.sort((left, right) => left.packagePath.localeCompare(right.packagePath));
}

async function validateResourcePackage({ resource, curriculumIndex, schemaValidators, rootDir, errors, warnings }) {
  const { metadata, expectedType } = resource;
  const label = metadata.id ?? resource.packagePath;

  validateMetadataSchema({ metadata, expectedType, schemaValidators, label, errors });
  validateRequiredTopFields({ metadata, label, fields: ["id", "version", "status", "resource_type", "title", "curriculum", "pedagogy", "files"], errors });

  if (metadata.id !== resource.directoryName) {
    errors.push(`${label} metadata.id must match directory name ${resource.directoryName}`);
  }

  if (metadata.resource_type !== expectedType) {
    errors.push(`${label} resource_type must be ${expectedType}`);
  }

  const pattern = RESOURCE_PATTERNS[expectedType];
  if (typeof metadata.id === "string" && pattern && !pattern.test(metadata.id)) {
    errors.push(`${label} id does not match ${expectedType} naming pattern`);
  }

  const lessonId = metadata.curriculum?.lesson_id;
  if (!lessonId || !curriculumIndex.lessonIds.has(lessonId)) {
    errors.push(`${label} curriculum.lesson_id is not found in ${CURRICULUM_PATH}: ${lessonId ?? "missing"}`);
  } else {
    validateCurriculumAlignment({ metadata, lessonRecord: curriculumIndex.lessons.get(lessonId), label, errors });
  }

  if (typeof metadata.id === "string" && typeof lessonId === "string" && !metadata.id.startsWith(`${lessonId}-`)) {
    errors.push(`${label} id should start with its curriculum.lesson_id`);
  }

  const curriculumEntry = curriculumIndex.resourceEntries.get(metadata.id);
  if (curriculumEntry && curriculumEntry.entry.type !== expectedType) {
    errors.push(`${label} resource_type does not match curriculum entry type ${curriculumEntry.entry.type}`);
  }

  if (!curriculumEntry) {
    warnings.push(`${label} is implemented but is not listed in any digital_entry_points item`);
  }

  if (expectedType === "applet") {
    await validateAppletPackage({ resource, rootDir, errors });
  }

  if (expectedType === "manim_clip") {
    await validateManimPackage({ resource, rootDir, errors });
  }
}

async function loadSchemaValidators(rootDir) {
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  const appletSchema = JSON.parse(await readFile(path.join(rootDir, APPLET_SCHEMA_PATH), "utf8"));
  const manimSchema = JSON.parse(await readFile(path.join(rootDir, MANIM_SCHEMA_PATH), "utf8"));

  return {
    applet: ajv.compile(appletSchema),
    manim_clip: ajv.compile(manimSchema),
  };
}

function validateMetadataSchema({ metadata, expectedType, schemaValidators, label, errors }) {
  const validate = schemaValidators[expectedType];
  if (!validate) {
    errors.push(`${label} has no JSON Schema validator for resource type ${expectedType}`);
    return;
  }

  if (validate(metadata)) {
    return;
  }

  for (const error of validate.errors ?? []) {
    const location = error.instancePath || "/";
    errors.push(`${label} schema ${location} ${error.message}`);
  }
}

function validateRequiredTopFields({ metadata, label, fields, errors }) {
  for (const field of fields) {
    if (metadata[field] === undefined || metadata[field] === null || metadata[field] === "") {
      errors.push(`${label} is missing required field ${field}`);
    }
  }
}

function validateCurriculumAlignment({ metadata, lessonRecord, label, errors }) {
  const { lesson, section, chapter, volume } = lessonRecord;
  const curriculum = metadata.curriculum ?? {};
  const expected = {
    volume_id: volume.id,
    volume_title: volume.title,
    chapter_id: chapter.id,
    chapter_title: chapter.title,
    section_id: section?.id,
    section_title: section?.title,
    textbook_ref: lesson.textbook_ref,
    lesson_title: lesson.title,
  };

  for (const [field, value] of Object.entries(expected)) {
    if (value && curriculum[field] !== value) {
      errors.push(`${label} curriculum.${field} should be ${value}`);
    }
  }
}

async function validateAppletPackage({ resource, rootDir, errors }) {
  const { metadata } = resource;
  const label = metadata.id;

  await validateDeclaredFile({ resource, rootDir, field: "readme", fallback: "README.md", errors });
  await validateDeclaredFile({ resource, rootDir, field: "teacher_script", fallback: "teacher-script.md", errors });
  await validateDeclaredFile({ resource, rootDir, field: "student_task", fallback: "student-task.md", errors });
  await validateDeclaredFile({ resource, rootDir, field: "review_record", fallback: "review.md", errors });

  if (metadata.implementation?.html_src_status === "runnable") {
    await validateDeclaredFile({ resource, rootDir, field: "src_entry", errors });
  }

  if (metadata.files?.src_entry && !metadata.files.src_entry.endsWith(".html")) {
    errors.push(`${label} files.src_entry should point to an HTML file`);
  }
}

async function validateManimPackage({ resource, rootDir, errors }) {
  const { metadata } = resource;
  const label = metadata.id;

  await validateDeclaredFile({ resource, rootDir, field: "readme", fallback: "README.md", errors });
  await validateDeclaredFile({ resource, rootDir, field: "storyboard", fallback: "storyboard.md", errors });
  await validateDeclaredFile({ resource, rootDir, field: "scene", fallback: "scene.py", errors });
  await validateDeclaredFile({ resource, rootDir, field: "review_record", fallback: "review.md", errors });

  const availability = metadata.platform_card?.availability;
  if (availability === "video_ready") {
    if (metadata.render_plan?.phase !== "rendered") {
      errors.push(`${label} render_plan.phase should be rendered when platform_card.availability is video_ready`);
    }

    await validateDeclaredFile({ resource, rootDir, field: "output_mp4", errors });
    await validateDeclaredFile({ resource, rootDir, field: "output_webm", errors });
    await validateDeclaredFile({ resource, rootDir, field: "poster", errors });

    for (const field of ["output_mp4", "output_webm", "poster"]) {
      const relativePath = metadata.files?.[field];
      if (relativePath && !relativePath.startsWith("dist/final/")) {
        errors.push(`${label} files.${field} should use dist/final as the stable platform entry`);
      }
    }
  }
}

async function validateDeclaredFile({ resource, rootDir, field, fallback, errors }) {
  const { metadata, packageDir } = resource;
  const label = metadata.id;
  const relativePath = metadata.files?.[field] ?? fallback;

  if (!relativePath) {
    errors.push(`${label} files.${field} is missing`);
    return;
  }

  const filePath = path.resolve(packageDir, relativePath);
  if (!filePath.startsWith(`${packageDir}${path.sep}`)) {
    errors.push(`${label} files.${field} points outside its package: ${relativePath}`);
    return;
  }

  if (!(await isFile(filePath))) {
    errors.push(`${label} files.${field} is missing: ${toRepoPath(rootDir, filePath)}`);
  }
}

async function readYaml(filePath) {
  const text = await readFile(filePath, "utf8");
  return YAML.parse(text);
}

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function isFile(filePath) {
  try {
    return (await stat(filePath)).isFile();
  } catch {
    return false;
  }
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

function toRepoPath(rootDir, filePath) {
  return path.relative(rootDir, filePath).split(path.sep).join("/");
}

async function runCli() {
  const result = await validateContent();

  for (const warning of result.warnings) {
    console.warn(`warning: ${warning}`);
  }

  if (result.errors.length > 0) {
    console.error(`Content validation failed with ${result.errors.length} error(s):`);
    for (const error of result.errors) {
      console.error(`- ${error}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(
    `Content validation passed: ${result.counts.lessons} lessons, ${result.counts.applets} applet(s), ${result.counts.manimClips} Manim clip(s).`,
  );
}

const currentFile = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === currentFile) {
  runCli().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
