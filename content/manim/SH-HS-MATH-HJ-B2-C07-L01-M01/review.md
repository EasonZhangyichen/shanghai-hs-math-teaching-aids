# 审核记录：正弦曲线的来源

资源 ID：`SH-HS-MATH-HJ-B2-C07-L01-M01`
当前状态：`draft`
当前阶段：`video_ready`

## 2026-05-08 单资源审校结论

- 数学主线通过：单位圆动点 `P = (cos x, sin x)`、纵坐标 `sin x`、图像点 `Q = (x, sin x)`、一周轨迹生成 `y = sin x`、以及 `sin(x + 2π) = sin x` 的周期来源说明保持一致。
- 已发现并修复：metadata、storyboard、README 和画面中存在 `pi` / `2pi` 等 ASCII 写法，已统一为 `π`、`π/2`、`2π` 等课堂可接受的数学语言。
- 已发现并修复：原视频首屏直接给出 `Q = (x, sin x)`，关键点只有蓝点没有坐标标签，容易让学生跳过“横坐标是角 x 的弧度量”这一关键转换；已补充输入/输出/图像点规则面板、`sin x` 高度段和关键点坐标。
- 分镜节奏复核：视频由约 29 秒调整为 43.6 秒，适合放在 Applet 前或新课导入中；建议教师在 `Q = (x, sin x)` 出现后暂停追问“横坐标为什么是 x，而不是 cos x？”。
- 画面可读性复核：低质量预览和 1080p poster 抽帧显示单位圆、投影线、坐标轴、正弦曲线、关键点和规则面板互不遮挡；`(2π, 0)` 标签已避开红色 `Q` 标记。
- 已重渲染：完成 Python 语法检查、低质量预览、1080p30 mp4、webm 转码和 poster 更新。

## 已审校项

- 数学准确性：`0`、`π/2`、`π`、`3π/2`、`2π` 的正弦值和图像关键点准确；周期提示只作为来源说明，不替代下一课时性质归纳。
- 视频符号：`scene.py`、`storyboard.md`、`metadata.yaml` 中的 `π`、`π/2`、`2π`、`sin x`、`Q = (x, sin x)` 已统一。
- 课堂节奏：保留“先单位圆、再抽高度、再放到函数图像、最后提示周期”的导入顺序；不额外引入单调性、奇偶性或对称性术语。
- 大屏画面：规则面板放在左上，单位圆在左下，函数图像在右侧，主要对象有固定空间；最终画面可用于平台 poster。

## 仍需人工观看确认

- 建议教师完整播放最终 mp4，确认中文字体和 `π` 字符在实际投屏设备上无替换异常。
- `sin x` 高度标签在 `sin x = 0` 附近贴近 x 轴，低质量预览可读；仍建议教室大屏实播确认。
- 若教师希望更强的课堂停顿，优先在播放器层增加暂停点，不建议继续拉长动画本身。

## 渲染记录

- Manim：`Manim Community v0.20.1 via uvx`。
- 语法检查：`python3 -m py_compile content/manim/SH-HS-MATH-HJ-B2-C07-L01-M01/scene.py` 已通过。
- 预览：`uvx manim -ql --media_dir dist scene.py SineOriginScene` 已通过。
- 课堂视频：`dist/final/SH-HS-MATH-HJ-B2-C07-L01-M01.mp4`，1920x1080，30fps，43.6 秒，2026-05-08 已重渲染。
- Web 预览：`dist/final/SH-HS-MATH-HJ-B2-C07-L01-M01.webm`，1920x1080，30fps，2026-05-08 已转码更新。
- Poster：`dist/final/SH-HS-MATH-HJ-B2-C07-L01-M01-poster.png`，1920x1080，2026-05-08 已改为 36 秒主体画面。

## 下一状态建议

- 数学审校已通过，建议进入 `math_review` 通过后的 `video_reviewed` / 教研节奏复核阶段。
- metadata 已将 `compliance.review_status` 更新为 `math_review_passed`；顶层 `status` 暂保留 `draft`，等待总控统一决定状态枚举和流转口径。
