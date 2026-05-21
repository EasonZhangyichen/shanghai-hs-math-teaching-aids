# B2-C08 数学显示 Round3 Final 复审

审计日期：2026-05-21

审计分支：`codex/audit-b2-c08-math-display-round3-final`

基线提交：`39cbdde388360e996b2e2524d00e5dc53f29d1fa`

写入范围：仅本报告。未生产资源，未修复 Applet / Manim / Diagnosis，未修改资源状态、课程图谱、生产 backlog、平台生成数据或资源包文件。

## 复审范围

本轮按任务要求覆盖 B2-C08 当前已实现资源，并抽查 L01 / L02 / L03 / L04 / L05 / L10 / D01 / M01：

| 类型 | 资源 |
| --- | --- |
| Applet | `SH-HS-MATH-HJ-B2-C08-L01-A01`、`L02-A01`、`L03-A01`、`L04-A01`、`L05-A01`、`L10-A01` |
| Manim | `SH-HS-MATH-HJ-B2-C08-L04-M01` |
| Diagnosis | `SH-HS-MATH-HJ-B2-C08-L02-D01`、`L05-D01`、`L10-D01` |

重点扫描并人工分类：

- `theta` / `omega` / `phi` / `pi over` / 英文 `over`
- `1/2`、`2/3`、`pi/2`、`2pi/omega` 等横写分式
- ASCII `->`
- Markdown、`teacher-script`、`student-task`、`review`、`metadata` 与平台渲染口径不一致

## 总体结论

Round3 后，B2-C08 已实现资源包的学生主体内容未发现 P0 数学显示阻断；此前 Round2 的 L10-D01 学生比例分式、L02-D01 路径箭头、L05-A01 `pi over` aria fallback、L05 教师脚本箭头、L10-A01 文档路径箭头、L04-M01 Manim 文档箭头均未在本轮资源包扫描中复现为 P0/P1。

但本轮仍不建议升级任何状态。剩余问题集中在两个层面：

- P1：平台可见课程/课时数据中，B2-C08-L05 仍有 `cos theta`。
- P2：L10-D01 教师评分/看板 Markdown 仍有 `->`。

本报告不得作为进入 `math_review`、`browser_review`、`classroom_trial`、`release_candidate` 或 `published` 的依据。

## P0 结论

未发现新的 P0。

本轮未在已实现资源的学生题干、学生任务、Applet 主界面、Manim 文档主叙事或 Diagnosis 学生反馈中发现仍以课堂可见方式呈现的：

- `theta` / `omega` / `phi` / `pi over` / 英文 `over`
- `1/2`、`2/3`、`pi/2`、`2pi/omega` 等横写分式
- 学生主体路径 `->`

## P1 问题

### P1-1 平台课时数据仍暴露 `cos theta`

涉及文件：

- `content/curriculum/index.yaml:2349`
- `apps/web/src/data/workspace-data.json:11729`
- `apps/web/src/data/workspace-data.json:24397`

问题：B2-C08-L05 课时核心知识仍写作“用 `|a||b| cos theta` 定义向量数量积”。这不是 Applet / Diagnosis / Manim 资源包内部问题，但属于平台课时页可能展示的课程图谱文本，与资源内已经统一为 `θ` / `cos θ` 的口径不一致。

影响：平台侧浏览 L05 时可能仍出现英文 `theta` 占位，削弱 Round3 数学显示一致性。

建议修复分支：`codex/repair-b2-c08-l05-platform-core-knowledge-theta`

同线可由总控决定是否一并处理 B2-C08-L09 planned 文本中的同类 `cos theta`，但 L09 不计入本轮已实现资源复审结论。

## P2 问题

### P2-1 L10-D01 教师评分/看板建议仍使用 ASCII `->`

涉及文件：

- `content/diagnosis/SH-HS-MATH-HJ-B2-C08-L10-D01/scoring-rubric.md:24`
- `content/diagnosis/SH-HS-MATH-HJ-B2-C08-L10-D01/teacher-notes.md:29`

问题：教师可见文档仍有“题目特征 `->` 向量工具”“题目特征 `->` 第一工具”。该问题不在学生答题主体中，但仍属于资源 Markdown 可见表达，和 Applet / 其他文档的 `→` 口径不一致。

建议修复分支：`codex/repair-b2-c08-l10-diagnosis-teacher-arrow-cleanup`

## 非阻断命中说明

