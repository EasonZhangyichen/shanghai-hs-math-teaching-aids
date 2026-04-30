# Codex 分支对话启动提示词

## 使用方式

每次开启新对话时，先复制“通用启动提示词”。如果已经明确任务，再追加对应分支的“专项任务提示词”。

不要让多个对话同时改同一个分支。如果要并行推进，优先让每个对话处理不同 `track/*` 分支。

## 通用启动提示词

```text
请先读取 docs/00-project-brief.md、docs/01-current-state.md、docs/02-next-actions.md、docs/git-workflow.md、docs/content-standards.md、docs/codex-collaboration-guide.md、docs/resource-factory-workflow.md、docs/thread-starter-prompts.md、content/curriculum/index.yaml 和 content/production/resource-backlog.json，然后运行 git status --short 和 git branch --show-current。不要先写代码，先确认应该在哪个分支工作。
```

## 总控对话

适合做：

- 决定下一步优先级。
- 看各分支状态。
- 指导 Git / GitHub 操作。
- 合并分支、打版本、更新项目路线。

推荐分支：

```text
develop
```

启动提示词：

```text
这次作为项目总控对话。请读取项目锚点文件，检查 git status 和当前分支。不要先写代码，先根据 docs/02-next-actions.md 帮我判断下一步最应该推进什么，并说明应该切到哪个分支。
```

## 资源工厂总控

负责分支：

```text
develop
```

适合做：

- 查看 `content/production/resource-backlog.json`。
- 选择下一个最值得推进的资源工作单元。
- 给新对话分派单个 Applet、Manim 或 Diagnosis 任务。
- 维护资源生产节奏和上下文边界。

启动提示词：

```text
这次作为资源工厂总控。请读取项目锚点文件和 content/production/resource-backlog.json，检查 git status 和当前分支。不要先写代码，先根据 backlog 的 priority、status、type 和 nextAction，推荐下一个最值得推进的资源 item，并告诉我应该复制哪段 threadPrompt 到哪个新对话。
```

验收标准：

- 一次只推荐 1 到 2 个资源工作单元。
- 说明推荐原因和对应分支。
- 不把全章资源塞进同一个对话。

## 课程图谱分支

负责分支：

```text
track/curriculum-map
```

适合做：

- 沪教版高中数学 7 册目录核验。
- 册别、章节、课时、知识点 YAML。
- 先修知识、后续知识、教学痛点、数字化切入点。
- 课程标准与核心素养映射。

启动提示词：

```text
这次只做课程图谱。请切到 track/curriculum-map，读取项目锚点文件，检查工作区是否干净，然后继续完善沪教版高中数学课程图谱。优先从必修第二册第 7 章“三角函数”开始，输出结构化 YAML。完成后更新 docs/01-current-state.md 和 docs/02-next-actions.md，并提交。
```

验收标准：

- 新增或修改的课程节点有稳定 id。
- 每个课时至少有先修、后续、痛点、资源建议。
- 不直接复制教材正文。

## 三角函数样板包分支

负责分支：

```text
track/trig-sample-pack
```

适合做：

- 正弦函数课时包。
- 单位圆到正弦曲线 Applet。
- 正弦函数性质探究 Applet。
- `y = A sin(omega x + phi) + k` 参数实验室。
- 教师脚本、学生任务、诊断题。

启动提示词：

```text
这次只做三角函数样板包。请切到 track/trig-sample-pack，读取项目锚点文件，检查工作区是否干净，然后设计/实现必修第二册第 7 章的下一个资源包。先确认该资源对应的课时、教学痛点、互动形式和验收标准，再动手。完成后更新状态文档并提交。
```

验收标准：

- 每个资源有 `metadata.yaml`、`teacher-script.md`、`student-task.md`、`review.md`。
- 一个资源只解决一个核心教学痛点。
- 交互或动画能嵌入课时页。

## Applet SDK 分支

负责分支：

```text
track/applet-sdk
```

适合做：

- Applet metadata schema。
- Applet 与播放器通信协议。
- 参数、事件、状态保存、嵌入规范。
- JSXGraph / GeoGebra / D3 / Three.js 等引擎适配边界。

启动提示词：

