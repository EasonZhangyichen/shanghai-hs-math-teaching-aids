# B2-C08 L01-L04 浏览器 / 大屏 / 触控审核

日期：2026-05-11

审核范围：

- `SH-HS-MATH-HJ-B2-C08-L01-A01` 向量表示与等价拖拽板
- `SH-HS-MATH-HJ-B2-C08-L02-A01` 向量加减法构造器
- `SH-HS-MATH-HJ-B2-C08-L03-A01` 数乘伸缩实验室
- `SH-HS-MATH-HJ-B2-C08-L04-A01` 投影长度与夹角实验室

写入性质：只读审核报告，不修改资源包、平台源码、课程图谱或 generated files。

## 测试环境

- 直达页：直接打开各资源 `src/index.html` 的 `file://` URL，视口 `1366x768`。
- 平台页：本地 Vite 服务 `http://127.0.0.1:5184/`，直接运行 `./node_modules/.bin/vite --config apps/web/vite.config.js --host 127.0.0.1 --port 5184`，未运行 `npm run dev`，避免触发 `generate:content`。
- 平台 iframe 视口矩阵：`1366x768`、`1280x720`、`1024x768`。
- 自动化：Browser 插件可连接，但本轮未暴露可用的精确视口控制能力；精确尺寸矩阵使用 bundled Playwright + 系统 Chrome 复核。
- 控制台：记录 `console.warn` / `console.error` / `pageerror`。平台 iframe 的 sandbox warning 记为平台级警告，不计作本资源 console error。

## 总体结论

四个资源的 `src/index.html` 都能直接打开，且没有捕获到本资源 console error。`L01-A01` 和 `L04-A01` 直达页首屏完整；`L02-A01` 直达页底部轻微溢出；`L03-A01` 直达页首屏裁切较明显。

平台 iframe 是本轮主要阻塞点。`L01-A01`、`L02-A01`、`L03-A01` 在平台中都有 iframe，但 iframe 高度固定为 560px，资源在 iframe 内出现明显纵向滚动，画板和右侧控制/读数面板不能同屏呈现。`L04-A01` 的 `src/index.html` 可运行，但 `metadata.implementation.html_src_status` 仍为 `scaffolded`，平台不生成 iframe，只显示“真实课件预览尚未就绪”。

本批不建议直接进入 `browser_review`。建议保持自检草稿状态，先处理平台 iframe 高度/布局适配与 `L04-A01` 平台 readiness 后，再安排 browser_review 复核。不得进入 `classroom_trial`、`release_candidate` 或 `published`。

## 逐项结果

### SH-HS-MATH-HJ-B2-C08-L01-A01

直达页：

- `src/index.html` 首屏可用，`1366x768` 下无横向或纵向滚动。
- 画板 `944x655`，读数/控制面板 `380x657`，均完整落在首屏内。
- 分步揭示 4 步、重置、分量/痕迹开关稳定。
- 拖拽 `B` 点后读数从 `Δx = 3, Δy = 3` 变为 `Δx = 4, Δy = 3.5`，拖拽响应有效。
- 未捕获本资源 console error。

平台 iframe：

- `1366x768`：iframe 约 `950x560`，iframe 内页面 scrollHeight `1220`；画板底部到 `728`，读数面板从 `741` 才开始，首屏完全看不到面板。
- `1280x720`：iframe 约 `864x560`，iframe 内页面 scrollHeight `1161`；画板底部到 `669`，面板从 `682` 开始。
- `1024x768`：iframe 约 `936x560`，iframe 内页面 scrollHeight `1210`；画板底部到 `718`，面板从 `731` 开始。
- 判断：平台 iframe 下存在严重纵向裁切。主要问题是 iframe 宽度低于资源 `980px` 响应断点后，画板和控制面板堆叠，560px 高度不足。

触控风险：

- 所有按钮高度约 `38px`，低于 44px 常用触控建议值。
- SVG 拖拽点可被自动化拖动，但可视圆点半径较小，真实触控大屏仍需确认手感。

建议：暂不进入 `browser_review`；待平台 iframe 内面板可首屏露出，或资源为平台 iframe 提供更紧凑布局后复核。

### SH-HS-MATH-HJ-B2-C08-L02-A01

直达页：

- `src/index.html` 可直接打开，页面非空。
- `1366x768` 下页面 scrollHeight `813`，画板底部到 `798`，首屏底部约 30px 被裁切；属于轻微首屏溢出。
- 分步揭示 4 步、三种构造模式、重置、辅助线/半格吸附开关稳定。
- 自动化按默认端点坐标拖动 canvas 内 `A` 点后读数未变化；该项不能确认拖拽稳定通过，需真实鼠标/触控复测。
- 未捕获本资源 console error。

平台 iframe：

- `1366x768`：iframe 约 `950x560`，iframe 内 scrollHeight `1341`；画板底部到 `637`，面板从 `650` 开始。
- `1280x720`：iframe 约 `864x560`，iframe 内 scrollHeight `1341`；画板底部到 `637`，面板从 `650` 开始。
- `1024x768`：iframe 约 `936x560`，iframe 内 scrollHeight `1341`；画板底部到 `637`，面板从 `650` 开始。
- 判断：平台 iframe 下严重纵向裁切。首屏只能看到标题/模式栏和大部分画板，读数、构造解释与教师控制需要滚动。

