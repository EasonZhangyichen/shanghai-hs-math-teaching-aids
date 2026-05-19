# 质量优先双线并行系统

更新时间：2026-05-09

## 结论

当前仓库适合进入“生产线 3 个 + 审核线 3 个”的双线并行模式，但只能在总控强约束下推进。第 7 章三角函数样板包已经具备可运行资源和多轮审校经验，第 8 章平面向量已经完成必要性筛选和骨架铺设，资源工厂、backlog、内容校验和平台预览也已经跑通。因此可以提高并行度。

适合的前提条件：

- 生产线和审核线写入范围错位，不能同时处理同一资源包。
- 所有工作对话使用独立 `codex/*` 短分支，最好使用独立 git worktree。
- 工作对话不得直接修改 `develop`、长期 `track/*` 分支或 `release/v0.1-trig-mvp`。
- `content/production/resource-backlog.json`、`apps/web/src/data/workspace-data.json` 和全局状态文档由总控统一生成和提交。
- 未经沪教版纸质教材、上海数字教学平台、已登录 dolearning 或可靠来源终核的章节，只能做 `draft` 来源核对和数字化必要性筛选，不允许正式批量生产。
- 数字化必要性必须明确。板书、纸笔推导或静态讲解更合适的内容，应标为暂不数字化或低优先级。

当前最大风险：

- 6 个对话同时运行会放大全局生成文件冲突。
- 第 8 章仍有 8.3 课时边界疑点，不能把平面向量全章当作已终核。
- 审核状态可能被工作对话过度抬升，例如把 `math_review` 误当作 `published`。
- 平台能力改动可能影响已有资源 iframe / video 预览稳定性。
- 为了速度把未终核章节或低必要性知识点批量做成低质量课件。
- 跨资源公式显示问题可能被误当作“小样式问题”。凡课堂可见区域仍出现 `theta`、`pi/2`、横向纯文本分式或英文变量占位，必须按数学显示缺陷处理，不能建议进入更高质量状态。

总控拦截方式：

- 每批只收 3 个结果，先检查分支、commit、改动范围和验证结果，再决定是否合并。
- 对每个 commit 运行 `git branch --contains <commit>` 和 `git show --stat <commit>`。
- 对资源包改动打开 `metadata.yaml`、`review.md`、`teacher-script.md`、`student-task.md`、`item-bank.yaml` 或 `storyboard.md` 复核关键结论。
- 先合并到临时集成分支，统一运行 `npm run generate:backlog` 和 `npm run verify`，再合并 `develop`。
- 发现越界修改、状态虚高、课时归属不确定或验证失败，暂停该线并拆分处理。

## 总控原则

总控是唯一裁决点：

- 只有总控可以合并到 `develop`。
- 只有总控可以同步长期 `track/*` 分支和 `release/v0.1-trig-mvp`。
- 只有总控可以把资源推进到 `release_candidate` 或 `published`。
- 工作对话只能建议状态，不能直接宣布发布。

平台长期目标不能改变：

- 第 8 章只是下一阶段样板扩展，不代表平台范围收窄。
- 长期仍以沪教版高中数学全册课程图谱为主线。
- 教师平台必须围绕按册、章、节、课时、知识点、资源类型和审核状态检索资源的备课场景设计。

沪教版一致性是硬边界：

- 课程架构、课时关系、知识点图谱和前后知识链必须依据沪教版高中数学教材。
- 外地教材或通用高中数学内容只能作为辅助参考。
- 没有来源终核的章节不能进入正式资源生产。

数字化必要性是进入生产的门槛：

- 适合数字化：动态变化、多表征联动、几何直观、参数比较、错因诊断、课堂操作、迁移应用。
- 不宜强行数字化：定义背诵、常规纸笔计算、静态板书更清楚的证明、普通套公式训练。

## 状态流

```text
draft
-> self_checked_draft
-> math_review
-> browser_review
-> classroom_trial
-> release_candidate
-> published
```

状态含义：

- `draft`：资源存在、骨架完整或可运行，但不代表数学正确。
- `self_checked_draft`：作者已自检文件结构、基础运行和明显错误。
- `math_review`：数学审校建议通过，但不代表课堂可用。
- `browser_review`：平台 iframe、直达页、大屏尺寸、触控或播放复核通过。
- `classroom_trial`：教师试读或小组限时试做通过。
- `release_candidate`：总控完成整合验证后标记为候选发布。
- `published`：总控在 release 分支或正式版本中发布。

