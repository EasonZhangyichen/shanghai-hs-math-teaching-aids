# 审核记录

资源 ID：`SH-HS-MATH-HJ-B2-C08-L05-D01`

当前状态：`draft`

审核状态：`self_checked_draft`

## 2026-05-18 自检

- 已对齐课时 `SH-HS-MATH-HJ-B2-C08-L05`「向量的数量积的定义与运算律」。
- 已将空题组补为 6 题、10 分、预计 9 分钟的课堂即时诊断。
- 题目聚焦数量积符号、夹角锐直钝、零向量边界、投影正负、垂直条件、结果类型和方向长度混淆。
- 讲评主线保持在 8.2 的几何定义、夹角余弦和有向投影；未把 8.3 坐标公式作为主要解题路径。
- `metadata.status` 保持 `draft`，`compliance.review_status` 保持 `self_checked_draft`。
- 平台卡片仍保持 `metadata_ready`，避免在总控接入诊断题组预览前改变第 8 章平台展示契约。
- `metadata.diagnosis_design.item_summary.question_types` 保留 `draft_placeholder` 标记，仅用于当前平台把第 8 章 Diagnosis 显示为 scaffold/draft；真实题型与题组内容以 `item-bank.yaml` 为准。

## 自检结论

- 文件结构完整：`metadata.yaml`、`README.md`、`item-bank.yaml`、`scoring-rubric.md`、`teacher-notes.md`、`review.md` 均已同步。
- 题量控制为 6 题，符合 8 到 10 分钟即时诊断。
- 题目均为原创表述，不复制教材正文、官方课件、教案或商业题库。

## 2026-05-19 质量线复核

- 数学试做通过：题组只使用 8.2 数量积定义、夹角余弦、有向投影、零向量边界和结果类型判断，不把 8.3 坐标公式作为解题主线。
- 修正一处严格性风险：Q02 原“`a · b < 0` 则夹角是钝角”未覆盖方向相反时 θ = 180° 的边界；已改为“90° < θ ≤ 180°”，并同步更新反馈、评分规则、README、教师说明和 metadata 诊断焦点。
- 答案唯一性通过：Q01 到 Q06 的正确答案和关键理由均清晰；Q03 明确区分“两个非零向量垂直”和“零向量导致数量积为 0”。
- 错因标签定位清晰：`angle_sign_confusion`、`projection_sign_confusion`、`zero_vector_boundary`、`perpendicular_condition_overgeneralization`、`result_type_scalar_confusion`、`length_direction_mixup` 均能对应具体选项或解释题缺口。
- 限时可行性判断：Q05、Q06 为解释题，若按关键词给分可在 8 到 10 分钟完成；若要求完整书写计算过程，9 分钟可能偏紧，需小组限时试做确认。
- 状态边界：保持 `metadata.status: draft`、`compliance.review_status: self_checked_draft`、`platform_card.availability: metadata_ready`，本次不提升课堂试用或发布状态。

## 待后续复核

- 需要数学教师复核 Q03 中零向量与垂直表述是否符合本校课堂约定。
- 需要小组限时试做确认 Q05、Q06 的解释题是否会拖慢 9 分钟节奏。
- 第 8 章课时划分仍待纸质教材或已登录平台终核；本资源不得进入 `release_candidate` 或 `published`。

## 2026-05-19 B2-C08 Diagnosis 审核线程复核

- 本轮只做题组质量审核，未新增题目，未改变 `metadata.status: draft`、`compliance.review_status: self_checked_draft` 或 `platform_card.availability: metadata_ready`。
- 数学口径复核：Q01 到 Q06 均回到数量积定义、夹角余弦、有向投影、零向量边界和结果类型；未引入 8.3 坐标公式作为解题主线。
- 已小修严格性表述：把 Q02 正确反馈中的“夹角钝角”改为“大于 90° 并覆盖 180° 反向边界”，并同步教师说明与错因标签描述，避免遗漏反向边界。
- 限时节奏复核：客观题可快速完成，Q05、Q06 仍需按关键词给分；若要求完整计算作文，9 分钟偏紧，暂保留小组限时试做风险。
