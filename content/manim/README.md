# Manim 资源目录

本目录用于存放 Manim 数学动画资源。Manim 不替代交互课件，主要负责概念导入、连续推演、证明结构和公式变形叙事。

## 推荐结构

```text
content/manim/SH-HS-MATH-HJ-B2-C07-L01-M01/
  metadata.yaml
  README.md
  storyboard.md
  scene.py
  review.md
```

目录规范与导出流程详见：

- `packages/manim-pipeline/docs/resource-package.md`
- `packages/manim-pipeline/docs/render-export-and-platform-card.md`
- `packages/manim-pipeline/schemas/manim-clip-metadata.schema.json`

## 适合 Manim 的内容

- 割线逼近切线。
- 单位圆生成正弦曲线的连续过程。
- 基本不等式几何证明。
- 三角恒等变换的结构化推演。
- 圆锥曲线定义到图像的生成。
- 立体几何截面形成过程。

## 交付形式

后续应同时支持：

- 平台内嵌视频片段。
- 课堂离线播放文件。
- 与 Applet 课件页联动的“先看动画、再操作验证”流程。

## 当前样板

- `SH-HS-MATH-HJ-B2-C07-L01-M01`：正弦曲线的来源，当前为 `scene_draft`，已包含 Manim 场景脚本草稿，尚未导出 `mp4` / `webm`。
