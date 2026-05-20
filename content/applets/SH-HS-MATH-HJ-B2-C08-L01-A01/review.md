# 审核记录：向量表示与等价拖拽板

资源 ID：`SH-HS-MATH-HJ-B2-C08-L01-A01`

当前状态：`draft`

本轮日期：2026-05-20

本轮范围：仅 `content/applets/SH-HS-MATH-HJ-B2-C08-L01-A01/**`

## 本轮结论

建议保持 `draft`，本轮仅作为 `self_checked_draft` 级别的作者自检记录。

本轮在 8.1.1 阶段继续保持几何位移、长度、方向和等价向量语言，仅做符号微修：将课堂可见的 `AB = CD = 0`、`AB 与 CD`、`CD 与 AB` 等容易被读成线段等式的表达改为“向量 AB”“向量 CD”或“都是零向量”。资源主线仍聚焦“相等向量可以平移”，不引入坐标化读法，不提前使用后续课时的解析化表示与运算口径，不修改课程图谱；因第 8 章教材来源和课时边界未终核，只保留 `draft` / `self_checked_draft` / `metadata_ready` 草稿边界。

## 数学自检

- 非零向量相等的课堂口径：大小相等且方向相同。
- 网格证据口径：用“从起点到终点的水平位移、竖直位移”作为几何证据，不采用后续解析化记法。
- 起点变化对照：拖动 `C`、`D` 或橙色向量整体时，只改变 `C` 和 `D` 的位置，不改变几何位移、大小和方向。
- 零向量边界：当 `A` 与 `B` 重合时显示长度为 0，方向不规定。
- 资源边界：不引入向量加减法、数乘、后续解析化运算训练或 8.3 课时划分判断。

## 本轮修改

- `src/index.html`：将零向量提示改为“向量 AB 和向量 CD 都是零向量”，将同向量提示、长度读数和阶段文案统一为“向量 AB / 向量 CD”。
- `src/symbol-language.self-check.test.mjs`：新增资源级自检，先红灯复现旧版 `AB = CD = 0`，修复后转绿；同时锁定 `status: draft` 与 `review_status: self_checked_draft`。
- `student-task.md`：将观察、表格判断和结论填空中的裸 `AB/CD` 改为“向量 AB / 向量 CD”。
- `teacher-script.md`：将流程标题、追问和板书落点改为“向量 AB / 向量 CD”的等价证据，避免课堂板书出现裸等式。
- `README.md`、`metadata.yaml`：同步把资源说明、学习目标、交互描述和反馈证据改为向量对象表述，保留几何位移、长度、方向和等价向量口径；`status` 与 `review_status` 未升级。

## 验证记录

- `node --test content/applets/SH-HS-MATH-HJ-B2-C08-L01-A01/src/symbol-language.self-check.test.mjs`：已先红灯复现旧版 `AB = CD = 0`，修复后通过，2 项资源级自检全部通过。
- `npm run validate:content`：通过。输出为 `Content validation passed: 70 lessons, 14 applet(s), 4 Manim clip(s), 7 diagnosis package(s).`
- `npm run verify`：通过。内容校验、backlog 生成、36 项 node test 和 Vite build 均通过；Vite 仍提示 bundle 超过 500 kB，这是既有构建体积提示，不指向本资源。
- 浏览器冒烟：通过。使用本地 Vite 与平台预览 iframe 复核；864 x 560 iframe 内，页面标题为“向量表示与等价拖拽板”，主画板和侧栏同屏，按钮最小高度 42 px，点击“3 证据”和“痕迹”后证据层与痕迹开关正常；过滤 Browser 插件自身 Statsig 网络噪声后，未见本资源 console error。
- `npm run verify` 再生了 `apps/web/src/data/workspace-data.json` diff；本分支不提交该 generated file，等待总控统一再生。

## 剩余风险

- 第 8 章仍处于 `draft` / `needs_manual_textbook_check`；8.3 课时边界未终核，本资源不能作为第 8 章全章已终核证据。
- 尚未经过数学教师复核，尤其需要确认 8.1.1 阶段保留水平位移、竖直位移证据是否适合班级基础。
- 本轮只做符号微修，没有引入向量箭头排版；若后续数学口径复核要求严格使用带箭头记号，需要再做一轮统一排版。
- 尚未经过真实投屏、触控大屏和教师 14 分钟流程试读。
- 学生可能把“拖动端点改变向量”和“拖动整条向量平移位置”混淆，教师脚本中需明确区分。

## 下一状态建议

- 建议：维持 `self_checked_draft`。
- 来源边界：纸质教材或已登录平台目录未终核前，只保持 `draft` / `self_checked_draft` / `metadata_ready`。
- 流转边界：不因本轮符号微修开启更高正式流转。
