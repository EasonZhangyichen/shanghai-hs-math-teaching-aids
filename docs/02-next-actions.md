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
- [x] 为必修第二册第 6 章“三角”建立 draft 课程图谱，覆盖 6.1 正弦、余弦、正切、余切，6.2 常用三角公式，6.3 解三角形。
- [x] 记录必修第二册第 6 章来源核对结果，明确纸质教材未提供、dolearning 需登录、上海官方平台无法公开确认，国家精品课目录和公开电子课本/教师资源目录只能作为辅助证据。
- [x] 对必修第二册第 6 章做数字化必要性筛选，只保留任意角/弧度、单位圆三角比、诱导公式几何对称和多解/定义域误区诊断等 5 个 planned 候选。
- [ ] 人工终核必修第二册第 6 章的章标题、节标题、课时划分、课时数和标题表述。
- [ ] 用纸质教材或已登录 dolearning 左侧目录专项确认 `6.1.2 任意角及其度量` 是否拆分角度制/弧度制多课时，6.1 是否按 5 个教材节点组织，6.3 是否只有正弦定理和余弦定理两个教材节点。
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
- [x] 完成必修第二册第 6 章“三角”首轮来源核对、课程图谱 draft 和数字化必要性筛选，记录到 `docs/source-audits/b2-c06-source-audit.md`。
- [x] 在 `content/curriculum/index.yaml` 中新增第 6 章 `SH-HS-MATH-HJ-B2-C06` draft 图谱，并只保留 5 个数字化必要性明确或需再次收窄的候选。
- [ ] 用纸质教材或已登录 dolearning 左侧目录终核必修第二册第 6 章的章标题、节标题、课时边界、课时数和 6.1/6.3 课时拆分。
- [ ] 在第 6 章终核后，决定是否调整第 7 章先修节点、B2-C06 planned resource 和 backlog。
- [x] 完成必修第二册第 9 章“复数”首轮来源核对、课程图谱 draft 和数字化必要性筛选，记录到 `docs/source-audits/b2-c09-source-audit.md`。
- [x] 在 `content/curriculum/index.yaml` 中新增第 9 章 `SH-HS-MATH-HJ-B2-C09` draft 图谱，并只保留 3 个数字化必要性明确的 Applet 候选。
- [ ] 用纸质教材或已登录 dolearning 左侧目录终核必修第二册第 9 章的章标题、节标题、课时边界、课时数和 `*9.4` 选学属性。
- [ ] 专项确认第 9 章 9.2.1-9.2.3、9.3.1-9.3.2、`*9.4.2-*9.4.3` 是教材小节拆分还是平台课时包合并关系。
- [ ] 在第 9 章终核前，不 scaffold `SH-HS-MATH-HJ-B2-C09-L03-A01`、`SH-HS-MATH-HJ-B2-C09-L04-A01`、`SH-HS-MATH-HJ-B2-C09-L07-A01`。
- [x] 完成必修第一册函数主线首轮来源核对，新增 `docs/source-audits/b1-functions-source-audit.md`，确认第 3、4、5 章结构来源和 dolearning/上海数字教学平台无法直接确认的限制。
- [x] 只将必修第一册第 5 章“函数的概念、性质及应用”补为 `draft` 入口节点，并保留 4 个数字化必要性明确的 planned 候选；第 3、4 章暂不展开进 YAML。
- [ ] 用纸质教材、教师用书或已登录 dolearning/上海数字教学系统终核必修第一册第 5 章课时数、课时边界和星号 `*5.4 反函数` 的实际教学处理方式。
- [ ] 为必修第一册第 3 章“幂、指数与对数”开启独立来源核对任务，只判断运算先修和少量诊断必要性，不直接制作资源。
- [ ] 为必修第一册第 4 章“幂函数、指数函数与对数函数”开启独立来源核对和数字化必要性筛选任务，重点核对参数变化、图像性质、指数/对数互逆和增长模型。
- [ ] 总控复核必修第一册第 5 章新增的 4 个 planned 候选后，再决定是否小批量 scaffold；未终核前不要制作完整资源包。
- [x] 完成必修第一册第 1 章“集合与逻辑”来源核对和 draft 图谱入口，本轮不新增数字化候选。
- [x] 完成必修第一册第 2 章“等式与不等式”来源核对、draft 图谱入口和数字化必要性筛选，仅保留 3 个 blocked planned 候选。
- [ ] 用纸质教材或已登录 dolearning/上海数字教学平台终核必修第一册第 1、2 章课时边界、课时数和标题表述。
- [ ] 在第 2 章终核前，不 scaffold `SH-HS-MATH-HJ-B1-C02-L04-A01`、`SH-HS-MATH-HJ-B1-C02-L05-A01`、`SH-HS-MATH-HJ-B1-C02-L08-M01`。

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

