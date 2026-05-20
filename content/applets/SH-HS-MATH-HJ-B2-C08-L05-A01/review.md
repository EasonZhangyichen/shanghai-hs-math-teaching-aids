# 审核记录

资源 ID：`SH-HS-MATH-HJ-B2-C08-L05-A01`

当前状态：`draft`

## 自检结论

- 2026-05-20 本轮追加复核：保留资源状态为 `draft`，在 `src/index.html` 中将 30°、45°、60°、90°、120°、135°、150°、180° 的弧度标签集中到资源内共享 `exactRadianLabels` normalizer；角度读数继续由同一 `radianHtml`/`fractionHtml` 输出上下结构分式，补强资源内自检覆盖 <math><mfrac><mi>π</mi><mn>3</mn></mfrac></math>、<math><mfrac><mi>π</mi><mn>2</mn></mfrac></math>、<math><mfrac><mrow><mn>2</mn><mi>π</mi></mrow><mn>3</mn></mfrac></math>、<math><mfrac><mrow><mn>3</mn><mi>π</mi></mrow><mn>4</mn></mfrac></math>、<math><mfrac><mrow><mn>5</mn><mi>π</mi></mrow><mn>6</mn></mfrac></math> 等典型课堂可见读数。
- 2026-05-20 本轮数学显示闸门修复：课堂可见的弧度分式读数、课堂收束和教师脚本中的 π 分式不再使用纯文本斜杠；`src/index.html` 改用资源内 CSS 上下结构分式，教师脚本和审核记录改用 MathML 分式，并新增资源内自检门禁扫描可见资源文件中的斜杠式 π 分式。
- 2026-05-19 本轮专项复核未改动 L05 源码：直达页和平台 iframe 内部首屏布局、40px 按钮、32px 透明拖拽热区和资源内布局自检继续作为当前通过证据；仍保留平台课时页外层需要滚动到资源卡、真实教室触控屏手感未确认两项风险。
- 2026-05-19 本线程复核继续未改动 L05 源码：Browser 直达页、等效平台 iframe 视口和平台 iframe 入口均能渲染真实课件，点击 `120°` 后数量积和投影读数变为负；继续保留真实投屏、真实触控大屏和教师流程试读未完成风险。
- 2026-05-18 教师触控闸门复核发现：直达页拖拽热区已达 43px 以上，但平台 iframe 画板缩放后透明拖拽热区在 `1280x720` 下曾缩到约 33px，不利于教室触控屏。已将向量端点透明 `hit-handle` 半径从 24 扩大到 32，并新增资源内布局自检，复测后直达页拖拽热区为 57-58px，平台 iframe 内为 44-51px。
- 2026-05-14 针对平台 iframe 首屏再次压缩布局：画板和读数面板改用 iframe 剩余高度，窄 iframe 预览保持双列，读数卡和按钮密度收紧但按钮触控目标仍不低于 40px。
- 已从 scaffold 升级为可直接打开的 HTML Applet 自检草稿。
- `src/index.html` 支持拖动两个向量、典型角按钮、夹角 θ、cosθ、投影段、a·b 读数、符号判断和分步揭示；本轮已压缩首屏高度并扩大按钮/拖拽触控目标。
- 已修正零向量投影边界：b 为零向量时显示“投影方向未规定”；a 为零向量且 b 非零时只说明投影长度为 0 和数量积为 0，不并入垂直解释。
- 已弱化 8.3 坐标误读：保留淡网格作为拖拽背景，移除坐标数值和 x/y 轴标签，并在读法说明中标明网格不是本课公式来源。
- `metadata.status` 保持 `draft`，`compliance.review_status` 保持 `self_checked_draft`。
- 本轮未修改课程图谱、生产 backlog、平台生成数据或其他资源包。

## 数学口径

- 核心公式为 a·b = |a||b|cosθ。
- 当 b 不是零向量时，a·b 可解释为 |b| 乘以 a 在 b 方向上的有向投影长度。
- 0 < θ < <math><mfrac><mi>π</mi><mn>2</mn></mfrac></math> 时 a·b > 0；θ = <math><mfrac><mi>π</mi><mn>2</mn></mfrac></math> 时 a·b = 0；<math><mfrac><mi>π</mi><mn>2</mn></mfrac></math> < θ < π 时 a·b < 0。
- 零向量边界下 a·b = 0，但不能用“夹角为直角”解释，也不直接作为两个非零向量垂直的判定；当 b 为零向量时，a 在 b 方向上的投影方向未规定。

## 范围边界

- 未进入 8.3 向量的坐标表示。
- 未处理暂缓资源。
- 未改变课程图谱或第 8 章课时边界。
- 未把资源状态提升到后续审核或发布阶段。

