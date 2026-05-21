# 指数对数互反图像镜像板

资源 ID：`SH-HS-MATH-HJ-B1-C04-L06-A01`

对应课时：`SH-HS-MATH-HJ-B1-C04-L06`「对数函数的性质」

这是一个可直接打开的 HTML Applet 自检草稿，聚焦同一底数下指数函数与对数函数的反函数关系：

```text
y = a^x,  y = log_a x,  a > 0 且 a != 1
```

页面把 `y = a^x`、`y = log_a x` 与 `y = x` 镜像参照线放在同一坐标系中。拖动底数 a 或移动指数函数上的点 P(x, a^x) 时，系统同步生成对数函数上的点 Q(a^x, x)，用交换坐标展示两条图像关于直线 y = x 对称。重点不是只画两条曲线，而是明确 `y = a^x` 与 `y = log_a x` 互为反函数。

## 交互设计

- 调节底数 a，连续观察 a > 1 与 0 < a < 1 两种情况；交互会自动避开 a = 1。
- 移动指数函数上的 P 点，读出 P(x, a^x) 与 Q(a^x, x)。
- 属性卡片同步显示：指数函数的定义域 R 与对数函数的值域 R 对应；指数函数的值域 (0, +∞) 与对数函数的定义域 (0, +∞) 对应；a > 1 时同增，0 < a < 1 时同减。

## 当前状态

- `metadata.status` 保持 `draft`。
- `compliance.review_status` 保持 `self_checked_draft`。
- `implementation.phase` 为 `runnable_prototype`，`html_src_status` 为 `runnable`。