工作对话只能建议进入 `self_checked_draft`、`math_review`、`browser_review` 或 `classroom_trial`。`release_candidate` 和 `published` 只能由总控决定。

## 批次机制

本轮采用 6 个新对话，但按 3 个一组回收结果：

```text
生产线批次：生产-平台框架 + 生产-第8章资源精修 + 生产-课程图谱与资源工厂
审核线批次：审核-数学与沪教版一致性 + 审核-课堂试读 + 审核-浏览器大屏触控
```

生产线做下一批，审核线审上一批。不要让生产线和审核线同时写同一个资源目录。

## 停止条件

- 任一批次出现 2 次以上验证失败，暂停生产线，优先修复。
- 任一资源沪教版课时归属不确定，冻结该资源生产。
- 任一分支越界修改课程图谱或 generated files，不直接合并，由总控拆分处理。
- 任一平台功能影响资源预览稳定性，暂停新资源精修，先修平台。
- 任一审核发现数学口径不确定，不进入 `classroom_trial`。
- 任一资源存在未修复的数学显示问题，例如希腊字母未符号化、分式不是上下结构、公式与教材书写明显不一致，暂停状态升级，先开独立修复线。
- 总控上下文开始变长或任务涉及具体资源/功能修复时，总控只生成提示词和质量闸门，不直接在总控线程实现。

## 总控收批清单

收到 3 条反馈后，总控必须执行：

```bash
git branch --contains <commit>
git show --stat <commit>
```

然后检查：

- commit 是否在该工作对话声明的分支上。
- 改动文件是否只在允许范围内。
- 是否越权修改 `develop`、`track/*`、`release/*`、`content/production/resource-backlog.json` 或 `apps/web/src/data/workspace-data.json`。
- 是否修改课程图谱；如有，来源证据是否足够。
- 是否真实运行了 `npm run validate:content` 或 `npm run verify`。
- 建议状态是否过高。
- 剩余风险是否需要冻结或拆分。

集成流程：

```bash
git switch develop
git pull --ff-only origin develop
git switch -c codex/integrate-quality-batch-YYYYMMDD-N
git merge --no-ff <worker-branch-1>
git merge --no-ff <worker-branch-2>
git merge --no-ff <worker-branch-3>
npm run generate:backlog
npm run verify
```

验证通过后再合并回 `develop`、推送，并同步长期分支。

## 本轮 6 个工作对话

### A1. 生产-平台框架

推荐分支名：`codex/production-platform-framework-filtering`

推荐 worktree：`../数学教育教师云平台-prod-platform`

写入范围：

- `apps/web/src/**`
- `apps/web/scripts/**`
- `apps/web/vite.config.js`
- `apps/web/src/lib/*.test.js`
- 如需说明设计取舍，可新增 `docs/platform-audits/production-platform-framework-filtering.md`

禁止修改范围：

- `content/curriculum/index.yaml`
- `content/production/resource-backlog.json`
- `apps/web/src/data/workspace-data.json`
- `content/applets/**`
- `content/manim/**`
- `content/diagnosis/**`
- 长期 `track/*` 分支、`release/v0.1-trig-mvp`

任务目标：

- 强化教师检索与备课平台框架，优先支持按册、章、课时、资源类型、审核状态筛选和资源预览稳定性。
- 不新增课程资源，不改资源包，不改课程图谱。
- 如实现 UI 改动，保持教师工作台风格，避免营销页和装饰化布局。

验收标准：

- 现有第 7 章 Applet / Manim / Diagnosis 资源仍能在平台中正确展示或保留入口。
- 第 8 章 scaffold 资源能被识别为草稿或骨架，不能误显示为已审校。
- 筛选结果不会破坏课时树和资源详情。
- 不提交 generated files；如验证命令生成了 diff，交给总控统一再生。

需要运行的验证命令：

```bash
npm run validate:content
npm run verify
```

完整可复制提示词：

