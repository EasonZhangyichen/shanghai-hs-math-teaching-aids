import rawWorkspace from "./data/workspace-data.json";
import { escapeHtml, renderMathText } from "./lib/math-text.js";
import "./styles.css";

const root = document.querySelector("#app");
const workspace = hydrateWorkspace(rawWorkspace);

const state = {
  lessonId: getInitialLessonId(),
  selectedResourceId: null,
  scriptMode: "teacher",
  filters: {
    volumeId: "",
    chapterId: "",
    lessonId: "",
    resourceType: "",
    reviewStatus: "",
  },
};

let playerSeq = 0;

function hydrateWorkspace(workspaceData) {
  const lessons = workspaceData.lessons.map((lesson) => ({
    ...lesson,
    resources: lesson.resources.map((resource) => ({
      ...resource,
      quality: resource.quality ?? buildResourceQuality(resource),
    })),
  }));
  const lessonsById = Object.fromEntries(lessons.map((lesson) => [lesson.id, lesson]));
  const resourceIndex = workspaceData.resourceIndex ?? buildResourceIndex(lessons);
  const resourceFacets = workspaceData.resourceFacets ?? buildResourceFacets(resourceIndex);

  return {
    ...workspaceData,
    lessons,
    lessonsById,
    resourceIndex,
    resourceFacets,
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
    volumes: countFacetOptions(resourceIndex, (resource) => ({
      id: resource.volumeId,
      label: resource.volumeTitle,
    })),
    chapters: countFacetOptions(resourceIndex, (resource) => ({
      id: resource.chapterId,
      label: `第 ${resource.chapterNumber} 章 ${resource.chapterTitle}`,
      volumeId: resource.volumeId,
    })),
    lessons: countFacetOptions(resourceIndex, (resource) => ({
      id: resource.lessonId,
      label: `${resource.textbookRef} ${resource.lessonTitle}`,
      volumeId: resource.volumeId,
      chapterId: resource.chapterId,
    })),
    resourceTypes: countFacetOptions(resourceIndex, (resource) => ({
      id: resource.resourceType,
      label: resourceTypeLabel(resource.resourceType),
    })),
    reviewStatuses: countFacetOptions(resourceIndex, (resource) => ({
      id: resource.quality.reviewStatus,
      label: workflowStatusLabel(resource.quality.reviewStatus),
    })),
  };
}

