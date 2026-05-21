# B2-C08 数学显示 Round3 总控复审计划

计划日期：2026-05-20

计划分支：`codex/audit-plan-b2-c08-math-display-round3`

基线：`develop` 最新提交 `f2c4b32`（`Merge b2 c08 audit followup reports`）

写入范围：仅本计划文件。未修改 Applet、Manim、Diagnosis 资源包，未修改课程图谱、状态字段、平台源码、backlog 或 generated files。

## 定位

本文件不是 B2-C08 数学显示最终复审报告，只作为总控合并与 Round3 复审调度计划。

Round2 报告 `docs/review-audits/b2-c08-math-display-gate-round2-2026-05-20.md` 的结论仍然有效：B2-C08 数学显示闸门未通过，阻断项集中在 Diagnosis 题组、资源文档、Manim 文档和 L05 可访问文本降级。只有下列修复分支逐条验收并合入总控后，才启动 Round3 复审线。

本计划不得作为进入 `math_review`、`browser_review`、`classroom_trial`、`release_candidate` 或 `published` 的依据。

## Round2 剩余阻断项与修复分支

| 优先级 | Round2 编号 | 范围 | 阻断摘要 | 对应修复分支 | 合并前总控验收重点 |
| --- | --- | --- | --- | --- | --- |
| P0 | P0-1 | `content/diagnosis/SH-HS-MATH-HJ-B2-C08-L10-D01/item-bank.yaml` | 学生题干、选项、反馈和期望答案仍有 `1/2`、`2/3`、`1/3` 横向分式。 | `codex/repair-b2-c08-l10-diagnosis-fraction-display` | 确认学生可见比例分式改为上下结构、中文读法或 Diagnosis 支持的安全公式格式；不把代码内部或比例标记误判为课堂显示。 |
| P1 | P1-1 | `content/diagnosis/SH-HS-MATH-HJ-B2-C08-L02-D01/item-bank.yaml`、`teacher-notes.md` | Diagnosis 题组与教师说明仍暴露 `A -> B -> C`、`起 -> 终` 等 ASCII 路径箭头。 | `codex/repair-b2-c08-l02-diagnosis-path-arrows` | 确认学生题干、反馈、教师讲评表统一为 `→` 或中文路径表述；保持向量首尾相接语义不变。 |
| P1 | P1-2 | `content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01/README.md`、`metadata.yaml`、`teacher-script.md`、`student-task.md`、必要时 `review.md` | L10 文档和 metadata 仍混用 `D -> A -> E`、`选基向量 -> 表示点 -> 拆路径 -> 合并同类向量`。 | `codex/repair-b2-c08-l10-doc-path-arrows-and-selfcheck` | 确认文档、metadata、教师脚本、学生任务和自检口径一致；若新增自检，避免只依赖脆弱的整句匹配。 |
| P1 | P1-3 | `content/manim/SH-HS-MATH-HJ-B2-C08-L04-M01/README.md`、`storyboard.md` | Manim 核心叙事仍以 `->` 开头表达流程步骤。 | `codex/repair-b2-c08-l04-manim-doc-arrows` | 确认文档叙事改为 `→` 或中文编号步骤；不得重渲染视频或修改已有视频资源，除非总控另开视频线。 |
| P1 | P1-4 | `content/applets/SH-HS-MATH-HJ-B2-C08-L05-A01/src/index.html` | `.math-frac` 视觉分式已合格，但 `aria-label="pi over 3"`、`fractionHtml()` 的英文 fallback 仍会被读屏暴露。 | `codex/repair-b2-c08-l05-fraction-aria-and-script-arrows` | 确认可访问文本改为中文等价读法，例如 `3 分之 π`、`2 分之 π` 或 `π 除以 3`，并保留视觉上下结构。 |
| P1 | P1-5 | `content/applets/SH-HS-MATH-HJ-B2-C08-L05-A01/teacher-script.md` | 教师脚本板书落点仍用 `-> a·b > 0`、`-> a·b = 0`、`-> a·b < 0`。 | `codex/repair-b2-c08-l05-fraction-aria-and-script-arrows` | 与 P1-4 同线处理；确认推出关系改为 `⇒`、`→` 或中文“所以”，不回退 MathML 分式。 |
| P2 | P2-1 | `content/diagnosis/SH-HS-MATH-HJ-B2-C08-L10-D01/scoring-rubric.md`、`teacher-notes.md` | 教师评分和看板建议仍有 `题目特征 -> 向量工具`、`题目特征 -> 第一工具`。 | `codex/repair-b2-c08-l10-diagnosis-fraction-display` | 可并入 P0-1 同线；确认教师可见文档也统一为 `→` 或中文表述。 |

## 合并批次建议

1. 先合并 P0/P2 同线：`codex/repair-b2-c08-l10-diagnosis-fraction-display`。该线影响 Diagnosis 学生主体题组，是 Round3 能否启动的硬前提。
2. 再合并两个路径文档线：`codex/repair-b2-c08-l02-diagnosis-path-arrows` 与 `codex/repair-b2-c08-l10-doc-path-arrows-and-selfcheck`。这两线都属于箭头显示统一，合并后应重点防止 generated files 混入。
3. 再合并 L05 可访问与教师脚本线：`codex/repair-b2-c08-l05-fraction-aria-and-script-arrows`。该线需要同时确认视觉分式、读屏 fallback 和教师板书推出关系。
4. 最后合并 Manim 文档箭头线：`codex/repair-b2-c08-l04-manim-doc-arrows`。该线应保持 docs/resource metadata 范围，不触碰视频产物。

