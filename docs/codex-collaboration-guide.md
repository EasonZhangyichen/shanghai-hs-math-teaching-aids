# Codex 多线程与 Git 协作指南

## 目标

本项目会长期推进，且会被 Codex 上下文窗口限制影响。解决方法不是把所有信息塞进一个对话，而是把项目记忆沉淀在 Git 和文档中，让任何新对话都能快速恢复上下文。

## 基本原则

1. Git 是项目真实状态，Codex 对话只是工作窗口。
2. 每次新对话先读项目锚点文件，再动手。
3. 一个工作主题对应一个分支，避免不同任务互相污染。
4. 同一时间不要让多个对话在同一个工作树里改同一个分支。
5. 每次完成一小块都提交，提交信息要能看懂。
6. 普通单分支任务结束时更新 `docs/01-current-state.md` 和 `docs/02-next-actions.md`；并行章节来源核对分支只提交来源记录和事实源，状态文档由总控批量合并时统一更新。
7. 资源类任务优先从 `content/production/resource-backlog.json` 选择单个 item，不要让一个对话同时生产一批完整资源。
8. 章节级并行必须遵守 `docs/parallel-chapter-factory.md`：先来源核对和必要性筛选，再由总控合并，最后才进入 scaffold 或单资源精修。
9. 总控对话不直接承接具体资源修复、功能新增、数学审校或浏览器审核。总控只负责规则固化、任务拆分、分支核对、集成验证、合并推送和状态裁决；具体修复和审核必须开独立 `codex/*` 工作对话完成。
10. 公式显示质量是内容质量的一部分。所有工作对话必须遵守 `docs/content-standards.md` 的“数学公式呈现标准”，课堂可见区域不得出现 `theta`、`pi/2`、横向纯文本分式等不符合数学书写习惯的表达。

## 推荐对话类型

### 1. 总控对话

用途：

- 决定项目路线。
- 拆解任务优先级。
- 看 `docs/02-next-actions.md` 选择下一步。
- 指导你不熟悉的 Git / GitHub 操作。
- 汇总各分支进度。
- 编写治理规则、质量闸门、分派提示词。
- 核对工作对话的 commit、改动范围、验证结果，并决定是否合并。

建议分支：

- 默认停留在 `develop`。
- 总控对话一般不做大量代码修改，也不直接修资源包或平台功能。
- 如果要修改项目治理文档，可在独立 `codex/docs-*` 短分支完成后合回 `develop`；特别小的治理文档修订也可由总控直接提交。
- 一旦任务涉及资源源码、平台交互、新功能、数学语言修复、浏览器复核或状态建议，必须拆成新工作对话。

### 2. 课程图谱对话

用途：

- 梳理沪教版教材目录。
- 建立册别、章节、课时、知识点 YAML。
- 标注先修知识、后续知识、教学痛点和资源建议。

建议分支：

```bash
git switch track/curriculum-map
```

### 3. 三角函数样板包对话

用途：

- 设计必修第二册第 7 章样板资源。
- 写 Applet 脚本、教师脚本、学生任务、诊断任务。
- 逐步实现单位圆到正弦曲线等资源。

建议分支：

```bash
git switch track/trig-sample-pack
```

### 4. Applet SDK 对话

用途：

- 定义课件 metadata。
- 定义 Applet 统一事件、参数、嵌入协议。
- 实现播放器与 Applet 的通信约定。

建议分支：

```bash
git switch track/applet-sdk
```

### 5. Manim 流水线对话

用途：

- 设计 Manim 目录结构。
- 创建 Manim 场景模板。
- 处理渲染、导出、嵌入平台的流程。

建议分支：

```bash
git switch track/manim-pipeline
```

### 6. 平台壳对话

用途：

- 搭建教师端 Web 平台。
- 搭建课件播放器。
- 从课程图谱读取数据并展示课时页。

建议分支：

```bash
git switch track/platform-shell
```

### 7. 资源工厂对话

用途：

- 从课程图谱生成资源生产 backlog。
- 根据 backlog 选择下一个资源工作单元。
- 给新对话分派单个 Applet、Manim 或 Diagnosis 任务。
- 复盘资源生产进度，避免上下文窗口里堆积全高中内容。

建议分支：

```bash
git switch develop
```

资源工厂本身通常是总控任务；真正创建课件时，再按 backlog item 的 `recommendedTrack` 切到对应 `track/*` 分支。

## 一个分支能否开多个对话

可以，但要遵守规则：

- 可以：多个对话先后接力同一个分支。
- 不建议：多个对话同时改同一个分支。
- 如果必须并行：用不同分支，最好用不同 git worktree。

安全模式：

```text
对话 A 在 track/curriculum-map 工作并提交
-> 对话 B 再切到 track/curriculum-map 读取最新提交继续
```

风险模式：

```text
对话 A 和对话 B 同时在 track/curriculum-map 改同一批 YAML
-> 容易互相覆盖、产生冲突、丢上下文
```

## 多个对话如何并行

如果只是一个本地工作目录，建议同时只让一个 Codex 对话写文件。

如果需要真正并行，可以用 Git worktree，为每个章节或主题创建独立目录：