## 已做本地验证

- 2026-05-20 `node --test content/applets/SH-HS-MATH-HJ-B2-C08-L05-A01/src/layout.self-check.test.mjs` 已先红灯复现缺少共享弧度分式 normalizer 的问题；补强后 6 项资源内自检通过，覆盖典型 π 分式上下结构输出和可见文件斜杠扫描。
- 2026-05-20 本轮追加复核 `npm run validate:content` 通过：70 lessons、14 applet(s)、4 Manim clip(s)、7 diagnosis package(s)。
- 2026-05-20 本轮追加复核 `npm run verify` 通过：内容校验、backlog 生成、36 项 node test 和 Vite build 均通过；复核后未留下 `apps/web/src/data/workspace-data.json`、`content/production/resource-backlog.json` 或 `content/curriculum/index.yaml` diff。
- 2026-05-20 `node --test content/applets/SH-HS-MATH-HJ-B2-C08-L05-A01/src/layout.self-check.test.mjs` 已先红灯复现旧版可见 π 分式斜杠外露问题；修复后 5 项资源内自检通过。
- 2026-05-20 文本扫描复核目标资源包内可见文件，未发现斜杠式 π 分式残留。
- 2026-05-20 Browser 渲染抽查：`http://127.0.0.1:4178/index.html` 默认 `60°` 和点击 `120°` 后，角度读数均为上下结构分式 DOM，页面正文未出现斜杠式 π 分式；未见本资源 console error。
- 2026-05-20 `npm run validate:content` 通过：70 lessons、14 applet(s)、4 Manim clip(s)、7 diagnosis package(s)。
- 2026-05-20 `npm run verify` 通过：内容校验、backlog 生成、36 项 node test 和 Vite build 均通过；构建生成的全局 `workspace-data.json` diff 已恢复，未纳入本资源提交。
- `node --test content/applets/SH-HS-MATH-HJ-B2-C08-L05-A01/src/layout.self-check.test.mjs` 已先红灯复现旧版 `52svh` 高度、读数卡密度和窄 iframe 单列断点风险，修复后通过。
- Headless Chrome CDP 复测直达页 `1366x768`、`1280x720`、`1024x768`：核心画板、读数、投影、符号判断、重置和 `120°` 按钮均在首屏内，面板无需内滚。
- Headless Chrome CDP 复测平台路径 `/#lesson=SH-HS-MATH-HJ-B2-C08-L05`：三种视口下 iframe 内部首屏均可见核心画板、读数、投影、符号解释、重置、下一步和 `120°` 按钮；iframe 内 `scrollHeight = clientHeight = 560`。
- 交互抽查通过：`120°` 显示负数量积，重置回到 `60°` 正数量积，拖到 `b=0` 显示“投影方向未规定”，拖到 `a=0` 显示零向量边界，普通拖动会更新数量积读数。
- 项目级内容校验和完整验证已在当前分支通过。
- 2026-05-18 Playwright 复核直达页 `1366x768`、`1280x720`、`1024x768`：页面无需滚动，画板、读数、投影、符号判断、重置/下一步/`120°` 按钮和拖拽热区均在首屏内，无本资源 console error。
- 2026-05-18 Playwright 复核平台路径 `/#lesson=SH-HS-MATH-HJ-B2-C08-L05`：平台外层课时页首屏仍需滚动到资源卡；滚到 iframe 后，三种视口下 iframe 内部无需滚动，画板、读数、投影、符号判断、重置/下一步/`120°` 按钮和拖拽热区均可见可用；仅保留平台既有 iframe sandbox warning。
- 2026-05-19 本线程 Browser 复核：直达页 `1280x720` 下 `scrollHeight = clientHeight = 720`、按钮最小高度 40px、拖拽热区约 58px；等效平台 iframe 视口 `864x560` 下 `scrollHeight = clientHeight = 560`、拖拽热区约 44px。平台路径 `/#lesson=SH-HS-MATH-HJ-B2-C08-L05` 中 iframe `src` 指向本资源 `src/index.html`，外框为 `864x560`，点击 `120°` 后 `a·b = -6`、投影为负；过滤 Browser 插件自身 Statsig 网络噪声后，未见本资源 console error。

## 剩余风险

- 第 8 章课时边界仍需纸质教材或已登录平台终核。
- 当前只是作者自检草稿，零向量边界、投影语言和 8.3 坐标误读仍需数学教师审校。
- 教师脚本和审核记录中的 MathML 分式需在平台 Markdown 预览链路中抽样确认最终样式。
- 触控大屏拖拽手感虽已改善，仍需真实投屏、真实教室触控屏和教师流程试读复核。