每条修复线回收时，总控至少核对：

- `git branch --contains <commit>`：确认 commit 位于对应修复分支。
- `git show --stat <commit>`：确认改动范围没有超出总控允许文件。
- `git diff --name-only develop...<branch>`：确认没有 `content/production/resource-backlog.json`、`apps/web/src/data/workspace-data.json` 或其他 generated files 混入，除非总控明确要求再生。
- 修复线验证记录：至少 `npm run validate:content`；若改 HTML、测试或平台代码，需补 `npm run verify` 或资源自检命令。

## 合并后 Round3 复审启动条件

Round3 复审线只能在以下条件全部满足后启动：

- `develop` 已合入上表所有 P0/P1/P2 对应修复分支，且 `git status --short` 干净。
- 总控确认本计划不是最终复审报告，Round3 需另开独立分支，例如 `codex/audit-b2-c08-math-display-gate-round3`。
- Round3 复审只写新报告，不直接修资源；若发现回归，退回对应 `codex/repair-*` 分支处理。
- 复审前记录基线 commit、已合并修复分支、每条修复线 commit hash 和验证命令。

## Round3 复审清单

### 1. 静态扫描

Round3 报告应先对目标范围运行静态扫描，并区分代码内部标识与学生/教师可见文本。

建议扫描范围：

```bash
rg -n "1/2|2/3|1/3|pi over| over |->|AD/AB|AE/AC|AB / AC|AB / BC|theta|Theta|lambda|omega|phi|kpi|2pi|3pi|sin x / cos x" \
  content/diagnosis/SH-HS-MATH-HJ-B2-C08-L02-D01 \
  content/diagnosis/SH-HS-MATH-HJ-B2-C08-L10-D01 \
  content/applets/SH-HS-MATH-HJ-B2-C08-L05-A01 \
  content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01 \
  content/manim/SH-HS-MATH-HJ-B2-C08-L04-M01
```

扫描命中需要分类记录：

- 学生题干、选项、反馈、期望答案、教师讲评、README、metadata、teacher-script、student-task、review 中的可见文本。
- HTML 运行态显示文本、`aria-label`、helper 生成的 fallback 文本。
- 代码变量名、CSS class、测试内部断言、文件路径等不直接作为阻断，但若断言反映课堂文本，应继续核对。

### 2. P0/P1/P2 逐项复核

- `L10-D01`：确认 `item-bank.yaml` 中学生可见 `1/2`、`2/3`、`1/3` 不再以横向斜杠分式出现；若改为中文读法，语义仍需表达“一半”“三分之二”“三分之一”。
- `L02-D01`：确认 `item-bank.yaml` 与 `teacher-notes.md` 不再出现课堂可见 `->`；路径方向仍保持原题语义。
- `L10-A01`：确认 README、metadata、teacher-script、student-task、review 中的路径链统一为 `→` 或中文；确认主界面此前已修复的路径按钮和比例分式未回退。
- `L04-M01`：确认 README 与 storyboard 不再用 ASCII `->` 作为叙事箭头；视频、poster、mp4/webm 不在本轮复审线修改范围内。
- `L05-A01`：确认 `aria-label`、`fractionHtml()` 和教师脚本没有 `pi over`、英文 ` over ` 或 `-> a·b`；视觉层 `.math-frac` 上下结构仍保留。
- `L10-D01` P2：确认 `scoring-rubric.md` 与 `teacher-notes.md` 中教师看板箭头已统一。

### 3. 既有修复防回归

Round3 不是重新审全章资源生产质量，但应抽查前序高风险点没有回退：

- `L04-A01`：课堂读数卡不得恢复 `angle_degrees`、`cos_theta`、`signed_projection`、`dot_sign` 或 `F(x,y)`。
- `L05-A01`：视觉层 `π/2`、`π/3`、`2π/3` 等不得回退为横向纯文本斜杠分式。
- `L10-A01`：主界面 `AD/AB`、`AE/AC`、常见比例和路径公式不得回退为横向斜杠分式；平台 560px iframe hold 仍按最新报告保留，不能因数学显示复审自动解除。
- 状态边界：任何资源不得因 Round3 通过而自动升级到 `math_review`、`browser_review`、`classroom_trial`、`release_candidate` 或 `published`；状态升级仍需来源终核、浏览器/课堂/教师观看等独立闸门。

### 4. Round3 报告要求

Round3 报告应新增一份独立 docs-only 报告，建议路径：

```text
docs/review-audits/b2-c08-math-display-gate-round3-2026-05-20.md
```

报告必须写明：

- 审计分支、基线 commit、已合并修复分支与各自 commit hash。
- Round2 P0/P1/P2 每一项的复审结论：通过、未通过或需要回退修复。
- 静态扫描命中与分类，尤其说明代码内部命中为何不计入课堂可见阻断。
- 是否发现新的 P0/P1/P2 阻断项。
- 验证命令与结果，至少包含 `npm run validate:content`。
- 明确状态边界：Round3 数学显示复审不等于来源终核、浏览器闸门、课堂试读或发布闸门。

## 本计划验证要求

本计划分支只新增本文件。完成后运行：

```bash
npm run validate:content
```

若验证生成全局数据 diff，应恢复 generated files 并在回报中说明。本计划不需要运行浏览器复核、不需要修改资源包、不需要再生 backlog 或 workspace data。