```text
请先读取 docs/00-project-brief.md、docs/01-current-state.md、docs/02-next-actions.md、docs/git-workflow.md、docs/content-standards.md、docs/codex-collaboration-guide.md、docs/resource-factory-workflow.md、docs/parallel-chapter-factory.md、docs/parallel-quality-system.md、docs/thread-starter-prompts.md、content/curriculum/index.yaml 和 content/production/resource-backlog.json，然后运行 git status --short 和 git branch --show-current。

你是本轮“生产线 3 个”中的【生产-平台框架】对话。请不要直接改 develop。请使用独立 worktree：../数学教育教师云平台-prod-platform；分支名使用 codex/production-platform-framework-filtering。如果 worktree 或分支已存在，先检查状态再继续；如果当前工作区不干净，停止并汇报，不要覆盖用户改动。

本任务只改平台框架与平台测试，不做具体资源生产。允许写入 apps/web/src/**、apps/web/scripts/**、apps/web/vite.config.js、apps/web/src/lib/*.test.js；如需记录设计取舍，可新增 docs/platform-audits/production-platform-framework-filtering.md。

目标：强化教师检索与备课使用场景，优先支持按册、章、课时、资源类型、审核状态筛选资源，并保证现有 Applet iframe、Manim video 和 Diagnosis 入口稳定。第 8 章 scaffold 资源只能显示为 draft / scaffold / self_checked_draft，不得误标为已审校或 published。

禁止：不允许直接改 develop；不允许修改 content/curriculum/index.yaml；不允许提交 content/production/resource-backlog.json 或 apps/web/src/data/workspace-data.json；不允许修改任何 content/applets、content/manim、content/diagnosis 资源包；不允许新增低质量批量资源；不允许为了速度跳过验证。

完成前请运行 npm run validate:content 和 npm run verify。如 verify 生成了 workspace-data.json 或 resource-backlog.json 的 diff，不要提交这些 generated files，只在回复中说明，等待总控统一再生。

请提交本分支，并按固定格式回复：

分支名：
commit hash：
改动文件：
运行的验证命令：
验证结果：
建议状态：
剩余风险：
是否改动全局生成文件：
是否修改课程图谱：
是否需要总控特别关注：
```

### A2. 生产-第8章资源精修

推荐分支名：`codex/production-b2-c08-l01-a01-vector-applet`

推荐 worktree：`../数学教育教师云平台-prod-b2-c08-l01-a01`

写入范围：

- `content/applets/SH-HS-MATH-HJ-B2-C08-L01-A01/**`

禁止修改范围：

- 其他 Applet / Manim / Diagnosis 资源包
- `content/curriculum/index.yaml`
- `content/production/resource-backlog.json`
- `apps/web/src/data/workspace-data.json`
- 平台源码

任务目标：

- 把第 8 章 `SH-HS-MATH-HJ-B2-C08-L01-A01` 从 scaffold 骨架推进为可运行、可自检的 Applet 草稿。
- 主题限定为“向量表示与等价拖拽板”，聚焦向量的大小、方向、起点平移和相等向量。
- 不处理 8.3，不新增资源，不改变第 8 章课时边界。

验收标准：

- `src/index.html` 可直接打开，并适合平台 iframe 首屏预览。
- 交互必须服务向量概念理解，不做装饰性动画。
- `metadata.yaml`、`README.md`、`teacher-script.md`、`student-task.md`、`review.md` 同步更新。
- 状态最多建议到 `self_checked_draft`，不能建议 `published`。
- 明确记录第 8 章仍需教材或 dolearning 终核的风险。

需要运行的验证命令：

```bash
npm run validate:content
npm run verify
```

完整可复制提示词：

