import workspace from "./data/workspace-data.json";
import "./styles.css";

const root = document.querySelector("#app");

const state = {
  lessonId: getInitialLessonId(),
  selectedResourceId: null,
  scriptMode: "teacher",
};

let playerSeq = 0;

root.addEventListener("click", (event) => {
  const lessonButton = event.target.closest("[data-lesson-id]");
  if (lessonButton) {
    setLesson(lessonButton.dataset.lessonId);
    return;
  }

  const resourceButton = event.target.closest("[data-resource-id]");
  if (resourceButton) {
    state.selectedResourceId = resourceButton.dataset.resourceId;
    render();
    return;
  }

  const scriptButton = event.target.closest("[data-script-mode]");
  if (scriptButton) {
    state.scriptMode = scriptButton.dataset.scriptMode;
    render();
  }
});

root.addEventListener("load", handlePlayerLoad, true);

window.addEventListener("hashchange", () => {
  const lessonId = getLessonIdFromHash();
  if (lessonId && workspace.lessonsById[lessonId] && lessonId !== state.lessonId) {
    state.lessonId = lessonId;
    state.selectedResourceId = null;
    render();
  }
});

render();

function render() {
  const lesson = workspace.lessonsById[state.lessonId] ?? workspace.lessons[0];
  const selectedResource = getSelectedResource(lesson);
  const packageResource =
    selectedResource?.availability === "metadata_ready"
      ? selectedResource
      : lesson.resources.find((resource) => resource.availability === "metadata_ready");

  root.innerHTML = `
    <div class="app-shell">
      ${renderSidebar()}
      <main class="workspace" aria-label="教师工作台">
        ${renderTopbar(lesson)}
        ${renderLessonHeader(lesson)}
        <div class="workspace-grid">
          <section class="section-block knowledge-block" aria-labelledby="knowledge-title">
            ${renderKnowledgeCard(lesson)}
          </section>
          <section class="section-block resources-block" aria-labelledby="resources-title">
            ${renderResources(lesson, selectedResource)}
          </section>
          <section class="section-block metadata-block" aria-labelledby="metadata-title">
            ${renderResourceDetail(selectedResource)}
          </section>
          <section class="section-block script-block" aria-labelledby="script-title">
            ${renderScriptEntrypoints(packageResource, lesson)}
          </section>
        </div>
      </main>
    </div>
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
        <span>${workspace.summary.implementedAppletCount} 个样板包</span>
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
        <span>${escapeHtml(volume.title)}</span>
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
                    <div class="tree-chapter-title">第 ${escapeHtml(chapter.number)} 章 ${escapeHtml(
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
      <div class="tree-section-title">${escapeHtml(section.textbookLabel)} ${escapeHtml(section.title)}</div>
      <div class="tree-lessons">
        ${section.lessons
          .map(
            (lesson) => `
              <button class="tree-lesson ${lesson.id === state.lessonId ? "is-selected" : ""}" data-lesson-id="${escapeHtml(
                lesson.id,
              )}">
                <span>${escapeHtml(lesson.textbookRef)} ${escapeHtml(lesson.title)}</span>
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
        <h1>${escapeHtml(workspace.project.name)}</h1>
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
        <p class="lesson-path">${escapeHtml(lesson.volume.title)} / 第 ${escapeHtml(
          lesson.chapter.number,
        )} 章 / ${escapeHtml(lesson.section.textbookLabel)}</p>
        <h2 id="lesson-title">${escapeHtml(lesson.textbookRef)} ${escapeHtml(lesson.title)}</h2>
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
      <span>${escapeHtml(lesson.coreCompetencies.join(" / "))}</span>
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
      <strong>${escapeHtml(resource.title)}</strong>
      <span class="resource-note">${escapeHtml(resource.note)}</span>
      <span class="resource-footer">
        <span>${escapeHtml(resource.cognitiveAction ?? "待定")}</span>
        <span>${escapeHtml(resourceAvailabilityLabel(resource))}</span>
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
        <p class="planned-title">${escapeHtml(resource.title)}</p>
        <p>${escapeHtml(resource.note)}</p>
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
        <h4>${escapeHtml(resource.title)}</h4>
        ${resource.subtitle ? `<p>${escapeHtml(resource.subtitle)}</p>` : ""}
      </div>
      <div class="detail-status">
        <span>${escapeHtml(statusLabel(resource.status))}</span>
        <span>${escapeHtml(resourceAvailabilityLabel(resource))}</span>
      </div>
    </div>
    ${renderAppletPlayer(resource)}
    <div class="metadata-summary">
      <div>
        <span class="field-label">状态</span>
        <strong>${escapeHtml(statusLabel(metadata.status))}</strong>
      </div>
      <div>
        <span class="field-label">实现阶段</span>
        <strong>${escapeHtml(metadata.implementation?.phase ?? "unknown")}</strong>
      </div>
      <div>
        <span class="field-label">HTML src</span>
        <strong>${escapeHtml(metadata.implementation?.html_src_status ?? "unknown")}</strong>
      </div>
    </div>
    <div class="metadata-layout">
      <div>
        <h4>教学问题</h4>
        <p>${escapeHtml(metadata.pedagogy.primaryTeachingProblem)}</p>
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

