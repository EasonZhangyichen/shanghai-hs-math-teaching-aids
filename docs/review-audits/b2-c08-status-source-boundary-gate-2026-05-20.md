# B2-C08 状态与来源边界闸门审计

审计日期：2026-05-20

审计分支：`codex/audit-b2-c08-status-source-boundary-gate`

审计对象：B2-C08 当前已实现资源的 `metadata.yaml` 与资源包内 `review.md`

写入范围：仅本报告。未生产资源，未修 Applet，未修改资源状态字段、课程图谱、生产 backlog 或平台生成数据。

## 范围

本轮纳入 10 个已实现资源包：

- Applet：`SH-HS-MATH-HJ-B2-C08-L01-A01`、`L02-A01`、`L03-A01`、`L04-A01`、`L05-A01`、`L10-A01`
- Diagnosis：`SH-HS-MATH-HJ-B2-C08-L02-D01`、`L05-D01`、`L10-D01`
- Manim Clip：`SH-HS-MATH-HJ-B2-C08-L04-M01`

抽查和机器读表覆盖：

- `content/applets/SH-HS-MATH-HJ-B2-C08-*/metadata.yaml`
- `content/applets/SH-HS-MATH-HJ-B2-C08-*/review.md`
- `content/diagnosis/SH-HS-MATH-HJ-B2-C08-*/metadata.yaml`
- `content/diagnosis/SH-HS-MATH-HJ-B2-C08-*/review.md`
- `content/manim/SH-HS-MATH-HJ-B2-C08-*/metadata.yaml`
- `content/manim/SH-HS-MATH-HJ-B2-C08-*/review.md`

## 总体结论

B2-C08 已实现资源的实际状态字段没有越线：10 个资源顶层 `metadata.status` 均为 `draft`，`compliance.review_status` 均为 `self_checked_draft`；3 个 Diagnosis 平台卡片为 `metadata_ready`，1 个 Manim 为 `video_ready`，未发现 `classroom_trial`、`release_candidate` 或 `published` 被写入状态字段。

但来源边界和审校建议的文字仍不够硬，不能作为总控放行依据。主要问题是：多份 `metadata.yaml` 没有同时点名“纸质教材、已登录上海数字教育/教学平台、dolearning 终核”；多份 `review.md` 使用“已登录平台”“课堂试用或发布状态”等软措辞，没有精确写出 `classroom_trial`、`release_candidate`、`published`；历史 review-audit 和总控状态文档中还残留 L05/L10 可进入 `math_review` 或 `browser_review` 队列的旧建议。

建议状态：阻断。第 8 章教材目录、课时边界和 8.3 分组完成纸质教材、已登录上海数字教育/教学平台、dolearning 终核前，B2-C08 已实现资源只应保持 `draft` / `self_checked_draft` / `metadata_ready` / `video_ready`，不得进入 `math_review`、`browser_review`、`classroom_trial`、`release_candidate` 或 `published`。

## 状态字段审计

| 资源 | metadata 状态 | review 状态建议 | 结论 |
| --- | --- | --- | --- |
| `L01-A01` | `draft` / `self_checked_draft` | 明确暂不建议 `math_review` / `browser_review`，不得进入发布链路 | 字段合格 |
| `L02-A01` | `draft` / `self_checked_draft` | 是否进入 `math_review` 需总控决定，明确不得进入发布链路 | 字段合格 |
| `L02-D01` | `draft` / `self_checked_draft` / `metadata_ready` | 不提升课堂试用或发布状态，不建议进入 `math_review` 以上 | 字段合格，状态码措辞需硬化 |
| `L03-A01` | `draft` / `self_checked_draft` | 明确暂不建议 `math_review` / `browser_review` / 发布链路 | 字段合格 |
| `L04-A01` | `draft` / `self_checked_draft` | 明确暂不建议 `math_review` / `browser_review` / 发布链路 | 字段合格 |
| `L04-M01` | `draft` / `self_checked_draft` / `video_ready` | 只允许教师观看确认队列，不得进入 `classroom_trial` / `release_candidate` / `published` | 字段合格 |
| `L05-A01` | `draft` / `self_checked_draft` | 写明未提升后续审核或发布阶段，但未精确列出全部禁止状态码 | 字段合格，review 措辞需硬化 |
| `L05-D01` | `draft` / `self_checked_draft` / `metadata_ready` | 不提升课堂试用或发布状态；只精确写出不得进入 `release_candidate` / `published` | 字段合格，review 措辞需硬化 |
| `L10-A01` | `draft` / `self_checked_draft` | 明确暂不建议 `math_review` / `browser_review` / 发布链路 | 字段合格 |
| `L10-D01` | `draft` / `self_checked_draft` / `metadata_ready` | 不提升课堂试用或发布状态，不进入发布链路 | 字段合格，状态码措辞需硬化 |

