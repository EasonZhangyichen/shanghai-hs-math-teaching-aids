# 投影有向长度导入动画

资源 ID：`SH-HS-MATH-HJ-B2-C08-L04-M01`
版本：`0.1.0`
状态：`draft`
类型：Manim Clip

对应课时：`SH-HS-MATH-HJ-B2-C08-L04`「向量的投影」

## 资源定位

这段动画是「向量的投影」课堂开头的短导入。主线是先确定向量 `b` 的方向，再把向量 `a` 的终点投影到 `b` 所在直线，读取有向投影长度。

```text
定 b 的正方向
-> 从 a 的终点作垂线
-> 投影点 H 落在有向轴上
-> 投影长度 = |a|cosθ
-> 锐角为正、直角为零、钝角为负
```

它只预告下一课会把有向投影长度与数量积联系起来，不替代下一课对数量积定义、运算律和应用的完整教学。

## 教学痛点

- 学生容易把投影长度看成普通线段长，忽略它是有方向符号的量。
- 夹角为钝角时投影为负的原因不直观。
- 投影、垂线、`cosθ` 和数量积符号之间的联系容易被分散记忆。

## 当前内容

本包已包含：

- `metadata.yaml`：Manim Clip metadata，记录课堂定位、分镜、渲染状态和平台视频入口。
- `storyboard.md`：四段分镜、暂停问题和与 Applet 的衔接方式。
- `scene.py`：可运行 Manim 场景，动态展示锐角、直角、钝角下投影长度的正、零、负。
- `review.md`：自检结论、渲染记录和后续审校风险。
- `dist/final/`：渲染成功后放置课堂 `mp4`、网页 `webm` 和 poster。

## 运行与导出

在本资源目录中执行：

```bash
python3 -m py_compile scene.py
uvx manim -ql --media_dir dist scene.py DirectedProjectionLengthScene
uvx manim -r 1920,1080 --fps 30 --format=mp4 --media_dir dist scene.py DirectedProjectionLengthScene
```

生成稳定平台文件：

```bash
mkdir -p dist/final
cp dist/videos/scene/1080p30/DirectedProjectionLengthScene.mp4 dist/final/SH-HS-MATH-HJ-B2-C08-L04-M01.mp4
ffmpeg -y -i dist/final/SH-HS-MATH-HJ-B2-C08-L04-M01.mp4 -c:v libvpx-vp9 -b:v 0 -crf 32 -an dist/final/SH-HS-MATH-HJ-B2-C08-L04-M01.webm
ffmpeg -y -ss 00:00:34 -i dist/final/SH-HS-MATH-HJ-B2-C08-L04-M01.mp4 -frames:v 1 -update 1 dist/final/SH-HS-MATH-HJ-B2-C08-L04-M01-poster.png
```

## 审看建议

- 先看 `H` 是否清楚地沿 `b` 所在直线从正方向移动到原点，再移动到反方向。
- 检查画面是否始终使用 `θ`、`cosθ`、`投影长度` 等课堂表达。
- 确认数量积只作为衔接出现，没有提前讲完整下一课内容。
- 当前已导出 1920×1080、30fps、36.8 秒的 `mp4`、`webm` 和 poster；poster 取自 34 秒最终衔接画面。
- `metadata.yaml` 已标记 `render_plan.phase: rendered` 和 `platform_card.availability: video_ready`，并通过 `files.output_mp4`、`files.output_webm`、`files.poster` 暴露平台视频入口。
