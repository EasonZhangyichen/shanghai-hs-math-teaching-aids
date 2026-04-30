# 审核记录：正弦曲线的来源

资源 ID：`SH-HS-MATH-HJ-B2-C07-L01-M01`
当前状态：`draft`
当前阶段：`scene_draft`

## 自检结论

- 内容为原创分镜和 Manim 场景草稿。
- 数学主线限定为 `y = sin x` 的生成来源，不展开性质归纳。
- 当前没有使用外部图片、音频、教材正文、官方课件或商业平台资源。
- 尚未渲染 mp4/webm，不能进入课堂试用或平台视频播放状态。

## 数学审校关注点

- `Q = (x, sin x)` 的横坐标解释是否足够清楚。
- `x` 的弧度量、单位圆转角、图像横轴刻度之间是否会被学生误读。
- 关键角 `0`、`pi/2`、`pi`、`3pi/2`、`2pi` 的停顿位置和正弦值标记是否准确。
- 结尾周期提示是否只作为来源说明，避免提前替代后续性质课的系统归纳。

## 教学审校关注点

- 60 到 90 秒的节奏是否适合课堂开场。
- 在 `Q = (x, sin x)` 出现后是否需要强制暂停，先让学生回答横坐标来源。
- 动画结束后是否能自然切换到 `SH-HS-MATH-HJ-B2-C07-L01-A01` 的拖动验证。

## 视觉与渲染关注点

- 教室大屏上 `P`、`Q`、投影线和轨迹颜色是否可区分。
- `TracedPath` 生成轨迹与最终 `sine_curve` 的切换是否平滑。
- 16:9 画面中单位圆和函数坐标系的距离是否适合投屏。
- 中文字幕暂未进入 `scene.py`，后续若加入需确认字体和跨平台渲染。

## 推进门槛

进入 `math_review` 前必须完成：

1. `scene.py` 通过 Python 语法检查。
2. 低质量预览 `manim -pql scene.py SineOriginScene` 成功生成。
3. 分镜暂停点经教师或总控对话确认。
4. `metadata.yaml` 与 `storyboard.md` 保持一致。

进入 `video_ready` 前必须完成：

1. 导出 `dist/final/SH-HS-MATH-HJ-B2-C07-L01-M01.mp4`。
2. 转码 `dist/final/SH-HS-MATH-HJ-B2-C07-L01-M01.webm`。
3. 生成 `dist/final/SH-HS-MATH-HJ-B2-C07-L01-M01-poster.png`。
4. 更新 `metadata.yaml` 的 `files` 和 `platform_card` 字段。
