# 审核记录：向量表示与等价拖拽板

资源 ID：`SH-HS-MATH-HJ-B2-C08-L01-A01`

当前状态：`draft`

本轮日期：2026-05-09

本轮范围：仅 `content/applets/SH-HS-MATH-HJ-B2-C08-L01-A01/**`

## 本轮结论

建议进入 `self_checked_draft`。

本轮已将 scaffold 占位入口推进为可运行 Applet 草稿：平面网格中可以拖动蓝色 `AB` 定义向量，橙色 `CD` 始终按同一位移平移到新起点；读数区同步显示 `Δx`、`Δy`、长度、方向角和起点对照。资源主线聚焦“相等向量可以平移”，不处理 8.3 暂缓资源，不修改课程图谱，也不建议进入 `published`。

## 数学自检

- 非零向量相等的课堂口径：大小相等且方向相同。
- 网格读数口径：`AB = (x_B - x_A, y_B - y_A)`，`CD` 由 `C + AB` 得到，因此二者位移分量相同。
- 起点变化对照：拖动 `C`、`D` 或橙色向量整体时，只改变 `C` 和 `D` 的位置，不改变 `Δx`、`Δy`、长度和方向。
- 零向量边界：当 `A` 与 `B` 重合时显示长度为 0，方向不规定。
- 资源边界：不引入向量加减法、数乘、坐标运算训练或 8.3 课时划分判断。

## 本轮修改

- `src/index.html`：替换占位页为原生 SVG/JS 交互课件，支持网格、拖拽向量、平移等价向量、读数、分量辅助线、平移痕迹、重置和四步揭示。
- `metadata.yaml`：将 scaffold 字段更新为真实数学模型、交互设计、状态变量、事件协议、反馈证据和运行态字段；`implementation.phase` 更新为 `runnable_prototype`，`html_src_status` 更新为 `runnable`。
- `README.md`：补充核心问题、已实现交互、分步揭示和暂不覆盖范围。
- `teacher-script.md`：补齐 12 到 14 分钟课堂流程、追问链和板书落点。
- `student-task.md`：补齐坐标读数、平移观察表、反例追问和口头表达任务。

## 验证记录

- `npm run validate:content`：通过。输出为 `Content validation passed: 70 lessons, 14 applet(s), 4 Manim clip(s), 7 diagnosis package(s).`
- `npm run verify`：通过。内容校验、backlog 生成、28 项 node test 和 Vite build 均通过；Vite 仍提示 bundle 超过 500 kB，这是既有构建体积提示，不指向本资源。
- 浏览器冒烟：通过。使用本地 Vite `http://127.0.0.1:5175/content/applets/SH-HS-MATH-HJ-B2-C08-L01-A01/src/index.html` 打开资源，页面标题为“向量表示与等价拖拽板”，首屏非空，点击“3 读数”和“痕迹”后读数层与痕迹开关正常；过滤 Browser 插件自身 Statsig 网络噪声后，未见本资源 console error。
- `npm run verify` 再生了 `apps/web/src/data/workspace-data.json` diff；本分支不提交该 generated file，等待总控统一再生。

## 剩余风险

- 第 8 章仍处于 `draft` / `needs_manual_textbook_check`；8.3 课时边界未终核，本资源不能作为第 8 章全章已终核证据。
- 尚未经过数学审校者复核，尤其需要确认是否在 8.1.1 阶段使用方向角读数。
- 尚未经过真实投屏、触控大屏和教师 14 分钟流程试读。
- 学生可能把“拖动端点改变向量”和“拖动整条向量平移位置”混淆，教师脚本中需明确区分。

## 下一状态建议

- 建议：`self_checked_draft`。
- 暂不建议：`math_review`、`browser_review`、`classroom_trial`、`release_candidate` 或 `published`。
