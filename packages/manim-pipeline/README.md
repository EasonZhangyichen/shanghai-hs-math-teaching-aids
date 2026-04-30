# Manim Pipeline

本包沉淀 Manim 动画资源的内容契约、目录规范、渲染导出约定和平台资源卡接入规则。

当前阶段只定义草稿规范，不引入 Manim 运行依赖，也不要求本仓库的 `npm run verify` 执行动画渲染。Manim 场景源文件放在 `content/manim/<resource-id>/scene.py`，渲染产物后续统一放在同一资源包的 `dist/` 目录。

## 当前文件

- `schemas/manim-clip-metadata.schema.json`：Manim Clip metadata schema 草稿。
- `docs/resource-package.md`：Manim 资源包目录结构与阶段规则。
- `docs/render-export-and-platform-card.md`：mp4/webm 导出和平台资源卡接入说明。

## 首个样板

首个样板资源包为：

```text
content/manim/SH-HS-MATH-HJ-B2-C07-L01-M01/
```

它对应课程图谱中的 `SH-HS-MATH-HJ-B2-C07-L01-M01`：“正弦曲线的来源”。
