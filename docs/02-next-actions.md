# 下一步任务

更新时间：2026-05-01

## P0：项目治理

- [x] 初始化本地 Git 仓库。
- [x] 创建长期分支：`develop`、`track/curriculum-map`、`track/trig-sample-pack`、`track/applet-sdk`、`track/manim-pipeline`、`track/platform-shell`、`track/review-system`、`track/design-system`。
- [x] 建立 PR 模板和审核清单。
- [x] 建立内容版本规则与发布 tag 规则。
- [x] 建立 Codex 多线程与 Git 协作指南。
- [x] 建立分支对话启动提示词。
- [x] 建立资源工厂工作流和 backlog 自动生成器。
- [x] 配置本仓库 Git 提交身份。
- [x] 创建 GitHub 远程仓库并推送初始分支与标签。
- [ ] 配置 GitHub 分支保护规则。

## P1：课程图谱

- [ ] 人工核验沪教版高中数学 7 册完整目录。
- [ ] 将目录拆成册别、章节、课时、知识点。
- [x] 为必修第二册第 7 章建立首批知识节点。
- [x] 标注必修第二册第 7 章的先修知识、后续知识、教学痛点、数字化形式。
- [ ] 人工终核必修第二册第 7 章的课时划分、课时数和标题表述。
- [ ] 展开第 7 章前置章节、第 8 章平面向量和第 9 章复数的承接节点。

## P2：课件规范

- [x] 定义 Applet metadata schema。
- [x] 定义 Manim clip metadata schema 草稿。
- [x] 定义 Applet 资源包目录结构。
- [x] 定义 Manim 资源包目录结构与导出接入说明草稿。
- [x] 定义 Applet 状态字段、事件协议和播放器嵌入契约。
- [ ] 定义课时页聚合资源包目录结构。
- [ ] 定义 Manim 与 Diagnosis 的数学审校、教研审核字段。
- [x] 将 Applet metadata schema 接入校验脚本。
- [x] 将 Manim metadata schema 接入校验脚本。
- [x] 定义 Diagnosis metadata schema 并接入校验脚本。
- [x] 从课程图谱自动生成资源生产 backlog。

## P3：三角函数样板包

- [x] 设计“单位圆到正弦曲线”交互脚本。
- [x] 创建 `SH-HS-MATH-HJ-B2-C07-L01-A01` 的 metadata、教师脚本、学生任务和审核草稿。
- [x] 创建 `SH-HS-MATH-HJ-B2-C07-L01-M01` 的 Manim metadata、分镜、场景脚本草稿和审核记录。
- [x] 设计并创建 `SH-HS-MATH-HJ-B2-C07-L02-A01`“正弦函数性质探究”Applet 资源包。
- [x] 创建 `SH-HS-MATH-HJ-B2-C07-L02-D01`“正弦函数性质诊断”Diagnosis 资源包，包含 metadata、题组、评分规则、教师说明和审核记录。
- [x] 设计并创建 `SH-HS-MATH-HJ-B2-C07-L05-A01`“三角函数参数变化实验室”Applet 资源包。
- [x] 设计第二个 Manim 场景脚本：`SH-HS-MATH-HJ-B2-C07-L05-M01`“图像变换顺序解释”。
- [x] 创建 `SH-HS-MATH-HJ-B2-C07-L05-D01`“参数识别诊断任务”Diagnosis 资源包，包含 metadata、题组、评分规则、教师说明和审核记录。
- [x] 渲染并复核 `SH-HS-MATH-HJ-B2-C07-L01-M01` 的 `mp4`、`webm` 和 poster。
- [x] 创建三个可运行 HTML Applet 原型。
- [ ] 渲染并复核 `SH-HS-MATH-HJ-B2-C07-L05-M01` 的 `mp4`、`webm` 和 poster。
- [ ] 对“单位圆到正弦曲线”HTML Applet 做数学边界复核和课堂节奏试读。
- [ ] 对“正弦函数性质探究”HTML Applet 做数学边界复核、课堂节奏试读和浏览器交互验证。
- [ ] 对“三角函数参数变化实验室”HTML Applet 做数学边界复核、课堂节奏试读和浏览器交互验证。
- [ ] 对 `SH-HS-MATH-HJ-B2-C07-L05-M01`“图像变换顺序解释”做数学审校、分镜节奏复核和课堂播放口径确认。
- [ ] 对 `SH-HS-MATH-HJ-B2-C07-L02-D01`“正弦函数性质诊断”做数学审校、题目试做和课堂节奏试读。
- [ ] 对 `SH-HS-MATH-HJ-B2-C07-L05-D01`“参数识别诊断任务”做数学审校、题目试做和课堂节奏试读。
- [ ] 从 `content/production/resource-backlog.json` 中选择下一个 MVP item，优先渲染复核 `SH-HS-MATH-HJ-B2-C07-L05-M01` 或推进已实现资源的审校试读。

## P4：平台雏形

- [x] 搭建教师端平台壳。
- [ ] 搭建课件播放器。
- [x] 从 `content/curriculum/index.yaml` 读取课程树。
- [x] 以课时页聚合 Applet、Manim、脚本和任务。
- [x] 将样板 Applet 接入教师工作台 iframe，占位预览升级为可运行课件入口。
- [x] 读取 `content/manim/*/metadata.yaml`，将 Manim `metadata_ready` 和 `video_ready` 状态接入平台资源卡。
- [ ] 将平台内 iframe 预览沉淀为独立 `apps/player`，补齐播放器级控制、错误提示和状态记录。

## P5：资源工厂

- [x] 生成 `content/production/resource-backlog.json`，覆盖必修第二册第 7 章 15 个资源工作单元；当前 7 个已实现、8 个待创建。
- [x] 为每个 backlog item 自动生成推荐分支、下一步动作和新对话 `threadPrompt`。
- [x] 将 `npm run generate:backlog` 接入 `npm run verify`。
- [x] 为 Diagnosis planned item 增加首版资源包 scaffold 命令，支持 dry-run、按数量或 ID 生成并避免覆盖已有资源包。
- [ ] 为 backlog item 增加更细的审核状态和课堂试用状态聚合。
- [ ] 将资源包 scaffold 扩展到 Applet 与 Manim，并按 schema 生成对应必备文件。
- [ ] 当沪教版全册目录完成后，将 backlog 扩展到全高中课程图谱。
