# 资源工厂工作流

更新时间：2026-05-01

## 为什么需要它

高中数学可做的数字化资源数量很大，不能依赖一个 Codex 对话长期记住全部上下文。本项目后续采用“资源工厂”方式推进：课程图谱是事实源，自动脚本把每个 `digital_entry_points` 转成可分派的资源工作单元，再由不同对话按单个资源包推进。

这不是完全无人审核的自动生成系统。数学内容、课堂节奏、错因设计和版权边界仍必须人工复核。自动化负责拆任务、保持格式、发现缺口、生成提示词和做校验。

## 数据流

```text
content/curriculum/index.yaml
  -> npm run generate:backlog
  -> content/production/resource-backlog.json
  -> 选择一个 backlog item
  -> 开新对话/切对应 track 分支
  -> 创建或复核资源包
  -> npm run verify
  -> 合并回 develop
```

## backlog 做什么

`content/production/resource-backlog.json` 会自动列出：

- 资源 ID、类型、标题、课时、教材位置。
- 资源是 `implemented` 还是 `planned`。
- 已实现资源的 `packagePath` 和 `metadataPath`。
- 资源对应的教学痛点、认知动作和优先级。
- 推荐工作的 `track/*` 分支。
- 可直接复制到新对话里的 `threadPrompt`。

当前首版覆盖必修第二册第 7 章三角函数：15 个资源工作单元，其中 2 个已实现，13 个待创建。

## 分支分派规则

```text
applet      -> track/trig-sample-pack
manim_clip  -> track/manim-pipeline
diagnosis   -> track/review-system
platform    -> track/platform-shell
schema/sdk   -> track/applet-sdk 或对应 SDK 分支
curriculum   -> track/curriculum-map
```

若一个资源需要同时改平台和内容，先在内容分支完成资源包，再由平台分支接入展示。

## 新对话怎么用

1. 在总控对话查看 `content/production/resource-backlog.json`。
2. 选择一个 `status: "planned"` 或需要复核的 `implemented` item。
3. 复制该 item 的 `threadPrompt` 到新对话。
4. 新对话只处理这个资源或这一个审核动作。
5. 完成后运行：

```bash
npm run generate:backlog
npm run verify
```

6. 提交并把分支合并回 `develop`。

## 自动化边界

可以自动化：

- 从课程图谱生成资源 backlog。
- 判断资源包是否已落地。
- 检查 metadata、文件存在性、资源 ID、课时归属。
- 给每个资源生成启动提示词。
- 随着资源包增加自动更新平台数据和 backlog 统计。

需要人工或教师复核：

- 教材目录和课时划分是否与沪教版纸质教材一致。
- 数学表达是否严谨。
- 教学顺序是否适合课堂。
- 交互是否真的解决痛点。
- 诊断题是否能定位错因。
- 是否存在版权风险。

## 当前阶段判断

我们已经跑通了“样板 Applet + Manim + 平台预览 + 校验闸门”。从 2026-05-01 起，项目进入资源工厂雏形阶段：后续不再靠一次次人工列计划，而是从 backlog 中取单个工作单元，持续填充平台资源库。
