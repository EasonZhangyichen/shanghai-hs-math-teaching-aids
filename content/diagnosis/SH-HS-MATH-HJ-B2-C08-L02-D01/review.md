# 审核记录

资源 ID：`SH-HS-MATH-HJ-B2-C08-L02-D01`

当前状态：`draft`

审核状态：`self_checked_draft`

## 自检记录

- 已对齐课时 `SH-HS-MATH-HJ-B2-C08-L02`「向量的加法和减法」。
- 已补齐 6 题题组，总分 10 分，预计 8 到 10 分钟完成。
- 题目覆盖三角形法则首尾相接、平行四边形法则合向量方向、减法转化为加相反向量、闭合路径零向量和端点顺序辨析。
- 题组只使用几何路径和向量端点语言，未把 8.3 坐标表示或分量运算作为主线。
- `metadata.status` 保持 `draft`，`compliance.review_status` 保持 `self_checked_draft`。
- `platform_card.availability` 保持 `metadata_ready`，遵守第 8 章草稿资源闸门；题组已补齐但平台入口状态等待总控统一升级。
- `diagnosis_design.item_summary.question_types` 暂保留 `draft_placeholder` 作为第 8 章草稿平台闸门标记；真实题型已同时列出，`item-bank.yaml` 不再是空骨架。

## 文件一致性检查

- `metadata.yaml` 的题量、题型和错因标签已与 `item-bank.yaml` 对齐；平台预览状态仍按第 8 章草稿闸门保留为 `metadata_ready`。
- `README.md` 已补充题组结构和错因标签说明。
- `scoring-rubric.md` 已补充每题分值、部分得分、标签优先级和订正规则。
- `teacher-notes.md` 已补充课堂流程、讲评路径、看板建议和补救资源。

## 2026-05-19 质量线复核

- 数学试做通过：6 题均只使用 8.1.2 范围内的三角形法则、平行四边形法则、相反向量、闭合路径和端点顺序，不提前引入 8.3 坐标或分量运算。
- 答案唯一性通过：单选、多选、简答和错误分析题的正确结论清晰；多选题的部分得分规则能区分漏选和方向性错选。
- 已收紧反馈语言：对 `AB - AC`、`AB + CA` 和 `AB - AD` 的反馈补明“改写为加相反向量后可交换到首尾相接路径再读结果”，避免学生误以为原顺序本身就是连续路径。
- 错因标签覆盖到题组目标的四类方向错因：加法方向法则、减法相反向量、闭合路径零向量和端点顺序反向。
- 限时可行性判断：6 题共 10 分，其中 Q04、Q06 需要短解释；若教师要求条目式作答，8 到 10 分钟可完成。正式进入课堂试用前仍需小组限时试做。
- 状态边界：保持 `metadata.status: draft`、`compliance.review_status: self_checked_draft`、`platform_card.availability: metadata_ready`，本次不提升课堂试用或发布状态。

## 剩余风险

- 仍需数学教师复核所有向量等式、方向和零向量表述。
- 仍需小组限时试做，确认 6 题能在 8 到 10 分钟内完成。
- 第 8 章整体课时划分仍为 `draft`，需纸质教材或已登录 dolearning 最终确认；本资源当前不建议进入 `math_review` 以上状态。
- 未接入交互式诊断播放器，当前仅为题组预览与教师讲评用草稿。
