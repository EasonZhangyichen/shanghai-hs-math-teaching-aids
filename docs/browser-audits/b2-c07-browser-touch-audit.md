# 必修第二册第 7 章浏览器与大屏触控 QA 报告

审核日期：2026-05-09  
审核线：审核-浏览器大屏触控  
写入范围：仅本报告，不修改资源包、平台源码、课程图谱或 generated files。

## 1. 测试环境

- 本地平台启动命令：`npm run dev`
- 平台 URL：`http://127.0.0.1:5173/`
- 平台课时 URL：
  - `http://127.0.0.1:5173/#lesson=SH-HS-MATH-HJ-B2-C07-L03`
  - `http://127.0.0.1:5173/#lesson=SH-HS-MATH-HJ-B2-C07-L05`
  - `http://127.0.0.1:5173/#lesson=SH-HS-MATH-HJ-B2-C07-L07`
- 直达页 URL：
  - `http://127.0.0.1:5173/content/applets/SH-HS-MATH-HJ-B2-C07-L03-A02/src/index.html`
  - `http://127.0.0.1:5173/content/applets/SH-HS-MATH-HJ-B2-C07-L05-A01/src/index.html`
  - `http://127.0.0.1:5173/content/applets/SH-HS-MATH-HJ-B2-C07-L07-A01/src/index.html`
- 视口：
  - 大屏桌面：`1920 x 1080`
  - 教室触控屏近似：`1366 x 768`，启用 touch context
- 浏览器路径：本轮先尝试 Codex in-app Browser；因运行时连接产生外部 Statsig/Cloudflare 网络噪声且无法稳定设定精确大屏视口，最终使用本地 Playwright + 系统 Google Chrome 做视口可控验证。
- 截图与自动化结果临时保存于 `/tmp/b2-c07-browser-touch-audit/`，未写入仓库。

## 2. 总体结论

三项资源均能在平台 iframe 和直达页打开，核心画布非空，播放/暂停/重置在直达页和平台 iframe 内均可响应；本轮未发现会阻断运行的 app console error。平台 iframe 会稳定出现浏览器 sandbox 警告：`allow-scripts` 与 `allow-same-origin` 同时使用，这属于平台嵌入安全提示，不是资源脚本崩溃。

不建议把三项资源作为整批无条件进入 `browser_review`。`SH-HS-MATH-HJ-B2-C07-L07-A01` 可建议进入 `browser_review` 并记录平台 iframe 内滚动风险；`SH-HS-MATH-HJ-B2-C07-L03-A02` 和 `SH-HS-MATH-HJ-B2-C07-L05-A01` 建议先由总控确认是否接受当前大屏/触控风险，或安排资源/播放器后续优化后复测。

## 3. 资源逐项结果

### SH-HS-MATH-HJ-B2-C07-L03-A02 正弦与余弦相位对照

风险等级：中

通过项：

- 直达页在 `1920 x 1080` 和 `1366 x 768` 下无横向溢出、无纵向滚动，首屏能同时看到单位圆、图像、滑块、按钮、关键角表和结论区。
- 播放/暂停文案能在“播放/暂停”间切换；重置、相位参照、结论按钮可响应。
- `π/2`、`sin x`、`cos x`、`cos x = sin(x + π/2)` 在直达页课堂可读。
- 直达页复测未发现可复现 app console error。

风险项：

- 平台 `1366 x 768` 视口下，iframe 内部宽度约 `950`、高度 `560`。资源使用 `overflow: hidden`，右侧关键角表区域测得右边界约 `1035px`，超出 iframe 宽度约 `85px`，截图中“相位检查”右侧内容被裁切，且无横向滚动补救。
- 触控目标偏小：播放、重置、结论按钮约 `46 x 31`；关键角 `0`、`π`、`2π` 按钮宽度约 `28-36px`、高度约 `31px`。对教室触控屏或手指操作偏紧。
- `x` 滑块本体高约 `16px`，容器高约 `20px`，触控容错偏低。
- 平台页面选中资源后，真实课件 iframe 位于页面首屏下方；教师需要滚动平台页面后才能看到预览。

建议：暂不建议直接作为无条件 `browser_review`。建议优先修正平台 iframe 窄宽下关键角表裁切，并把按钮/滑块触控高度提升到至少约 `40px` 后复测。