function countFacetOptions(resources, optionFn) {
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

function buildResourceQuality(resource) {
  if (resource.status === "planned" || resource.availability === "proposed") {
    return buildQualityState("planned", "planned", "planned", "规划中");
  }

  const contentStatus = resource.status ?? resource.metadataPreview?.status ?? "draft";
  const implementationStage = getImplementationStage(resource);
  const reviewStatus = resource.metadataPreview?.compliance?.review_status ?? contentStatus;

  return buildQualityState(
    contentStatus,
    implementationStage,
    reviewStatus,
    resourceReadinessLabel(resource, implementationStage),
  );
}

function buildQualityState(contentStatus, implementationStage, reviewStatus, readinessLabel) {
  return {
    contentStatus,
    implementationStage,
    reviewStatus,
    readinessLabel,
    displayStates: uniqueCompact([contentStatus, implementationStage, reviewStatus]),
    labels: {
      contentStatus: workflowStatusLabel(contentStatus),
      implementationStage: workflowStatusLabel(implementationStage),
      reviewStatus: workflowStatusLabel(reviewStatus),
    },
  };
}

function getImplementationStage(resource) {
  if (resource.resourceType === "applet") {
    const htmlSrcStatus = resource.metadataPreview?.implementation?.html_src_status;
    const phase = resource.metadataPreview?.implementation?.phase;

    if (htmlSrcStatus === "runnable") {
      return "runnable";
    }

    if (htmlSrcStatus === "scaffolded" || phase === "content_spec_only") {
      return "scaffold";
    }

    return htmlSrcStatus ?? phase ?? resource.availability ?? "metadata_ready";
  }

  if (resource.resourceType === "manim_clip") {
    const phase = resource.metadataPreview?.renderPlan?.phase;

    if (resource.availability === "video_ready") {
      return "video_ready";
    }

    if (phase === "scene_draft" || resource.availability === "metadata_ready") {
      return "scaffold";
    }

    return phase ?? resource.availability ?? "metadata_ready";
  }

  if (resource.resourceType === "diagnosis") {
    const questionTypes = resource.metadataPreview?.diagnosisDesign?.itemSummary?.questionTypes ?? [];

    if (resource.availability === "interactive_ready" || resource.availability === "item_bank_ready") {
      return resource.availability;
    }

    if (resource.availability === "metadata_ready" && questionTypes.includes("draft_placeholder")) {
      return "scaffold";
    }

    return resource.availability ?? "metadata_ready";
  }

  return resource.availability ?? "metadata_ready";
}

function resourceReadinessLabel(resource, implementationStage) {
  if (implementationStage === "scaffold") {
    return "骨架待精修";
  }

  if (resource.resourceType === "applet" && implementationStage === "runnable") {
    return "可运行预览";
  }

  if (resource.resourceType === "manim_clip" && implementationStage === "video_ready") {
    return "视频已就绪";
  }

  if (resource.availability === "item_bank_ready") {
    return "题组已就绪";
  }

  if (resource.availability === "interactive_ready") {
    return "互动诊断可用";
  }

  return workflowStatusLabel(resource.availability);
}

function uniqueCompact(values) {
  return [...new Set(values.filter(Boolean))];
}

root.addEventListener("click", (event) => {
  const filterResetButton = event.target.closest("[data-filter-reset]");
  if (filterResetButton) {
    clearFilters();
    return;
  }

  const previewButton = event.target.closest("[data-preview-anchor]");
  if (previewButton) {
    focusResourceDetail();
    return;
  }

  const resourceResult = event.target.closest("[data-resource-result-id]");
  if (resourceResult) {
    setLesson(resourceResult.dataset.resourceResultLessonId, {
      selectedResourceId: resourceResult.dataset.resourceResultId,
      preserveSearchScroll: true,
      searchScrollTop: getSearchResultsScrollTop(),
      focusResourceDetail: true,
    });
    return;
  }

  const lessonButton = event.target.closest("[data-lesson-id]");
  if (lessonButton) {
    setLesson(lessonButton.dataset.lessonId);
    return;
  }

  const resourceButton = event.target.closest("[data-resource-id]");
  if (resourceButton) {
    selectResource(resourceButton.dataset.resourceId, {
      preserveSearchScroll: true,
      focusResourceDetail: true,
    });
    return;
  }

  const scriptButton = event.target.closest("[data-script-mode]");
  if (scriptButton) {
    state.scriptMode = scriptButton.dataset.scriptMode;
    render({ preserveSearchScroll: true });
  }
});

root.addEventListener("input", (event) => {
  const scrubber = event.target.closest("[data-video-scrubber]");
  if (!scrubber) {
    return;
  }

  seekVideoFromScrubber(scrubber);
});

root.addEventListener("change", (event) => {
  const filterField = event.target.closest("[data-filter-field]");

  if (!filterField) {
    return;
  }

  updateFilter(filterField.dataset.filterField, filterField.value);
});

root.addEventListener("load", handlePlayerLoad, true);
root.addEventListener("loadedmetadata", handleVideoProgressEvent, true);
root.addEventListener("durationchange", handleVideoProgressEvent, true);
root.addEventListener("timeupdate", handleVideoProgressEvent, true);

window.addEventListener("hashchange", () => {
  const lessonId = getLessonIdFromHash();
  if (lessonId && workspace.lessonsById[lessonId] && lessonId !== state.lessonId) {
    state.lessonId = lessonId;
    state.selectedResourceId = null;
    render();
  }
});

render();

function render(options = {}) {
  const searchScrollTop =
    options.searchScrollTop ?? (options.preserveSearchScroll ? getSearchResultsScrollTop() : null);
  const lesson = workspace.lessonsById[state.lessonId] ?? workspace.lessons[0];
  const selectedResource = getSelectedResource(lesson);
  const packageResource =
    isImplementedResource(selectedResource)
      ? selectedResource
      : lesson.resources.find(isImplementedResource);

  root.innerHTML = `
    <div class="app-shell">
      ${renderSidebar()}
      <main class="workspace" aria-label="教师工作台">
        ${renderTopbar(lesson)}
        ${renderResourceSearch(selectedResource)}
        ${renderLessonHeader(lesson)}
        <div class="workspace-grid">
          <section class="section-block knowledge-block" aria-labelledby="knowledge-title">
            ${renderKnowledgeCard(lesson)}
          </section>
          <section class="section-block resources-block" aria-labelledby="resources-title">
            ${renderResources(lesson, selectedResource)}
          </section>
          <section
            class="section-block metadata-block ${selectedResource?.player?.isRunnable ? "has-player" : ""}"
            aria-labelledby="metadata-title"
            data-resource-detail-panel
            tabindex="-1"
          >
            ${renderResourceDetail(selectedResource)}
          </section>
          <section class="section-block script-block" aria-labelledby="script-title">
            ${renderScriptEntrypoints(packageResource, lesson)}
          </section>
        </div>
      </main>
    </div>
  `;

  if (searchScrollTop !== null) {
    restoreSearchResultsScrollTop(searchScrollTop);
  }

  if (options.focusResourceDetail) {
    focusResourceDetail();
  }
}

function renderResourceSearch(selectedResource) {
  const results = getFilteredResources();
  const options = getFilteredFacetOptions();

  return `
    <section class="section-block search-panel" aria-labelledby="search-title">
      <div class="section-heading">
        <h3 id="search-title">备课资源检索</h3>
        <span>${results.length} / ${workspace.resourceIndex.length} 个资源</span>
      </div>
      <div class="filter-grid">
        ${renderFilterSelect("册别", "volumeId", options.volumes, state.filters.volumeId)}
        ${renderFilterSelect("章节", "chapterId", options.chapters, state.filters.chapterId)}
        ${renderFilterSelect("课时", "lessonId", options.lessons, state.filters.lessonId)}
        ${renderFilterSelect("资源类型", "resourceType", options.resourceTypes, state.filters.resourceType)}
        ${renderFilterSelect("审核状态", "reviewStatus", options.reviewStatuses, state.filters.reviewStatus)}
        <button class="filter-reset" data-filter-reset type="button">清空</button>
      </div>
      ${renderSelectionStatus(selectedResource)}
      <div class="search-results" data-search-results aria-label="筛选结果">
        ${results.map(renderSearchResult).join("") || `<p class="muted">暂无匹配资源</p>`}
      </div>
    </section>
  `;
}

function renderSelectionStatus(resource) {
  if (!resource) {
    return "";
  }

  return `
    <div class="selection-status" data-selection-status>
      <div>
        <span>${state.selectedResourceId ? "已选资源" : "当前预览"}</span>
        <strong>${renderMathText(resource.title)}</strong>
        <small>${escapeHtml(resourceTypeLabel(resource.resourceType))} · ${escapeHtml(resourceAvailabilityLabel(resource))}</small>
      </div>
      <button type="button" data-preview-anchor>查看预览</button>
    </div>
  `;
}

function renderFilterSelect(label, field, options, value) {
  return `
    <label class="filter-field">
      <span>${escapeHtml(label)}</span>
      <select data-filter-field="${escapeHtml(field)}">
        <option value="">全部</option>
        ${options
          .map(
            (option) => `
              <option value="${escapeHtml(option.id)}" ${option.id === value ? "selected" : ""}>
                ${escapeHtml(option.label)}（${option.count}）
              </option>
            `,
          )
          .join("")}
      </select>
    </label>
  `;
}

function renderSearchResult(resource) {
  const selected = resource.id === state.selectedResourceId && resource.lessonId === state.lessonId;

  return `
    <button
      class="search-result ${selected ? "is-selected" : ""}"
      data-resource-result-id="${escapeHtml(resource.id)}"
      data-resource-result-lesson-id="${escapeHtml(resource.lessonId)}"
      aria-pressed="${selected ? "true" : "false"}"
      type="button"
    >
      <span class="resource-type ${escapeHtml(resource.resourceType)}">${escapeHtml(resourceTypeLabel(resource.resourceType))}</span>
      <span class="search-result-main">
        <strong>${renderMathText(resource.title)}</strong>
        <span>${renderMathText(`${resource.volumeTitle} / 第 ${resource.chapterNumber} 章 / ${resource.textbookRef} ${resource.lessonTitle}`)}</span>
      </span>
      <span class="quality-chips">
        ${resource.quality.displayStates
          .map((status) => `<span class="quality-chip ${escapeHtml(status)}">${escapeHtml(workflowStatusLabel(status))}</span>`)
          .join("")}
      </span>
    </button>
  `;
}

function renderSidebar() {
  return `
    <aside class="sidebar" aria-label="教材树">
      <div class="brand">
        <div class="brand-mark">sin</div>
        <div>
          <p class="brand-title">教师云平台</p>
          <p class="brand-subtitle">沪教版高中数学</p>
        </div>
      </div>
      <div class="tree-summary" aria-label="内容统计">
        <span>${workspace.summary.volumeCount} 册</span>
        <span>${workspace.summary.lessonCount} 课时</span>
        <span>${workspace.summary.implementedAppletCount} 个 Applet</span>
        <span>${workspace.summary.implementedManimCount ?? 0} 个 Manim</span>
        <span>${workspace.summary.implementedDiagnosisCount ?? 0} 个诊断</span>
      </div>
      <nav class="curriculum-tree">
        ${workspace.tree.volumes.map(renderVolume).join("")}
      </nav>
    </aside>
  `;
}

function renderVolume(volume) {
  const hasChapters = volume.chapters.length > 0;
  return `
    <section class="tree-volume">
      <div class="tree-volume-title">
        <span>${renderMathText(volume.title)}</span>
        <span class="status-dot ${volume.status === "mvp_focus" ? "is-active" : ""}">${escapeHtml(
          statusLabel(volume.status),
        )}</span>
      </div>
      ${
        hasChapters
          ? volume.chapters
              .map(
                (chapter) => `
                  <div class="tree-chapter">
                    <div class="tree-chapter-title">第 ${escapeHtml(chapter.number)} 章 ${renderMathText(
                      chapter.title,
                    )}</div>
                    ${chapter.sections.map(renderSection).join("")}
                  </div>
                `,
              )
              .join("")
          : `<p class="tree-empty">待人工核验目录</p>`
      }
    </section>
  `;
}

function renderSection(section) {
  return `
    <div class="tree-section">
      <div class="tree-section-title">${escapeHtml(section.textbookLabel)} ${renderMathText(section.title)}</div>
      <div class="tree-lessons">
        ${section.lessons
          .map(
            (lesson) => `
              <button class="tree-lesson ${lesson.id === state.lessonId ? "is-selected" : ""}" data-lesson-id="${escapeHtml(
                lesson.id,
              )}">
                <span>${escapeHtml(lesson.textbookRef)} ${renderMathText(lesson.title)}</span>
                <span class="lesson-resource-count">${lesson.resourceCount}</span>
              </button>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderTopbar(lesson) {
  return `
    <header class="topbar">
      <div>
        <h1>${renderMathText(workspace.project.name)}</h1>
      </div>
      <div class="source-strip" aria-label="数据来源">
        <span>课程图谱：${escapeHtml(workspace.sources.curriculum)}</span>
        <span>当前课时：${escapeHtml(lesson.id)}</span>
      </div>
    </header>
  `;
}

