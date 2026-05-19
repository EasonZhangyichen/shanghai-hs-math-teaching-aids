# 审核记录：投影长度与夹角实验室

资源 ID：`SH-HS-MATH-HJ-B2-C08-L04-A01`

当前状态：`draft`

本轮日期：2026-05-11

本轮范围：仅 `content/applets/SH-HS-MATH-HJ-B2-C08-L04-A01/**`

## 本轮结论

建议进入 `self_checked_draft`。

本轮已将 scaffold 占位入口推进为可直接打开的 Applet 草稿：学生可拖动蓝色向量 `a` 与橙色方向向量 `b`，动态观察夹角、垂足 `F`、有向投影长度、`cosθ` 和数量积符号的正负联系。资源主线聚焦“投影”和“夹角变化”，不处理 8.3 暂缓项，不修改课程图谱，不建议进入 `math_review`、`release_candidate` 或 `published`。

2026-05-19 平台 iframe / 大屏触控复核小修：`src/index.html` 已是可运行原型，但 metadata 仍标为 `html_src_status: scaffolded`，导致平台课时页只显示占位说明，无法完成 iframe QA。已把该实现状态修正为 `runnable`，同时压缩 iframe 首屏布局、保持按钮不低于 40px，并为 A/B 两个拖拽端点补充 32px 透明触控热区。内容状态仍为 `draft`，审核状态仍为 `self_checked_draft`。

## 数学自检

- 投影方向：以橙色非零向量 `b` 的方向作为读数方向。
- 垂足口径：从蓝色向量 `a` 的终点 `A` 向 `b` 所在直线作垂线，垂足为 `F`。
- 有向投影口径：沿 `b` 的方向读取 `OF`；`F` 在同向一侧为正，在 `O` 点为 0，在反向一侧为负。
- 夹角边界：锐角时 `cosθ > 0`，直角时 `cosθ = 0`，钝角时 `cosθ < 0`。
- 数量积边界：本资源只建立“数量积符号与有向投影同号”的直观，不做完整数量积公式训练。
- 零向量边界：`a` 或 `b` 为零向量时，界面提示夹角或投影方向不规定。

## 本轮修改

- `src/index.html`：替换占位页为原生 SVG/JS 交互课件，支持拖动两个向量、显示夹角弧、垂足、有向投影段、锐角/直角/钝角典型状态、分步揭示和读数面板。
- `metadata.yaml`：补齐真实数学模型、状态变量、事件 payload、反馈证据、视觉语义和运行原型说明；`status` 保持 `draft`，`compliance.review_status` 保持 `self_checked_draft`。
- `README.md`：补充核心问题、已实现交互、分步揭示和暂不覆盖范围。
- `teacher-script.md`：补齐 12 到 14 分钟课堂流程、追问链和板书落点。
- `student-task.md`：补齐投影点观察、三类夹角对比表、负投影解释和口头表达任务。

## 验证记录

- 最小红绿检查：先确认占位 HTML 缺少 `projection-foot`、`signed_projection`、`dot_sign`、`angle_degrees`、`cos_theta` 和拖拽端点标记；实现后同一检查通过。
- `npm run validate:content`：在只应用本资源改动的干净隔离工作树中通过。输出为 `Content validation passed: 70 lessons, 14 applet(s), 4 Manim clip(s), 7 diagnosis package(s).`
- `npm run verify`：在只应用本资源改动的干净隔离工作树中通过。内容校验、backlog 生成、32 项 node test 和 Vite build 均通过；Vite 仍提示单个 chunk 超过 500 kB，这是既有构建体积提示。
- 浏览器冒烟：Browser 插件安全策略阻止 `file://` 直开，因此使用 `http://127.0.0.1:8765/content/applets/SH-HS-MATH-HJ-B2-C08-L04-A01/src/index.html` 验证同一静态文件。页面标题为“投影长度与夹角实验室”，首屏 DOM 非空；点击“钝角例”和“4 正负联系”后，读数区显示数量积符号为负，并出现“钝角时 cosθ < 0，投影落在反向一侧，数量积符号也为负。”过滤 Browser 插件自身 Statsig 网络噪声后，未见本资源相关 console error。
- 2026-05-19 资源内新增布局自检，覆盖 runnable metadata、iframe 高度变量、双列断点、40px 控件和 32px 透明拖拽热区；Browser 直达页复测 `1280x720` 下 `scrollHeight = clientHeight = 720`，平台 iframe 截图确认主画板与读数面板在 560px iframe 首屏内，且平台已从占位说明切换为真实 iframe。平台课时页外层仍需滚动到资源卡，这是平台壳层面的既有定位风险。
- 2026-05-19 `npm run verify` 已运行但未通过：全局 `apps/web/src/lib/content.test.js` 仍硬编码期待本资源 `player === null`，而本轮将 `html_src_status` 修正为 `runnable` 后平台数据会生成 iframe player；本专项写入范围禁止修改全局测试。单独 `npm run validate:content` 和 `npm run build` 已通过，后者仍只有既有 chunk size warning。

## 平台接入边界

当前 `src/index.html` 可直接打开运行，且 metadata 已修正为平台可生成 iframe 预览。该修正只表示“可运行预览入口”与真实文件状态一致，不代表数学审校、浏览器审核、课堂试用或发布通过。

## 剩余风险

- 第 8 章仍处于 `draft` / `needs_manual_textbook_check`；8.3 课时边界未终核，本资源不能作为第 8 章全章已终核证据。
- 尚未经过数学审校者复核，尤其需要确认“先讲有向投影，再连接数量积符号”的课堂边界是否符合本校进度。
- 尚未经过真实投屏、触控大屏和教师 14 分钟流程试读。
- 平台外层课时页首屏仍不会自动定位到资源卡，教师演示前需要滚动到 iframe；本资源只能保证 iframe 内部首屏更紧凑。
- 全局内容测试需要总控同步更新 L04 资源期望：若保留真实 iframe，则应不再断言 `player === null`；若坚持旧测试，则平台 iframe QA 无法覆盖 L04。

## 下一状态建议

- 建议：`self_checked_draft`。
- 暂不建议：`math_review`、`browser_review`、`classroom_trial`、`release_candidate` 或 `published`。