触控风险：

- 按钮高度约 `38px`，低于 44px。
- Canvas 拖拽没有 DOM handle，依赖约 18px 命中半径；自动化命中默认端点未改变读数，真实触控风险高于 SVG 资源。

建议：暂不进入 `browser_review`；先复核 canvas hit-test 与触控命中区，并压缩平台 iframe 布局。

### SH-HS-MATH-HJ-B2-C08-L03-A01

直达页：

- `src/index.html` 可直接打开，页面非空。
- `1366x768` 下页面 scrollHeight `902`，画板和面板底部约到 `887-888`，首屏只显示约 85% 主体内容；首屏不完全可用。
- 分步揭示 4 步、重置、`λ = 0` 快速按钮稳定；点击 `0` 后方向读数从“同向”变为“不规定”。
- 拖动蓝色原向量端点与 `λ` 控件联动通过。
- 未捕获本资源 console error。

平台 iframe：

- `1366x768`：iframe 约 `950x560`，iframe 内 scrollHeight `947`；画板和面板底部约 `932-933`。
- `1280x720`：iframe 约 `864x560`，iframe 内 scrollHeight `1517`；低于响应断点后画板与面板上下堆叠，面板从 `755` 开始。
- `1024x768`：iframe 约 `936x560`，iframe 内 scrollHeight `965`；画板和面板底部约 `950-951`。
- 判断：平台 iframe 下严重纵向裁切，`1280x720` 最明显。

触控风险：

- 按钮高度约 `38px`，低于 44px。
- `λ` range 约 `306-806px` 宽但高度约 `16px`，投屏触控滑块命中偏窄。
- SVG 端点拖拽可用，但触控目标仍偏小。

建议：暂不进入 `browser_review`；先压缩画板/面板高度，增大 range 与按钮触控高度，再复测。

### SH-HS-MATH-HJ-B2-C08-L04-A01

直达页：

- `src/index.html` 可直接打开，`1366x768` 下无横向或纵向滚动。
- 画板 `934x655`，读数/控制面板 `390x657`，均完整落在首屏内。
- 分步揭示 4 步、锐角/直角/钝角预设、方向轴/投影段开关、重置稳定。
- 拖动蓝色向量端点后投影读数从 `3.87` 变为 `3.44`，拖拽响应有效。
- 未捕获本资源 console error。

平台 iframe：

- 三个视口下均没有 iframe。
- 平台显示：“真实课件预览尚未就绪 / 该资源当前没有可运行的 HTML src 入口，平台保留 metadata 与规划说明。”
- 原因：当前 `metadata.yaml` 中 `implementation.html_src_status: scaffolded`，平台 `buildResourcePlayer` 不会为其生成 iframe。

触控风险：

- 按钮高度约 `38px`，低于 44px。
- SVG 拖拽点可被自动化拖动，但真实触控大屏仍需确认命中手感。

建议：暂不进入 `browser_review`；先由生产/总控线决定是否将平台 readiness 与测试预期同步为可运行 iframe，再做平台 iframe 复核。

## Console 结果

- 直达页四个资源均未捕获 console error / pageerror。
- 平台 iframe 下 `L01-A01`、`L02-A01`、`L03-A01` 捕获到 sandbox warning：`allow-scripts` 与 `allow-same-origin` 同时存在。该警告来自平台 iframe sandbox 配置，不是资源脚本错误；如后续做平台安全 hardening，可由总控另行处理。
- `L04-A01` 无 iframe，因此无 iframe 内 console 结果。

## 状态建议

- `SH-HS-MATH-HJ-B2-C08-L01-A01`：`hold_for_browser_layout_fix`，暂不进入 `browser_review`。
- `SH-HS-MATH-HJ-B2-C08-L02-A01`：`hold_for_touch_and_iframe_fix`，暂不进入 `browser_review`。
- `SH-HS-MATH-HJ-B2-C08-L03-A01`：`hold_for_browser_layout_fix`，暂不进入 `browser_review`。
- `SH-HS-MATH-HJ-B2-C08-L04-A01`：`hold_for_platform_iframe_readiness`，暂不进入 `browser_review`。

本报告不建议任何资源进入 `classroom_trial`、`release_candidate` 或 `published`。

## 总控关注点

- 平台 iframe 高度固定为 `clamp(560px, 72vh, 760px)`，而第 8 章 L01-L03 资源在 iframe 宽度下会触发窄布局或高度溢出。建议总控决定是改平台 iframe 策略，还是给资源增加 iframe 专用紧凑布局。
- `L04-A01` 的 `src/index.html` 已可直达运行，但 metadata 仍标记 `html_src_status: scaffolded`，导致平台无法 iframe 预览。该问题需要生产/总控线修复，本审核线不改资源。
- 第 8 章仍需纸质教材或已登录 dolearning/上海数字教学平台终核；浏览器复核不替代数学审校或教材一致性审校。
