# 资源工厂工作流

更新时间：2026-05-16

## 为什么需要它

高中数学可做的数字化资源数量很大，不能依赖一个 Codex 对话长期记住全部上下文。本项目后续采用“资源工厂”方式推进：课程图谱是事实源，自动脚本把每个 `digital_entry_points` 转成可分派的资源工作单元，再由不同对话按单个资源包推进。

这不是完全无人审核的自动生成系统。数学内容、课堂节奏、错因设计和版权边界仍必须人工复核。自动化负责拆任务、保持格式、发现缺口、生成提示词和做校验。

## 数据流

```text
content/curriculum/index.yaml
  -> npm run generate:backlog
  -> content/production/resource-backlog.json
  -> node scripts/plan-resource-batch.js --production-limit 3 --review-limit 3
  -> 选择一个 backlog item / 筛选同类型 planned item
  -> 批量 scaffold 资源骨架，或开新对话复核已实现资源
  -> 切对应 track 分支
  -> 创建、精修或审核资源包
  -> npm run verify
  -> 合并回 develop
```

## backlog 做什么

`content/production/resource-backlog.json` 会自动列出：

- 资源 ID、类型、标题、课时、教材位置。
- 资源是 `implemented` 还是 `planned`。
- 已实现资源的 `packagePath` 和 `metadataPath`。
- 资源对应的教学痛点、认知动作和优先级。
- 推荐工作的 `track/*` 分支。
- 可直接复制到新对话里的 `threadPrompt`。

backlog 不是“每课必做资源清单”。课程图谱中的 `digital_entry_points` 必须先通过数字化必要性判断：只有数字化确实能解决该知识点的动态变化、多表征联动、操作诊断或动画叙事问题，才进入 Applet / Manim / Diagnosis 生产。普通板书、纸笔练习或静态图足够解决的内容，不应为了覆盖率强行进入 backlog。

当前覆盖必修第一册第 2、4、5 章，必修第二册第 6、7、8、9 章：44 个资源工作单元，25 个已实现，19 个仍为 planned。第 7 章三角函数样板资源和第 8 章平面向量筛选后候选已落地；8.3 暂缓资源等待教材或 dolearning 终核后再决定是否恢复。必修第一册第 2、4、5 章，第 6 章和第 9 章的 planned item 仅来自来源核对后的数字化必要性初筛，未终核前不要直接 scaffold。

## scaffold 命令

当需要批量铺资源骨架时，先使用 scaffold 命令生成目录和必备文件，再按单个资源进入内容设计与审核。

当前 scaffold 支持三类资源包：

```text
applet      -> content/applets
manim_clip  -> content/manim
diagnosis   -> content/diagnosis
```

先 dry-run 查看将会创建的资源：

```bash
npm run scaffold:backlog -- --type applet --limit 3
npm run scaffold:backlog -- --type manim_clip --limit 3
npm run scaffold:backlog -- --type diagnosis --limit 3
```

默认是 dry-run，只显示会创建哪些资源包，不写入文件。确认后加 `--write`：

```bash
npm run scaffold:backlog -- --type applet --limit 3 --write
```

也可以指定单个资源：

```bash
npm run scaffold:backlog -- --id SH-HS-MATH-HJ-B2-C07-L04-D01 --write
```

scaffold 只负责创建可校验的草稿骨架，不代表题组、数学表达或课堂节奏已经完成。已存在的资源包会被跳过，不会覆盖。

当前必修第二册第 7 章和第 8 章都已经没有 `planned` item；新增的 `planned` item 来自必修第一册第 2、4、5 章，第 6 章和第 9 章 draft 图谱候选。下一轮 scaffold 应等待总控确认来源核对、课时边界和数字化必要性后再开始。对已实现资源，下一步不是重复 scaffold，而是进入单资源精修、数学审校、课堂试读、浏览器复核和状态升级。

## 批次规划 dry-run

生产线和审核线并行前，可以先运行只读批次规划器：

```bash
node scripts/plan-resource-batch.js --production-limit 3 --review-limit 3
```

该工具读取 `content/production/resource-backlog.json`、资源 metadata 和 `content/curriculum/index.yaml` 的来源可信度，只输出候选报告，不写入 backlog、课程图谱、平台生成数据或任何资源包。

