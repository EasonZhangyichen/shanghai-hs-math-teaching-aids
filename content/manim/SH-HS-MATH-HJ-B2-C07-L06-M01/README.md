# 为什么正切图像有渐近线

资源 ID：`SH-HS-MATH-HJ-B2-C07-L06-M01`
版本：`0.1.0`
状态：`draft`
类型：Manim Clip 视频资源

## 资源定位

本资源对应沪教版高中数学必修第二册第 7 章 7.4.1“正切函数的图像”。它服务于 `SH-HS-MATH-HJ-B2-C07-L06-A01` 正切函数图像生成器之前的概念导入，帮助学生先看清：

```text
tan x = sin x / cos x
-> 终边接近 y 轴时 cos x 接近 0
-> 正切值向无穷方向逼近
-> x = π/2 + kπ（k ∈ Z）处没有函数值
-> 相邻图像每隔 π 重复
```

## 为什么用 Manim

这个课时的困难不是“正切曲线长什么样”，而是学生容易把它画成普通连续曲线。Manim 适合把终边旋转、分母趋近 0、图像点逼近渐近线和相邻周期复制固定成一段连续叙事，让教师在关键处暂停追问，再切到 Applet 做拖动验证。

## 课堂用法

- 概念导入：播放第一轮，只让学生观察终边接近 y 轴时 `cos x` 如何变化。
- 关键暂停：在 `x = π/2` 竖直线出现后追问“这里为什么没有函数值”。
- 与 Applet 配合：动画结束后切到 `SH-HS-MATH-HJ-B2-C07-L06-A01`，让学生拖动角度观察两侧逼近趋势。
- 板书收束：把定义域、渐近线和周期三条结论写成一般式。

## 当前范围

本包包含：

- `metadata.yaml`：Manim Clip metadata。
- `storyboard.md`：六幕分镜、暂停点和教师追问。
- `scene.py`：Manim 场景脚本。
- `review.md`：审核记录和推进门槛。
- `dist/final/SH-HS-MATH-HJ-B2-C07-L06-M01.mp4`：课堂播放视频。
- `dist/final/SH-HS-MATH-HJ-B2-C07-L06-M01.webm`：平台网页预览视频。
- `dist/final/SH-HS-MATH-HJ-B2-C07-L06-M01-poster.png`：视频封面。

本包暂不包含：

- 正切函数单调性的完整证明。
- 反正切函数。
- 用导数解释渐近线附近变化率。

## 导出与平台接入

预览命令：

```bash
uvx manim -ql --media_dir dist scene.py TangentAsymptoteScene
```

高质量 mp4 导出：

```bash
uvx manim -r 1920,1080 --fps 30 --format=mp4 --media_dir dist scene.py TangentAsymptoteScene
```

webm 建议从最终 mp4 转码：

```bash
ffmpeg -y -i dist/final/SH-HS-MATH-HJ-B2-C07-L06-M01.mp4 -c:v libvpx-vp9 -b:v 0 -crf 32 -an dist/final/SH-HS-MATH-HJ-B2-C07-L06-M01.webm
```

生成 poster：

```bash
ffmpeg -y -ss 00:00:20 -i dist/final/SH-HS-MATH-HJ-B2-C07-L06-M01.mp4 -frames:v 1 -update 1 dist/final/SH-HS-MATH-HJ-B2-C07-L06-M01-poster.png
```

当前 `metadata.yaml` 已标记为 `render_plan.phase: rendered` 和 `platform_card.availability: video_ready`，平台资源卡会从 metadata 中读取稳定视频入口。