function renderAppletPlayer(resource) {
  if (!resource.player?.isRunnable) {
    return `
      <div class="planned-preview">
        <p class="planned-title">真实课件预览尚未就绪</p>
        <p>该资源当前没有可运行的 HTML src 入口，平台保留 metadata 与规划说明。</p>
      </div>
    `;
  }

  return `
    <div class="player-preview" aria-label="真实课件预览">
      <div class="player-preview-header">
        <div>
          <p class="detail-kicker">真实课件预览</p>
          <h4>${escapeHtml(resource.player.title)}</h4>
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
        <span>${escapeHtml(lesson.title)}</span>
      </div>
      <div class="planned-preview">
        <p class="planned-title">当前课时暂无已落地资源包</p>
        <p>资源入口来自课程图谱，可继续在样板包分支补齐 metadata、教师脚本和学生活动文件。</p>
      </div>
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
      <h4>${escapeHtml(entry.title)}</h4>
      <p>${escapeHtml(entry.summary)}</p>
      <div class="section-tags">
        ${entry.sections.map((section) => `<span>${escapeHtml(section)}</span>`).join("")}
      </div>
    </article>
  `;
}

function renderInfoGroup(title, items) {
  return `
    <section class="info-group">
      <h4>${escapeHtml(title)}</h4>
      ${renderCompactList(items)}
    </section>
  `;
}

function renderCompactList(items) {
  if (!items?.length) {
    return `<p class="muted">暂无</p>`;
  }

  return `
    <ul>
      ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
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
              <strong>${escapeHtml(step.step)}</strong>
              <span>${escapeHtml(step.description)}</span>
            </li>
          `,
        )
        .join("")}
    </ol>
  `;
}

function renderEmptyState(titleId, message) {
  return `
    <div class="section-heading">
      <h3 id="${escapeHtml(titleId)}">资源详情</h3>
      <span>未选择</span>
    </div>
    <p class="muted">${escapeHtml(message)}</p>
  `;
}

function handlePlayerLoad(event) {
  const iframe = event.target;
  if (!(iframe instanceof HTMLIFrameElement) || !iframe.dataset.playerResourceId) {
    return;
  }

  const resource = findResourceById(iframe.dataset.playerResourceId);
  if (!resource?.player?.isRunnable || !iframe.contentWindow) {
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

  return lesson.resources.find((resource) => resource.availability === "metadata_ready") ?? lesson.resources[0];
}

function setLesson(lessonId) {
  if (!workspace.lessonsById[lessonId]) {
    return;
  }

  state.lessonId = lessonId;
  state.selectedResourceId = null;
  history.pushState(null, "", `#lesson=${encodeURIComponent(lessonId)}`);
  render();
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
  if (resource.player?.isRunnable) {
    return "可运行预览";
  }

  return resource.availability === "metadata_ready" ? "metadata 已就绪" : "规划中";
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

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[character];
  });
}
