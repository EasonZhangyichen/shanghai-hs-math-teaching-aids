# 内容标准

## 一条总原则

数字化教具必须解决传统板书、静态图片或普通 PPT 难以解决的数学理解问题。不能为了动画而动画，也不能为了交互而交互。

## Applet 适用场景

优先使用 HTML 交互 Applet：

- 参数变化：函数图像、圆锥曲线、统计分布。
- 拖拽探索：单位圆、向量、复平面、几何关系。
- 多表征联动：解析式、图像、表格、语言描述同步。
- 模拟实验：概率、抽样、频率稳定、回归残差。
- 学生操作诊断：错误选择、区间判断、参数识别。

## Manim 适用场景

优先使用 Manim 动画：

- 连续推演：割线逼近切线、函数图像生成过程。
- 证明结构：基本不等式、数列求和、数学归纳法。
- 概念导入：单位圆如何生成正弦波、离心率如何改变曲线。
- 公式变形：三角恒等变换、导数法则、递推展开。
- 课堂开场：30 到 90 秒的概念叙事动画。

## 组合策略

```text
Manim 建立直觉
-> Applet 操作验证
-> Student Task 表达结论
-> Diagnosis 暴露误区
-> Teacher Script 回到课堂讲解
```

## Applet 设计规则

- 一个 Applet 只承载一个主要认知动作：比较、分解、变换、逼近、累积、缩放、投影或模拟。
- 初始界面只显示最小可理解对象，公式和结论应分步揭示。
- 所有表征必须联动，不允许只并排摆放图像、表格和公式。
- 颜色只用于数学含义，不作为装饰。
- 拖拽方向、滑块方向应和数学结构一致。
- 反馈必须解释规律，而不只是显示对错。
- 教师必须能控制节奏：暂停、重置、显示/隐藏标注、显示/隐藏结论。

## 每个 Applet 必备文件

```text
content/applets/<resource-id>/
  metadata.yaml
  README.md
  teacher-script.md
  student-task.md
  review.md
  src/
```

## 每个 Manim Clip 必备文件

```text
content/manim/<resource-id>/
  metadata.yaml
  README.md
  storyboard.md
  scene.py
  review.md
```

## 每个 Diagnosis 必备文件

```text
content/diagnosis/<resource-id>/
  metadata.yaml
  README.md
  item-bank.yaml
  scoring-rubric.md
  teacher-notes.md
  review.md
```

## 自动校验

新增或修改课程图谱、Applet 资源包、Manim 资源包、Diagnosis 资源包后必须运行：

```bash
npm run validate:content
```

该命令会检查：

- Applet / Manim / Diagnosis metadata 是否符合对应 JSON Schema。
- 资源目录名是否与 `metadata.id` 一致。
- `metadata.curriculum.lesson_id` 是否存在于 `content/curriculum/index.yaml`。
- 已落地资源是否能与课程图谱中的 `digital_entry_points[].proposed_resource_id` 对齐。
- metadata 中声明的 README、脚本、任务、分镜、场景脚本、题组、评分规则、教师说明、审核记录等文件是否真实存在。
- Manim `video_ready` 资源是否存在 `dist/final/` 下的 `mp4`、`webm` 和 poster。

完整项目验证使用：

```bash
npm run verify
```

## 审核维度

- 数学准确性：定义域、边界条件、特殊情况、符号全部正确。
- 教学必要性：确实解决某个课时痛点。
- 交互有效性：学生操作会产生数学意义。
- 认知负荷：页面不过载，信息分步出现。
- 课堂可用性：大屏清晰，触控友好，低配置设备可运行。
- 版权合规：不复制教材正文、官方 PPT、教案或商业平台资源。
