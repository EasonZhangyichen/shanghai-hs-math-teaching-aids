# 审核记录：数乘伸缩实验室

资源 ID：`SH-HS-MATH-HJ-B2-C08-L03-A01`

当前状态：`draft`

本轮日期：2026-05-11

本轮范围：仅 `content/applets/SH-HS-MATH-HJ-B2-C08-L03-A01/**`

## 本轮结论

建议保持 `self_checked_draft`。

本轮已将 scaffold 占位入口推进为可运行 Applet 自检草稿：学生可以拖动蓝色原向量 `a`，并通过 λ 滑块连续观察橙色 `λa` 的同向伸缩、零向量边界和反向伸缩。资源主线聚焦“λ 的符号决定方向，|λ| 决定长度倍率”，不处理 8.3 暂缓资源，不修改课程图谱，也不建议进入 `math_review`、`release_candidate` 或 `published`。

## 数学自检

- `λ > 0`：`λa` 与 `a` 同向，长度为 `λ|a|`。
- `λ = 0`：`λa` 为零向量，长度为 0，方向不规定。
- `λ < 0`：`λa` 与 `a` 方向相反，长度为 `|λ||a|`。
- 统一长度关系：`|λa| = |λ||a|`。
- 若 `a` 为零向量，任意 λ 下 `λa` 仍为零向量，方向不规定。
- 课件中的网格只用于拖拽和长度直观，不作为 8.3 向量坐标表示训练。

## 本轮修改

- `src/index.html`：替换占位页为原生 SVG/JS 交互课件，支持拖动原向量、λ 滑块、快速 λ 按钮、三段符号卡、读数、分步揭示和播放器事件。
- `src/scalar-multiple.self-check.test.mjs`：新增资源自检，覆盖 λ 滑块、拖拽向量、正/零/负状态、零向量和 `applet:state_changed` 事件线索。
- `metadata.yaml`：更新真实数学模型、交互设计、状态变量、事件协议、反馈证据和运行态字段；`implementation.phase` 更新为 `runnable_prototype`，`html_src_status` 更新为 `runnable`；`status` 仍为 `draft`，`compliance.review_status` 仍为 `self_checked_draft`。
- `README.md`：补充核心问题、已实现交互、数字化必要性和暂不覆盖范围。
- `teacher-script.md`：补齐 10 到 12 分钟课堂流程、追问链、板书落点和易错点处理。
- `student-task.md`：补齐正数倍、零向量边界、负数倍和完整表述任务。

## 验证记录

- `node --test content/applets/SH-HS-MATH-HJ-B2-C08-L03-A01/src/scalar-multiple.self-check.test.mjs`：已先在 scaffold 骨架上失败，完成实现后通过。
- `npm run validate:content`：通过。输出为 `Content validation passed: 70 lessons, 14 applet(s), 4 Manim clip(s), 7 diagnosis package(s).`
- `npm run verify`：通过。内容校验、backlog 生成、32 项 node test 和 Vite build 均通过；Vite 仍提示 bundle 超过 500 kB，这是既有构建体积提示，不指向本资源。
- 浏览器冒烟：通过。Browser 插件可通过本机静态服务打开 `http://127.0.0.1:5187/content/applets/SH-HS-MATH-HJ-B2-C08-L03-A01/src/index.html`，确认页面标题、λ 控件、`λ = 0` 和 `λ < 0` 状态文案存在；过滤 Browser 插件自身 Statsig 网络噪声后，未见本资源 console error。
- Headless 交互复核：通过。使用 bundled Playwright + 本机 Chrome 打开同一 URL，点击 `0` 后方向读数为“不规定”，点击 `-1` 后方向读数为“方向相反”，拖动蓝色原向量端点后 `|a|` 从 `2.78` 变为 `0.35`，未捕获页面 console error；截图留存在 `/tmp/b2-c08-l03-a01-scalar-multiple.png`。
- `npm run verify` 会再生 `apps/web/src/data/workspace-data.json`；本分支不提交该 generated file，等待总控统一再生。

## 剩余风险

- 第 8 章仍处于 `draft` / `needs_manual_textbook_check`；8.3 课时边界未终核，本资源不能作为第 8 章全章已终核证据。
- 尚未经过独立数学审校者复核，尤其需要确认课堂中是否需要进一步弱化网格读数以避免学生误入 8.3。
- 尚未经过真实投屏、触控大屏和教师 12 分钟流程试读。
- 目前只做 `λa` 的几何意义，不覆盖数乘与加减法混合运算。

## 下一状态建议

- 建议：`self_checked_draft`。
- 暂不建议：`math_review`、`browser_review`、`classroom_trial`、`release_candidate` 或 `published`。
