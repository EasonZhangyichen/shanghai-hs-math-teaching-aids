# 审核记录：向量法路径比较板

资源 ID：`SH-HS-MATH-HJ-B2-C08-L10-A01`

当前状态：`draft`

本轮日期：2026-05-11

本轮范围：仅 `content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01/**`

## 本轮结论

建议进入 `self_checked_draft`。

本轮在现有可运行原型上继续收窄数学与课堂边界。资源以三角形 `ABC` 中 `D` 在 `AB`、`E` 在 `AC` 为情境，围绕 `DE` 的三条路径分解比较“第一步选择、选基向量、逐段翻译、化简等式”的方法。资源不做题库，不进入 8.3 坐标法深水区，不修改课程图谱。

## 数学自检

- 默认基向量：设 `p = AB`，`q = AC`。若 `AD/AB = m`、`AE/AC = n`，则 `D = m p`、`E = n q`，所以 `DE = -m p + n q`。
- 替换基向量：设 `p = AB`，`r = BC`。因为 `AC = p + r`，所以 `E = n(p + r)`，`DE = (n - m)p + n r`。
- 沪教版先修链：8.4 本题只调用 8.1 线性运算、8.2 数量积、8.3 坐标表示中的已学工具；本题第一步优先基底法或路径法，数量积/坐标法只在后续要求长度、夹角、垂直或数值化时进入。
- 路径一：`D -> A -> E`，对应 `DA + AE`。
- 路径二：`D -> B -> C -> E`，对应 `DB + BC + CE`。
- 路径三：`D -> B -> E`，对应 `DB + BE`。
- 三条路径表达不同，化简后对应同一个目标向量 `DE`。
- 本资源只训练向量应用建模的第一步选择，不展开坐标建系、复杂解析几何或数量积求角求长。

## 本轮修改

- `src/index.html`：增加“第一步选择”方法比较区，明确基底法、路径法、数量积/坐标法的起手条件；压缩画板最小高度和断点，使直达页与平台 iframe 更容易同时看到核心画面和控制。
- `metadata.yaml`：补齐 8.1 线性运算、8.2 数量积、8.3 坐标表示到 8.4 应用的先修链；新增第一步选择状态变量和反馈证据；`status` 保持 `draft`，`compliance.review_status` 保持 `self_checked_draft`。
- `README.md`：补充沪教版先修链、第一步选择对照和“不做全能向量应用工具箱”的边界。
- `teacher-script.md`：收敛为 12 到 16 分钟片段，加入第一步选择讨论、数量积/坐标法何时进入的追问。
- `student-task.md`：增加可填写的第一步选择表，避免教师临场补题。

## 验证记录

- 最小红灯检查：实现前确认 HTML 缺少 `route-option`、`basis_equation`、`path_delta` 和 `path:selected` 等核心锚点，检查按预期失败。
- 最小绿灯检查：实现后同一检查通过，确认路径按钮、基向量等式、路径等式和路径选择事件锚点已进入 HTML。
- 本轮红灯检查：修复前确认资源包缺少 `8.1 线性运算`、`8.2 数量积`、`8.3 坐标表示`、`第一步选择`、`数量积/坐标法` 和 `method-option` 等锚点，检查按预期失败。
- 本轮绿灯检查：同一锚点检查通过，确认资源包已包含 8.1/8.2/8.3 先修链、第一步选择说明、数量积/坐标法边界和 HTML 方法按钮。
- `npm run validate:content`：通过。输出为 `Content validation passed: 70 lessons, 14 applet(s), 4 Manim clip(s), 7 diagnosis package(s).`
- `npm run verify`：通过。内容校验、backlog 生成、32 项 node test 和 Vite build 均通过；Vite 仍提示单个 chunk 超过 500 kB，这是既有构建体积提示，不指向本资源。
- 浏览器直达页复核：Codex 内置 Browser 连接 20 秒超时，改用 Playwright CLI。直达页在 `1366x768`、`1280x720`、`1024x768` 下均显示核心画板、第一步按钮、路径按钮、读数与滑块；点击“数量积/坐标法”“AB / BC”“D → B → C → E”后，右侧显示 `DE = 0.25p + 0.65r`；console error 为 0。
- 平台 iframe 复核：`http://127.0.0.1:5173/#lesson=SH-HS-MATH-HJ-B2-C08-L10` 能生成 `SH-HS-MATH-HJ-B2-C08-L10-A01` iframe。三种视口下 iframe 内首屏均可见核心画板、第一步按钮、路径按钮、读数与滑块；点击“数量积/坐标法”“D → B → C → E”后等式更新。仅记录到平台 iframe sandbox 既有 warning，未发现资源 console error。
- `npm run verify` 和平台 dev server 会再生 `apps/web/src/data/workspace-data.json`；本分支不提交全局生成文件。

## 剩余风险

- 第 8 章仍处于 `draft` / `needs_manual_textbook_check`；课时边界、课时数和标题表述仍需纸质教材或已登录 dolearning/上海数字教学平台终核。
- 尚未经过数学审校者复核，尤其需要确认“向量应用”课时中用三角形分点路径作为第一轮策略板是否贴合教师课堂进度。
- 尚未经过真实投屏、触控大屏和教师 16 分钟流程试读。
- 当前只比较路径建模，不覆盖完整证明、坐标法系统训练或数量积应用链。

## 下一状态建议

- 建议：`self_checked_draft`。
- 暂不建议：`math_review`、`browser_review`、`classroom_trial`、`release_candidate` 或 `published`。
