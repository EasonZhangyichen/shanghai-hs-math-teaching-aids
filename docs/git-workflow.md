# Git 工作流

## 分支角色

```text
main                         稳定可展示版本
develop                      日常集成分支
release/v0.1-trig-mvp        首个三角函数 MVP 发布分支

track/curriculum-map         沪教版课程图谱与知识点数据
track/trig-sample-pack       正弦函数样板课时包
track/applet-sdk             课件 SDK 与播放器协议
track/manim-pipeline         Manim 渲染、管理、嵌入流程
track/platform-shell         教师端平台壳与资源检索
track/review-system          数学审校、教研审核、版本状态
track/design-system          UI 规范、课堂大屏模式、组件库
```

## 短分支命名

```text
feat/trig-unit-circle-sine
feat/trig-transform-lab
feat/manim-sine-intro
feat/curriculum-b2-ch07
fix/applet-player-resize
docs/adr-content-versioning
```

## 提交规范

```text
docs: add project context anchors
feat(curriculum): add b2 ch07 trig nodes
feat(applet): add unit circle sine prototype
feat(manim): add sine origin scene
chore(repo): configure metadata validation
fix(player): stabilize canvas resizing
```

## 内容版本号

每个资源独立版本化：

```text
SH-HS-MATH-HJ-B2-C07-L01-A01@0.1.0
```

含义：

- `SH`：上海。
- `HS`：高中。
- `MATH`：数学。
- `HJ`：沪教版。
- `B2`：必修第二册。
- `C07`：第 7 章。
- `L01`：第 1 课时。
- `A01`：第 1 个 Applet。

## 资源状态流

```text
draft
-> math_review
-> pedagogy_review
-> classroom_trial
-> stable
-> deprecated
```

## 合并规则

- `main` 只接受来自 `release/*` 或稳定文档更新的合并。
- `develop` 接受功能分支和 track 分支的阶段性合并。
- `track/*` 用于长期主题推进，避免单次 Codex 会话上下文丢失。
- 每个课件资源必须带 metadata、教师脚本、学生任务和审核记录后才能进入 `stable`。

