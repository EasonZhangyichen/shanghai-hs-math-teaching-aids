# B2-C08 数学显示闸门二轮审计

审计日期：2026-05-20

审计分支：`codex/audit-b2-c08-math-display-gate-round2`

基线提交：`21bea83`

写入范围：仅本报告。未修改 Applet、Manim、Diagnosis 资源包，未修改课程图谱、状态字段、平台源码、backlog 或 generated files。

## 总控接收说明

- 总控接收分支：`codex/integrate-b2-c08-audit-reports-20260520`。
- 总控接收基线：当前 `develop` 为 `ec94106`，已包含平台 Markdown 数学渲染修复、B2-C08 来源边界措辞加固和规则文档更新。
- 本报告仍按 docs-only 审计记录接收；它不修复 P0/P1/P2 项，也不改变任何资源状态。
- 因 P0/P1 项集中在 B2-C08 Diagnosis item-bank、资源文档、Manim 文档和 L05 aria fallback，平台级 Markdown 分式渲染修复不能替代这些资源内修复。本报告继续作为下一轮修复队列依据。

## 审计范围

本轮覆盖 B2-C08 当前已实现的 10 个资源包：

- Applet：`SH-HS-MATH-HJ-B2-C08-L01-A01`、`L02-A01`、`L03-A01`、`L04-A01`、`L05-A01`、`L10-A01`
- Manim：`SH-HS-MATH-HJ-B2-C08-L04-M01`
- Diagnosis：`SH-HS-MATH-HJ-B2-C08-L02-D01`、`L05-D01`、`L10-D01`

重点扫描：

- `theta`、`lambda`、`omega`、`phi`、`kpi`、`2pi`、`3pi`
- `sin x / cos x`
- `π/2`、`3π/2`、`2π/ω`、`-φ/ω` 等横向分式
- ASCII `<=`、`>=`、`->` 等应替换为数学符号的课堂可见表达

## 总体结论

B2-C08 Applet 主界面相较上一轮已有明显修复：`L04-A01` 不再把 `angle_degrees`、`cos_theta` 等字段名显示给课堂；`L05-A01` 与 `L10-A01` 的主界面已把典型 `π` 分式和比例式改为上下结构；`L02-A01` Applet 主界面路径箭头已使用 `→`。

但二轮数学显示闸门仍未通过。当前主要阻断不在 Applet 主界面，而在 Diagnosis 题组和资源文档：

- `L10-D01` 学生可见题干、选项和期望答案仍有 `1/2`、`2/3`、`1/3` 横向分式。
- `L02-D01`、`L10-A01` 教师/学生文档、`L04-M01` Manim 文档仍有大量路径 `A -> B -> C`、`D -> A -> E`。
- `L05-A01` Applet 视觉分式已合格，但 `math-frac` 的 `aria-label` 仍读作 `pi over 3`、`pi over 2`，屏幕阅读降级不统一。

本报告不得作为进入 `math_review`、`browser_review`、`classroom_trial`、`release_candidate` 或 `published` 的依据。

## P0 阻断清单

### P0-1 `L10-D01` 学生可见比例分式仍是横向斜杠

涉及文件：

- `content/diagnosis/SH-HS-MATH-HJ-B2-C08-L10-D01/item-bank.yaml:24`
- `content/diagnosis/SH-HS-MATH-HJ-B2-C08-L10-D01/item-bank.yaml:26`
- `content/diagnosis/SH-HS-MATH-HJ-B2-C08-L10-D01/item-bank.yaml:64`
- `content/diagnosis/SH-HS-MATH-HJ-B2-C08-L10-D01/item-bank.yaml:140`
- `content/diagnosis/SH-HS-MATH-HJ-B2-C08-L10-D01/item-bank.yaml:141`
- `content/diagnosis/SH-HS-MATH-HJ-B2-C08-L10-D01/item-bank.yaml:142`