### SH-HS-MATH-HJ-B2-C07-L05-A01 三角函数参数变化实验室

风险等级：中

通过项：

- 平台 iframe 与直达页均无横向溢出；画布宽度适配正常。
- 播放/暂停/重置稳定；A、ω、φ、观察点 x 滑块可更新；单参数观察、变换顺序、归纳按钮可响应。
- 按钮高度约 `40px`，滑块所在容器约 `316 x 72`，比 L03 更适合触控。
- `ω`、`φ`、`2π / ω`、`-φ / ω` 等参数符号在页面中可读。
- 未发现 app console error。

风险项：

- 首屏高度过高。直达页 `1920 x 1080` 和 `1366 x 768` 下文档高度均约 `1273px`，需要纵向滚动才能看到完整控制面板、变换顺序、图层开关和归纳区。
- 平台 iframe 中问题更明显：`1920 x 1080` 下 iframe 约 `1504 x 760`，内部文档高约 `1273px`；`1366 x 768` 下 iframe 约 `950 x 560`，内部文档同样约 `1273px`。这意味着课堂投屏时首屏主要显示图像和上半控制区，底部图层/归纳区需要在 iframe 内滚动。
- 平台 iframe 交互复测中，点击归纳后再操作重置需要浏览器自动滚动回上方按钮，说明控制面板高度对连续课堂操作不够紧凑。

建议：资源运行稳定，但不建议无条件进入 `browser_review`。若总控接受“平台 iframe 内滚动查看完整控制面板”，可作为带风险进入；若以大屏首屏完整控制为验收标准，应先压缩图像/控制面板高度或改为更清晰的分区滚动策略。

### SH-HS-MATH-HJ-B2-C07-L07-A01 正切性质分段观察

风险等级：低到中

通过项：

- 直达页 `1920 x 1080` 无滚动；`1366 x 768` 下文档高度约 `773px`，仅比视口高约 `5px`，可视为基本贴合大屏首屏。
- 无横向溢出，画布宽度适配正常。
- 播放/暂停/重置稳定；周期、奇对称、性质归纳、k 区间切换和 x 滑块均可响应。
- 按钮高度约 `40px`，x 滑块容器在直达页约 `974 x 42`，触控可用性较好。
- `tan x`、`π/2`、`tan(x + π) = tan x` 可读；点开“性质归纳”后可读到 `x ≠ π/2 + kπ, k ∈ Z` 和 `(-π/2 + kπ, π/2 + kπ), k ∈ Z`。
- 未发现 app console error。

风险项：

- 平台 iframe 在 `1366 x 768` 下约 `950 x 560`，内部文档高约 `1109px`，需要 iframe 内滚动才能看到侧栏性质读数和完整归纳区。
- 平台选中资源后 iframe 同样位于平台页面首屏下方，需要先滚动平台页面。

建议：可建议进入 `browser_review`，但应在总控记录“平台 iframe 内需要滚动查看完整侧栏/归纳区”，不要据此进入 `classroom_trial`、`release_candidate` 或 `published`。

## 4. Console 与嵌入警告

- 三个 Applet 本身没有捕获到可复现的运行时错误。
- 平台 iframe 均出现 sandbox warning：`An iframe which has both allow-scripts and allow-same-origin for its sandbox attribute can escape its sandboxing.` 这是当前平台 iframe sandbox 配置导致的浏览器安全警告，建议平台线后续统一评估。
- 一次 L03 直达页大屏测试中捕获到泛化的 `Failed to load resource: 404` console 文案，随后用 response 监听复测未捕获到 4xx 响应，判断不是可复现的 Applet 阻断问题。

## 5. 状态建议

- `SH-HS-MATH-HJ-B2-C07-L03-A02`：建议保留 `math_review` / `self_checked_draft` 后续状态，不建议本轮直接进入 `browser_review`，先处理 iframe 窄宽裁切和触控目标偏小。
- `SH-HS-MATH-HJ-B2-C07-L05-A01`：可运行但首屏高度风险明显；建议总控决定是接受带风险 `browser_review`，还是要求先优化大屏首屏和 iframe 内控制面板。
- `SH-HS-MATH-HJ-B2-C07-L07-A01`：建议进入 `browser_review`，但仅限浏览器/大屏触控维度，不代表课堂试用通过。

本报告不建议任何资源进入 `classroom_trial`、`release_candidate` 或 `published`。
