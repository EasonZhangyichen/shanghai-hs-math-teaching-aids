# Applet 状态字段

本文件统一三类状态：资源生命周期、实现阶段和运行态状态变量。它们解决的问题不同，不能互相替代。

## 资源生命周期

字段：`status`

| 值 | 含义 | 可进入条件 |
| --- | --- | --- |
| `draft` | 草稿阶段，不保证数学、教学或工程质量。 | 新建资源默认状态。 |
| `math_review` | 等待或正在进行数学审校。 | 可运行入口存在，核心状态和关键数学边界已自检。 |
| `pedagogy_review` | 数学无阻塞问题，等待教学设计审核。 | 数学审校通过，教师脚本和学生活动已同步更新。 |
| `classroom_trial` | 可进入小范围课堂试用。 | 教研审核通过，课堂节奏、投屏和触控风险可控。 |
| `stable` | 可作为平台推荐资源。 | 课堂试用反馈已处理，审核记录完整。 |
| `deprecated` | 保留历史，但不再推荐使用。 | 有替代资源、教材变化或数学/教学设计不再适用。 |

资源状态只能按主链路推进：

```text
draft -> math_review -> pedagogy_review -> classroom_trial -> stable -> deprecated
```

发现阻塞问题时，可以退回到更早状态，但必须在 `review.md` 记录原因。

## 实现阶段

字段：`implementation.phase`

| 值 | 含义 |
| --- | --- |
| `content_spec_only` | 只有内容规格、脚本和 metadata，没有 HTML 实现。 |
| `runnable_prototype` | 已有 `src/index.html`，可运行，但课堂交互和边界仍需验证。 |
| `review_candidate` | 交互主链路已完成，可进入数学审校和教研审核。 |
| `classroom_ready` | 可用于课堂试用，仍可能根据反馈微调。 |
| `archived` | 停止维护，仅保留历史记录。 |

字段：`implementation.html_src_status`

| 值 | 含义 |
| --- | --- |
| `not_started` | 尚未创建 `src/` 或 HTML 入口。 |
| `scaffolded` | 已创建入口和基础文件，但主交互不可用。 |
| `runnable` | 主要交互可运行。 |
| `interaction_verified` | 拖拽、播放、重置、状态保存和关键边界已验证。 |
| `archived` | HTML 实现停止维护。 |

## 审核状态

字段：`compliance.review_status`

| 值 | 含义 |
| --- | --- |
| `self_checked_draft` | 作者完成草稿自检。 |
| `math_review_pending` | 已提交数学审校。 |
| `math_review_passed` | 数学审校通过。 |
| `pedagogy_review_pending` | 已提交教学审校。 |
| `pedagogy_review_passed` | 教学审校通过。 |
| `classroom_trial_ready` | 可进入课堂试用。 |
| `stable_approved` | 审核和试用完成，可稳定推荐。 |
| `deprecated` | 不再推荐使用。 |

`status` 是资源对外生命周期，`compliance.review_status` 是审核记录的细分状态。两者必须相互一致，例如 `status: "stable"` 时，`review_status` 不应停留在 `self_checked_draft`。

## 运行态状态变量

字段：`data_contract.state_variables`

运行态状态变量描述播放器需要保存、恢复、记录或诊断的 Applet 状态。每个变量至少包含：

```yaml
- name: "theta"
  unit: "radian"
  description: "当前角的弧度量。"
```

建议字段：

| 字段 | 含义 |
| --- | --- |
| `name` | 稳定状态键，使用 `snake_case`。 |
| `unit` | 数学或物理单位，例如 `radian`、`unitless`、`pixel`。 |
| `value_type` | `number`、`boolean`、`string`、`point2d`、`array` 或 `object`。 |
| `default` | 播放器初始化时可使用的默认值。 |
| `description` | 教师、审校者和实现者能读懂的状态含义。 |
| `persistence` | `session`、`snapshot` 或 `none`。 |

“单位圆到正弦曲线”样板包中的核心状态为：

- `theta`
- `point_p`
- `sine_value`
- `point_q`
- `trace_visible`

播放器不需要理解这些状态背后的数学计算，但必须能原样保存、恢复并转发给 Applet。