问题：题组中 `1/2`、`2/3`、`1/3` 出现在学生题干、选项、反馈和期望答案中，是 Diagnosis 播放器或教师讲评会直接展示的数学表达。按 `docs/content-standards.md`，分式必须使用上下结构或等效数学排版，不能以横向纯文本斜杠作为主要展示。

建议：将这些比例倍数统一改为可渲染的上下结构分式，例如 MathML、项目约定的轻量公式片段，或在 Diagnosis 播放器支持的安全公式格式中表达；若暂时只能纯文本，应改成“二分之一”“三分之二”等中文读法，避免斜杠分式。

建议修复分支：`codex/repair-b2-c08-l10-diagnosis-fraction-display`

## P1 阻断清单

### P1-1 `L02-D01` Diagnosis 题组与教师说明仍暴露 ASCII 路径箭头

涉及文件：

- `content/diagnosis/SH-HS-MATH-HJ-B2-C08-L02-D01/item-bank.yaml:19`
- `content/diagnosis/SH-HS-MATH-HJ-B2-C08-L02-D01/item-bank.yaml:48`
- `content/diagnosis/SH-HS-MATH-HJ-B2-C08-L02-D01/item-bank.yaml:57`
- `content/diagnosis/SH-HS-MATH-HJ-B2-C08-L02-D01/item-bank.yaml:66`
- `content/diagnosis/SH-HS-MATH-HJ-B2-C08-L02-D01/item-bank.yaml:81`
- `content/diagnosis/SH-HS-MATH-HJ-B2-C08-L02-D01/item-bank.yaml:98`
- `content/diagnosis/SH-HS-MATH-HJ-B2-C08-L02-D01/item-bank.yaml:109`
- `content/diagnosis/SH-HS-MATH-HJ-B2-C08-L02-D01/item-bank.yaml:128`
- `content/diagnosis/SH-HS-MATH-HJ-B2-C08-L02-D01/item-bank.yaml:133`
- `content/diagnosis/SH-HS-MATH-HJ-B2-C08-L02-D01/item-bank.yaml:137`
- `content/diagnosis/SH-HS-MATH-HJ-B2-C08-L02-D01/item-bank.yaml:152`
- `content/diagnosis/SH-HS-MATH-HJ-B2-C08-L02-D01/item-bank.yaml:157`
- `content/diagnosis/SH-HS-MATH-HJ-B2-C08-L02-D01/teacher-notes.md:22`
- `content/diagnosis/SH-HS-MATH-HJ-B2-C08-L02-D01/teacher-notes.md:24`
- `content/diagnosis/SH-HS-MATH-HJ-B2-C08-L02-D01/teacher-notes.md:31`

问题：`A -> B -> C`、`C -> A -> B`、`起 -> 终` 属于学生和教师会直接看到的路径语言。当前 Applet 主界面已改用 `→`，Diagnosis 题组仍用 ASCII `->`，同一课时符号系统不一致。

建议：统一替换为 `A → B → C`、`起 → 终`。若用于无样式或导出纯文本，可保留等价中文“从 A 到 B 再到 C”，但不要继续显示 `->`。

建议修复分支：`codex/repair-b2-c08-l02-diagnosis-path-arrows`

### P1-2 `L10-A01` Applet 文档和 metadata 仍混用 ASCII 路径箭头

涉及文件：

- `content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01/README.md:38`
- `content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01/README.md:53`
- `content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01/README.md:54`
- `content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01/README.md:55`
- `content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01/metadata.yaml:54`
- `content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01/metadata.yaml:57`
- `content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01/metadata.yaml:58`
- `content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01/metadata.yaml:59`
- `content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01/metadata.yaml:183`
- `content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01/teacher-script.md:31`
- `content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01/teacher-script.md:64`
- `content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01/teacher-script.md:65`
- `content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01/teacher-script.md:66`
- `content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01/teacher-script.md:71`
- `content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01/teacher-script.md:85`
- `content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01/teacher-script.md:96`
- `content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01/student-task.md:53`
- `content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01/student-task.md:54`
- `content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01/student-task.md:55`