function renderLessonHeader(lesson) {
  return `
    <section class="lesson-header" aria-labelledby="lesson-title">
      <div>
        <p class="lesson-path">${renderMathText(lesson.volume.title)} / 第 ${escapeHtml(
          lesson.chapter.number,
        )} 章 / ${escapeHtml(lesson.section.textbookLabel)}</p>
        <h2 id="lesson-title">${escapeHtml(lesson.textbookRef)} ${renderMathText(lesson.title)}</h2>
      </div>
      <div class="lesson-meta">
        <span>${escapeHtml(statusLabel(lesson.status))}</span>
        <span>${escapeHtml(String(lesson.estimatedPeriods ?? "-"))} 课时</span>
        <span>${lesson.resources.length} 个资源入口</span>
      </div>
    </section>
  `;
}

function renderKnowledgeCard(lesson) {
  return `
    <div class="section-heading">
      <h3 id="knowledge-title">课时知识卡</h3>
      <span>${renderMathText(lesson.coreCompetencies.join(" / "))}</span>
    </div>
    <div class="knowledge-grid">
      ${renderInfoGroup("核心知识", lesson.coreKnowledge)}
      ${renderInfoGroup("先修知识", lesson.prerequisites)}
      ${renderInfoGroup("后续承接", lesson.successors)}
      ${renderInfoGroup("教学痛点", lesson.teachingPainPoints)}
      ${renderInfoGroup("诊断焦点", lesson.diagnosisFocus)}
    </div>
  `;
}