分流原则：

- 已 scaffold 但未深入精修的资源进入生产线候选，最高只建议到 `self_checked_draft`。
- 已落地且不再是骨架的资源进入审核线候选，用于数学审校、课堂试读准备度或浏览器复核。
- `scaffoldPolicy: blocked_until_source_verified`、章节/课时仍需人工终核的 planned item 只进入来源终核队列。
- 第 8 章 `8.3` 边界待确认项保持暂缓，不进入 scaffold 或完整制作建议。
- 如果普通板书、纸笔任务或静态讲解更合适，输出低优先级或暂不数字化。

详细说明见：

```text
docs/resource-factory-batch-planner.md
```

## 已实现资源审校

审校轮次文档放在 `docs/resource-review-rounds/`。每轮选择 3 到 5 个写入范围互不重叠的已实现资源，优先覆盖不同资源类型或同一教学链上的关键资源。

第一轮任务单：

```text
docs/resource-review-rounds/2026-05-08-round-1.md
```

第一轮选择正切相关的 Applet、Manim 和 Diagnosis 各 1 个资源，目标是复核 `tan`、`π/2`、定义域、渐近线、周期、首屏尺寸、视频符号和诊断题一般式。该轮不新增资源，不 scaffold，不修改课程图谱。

第二轮任务单：

```text
docs/resource-review-rounds/2026-05-08-round-2.md
```

第二轮选择正弦链条的 Applet、Manim 和 Diagnosis 各 1 个资源，目标是复核单位圆动点、正弦曲线生成、周期 `2π`、关键角、诊断题一般式和 `π` 符号体系。该轮仍不新增资源，不 scaffold，不修改课程图谱。

第三轮任务单：

```text
docs/resource-review-rounds/2026-05-08-round-3.md
```

第三轮选择余弦链条的两个 Applet 和一个 Diagnosis，目标是复核单位圆横坐标生成余弦图像、正弦/余弦性质对照、余弦迁移误区诊断和 `k ∈ Z` 一般式表达。该轮仍不新增资源，不 scaffold，不修改课程图谱。

第四轮任务单：

```text
docs/resource-review-rounds/2026-05-08-round-4.md
```

第四轮选择正弦性质探究 Applet、参数变化 Applet 和参数识别 Diagnosis，目标是复核正弦性质归纳、`y = A sin(ωx + φ)` 参数变换口径、参数反推和诊断题错因标签。该轮仍不新增资源，不 scaffold，不修改课程图谱。

第五轮任务单：

```text
docs/resource-review-rounds/2026-05-09-round-5.md
```

第五轮选择正弦与余弦相位对照 Applet、图像变换顺序 Manim 和正切性质分段观察 Applet，目标是复核相位方向、参数变换视频口径、正切定义域断裂下的性质表达，以及课堂可见数学符号。该轮仍不新增资源，不 scaffold，不修改课程图谱。

## 质量优先双线并行

当资源数量继续扩大时，资源工厂采用“生产线 + 审核线”错位并行，而不是把大量资源一次性交给同一个对话。

当前推荐上限：

```text
生产线 3 个对话
审核线 3 个对话
```

反馈节奏：

- 生产线 3 个结果作为一批交回总控。
- 审核线 3 个结果作为一批交回总控。
- 总控每收一批，先核对 commit、分支、改动范围和验证结果，再决定是否集成。

生产线适合：

- 平台检索、预览、状态聚合等框架能力。
- 已终核或边界足够明确的单资源精修。
- 只读 dry-run 的资源工厂批次规划工具。

审核线适合：

- 已实现资源的数学审校。
- 教师试读准备度检查。
- 浏览器、大屏、触控和平台 iframe 复核。

生产线和审核线不得同时写同一个资源包。未终核章节、`blocked_until_source_verified` planned item 和数字化必要性不足的知识点不得进入正式 scaffold 或完整资源生产。

完整规则与本轮 6 个可复制提示词见：

```text
docs/parallel-quality-system.md
```

## 分支分派规则

```text
applet      -> track/trig-sample-pack
manim_clip  -> track/manim-pipeline
diagnosis   -> track/review-system
platform    -> track/platform-shell
schema/sdk   -> track/applet-sdk 或对应 SDK 分支
curriculum   -> track/curriculum-map
```