```text
请先读取 docs/00-project-brief.md、docs/01-current-state.md、docs/02-next-actions.md、docs/git-workflow.md、docs/content-standards.md、docs/codex-collaboration-guide.md、docs/resource-factory-workflow.md、docs/parallel-chapter-factory.md、docs/parallel-quality-system.md、docs/thread-starter-prompts.md、content/curriculum/index.yaml 和 content/production/resource-backlog.json，然后运行 git status --short 和 git branch --show-current。

你是本轮“生产线 3 个”中的【生产-第8章资源精修】对话。请不要直接改 develop。请使用独立 worktree：../数学教育教师云平台-prod-b2-c08-l01-a01；分支名使用 codex/production-b2-c08-l01-a01-vector-applet。如果 worktree 或分支已存在，先检查状态再继续；如果当前工作区不干净，停止并汇报，不要覆盖用户改动。

本任务只精修一个资源包：content/applets/SH-HS-MATH-HJ-B2-C08-L01-A01/**。不要处理其他资源包。

目标：把“向量表示与等价拖拽板”从 scaffold 骨架推进为可运行 Applet 草稿。交互应服务沪教版必修第二册第 8 章 8.1 向量概念与线性运算中的核心痛点：学生容易把向量绑定在起点上，不能同时抓住大小和方向，不理解相等向量可以平移。建议包含平面网格、可拖拽向量、平移后的等价向量、大小/方向读数、起点变化但向量不变的对照，以及教师可投屏使用的分步揭示。

注意：第 8 章仍处于 draft / needs_manual_textbook_check，8.3 课时边界仍未终核。本任务不得修改课程图谱，不得恢复 8.3 暂缓资源，不得把资源标为 published。状态最多建议进入 self_checked_draft，并写清还需数学审校和教师试读。

禁止：不允许直接改 develop；不允许修改 content/curriculum/index.yaml；不允许提交 content/production/resource-backlog.json 或 apps/web/src/data/workspace-data.json；不允许修改平台源码；不允许同时改多个资源包；不允许新增低质量批量资源；不允许跳过验证。

完成前请运行 npm run validate:content 和 npm run verify。如 verify 生成了 workspace-data.json 或 resource-backlog.json 的 diff，不要提交这些 generated files，只在回复中说明，等待总控统一再生。

请提交本分支，并按固定格式回复：

分支名：
commit hash：
改动文件：
运行的验证命令：
验证结果：
建议状态：
剩余风险：
是否改动全局生成文件：
是否修改课程图谱：
是否需要总控特别关注：
```

### A3. 生产-课程图谱与资源工厂

推荐分支名：`codex/production-resource-factory-batch-planner`

推荐 worktree：`../数学教育教师云平台-prod-resource-factory`

写入范围：

- `scripts/**`
- `scripts/*.test.js`
- `docs/resource-factory-workflow.md`
- 如需要，可新增 `docs/resource-factory-batch-planner.md`

禁止修改范围：

- `content/curriculum/index.yaml`
- `content/production/resource-backlog.json`
- `apps/web/src/data/workspace-data.json`
- `content/applets/**`
- `content/manim/**`
- `content/diagnosis/**`

任务目标：

- 为资源工厂增加“只读 dry-run 批次规划”能力，帮助总控从 backlog 中选择生产线和审核线候选。
- 工具只能输出建议，不得写入 backlog、课程图谱或资源包。
- 必须尊重 `scaffoldPolicy: blocked_until_source_verified` 和数字化必要性门槛。

验收标准：

- 能用命令生成下一轮候选清单或报告。
- 对未终核章节只能输出 blocked / source_check，不输出 scaffold / production。
- 不改变任何资源状态。
- 测试覆盖“未终核 planned item 不进入生产队列”。

需要运行的验证命令：

```bash
npm run validate:content
npm run test
npm run verify
```

完整可复制提示词：

