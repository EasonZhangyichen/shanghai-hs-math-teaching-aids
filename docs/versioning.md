# 版本规则

## 平台版本

平台代码使用语义化版本：

```text
vMAJOR.MINOR.PATCH
```

- `MAJOR`：平台架构或数据模型有不兼容变化。
- `MINOR`：新增资源类型、教师工作流、课时包或主要功能。
- `PATCH`：修复、文案、元数据补充、小体验改进。

## 启动期版本

项目启动期使用：

```text
v0.0.0-bootstrap
```

表示仓库治理、文档骨架、分支策略和内容标准已建立，但尚未交付可运行平台或真实课件。

## 首个 MVP 版本

首个可演示版本建议使用：

```text
v0.1.0-trig-mvp
```

进入该版本前至少需要：

- 必修第二册第 7 章课程图谱可浏览。
- 至少一个可运行 Applet。
- 至少一个可播放 Manim Clip。
- 一个课时页能聚合知识卡、Applet、Manim、教师脚本和学生活动。

## 资源版本

每个 Applet、Manim Clip、教师脚本和学生活动都独立版本化：

```text
SH-HS-MATH-HJ-B2-C07-L01-A01@0.1.0
SH-HS-MATH-HJ-B2-C07-L01-M01@0.1.0
```

资源版本含义：

- `0.1.x`：草稿和样板验证。
- `0.2.x`：数学审校通过，仍在教学设计迭代。
- `0.3.x`：教研审核通过，可小范围课堂试用。
- `1.0.0`：课堂试用稳定，可进入正式资源库。

## 资源状态

```text
draft -> math_review -> pedagogy_review -> classroom_trial -> stable -> deprecated
```

状态解释：

- `draft`：草稿，不保证数学、教学或工程质量。
- `math_review`：等待或正在进行数学审校。
- `pedagogy_review`：数学无明显问题，等待教学设计审核。
- `classroom_trial`：可进入课堂试用，需要记录教师反馈。
- `stable`：可作为平台推荐资源。
- `deprecated`：保留历史，但不再推荐使用。

## Git tag 规则

```text
v0.0.0-bootstrap
v0.1.0-trig-mvp
v0.1.1-trig-mvp-fixes
```

tag 必须对应一个可说明状态的提交，并在 `CHANGELOG.md` 中记录。

