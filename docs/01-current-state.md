# 当前状态

更新时间：2026-05-01

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
- 已在 `track/trig-sample-pack` 上为 `SH-HS-MATH-HJ-B2-C07-L02-A01` 创建“正弦函数性质探究”资源包草稿：
  - 已包含 `metadata.yaml`、`README.md`、`teacher-script.md`、`student-task.md`、`review.md`。
  - 已新增 `src/index.html` 可运行原型，支持正弦图像动点拖拽、`x` 滑块、播放/暂停、重置、周期段 `k` 选择，以及周期比较、单调区间、对称元素、关键点和性质归纳的分步揭示。
  - 资源聚焦“比较”这一认知动作，对应 7.1.2“正弦函数的性质”的三个痛点：单调区间端点、对称轴/中心混淆、零点和最值点周期遗漏。
  - 当前仍为 `draft`，尚未进入数学审校、课堂节奏试读或浏览器交互复核。
- 已在 `track/review-system` 上为 `SH-HS-MATH-HJ-B2-C07-L02-D01` 创建“正弦函数性质诊断”资源包草稿：
  - 已包含 `metadata.yaml`、`README.md`、`item-bank.yaml`、`scoring-rubric.md`、`teacher-notes.md`、`review.md`。
  - 资源聚焦“比较”这一认知动作，围绕周期遗漏、单调区间端点混淆、对称轴/中心混淆、零点和最值点一般式遗漏设计 6 题即时诊断。
  - `platform_card.availability` 当前为 `item_bank_ready`，可先用于题组摘要和错因标签预览；后续诊断播放器接入后再升级到 `interactive_ready`。
  - 当前仍为 `draft` / `self_checked_draft`，尚未进入数学审校、教研试读或课堂试用。
- 已在 `track/trig-sample-pack` 上为 `SH-HS-MATH-HJ-B2-C07-L05-A01` 创建“三角函数参数变化实验室”资源包草稿：
  - 已包含 `metadata.yaml`、`README.md`、`teacher-script.md`、`student-task.md`、`review.md`。
  - 已新增 `src/index.html` 可运行原型，支持调节 `A`、`omega`、`phi`，单参数观察、变换顺序切换、关键点追踪、观察点拖动和参数归纳。
  - 资源聚焦“变换”这一认知动作，对应 7.3“函数 y = A sin(omega x + phi) 的图像”的三个痛点：横向伸缩和平移方向混淆、多参数认知负荷、从图像反推参数干扰。
  - 当前仍为 `draft`，尚未进入数学审校、课堂节奏试读或更完整的浏览器交互复核。
- 已在 `track/applet-sdk` 上创建 Applet SDK v0.1 契约草稿：
  - `packages/applet-sdk/schemas/applet-metadata.schema.json` 定义 Applet metadata schema。
  - `packages/applet-sdk/docs/resource-package.md` 定义 Applet 资源包目录规范。
  - `packages/applet-sdk/docs/status-fields.md` 定义资源生命周期、实现阶段、审核状态和运行态状态变量。
  - `packages/applet-sdk/docs/event-protocol.md` 定义播放器与 Applet 的 `postMessage` 事件协议。
  - `packages/applet-sdk/docs/player-embed-contract.md` 定义 iframe 播放器嵌入契约。
- 已在 `track/manim-pipeline` 上创建 Manim 流水线第一步：
  - `packages/manim-pipeline/schemas/manim-clip-metadata.schema.json` 定义 Manim Clip metadata schema 草稿。
  - `packages/manim-pipeline/docs/resource-package.md` 定义 Manim 资源包目录结构、草稿阶段和渲染阶段字段。
  - `packages/manim-pipeline/docs/render-export-and-platform-card.md` 说明如何导出 `mp4` / `webm` / poster，并说明后续如何接入平台资源卡。
  - `content/manim/SH-HS-MATH-HJ-B2-C07-L01-M01/` 已创建“正弦曲线的来源”资源包，包含 `metadata.yaml`、`README.md`、`storyboard.md`、`scene.py`、`review.md` 和 `dist/final/` 视频产物。
  - 当前 Manim 资源仍为 `draft` 内容状态，但渲染阶段已到 `video_ready`：已导出 1080p30 `mp4`、`webm` 和 poster，可用于平台预览和内部教研复核。
- 已在 `track/platform-shell` 上搭建教师端平台壳 MVP：
  - 根目录新增 npm/Vite 工程脚本，`apps/web` 为教师工作台入口。
  - `apps/web/src/lib/content.js` 可读取 `content/curriculum/index.yaml`、`content/applets/*/metadata.yaml` 和 `content/manim/*/metadata.yaml`，生成平台需要的课程树、课时资源卡、metadata 预览和脚本入口数据。
  - 平台壳现可识别 `files.src_entry` 且 `implementation.html_src_status: runnable` 的 Applet 资源，并在教师工作台资源详情区提供 iframe 真实课件预览。
  - 平台壳现可识别 Manim `platform_card.availability: video_ready` 且 `files.output_webm` / `files.output_mp4` 存在的资源，并在教师工作台资源详情区提供 `<video>` 预览。
  - `apps/web/src/data/workspace-data.json` 由 `npm run generate:content` 生成，供前端静态读取。
  - 页面已包含教材树、课时知识卡、资源卡片、样板 Applet metadata 预览、真实 Applet iframe 预览、样板 Manim 视频预览、教师脚本、学生活动和 Manim 分镜入口；Diagnosis 资源包已开始落地，但平台壳尚未读取 `content/diagnosis/*/metadata.yaml`，因此课时页中 Diagnosis 入口仍显示规划中占位。