若一个资源需要同时改平台和内容，先在内容分支完成资源包，再由平台分支接入展示。

## 新对话怎么用

1. 在总控对话查看 `content/production/resource-backlog.json`。
2. 先确认该 item 对应的数字化必要性：是否解决传统板书或静态 PPT 难以解决的问题。
3. 选择一个 `status: "planned"` 或需要复核的 `implemented` item。
4. 如果是批量铺骨架，只选择同一 `type`、同一 `recommendedTrack` 且必要性明确的 planned item，一次建议 3 到 10 个。
5. 如果是内容精修、数学审校或课堂试读，复制该 item 的 `threadPrompt` 到新对话；新对话只处理这个资源或这一个审核动作。
6. 完成后运行：

```bash
npm run generate:backlog
npm run verify
```

7. 提交并把分支合并回 `develop`。

原则：骨架可以批量生成，优质课件不应批量草率完成。一个对话可以批量创建同类型目录，但真正的交互设计、Manim 分镜、诊断题质量和数学审校仍建议按单资源或小批量推进。

## 自动化边界

可以自动化：

- 从课程图谱生成资源 backlog。
- 从 backlog 批量生成 planned Applet / Manim Clip / Diagnosis 的资源包骨架。
- 判断资源包是否已落地。
- 检查 metadata、文件存在性、资源 ID、课时归属。
- 给每个资源生成启动提示词。
- 随着资源包增加自动更新平台数据和 backlog 统计。

需要人工或教师复核：

- 教材目录和课时划分是否与沪教版纸质教材一致。
- 数学表达是否严谨。
- 教学顺序是否适合课堂。
- 交互是否真的解决痛点。
- 诊断题是否能定位错因。
- 是否存在版权风险。

## 当前阶段判断

我们已经跑通了“课程图谱 -> Applet / Manim / Diagnosis 资源包 -> 平台预览 -> 内容校验 -> backlog -> scaffold”的闭环。第 7 章三角函数样板资源已阶段性完成，第 8 章平面向量已完成 planned backlog 的必要性筛选和收窄，下一阶段有两条主线：

- 质量线：围绕第 7 章已有 15 个资源推进数学审校、课堂节奏试读、浏览器复核和状态升级；第一轮已完成正切链条 Applet / Manim / Diagnosis 审校，第二轮已完成正弦链条 Applet / Manim / Diagnosis 审校，第三轮已完成余弦链条 Applet / Applet / Diagnosis 审校，第四轮已完成正弦性质与参数变换链条 Applet / Applet / Diagnosis 审校，第五轮已完成相位对照 / 变换顺序 Manim / 正切性质 Applet 审校。
- 扩展线：按 `docs/parallel-chapter-factory.md` 并行推进 3 到 5 个新章节的来源核对、课程图谱和数字化必要性筛选；通过总控验收后，再小批量 scaffold。
- 生产线：第六轮首批已验证“平台筛选能力 + 第 8 章单资源精修 + 资源工厂批次规划器”可以并行推进；第二批已将第 8 章 L02/L03/L04 Applet 从 scaffold 推进为可运行自检草稿，第三批已将 L05/L10 Applet 推进为可运行自检草稿，并为 L04-M01 Manim 导出 `mp4` / `webm` / poster。随后第 8 章 L05/L10/L04-M01 质量修复线、修复后复核线和平台入口闸门批次均已合入总控；第 8 章资源仍保持顶层 `draft` / `self_checked_draft`，其中 L04-M01 仅平台卡片为 `video_ready` 预览入口。只有总控在教材终核、数学审校、浏览器/视频复核和教师试读完成后才可决定更高状态。
- 审核线：第 8 章 L01-L04 与 L05/L10/L04-M01 的两批审核报告都已合入总控，L05/L10/L04-M01 的首轮质量修复、修复后复核和平台入口闸门修复也已合入。下一步不应立刻扩大生产，而应开 3 条小范围质量线：复核 `L05-A01` 真实触控屏拖拽手感和教师 12 分钟流程，修复或复核 `L10-A01` 平台 iframe 首屏适配，复核 `L04-M01` 平台视频播放、poster、暂停点和教师观看节奏。三项完成后，再决定恢复 3+3 双线并行或扩大到更大批次。