问题：`L10-A01/src/index.html` 的路径按钮和动态提示已使用 `D → A → E`，但 README、metadata、教师脚本和学生活动仍保留 `D -> A -> E`。这会让同一资源在平台说明、教师脚本、学生任务和 Applet UI 之间出现显示口径分裂。

建议：把路径链统一为 `D → A → E`、`D → B → C → E`、`D → B → E`，把流程语句 `选基向量 -> 表示点 -> 拆路径 -> 合并同类向量` 改为 `选基向量 → 表示点 → 拆路径 → 合并同类向量`。

建议修复分支：`codex/repair-b2-c08-l10-doc-path-arrows`

### P1-3 `L04-M01` Manim 文档核心叙事仍使用 ASCII 流程箭头

涉及文件：

- `content/manim/SH-HS-MATH-HJ-B2-C08-L04-M01/README.md:16`
- `content/manim/SH-HS-MATH-HJ-B2-C08-L04-M01/README.md:17`
- `content/manim/SH-HS-MATH-HJ-B2-C08-L04-M01/README.md:18`
- `content/manim/SH-HS-MATH-HJ-B2-C08-L04-M01/README.md:19`
- `content/manim/SH-HS-MATH-HJ-B2-C08-L04-M01/storyboard.md:7`
- `content/manim/SH-HS-MATH-HJ-B2-C08-L04-M01/storyboard.md:8`
- `content/manim/SH-HS-MATH-HJ-B2-C08-L04-M01/storyboard.md:9`
- `content/manim/SH-HS-MATH-HJ-B2-C08-L04-M01/storyboard.md:10`

问题：这些是 Manim 文档的核心课堂叙事链，当前写成 `-> 从 a 的终点作垂线` 等 ASCII 箭头。虽然视频画面本身使用 `θ`、`cosθ` 和中文标签，但教师备课文档仍未满足数学显示统一性。

建议：改为 `→ 从 a 的终点作垂线` 等，或直接写成中文编号步骤。保持 `|a|cosθ` 不变；本轮未发现 Manim 文档继续暴露 `theta`、`pi`、`cos theta`。

建议修复分支：`codex/repair-b2-c08-l04-manim-doc-arrows`

### P1-4 `L05-A01` Applet 分式 aria-label 仍使用英文 `pi over`

涉及文件：

- `content/applets/SH-HS-MATH-HJ-B2-C08-L05-A01/src/index.html:553`
- `content/applets/SH-HS-MATH-HJ-B2-C08-L05-A01/src/index.html:586`
- `content/applets/SH-HS-MATH-HJ-B2-C08-L05-A01/src/index.html:587`
- `content/applets/SH-HS-MATH-HJ-B2-C08-L05-A01/src/index.html:588`
- `content/applets/SH-HS-MATH-HJ-B2-C08-L05-A01/src/index.html:758`
- `content/applets/SH-HS-MATH-HJ-B2-C08-L05-A01/src/index.html:759`

问题：视觉层面 `π/3`、`π/2` 已使用上下结构 `.math-frac`，但 `aria-label="pi over 3"`、`aria-label="pi over 2"` 以及 `fractionHtml()` 的 `${numerator} over ${denominator}` 会让读屏或辅助技术暴露英文 fallback。项目标准要求屏幕阅读或无样式降级时公式仍有可理解的等价文本；这里应与中文课堂读法一致。

建议：将 aria 改为中文读法，例如 `3 分之 π`、`2 分之 π`、`3 分之 2π`，或提供 `aria-label="π 除以 3"` 这类中文等价文本，并补充资源自检扫描 `pi over` / ` over `。

建议修复分支：`codex/repair-b2-c08-l05-fraction-aria-labels`

### P1-5 `L05-A01` 教师脚本仍用 ASCII `->` 表示推出关系

涉及文件：

