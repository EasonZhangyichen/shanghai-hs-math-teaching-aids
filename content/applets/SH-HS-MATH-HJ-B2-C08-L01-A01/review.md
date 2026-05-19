# 审核记录：向量表示与等价拖拽板

资源 ID：`SH-HS-MATH-HJ-B2-C08-L01-A01`

当前状态：`draft`

本轮日期：2026-05-19

本轮范围：仅 `content/applets/SH-HS-MATH-HJ-B2-C08-L01-A01/**`

## 本轮结论

建议保持 `draft`，本轮仅作为 `self_checked_draft` 级别的作者自检记录。

本轮复核并修正 8.1.1 阶段的数学语言：平面网格中可以拖动蓝色 `AB` 定义向量，橙色 `CD` 始终按同一几何位移平移到新起点；界面统一为几何位移、水平位移、竖直位移、大小、方向、端点顺序和起点对照。资源主线聚焦“相等向量可以平移”，不提前使用后续课时的解析化表示与运算口径，不修改课程图谱，仍不得进入 `classroom_trial`、`release_candidate` 或 `published`。

## 数学自检

- 非零向量相等的课堂口径：大小相等且方向相同。
- 网格证据口径：用“从起点到终点的水平位移、竖直位移”作为几何证据，不采用后续解析化记法。
- 起点变化对照：拖动 `C`、`D` 或橙色向量整体时，只改变 `C` 和 `D` 的位置，不改变几何位移、大小和方向。
- 零向量边界：当 `A` 与 `B` 重合时显示长度为 0，方向不规定。
- 资源边界：不引入向量加减法、数乘、后续解析化运算训练或 8.3 课时划分判断。

## 本轮修改

- `src/index.html`：将界面证据、归纳语和辅助线标签改为几何位移、水平位移、竖直位移、大小和方向；移除后续解析化展示，并微调 iframe 首屏高度与触控目标。
- `metadata.yaml`：将学习目标、数学边界、交互说明、反馈证据收回到几何位移、大小和方向语言。
- `README.md`：同步清理后续解析化和角度化前置口径。
- `teacher-script.md`：将板书和追问改为“几何位移、大小、方向”。
- `student-task.md`：将记录任务改为水平位移、竖直位移观察和相等向量判断。

## 验证记录

- `npm run validate:content`：通过。输出为 `Content validation passed: 70 lessons, 14 applet(s), 4 Manim clip(s), 7 diagnosis package(s).`
- `npm run verify`：通过。内容校验、backlog 生成、32 项 node test 和 Vite build 均通过；Vite 仍提示 bundle 超过 500 kB，这是既有构建体积提示，不指向本资源。
- 浏览器冒烟：通过。使用本地 Vite 与平台预览 iframe 复核；864 x 560 iframe 内，页面标题为“向量表示与等价拖拽板”，主画板和侧栏同屏，按钮最小高度 42 px，点击“3 证据”和“痕迹”后证据层与痕迹开关正常；过滤 Browser 插件自身 Statsig 网络噪声后，未见本资源 console error。
- `npm run verify` 再生了 `apps/web/src/data/workspace-data.json` diff；本分支已恢复该 generated file，等待总控统一再生。

## 剩余风险

- 第 8 章仍处于 `draft` / `needs_manual_textbook_check`；8.3 课时边界未终核，本资源不能作为第 8 章全章已终核证据。
- 尚未经过数学审校者复核，尤其需要确认 8.1.1 阶段保留水平位移、竖直位移证据是否适合班级基础。
- 尚未经过真实投屏、触控大屏和教师 14 分钟流程试读。
- 学生可能把“拖动端点改变向量”和“拖动整条向量平移位置”混淆，教师脚本中需明确区分。

## 下一状态建议

- 建议：`self_checked_draft`。
- 暂不建议：`math_review`、`browser_review`。
- 仍不得进入：`classroom_trial`、`release_candidate` 或 `published`。