- `content/applets/SH-HS-MATH-HJ-B2-C08-L04-A01/src/index.html:964` 命中 `projection_state.theta`，该字段位于 `postMessage` payload 内部，不是页面文案；本轮不按课堂可见阻断处理。若平台未来展示 raw payload，应改为中文或 `angle_degrees` 等非占位字段。
- `content/applets/SH-HS-MATH-HJ-B2-C08-L02-A01/src/index.html:694-695` 命中 `Math.PI / 7`，为 canvas 箭头绘制计算，不是横写分式显示。
- `content/applets/SH-HS-MATH-HJ-B2-C08-L05-A01/src/layout.self-check.test.mjs` 命中 `pi over` 与 `over`，均为断言“不应出现”的测试文本，不是课堂显示。
- `content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01/review.md:47` 的 `8.1/8.2/8.3` 与“数量积/坐标法”属于教材节号和中文并列词，不按数学横写分式处理。

## 状态复核

资源包 metadata：

| 资源 | metadata 状态 | 实现/可用性 | review 状态 |
| --- | --- | --- | --- |
| `L01-A01` | `draft` | `runnable` | `self_checked_draft` |
| `L02-A01` | `draft` | `runnable` | `self_checked_draft` |
| `L03-A01` | `draft` | `runnable` | `self_checked_draft` |
| `L04-A01` | `draft` | `runnable` | `self_checked_draft` |
| `L05-A01` | `draft` | `runnable` | `self_checked_draft` |
| `L10-A01` | `draft` | `runnable` | `self_checked_draft` |
| `L04-M01` | `draft` | `video_ready` | `self_checked_draft` |
| `L02-D01` | `draft` | `metadata_ready` | `self_checked_draft` |
| `L05-D01` | `draft` | `metadata_ready` | `self_checked_draft` |
| `L10-D01` | `draft` | `metadata_ready` | `self_checked_draft` |

平台生成数据 `apps/web/src/data/workspace-data.json` 中，上述 10 个资源均保持：

- `status: draft`
- `quality.reviewStatus: self_checked_draft`
- Applet `implementationStage: runnable`
- Manim `implementationStage: video_ready`
- Diagnosis `implementationStage: scaffold`

生产 backlog 中上述资源为 `status: implemented`，表示生产进度，不是正式审核流转状态；其 `availability` 仍为 `metadata_ready` 或 `video_ready`，未发现升级为 `math_review`、`browser_review`、`classroom_trial`、`release_candidate` 或 `published`。

## 建议状态

建议维持冻结：`draft` / `self_checked_draft` / `metadata_ready` / `video_ready`。

在 P1 与 P2 清理完成并由总控复核前，不进入 `math_review`、`browser_review`、`classroom_trial`、`release_candidate` 或 `published`。

## 下一轮修复分支建议

优先：

1. `codex/repair-b2-c08-l05-platform-core-knowledge-theta`
2. `codex/repair-b2-c08-l10-diagnosis-teacher-arrow-cleanup`

可选合并：若总控希望一次性收尾，可开 `codex/repair-b2-c08-round3-display-leftovers`，但应限制写入范围为对应课程图谱/generated 再生与 L10-D01 两个 Markdown 文件，避免带入资源生产或状态升级。

## 剩余风险

- 本轮为静态复审与文件抽查，未重新打开浏览器做视觉验收；L05/L10/L04 既有浏览器结论仍应由对应浏览器闸门维护。
- B2-C08-L09 planned 文本也存在 `cos theta`，虽不属于本轮已实现资源，但会在全章/课程图谱视图中形成同类显示风险。
- L04-A01 仍有内部 payload key `theta`，当前不课堂可见；若平台后续显示 raw applet state，需要同步清理。

## 验证记录

已运行：

```bash
npm run validate:content
```

当前工作树结果：未通过，5 个错误均来自本轮开始前已存在的未跟踪非 B2-C08 资源目录/文件缺口：

- `content/applets/SH-HS-MATH-HJ-B1-C02-L05-A01` 缺少 `metadata.yaml`
- `content/applets/SH-HS-MATH-HJ-B1-C04-L04-A01` 缺少 `metadata.yaml`
- `content/applets/SH-HS-MATH-HJ-B1-C04-L06-A01` 缺少 `metadata.yaml`
- `content/applets/SH-HS-MATH-HJ-B2-C06-L03-A01` 缺少 `metadata.yaml`
- `SH-HS-MATH-HJ-B1-C02-L04-A01` 的 `files.src_entry` 指向 `content/applets/SH-HS-MATH-HJ-B1-C02-L04-A01/src/index.html`，但该文件缺失

本轮未改动上述目录。

为区分本次提交与当前工作树未跟踪目录的影响，另在 detached clean worktree `23cddea` 上复跑同一命令，结果通过：

```text
Content validation passed: 70 lessons, 14 applet(s), 4 Manim clip(s), 7 diagnosis package(s).
```

## 未改动确认

- 未改动 `content/curriculum/index.yaml`。
- 未改动 `content/production/resource-backlog.json`。
- 未改动 `apps/web/src/data/workspace-data.json`。
- 未改动 `content/applets/**`。
- 未改动 `content/manim/**`。
- 未改动 `content/diagnosis/**`。
- 未修改课程图谱。
- 未改动全局生成文件。
