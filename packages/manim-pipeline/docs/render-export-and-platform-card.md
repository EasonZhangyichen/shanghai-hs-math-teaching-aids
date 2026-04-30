# Manim 导出与平台资源卡接入

## 渲染目标

Manim Clip 面向课堂播放和平台预览，首期统一导出：

- `mp4`：默认课堂播放格式，兼容性优先。
- `webm`：平台网页预览的补充格式，体积和浏览器兼容性优先。
- `poster.png`：资源卡和视频播放器加载前的静态封面。

推荐课堂规格为 `1920x1080`、`30fps`、`16:9`。如果动画包含密集公式，可在审核中提升到 `60fps` 或提高码率，但默认不要让短片文件过大。

## 推荐命令

在资源包目录中预览：

```bash
manim -pql scene.py SineOriginScene
```

导出高质量 `mp4`：

```bash
manim -r 1920,1080 --fps 30 --format=mp4 --media_dir dist scene.py SineOriginScene
```

查找 Manim 生成的 mp4，并归档到稳定文件名。Manim 临时输出目录会随版本、质量参数和场景名变化，平台只应读取 `dist/final` 中的稳定文件：

```bash
mkdir -p dist/final
generated_mp4="$(find dist/videos -name SineOriginScene.mp4 -print -quit)"
cp "$generated_mp4" dist/final/SH-HS-MATH-HJ-B2-C07-L01-M01.mp4
```

导出 `webm`。若当前 Manim/FFmpeg 环境支持 `--format=webm`，可直接运行：

```bash
manim -r 1920,1080 --fps 30 --format=webm --media_dir dist scene.py SineOriginScene
```

若 Manim 版本不稳定支持 webm，则从 mp4 转码：

```bash
ffmpeg -y -i dist/final/SH-HS-MATH-HJ-B2-C07-L01-M01.mp4 -c:v libvpx-vp9 -b:v 0 -crf 32 -an dist/final/SH-HS-MATH-HJ-B2-C07-L01-M01.webm
```

生成 poster：

```bash
ffmpeg -y -ss 00:00:03 -i dist/final/SH-HS-MATH-HJ-B2-C07-L01-M01.mp4 -frames:v 1 dist/final/SH-HS-MATH-HJ-B2-C07-L01-M01-poster.png
```

## metadata 更新

渲染完成并核对文件后，把资源 metadata 从草稿占位更新为视频可用：

```yaml
render_plan:
  phase: "rendered"
files:
  output_mp4: "dist/final/SH-HS-MATH-HJ-B2-C07-L01-M01.mp4"
  output_webm: "dist/final/SH-HS-MATH-HJ-B2-C07-L01-M01.webm"
  poster: "dist/final/SH-HS-MATH-HJ-B2-C07-L01-M01-poster.png"
platform_card:
  availability: "video_ready"
  preview_behavior: "video_player"
```

如果只完成 `storyboard.md` 和 `scene.py`，保持：

```yaml
render_plan:
  phase: "scene_draft"
platform_card:
  availability: "metadata_ready"
  preview_behavior: "metadata_placeholder"
```

## 平台资源卡接入

平台壳后续读取 Manim 包时，应采用与 Applet 类似的绑定方式：

1. 扫描 `content/manim/*/metadata.yaml`。
2. 用 `metadata.id` 匹配课程图谱 `digital_entry_points[].proposed_resource_id`。
3. 用 `metadata.curriculum.lesson_id` 把未写入课程图谱但已存在的 Manim 包挂回课时页。
4. 当 `platform_card.availability` 为 `metadata_ready` 时，资源卡显示标题、教学问题、分镜摘要和 `scene.py` 入口，但不显示播放器。
5. 当 `platform_card.availability` 为 `video_ready` 且 `files.output_mp4` 或 `files.output_webm` 存在时，资源卡显示内嵌视频播放器。

推荐播放器结构：

```html
<video
  controls
  preload="metadata"
  poster="/content/manim/SH-HS-MATH-HJ-B2-C07-L01-M01/dist/final/SH-HS-MATH-HJ-B2-C07-L01-M01-poster.png"
>
  <source src="/content/manim/SH-HS-MATH-HJ-B2-C07-L01-M01/dist/final/SH-HS-MATH-HJ-B2-C07-L01-M01.webm" type="video/webm" />
  <source src="/content/manim/SH-HS-MATH-HJ-B2-C07-L01-M01/dist/final/SH-HS-MATH-HJ-B2-C07-L01-M01.mp4" type="video/mp4" />
</video>
```

平台资源卡不要读取 Manim 内部临时渲染目录。只有 `metadata.files` 中声明的 `dist/final/*` 文件可以作为稳定入口。
