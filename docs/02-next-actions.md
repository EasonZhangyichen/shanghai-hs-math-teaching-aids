# 下一步任务

更新时间：2026-05-08

## P0：项目治理

- [x] 初始化本地 Git 仓库。
- [x] 创建长期分支：`develop`、`track/curriculum-map`、`track/trig-sample-pack`、`track/applet-sdk`、`track/manim-pipeline`、`track/platform-shell`、`track/review-system`、`track/design-system`。
- [x] 建立 PR 模板和审核清单。
- [x] 建立内容版本规则与发布 tag 规则。
- [x] 建立 Codex 多线程与 Git 协作指南。
- [x] 建立分支对话启动提示词。
- [x] 建立资源工厂工作流和 backlog 自动生成器。
- [x] 建立并行章节工厂规则，明确多章节并行时的来源核对、必要性筛选、分支/worktree 和总控验收规则。
- [x] 配置本仓库 Git 提交身份。
- [x] 创建 GitHub 远程仓库并推送初始分支与标签。
- [ ] 配置 GitHub 分支保护规则。

## P1：课程图谱

- [ ] 人工核验沪教版高中数学 7 册完整目录。
- [ ] 将目录拆成册别、章节、课时、知识点。
- [x] 为必修第二册第 7 章建立首批知识节点。
- [x] 标注必修第二册第 7 章的先修知识、后续知识、教学痛点、数字化形式。
- [ ] 人工终核必修第二册第 7 章的课时划分、课时数和标题表述。
- [x] 为必修第二册第 8 章“平面向量”建立首批课时级知识节点。
- [x] 标注必修第二册第 8 章的先修知识、后续知识、教学痛点、数字化形式。
- [x] 记录必修第二册第 8 章 dolearning.net 来源核对结果，明确 8.3 三课时分组与当前四小节拆分的待确认差异。
- [x] 对必修第二册第 8 章的 18 个 planned resource 做数字化必要性筛选，标出强烈保留、收窄、降级和暂缓条目。
- [x] 根据数字化必要性筛选修订第 8 章 `digital_entry_points`，让 production backlog 只保留 10 个必要性明确或已收窄的候选资源。
- [ ] 人工终核必修第二册第 8 章的课时划分、课时数和标题表述。
- [ ] 用纸质教材或已登录 dolearning 左侧目录专项确认必修第二册第 8 章 8.3“向量的坐标表示”应按三课时还是四小节进入课程图谱。
- [ ] 在 8.3 目录终核后，根据 `docs/source-audits/b2-c08-digital-necessity-review.md` 决定是否恢复或重排暂缓的 8.3 资源候选。
- [x] 完成必修第一册函数主线首轮来源核对，新增 `docs/source-audits/b1-functions-source-audit.md`，确认第 3、4、5 章结构来源和 dolearning/上海数字教学平台无法直接确认的限制。
- [x] 只将必修第一册第 5 章“函数的概念、性质及应用”补为 `draft` 入口节点，并保留 4 个数字化必要性明确的 planned 候选；第 3、4 章暂不展开进 YAML。
- [ ] 用纸质教材、教师用书或已登录 dolearning/上海数字教学系统终核必修第一册第 5 章课时数、课时边界和星号 `*5.4 反函数` 的实际教学处理方式。
- [ ] 为必修第一册第 3 章“幂、指数与对数”开启独立来源核对任务，只判断运算先修和少量诊断必要性，不直接制作资源。
- [ ] 为必修第一册第 4 章“幂函数、指数函数与对数函数”开启独立来源核对和数字化必要性筛选任务，重点核对参数变化、图像性质、指数/对数互逆和增长模型。
- [ ] 总控复核必修第一册第 5 章新增的 4 个 planned 候选后，再决定是否小批量 scaffold；未终核前不要制作完整资源包。
- [ ] 展开第 7 章前置章节和第 9 章复数等承接节点。

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
- [x] 设计并创建 `SH-HS-MATH-HJ-B2-C07-L03-A01`“单位圆到余弦曲线”Applet 资源包。
- [x] 设计并创建 `SH-HS-MATH-HJ-B2-C07-L03-A02`“正弦与余弦相位对照”Applet 资源包。
- [x] 设计并创建 `SH-HS-MATH-HJ-B2-C07-L04-A01`“正弦余弦性质对照板”Applet 资源包。
- [x] 创建 `SH-HS-MATH-HJ-B2-C07-L04-D01`“余弦性质误区诊断”Diagnosis 资源包，包含 metadata、题组、评分规则、教师说明和审核记录。
- [x] 设计并创建 `SH-HS-MATH-HJ-B2-C07-L05-A01`“三角函数参数变化实验室”Applet 资源包。
- [x] 设计第二个 Manim 场景脚本：`SH-HS-MATH-HJ-B2-C07-L05-M01`“图像变换顺序解释”。
- [x] 创建 `SH-HS-MATH-HJ-B2-C07-L05-D01`“参数识别诊断任务”Diagnosis 资源包，包含 metadata、题组、评分规则、教师说明和审核记录。
- [x] 设计并创建 `SH-HS-MATH-HJ-B2-C07-L06-A01`“正切函数图像生成器”Applet 资源包。
- [x] 创建并渲染 `SH-HS-MATH-HJ-B2-C07-L06-M01`“为什么正切图像有渐近线”Manim 资源包。
- [x] 设计并创建 `SH-HS-MATH-HJ-B2-C07-L07-A01`“正切性质分段观察”Applet 资源包。
- [x] 创建 `SH-HS-MATH-HJ-B2-C07-L07-D01`“正切函数性质诊断”Diagnosis 资源包，包含 metadata、题组、评分规则、教师说明和审核记录。
- [x] 渲染并复核 `SH-HS-MATH-HJ-B2-C07-L01-M01` 的 `mp4`、`webm` 和 poster。
- [x] 创建八个可运行 HTML Applet 原型。
- [x] 渲染并复核 `SH-HS-MATH-HJ-B2-C07-L05-M01` 的 `mp4`、`webm` 和 poster。
- [x] 统一平台和课件中的 π 分数、θ 等数学符号展示，并修正正切相关课件在平台播放器首屏中的尺寸问题。
- [ ] 对“单位圆到正弦曲线”HTML Applet 做数学边界复核和课堂节奏试读。
- [ ] 对“正弦函数性质探究”HTML Applet 做数学边界复核、课堂节奏试读和浏览器交互验证。
- [ ] 对“单位圆到余弦曲线”HTML Applet 做数学边界复核、课堂节奏试读和浏览器交互验证。
- [ ] 对“正弦与余弦相位对照”HTML Applet 做数学边界复核、课堂节奏试读和浏览器交互验证。
- [ ] 对“正弦余弦性质对照板”HTML Applet 做数学边界复核、课堂节奏试读和浏览器交互验证。
- [ ] 对“三角函数参数变化实验室”HTML Applet 做数学边界复核、课堂节奏试读和浏览器交互验证。
- [ ] 对“正切函数图像生成器”HTML Applet 做数学边界复核、课堂节奏试读和浏览器交互验证。
- [ ] 对“正切性质分段观察”HTML Applet 做数学边界复核、课堂节奏试读和浏览器交互验证。
- [ ] 对 `SH-HS-MATH-HJ-B2-C07-L05-M01`“图像变换顺序解释”做数学审校、分镜节奏复核和课堂播放口径确认。
- [ ] 对 `SH-HS-MATH-HJ-B2-C07-L06-M01`“为什么正切图像有渐近线”做数学审校、分镜节奏复核和课堂播放口径确认。
- [ ] 对 `SH-HS-MATH-HJ-B2-C07-L02-D01`“正弦函数性质诊断”做数学审校、题目试做和课堂节奏试读。
- [ ] 对 `SH-HS-MATH-HJ-B2-C07-L04-D01`“余弦性质误区诊断”做数学审校、题目试做和课堂节奏试读。
- [ ] 对 `SH-HS-MATH-HJ-B2-C07-L05-D01`“参数识别诊断任务”做数学审校、题目试做和课堂节奏试读。
- [ ] 对 `SH-HS-MATH-HJ-B2-C07-L07-D01`“正切函数性质诊断”做数学审校、题目试做和课堂节奏试读。
- [ ] 从 `content/production/resource-backlog.json` 中选择下一个资源 item，优先推进已实现资源的数学审校、课堂试读或平台接入。

