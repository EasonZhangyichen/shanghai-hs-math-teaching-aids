# 审核记录：数乘伸缩实验室

资源 ID：`SH-HS-MATH-HJ-B2-C08-L03-A01`

当前状态：`draft`

本轮日期：2026-05-20

本轮范围：仅 `content/applets/SH-HS-MATH-HJ-B2-C08-L03-A01/**`

## 本轮结论

建议保持 `self_checked_draft`。

本轮已将 scaffold 占位入口推进为可运行 Applet 自检草稿：学生可以拖动蓝色原向量 `a`，并通过 λ 滑块连续观察橙色 `λa` 的同向伸缩、零向量边界和反向伸缩。资源主线聚焦“λ 的符号决定方向，|λ| 决定长度倍率”，不处理 8.3 暂缓资源，不修改课程图谱，也不建议进入 `math_review`、`release_candidate` 或 `published`。

2026-05-19 平台 iframe / 大屏触控复核小修：默认 `1280x720` 直达页曾出现页面高度约 902px，平台 560px iframe 首屏只能看到标题和画板，读数面板下移；按钮实际高度约 39px，滑块命中高度偏小，拖拽端点只有可见圆点热区。已将布局改为 iframe 剩余高度驱动的双列首屏、保持按钮和 λ 滑块不低于 40px，并为蓝色向量端点增加 32px 透明触控热区。该改动只解决浏览器首屏和触控风险，不提升审核状态。

2026-05-19 本线程复核：未改动 L03 源码，仅复查直达页、平台 iframe 入口和等效 iframe 视口。`1280x720` 直达页与 `864x560` iframe 等效视口均无内部纵向滚动；平台课时页可生成 `allow-scripts allow-same-origin` 的真实 iframe，点击 `λ = -1` 后 iframe 内状态可响应为“方向相反”。继续保留平台外层需滚动到资源卡、真实投屏和真实触控屏未试读风险。

2026-05-20 坐标前置风险小修：已移除课堂可见的 `x` / `y` 坐标轴标签，并取消中心轴线的特殊强调，使画板只保留浅色参照网格；画板可访问文本同步改为“数乘 `λa`”“实数 `λ`”和“浅色网格只作方向和长度参照”，避免英文 `lambda` 或“坐标轴读数”被读屏读出。该改动只弱化 8.3 坐标表示前置风险，不改变拖动原向量、调节 `λ`、快速取值和分步揭示的交互模型，不新增坐标计算训练，也不提升资源状态；仍需纸质教材/平台终核确认 L03 与 8.3 的课时边界。

## 数学自检

- `λ > 0`：`λa` 与 `a` 同向，长度为 `λ|a|`。
- `λ = 0`：`λa` 为零向量，长度为 0，方向不规定。
- `λ < 0`：`λa` 与 `a` 方向相反，长度为 `|λ||a|`。
- 统一长度关系：`|λa| = |λ||a|`。
- 若 `a` 为零向量，任意 λ 下 `λa` 仍为零向量，方向不规定。
- 课件中的浅色网格只用于拖拽和长度直观，课堂可见画板不再出现 `x` / `y` 轴标签，不作为 8.3 向量坐标表示训练。

## 本轮修改

- `src/index.html`：替换占位页为原生 SVG/JS 交互课件，支持拖动原向量、λ 滑块、快速 λ 按钮、三段符号卡、读数、分步揭示和播放器事件。
- `src/scalar-multiple.self-check.test.mjs`：新增资源自检，覆盖 λ 滑块、拖拽向量、正/零/负状态、零向量和 `applet:state_changed` 事件线索。
- `metadata.yaml`：更新真实数学模型、交互设计、状态变量、事件协议、反馈证据和运行态字段；`implementation.phase` 更新为 `runnable_prototype`，`html_src_status` 更新为 `runnable`；`status` 仍为 `draft`，`compliance.review_status` 仍为 `self_checked_draft`。
- `README.md`：补充核心问题、已实现交互、数字化必要性和暂不覆盖范围。
- `teacher-script.md`：补齐 10 到 12 分钟课堂流程、追问链、板书落点和易错点处理。
- `student-task.md`：补齐正数倍、零向量边界、负数倍和完整表述任务。
- 2026-05-20 小修：`src/index.html` 移除可见 `x` / `y` 坐标轴标签和中心轴线强调，将画板可访问标签改为“浅色网格只作方向和长度参照”，并替换可访问标签中的英文 `lambda`；`src/scalar-multiple.self-check.test.mjs` 增加坐标前置风险和可访问文本回归自检；`metadata.yaml` 将网格说明改为浅色参照网格，不改变 `status` 或 `compliance.review_status`。