```text
请先读取 docs/00-project-brief.md、docs/01-current-state.md、docs/02-next-actions.md、docs/git-workflow.md、docs/content-standards.md、docs/codex-collaboration-guide.md、docs/resource-factory-workflow.md、docs/parallel-chapter-factory.md、docs/parallel-quality-system.md、docs/thread-starter-prompts.md、content/curriculum/index.yaml 和 content/production/resource-backlog.json，然后运行 git status --short 和 git branch --show-current。

你是本轮“生产线 3 个”中的【生产-课程图谱与资源工厂】对话。请不要直接改 develop。请使用独立 worktree：../数学教育教师云平台-prod-resource-factory；分支名使用 codex/production-resource-factory-batch-planner。如果 worktree 或分支已存在，先检查状态再继续；如果当前工作区不干净，停止并汇报，不要覆盖用户改动。

本任务不做资源生产、不 scaffold、不修改课程图谱。目标是为资源工厂增加一个只读 dry-run 批次规划能力：根据 content/production/resource-backlog.json、资源状态、scaffoldPolicy、章节来源可信度和数字化必要性，输出下一轮生产线/审核线候选建议，帮助总控选择 3+3 批次。工具或文档可以写在 scripts/**、scripts/*.test.js、docs/resource-factory-workflow.md，必要时新增 docs/resource-factory-batch-planner.md。

必须坚持：未终核章节、blocked planned item、8.3 暂缓项不得进入 scaffold 或完整生产建议；如果普通板书或纸笔任务更合适，要输出低优先级或暂不数字化。该工具只能输出建议，不能写入 content/production/resource-backlog.json、apps/web/src/data/workspace-data.json、content/curriculum/index.yaml 或任何资源包。

禁止：不允许直接改 develop；不允许修改课程图谱；不允许提交全局生成文件；不允许创建或改动 content/applets、content/manim、content/diagnosis；不允许一次性生成大量低质量资源；不允许把建议状态写成 published。

完成前请运行 npm run validate:content、npm run test 和 npm run verify。如 verify 生成了 workspace-data.json 或 resource-backlog.json 的 diff，不要提交这些 generated files，只在回复中说明，等待总控统一再生。

请提交本分支，并按固定格式回复：

分支名：
commit hash：
改动文件：
运行的验证命令：
验证结果：
建议状态：
剩余风险：
是否改动全局生成文件：
是否修改课程图谱：
是否需要总控特别关注：
```

### B1. 审核-数学与沪教版一致性

推荐分支名：`codex/review-b2-c07-math-hj-consistency`

推荐 worktree：`../数学教育教师云平台-review-b2-c07-math-hj`

写入范围：

- `docs/review-audits/b2-c07-math-hj-consistency.md`

禁止修改范围：

- 所有资源包目录
- `content/curriculum/index.yaml`
- `content/production/resource-backlog.json`
- `apps/web/src/data/workspace-data.json`
- 平台源码

任务目标：

- 只做第 7 章已实现资源的数学口径与沪教版一致性复核报告。
- 不修改资源包，不提升状态，只向总控提出状态建议和风险清单。

验收标准：

- 报告覆盖第 7 章关键口径：角 `x`、弧度制、单位圆坐标、正弦/余弦/正切定义域和值域、周期、单调区间、对称元素、参数变换、`k ∈ Z` 一般式。
- 明确哪些资源可建议保持 `math_review`，哪些仍需补审。
- 明确沪教版课时边界仍待纸质教材终核的风险。

需要运行的验证命令：

```bash
npm run validate:content
```

完整可复制提示词：

```text
请先读取 docs/00-project-brief.md、docs/01-current-state.md、docs/02-next-actions.md、docs/git-workflow.md、docs/content-standards.md、docs/codex-collaboration-guide.md、docs/resource-factory-workflow.md、docs/parallel-chapter-factory.md、docs/parallel-quality-system.md、docs/thread-starter-prompts.md、content/curriculum/index.yaml 和 content/production/resource-backlog.json，然后运行 git status --short 和 git branch --show-current。

你是本轮“审核线 3 个”中的【审核-数学与沪教版一致性】对话。请不要直接改 develop。请使用独立 worktree：../数学教育教师云平台-review-b2-c07-math-hj；分支名使用 codex/review-b2-c07-math-hj-consistency。如果 worktree 或分支已存在，先检查状态再继续；如果当前工作区不干净，停止并汇报，不要覆盖用户改动。

本任务只写一份审核报告：docs/review-audits/b2-c07-math-hj-consistency.md。请只读第 7 章已实现资源包和课程图谱，不修改任何资源包、平台源码、课程图谱或 generated files。

目标：复核必修第二册第 7 章三角函数已实现资源的数学口径与沪教版一致性。重点检查角 x 的弧度制表述、单位圆坐标 P = (cos x, sin x)、正弦/余弦/正切的定义域、值域、周期、奇偶性、单调区间、对称轴/中心、关键点一般式、参数变换口径、k ∈ Z 表达，以及是否存在外地教材顺序或通用内容改变沪教版课时归属的问题。

注意：本任务是审核报告，不做资源修复。你可以建议某资源保持 math_review 或退回 self_checked_draft，但不能直接把资源设为 classroom_trial、release_candidate 或 published。第 7 章课时边界仍需纸质教材或已登录平台终核，请在报告中保留该风险。

禁止：不允许直接改 develop；不允许修改 content/curriculum/index.yaml；不允许提交 content/production/resource-backlog.json 或 apps/web/src/data/workspace-data.json；不允许修改 content/applets、content/manim、content/diagnosis；不允许用“已运行”替代真实数学审校。

完成前请运行 npm run validate:content。若因只写 docs 未运行 npm run verify，请说明原因。

请提交本分支，并按固定格式回复：

分支名：
commit hash：
改动文件：
运行的验证命令：
验证结果：
建议状态：
剩余风险：
是否改动全局生成文件：
是否修改课程图谱：
是否需要总控特别关注：
```

