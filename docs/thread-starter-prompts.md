# Codex 分支对话启动提示词

## 使用方式

每次开启新对话时，先复制“通用启动提示词”。如果已经明确任务，再追加对应分支的“专项任务提示词”。

不要让多个对话同时改同一个分支。如果要并行推进，优先让每个对话处理不同短分支或不同 git worktree，并遵守 `docs/parallel-chapter-factory.md`。

## 长期硬规则

1. 所有用户可见数学公式必须符合数学书写形式。不得裸露 `theta`、`lambda`、`omega`、`kpi`、`pi/2`、`2pi/omega` 等英文或 ASCII 占位；希腊字母、系数与 `π`、三角函数、区间和集合符号必须按教材习惯显示。
2. 分式优先使用上下结构或等效数学排版，不用横向文本 slash 代替正式公式。资源、平台、导出视频、教师脚本和学生任务都必须执行同一标准。
3. 总控线程只做方向、质量闸门、分支核验、集成、推送和调度。修复、生产、审核、新功能实现必须开独立 `codex/*` 工作线程；总控线程不得直接生产资源或在总控上下文中完成实现类工作。

## 通用启动提示词

```text
请先读取 docs/00-project-brief.md、docs/01-current-state.md、docs/02-next-actions.md、docs/git-workflow.md、docs/content-standards.md、docs/codex-collaboration-guide.md、docs/resource-factory-workflow.md、docs/parallel-chapter-factory.md、docs/thread-starter-prompts.md、content/curriculum/index.yaml 和 content/production/resource-backlog.json，然后运行 git status --short 和 git branch --show-current。不要先写代码，先确认应该在哪个分支工作。
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
这次作为项目总控对话。请读取项目锚点文件，检查 git status 和当前分支。不要先写代码，先根据 docs/02-next-actions.md 帮我判断下一步最应该推进什么，并说明应该开哪个独立 codex/* 工作线程或切到哪个分支。总控线程只做方向、质量闸门、分支核验、集成、推送和调度；修复、生产、审核、新功能实现必须交给独立工作线程。
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
这次作为资源工厂总控。请读取项目锚点文件、docs/content-standards.md 和 content/production/resource-backlog.json，检查 git status 和当前分支。不要先写代码，先根据 backlog 的 priority、status、type、nextAction 和数字化必要性门槛，推荐下一个最值得推进的资源 item，并告诉我应该复制哪段 threadPrompt 到哪个新对话。不要为了每课覆盖率强行推荐可视化资源。
```

验收标准：

- 一次只推荐 1 到 2 个资源工作单元。
- 说明推荐原因和对应分支。
- 说明该资源为什么值得数字化；如果普通板书或纸笔任务更合适，应明确建议暂不制作。
- 不把全章资源塞进同一个对话。

## 质量优先双线并行总控

负责分支：

```text
develop
```

适合做：

- 同时分派生产线 3 个、审核线 3 个工作对话。
- 按“三个一组”回收结果，并逐批核对 commit、分支、改动范围、验证结果和剩余风险。
- 只由总控合并到 `develop`、同步长期 `track/*` 分支和 `release/v0.1-trig-mvp`。
- 把资源状态从 `math_review` / `browser_review` / `classroom_trial` 继续推进到 `release_candidate` 或 `published`。

启动提示词：

```text
这次作为质量优先双线并行总控。请读取项目锚点文件、docs/parallel-quality-system.md、docs/resource-factory-workflow.md、docs/parallel-chapter-factory.md 和 content/production/resource-backlog.json，检查 git status 和当前分支。不要先开始具体资源生产，先判断当前仓库是否适合启动生产线 3 个 + 审核线 3 个，并给出每个工作对话的独立分支、写入范围、禁止范围、验收标准和完整可复制提示词。总控是唯一合并点，所有工作对话只能建议状态，不能直接 published。
```

本轮 6 个可直接复制的新对话提示词已沉淀在：

```text
docs/parallel-quality-system.md
```

当前 6 个推荐工作对话：

```text
生产-平台框架 -> codex/production-platform-framework-filtering
生产-第8章资源精修 -> codex/production-b2-c08-l01-a01-vector-applet
生产-课程图谱与资源工厂 -> codex/production-resource-factory-batch-planner
审核-数学与沪教版一致性 -> codex/review-b2-c07-math-hj-consistency
审核-课堂试读 -> codex/review-b2-c07-classroom-trial-readiness
审核-浏览器大屏触控 -> codex/review-b2-c07-browser-touch-audit
```

验收标准：

