# 正弦曲线的来源

资源 ID：`SH-HS-MATH-HJ-B2-C07-L01-M01`
版本：`0.1.0`
状态：`draft`
类型：Manim Clip 场景草稿

## 资源定位

本资源对应沪教版高中数学必修第二册第 7 章 7.1.1“正弦函数的图像”。它作为“单位圆到正弦曲线”Applet 之前的概念导入动画，目标不是替代学生操作，而是先建立一条清晰的视觉主线：

```text
单位圆动点 P
-> P 的纵坐标 sin x
-> 图像点 Q = (x, sin x)
-> Q 的轨迹生成 y = sin x
-> 终边重合解释 2pi 周期
```

## 为什么用 Manim

静态图容易让学生把正弦曲线当作已经画好的形状。Manim 适合把“旋转、投影、描点、留痕”做成连续叙事，让学生先看见生成过程，再进入 Applet 中拖动验证。

## 课堂用法

- 新课导入：播放 60 到 90 秒，暂停在 `Q = (x, sin x)` 出现后追问横坐标来源。
- 概念澄清：学生把图像横坐标误认为单位圆点横坐标时，回放“放到函数图像”一幕。
- 与 Applet 配合：动画负责建立直觉，`SH-HS-MATH-HJ-B2-C07-L01-A01` 负责学生拖动、预测和验证。

## 当前范围

本包已包含：

- `metadata.yaml`：Manim Clip metadata 草稿。
- `storyboard.md`：五幕分镜和暂停问题。
- `scene.py`：Manim 场景脚本草稿。
- `review.md`：草稿阶段审核记录。

本包暂不包含：

- 已渲染的 `mp4` / `webm`。
- 平台视频播放器实际代码改造。
- 正弦函数性质的系统归纳。

## 导出与平台接入

预览命令：

```bash
manim -pql scene.py SineOriginScene
```

高质量 mp4 导出：

```bash
manim -r 1920,1080 --fps 30 --format=mp4 --media_dir dist scene.py SineOriginScene
```

webm 建议从最终 mp4 转码：

```bash
ffmpeg -y -i dist/final/SH-HS-MATH-HJ-B2-C07-L01-M01.mp4 -c:v libvpx-vp9 -b:v 0 -crf 32 -an dist/final/SH-HS-MATH-HJ-B2-C07-L01-M01.webm
```

渲染完成后再把 `metadata.yaml` 中的 `render_plan.phase` 改为 `rendered`，补齐 `files.output_mp4`、`files.output_webm` 和 `files.poster`，平台资源卡即可从 metadata 中读取稳定视频入口。
