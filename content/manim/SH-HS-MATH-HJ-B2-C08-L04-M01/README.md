# 投影有向长度导入动画

资源 ID：`SH-HS-MATH-HJ-B2-C08-L04-M01`
版本：`0.1.0`
状态：`draft`
类型：Manim Clip 场景骨架

对应课时：`SH-HS-MATH-HJ-B2-C08-L04`「向量的投影」

本目录由资源 scaffold 命令生成，用于承载「向量的投影」的 Manim 草稿。本轮只建立可校验骨架，不渲染视频，不编写完整动画。

## 资源定位

这段动画只做课堂导入，目标是让学生先看见：

```text
定基准方向
-> 从向量 a 的端点作垂线
-> 在基准方向上读取投影点
-> 有向投影长度可以为正、为 0 或为负
```

它不替代后续 Applet `SH-HS-MATH-HJ-B2-C08-L04-A01` 的拖动探索，也不展开完整数量积公式推导。

## 教学痛点

- 学生容易把投影长度看成普通线段长度，忽略它是有方向符号的量。
- 夹角为钝角时投影为负的原因不直观。
- 投影、垂线和数量积公式之间的联系容易被分散记忆。

## 当前范围

本包已包含：

- `metadata.yaml`：Manim Clip metadata 草稿，当前为 `scene_draft` / `metadata_ready`。
- `storyboard.md`：四段短分镜骨架和教师暂停问题。
- `scene.py`：只含标题卡和占位提示的 Manim Scene 骨架。
- `review.md`：scaffold 自检和后续审校关注点。

本包暂不包含：

- `dist/final/` 下的 `mp4`、`webm` 或 poster。
- 完整 Manim 动画实现。
- 数学审校、分镜节奏复核或课堂试用结论。
