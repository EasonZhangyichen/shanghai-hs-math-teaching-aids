# Manim 资源包目录规范

## 目录命名

Manim Clip 资源包必须放在：

```text
content/manim/<resource-id>/
```

`<resource-id>` 使用项目资源 ID 规则，并以 `M` 表示 Manim Clip：

```text
SH-HS-MATH-HJ-B2-C07-L01-M01
```

资源 ID 一旦被课程图谱、教师脚本或平台资源卡引用，不应重命名；大改通过 `version` 推进。

## 草稿阶段

只做 Manim 流水线第一步时，资源包必须至少包含：

```text
content/manim/<resource-id>/
  metadata.yaml
  README.md
  storyboard.md
  scene.py
  review.md
```

对应 metadata 字段应写成：

```yaml
status: "draft"
resource_type: "manim_clip"
render_plan:
  phase: "scene_draft"
platform_card:
  availability: "metadata_ready"
  preview_behavior: "metadata_placeholder"
```

该阶段说明内容意图、场景结构和导出路径，但不要求已有 `mp4` 或 `webm`。

## 渲染阶段

完成 Manim 渲染后，资源包应增加：

```text
content/manim/<resource-id>/
  dist/
    final/
      <resource-id>.mp4
      <resource-id>.webm
      <resource-id>-poster.png
```

并更新：

```yaml
render_plan:
  phase: "rendered"
files:
  output_mp4: "dist/final/<resource-id>.mp4"
  output_webm: "dist/final/<resource-id>.webm"
  poster: "dist/final/<resource-id>-poster.png"
platform_card:
  availability: "video_ready"
  preview_behavior: "video_player"
```

## 文件职责

| 文件 | 职责 |
| --- | --- |
| `metadata.yaml` | 结构化元数据、课程定位、叙事节奏、渲染参数、平台卡片接入状态。 |
| `README.md` | 资源定位、教学问题、课堂使用方式、导出与平台接入摘要。 |
| `storyboard.md` | 动画分镜、暂停点、教师提问和数学对象出现顺序。 |
| `scene.py` | Manim 场景脚本草稿或可运行源文件。 |
| `review.md` | 数学审校、教学审校、视觉审校、版权合规和推进门槛。 |
| `dist/` | 后续渲染产物目录，提交前需确认文件体积和平台加载策略。 |

## metadata 要求

`metadata.yaml` 应能映射到 [`manim-clip-metadata.schema.json`](../schemas/manim-clip-metadata.schema.json)。其中：

- `id` 必须等于资源包目录名。
- `resource_type` 必须为 `manim_clip`。
- `status` 必须使用统一资源状态。
- `curriculum.lesson_id` 必须能在 `content/curriculum/index.yaml` 中找到对应课时。
- `narrative_design.beats` 必须对应 `storyboard.md` 的主要分镜。
- `render_plan.scene_class` 必须对应 `scene.py` 中的 Manim Scene 类名。
- `files` 中记录的文件名必须与资源包实际文件一致；渲染前不要填写不存在的输出文件。

## 进入 review 的目录门槛

进入 `math_review` 前，资源包必须满足：

1. `metadata.yaml` 字段完整并通过 schema 解析。
2. `storyboard.md` 能清楚解释每一幕的数学意图。
3. `scene.py` 至少通过 Python 语法检查。
4. `review.md` 列出仍需审校者关注的数学边界和课堂风险。
5. 若标记为 `video_ready`，`dist/` 中的 `mp4`、`webm` 和 poster 文件必须存在。