## P4：平台雏形

- [x] 搭建教师端平台壳。
- [ ] 搭建课件播放器。
- [x] 从 `content/curriculum/index.yaml` 读取课程树。
- [x] 以课时页聚合 Applet、Manim、脚本和任务。
- [x] 将样板 Applet 接入教师工作台 iframe，占位预览升级为可运行课件入口。
- [x] 读取 `content/manim/*/metadata.yaml`，将 Manim `metadata_ready` 和 `video_ready` 状态接入平台资源卡。
- [ ] 将平台内 iframe 预览沉淀为独立 `apps/player`，补齐播放器级控制、错误提示和状态记录。

## P5：资源工厂

- [x] 生成 `content/production/resource-backlog.json`，当前覆盖 29 个资源工作单元：25 个已实现，4 个必修第一册第 5 章函数主线候选仍为 planned，未 scaffold。
- [x] 为每个 backlog item 自动生成推荐分支、下一步动作和新对话 `threadPrompt`。
- [x] 将 `npm run generate:backlog` 接入 `npm run verify`。
- [x] 为 Diagnosis planned item 增加首版资源包 scaffold 命令，支持 dry-run、按数量或 ID 生成并避免覆盖已有资源包。
- [x] 将资源包 scaffold 扩展到 Applet、Manim Clip 与 Diagnosis，并按 schema 生成对应必备文件。
- [x] 先 dry-run 并生成必修第二册第 8 章首批 3 个 Applet 骨架：`SH-HS-MATH-HJ-B2-C08-L01-A01`、`SH-HS-MATH-HJ-B2-C08-L02-A01`、`SH-HS-MATH-HJ-B2-C08-L03-A01`；本批未处理 8.3 暂缓项。
- [x] 先 dry-run 并生成必修第二册第 8 章第二批 3 个 Applet 骨架：`SH-HS-MATH-HJ-B2-C08-L04-A01`、`SH-HS-MATH-HJ-B2-C08-L05-A01`、`SH-HS-MATH-HJ-B2-C08-L10-A01`；本批未处理 8.3 暂缓项。
- [x] 先 dry-run 并生成必修第二册第 8 章 3 个 Diagnosis 骨架：`SH-HS-MATH-HJ-B2-C08-L02-D01`、`SH-HS-MATH-HJ-B2-C08-L05-D01`、`SH-HS-MATH-HJ-B2-C08-L10-D01`；本批未深入编写完整题组，未处理 8.3 暂缓项。
- [x] 先 dry-run 并生成必修第二册第 8 章剩余 Manim 骨架：`SH-HS-MATH-HJ-B2-C08-L04-M01`；本批未深入编写完整动画，未渲染视频，未处理 8.3 暂缓项。
- [ ] 对 `SH-HS-MATH-HJ-B2-C08-L04-M01` 开启单资源精修对话，补齐真实 Manim 场景、数学符号、动画节奏、预览渲染和审校记录。
- [ ] 对 `SH-HS-MATH-HJ-B2-C08-L01-A01`、`SH-HS-MATH-HJ-B2-C08-L02-A01`、`SH-HS-MATH-HJ-B2-C08-L03-A01`、`SH-HS-MATH-HJ-B2-C08-L04-A01`、`SH-HS-MATH-HJ-B2-C08-L05-A01`、`SH-HS-MATH-HJ-B2-C08-L10-A01` 分别开启单资源精修对话，补齐真实数学模型、交互状态和课堂脚本。
- [ ] 对 `SH-HS-MATH-HJ-B2-C08-L02-D01`、`SH-HS-MATH-HJ-B2-C08-L05-D01`、`SH-HS-MATH-HJ-B2-C08-L10-D01` 分别开启单资源精修对话，补齐真实题组、错因标签、评分反馈和教师说明。
- [ ] 在必修第一册第 5 章来源终核后，再按总控决定处理 `SH-HS-MATH-HJ-B1-C05-L02-A01`、`SH-HS-MATH-HJ-B1-C05-L03-D01`、`SH-HS-MATH-HJ-B1-C05-L04-A01`、`SH-HS-MATH-HJ-B1-C05-L08-A01`；当前不得直接 scaffold 或制作完整资源包。
- [ ] 为 backlog item 增加更细的审核状态和课堂试用状态聚合。
- [ ] 增加 backlog 批量生产计划导出能力：按章节、类型、优先级和数量输出同一分支上的资源清单与 threadPrompt。
- [ ] 为已实现资源增加审校工单维度，将 `math_review`、`classroom_trial`、`browser_review` 与资源状态分开聚合。
- [ ] 当沪教版全册目录完成后，将 backlog 扩展到全高中课程图谱。

## P6：并行章节工厂

- [x] 建立 `docs/parallel-chapter-factory.md`。
- [ ] 由总控选择第一轮 3 到 5 个并行章节，只分派来源核对、课程图谱和数字化必要性筛选。
- [ ] 为第一轮并行章节创建独立短分支或 git worktree，避免多个对话同时写同一分支。
- [ ] 每个章节完成后由总控运行 `npm run generate:backlog` 和 `npm run verify`，再决定是否合并。
- [ ] 第一轮并行章节通过验收后，再按资源类型小批量 scaffold；不要直接进入完整资源制作。