```text
这次只做 Applet SDK。请切到 track/applet-sdk，读取项目锚点文件，检查工作区是否干净，然后定义或实现 Applet metadata、事件协议、参数 schema、播放器嵌入约定。先给出接口设计，再落地文件。完成后更新状态文档并提交。
```

验收标准：

- schema 字段能覆盖课时、知识点、教学痛点、交互类型、审核状态。
- 课件可以被播放器统一识别。
- 不绑定某一个具体课件引擎。

## Manim 流水线分支

负责分支：

```text
track/manim-pipeline
```

适合做：

- Manim 场景模板。
- storyboard 格式。
- 渲染产物索引。
- Manim Clip 与课时页/Applet 的组合方式。

启动提示词：

```text
这次只做 Manim 流水线。请切到 track/manim-pipeline，读取项目锚点文件，检查工作区是否干净，然后设计 Manim Clip 的目录结构、metadata、storyboard、scene.py 模板和渲染/嵌入流程。完成后更新状态文档并提交。
```

验收标准：

- 每个 Manim Clip 有 storyboard 和 metadata。
- 明确何时用 Manim，何时用交互 Applet。
- 渲染文件不污染 Git 仓库。

## 平台壳分支

负责分支：

```text
track/platform-shell
```

适合做：

- 教师端 Web 平台。
- 课件播放器。
- 教材树导航。
- 课时资源包页面。
- Applet / Manim 嵌入预览。

启动提示词：

```text
这次只做平台壳。请切到 track/platform-shell，读取项目锚点文件，检查工作区是否干净，然后搭建或完善教师端平台和课件播放器。先保持 MVP：教材树、课时页、资源卡片、Applet/Manim 预览。完成后运行可用的验证命令，更新状态文档并提交。
```

验收标准：

- 首页不是营销页，而是教师工作台。
- 可以按教材目录进入课时页。
- 能读取本地课程数据。
- Applet/Manim 至少有占位或预览入口。

## 审核系统分支

负责分支：

```text
track/review-system
```

适合做：

- 数学审校字段。
- 教研审核流程。
- 资源状态流。
- 审核清单自动化或模板化。

启动提示词：

```text
这次只做审核系统。请切到 track/review-system，读取项目锚点文件，检查工作区是否干净，然后完善资源审核流程、状态字段、review.md 模板和质量门槛。完成后更新状态文档并提交。
```

验收标准：

- 资源能从 draft 推进到 stable。
- 数学审核、教学审核、课堂试用都有记录位置。
- 审核流程不会阻碍 MVP，但能防止低质资源进入 stable。

## 设计系统分支

负责分支：

```text
track/design-system
```

适合做：

- 教师端 UI 风格。
- 课堂大屏模式。
- 课件按钮、滑块、切换、标签等控件规范。
- 数学可视化配色和可访问性。

启动提示词：

```text
这次只做设计系统。请切到 track/design-system，读取项目锚点文件，检查工作区是否干净，然后建立教师端和课件播放器的 UI 规范。重点考虑课堂大屏、触控操作、数学颜色语义和信息分步揭示。完成后更新状态文档并提交。
```

验收标准：

- 设计服务教师课堂使用，不做花哨展示。
- 颜色有数学语义。
- 控件适合投屏和触控。

## 第一阶段推荐推进顺序

```text
1. track/curriculum-map
   完成必修第二册第 7 章课程图谱。

2. track/trig-sample-pack
   设计正弦函数课时包和第一个 Applet 文档。

3. track/applet-sdk
   定义 Applet metadata 和播放器协议。

4. track/platform-shell
   搭建能读取课程图谱的教师端壳。

5. track/manim-pipeline
   建立 Manim Clip 模板并做正弦函数导入动画。

6. 回到 develop
   合并这些阶段成果，形成 v0.1.0-trig-mvp 的基础。

7. 资源工厂总控
   从 content/production/resource-backlog.json 选择后续单资源工作单元，持续填充平台。
```

## 一个任务多大合适

每个对话只做一个小目标，例如：

- “只推进 backlog 中的 SH-HS-MATH-HJ-B2-C07-L02-A01。”
- “只完成必修二第 7 章目录 YAML。”
- “只设计单位圆到正弦曲线 Applet 的 metadata 和脚本。”
- “只搭建课程树页面。”
- “只写 Manim 正弦函数导入 storyboard。”

不要一次要求一个对话“把整个平台做完”。