- `content/applets/SH-HS-MATH-HJ-B2-C08-L05-A01/teacher-script.md:51`
- `content/applets/SH-HS-MATH-HJ-B2-C08-L05-A01/teacher-script.md:52`
- `content/applets/SH-HS-MATH-HJ-B2-C08-L05-A01/teacher-script.md:53`

问题：教师脚本已把 `π/2` 改为 MathML 上下分式，但三条板书落点仍写成 `-> a·b > 0`。这是课堂板书建议，属于教师可见数学显示。

建议：改为 `⇒`、`→` 或中文“所以”。若沿用列表板书，推荐 `0 < θ < ... ⇒ a·b > 0`，与 Applet 主界面的数学符号统一。

建议修复分支：可并入 `codex/repair-b2-c08-l05-fraction-aria-labels`，或单独开 `codex/repair-b2-c08-l05-teacher-script-arrows`。

## P2 阻断清单

### P2-1 `L10-D01` 评分/教师提示中的 ASCII 流程箭头需统一

涉及文件：

- `content/diagnosis/SH-HS-MATH-HJ-B2-C08-L10-D01/scoring-rubric.md:24`
- `content/diagnosis/SH-HS-MATH-HJ-B2-C08-L10-D01/teacher-notes.md:29`

问题：`题目特征 -> 向量工具`、`题目特征 -> 第一工具` 主要出现在教师评分和看板建议中，不是学生答题主体，但仍属于资源文档可见表达。

建议：改为 `题目特征 → 向量工具`、`题目特征 → 第一工具`。

建议修复分支：可并入 `codex/repair-b2-c08-l10-diagnosis-fraction-display`。

## 已通过或未命中项

- 未发现 B2-C08 学生可见区域继续使用 `omega`、`phi`、`kpi`、`2pi`、`3pi`、`2π/ω`、`-φ/ω` 或 `sin x / cos x`。这些多属于第 7 章三角函数资源，不在本章向量资源主线中。
- `L03-A01` Applet 视觉层面使用 `λ`、`λa`、`|λ|`；`lambda` 命中主要是 CSS class、test id、metadata 字段名或 review 说明，不属于课堂可见数学显示。
- `L04-A01` Applet 视觉层面已使用“夹角 θ”“cos θ”“有向投影长度”“数量积符号”，未再发现 `cos_theta` 等字段名课堂外露。
- `L05-A01` Applet 视觉层面已使用上下结构 `π` 分式；本轮只保留 aria 与教师脚本箭头问题。
- `L10-A01` Applet 主界面中 `AD/AB`、`AE/AC`、常见比例刻度已使用上下结构分式，路径按钮已使用 `→`；剩余问题集中在 README、metadata、教师脚本和学生活动。
- 代码中的 `<=`、`>=`、`theta`、`lambda`、`Math.PI`、坐标计算等属于实现逻辑或事件 payload，未按课堂可见数学显示阻断处理。

## 建议后续修复分支

优先：

1. `codex/repair-b2-c08-l10-diagnosis-fraction-display`
2. `codex/repair-b2-c08-l02-diagnosis-path-arrows`
3. `codex/repair-b2-c08-l10-doc-path-arrows`
4. `codex/repair-b2-c08-l05-fraction-aria-labels`

可合并处理：

5. `codex/repair-b2-c08-l04-manim-doc-arrows`
6. `codex/repair-b2-c08-l05-teacher-script-arrows`

## 状态边界

- 不建议将任何 B2-C08 资源升级到 `math_review`、`browser_review`、`classroom_trial`、`release_candidate` 或 `published`。
- 现有 `draft`、`self_checked_draft`、`metadata_ready`、`video_ready` 只是当前资源包或平台预览能力记录，不代表数学显示闸门通过。
- 第 8 章仍需纸质教材、已登录 dolearning/上海数字教育或教学平台终核；本报告只审数学显示，不处理来源终核和状态升级。

## 验证记录

已运行：

```bash
npm run validate:content
```

结果：

```text
Content validation passed: 70 lessons, 14 applet(s), 4 Manim clip(s), 7 diagnosis package(s).
```
