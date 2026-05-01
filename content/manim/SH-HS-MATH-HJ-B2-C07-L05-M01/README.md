# 图像变换顺序解释

资源 ID：`SH-HS-MATH-HJ-B2-C07-L05-M01`
版本：`0.1.0`
状态：`draft`
类型：Manim Clip 视频资源

## 资源定位

本资源对应沪教版高中数学必修第二册第 7 章 7.3“函数 `y = A sin(omega x + phi)` 的图像”。它服务于 `SH-HS-MATH-HJ-B2-C07-L05-A01` 参数变化 Applet 之前的概念拆解，帮助学生先看清变换顺序：

```text
y = sin x
-> omega 改变横向尺度和周期
-> phi 与 omega 共同决定相位平移
-> A 改变纵向尺度和翻折
-> 从图像读回振幅、周期和相位平移
```

## 为什么用 Manim

这个课时的困难不在“会不会拖滑块”，而在学生经常把多个参数同时看，导致把 `phi` 误当成实际平移量，或者把 `A` 的负号误解为横向变化。Manim 适合把这些操作拆成固定节奏的连续动画，让教师在关键处暂停追问，再切到 Applet 做验证。

## 课堂用法

- 概念导入：播放第一轮，先不让学生操作，只观察每个参数对应的方向。
- 关键暂停：在 `2x + pi/2 = 2(x + pi/4)` 出现后追问“为什么不是左移 `pi/2`”。
- 与 Applet 配合：动画结束后切到 `SH-HS-MATH-HJ-B2-C07-L05-A01`，让学生锁定单参数分别验证。
- 与 Diagnosis 配合：后续 `SH-HS-MATH-HJ-B2-C07-L05-D01` 可检测学生能否从图像读回参数。

## 当前范围

本包已包含：

- `metadata.yaml`：Manim Clip metadata。
- `storyboard.md`：六幕分镜、暂停点和教师追问。
- `scene.py`：Manim 场景脚本。
- `review.md`：审核记录和推进门槛。
- `dist/final/SH-HS-MATH-HJ-B2-C07-L05-M01.mp4`：课堂播放视频。
- `dist/final/SH-HS-MATH-HJ-B2-C07-L05-M01.webm`：平台网页预览视频。
- `dist/final/SH-HS-MATH-HJ-B2-C07-L05-M01-poster.png`：视频封面。

本包暂不包含：

- 竖直平移 `k`。
- `omega < 0` 的等价变形讨论。
- 任意图像反求参数的完整算法。

## 导出与平台接入

预览命令：

```bash
uvx manim -ql --media_dir dist scene.py TransformOrderScene
```

高质量 mp4 导出：

```bash
uvx manim -r 1920,1080 --fps 30 --format=mp4 --media_dir dist scene.py TransformOrderScene
```

webm 建议从最终 mp4 转码：

```bash
ffmpeg -y -i dist/final/SH-HS-MATH-HJ-B2-C07-L05-M01.mp4 -c:v libvpx-vp9 -b:v 0 -crf 32 -an dist/final/SH-HS-MATH-HJ-B2-C07-L05-M01.webm
```

生成 poster：

```bash
ffmpeg -y -ss 00:00:12 -i dist/final/SH-HS-MATH-HJ-B2-C07-L05-M01.mp4 -frames:v 1 -update 1 dist/final/SH-HS-MATH-HJ-B2-C07-L05-M01-poster.png
```

当前 `metadata.yaml` 已标记为 `render_plan.phase: rendered` 和 `platform_card.availability: video_ready`，平台资源卡会从 metadata 中读取稳定视频入口。