- 生产线和审核线不得同时写同一资源包。
- 工作对话不提交 `content/production/resource-backlog.json` 或 `apps/web/src/data/workspace-data.json`，由总控统一再生。
- 未终核章节、8.3 暂缓项和数字化必要性不足的内容不得进入正式生产。
- 总控收到每批 3 条反馈后，必须运行 `git branch --contains <commit>` 和 `git show --stat <commit>`，再决定是否合并。

## 数学公式显示修复线

负责分支：

```text
独立 codex/* 短分支，按资源包或同类平台问题命名
```

适合做：

- 修复 Applet、Manim、Diagnosis 或平台中课堂可见公式的显示问题。
- 将 `theta`、`alpha`、`lambda`、`omega`、`phi`、`pi`、`kpi` 等英文或 ASCII 占位改为数学符号。
- 将 `π/2`、`2π/ω`、`sin x / cos x`、`-φ/ω` 等横向纯文本分式改为上下结构或等效数学排版。
- 增加资源内轻量公式渲染组件、CSS 数学片段或平台级数学显示测试。
- 做浏览器/iframe/大屏复核，确认公式不遮挡、不溢出、不退化。

启动提示词：

```text
请先读取 docs/00-project-brief.md、docs/01-current-state.md、docs/02-next-actions.md、docs/git-workflow.md、docs/content-standards.md、docs/codex-collaboration-guide.md、docs/resource-factory-workflow.md、docs/parallel-quality-system.md、docs/thread-starter-prompts.md、content/curriculum/index.yaml 和 content/production/resource-backlog.json，然后运行 git status --short 和 git branch --show-current。

你是“数学公式显示修复线”工作对话。请不要直接改 develop。请创建独立 codex/* 短分支，并只处理总控指定的资源包或平台文件范围。

核心规则：所有用户可见数学表达必须符合 docs/content-standards.md 的“数学公式呈现标准”。不得在学生/教师可见区域保留 theta、Theta、alpha、beta、lambda、phi、omega、pi、kpi、pi/2、2pi/omega、sin x / cos x 等英文或 ASCII 占位。希腊字母必须显示为 θ、α、β、λ、φ、ω、π；分式优先使用上下结构或等效数学排版，并在平台 iframe、直达页、桌面和大屏尺寸下不遮挡、不溢出。

任务步骤：
1. 先用 rg 搜索指定范围内的 theta、Theta、alpha、beta、lambda、phi、omega、pi、kpi、/、π/2、sin x / cos x 等可疑课堂文本。
2. 区分代码变量名和课堂可见文本；不要机械替换 JavaScript 变量名，除非变量名本身被展示给用户。
3. 修复课堂可见公式显示，必要时新增轻量公式渲染 helper 或 CSS 组件。
4. 更新对应 review.md，记录修复范围、仍需人工审校的公式和浏览器复核结果。
5. 运行 npm run validate:content；如果改了 HTML、平台代码或测试，运行 npm run verify。
6. 不提交 content/production/resource-backlog.json 或 apps/web/src/data/workspace-data.json；若验证生成 diff，恢复并说明。

完成后提交本分支，并按固定格式回复：

分支名：
commit hash：
改动文件：
运行的验证命令：
验证结果：
数学公式显示修复结论：
剩余风险：
是否改动全局生成文件：
是否修改课程图谱：
是否需要总控特别关注：
```

验收标准：

- 课堂可见区域不再出现英文占位希腊字母或 `pi/2` 一类 ASCII 表达。
- 主要分式使用上下结构或等效数学排版，不以横向斜杠纯文本作为最终呈现。
- 数学排版在平台 iframe 首屏、直达页和常见桌面尺寸下不遮挡、不溢出。
- 只修改允许范围，不借公式修复顺手改课程图谱、资源状态或无关 UI。
- 不能因为公式显示修好就建议进入 `published`；B2-C08 仍受教材终核限制。

## 并行章节工厂总控

负责分支：

```text
develop
```

适合做：

- 同时分派 3 到 5 个章节的来源核对任务。
- 检查每个章节是否遵守沪教版来源优先级。
- 合并章节级来源记录、课程图谱和数字化必要性筛选。
- 决定哪些章节可以进入 scaffold，哪些必须继续等待教材或 dolearning 终核。

启动提示词：

```text
这次作为并行章节工厂总控。请读取项目锚点文件、docs/parallel-chapter-factory.md、docs/content-standards.md 和 content/production/resource-backlog.json，检查 git status 和当前分支。不要先写代码，先推荐下一轮可并行推进的 3 到 5 个章节，并为每个章节给出独立短分支名、任务边界和可复制到新对话的提示词。只分派来源核对、课程图谱和数字化必要性筛选，不分派完整资源制作。
```

第三轮任务单已完成并集成，可作为并行来源核对样例读取：

