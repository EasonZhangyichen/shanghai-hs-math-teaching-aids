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

第一轮已验证的并行组合：

```text
必修第二册第 6 章：三角前置与任意角、弧度制
必修第二册第 9 章：复数
必修第一册函数主线章节
```

后续候选：

```text
必修第一册几何或统计相关章节
必修第一册第 3 章：幂、指数与对数
必修第一册第 4 章：幂函数、指数函数与对数函数
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

4. 总控集成
   总控对话检查来源、YAML、必要性筛选，统一再生 backlog 和平台数据，再合入 develop。

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

## 第一轮复盘结论

第一轮 B1 函数主线、B2-C06、B2-C09 三个章节并行验证了 worktree 模式可行，也暴露了冲突集中点：

- 真正需要并行产出的事实源是 `docs/source-audits/*` 和 `content/curriculum/index.yaml`。
- `content/production/resource-backlog.json`、`apps/web/src/data/workspace-data.json`、全局测试计数和 `docs/01-current-state.md` / `docs/02-next-actions.md` 会被每个章节同时修改，合并时必然冲突。
- 总控合并时应把这些生成型文件和全局状态文档视为 integration-owned，由总控在同一个集成分支统一更新。
- 并行章节分支可以运行校验，但提交时应尽量只保留事实源、来源记录和章节内证据，避免把自动生成文件和全局状态文档带入每个短分支。
- planned item 只是数字化必要性候选，不等于允许 scaffold。未终核章节的 planned item 只进入观察队列，不进入生产队列。

## 大规模并行操作逻辑

后续大面积展开时采用“三层并行”：

```text
Layer A: 来源图谱并行
  3 到 5 个章节并行做 source audit、draft YAML、digital necessity。
  不制作资源，不 scaffold，不渲染。

Layer B: 总控集成
  总控一次合并一批章节，解决 YAML 顺序、来源可信度、必要性门槛和生成文件。
  统一运行 npm run generate:backlog、npm run generate:content、npm run verify。

Layer C: 资源生产并行
  只有通过总控验收且课时边界足够明确的资源，才按同类型小批量 scaffold。
  完整 Applet / Manim / Diagnosis 仍按单资源或极小批量精修。
```

并行上限按阶段区分：

- 来源核对：每轮 3 到 5 个章节。
- 课程图谱写入：每轮 2 到 3 个章节，优先不同册或不同主题，降低 YAML 顺序冲突。
- 资源骨架：同一类型一次 3 到 10 个，但必须同分支、同资源类型、同验收标准。
- 完整资源精修：每个对话 1 个资源；同一批最多并行 3 到 5 个资源，且写入目录互不重叠。
- 数学审校/课堂试读：可以并行 3 到 8 个资源，但每个审校结果必须写入对应资源的 `review.md` 或专门审核记录。

## 并行分支提交范围

来源核对型分支推荐提交：

```text
docs/source-audits/<chapter>-source-audit.md
content/curriculum/index.yaml
必要时的章节内辅助文档
```

来源核对型分支不推荐提交：

```text
content/production/resource-backlog.json
apps/web/src/data/workspace-data.json
apps/web/src/lib/content.test.js 中的全局计数改动
scripts/*test.js 中的全局计数改动
docs/01-current-state.md
docs/02-next-actions.md
```

这些文件由总控集成分支统一生成和更新。若工作分支为了自测已经修改了它们，应在提交前说明；总控合并时可丢弃分支中的生成文件，再用当前集成后的 YAML 统一生成。

## 总控验收

每个并行章节提交回总控前，必须满足：

- 来源记录能说明每个高可信来源是否可访问，不能访问时要写明原因。
- 所有非纸质教材或未登录平台确认的课时边界标记为 `draft` 或 `needs_manual_textbook_check`。
- `digital_entry_points` 逐条说明数字化必要性；纸笔更合适的内容要明确排除。
- 不复制教材正文、官方课件、教案或商业题库。
- 至少运行 `npm run validate:content`。如果该分支修改了全局统计测试或生成文件，也要运行 `npm run verify`。
- 提交说明要列出：改动文件、来源可靠性、人工终核项、planned item 是否禁止 scaffold。

总控合并整批章节后，必须满足：

- `npm run generate:backlog` 通过。
- `npm run generate:content` 通过。
- `npm run verify` 通过。
- 新增或修改的来源记录在 `docs/source-audits/` 下。
- `docs/01-current-state.md` 与 `docs/02-next-actions.md` 反映整批结果，而不是单分支局部结果。

总控只合并通过验收的章节。若来源不清或 8.3 这类课时边界未确认，保留待核项，不为了推进速度强行合并为 verified。

## 新对话提示词模板

```text
请先读取 docs/00-project-brief.md、docs/01-current-state.md、docs/02-next-actions.md、docs/git-workflow.md、docs/content-standards.md、docs/codex-collaboration-guide.md、docs/resource-factory-workflow.md、docs/parallel-chapter-factory.md、docs/thread-starter-prompts.md、content/curriculum/index.yaml 和 content/production/resource-backlog.json，然后运行 git status --short 和 git branch --show-current。

这次只做【章节名称】的来源核对与课程图谱准备，不制作资源包，不 scaffold。最高依据顺序是沪教版纸质教材、dolearning 上海数字教学/备课资源平台、上海官方平台；国家智慧教育平台和公开电子教材只作辅助交叉验证。

请输出来源核对记录、章节/课时疑点、是否需要人工终核，以及初步数字化必要性判断。至少运行 npm run validate:content；如果你修改了生成文件或全局测试，再运行 npm run generate:backlog 和 npm run verify。提交前尽量不要提交 content/production/resource-backlog.json、apps/web/src/data/workspace-data.json、全局测试计数、docs/01-current-state.md 或 docs/02-next-actions.md，这些由总控集成分支统一更新。完成后提交，并在回复中说明改动文件、来源可靠性、人工终核项、planned item 是否禁止 scaffold。
```
