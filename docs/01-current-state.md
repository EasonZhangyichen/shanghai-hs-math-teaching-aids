# 当前状态

更新时间：2026-04-30

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
- `apps/`：后续教师端平台与课件播放器。
- `packages/`：后续共享 SDK、引擎适配和 schema。
- `scripts/`：后续校验、生成和导出工具。

## 当前尚未完成

- 尚未正式核验沪教版教材全册课时目录。
- 必修第二册第 7 章目录已完成首版结构化整理，但尚未完成纸质教材人工终核。
- 第 7 章的前置章节节点、第 8 章平面向量和第 9 章复数等后续节点仍是引用占位，尚未展开为完整图谱。
- 尚未创建 Web 平台代码。
- 尚未创建真实 Applet 或 Manim 动画。
- 尚未搭建元数据校验脚本。
- 尚未配置 GitHub 分支保护规则。

## 继续工作时优先读取

每次新的 Codex 会话应先读取：

1. `docs/00-project-brief.md`
2. `docs/01-current-state.md`
3. `docs/02-next-actions.md`
4. `docs/git-workflow.md`
5. `docs/content-standards.md`
6. `docs/codex-collaboration-guide.md`
7. `docs/thread-starter-prompts.md`
8. `content/curriculum/index.yaml`
