# B2-C08 L05 / L10 / L04-M01 浏览器与视频审核

审核日期：2026-05-11

审核范围：

- `SH-HS-MATH-HJ-B2-C08-L05-A01` 数量积动态解释器
- `SH-HS-MATH-HJ-B2-C08-L10-A01` 向量法路径比较板
- `SH-HS-MATH-HJ-B2-C08-L04-M01` 投影有向长度导入动画

本报告只记录浏览器、大屏、触控、平台预览和视频观看风险；未修改课程图谱、资源包、平台源码、backlog 或 generated files。

## 测试环境

- 本地平台：`http://127.0.0.1:5173/`
- 直达页视口：`1366x768`、`1280x720`、`1024x768`
- 平台页视口：`1366x768`、`1280x720`、`1024x768`
- 自动化：Playwright Chromium `1.59.1`
- 浏览器插件：尝试连接 Codex in-app Browser 时超时，改用用户允许的 Playwright 路径继续
- 内容校验：`npm run validate:content`

说明：平台检查需要临时运行 `npm run dev` / `npm run generate:content` 让 L05 最新 metadata 进入预览数据；检查后已恢复 `apps/web/src/data/workspace-data.json`，未提交 generated file。

## 总体结论

| 资源 | 直达页 | 平台预览 | Console | 建议 |
| --- | --- | --- | --- | --- |
| `L05-A01` 数量积动态解释器 | 可运行，但首屏高度严重超出，画布和控制区不能完整可见 | iframe 不在平台首屏；iframe 内也需要滚动才能看到核心控制 | 无资源 JS error；平台有 iframe sandbox warning | `hold_for_revision` |
| `L10-A01` 向量法路径比较板 | 只有 scaffold 占位卡，首屏可见但无真实画布/控制 | 平台正确显示“真实课件预览尚未就绪”，无 iframe | 无错误 | `hold_for_revision` |
| `L04-M01` 投影有向长度导入动画 | 不适用，当前不是视频产物 | 平台正确显示“视频预览尚未就绪” | 无错误 | 保持 `metadata_ready`，后续单独升级 `video_ready` |

本批不建议任何资源进入 `browser_review`；更不进入 `classroom_trial`、`release_candidate` 或 `published` 判断。

## 关键发现

### L05-A01 数量积动态解释器

直达页无水平溢出，按钮点击和拖动交互可用。Playwright 操作 `120°`、`下一步`、拖动 `b` 端点后，读数可更新，例如出现 `θ = 97.1°`、`a·b = -1`、`负：a·b < 0`。

主要风险是首屏高度。三个视口下页面 `scrollHeight` 均为 `1169px`；画布区从 `top 97` 延伸到 `bottom 1155`，不能在 `768px` 或 `720px` 高度内完整显示。右侧读数区也被截断，`符号判断` 在 `1366x768` 时已经贴近或越过首屏底部，在 `1280x720` 和 `1024x768` 下更明显。课堂投屏时教师需要滚动才能看到完整画布、投影说明和课堂收束。

触控目标偏紧。按钮最小边约 `38px`，低于常见课堂触控推荐的约 `44px`；向量端点可见触控圈随画布缩放从约 `25px`、`22px` 降到 `16px`，在 `1024` 宽度下尤其不适合触控大屏。当前资源没有滑块。

平台 iframe 风险更高。平台页顶部到 L05 iframe 需要整页滚动，iframe 在 `1366x768` 时约从 `top 1673` 才出现，在 `1024x768` 时约从 `top 5137` 才出现。iframe 自身高度为 `560px`，但内部内容 `scrollHeight` 约 `1640-1701px`；由于 iframe 宽度低于课件 `980px` 断点，课件在 iframe 内变成上下堆叠，画布底部、stage note 和典型角按钮都落到 iframe 首屏之外。

结论：可作为运行原型继续打磨，但不适合进入 `browser_review`。

### L10-A01 向量法路径比较板

直达页在三种视口下都能首屏显示完整 scaffold 卡片，无水平或垂直滚动，无 console error。但该页只有标题、说明和资源 ID，没有真实画布、按钮、滑块、拖动目标或路径比较交互。

平台侧当前不生成 iframe，显示“真实课件预览尚未就绪”，与 `metadata.implementation.html_src_status: scaffolded` 一致。

结论：当前状态是合理的 scaffold 占位，但不能通过浏览器大屏触控审核；建议 `hold_for_revision`，等待生产线补齐真实交互后再审。

### L04-M01 投影有向长度导入动画

文件检查未发现 `dist/final/`，也未发现 `mp4`、`webm`、poster 或其它封面图片。`scene.py` 明确是占位 title card，`review.md` 也记录“本轮未渲染 mp4、webm 或 poster”。因此无法检查时长、分辨率、封面和主要画面可读性。

平台侧显示“视频预览尚未就绪”，没有 video 元素或 source，符合 `platform_card.availability: metadata_ready` 与 `preview_behavior: metadata_placeholder`。

结论：当前平台卡片继续保持 `metadata_ready` 是合理的；建议总控后续在单独 Manim 生产/渲染任务中生成 `mp4`、`webm` 和 poster，通过观看复核后再升级到 `video_ready`。

## Console 记录

- L05 直达页：三种视口均无 error / warning。
- L10 直达页：三种视口均无 error / warning。
- L10 平台预览、L04-M01 平台预览：无 error / warning。
- L05 平台 iframe：出现浏览器通用 sandbox warning：iframe 同时带 `allow-scripts` 与 `allow-same-origin`。未发现本资源脚本报错。

## 建议状态

- `SH-HS-MATH-HJ-B2-C08-L05-A01`：`hold_for_revision`
- `SH-HS-MATH-HJ-B2-C08-L10-A01`：`hold_for_revision`
- `SH-HS-MATH-HJ-B2-C08-L04-M01`：保持 `metadata_ready`；不进入 `browser_review`，后续单独渲染并升级 `video_ready`

## 剩余风险

- 本轮为 Playwright Chromium 冒烟和布局量测，未覆盖真实教室触控屏、Safari、低配 Windows 教师机或投屏缩放环境。
- L05 的交互数学口径未在本报告中做完整数学审校，只验证了浏览器运行和核心状态更新。
- L04-M01 没有视频产物，所有视频观看项只能记录为不可审。