function renderResources(lesson, selectedResource) {
  return `
    <div class="section-heading">
      <h3 id="resources-title">资源卡片</h3>
      <span>Applet / Manim / Diagnosis</span>
    </div>
    <div class="resource-grid">
      ${lesson.resources.map((resource) => renderResourceCard(resource, selectedResource)).join("")}
    </div>
  `;
}

function renderResourceCard(resource, selectedResource) {
  const selected = resource.id === selectedResource?.id;
  return `
    <button class="resource-card ${selected ? "is-selected" : ""}" data-resource-id="${escapeHtml(resource.id)}">
      <span class="resource-type ${escapeHtml(resource.resourceType)}">${escapeHtml(
        resourceTypeLabel(resource.resourceType),
      )}</span>
      <strong>${renderMathText(resource.title)}</strong>
      <span class="resource-note">${renderMathText(resource.note)}</span>
      <span class="resource-footer">
        <span>${renderMathText(resource.cognitiveAction ?? "待定")}</span>
        <span>${escapeHtml(resourceAvailabilityLabel(resource))}</span>
      </span>
      <span class="quality-chips">
        ${resource.quality.displayStates
          .map((status) => `<span class="quality-chip ${escapeHtml(status)}">${escapeHtml(workflowStatusLabel(status))}</span>`)
          .join("")}
      </span>
    </button>
  `;
}

function renderResourceDetail(resource) {
  if (!resource) {
    return renderEmptyState("metadata-title", "请选择一个资源入口查看详情。");
  }

  if (!resource.metadataPreview) {
    return `
      <div class="section-heading">
        <h3 id="metadata-title">资源详情</h3>
        <span>${escapeHtml(resourceTypeLabel(resource.resourceType))}</span>
      </div>
      <div class="planned-preview">
        <p class="planned-title">${renderMathText(resource.title)}</p>
        <p>${renderMathText(resource.note)}</p>
        <p class="muted">该资源目前只有课程图谱中的规划入口，尚未创建资源包 metadata。</p>
      </div>
    `;
  }

  const metadata = resource.metadataPreview;
  return `
    <div class="section-heading">
      <h3 id="metadata-title">资源详情</h3>
      <span>${escapeHtml(metadata.id)}@${escapeHtml(metadata.version)}</span>
    </div>
    <div class="resource-detail-header">
      <div>
        <p class="detail-kicker">${escapeHtml(resourceTypeLabel(resource.resourceType))}</p>
        <h4>${renderMathText(resource.title)}</h4>
        ${resource.subtitle ? `<p>${renderMathText(resource.subtitle)}</p>` : ""}
      </div>
      <div class="detail-status">
        <span>${escapeHtml(resource.quality.labels.contentStatus)}</span>
        <span>${escapeHtml(resource.quality.labels.reviewStatus)}</span>
        <span>${escapeHtml(resourceAvailabilityLabel(resource))}</span>
      </div>
    </div>
    ${renderResourcePlayer(resource)}
    ${renderMetadataSummary(resource, metadata)}
    ${renderMetadataLayout(resource, metadata)}
  `;
}