- 已创建首版内容校验闸门：
  - `scripts/validate-content.js` 会读取课程图谱、Applet metadata、Manim metadata 和 Diagnosis metadata。
  - 已接入 Applet / Manim / Diagnosis JSON Schema 校验，并额外检查资源 ID 命名、目录名一致性、课时归属、课程图谱 `proposed_resource_id` 对齐、声明文件存在性。
  - Manim `video_ready` 资源会检查 `render_plan.phase: rendered`，并确认 `files.output_mp4`、`files.output_webm` 和 `files.poster` 都位于 `dist/final/` 且真实存在。
  - Diagnosis 资源包首期要求 `README.md`、`item-bank.yaml`、`scoring-rubric.md`、`teacher-notes.md` 和 `review.md`，并校验错因标签、题组摘要、反馈策略和评分规则。
  - `npm run verify` 现在会先执行 `npm run validate:content`，再运行测试和平台构建。
- 已创建首版资源工厂工作流：
  - `scripts/generate-resource-backlog.js` 会从 `content/curriculum/index.yaml` 的 `digital_entry_points` 和已落地的 Applet / Manim / Diagnosis 资源包生成生产 backlog。
  - `content/production/resource-backlog.json` 当前列出必修第二册第 7 章 15 个资源工作单元，其中 5 个已实现、10 个待创建；Applet 为 3 个已实现、5 个待创建；Manim 为 1 个已实现、2 个待创建；Diagnosis 为 1 个已实现、3 个待创建；每个 item 都包含推荐分支、下一步动作和可复制到新 Codex 对话的 `threadPrompt`。
  - `scripts/scaffold-resource-packages.js` 提供首版批量资源骨架生成能力：当前支持 Diagnosis planned item 的 dry-run、按数量或 ID 生成、避免覆盖已有资源包。
  - `npm run generate:backlog` 已加入脚本，`npm run verify` 现在会先校验内容、生成 backlog，再运行测试和平台构建。
  - `docs/resource-factory-workflow.md` 记录了课程图谱 -> backlog -> 单资源对话 -> 校验 -> 合并的半自动生产流程。

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
- `content/diagnosis/`：诊断任务资产入口。
- `content/production/`：资源生产 backlog 和后续调度数据入口。
- `apps/web`：教师端平台壳 MVP，当前读取课程图谱和样板资源包生成工作台。
- `apps/`：后续继续承载独立课件播放器和其他前端入口。
- `packages/`：后续共享 SDK、引擎适配和 schema。
- `scripts/`：内容校验、生成和导出工具。

## 当前尚未完成

- 尚未正式核验沪教版教材全册课时目录。
- 必修第二册第 7 章目录已完成首版结构化整理，但尚未完成纸质教材人工终核。
- 第 7 章的前置章节节点、第 8 章平面向量和第 9 章复数等后续节点仍是引用占位，尚未展开为完整图谱。
- 尚未创建独立课件播放器；教师工作台内已完成样板 Applet iframe 预览接入，但尚未沉淀为独立 `apps/player`。
- 已创建三个可运行 HTML Applet 原型，并已接入平台壳 iframe 预览；尚未完成数学审校、课堂节奏试读和浏览器交互复核。
- 已创建第一个 Manim 场景脚本并导出可播放 `mp4` / `webm` / poster；尚未完成数学审校或课堂试用。
- 已将 Applet、Manim 和 Diagnosis metadata JSON Schema 接入首版自动校验脚本。
- 已建立首版资源生产 backlog，可按单个资源工作单元开启新对话，避免全高中内容挤在一个上下文中；首个 Diagnosis 资源包已落地为 `item_bank_ready`，并已补充 Diagnosis scaffold 命令以减少后续手工建目录成本。
- 平台壳已读取 `content/manim/*/metadata.yaml` 并渲染样板 Manim 视频资源卡；尚未沉淀为独立播放器或接入播放器级学习状态记录。
- 尚未配置 GitHub 分支保护规则。

## 继续工作时优先读取

每次新的 Codex 会话应先读取：

1. `docs/00-project-brief.md`
2. `docs/01-current-state.md`
3. `docs/02-next-actions.md`
4. `docs/git-workflow.md`
5. `docs/content-standards.md`
6. `docs/codex-collaboration-guide.md`
7. `docs/resource-factory-workflow.md`
8. `docs/thread-starter-prompts.md`
9. `content/curriculum/index.yaml`
10. `content/production/resource-backlog.json`
