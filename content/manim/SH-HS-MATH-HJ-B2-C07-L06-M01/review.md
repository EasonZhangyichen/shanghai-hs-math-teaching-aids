# 审核记录：为什么正切图像有渐近线

资源 ID：`SH-HS-MATH-HJ-B2-C07-L06-M01`
当前状态：`draft`
当前阶段：`video_ready`

## 自检结论

- 内容为原创分镜和 Manim 场景脚本。
- 数学主线限定为 `tan x = sin x / cos x`、定义域断点、竖直渐近线和周期 `pi`。
- 资源服务于 `SH-HS-MATH-HJ-B2-C07-L06`“正切函数的图像”，并与 `SH-HS-MATH-HJ-B2-C07-L06-A01` Applet 形成“动画建立直觉 -> 拖动验证”的组合。
- 当前没有使用外部图片、音频、教材正文、官方课件或商业平台资源。
- 已完成首版 1080p30 mp4/webm/poster 导出，可进入平台预览和内部教研复核。

## 数学审校关注点

- “终边斜率”与 `tan x = sin x / cos x` 的衔接是否足够严谨，避免学生把任意斜率线误认为函数图像。
- `x = pi/2 + k pi` 的一般式是否在课堂收束中表达完整。
- 两侧逼近趋势是否需要明确区分左侧 `+infinity`、右侧 `-infinity`。
- 周期 `pi` 的解释是否突出 `sin`、`cos` 同时变号导致比值不变。

## 教学审校关注点

- 约 1 分钟节奏是否适合放在正切图像 Applet 前。
- 是否需要在 `cos x = 0` 出现时强制暂停，让学生先判断定义域。
- 图像逼近无穷的语言是否适合当前课时，避免引入过多极限术语。

## 视觉与渲染关注点

- 教室大屏上单位圆、正切图像、渐近线和读数面板是否可区分。
- `cos x` 段缩短的动画是否足够醒目。
- 最终规则面板不要遮挡正切图像的主分支。
- `scene.py` 使用 Manim `Text` 标签，不依赖本地 LaTeX。

## 渲染记录

- Manim：`Manim Community v0.20.1 via uvx`。
- 预览：`uvx manim -ql --media_dir dist scene.py TangentAsymptoteScene` 已通过。
- 课堂视频：`dist/final/SH-HS-MATH-HJ-B2-C07-L06-M01.mp4`，1920x1080，30fps，38.4 秒。
- Web 预览：`dist/final/SH-HS-MATH-HJ-B2-C07-L06-M01.webm`，1920x1080，30fps，38.4 秒。
- Poster：`dist/final/SH-HS-MATH-HJ-B2-C07-L06-M01-poster.png`，1920x1080。
- 为降低环境依赖，`scene.py` 使用 Manim `Text` 标签，不依赖本地 LaTeX。

## 推进门槛

进入 `render_ready` 前必须完成：

1. `scene.py` 通过 Python 语法检查。
2. 分镜暂停点与 metadata 的 `narrative_design.beats` 保持一致。
3. 低质量预览渲染成功，并确认文字、曲线和渐近线不遮挡。
4. `metadata.yaml`、`storyboard.md` 和 `scene.py` 的数学对象保持一致。

进入 `video_ready` 前必须完成：

1. 已导出 `dist/final/SH-HS-MATH-HJ-B2-C07-L06-M01.mp4`。
2. 已转码 `dist/final/SH-HS-MATH-HJ-B2-C07-L06-M01.webm`。
3. 已生成 `dist/final/SH-HS-MATH-HJ-B2-C07-L06-M01-poster.png`。
4. 已更新 `metadata.yaml` 的 `files`、`render_plan.phase` 和 `platform_card` 字段。