function renderMetadataSummary(resource, metadata) {
  const stageLabel =
    resource.resourceType === "diagnosis" ? "题组阶段" : resource.resourceType === "manim_clip" ? "渲染/入口" : "实现阶段";
  const summaryItems = [
    ["内容状态", resource.quality.labels.contentStatus],
    [stageLabel, resource.quality.labels.implementationStage],
    ["审核状态", resource.quality.labels.reviewStatus],
  ];

  return `
    <div class="metadata-summary">
      ${summaryItems
        .map(
          ([label, value]) => `
            <div>
              <span class="field-label">${escapeHtml(label)}</span>
              <strong>${escapeHtml(value)}</strong>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderMetadataLayout(resource, metadata) {
  if (resource.resourceType === "manim_clip") {
    return `
      <div class="metadata-layout">
        <div>
          <h4>教学问题</h4>
          <p>${renderMathText(metadata.pedagogy.primaryTeachingProblem)}</p>
        </div>
        <div>
          <h4>分镜节奏</h4>
          ${renderBeatList(metadata.narrativeDesign.beats)}
        </div>
        <div>
          <h4>课堂暂停点</h4>
          ${renderPausePointList(metadata.narrativeDesign.pausePoints)}
        </div>
        <div>
          <h4>场景入口</h4>
          ${renderCompactList(
            [
              `scene.py：${resource.package.files.scene}`,
              `scene class：${metadata.renderPlan?.scene_class ?? "unknown"}`,
            ],
            { math: false },
          )}
        </div>
      </div>
    `;
  }

  if (resource.resourceType === "diagnosis") {
    return `
      <div class="metadata-layout">
        <div>
          <h4>诊断目标</h4>
          ${renderCompactList(metadata.diagnosisDesign.diagnosticFocus)}
        </div>
        <div>
          <h4>错因标签</h4>
          ${renderMisconceptionTags(metadata.diagnosisDesign.misconceptionTags)}
        </div>
        <div>
          <h4>题组摘要</h4>
          ${renderCompactList(
            [
              `题量：${metadata.diagnosisDesign.itemSummary?.totalItems ?? resource.package?.itemBank?.itemCount ?? 0} 题`,
              `题型：${(metadata.diagnosisDesign.itemSummary?.questionTypes ?? []).join(" / ") || "待补充"}`,
              `建议用时：${metadata.diagnosisDesign.itemSummary?.estimatedMinutes ?? resource.package?.itemBank?.estimatedMinutes ?? "-"} 分钟`,
              `总分：${resource.package?.itemBank?.totalScore ?? "-"} 分`,
            ],
            { math: false },
          )}
        </div>
        <div>
          <h4>反馈策略</h4>
          ${renderFeedbackStrategy(metadata.diagnosisDesign.feedbackStrategy)}
        </div>
      </div>
    `;
  }

  return `
    <div class="metadata-layout">
      <div>
        <h4>教学问题</h4>
        <p>${renderMathText(metadata.pedagogy.primaryTeachingProblem)}</p>
      </div>
      <div>
        <h4>课堂控制</h4>
        ${renderCompactList(metadata.interactionDesign.teacherControls)}
      </div>
      <div>
        <h4>分步揭示</h4>
        ${renderStepList(metadata.interactionDesign.stagedReveal)}
      </div>
      <div>
        <h4>运行态字段</h4>
        ${renderCompactList((metadata.dataContract?.state_variables ?? []).map((item) => `${item.name}：${item.description}`))}
      </div>
    </div>
  `;
}

function renderMisconceptionTags(tags) {
  if (!tags?.length) {
    return `<p class="muted">暂无</p>`;
  }

  return `
    <ul>
      ${tags
        .map((tag) => `<li><strong>${renderMathText(tag.title ?? tag.id)}</strong>：${renderMathText(tag.description ?? "")}</li>`)
        .join("")}
    </ul>
  `;
}

function renderFeedbackStrategy(strategy) {
  if (!strategy) {
    return `<p class="muted">暂无</p>`;
  }

  return renderCompactList([
    strategy.immediate_feedback ? `即时反馈：${strategy.immediate_feedback}` : null,
    strategy.teacher_dashboard_notes ? `教师看板：${strategy.teacher_dashboard_notes}` : null,
    ...(strategy.remediation_links ?? []).map((link) => `补救入口：${link}`),
  ].filter(Boolean));
}

function renderResourcePlayer(resource) {
  if (!resource.player?.isRunnable) {
    if (resource.resourceType === "diagnosis") {
      const itemSummary = resource.metadataPreview?.diagnosisDesign?.itemSummary;
      const itemBank = resource.package?.itemBank;
      return `
        <div class="planned-preview diagnosis-preview">
          <p class="planned-title">诊断题组已接入</p>
          <p>${renderMathText(
            `当前题组包含 ${itemSummary?.totalItems ?? itemBank?.itemCount ?? 0} 题，建议课堂 ${itemSummary?.estimatedMinutes ?? itemBank?.estimatedMinutes ?? "-"} 分钟完成；后续可升级为学生作答播放器。`,
          )}</p>
          <p class="entry-path">${escapeHtml(resource.package?.files?.itemBank ?? "")}</p>
        </div>
      `;
    }

    return `
      <div class="planned-preview">
        <p class="planned-title">${resource.resourceType === "manim_clip" ? "视频预览尚未就绪" : "真实课件预览尚未就绪"}</p>
        <p>${resource.resourceType === "manim_clip" ? "该 Manim 资源当前只有 metadata 与分镜信息，平台保留脚本入口和教学设计摘要。" : "该资源当前没有可运行的 HTML src 入口，平台保留 metadata 与规划说明。"}</p>
      </div>
    `;
  }

  if (resource.player.kind === "video") {
    const videoControlId = `video-progress-${resource.id}`;
    return `
      <div class="player-preview" aria-label="Manim 视频预览">
        <div class="player-preview-header">
          <div>
            <p class="detail-kicker">Manim 视频预览</p>
            <h4>${renderMathText(resource.player.title)}</h4>
          </div>
          <span>${escapeHtml(resource.player.sources[0]?.src ?? "")}</span>
        </div>
        <div class="video-frame-shell" data-video-player-shell>
          <video
            controls
            playsinline
            preload="metadata"
            data-video-player
            data-video-resource-id="${escapeHtml(resource.id)}"
            aria-describedby="${escapeHtml(videoControlId)}"
            ${resource.player.poster ? `poster="${escapeHtml(resource.player.poster)}"` : ""}
          >
            ${resource.player.sources
              .map((source) => `<source src="${escapeHtml(source.src)}" type="${escapeHtml(source.type)}" />`)
              .join("")}
          </video>
          <div class="video-scrubber" id="${escapeHtml(videoControlId)}">
            <label for="${escapeHtml(videoControlId)}-range">播放进度</label>
            <input
              id="${escapeHtml(videoControlId)}-range"
              type="range"
              min="0"
              max="1000"
              step="1"
              value="0"
              disabled
              data-video-scrubber
              aria-label="播放进度"
            />
            <span data-video-time>00:00 / --:--</span>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="player-preview" aria-label="真实课件预览">
      <div class="player-preview-header">
        <div>
          <p class="detail-kicker">真实课件预览</p>
          <h4>${renderMathText(resource.player.title)}</h4>
        </div>
        <span>${escapeHtml(resource.player.src)}</span>
      </div>
      <div class="player-frame-shell">
        <iframe
          title="${escapeHtml(resource.player.title)}"
          src="${escapeHtml(resource.player.src)}"
          sandbox="${escapeHtml(resource.player.sandbox)}"
          allow="fullscreen"
          data-player-resource-id="${escapeHtml(resource.id)}"
        ></iframe>
      </div>
    </div>
  `;
}

function renderScriptEntrypoints(resource, lesson) {
  if (!resource?.package) {
    return `
      <div class="section-heading">
        <h3 id="script-title">教师脚本与学生活动入口</h3>
        <span>${renderMathText(lesson.title)}</span>
      </div>
      <div class="planned-preview">
        <p class="planned-title">当前课时暂无已落地资源包</p>
        <p>资源入口来自课程图谱，可继续在样板包分支补齐 metadata、教师脚本和学生活动文件。</p>
      </div>
    `;
  }

  if (resource.resourceType === "manim_clip") {
    return `
      <div class="section-heading">
        <h3 id="script-title">Manim 分镜与场景入口</h3>
        <span>${escapeHtml(resource.package.path)}</span>
      </div>
      <article class="entry-preview">
        <p class="entry-path">${escapeHtml(resource.package.storyboard?.path ?? resource.package.files.scene)}</p>
        <h4>${renderMathText(resource.package.storyboard?.title ?? resource.title)}</h4>
        <p>${renderMathText(resource.package.storyboard?.summary || resource.subtitle || "")}</p>
        <div class="section-tags">
          ${(resource.package.storyboard?.sections ?? []).map((section) => `<span>${renderMathText(section)}</span>`).join("")}
        </div>
      </article>
    `;
  }

  if (resource.resourceType === "diagnosis") {
    return `
      <div class="section-heading">
        <h3 id="script-title">诊断题组与教师说明</h3>
        <span>${escapeHtml(resource.package.path)}</span>
      </div>
      <article class="entry-preview">
        <p class="entry-path">${escapeHtml(resource.package.files.itemBank)}</p>
        <h4>${renderMathText(resource.package.itemBank?.title ?? resource.title)}</h4>
        <p>${renderMathText(resource.package.teacherNotes?.summary || resource.subtitle || "")}</p>
        <div class="section-tags">
          ${(resource.package.teacherNotes?.sections ?? []).map((section) => `<span>${renderMathText(section)}</span>`).join("")}
          ${(resource.package.scoringRubric?.sections ?? []).map((section) => `<span>${renderMathText(section)}</span>`).join("")}
        </div>
      </article>
    `;
  }

  const entry = state.scriptMode === "teacher" ? resource.package.teacherScript : resource.package.studentTask;
  return `
    <div class="section-heading">
      <h3 id="script-title">教师脚本与学生活动入口</h3>
      <span>${escapeHtml(resource.package.path)}</span>
    </div>
    <div class="entry-tabs" role="tablist" aria-label="脚本入口">
      <button class="${state.scriptMode === "teacher" ? "is-selected" : ""}" data-script-mode="teacher">教师脚本</button>
      <button class="${state.scriptMode === "student" ? "is-selected" : ""}" data-script-mode="student">学生活动</button>
    </div>
    <article class="entry-preview">
      <p class="entry-path">${escapeHtml(entry.path)}</p>
      <h4>${renderMathText(entry.title)}</h4>
      <p>${renderMathText(entry.summary)}</p>
      <div class="section-tags">
        ${entry.sections.map((section) => `<span>${renderMathText(section)}</span>`).join("")}
      </div>
    </article>
  `;
}

function renderInfoGroup(title, items) {
  return `
    <section class="info-group">
      <h4>${renderMathText(title)}</h4>
      ${renderCompactList(items)}
    </section>
  `;
}

function renderCompactList(items, options = {}) {
  if (!items?.length) {
    return `<p class="muted">暂无</p>`;
  }

  const renderItem = options.math === false ? escapeHtml : renderMathText;

  return `
    <ul>
      ${items.map((item) => `<li>${renderItem(item)}</li>`).join("")}
    </ul>
  `;
}

function renderStepList(steps) {
  if (!steps?.length) {
    return `<p class="muted">暂无</p>`;
  }

  return `
    <ol>
      ${steps
        .map(
          (step) => `
            <li>
              <strong>${renderMathText(step.step)}</strong>
              <span>${renderMathText(step.description)}</span>
            </li>
          `,
        )
        .join("")}
    </ol>
  `;
}

function renderBeatList(beats) {
  if (!beats?.length) {
    return `<p class="muted">暂无</p>`;
  }

  return `
    <ol>
      ${beats
        .map(
          (beat) => `
            <li>
              <strong>${renderMathText(beat.title)}</strong>
              <span>${renderMathText(beat.purpose)}</span>
            </li>
          `,
        )
        .join("")}
    </ol>
  `;
}

function renderPausePointList(pausePoints) {
  if (!pausePoints?.length) {
    return `<p class="muted">暂无</p>`;
  }

  return `
    <ul>
      ${pausePoints
        .map((point) => `<li>${escapeHtml(point.after_beat)}：${renderMathText(point.teacher_prompt)}</li>`)
        .join("")}
    </ul>
  `;
}

function renderEmptyState(titleId, message) {
  return `
    <div class="section-heading">
      <h3 id="${escapeHtml(titleId)}">资源详情</h3>
      <span>未选择</span>
    </div>
    <p class="muted">${renderMathText(message)}</p>
  `;
}

function handlePlayerLoad(event) {
  const iframe = event.target;
  if (!(iframe instanceof HTMLIFrameElement) || !iframe.dataset.playerResourceId) {
    return;
  }

  const resource = findResourceById(iframe.dataset.playerResourceId);
  if (!resource?.player?.isRunnable || resource.player.kind !== "iframe" || !iframe.contentWindow) {
    return;
  }

  iframe.contentWindow.postMessage(
    buildPlayerMessage(resource, {
      metadata: resource.metadataPreview,
      mode: "preview",
      initialState: {},
      display: {
        width: Math.round(iframe.clientWidth),
        height: Math.round(iframe.clientHeight),
        devicePixelRatio: window.devicePixelRatio || 1,
      },
      capabilities: {
        statePersistence: false,
        fullscreen: true,
        print: false,
      },
    }),
    window.location.origin,
  );
}

function buildPlayerMessage(resource, payload) {
  playerSeq += 1;
  return {
    sdk: "sh-hs-math-applet-sdk",
    sdkVersion: "0.1.0",
    resourceId: resource.id,
    instanceId: `workspace-preview-${resource.id}`,
    type: "player:init",
    seq: playerSeq,
    timestamp: new Date().toISOString(),
    payload,
  };
}

function findResourceById(resourceId) {
  return workspace.lessons.flatMap((lesson) => lesson.resources).find((resource) => resource.id === resourceId);
}

function getSelectedResource(lesson) {
  if (!lesson.resources.length) {
    return null;
  }

  const selected = lesson.resources.find((resource) => resource.id === state.selectedResourceId);
  if (selected) {
    return selected;
  }

  return lesson.resources.find(isImplementedResource) ?? lesson.resources[0];
}

function selectResource(resourceId, options = {}) {
  state.selectedResourceId = resourceId;
  render({
    ...options,
    searchScrollTop:
      options.searchScrollTop ?? (options.preserveSearchScroll ? getSearchResultsScrollTop() : null),
  });
}

function setLesson(lessonId, options = {}) {
  if (!workspace.lessonsById[lessonId]) {
    return;
  }

  const searchScrollTop =
    options.searchScrollTop ?? (options.preserveSearchScroll ? getSearchResultsScrollTop() : null);
  const nextHash = `#lesson=${encodeURIComponent(lessonId)}`;

  state.lessonId = lessonId;
  state.selectedResourceId = options.selectedResourceId ?? null;

  if (window.location.hash !== nextHash) {
    history.pushState(null, "", nextHash);
  }

  render({
    preserveSearchScroll: options.preserveSearchScroll,
    searchScrollTop,
    focusResourceDetail: options.focusResourceDetail,
  });
}

function updateFilter(field, value) {
  if (!(field in state.filters)) {
    return;
  }

  state.filters[field] = value;

  if (field === "volumeId") {
    const chapter = workspace.resourceFacets.chapters.find((option) => option.id === state.filters.chapterId);
    const lesson = workspace.resourceFacets.lessons.find((option) => option.id === state.filters.lessonId);

    if (chapter && chapter.volumeId !== value) {
      state.filters.chapterId = "";
    }

    if (lesson && lesson.volumeId !== value) {
      state.filters.lessonId = "";
    }
  }

  if (field === "chapterId") {
    const lesson = workspace.resourceFacets.lessons.find((option) => option.id === state.filters.lessonId);

    if (lesson && lesson.chapterId !== value) {
      state.filters.lessonId = "";
    }
  }

  if (field === "lessonId" && value && workspace.lessonsById[value]) {
    state.lessonId = value;
    state.selectedResourceId = null;
    history.pushState(null, "", `#lesson=${encodeURIComponent(value)}`);
  }

  render();
}

function clearFilters() {
  state.filters = {
    volumeId: "",
    chapterId: "",
    lessonId: "",
    resourceType: "",
    reviewStatus: "",
  };
  render();
}

function getFilteredFacetOptions() {
  const { volumeId, chapterId } = state.filters;

  return {
    volumes: workspace.resourceFacets.volumes,
    chapters: workspace.resourceFacets.chapters.filter((option) => !volumeId || option.volumeId === volumeId),
    lessons: workspace.resourceFacets.lessons.filter(
      (option) => (!volumeId || option.volumeId === volumeId) && (!chapterId || option.chapterId === chapterId),
    ),
    resourceTypes: workspace.resourceFacets.resourceTypes,
    reviewStatuses: workspace.resourceFacets.reviewStatuses,
  };
}

function getFilteredResources() {
  return workspace.resourceIndex.filter((resource) => {
    const { volumeId, chapterId, lessonId, resourceType, reviewStatus } = state.filters;

    return (
      (!volumeId || resource.volumeId === volumeId) &&
      (!chapterId || resource.chapterId === chapterId) &&
      (!lessonId || resource.lessonId === lessonId) &&
      (!resourceType || resource.resourceType === resourceType) &&
      (!reviewStatus || resource.quality.reviewStatus === reviewStatus)
    );
  });
}

function getSearchResultsScrollTop() {
  return root.querySelector("[data-search-results]")?.scrollTop ?? 0;
}

function restoreSearchResultsScrollTop(scrollTop) {
  afterNextPaint(() => {
    const searchResults = root.querySelector("[data-search-results]");
    if (searchResults) {
      searchResults.scrollTop = scrollTop;
    }
  });
}

function focusResourceDetail() {
  afterNextPaint(() => {
    const detailPanel = root.querySelector("[data-resource-detail-panel]");
    if (!detailPanel) {
      return;
    }

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    detailPanel.scrollIntoView({
      block: "start",
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
    detailPanel.focus({ preventScroll: true });
  });
}

function afterNextPaint(callback) {
  if (typeof window.requestAnimationFrame === "function") {
    window.requestAnimationFrame(callback);
    return;
  }

  window.setTimeout(callback, 0);
}

function handleVideoProgressEvent(event) {
  const video = event.target.closest?.("[data-video-player]");
  if (!video) {
    return;
  }

  syncVideoScrubber(video);
}

function seekVideoFromScrubber(scrubber) {
  const video = scrubber.closest("[data-video-player-shell]")?.querySelector("[data-video-player]");
  const duration = video?.duration;

  if (!video || !Number.isFinite(duration) || duration <= 0) {
    return;
  }

  const max = Number(scrubber.max || 1000);
  const progress = Number(scrubber.value) / max;
  video.currentTime = Math.min(duration, Math.max(0, duration * progress));
  syncVideoScrubber(video);
}

function syncVideoScrubber(video) {
  const shell = video.closest("[data-video-player-shell]");
  const scrubber = shell?.querySelector("[data-video-scrubber]");
  const timeLabel = shell?.querySelector("[data-video-time]");

  if (!scrubber) {
    return;
  }

  const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 0;
  const currentTime = Number.isFinite(video.currentTime) ? video.currentTime : 0;
  const max = Number(scrubber.max || 1000);

  scrubber.disabled = duration <= 0;

  if (duration > 0 && document.activeElement !== scrubber) {
    scrubber.value = String(Math.round((currentTime / duration) * max));
  }

  if (timeLabel) {
    timeLabel.textContent = `${formatVideoTime(currentTime)} / ${duration > 0 ? formatVideoTime(duration) : "--:--"}`;
  }
}

function formatVideoTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "00:00";
  }

  const totalSeconds = Math.floor(seconds);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const remainingSeconds = totalSeconds % 60;
  const minuteText = hours > 0 ? String(minutes).padStart(2, "0") : String(minutes);
  const secondText = String(remainingSeconds).padStart(2, "0");

  if (hours > 0) {
    return `${hours}:${minuteText}:${secondText}`;
  }

  return `${minuteText}:${secondText}`;
}

function getInitialLessonId() {
  const hashLessonId = getLessonIdFromHash();
  if (hashLessonId && workspace.lessonsById[hashLessonId]) {
    return hashLessonId;
  }

  return workspace.mvp?.focus_lessons?.[0]?.id ?? workspace.lessons[0]?.id;
}

function getLessonIdFromHash() {
  const hash = window.location.hash.replace(/^#/, "");
  const params = new URLSearchParams(hash);
  return params.get("lesson");
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

function resourceAvailabilityLabel(resource) {
  if (resource.quality?.readinessLabel) {
    return resource.quality.readinessLabel;
  }

  if (resource.player?.kind === "iframe") {
    return "可运行预览";
  }

  if (resource.player?.kind === "video") {
    return "视频已就绪";
  }

  if (resource.availability === "metadata_ready") {
    return "metadata 已就绪";
  }

  if (resource.availability === "item_bank_ready") {
    return "题组已就绪";
  }

  if (resource.availability === "interactive_ready") {
    return "互动诊断可用";
  }

  if (resource.availability === "video_ready") {
    return "视频待补档";
  }

  return "规划中";
}

function isImplementedResource(resource) {
  return ["metadata_ready", "video_ready", "item_bank_ready", "interactive_ready"].includes(resource?.availability);
}

function statusLabel(status) {
  return (
    {
      draft: "草稿",
      planned: "规划中",
      mvp_focus: "MVP",
      needs_manual_verification: "待核验",
    }[status] ?? status
  );
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
