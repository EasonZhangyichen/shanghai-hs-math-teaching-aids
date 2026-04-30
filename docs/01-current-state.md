# 当前状态

更新时间：2026-04-30

## 已有输入

- 根目录包含两份研究文档：
  - `下面是一份可直接作为产品立项蓝图.docx`
  - `针对沪教版高中数学的交互式数字化教具聚合平台研发与架构深度研究报告.docx`
- 已确认采用路线 2：课时知识图谱 + 多引擎微课件平台。
- 已确认首期建议从必修第二册第 7 章“三角函数”样板包开始。
- 已在 `track/curriculum-map` 上为必修第二册第 7 章建立首版结构化课程图谱：
  - 章节主干：7.1 正弦函数图像与性质、7.2 余弦函数图像与性质、7.3 `y = A sin(omega x + phi)` 图像、7.4 正切函数图像与性质。
  - 课时节点：`SH-HS-MATH-HJ-B2-C07-L01` 至 `SH-HS-MATH-HJ-B2-C07-L07`。
  - 已标注每个课时的先修、后续、教学痛点、数字化切入点、诊断焦点和核心素养。
  - 章节目录目前基于公开教材目录与课程资源目录交叉核对，仍需教师用纸质教材最终确认课时划分和课时数。
- 已在 `track/trig-sample-pack` 上为 `SH-HS-MATH-HJ-B2-C07-L01-A01` 创建“单位圆到正弦曲线”资源包草稿：
  - 已包含 `metadata.yaml`、`README.md`、`teacher-script.md`、`student-task.md`、`review.md`。
  - 已新增 `src/index.html` 可运行原型，支持单位圆动点拖拽、`theta` 滑块、播放/暂停、重置、投影线、轨迹、关键点和周期延拓。
  - 当前仍为 `draft`，尚未进入数学审校或课堂试用。
- 已在 `track/applet-sdk` 上创建 Applet SDK v0.1 契约草稿：
  - `packages/applet-sdk/schemas/applet-metadata.schema.json` 定义 Applet metadata schema。
  - `packages/applet-sdk/docs/resource-package.md` 定义 Applet 资源包目录规范。
  - `packages/applet-sdk/docs/status-fields.md` 定义资源生命周期、实现阶段、审核状态和运行态状态变量。
  - `packages/applet-sdk/docs/event-protocol.md` 定义播放器与 Applet 的 `postMessage` 事件协议。
  - `packages/applet-sdk/docs/player-embed-contract.md` 定义 iframe 播放器嵌入契约。
- 已在 `track/platform-shell` 上搭建教师端平台壳 MVP：
  - 根目录新增 npm/Vite 工程脚本，`apps/web` 为教师工作台入口。
  - `apps/web/src/lib/content.js` 可读取 `content/curriculum/index.yaml` 和 `content/applets/*/metadata.yaml`，生成平台需要的课程树、课时资源卡、metadata 预览和脚本入口数据。
  - `apps/web/src/data/workspace-data.json` 由 `npm run generate:content` 生成，供前端静态读取。
  - 页面已包含教材树、课时知识卡、资源卡片、样板 Applet metadata 预览、教师脚本与学生活动入口；真实 Applet 交互暂不实现。

## 已建立的项目骨架

- Git 仓库已初始化，默认稳定分支为 `main`，当前日常开发分支为 `develop`。
- 本仓库 Git 提交身份已配置为 `EasonZhangyichen <easonzhangyc1008@gmail.com>`。
- GitHub 远程仓库已配置并完成初始推送：
  - `origin`: `https://github.com/EasonZhangyichen/shanghai-hs-math-teaching-aids.git`
  - 远程默认分支：`main`
  - 可见性：public
  - 已推送分支：`main`、`develop`、`release/v0.1-trig-mvp`、全部 `track/*` 分支
  - 已推送标签：`v0.0.0-bootstrap`
- 已创建长期分支：
  - `release/v0.1-trig-mvp`
  - `track/curriculum-map`
  - `track/trig-sample-pack`
  - `track/applet-sdk`
  - `track/manim-pipeline`
  - `track/platform-shell`
  - `track/review-system`
  - `track/design-system`
- `docs/`：长期上下文、计划、架构决策、内容标准。
- `content/curriculum/`：沪教版课程图谱数据入口。
- `content/applets/`：HTML 交互课件资产入口。
- `content/manim/`：Manim 动画资产入口。
- `apps/web`：教师端平台壳 MVP，当前读取课程图谱和样板资源包生成工作台。
- `apps/`：后续继续承载独立课件播放器和其他前端入口。
- `packages/`：后续共享 SDK、引擎适配和 schema。
- `scripts/`：后续校验、生成和导出工具。

## 当前尚未完成

- 尚未正式核验沪教版教材全册课时目录。
- 必修第二册第 7 章目录已完成首版结构化整理，但尚未完成纸质教材人工终核。
- 第 7 章的前置章节节点、第 8 章平面向量和第 9 章复数等后续节点仍是引用占位，尚未展开为完整图谱。
- 尚未创建独立课件播放器和平台内真实 Applet iframe 运行态。
- 已创建第一个可运行 HTML Applet 原型，但尚未完成播放器接入、数学审校和课堂试用。
- 尚未创建可运行 Manim 动画。
- 尚未将 Applet metadata JSON Schema 接入自动校验脚本。
- 尚未配置 GitHub 分支保护规则。

## 继续工作时优先读取

每次新的 Codex 会话应先读取：

1. `docs/00-project-brief.md`
2. `docs/01-current-state.md`
3. `docs/02-next-actions.md`
4. `docs/git-workflow.md`
5. `docs/content-standards.md`
6. `docs/codex-collaboration-guide.md`
7. `docs/thread-starter-prompts.md`
8. `content/curriculum/index.yaml`