```bash
git worktree add ../数学教育教师云平台-b2-c06 -b codex/curriculum-b2-c06-source-audit develop
git worktree add ../数学教育教师云平台-b2-c09 -b codex/curriculum-b2-c09-source-audit develop
git worktree add ../数学教育教师云平台-b1-functions -b codex/curriculum-b1-functions-source-audit develop
```

这样每个对话进入不同目录，彼此不会踩文件。

并行章节的推荐上限是每轮 3 到 5 个。每个章节先做来源核对、课程图谱和数字化必要性筛选；不要让多个章节同时进入完整资源制作。并行章节分支避免提交 `content/production/resource-backlog.json`、`apps/web/src/data/workspace-data.json`、全局测试计数和总控状态文档；总控对话负责 review、统一再生、`npm run verify`、合并和同步长期分支。

## 新对话启动提示词

每次开新 Codex 对话，可以直接发：

```text
请先读取以下文件，恢复项目上下文：
docs/00-project-brief.md
docs/01-current-state.md
docs/02-next-actions.md
docs/git-workflow.md
docs/content-standards.md
docs/codex-collaboration-guide.md
docs/resource-factory-workflow.md
docs/parallel-chapter-factory.md
docs/thread-starter-prompts.md
content/curriculum/index.yaml
content/production/resource-backlog.json

然后运行 git status --short 和 git branch --show-current，告诉我当前状态。
不要先写代码，先确认应该在哪个分支工作。
```

如果你要从资源工厂选择下一个任务，可以发：

```text
这次作为资源工厂总控。请读取项目锚点文件和 content/production/resource-backlog.json，检查工作区是否干净，然后帮我选择下一个最值得推进的 backlog item。不要先写代码，先说明推荐资源、原因、应该在哪个分支做，以及可以复制给新对话的提示词。
```

如果你已经选定 backlog item，可以直接复制该 item 的 `threadPrompt` 到新对话。

如果你发现某类问题需要跨多个资源修复，例如数学公式显示、触控热区、iframe 首屏、视频播放或题组节奏，不要在总控对话中直接修。总控应先写清允许范围、禁止范围、验证命令和回报格式，再让独立工作对话处理单个资源或小批量同类资源。

如果你已经知道要做课程图谱，可以发：

```text
这次只做课程图谱。请切到 track/curriculum-map，读取项目锚点文件，检查工作区是否干净，然后继续完善必修第二册第 7 章三角函数知识图谱。完成后更新 docs/01-current-state.md 和 docs/02-next-actions.md，并提交。
```

如果你已经知道要做三角函数样板包，可以发：

```text
这次只做三角函数样板包。请切到 track/trig-sample-pack，读取项目锚点文件，检查工作区是否干净，然后设计/实现下一个三角函数资源。完成后更新状态文档并提交。
```

## 日常工作流程

```text
1. 总控对话决定下一步任务
2. 切到对应 track 分支
3. 读取项目锚点文件
4. 如果是资源任务，读取 content/production/resource-backlog.json 并锁定一个 item
5. 检查 git status
6. 做一个小任务
7. 运行 npm run generate:backlog 和 npm run verify
8. 更新状态文档
9. commit
10. 必要时合并回 develop
11. 阶段稳定后从 develop 合并到 main 并打 tag
```

## 你只需要记住的 Git 命令

查看当前状态：

```bash
git status --short
```

查看当前分支：

```bash
git branch --show-current
```

切换分支：

```bash
git switch develop
git switch track/curriculum-map
git switch track/trig-sample-pack
```

查看最近提交：

```bash
git log --oneline --decorate --graph --max-count=10
```

提交：

```bash
git add .
git commit -m "docs: update project guidance"
```

查看分支：

```bash
git branch -vv
```

## GitHub 远程仓库建议

建议在 GitHub 账户 `EasonZhangyichen` 下创建一个空仓库，例如：

```text
shanghai-hs-math-teaching-aids
```

创建时不要勾选 README、license 或 gitignore，因为本地已经有这些基础文件。

创建后，在本地添加远程：

```bash
git remote add origin git@github.com:EasonZhangyichen/shanghai-hs-math-teaching-aids.git
git push -u origin main
git push -u origin develop
git push origin --all
git push origin --tags
```

如果 SSH 没配置，可以改用 HTTPS：

```bash
git remote add origin https://github.com/EasonZhangyichen/shanghai-hs-math-teaching-aids.git
```

## 什么时候合并

track 分支不是永远孤立的。每完成一个小阶段，应合并到 `develop`：

```bash
git switch develop
git merge --no-ff track/curriculum-map
```

当 `develop` 上形成一个稳定版本，再合并到 `main` 并打 tag：

```bash
git switch main
git merge --ff-only develop
git tag -a v0.1.0-trig-mvp -m "First trigonometry MVP"
```

## 不要做的事

- 不要在不清楚当前分支时让 Codex 写文件。
- 不要多个对话同时改同一个分支的同一批文件。
- 不要把未验证的资源标记为 stable。
- 不要直接复制官方教材、PPT、教案或商业平台资源。
- 不要长时间不提交，容易丢上下文。
- 不要在 `main` 上随意做大改动。