## 来源边界阻断清单

1. `metadata.yaml` 来源边界未统一到三来源硬口径。
   6 个 Applet metadata 的 `copyright_note` 多为“第 8 章课时边界仍需纸质教材或已登录平台终核”，缺少 `dolearning` 和“上海数字教育/教学平台”的明确名称。3 个 Diagnosis metadata 与 `L04-M01` metadata 的 `copyright_note` 只写原创性，不写第 8 章课时边界仍需终核。

2. `review.md` 来源边界不一致。
   `L10-A01` 与 `L04-M01` review 已同时点名纸质教材、dolearning、上海数字教学平台和终核；其余资源有不同程度缺口。`L01-A01`、`L04-A01` 主要写 `draft` / `needs_manual_textbook_check`，没有在 review 中重述三来源；`L02-A01`、`L02-D01`、`L10-D01` 写了纸质教材和 dolearning，但缺上海平台；`L03-A01`、`L05-A01`、`L05-D01` 写了纸质教材或已登录平台，但未点名 dolearning 和上海平台。

3. `review.md` 禁止状态码需精确化。
   `L05-A01`、`L02-D01`、`L10-D01` 未在资源包 review 中逐项写出 `classroom_trial`、`release_candidate`、`published`；`L05-D01` 未精确写出 `classroom_trial`。这些不是状态字段越线，但总控硬闸门读起来不够明确。

4. 历史审计文档和总控状态文档存在旧建议，需总控统一压回。
   资源包当前 `review.md` 未发现正向 `math_review` / `browser_review` 越级建议；但历史文档仍有冲突文本：`docs/review-audits/b2-c08-l01-l04-math-hj-consistency.md` 建议 `L03-A01`、`L04-A01` 进入 `math_review`，`docs/review-audits/b2-c08-l05-a01-postfix-gate.md` 建议 `L05-A01` 进入 `math_review`，`docs/review-audits/b2-c08-l10-a01-postfix-gate.md` 建议 `L10-A01` 进入 `math_review`，且 `docs/01-current-state.md`、`docs/02-next-actions.md` 仍残留 L10 进入 `math_review` 或正式 `browser_review` 队列的表述。若总控按最新来源边界收紧，应以后续状态总控文档覆盖这些旧建议。

## 越级建议检查

资源包 `metadata.yaml` 与资源包内 `review.md` 中未发现正向建议进入 `browser_review` 的记录。

资源包内 `review.md` 中也未发现无条件正向建议进入 `math_review` 的记录：

- `L01-A01`、`L03-A01`、`L04-A01`、`L10-A01` 明确暂不建议 `math_review` / `browser_review`。
- `L02-A01` 写明是否进入 `math_review` 需由总控在数学审校后决定。
- `L02-D01` 写明当前不建议进入 `math_review` 以上状态。
- `L05-A01`、`L05-D01`、`L10-D01`、`L04-M01` 没有正向 `math_review` / `browser_review` 建议。

因此，资源包本体未越级；阻断点在“来源边界措辞不够硬”和“历史审计/总控状态文档残留旧建议”。

## 下一步建议

1. 先做 docs-only 的状态边界收紧，不修 applet、不生产资源：统一 10 个资源的 metadata/review 口径，明确“第 8 章仍未完成纸质教材、已登录上海数字教育/教学平台、dolearning 终核”。
2. 对 `L05-A01`、`L02-D01`、`L05-D01`、`L10-D01` 的 review 增补精确禁止状态码：不得进入 `classroom_trial`、`release_candidate`、`published`；同时明确不得进入 `math_review` / `browser_review`，除非总控另开审校队列并完成来源终核。
3. 总控应统一处理历史文档中的旧建议：将 L03/L04/L05/L10 的 `math_review` / `browser_review` 队列建议标注为已被 2026-05-20 来源边界闸门覆盖，或在下一次总控状态文档中明确“当前冻结”。
4. 继续冻结 8.3 相关资源候选；纸质教材或已登录 dolearning / 上海数字教育平台完成终核前，不恢复 `L06` 至 `L09` 的暂缓资源生产或 scaffold。

## 验证记录

已运行：

```bash
npm run validate:content
```

结果：

```text
Content validation passed: 70 lessons, 14 applet(s), 4 Manim clip(s), 7 diagnosis package(s).
```

## 未改动确认

- 未改动 `content/curriculum/index.yaml`。
- 未改动 `content/production/resource-backlog.json`。
- 未改动 `apps/web/src/data/workspace-data.json`。
- 未修改任何资源状态字段。
- 未新增、未修复、未生成任何 Applet / Diagnosis / Manim 资源。