```text
docs/parallel-rounds/2026-05-08-round-3.md
```

下一轮建议继续“已实现资源审校”而不是 scaffold 未终核候选；由总控从 B2-C07 可运行 Applet / Manim / Diagnosis 和 B2-C08 scaffold 骨架中挑选小批量审校任务。

当前已实现资源审校任务单可直接读取：

```text
docs/resource-review-rounds/2026-05-08-round-1.md
docs/resource-review-rounds/2026-05-08-round-2.md
docs/resource-review-rounds/2026-05-08-round-3.md
docs/resource-review-rounds/2026-05-08-round-4.md
```

第一轮审校 `SH-HS-MATH-HJ-B2-C07-L06-A01`、`SH-HS-MATH-HJ-B2-C07-L06-M01`、`SH-HS-MATH-HJ-B2-C07-L07-D01`；第二轮审校 `SH-HS-MATH-HJ-B2-C07-L01-A01`、`SH-HS-MATH-HJ-B2-C07-L01-M01`、`SH-HS-MATH-HJ-B2-C07-L02-D01`；第三轮审校 `SH-HS-MATH-HJ-B2-C07-L03-A01`、`SH-HS-MATH-HJ-B2-C07-L04-A01`、`SH-HS-MATH-HJ-B2-C07-L04-D01`；第四轮审校 `SH-HS-MATH-HJ-B2-C07-L02-A01`、`SH-HS-MATH-HJ-B2-C07-L05-A01`、`SH-HS-MATH-HJ-B2-C07-L05-D01`。后续仍按 3 个独立对话一轮推进。

验收标准：

- 每个章节有独立分支或独立 worktree。
- 每个章节都先做来源核对和必要性筛选。
- 并行章节分支只提交来源记录和事实源 YAML；`resource-backlog.json`、`workspace-data.json`、全局测试计数和总控状态文档由总控统一再生与更新。
- 不把整本书交给一个对话。
- 不让目录未确认的章节进入 scaffold。

## 批量资源骨架生成

负责分支：

```text
按资源类型选择对应 track 分支：
applet -> track/trig-sample-pack
manim_clip -> track/manim-pipeline
diagnosis -> track/review-system
```

适合做：

- 从 backlog 中筛选同一类型、同一推荐分支且数字化必要性明确的 `planned` item。
- 用 scaffold 一次生成 3 到 10 个资源包骨架。
- 只铺目录、metadata 和必备文件，不在同一个对话中深入实现多个完整课件。

启动提示词：

```text
这次只做批量资源骨架生成。请读取项目锚点文件、docs/content-standards.md 和 content/production/resource-backlog.json，检查 git status 和当前分支。先筛选同一 type、同一 recommendedTrack、status=planned 且数字化必要性明确的 items，并说明应切到哪个 track 分支。先运行 npm run scaffold:backlog 的 dry-run 预览，不要直接写入；确认清单合理后再加 --write。只生成资源骨架，不深入设计多个完整课件；不要为了每课覆盖率强行生成资源。完成后运行 npm run generate:backlog 和 npm run verify，更新状态文档并提交。
```

验收标准：

- 不跨资源类型批量写入。
- 不覆盖已有资源包。
- 不为数字化必要性不足的课时生成 Applet 或 Manim。
- 每个生成的资源包都能通过 schema 与内容文件校验。
- 完成后 backlog 中对应 item 从 `planned` 变为 `implemented`。

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
- `y = A sin(ωx + φ) + k` 参数实验室。
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

- 资源能从 `draft` 推进到 `release_candidate`，但 `release_candidate` / `published` 只能由总控决定。
- 数学审核、教学审核、课堂试用都有记录位置。
- 审核流程不会阻碍 MVP，但能防止低质资源进入正式发布。

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

8. 批量资源骨架生成
   课程图谱扩展后，用 scaffold 批量铺同类型资源骨架，再分派单资源精修对话。

9. 并行章节工厂
   每轮并行 3 到 5 个章节，只做来源核对、课程图谱和必要性筛选；通过总控验收后再进入 scaffold。
```

## 一个任务多大合适

每个对话只做一个小目标，例如：

- “只推进 backlog 中的 SH-HS-MATH-HJ-B2-C07-L02-A01。”
- “只完成必修二第 7 章目录 YAML。”
- “只设计单位圆到正弦曲线 Applet 的 metadata 和脚本。”
- “只搭建课程树页面。”
- “只写 Manim 正弦函数导入 storyboard。”
- “只批量生成 5 个同类型 planned Applet 骨架，不深入实现内容。”
- “只核对必修第二册第 9 章复数的沪教版来源和数字化必要性，不制作资源。”

不要一次要求一个对话“把整个平台做完”。