## 验证记录

- `node --test content/applets/SH-HS-MATH-HJ-B2-C08-L03-A01/src/scalar-multiple.self-check.test.mjs`：已先在 scaffold 骨架上失败，完成实现后通过。
- `npm run validate:content`：通过。输出为 `Content validation passed: 70 lessons, 14 applet(s), 4 Manim clip(s), 7 diagnosis package(s).`
- `npm run verify`：通过。内容校验、backlog 生成、32 项 node test 和 Vite build 均通过；Vite 仍提示 bundle 超过 500 kB，这是既有构建体积提示，不指向本资源。
- 浏览器冒烟：通过。Browser 插件可通过本机静态服务打开 `http://127.0.0.1:5187/content/applets/SH-HS-MATH-HJ-B2-C08-L03-A01/src/index.html`，确认页面标题、λ 控件、`λ = 0` 和 `λ < 0` 状态文案存在；过滤 Browser 插件自身 Statsig 网络噪声后，未见本资源 console error。
- Headless 交互复核：通过。使用 bundled Playwright + 本机 Chrome 打开同一 URL，点击 `0` 后方向读数为“不规定”，点击 `-1` 后方向读数为“方向相反”，拖动蓝色原向量端点后 `|a|` 从 `2.78` 变为 `0.35`，未捕获页面 console error；截图留存在 `/tmp/b2-c08-l03-a01-scalar-multiple.png`。
- `npm run verify` 会再生 `apps/web/src/data/workspace-data.json`；本分支不提交该 generated file，等待总控统一再生。
- 2026-05-19 资源内新增布局自检，覆盖 iframe 高度变量、双列断点、40px 按钮、40px λ 滑块和透明拖拽热区；Browser 直达页复测 `1280x720` 下 `scrollHeight = clientHeight = 720`，平台 iframe 截图确认主画板与读数面板在 560px iframe 首屏内。平台课时页外层仍需滚动到资源卡，这是平台壳层面的既有定位风险。
- 2026-05-19 本线程 Browser 复核：直达页 `1280x720` 下 `scrollHeight = clientHeight = 720`、按钮最小高度 40px、λ 滑块 40px、拖拽热区约 58px；等效平台 iframe 视口 `864x560` 下 `scrollHeight = clientHeight = 560`、拖拽热区约 44px。平台路径 `/#lesson=SH-HS-MATH-HJ-B2-C08-L03` 中 iframe `src` 指向本资源 `src/index.html`，外框为 `864x560`，点击 `λ = -1` 可响应；过滤 Browser 插件自身 Statsig 网络噪声后，未见本资源 console error。
- 2026-05-20 资源内自检：新增并通过坐标前置风险与可访问文本断言，确认不会再生成可见 `x` / `y` 标签，`aria-label` 不再包含英文 `lambda` 或“坐标轴读数”，并将网格读屏说明改为“浅色网格只作方向和长度参照”。

## 剩余风险

- 第 8 章仍处于 `draft` / `needs_manual_textbook_check`；8.3 课时边界未终核，本资源不能作为第 8 章全章已终核证据。
- 尚未经过独立数学审校者复核，尤其需要纸质教材和已登录平台终核确认 L03 与 8.3 的课时边界是否已足够清晰。
- 尚未经过真实投屏、触控大屏和教师 12 分钟流程试读。
- 平台外层课时页首屏仍不会自动定位到资源卡，教师演示前需要滚动到 iframe；本资源只能保证 iframe 内部首屏更紧凑。
- 目前只做 `λa` 的几何意义，不覆盖数乘与加减法混合运算。

## 下一状态建议

- 建议：`self_checked_draft`。
- 暂不建议：`math_review`、`browser_review`、`classroom_trial`、`release_candidate` 或 `published`。
