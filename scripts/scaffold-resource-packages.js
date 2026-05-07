#!/usr/bin/env node

import { mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import YAML from "yaml";

import { generateResourceBacklog } from "./generate-resource-backlog.js";

const RESOURCE_DIRS = {
  applet: "content/applets",
  manim_clip: "content/manim",
  diagnosis: "content/diagnosis",
};

const REQUIRED_APPLET_FILES = {
  readme: "README.md",
  metadata: "metadata.yaml",
  teacherScript: "teacher-script.md",
  studentTask: "student-task.md",
  review: "review.md",
  srcEntry: "src/index.html",
};

const REQUIRED_MANIM_FILES = {
  readme: "README.md",
  metadata: "metadata.yaml",
  storyboard: "storyboard.md",
  scene: "scene.py",
  review: "review.md",
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

    if (!RESOURCE_DIRS[item.type]) {
      result.skipped.push({
        id: item.id,
        reason: "unsupported_type",
        type: item.type,
      });
      continue;
    }

    const packagePath = path.posix.join(RESOURCE_DIRS[item.type], item.id);
    const packageDir = path.join(rootDir, packagePath);

    if (await exists(packageDir)) {
      result.skipped.push({
        id: item.id,
        reason: "already_exists",
        packagePath,
      });
      continue;
    }

    const files = buildResourceFiles(item);
    const createdRecord = {
      id: item.id,
      type: item.type,
      packagePath,
      files: Object.keys(files).sort(),
    };

    if (write) {
      await mkdir(packageDir, { recursive: true });
      await Promise.all(
        Object.entries(files).map(async ([fileName, contents]) => {
          const outputPath = path.join(packageDir, fileName);
          await mkdir(path.dirname(outputPath), { recursive: true });
          await writeFile(outputPath, contents, "utf8");
        }),
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

function buildResourceFiles(item) {
  if (item.type === "applet") {
    return buildAppletFiles(item);
  }

  if (item.type === "manim_clip") {
    return buildManimFiles(item);
  }

  if (item.type === "diagnosis") {
    return buildDiagnosisFiles(item);
  }

  return {};
}

function buildCommonCurriculum(item) {
  return {
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
  };
}

function buildCommonPedagogy(item, estimatedMinutes = 12) {
  return {
    cognitive_action: item.cognitiveAction,
    estimated_classroom_minutes: estimatedMinutes,
    primary_teaching_problem: item.teachingPainPoints[0] ?? item.note,
    learning_goals: [
      `围绕${item.lessonTitle}建立可观察、可解释的数学表征。`,
      `用“${item.cognitiveAction}”方式处理关键变量、边界条件和典型错因。`,
      "把交互观察转化为可板书、可追问、可迁移的课堂结论。",
    ],
    prerequisites: [`${item.lessonTitle}相关先修知识`],
    successors: ["后续课时学习与综合应用"],
    core_competencies: ["直观想象", "逻辑推理", "数学运算"],
    classroom_use: `建议在「${item.lessonTitle}」课堂中作为新知建构或重点突破环节使用。`,
  };
}

function buildAppletFiles(item) {
  const metadata = buildAppletMetadata(item);

  return {
    [REQUIRED_APPLET_FILES.readme]: buildAppletReadme(item),
    [REQUIRED_APPLET_FILES.metadata]: `${YAML.stringify(metadata)}\n`,
    [REQUIRED_APPLET_FILES.teacherScript]: buildAppletTeacherScript(item),
    [REQUIRED_APPLET_FILES.studentTask]: buildAppletStudentTask(item),
    [REQUIRED_APPLET_FILES.review]: buildAppletReview(item),
    [REQUIRED_APPLET_FILES.srcEntry]: buildAppletHtml(item),
  };
}

function buildAppletMetadata(item) {
  return {
    schema_version: "0.1.0",
    id: item.id,
    version: "0.1.0",
    status: "draft",
    resource_type: "applet",
    title: item.title,
    subtitle: `围绕${item.lessonTitle}的交互式数字教具骨架`,
    curriculum: buildCommonCurriculum(item),
    pedagogy: buildCommonPedagogy(item, 12),
    mathematical_scope: {
      focus: item.note,
      lesson: item.lessonTitle,
      out_of_scope: ["本 scaffold 只定义首版交互骨架，数学细节需在资源生产对话中补齐。"],
    },
    representations: [
      {
        id: "interactive_canvas",
        role: "承载可拖拽、可观察、可复现的核心数学表征。",
      },
      {
        id: "teacher_readout",
        role: "为教师提供课堂追问所需的关键状态读数。",
      },
    ],
    interaction_design: {
      primary_control: "预留一个核心滑块或拖拽控制，后续按知识点定制。",
      teacher_controls: ["重置", "分步显示", "重点标注"],
      student_controls: ["拖动观察", "记录猜想", "对照结论"],
      staged_reveal: [
        {
          step: "observe",
          description: "先让学生观察变量变化和图像响应。",
        },
        {
          step: "explain",
          description: "再引导学生用符号语言解释观察结果。",
        },
      ],
    },
    data_contract: {
      state_variables: [
        {
          name: "current_value",
          value_type: "number",
          default: 0,
          description: "首版 scaffold 的占位状态变量，后续替换为真实数学变量。",
          persistence: "snapshot",
        },
      ],
      events: [
        {
          name: "state_changed",
          direction: "applet_to_player",
          description: "交互状态变化时通知平台播放器。",
          payload: ["current_value"],
          required_for_player: true,
        },
      ],
    },
    feedback_and_diagnosis: {
      success_evidence: ["学生能说清楚观察变量、图像变化和数学结论之间的对应关系。"],
      common_error_tags: [
        {
          id: "representation_gap",
          label: "表征对应断裂",
        },
      ],
      feedback_principles: ["反馈先指向可视化证据，再回到符号表达。"],
    },
    visual_semantics: {
      primary_color: "teal",
      emphasis_rule: "当前变量用高对比色标注，历史轨迹和辅助线降低透明度。",
    },
    implementation: {
      phase: "content_spec_only",
      html_src_status: "scaffolded",
      planned_engine: "native-canvas-svg",
      create_src_in_later_task: false,
      classroom_device_targets: ["desktop", "tablet", "projector"],
    },
    files: {
      readme: REQUIRED_APPLET_FILES.readme,
      teacher_script: REQUIRED_APPLET_FILES.teacherScript,
      student_task: REQUIRED_APPLET_FILES.studentTask,
      review_record: REQUIRED_APPLET_FILES.review,
      src_entry: REQUIRED_APPLET_FILES.srcEntry,
    },
    compliance: {
      copyright_note: "本 scaffold 仅生成原创资源骨架，不复制教材正文、官方课件、教案或商业题库。",
      review_status: "self_checked_draft",
    },
  };
}

function buildAppletReadme(item) {
  return `# ${item.title}

资源 ID：\`${item.id}\`

对应课时：\`${item.lessonId}\`「${item.lessonTitle}」

本目录由资源 scaffold 命令生成，用于承载 ${item.lessonTitle} 的 Applet 草稿。生成后应由资源生产对话补齐数学模型、交互状态、教师脚本和浏览器验证记录。

## 教学痛点

${item.teachingPainPoints.map((painPoint) => `- ${painPoint}`).join("\n")}

## 初始设计意图

${item.note}
`;
}

function buildAppletTeacherScript(item) {
  return `# 教师脚本：${item.title}

## 使用时机

建议在「${item.lessonTitle}」课堂中用于${item.cognitiveAction}型观察与追问。

## 追问方向

${item.teachingPainPoints.map((painPoint) => `- ${painPoint}`).join("\n")}

## 待补充

- 明确核心变量和初始状态。
- 补齐分步揭示顺序。
- 设计学生记录表述和板书落点。
`;
}

function buildAppletStudentTask(item) {
  return `# 学生活动：${item.title}

## 任务

围绕「${item.lessonTitle}」完成一次观察、猜想和解释。

## 记录

- 我改变了什么变量？
- 图像或几何对象发生了什么变化？
- 这个变化能写成什么数学结论？
`;
}

function buildAppletReview(item) {
  return `# 审核记录

资源 ID：\`${item.id}\`

当前状态：\`draft\`

## Scaffold 自检

- 已对齐课时 \`${item.lessonId}\`「${item.lessonTitle}」。
- 已生成 Applet 必备文件和 HTML 占位入口。
- 当前 HTML 只用于占位，不代表交互课件已经完成。

## 待补充

- 数学模型和边界条件。
- 可运行交互、响应式布局和浏览器验证截图。
- 数学审校与课堂试用记录。
`;
}

function buildAppletHtml(item) {
  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${item.title}</title>
    <style>
      body {
        margin: 0;
        min-height: 100svh;
        display: grid;
        place-items: center;
        background: #f6faf8;
        color: #17231f;
        font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
      }

      main {
        width: min(720px, calc(100vw - 32px));
        padding: 24px;
        border: 1px solid #d7e0dc;
        border-radius: 8px;
        background: #ffffff;
      }
    </style>
  </head>
  <body>
    <main>
      <p>sh-hs-math-applet-sdk</p>
      <h1>${item.title}</h1>
      <p>${item.note}</p>
      <p>资源 ID：${item.id}</p>
    </main>
    <script>
      const RESOURCE_ID = "${item.id}";
      window.parent?.postMessage({ type: "applet:ready", resourceId: RESOURCE_ID, payload: { current_value: 0 } }, "*");
    </script>
  </body>
</html>
`;
}

function buildManimFiles(item) {
  const metadata = buildManimMetadata(item);

  return {
    [REQUIRED_MANIM_FILES.readme]: buildManimReadme(item),
    [REQUIRED_MANIM_FILES.metadata]: `${YAML.stringify(metadata)}\n`,
    [REQUIRED_MANIM_FILES.storyboard]: buildManimStoryboard(item),
    [REQUIRED_MANIM_FILES.scene]: buildManimScene(item),
    [REQUIRED_MANIM_FILES.review]: buildManimReview(item),
  };
}

function buildManimMetadata(item) {
  const sceneClass = buildSceneClassName(item.id);

  return {
    schema_version: "0.1.0",
    id: item.id,
    version: "0.1.0",
    status: "draft",
    resource_type: "manim_clip",
    title: item.title,
    subtitle: `围绕${item.lessonTitle}的 Manim 数学可视化骨架`,
    curriculum: buildCommonCurriculum(item),
    pedagogy: buildCommonPedagogy(item, 6),
    mathematical_scope: {
      focus: item.note,
      lesson: item.lessonTitle,
      out_of_scope: ["本 scaffold 只定义分镜和场景骨架，具体动画需在资源生产对话中补齐。"],
    },
    representations: [
      {
        id: "animated_diagram",
        role: "用短动画展示静态板书难以呈现的变化过程。",
      },
    ],
    narrative_design: {
      target_duration_seconds: 60,
      beats: [
        {
          id: "setup",
          title: "提出观察对象",
          purpose: item.note,
          duration_seconds: 15,
        },
        {
          id: "transform",
          title: "展示关键变化",
          purpose: `突出${item.lessonTitle}中的核心关系。`,
          duration_seconds: 30,
        },
        {
          id: "conclude",
          title: "回到数学表达",
          purpose: "把可视化过程收束为课堂结论。",
          duration_seconds: 15,
        },
      ],
      pause_points: [
        {
          after_beat: "transform",
          teacher_prompt: "刚才的变化对应哪个数学条件或性质？",
        },
      ],
    },
    visual_semantics: {
      background: "light",
      emphasis_rule: "关键对象高亮，辅助对象降低透明度。",
    },
    render_plan: {
      phase: "scene_draft",
      scene_class: sceneClass,
      aspect_ratio: "16:9",
      resolution: "1920x1080",
      fps: 30,
      background: "white",
      output_formats: ["mp4", "webm"],
      commands: {
        preview: `manim -pql scene.py ${sceneClass}`,
        mp4: `manim -qh scene.py ${sceneClass}`,
        webm: `manim -qh --format=webm scene.py ${sceneClass}`,
      },
      notes: ["首版场景为 scaffold，占位动画需由资源生产对话补齐。"],
    },
    files: {
      readme: REQUIRED_MANIM_FILES.readme,
      storyboard: REQUIRED_MANIM_FILES.storyboard,
      scene: REQUIRED_MANIM_FILES.scene,
      review_record: REQUIRED_MANIM_FILES.review,
    },
    platform_card: {
      availability: "metadata_ready",
      preview_behavior: "metadata_placeholder",
      embed_strategy: "先展示分镜和渲染计划；视频渲染通过后升级为 video_ready。",
      paired_resources: [item.id],
    },
    compliance: {
      copyright_note: "本 scaffold 仅生成原创资源骨架，不复制教材正文、官方课件、教案或商业题库。",
      review_status: "self_checked_draft",
    },
  };
}

function buildManimReadme(item) {
  return `# ${item.title}

资源 ID：\`${item.id}\`

对应课时：\`${item.lessonId}\`「${item.lessonTitle}」

本目录由资源 scaffold 命令生成，用于承载 ${item.lessonTitle} 的 Manim 草稿。
`;
}

function buildManimStoryboard(item) {
  return `# 分镜：${item.title}

## setup

提出观察对象：${item.note}

## transform

展示关键变化，突出学生容易断裂或混淆的表征。

## conclude

把动画过程收束成课堂可板书的数学表达。
`;
}

function buildManimScene(item) {
  const sceneClass = buildSceneClassName(item.id);

  return `from manim import *


class ${sceneClass}(Scene):
    def construct(self):
        title = Text("${item.title}", font_size=38)
        subtitle = Text("${item.lessonTitle}", font_size=26).next_to(title, DOWN)
        self.play(Write(title), FadeIn(subtitle, shift=DOWN))
        self.wait(1)
        self.play(FadeOut(title), FadeOut(subtitle))
`;
}

function buildManimReview(item) {
  return `# 审核记录

资源 ID：\`${item.id}\`

当前状态：\`draft\`

## Scaffold 自检

- 已对齐课时 \`${item.lessonId}\`「${item.lessonTitle}」。
- 已生成 Manim 必备文件和 scene.py 占位场景。
- 当前场景只用于占位，不代表动画已经完成。

## 待补充

- 精确分镜、数学符号、动画节奏和暂停点。
- 本地渲染 mp4/webm/poster。
- 数学审校与课堂播放验证。
`;
}

function buildSceneClassName(resourceId) {
  return `${resourceId.replace(/[^A-Za-z0-9]/g, "")}Scene`;
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
