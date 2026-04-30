# 沪教版高中数学数字教具云平台

面向上海高中数学教师的课时级数字教具平台。项目采用“沪教版课程知识图谱 + HTML 交互 Applet + Manim 数学动画 + 教师课堂工作流 + 审核版本体系”的路线。

## 当前方向

- 严格围绕沪教版高中数学册别、章节、课时和知识点组织资源。
- 每个课时沉淀为资源包，而不是零散课件文件。
- 交互课件优先解决可拖拽、可调参、可探索的知识点。
- Manim 动画用于解释连续推演、证明过程、概念生成和课堂导入。
- 通过 Git、元数据、审核流和版本号保证内容长期可控。

## 重要文档

- [项目总览](docs/00-project-brief.md)
- [当前状态](docs/01-current-state.md)
- [下一步任务](docs/02-next-actions.md)
- [Git 工作流](docs/git-workflow.md)
- [内容标准](docs/content-standards.md)
- [Codex 协作指南](docs/codex-collaboration-guide.md)
- [分支对话启动提示词](docs/thread-starter-prompts.md)
- [架构决策记录](docs/adr/0001-route-2-platform-architecture.md)

## 本地运行教师端平台壳

```bash
npm install
npm run dev
```

常用验证命令：

```bash
npm test
npm run build
npm run verify
```

`npm run generate:content` 会从 `content/curriculum/index.yaml` 和 `content/applets/*/metadata.yaml` 生成 `apps/web/src/data/workspace-data.json`，供教师工作台静态读取。

## 初始目录

```text
apps/web                    教师端平台
apps/player                 独立课件播放器
packages/applet-sdk         统一课件接口、事件、参数、嵌入协议
packages/math-engines       JSXGraph/GGB/Three/D3/Manim 适配层
packages/curriculum-schema  沪教版知识图谱 schema
content/curriculum          册别、章节、课时、知识点数据
content/applets             HTML 交互课件资产
content/manim               Manim 场景源码与导出索引
docs                        产品、教研、架构、计划、决策文档
scripts                     校验、生成目录、导出离线包等工具
```
