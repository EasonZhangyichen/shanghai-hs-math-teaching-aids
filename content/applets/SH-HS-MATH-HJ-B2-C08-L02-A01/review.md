# 审核记录

资源 ID：`SH-HS-MATH-HJ-B2-C08-L02-A01`

当前状态：`draft`

建议状态：保持 `draft`，本轮仅作为 `self_checked_draft` 级别的作者自检记录。

本轮日期：2026-05-19

## 本轮自检范围

- 已将 HTML 占位入口精修为可直接打开的单文件 Applet。
- 已实现拖动 `O`、`A`、`B`，并同步更新 `a`、`b`、`a + b`、`a - b`。
- 已实现三种构造模式：首尾相接、平行四边形、减法与相反向量。
- 已实现四步揭示：观察、构造、证据、归纳。
- README、教师脚本、学生活动与 metadata 已同步到当前实现。

## 数学自检

- 加法：首尾相接模式中，`b` 被平移到 `a` 的终点，结果向量从共同起点指向最终终点。
- 加法：平行四边形模式中，`a`、`b` 共起点，平移副本补出第四个顶点，对角线表示 `a + b`。
- 减法：减法模式中，`a - b` 被解释为 `a + (-b)`，并用从 `B` 指向 `A` 的向量检查端点顺序。
- 证据口径：当前状态只作为拖拽构造的几何证据，使用水平位移、竖直位移、首尾相接、路径和端点顺序，不扩展到 8.3 后续表示方式的系统教学。

## 本轮补充修正

- 清理界面、README、教师脚本、学生活动和 metadata 中提前使用的后续解析化口径。
- 将 `a`、`b`、`a + b`、`a - b` 的证据改成水平位移、竖直位移和路径证据。
- 微调平台 iframe 首屏：收紧外边距和画板最小高度，让控制区在首屏内可扫读；按钮高度与画布端点命中半径按触控操作放大。
- 保持资源顶层 `draft` 与 `self_checked_draft`，不提升审核或发布状态。

## 验证记录

- `npm run validate:content`：通过。输出为 `Content validation passed: 70 lessons, 14 applet(s), 4 Manim clip(s), 7 diagnosis package(s).`
- `npm run verify`：通过。内容校验、backlog 生成、32 项 node test 和 Vite build 均通过；Vite 仍提示 bundle 超过 500 kB，这是既有构建体积提示，不指向本资源。
- 浏览器冒烟：通过。使用本地 Vite 与平台预览 iframe 复核；864 x 560 iframe 内，页面标题为“向量加减法构造器”，主画板和侧栏同屏，按钮最小高度 42 px，“3 证据”文案正确，画布端点命中半径已放大到 24 px。
- `npm run verify` 再生了 `apps/web/src/data/workspace-data.json` diff；本分支已恢复该 generated file，等待总控统一再生。

## 剩余风险

- 第 8 章来源和课时边界仍未完成纸质教材或已登录 dolearning 终核。
- 当前仅完成作者自检，尚未经过数学审校、浏览器大屏触控复核或真实课堂试读。
- Canvas 交互已按桌面和平板投屏设计，本轮完成本地 iframe 冒烟；真实触控大屏手感仍需课堂前复核。

## 不提升状态说明

本资源保持 `metadata.status: draft`，`compliance.review_status: self_checked_draft`。仍不得进入 `classroom_trial`、`release_candidate` 或 `published`；是否进入 `math_review` 需由总控在数学审校后决定。
