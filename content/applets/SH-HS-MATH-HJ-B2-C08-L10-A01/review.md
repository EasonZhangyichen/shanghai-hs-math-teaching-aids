# 审核记录：向量法路径比较板

资源 ID：`SH-HS-MATH-HJ-B2-C08-L10-A01`

当前状态：`draft`

本轮日期：2026-05-11

本轮范围：仅 `content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01/**`

## 本轮结论

建议进入 `self_checked_draft`。

本轮将 scaffold 占位入口推进为可直接打开的 HTML Applet 自检草稿。资源以三角形 `ABC` 中 `D` 在 `AB`、`E` 在 `AC` 为情境，围绕 `DE` 的三条路径分解比较“选基向量、逐段翻译、化简等式”的方法。资源不做题库，不进入 8.3 坐标法深水区，不修改课程图谱。

## 数学自检

- 默认基向量：设 `p = AB`，`q = AC`。若 `AD/AB = m`、`AE/AC = n`，则 `D = m p`、`E = n q`，所以 `DE = -m p + n q`。
- 替换基向量：设 `p = AB`，`r = BC`。因为 `AC = p + r`，所以 `E = n(p + r)`，`DE = (n - m)p + n r`。
- 路径一：`D -> A -> E`，对应 `DA + AE`。
- 路径二：`D -> B -> C -> E`，对应 `DB + BC + CE`。
- 路径三：`D -> B -> E`，对应 `DB + BE`。
- 三条路径表达不同，化简后对应同一个目标向量 `DE`。
- 本资源只训练向量路径建模的第一步，不展开坐标建系、复杂解析几何或数量积求角求长。

## 本轮修改

- `src/index.html`：替换占位页为原生 SVG/JS 交互课件，支持拖动分点、比例滑块、基向量组切换、三条路径切换、分步揭示、典型预设和向量等式同步读数。
- `metadata.yaml`：补齐真实数学模型、状态变量、事件 payload、反馈证据、视觉语义和运行态字段；`status` 保持 `draft`，`compliance.review_status` 保持 `self_checked_draft`。
- `README.md`：补充核心情境、已实现交互、暂不覆盖范围和第 8 章来源边界。
- `teacher-script.md`：补齐 14 到 16 分钟课堂流程、追问链、板书落点和状态边界。
- `student-task.md`：补齐读图设元、路径比较表、换基向量记录和口头表达任务。

## 验证记录

- 最小红灯检查：实现前确认 HTML 缺少 `route-option`、`basis_equation`、`path_delta` 和 `path:selected` 等核心锚点，检查按预期失败。
- 最小绿灯检查：实现后同一检查通过，确认路径按钮、基向量等式、路径等式和路径选择事件锚点已进入 HTML。
- `npm run validate:content`：通过。输出为 `Content validation passed: 70 lessons, 14 applet(s), 4 Manim clip(s), 7 diagnosis package(s).`
- `npm run verify`：通过。内容校验、backlog 生成、32 项 node test 和 Vite build 均通过；Vite 仍提示单个 chunk 超过 500 kB，这是既有构建体积提示，不指向本资源。
- 浏览器/Playwright 冒烟：Browser 插件连接超时，改用本地静态服务 `http://127.0.0.1:8766/content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01/src/index.html` 和 Playwright CLI 验证。页面标题为“向量法路径比较板”，首屏 DOM 非空；点击“D → B → C → E”和“AB / BC”后，右侧等式更新为 `DB + BC + CE = (1 - m)p + r - (1 - n)(p + r)`，化简结果显示 `DE = 0.25p + 0.65r`；console error/warn 为 0。
- `npm run verify` 会再生 `apps/web/src/data/workspace-data.json`；本分支已恢复该 generated file，不提交全局生成文件。

## 剩余风险

- 第 8 章仍处于 `draft` / `needs_manual_textbook_check`；课时边界、课时数和标题表述仍需纸质教材或已登录 dolearning/上海数字教学平台终核。
- 尚未经过数学审校者复核，尤其需要确认“向量应用”课时中用三角形分点路径作为第一轮策略板是否贴合教师课堂进度。
- 尚未经过真实投屏、触控大屏和教师 16 分钟流程试读。
- 当前只比较路径建模，不覆盖完整证明、坐标法系统训练或数量积应用链。

## 下一状态建议

- 建议：`self_checked_draft`。
- 暂不建议：`math_review`、`browser_review`、`classroom_trial`、`release_candidate` 或 `published`。
