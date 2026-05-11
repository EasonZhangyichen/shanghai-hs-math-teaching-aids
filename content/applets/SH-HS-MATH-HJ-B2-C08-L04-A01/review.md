# 审核记录：投影长度与夹角实验室

资源 ID：`SH-HS-MATH-HJ-B2-C08-L04-A01`

当前状态：`draft`

本轮日期：2026-05-11

本轮范围：仅 `content/applets/SH-HS-MATH-HJ-B2-C08-L04-A01/**`

## 本轮结论

建议进入 `self_checked_draft`。

本轮已将 scaffold 占位入口推进为可直接打开的 Applet 草稿：学生可拖动蓝色向量 `a` 与橙色方向向量 `b`，动态观察夹角、垂足 `F`、有向投影长度、`cosθ` 和数量积符号的正负联系。资源主线聚焦“投影”和“夹角变化”，不处理 8.3 暂缓项，不修改课程图谱，不建议进入 `math_review`、`release_candidate` 或 `published`。

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

## 平台接入边界

当前 `src/index.html` 可直接打开运行。由于本任务禁止修改平台源码，而现有平台测试仍将 `SH-HS-MATH-HJ-B2-C08-L04-A01` 预期为 metadata-ready scaffold，本分支暂未把平台 iframe readiness 提升为可运行预览；总控若要在教师工作台中展示该 iframe，需要同步更新平台测试预期后再提升 `implementation.html_src_status`。

## 剩余风险

- 第 8 章仍处于 `draft` / `needs_manual_textbook_check`；8.3 课时边界未终核，本资源不能作为第 8 章全章已终核证据。
- 尚未经过数学审校者复核，尤其需要确认“先讲有向投影，再连接数量积符号”的课堂边界是否符合本校进度。
- 尚未经过真实投屏、触控大屏和教师 14 分钟流程试读。
- Browser 截图接口本轮超时，当前浏览器证据以标题、DOM 快照、按钮交互和 console 过滤为主。
- 当前主工作区存在非本任务脏文件，直接在主工作区运行内容校验会先撞到 `SH-HS-MATH-HJ-B2-C08-L03-A01/metadata.yaml` 的 YAML 解析错误；本分支未修改该资源。

## 下一状态建议

- 建议：`self_checked_draft`。
- 暂不建议：`math_review`、`browser_review`、`classroom_trial`、`release_candidate` 或 `published`。
