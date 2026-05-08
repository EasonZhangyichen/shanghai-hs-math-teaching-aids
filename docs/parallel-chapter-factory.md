# 并行章节工厂

更新时间：2026-05-08

## 目标

全高中资源量很大，不能用一个对话按章节慢慢排队完成。后续采用“并行章节工厂”：多个章节可以同时做来源核对和课程图谱，但每个章节都必须经过同一套质量闸门，再进入资源生产。

并行的目的不是加速生成大量低质资源，而是把不同章节的“查证、筛选、骨架、精修”拆开，让每个对话只拿一个清晰任务。

## 适合并行的工作

- 不同章节的沪教版目录核对。
- 不同章节的 dolearning / 纸质教材 / 上海平台来源证据记录。
- 不同章节的数字化必要性筛选。
- 已确认章节的同类型资源骨架生成。
- 不同资源包的单资源精修。

## 不适合并行的工作

- 多个对话同时修改 `content/curriculum/index.yaml` 的同一章节。
- 多个对话同时在同一个分支上写文件。
- 一个对话一次处理整本书全部章节。
- 目录未终核就批量 scaffold。
- 为追求覆盖率给每节课强行添加 Applet 或 Manim。

## 并行批次建议

每轮最多并行 3 到 5 个章节。首轮建议只做课程图谱和必要性筛选，不直接制作完整资源。

推荐首轮候选：

```text
必修第二册第 6 章：三角前置与任意角、弧度制
必修第二册第 9 章：复数
必修第一册函数主线章节
必修第一册几何或统计相关章节
已完成第 7、8 章的数学审校/课堂试读
```

具体章节以沪教版教材和 dolearning 目录为准；如果来源无法确认，章节只能停留在 `draft`。

## 单章节流水线

每个章节都按下列顺序推进：

```text
1. 来源核对
   只记录沪教版纸质教材、dolearning、上海平台、辅助来源，不写资源。

2. 课程图谱
   建立章节、课时、知识点、先修后续、教学痛点。

3. 数字化必要性筛选
   只保留数字化确有价值的 Applet / Manim / Diagnosis 候选。

4. 总控合并
   总控对话检查来源、YAML、backlog、verify，再合入 develop。

5. 资源骨架
   按同一资源类型小批量 scaffold，一次 3 到 10 个。

6. 单资源精修
   每个完整 Applet、Manim 或 Diagnosis 单独开对话。

7. 审校与试用
   数学审校、课堂节奏、浏览器复核、状态升级。
```

任何章节跳过第 1 到第 3 步，都不能进入批量 scaffold。

## 分支与工作区规则

最安全做法是每个并行章节使用独立短分支：

```text
codex/curriculum-b2-c06-source-audit
codex/curriculum-b2-c09-source-audit
codex/curriculum-b1-functions-source-audit
```

如果多个对话需要同时写文件，应使用不同 git worktree，避免共用同一个本地工作目录。

```bash
git worktree add ../数学教育教师云平台-b2-c06 -b codex/curriculum-b2-c06-source-audit develop
git worktree add ../数学教育教师云平台-b2-c09 -b codex/curriculum-b2-c09-source-audit develop
git worktree add ../数学教育教师云平台-b1-functions -b codex/curriculum-b1-functions-source-audit develop
```

每个 worktree 中的新对话都必须先读取项目锚点文件，运行 `git status --short` 和 `git branch --show-current`，再确认任务边界。

## 总控验收

每个并行章节提交回总控前，必须满足：

- `npm run generate:backlog` 通过。
- `npm run verify` 通过。
- 新增或修改的来源记录在 `docs/source-audits/` 下。
- 课程图谱中的未确认内容标记为 `draft` 或 `needs_manual_textbook_check`。
- `digital_entry_points` 已通过数字化必要性筛选。
- 不复制教材正文、官方课件、教案或商业题库。

总控只合并通过验收的章节。若来源不清或 8.3 这类课时边界未确认，保留待核项，不为了推进速度强行合并为 verified。

## 新对话提示词模板

```text
请先读取 docs/00-project-brief.md、docs/01-current-state.md、docs/02-next-actions.md、docs/git-workflow.md、docs/content-standards.md、docs/codex-collaboration-guide.md、docs/resource-factory-workflow.md、docs/parallel-chapter-factory.md、docs/thread-starter-prompts.md、content/curriculum/index.yaml 和 content/production/resource-backlog.json，然后运行 git status --short 和 git branch --show-current。

这次只做【章节名称】的来源核对与课程图谱准备，不制作资源包，不 scaffold。最高依据顺序是沪教版纸质教材、dolearning 上海数字教学/备课资源平台、上海官方平台；国家智慧教育平台和公开电子教材只作辅助交叉验证。

请输出来源核对记录、章节/课时疑点、是否需要人工终核，以及初步数字化必要性判断。完成后运行 npm run generate:backlog 和 npm run verify，更新 docs/01-current-state.md 与 docs/02-next-actions.md，并提交。
```
