# 审核记录：图像变换顺序解释

资源 ID：`SH-HS-MATH-HJ-B2-C07-L05-M01`
当前状态：`draft`
当前阶段：`video_ready`

## 自检结论

- 内容为原创分镜和 Manim 场景脚本。
- 数学主线限定为 `y = A sin(omega x + phi)` 的变换顺序解释。
- 样例采用 `y = -1.5 sin(2x + pi/2)`，用于同时呈现周期压缩、相位平移、纵向放大和翻折。
- 当前没有使用外部图片、音频、教材正文、官方课件或商业平台资源。
- 已完成首版 1080p30 mp4/webm/poster 导出，可进入平台预览和内部教研复核。

## 数学审校关注点

- `2x + pi/2 = 2(x + pi/4)` 的改写是否足够突出 `-phi / omega` 的相位平移量。
- “先压缩再平移”的课堂表述是否会与教材中其他变换顺序表述冲突；必要时需补充“等价路径”的说明。
- `A = -1.5` 的负号是否清楚解释为关于 `x` 轴翻折，而不是横向平移或周期变化。
- 是否需要在后续版本补充 `omega < 0` 的处理边界。

## 教学审校关注点

- 约 1 分钟节奏是否适合放在 `SH-HS-MATH-HJ-B2-C07-L05-A01` Applet 之前。
- 在公式改写后是否需要强制暂停，让学生先说出为什么左移 `pi/4`。
- 对参数识别的收束是否足够简洁，避免抢占后续 Diagnosis 的任务。

## 视觉与渲染关注点

- 教室大屏上基础曲线、当前曲线、平移箭头和振幅辅助线是否可区分。
- `Text` 标签不依赖本地 LaTeX，但后续若加入更复杂公式，应确认字体与跨平台渲染。
- 16:9 画面中读数面板不要遮挡最终曲线的关键点。

## 渲染记录

- Manim：`Manim Community v0.20.1 via uvx`。
- 预览：`uvx manim -ql --media_dir dist scene.py TransformOrderScene` 已通过。
- 课堂视频：`dist/final/SH-HS-MATH-HJ-B2-C07-L05-M01.mp4`，1920x1080，30fps，53.5 秒。
- Web 预览：`dist/final/SH-HS-MATH-HJ-B2-C07-L05-M01.webm`，1920x1080，30fps，53.5 秒。
- Poster：`dist/final/SH-HS-MATH-HJ-B2-C07-L05-M01-poster.png`，1920x1080。
- 为降低环境依赖，`scene.py` 使用 Manim `Text` 标签，不依赖本地 LaTeX。

## 推进门槛

进入 `render_ready` 前必须完成：

1. `scene.py` 通过 Python 语法检查。
2. 分镜暂停点经教师或总控对话确认。
3. 低质量预览渲染成功，并确认公式、曲线和读数面板不遮挡。
4. `metadata.yaml`、`storyboard.md` 和 `scene.py` 的样例函数保持一致。

进入 `video_ready` 前必须完成：

1. 已导出 `dist/final/SH-HS-MATH-HJ-B2-C07-L05-M01.mp4`。
2. 已转码 `dist/final/SH-HS-MATH-HJ-B2-C07-L05-M01.webm`。
3. 已生成 `dist/final/SH-HS-MATH-HJ-B2-C07-L05-M01-poster.png`。
4. 已更新 `metadata.yaml` 的 `files`、`render_plan.phase` 和 `platform_card` 字段。