### B2. 审核-课堂试读

推荐分支名：`codex/review-b2-c07-classroom-trial-readiness`

推荐 worktree：`../数学教育教师云平台-review-b2-c07-classroom`

写入范围：

- `docs/classroom-trials/b2-c07-classroom-trial-readiness.md`

禁止修改范围：

- 所有资源包目录
- `content/curriculum/index.yaml`
- `content/production/resource-backlog.json`
- `apps/web/src/data/workspace-data.json`
- 平台源码

任务目标：

- 对第 7 章已完成数学审校建议的代表资源做教师试读准备度审核。
- 只模拟教师备课试读，不能替代真实课堂试用。

验收标准：

- 至少覆盖 3 个代表资源，建议优先 `SH-HS-MATH-HJ-B2-C07-L01-A01`、`SH-HS-MATH-HJ-B2-C07-L05-A01`、`SH-HS-MATH-HJ-B2-C07-L06-A01`。
- 每个资源给出建议课堂时间、暂停点、教师追问、学生操作任务、可能卡点和是否适合进入真实教师试读。
- 不把任何资源直接推进 `classroom_trial`，只能建议 `ready_for_teacher_trial` 或 `hold_for_revision`。

需要运行的验证命令：

```bash
npm run validate:content
```

完整可复制提示词：

```text
请先读取 docs/00-project-brief.md、docs/01-current-state.md、docs/02-next-actions.md、docs/git-workflow.md、docs/content-standards.md、docs/codex-collaboration-guide.md、docs/resource-factory-workflow.md、docs/parallel-chapter-factory.md、docs/parallel-quality-system.md、docs/thread-starter-prompts.md、content/curriculum/index.yaml 和 content/production/resource-backlog.json，然后运行 git status --short 和 git branch --show-current。

你是本轮“审核线 3 个”中的【审核-课堂试读】对话。请不要直接改 develop。请使用独立 worktree：../数学教育教师云平台-review-b2-c07-classroom；分支名使用 codex/review-b2-c07-classroom-trial-readiness。如果 worktree 或分支已存在，先检查状态再继续；如果当前工作区不干净，停止并汇报，不要覆盖用户改动。

本任务只写一份课堂试读准备度报告：docs/classroom-trials/b2-c07-classroom-trial-readiness.md。请只读第 7 章资源包，不修改任何资源包、平台源码、课程图谱或 generated files。

目标：对第 7 章已完成数学审校建议的代表资源做教师备课试读准备度审核。建议优先覆盖 SH-HS-MATH-HJ-B2-C07-L01-A01、SH-HS-MATH-HJ-B2-C07-L05-A01、SH-HS-MATH-HJ-B2-C07-L06-A01。请按一线高中数学教师 12 到 18 分钟课堂片段视角，检查教师脚本是否可讲、学生任务是否可操作、暂停点是否自然、追问是否能暴露关键错因、时间是否可控。

注意：这不是正式课堂试用，不能把资源直接设为 classroom_trial。只能建议 ready_for_teacher_trial、hold_for_revision 或 needs_math_followup。请明确哪些地方必须由真实教师或小组限时试做确认。

禁止：不允许直接改 develop；不允许修改 content/curriculum/index.yaml；不允许提交 content/production/resource-backlog.json 或 apps/web/src/data/workspace-data.json；不允许修改 content/applets、content/manim、content/diagnosis；不允许用“我觉得能上课”替代具体时间线、暂停点和学生任务检查。

完成前请运行 npm run validate:content。若因只写 docs 未运行 npm run verify，请说明原因。

请提交本分支，并按固定格式回复：

分支名：
commit hash：
改动文件：
运行的验证命令：
验证结果：
建议状态：
剩余风险：
是否改动全局生成文件：
是否修改课程图谱：
是否需要总控特别关注：
```