- [x] 生成 `content/production/resource-backlog.json`，覆盖必修第一册第 2、4、5 章、必修第二册第 6、7、8、9 章共 44 个资源工作单元；当前 25 个已实现、19 个待创建，其中 B1-C02 3 个、B1-C04 4 个、B1-C05 4 个、第 6 章 5 个、第 9 章 3 个 planned 候选都需等待纸质教材或 dolearning/上海数字教学平台终核后再 scaffold。
- [x] 为每个 backlog item 自动生成推荐分支、下一步动作和新对话 `threadPrompt`。
- [x] 为未终核 planned item 增加 `scaffoldPolicy: blocked_until_source_verified`，自动提示词只允许做来源终核，不允许直接创建资源包。
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
- [ ] 在必修第一册第 4、5 章来源终核后，再按总控决定处理 `SH-HS-MATH-HJ-B1-C04-L02-A01`、`SH-HS-MATH-HJ-B1-C04-L04-A01`、`SH-HS-MATH-HJ-B1-C04-L06-A01`、`SH-HS-MATH-HJ-B1-C04-L06-A02`、`SH-HS-MATH-HJ-B1-C05-L02-A01`、`SH-HS-MATH-HJ-B1-C05-L03-D01`、`SH-HS-MATH-HJ-B1-C05-L04-A01`、`SH-HS-MATH-HJ-B1-C05-L08-A01`；当前不得直接 scaffold 或制作完整资源包。
- [ ] 为 backlog item 增加更细的审核状态和课堂试用状态聚合。
- [ ] 增加 backlog 批量生产计划导出能力：按章节、类型、优先级和数量输出同一分支上的资源清单与 threadPrompt。
- [ ] 为已实现资源增加审校工单维度，将 `math_review`、`classroom_trial`、`browser_review` 与资源状态分开聚合。
- [ ] 当沪教版全册目录完成后，将 backlog 扩展到全高中课程图谱。

## P6：并行章节工厂

- [x] 建立 `docs/parallel-chapter-factory.md`。
- [x] 第一轮并行章节已完成：B1 函数主线、B2-C06 三角前置、B2-C09 复数均已用独立 worktree / 短分支完成来源核对、draft 图谱和数字化必要性筛选。
- [x] 第一轮已由总控合并至 `develop`，统一再生 backlog 和平台数据，并通过 `npm run verify`。
- [x] 第一轮新增 planned 候选均标记为未终核，不进入 scaffold。
- [x] 形成第二轮并行任务单：`docs/parallel-rounds/2026-05-08-round-2.md`。
- [x] 开启第二轮三个独立对话：B1-C03、B1-C04、B2-C07 prerequisite alignment。
- [x] 第二轮完成后由总控只合并事实源，统一再生 generated files 并运行 `npm run verify`。
- [x] 第二轮通过验收后，确认 B1-C03 不进入资源生产，B1-C04 4 个候选进入 blocked planned；不要直接进入完整资源制作。
- [x] 选择第三轮 3 个任务继续做来源核对和数字化必要性筛选：B1-C01、B1-C02、B2-C08 source tightening。
- [x] 形成第三轮并行任务单：`docs/parallel-rounds/2026-05-08-round-3.md`。
- [x] 开启第三轮三个独立对话：B1-C01、B1-C02、B2-C08 source tightening。
- [x] 第三轮完成后由总控只合并事实源，统一再生 generated files 并运行 `npm run verify`。
- [x] 第三轮通过验收后，进入“已实现资源审校”轮，优先审校 B2-C07 已实现 Applet/Manim/Diagnosis 与 B2-C08 已 scaffold 资源。
- [ ] 形成第一轮已实现资源审校任务单，先从 B2-C07 的可运行 Applet 和 Manim 视频中挑 3 个资源做数学符号、交互边界、课堂节奏和 review 状态升级。
