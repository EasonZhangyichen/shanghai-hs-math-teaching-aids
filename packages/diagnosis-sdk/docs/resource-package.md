# Diagnosis 资源包规范

## 推荐目录

```text
content/diagnosis/<resource-id>/
  metadata.yaml
  README.md
  item-bank.yaml
  scoring-rubric.md
  teacher-notes.md
  review.md
```

## 资源 ID

Diagnosis 使用 `D` 编号：

```text
SH-HS-MATH-HJ-B2-C07-L02-D01
```

其中 `D01` 表示该课时的第 1 个诊断资源。

## 核心定位

Diagnosis 资源包必须回答：

- 诊断哪些数学理解问题。
- 每个错因标签如何定义。
- 学生作答后如何给出反馈。
- 教师如何依据错因统计决定回讲路径。

## 文件说明

| 文件 | 作用 |
| --- | --- |
| `metadata.yaml` | 资源身份、课时归属、诊断设计、错因标签、平台卡片状态。 |
| `README.md` | 面向教研和开发的资源说明。 |
| `item-bank.yaml` | 题目、选项、参考答案、错因标签映射。 |
| `scoring-rubric.md` | 评分规则、掌握阈值、部分得分和订正规则。 |
| `teacher-notes.md` | 教师使用建议、讲评路径和补救资源建议。 |
| `review.md` | 数学审校、教学审校、题目质量和版权合规记录。 |

## 平台状态

`platform_card.availability` 首期支持：

- `metadata_ready`：只有 metadata 和设计说明，平台显示占位摘要。
- `item_bank_ready`：题组和评分规则已可审阅，平台可显示题组摘要。
- `interactive_ready`：后续诊断播放器接入后使用。