### B3. 审核-浏览器大屏触控

推荐分支名：`codex/review-b2-c07-browser-touch-audit`

推荐 worktree：`../数学教育教师云平台-review-b2-c07-browser-touch`

写入范围：

- `docs/browser-audits/b2-c07-browser-touch-audit.md`

禁止修改范围：

- 所有资源包目录
- `content/curriculum/index.yaml`
- `content/production/resource-backlog.json`
- `apps/web/src/data/workspace-data.json`
- 平台源码

任务目标：

- 对第 7 章高交互资源做浏览器、平台 iframe、大屏尺寸和触控风险审核。
- 只输出 QA 报告，不修资源。

验收标准：

- 至少覆盖 3 个高风险 Applet，建议优先 `SH-HS-MATH-HJ-B2-C07-L03-A02`、`SH-HS-MATH-HJ-B2-C07-L05-A01`、`SH-HS-MATH-HJ-B2-C07-L07-A01`。
- 检查首屏是否截断、滑块是否可触控、按钮是否适合投屏、数学符号是否正常、console 是否有错误。
- 如果启动本地服务器或浏览器自动化，应记录 URL、视口和结果。
- 不修改资源包；发现问题只写报告。

需要运行的验证命令：

```bash
npm run validate:content
npm run verify
```

完整可复制提示词：

```text
请先读取 docs/00-project-brief.md、docs/01-current-state.md、docs/02-next-actions.md、docs/git-workflow.md、docs/content-standards.md、docs/codex-collaboration-guide.md、docs/resource-factory-workflow.md、docs/parallel-chapter-factory.md、docs/parallel-quality-system.md、docs/thread-starter-prompts.md、content/curriculum/index.yaml 和 content/production/resource-backlog.json，然后运行 git status --short 和 git branch --show-current。

你是本轮“审核线 3 个”中的【审核-浏览器大屏触控】对话。请不要直接改 develop。请使用独立 worktree：../数学教育教师云平台-review-b2-c07-browser-touch；分支名使用 codex/review-b2-c07-browser-touch-audit。如果 worktree 或分支已存在，先检查状态再继续；如果当前工作区不干净，停止并汇报，不要覆盖用户改动。

本任务只写一份浏览器与大屏触控 QA 报告：docs/browser-audits/b2-c07-browser-touch-audit.md。请只读第 7 章资源包和平台，不修改任何资源包、平台源码、课程图谱或 generated files。

目标：对第 7 章高交互资源做平台 iframe、直达页、大屏视口和触控风险审核。建议优先覆盖 SH-HS-MATH-HJ-B2-C07-L03-A02、SH-HS-MATH-HJ-B2-C07-L05-A01、SH-HS-MATH-HJ-B2-C07-L07-A01。请检查首屏是否截断、画布是否过高或过宽、滑块和按钮是否适合触控、播放/暂停/重置是否稳定、数学符号 π/2、k ∈ Z、tan x 等是否课堂可读、console 是否有错误。

如果需要启动本地平台，请使用 npm run dev，并记录测试 URL、视口尺寸、资源 id、观察结果和风险等级。不要修资源；发现问题只写报告和建议状态。浏览器通过只能建议进入 browser_review，不能进入 classroom_trial、release_candidate 或 published。

禁止：不允许直接改 develop；不允许修改 content/curriculum/index.yaml；不允许提交 content/production/resource-backlog.json 或 apps/web/src/data/workspace-data.json；不允许修改 apps/web 源码或任何资源包；不允许用“页面能打开”替代首屏、大屏、触控和 console 检查。

完成前请运行 npm run validate:content 和 npm run verify。如 verify 生成了 workspace-data.json 或 resource-backlog.json 的 diff，不要提交这些 generated files，只在回复中说明，等待总控统一再生。

请提交本分支，并按固定格式回复：

分支名：
commit hash：
改动文件：
运行的验证命令：
验证结果：
建议状态：
剩余风险：
是否改动全局生成文件：
是否修改课程图谱：
是否需要总控特别关注：
```
