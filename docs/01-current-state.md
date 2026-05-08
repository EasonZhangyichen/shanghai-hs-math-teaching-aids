# 当前状态

更新时间：2026-05-08

## 已有输入

- 根目录包含两份研究文档：
  - `下面是一份可直接作为产品立项蓝图.docx`
  - `针对沪教版高中数学的交互式数字化教具聚合平台研发与架构深度研究报告.docx`
- 已确认采用路线 2：课时知识图谱 + 多引擎微课件平台。
- 已确认首期建议从必修第二册第 7 章“三角函数”样板包开始。
- 已在 `track/curriculum-map` 上为必修第二册第 7 章建立首版结构化课程图谱：
  - 章节主干：7.1 正弦函数图像与性质、7.2 余弦函数图像与性质、7.3 `y = A sin(omega x + phi)` 图像、7.4 正切函数图像与性质。
  - 课时节点：`SH-HS-MATH-HJ-B2-C07-L01` 至 `SH-HS-MATH-HJ-B2-C07-L07`。
  - 已标注每个课时的先修、后续、教学痛点、数字化切入点、诊断焦点和核心素养。
  - 章节目录目前基于公开教材目录与课程资源目录交叉核对，仍需教师用纸质教材最终确认课时划分和课时数。
- 已在 `track/curriculum-map` 上为必修第二册第 8 章“平面向量”建立首版结构化课程图谱：
  - 章节主干：8.1 向量的概念和线性运算、8.2 向量的数量积、8.3 向量的坐标表示、8.4 向量的应用。
  - 课时节点：`SH-HS-MATH-HJ-B2-C08-L01` 至 `SH-HS-MATH-HJ-B2-C08-L10`。
  - 已标注每个课时的核心知识、先修、后续、教学痛点、数字化切入点、诊断焦点和核心素养。
  - 已新增 `docs/source-audits/b2-c08-dolearning-audit.md` 记录来源核对：dolearning.net 备课目录当前需要登录态，公开 secondary cross-check 支持 8.1 至 8.4 主干和当前 8.3 四小节拆分，但用户提供的 dolearning 截图线索显示 8.3 可能按“向量的坐标表示（1）（2）（3）”三课时组织；仍需纸质教材或已登录 dolearning 左侧目录最终确认。
  - 已新增并落实 `docs/source-audits/b2-c08-digital-necessity-review.md`：第 8 章 18 个原 planned resource 中，6 个强烈保留继续进入 backlog，4 个可保留条目已收窄 title / note / 生产边界，3 个降级为教师脚本/纸笔任务/普通诊断，5 个 8.3 相关资源暂缓等待教材或 dolearning 终核；课程图谱 YAML 现只保留 10 个第 8 章 `digital_entry_points`。
- 已在 `codex/curriculum-b2-c06-source-audit` 上为必修第二册第 6 章“三角”完成来源核对、draft 课程图谱和数字化必要性筛选：
  - 新增 `docs/source-audits/b2-c06-source-audit.md`，记录纸质教材未提供、dolearning `/lesson` 需要登录、上海官方平台无法公开确认、国家精品课传课目录和公开电子课本/教师资源目录的辅助证据。
  - 已在 `content/curriculum/index.yaml` 中新增 `SH-HS-MATH-HJ-B2-C06` draft 图谱：6.1 正弦、余弦、正切、余切，6.2 常用三角公式，6.3 解三角形；课时节点 `L01` 至 `L10` 全部仍需纸质教材或已登录 dolearning 终核。
  - 数字化必要性筛选后只保留 5 个 planned 候选：3 个 Applet（任意角与弧度、单位圆三角比、诱导公式单位圆对称）和 2 个 Diagnosis（任意角三角比符号/定义域、已知三角值求角多解）。锐角复习、普通公式推导/计算、解三角形本轮明确暂不数字化。
- 已在 `track/trig-sample-pack` 上为必修第二册第 8 章首批 3 个 Applet planned item 生成资源骨架：
  - `SH-HS-MATH-HJ-B2-C08-L01-A01`“向量表示与等价拖拽板”。
  - `SH-HS-MATH-HJ-B2-C08-L02-A01`“向量加减法构造器”。
  - `SH-HS-MATH-HJ-B2-C08-L03-A01`“数乘伸缩实验室”。
  - 每个资源包已包含 `metadata.yaml`、`README.md`、`teacher-script.md`、`student-task.md`、`review.md` 和 `src/index.html` 占位入口；当前仅为 `draft` / `content_spec_only` / `scaffolded`，尚未进入完整交互课件实现、数学审校或课堂试用。
  - 本批只处理 8.1 前三课时 Applet，未生成或恢复 8.3 暂缓项。
- 已在 `track/trig-sample-pack` 上为必修第二册第 8 章第二批 3 个 Applet planned item 生成资源骨架：
  - `SH-HS-MATH-HJ-B2-C08-L04-A01`“投影长度与夹角实验室”。
  - `SH-HS-MATH-HJ-B2-C08-L05-A01`“数量积动态解释器”。
  - `SH-HS-MATH-HJ-B2-C08-L10-A01`“向量法路径比较板”。
  - 每个资源包已包含 `metadata.yaml`、`README.md`、`teacher-script.md`、`student-task.md`、`review.md` 和 `src/index.html` 占位入口；当前仅为 `draft` / `content_spec_only` / `scaffolded`，尚未进入完整交互课件实现、数学审校或课堂试用。
  - 本批只处理 8.2 与 8.4 的 planned Applet，未生成或恢复 8.3 暂缓项。
- 已在 `track/review-system` 上为必修第二册第 8 章 3 个 Diagnosis planned item 生成资源骨架：
  - `SH-HS-MATH-HJ-B2-C08-L02-D01`“加减法方向四类短诊断”。
  - `SH-HS-MATH-HJ-B2-C08-L05-D01`“数量积正负误区诊断”。
  - `SH-HS-MATH-HJ-B2-C08-L10-D01`“向量应用第一步诊断”。
  - 每个资源包已包含 `metadata.yaml`、`README.md`、`item-bank.yaml`、`scoring-rubric.md`、`teacher-notes.md` 和 `review.md`；当前仅为 `draft` / `metadata_ready` / `self_checked_draft`，题组仍是占位骨架，尚未深入编写完整题组、数学审校或课堂试用。
  - 本批只处理 8.1、8.2 与 8.4 的 planned Diagnosis，未生成或恢复 8.3 暂缓项。
- 已在 `track/manim-pipeline` 上为必修第二册第 8 章唯一剩余 Manim planned item 生成资源骨架：
  - `SH-HS-MATH-HJ-B2-C08-L04-M01`“投影有向长度导入动画”。
  - 该资源包已包含 `metadata.yaml`、`README.md`、`storyboard.md`、`scene.py` 和 `review.md`；当前仅为 `draft` / `scene_draft` / `metadata_ready`，场景脚本是占位骨架，尚未深入编写完整动画、渲染视频或生成 poster。
  - 本批先 dry-run 确认只创建该 Manim Clip，再写入单个资源包；未生成或恢复 8.3 暂缓项。
- 已在 `track/trig-sample-pack` 上为 `SH-HS-MATH-HJ-B2-C07-L01-A01` 创建“单位圆到正弦曲线”资源包草稿：
  - 已包含 `metadata.yaml`、`README.md`、`teacher-script.md`、`student-task.md`、`review.md`。
  - 已新增 `src/index.html` 可运行原型，支持单位圆动点拖拽、`theta` 滑块、播放/暂停、重置、投影线、轨迹、关键点和周期延拓。
  - 当前仍为 `draft`，尚未进入数学审校或课堂试用。
- 已在 `track/trig-sample-pack` 上为 `SH-HS-MATH-HJ-B2-C07-L02-A01` 创建“正弦函数性质探究”资源包草稿：
  - 已包含 `metadata.yaml`、`README.md`、`teacher-script.md`、`student-task.md`、`review.md`。
  - 已新增 `src/index.html` 可运行原型，支持正弦图像动点拖拽、`x` 滑块、播放/暂停、重置、周期段 `k` 选择，以及周期比较、单调区间、对称元素、关键点和性质归纳的分步揭示。
  - 资源聚焦“比较”这一认知动作，对应 7.1.2“正弦函数的性质”的三个痛点：单调区间端点、对称轴/中心混淆、零点和最值点周期遗漏。
  - 当前仍为 `draft`，尚未进入数学审校、课堂节奏试读或浏览器交互复核。
- 已在 `track/trig-sample-pack` 上为 `SH-HS-MATH-HJ-B2-C07-L03-A01` 创建“单位圆到余弦曲线”资源包草稿：
  - 已包含 `metadata.yaml`、`README.md`、`teacher-script.md`、`student-task.md`、`review.md`。
  - 已新增 `src/index.html` 可运行原型，支持单位圆动点拖拽、`theta` 滑块、播放/暂停、重置、横向投影线、余弦轨迹、关键点、正弦参照和周期延拓。
  - 资源聚焦“投影”这一认知动作，对应 7.2.1“余弦函数的图像”的三个痛点：机械看作正弦平移、关键点顺序混用、相位方向混淆。
  - 当前仍为 `draft`，尚未进入数学审校、课堂节奏试读或浏览器交互复核。
- 已在 `track/trig-sample-pack` 上为 `SH-HS-MATH-HJ-B2-C07-L03-A02` 创建“正弦与余弦相位对照”资源包草稿：
  - 已包含 `metadata.yaml`、`README.md`、`teacher-script.md`、`student-task.md`、`review.md`。
  - 已新增 `src/index.html` 可运行原型，支持单位圆动点拖拽、`x` 滑块、播放/暂停、重置、关键角跳转，以及坐标投影、相位参照、关键角表和结论面板的分步显示。
  - 资源聚焦“比较”这一认知动作，对应 7.2.1“余弦函数的图像”的三个痛点：机械平移记忆、关键点顺序混用、相位方向混淆。
  - 当前仍为 `draft`，尚未进入数学审校、课堂节奏试读或浏览器交互复核。
- 已在 `track/trig-sample-pack` 上为 `SH-HS-MATH-HJ-B2-C07-L04-A01` 创建“正弦余弦性质对照板”资源包草稿：
  - 已包含 `metadata.yaml`、`README.md`、`teacher-script.md`、`student-task.md`、`review.md`。
  - 已新增 `src/index.html` 可运行原型，支持正弦/余弦同屏曲线、同步游标、播放/暂停、关键角跳转、周期段 `k` 选择，以及周期比较、单调区间、对称元素、关键点和性质归纳的分步揭示。
  - 资源聚焦“比较”这一认知动作，对应 7.2.2“余弦函数的性质”的三个痛点：正弦性质套用、关键点一般式漏周期、单位圆和图像解释断裂。
  - 当前仍为 `draft`，尚未进入数学审校、课堂节奏试读或完整浏览器交互复核。
- 已在 `track/review-system` 上为 `SH-HS-MATH-HJ-B2-C07-L04-D01` 创建“余弦性质误区诊断”资源包草稿：
  - 已包含 `metadata.yaml`、`README.md`、`item-bank.yaml`、`scoring-rubric.md`、`teacher-notes.md`、`review.md`。
  - 资源聚焦“比较”这一认知动作，围绕正弦性质误迁移、周期遗漏、单调区间方向混淆、奇偶性与对称元素混淆、零点最值一般式混用、单位圆和图像转换断裂设计 6 题即时诊断。
  - `platform_card.availability` 当前为 `item_bank_ready`，可先用于题组摘要和错因标签预览；后续诊断播放器接入后再升级到 `interactive_ready`。
  - 当前仍为 `draft` / `self_checked_draft`，尚未进入数学审校、教研试读或课堂试用。
- 已在 `track/review-system` 上为 `SH-HS-MATH-HJ-B2-C07-L02-D01` 创建“正弦函数性质诊断”资源包草稿：
  - 已包含 `metadata.yaml`、`README.md`、`item-bank.yaml`、`scoring-rubric.md`、`teacher-notes.md`、`review.md`。
  - 资源聚焦“比较”这一认知动作，围绕周期遗漏、单调区间端点混淆、对称轴/中心混淆、零点和最值点一般式遗漏设计 6 题即时诊断。
  - `platform_card.availability` 当前为 `item_bank_ready`，可先用于题组摘要和错因标签预览；后续诊断播放器接入后再升级到 `interactive_ready`。
  - 当前仍为 `draft` / `self_checked_draft`，尚未进入数学审校、教研试读或课堂试用。
- 已在 `track/review-system` 上为 `SH-HS-MATH-HJ-B2-C07-L05-D01` 创建“参数识别诊断任务”资源包草稿：
  - 已包含 `metadata.yaml`、`README.md`、`item-bank.yaml`、`scoring-rubric.md`、`teacher-notes.md`、`review.md`。
  - 资源聚焦“比较”这一认知动作，围绕周期与 `omega` 换算、相位平移量、平移方向、`A < 0` 翻折和多参数干扰设计 6 题即时诊断。
  - `platform_card.availability` 当前为 `item_bank_ready`，可先用于题组摘要和错因标签预览；后续诊断播放器接入后再升级到 `interactive_ready`。
  - 当前仍为 `draft` / `self_checked_draft`，尚未进入数学审校、教研试读或课堂试用。
- 已在 `track/trig-sample-pack` 上为 `SH-HS-MATH-HJ-B2-C07-L05-A01` 创建“三角函数参数变化实验室”资源包草稿：
  - 已包含 `metadata.yaml`、`README.md`、`teacher-script.md`、`student-task.md`、`review.md`。
  - 已新增 `src/index.html` 可运行原型，支持调节 `A`、`omega`、`phi`，单参数观察、变换顺序切换、关键点追踪、观察点拖动和参数归纳。
  - 资源聚焦“变换”这一认知动作，对应 7.3“函数 y = A sin(omega x + phi) 的图像”的三个痛点：横向伸缩和平移方向混淆、多参数认知负荷、从图像反推参数干扰。
  - 当前仍为 `draft`，尚未进入数学审校、课堂节奏试读或更完整的浏览器交互复核。
- 已在 `track/trig-sample-pack` 上为 `SH-HS-MATH-HJ-B2-C07-L06-A01` 创建“正切函数图像生成器”资源包草稿：
  - 已包含 `metadata.yaml`、`README.md`、`teacher-script.md`、`student-task.md`、`review.md`。
  - 已新增 `src/index.html` 可运行原型，支持单位圆终边拖动、角度滑块、播放/暂停、重置、正切图像分段绘制、渐近线、逼近提示和 `x + pi` 周期对照。
  - 资源聚焦“逼近”这一认知动作，对应 7.4.1“正切函数的图像”的三个痛点：定义域断裂、渐近线来自 `cos x = 0`、周期 `pi` 易受 `2pi` 干扰。
  - 当前仍为 `draft`，尚未进入数学审校、课堂节奏试读或更完整的浏览器交互复核。
- 已在 `track/trig-sample-pack` 上为 `SH-HS-MATH-HJ-B2-C07-L07-A01` 创建“正切性质分段观察”资源包草稿：
  - 已包含 `metadata.yaml`、`README.md`、`teacher-script.md`、`student-task.md`、`review.md`。
  - 已新增 `src/index.html` 可运行原型，支持分段正切图像、高亮定义区间、`x` 滑块、播放/暂停、周期 `pi` 对照、奇对称对照和值域归纳的分步显示。
  - 资源聚焦“比较”这一认知动作，对应 7.4.2“正切函数的性质”的三个痛点：整体单调误说、值域与渐近线矛盾感、周期/奇函数/单调区间一般式混淆。
  - 当前仍为 `draft`，尚未进入数学审校、课堂节奏试读或浏览器交互复核。
- 已在 `track/review-system` 上为 `SH-HS-MATH-HJ-B2-C07-L07-D01` 创建“正切函数性质诊断”资源包草稿：
  - 已包含 `metadata.yaml`、`README.md`、`item-bank.yaml`、`scoring-rubric.md`、`teacher-notes.md`、`review.md`。
  - 资源聚焦“比较”这一认知动作，围绕定义域和渐近线遗漏、整体单调误说、值域与渐近线矛盾感、周期 `pi` 与 `2pi` 混淆、奇函数与对称元素混淆、单调区间一般式端点错误设计 6 题即时诊断。
  - `platform_card.availability` 当前为 `item_bank_ready`，可先用于题组摘要和错因标签预览；后续诊断播放器接入后再升级到 `interactive_ready`。
  - 当前仍为 `draft` / `self_checked_draft`，尚未进入数学审校、教研试读或课堂试用。
- 已在 `track/manim-pipeline` 上为 `SH-HS-MATH-HJ-B2-C07-L06-M01` 创建“为什么正切图像有渐近线”资源包：
  - 已包含 `metadata.yaml`、`README.md`、`storyboard.md`、`scene.py`、`review.md` 和 `dist/final/` 视频产物。
  - 资源聚焦“逼近”这一认知动作，从 `tan x = sin x / cos x` 和终边接近 y 轴时 `cos x -> 0` 的斜率变化解释 `x = pi/2 + k pi` 处的竖直渐近线，并用 `tan(x + pi) = tan x` 收束周期 `pi`。
  - 当前为 `draft` / `video_ready`，已导出 1080p30、38.4 秒的 `mp4`、`webm` 和 poster，可用于平台预览和内部教研复核；尚未进入数学审校、分镜节奏复核或课堂试用。
- 已在 `track/applet-sdk` 上创建 Applet SDK v0.1 契约草稿：
  - `packages/applet-sdk/schemas/applet-metadata.schema.json` 定义 Applet metadata schema。
  - `packages/applet-sdk/docs/resource-package.md` 定义 Applet 资源包目录规范。
  - `packages/applet-sdk/docs/status-fields.md` 定义资源生命周期、实现阶段、审核状态和运行态状态变量。
  - `packages/applet-sdk/docs/event-protocol.md` 定义播放器与 Applet 的 `postMessage` 事件协议。
  - `packages/applet-sdk/docs/player-embed-contract.md` 定义 iframe 播放器嵌入契约。
- 已在 `track/manim-pipeline` 上创建 Manim 流水线第一步：
  - `packages/manim-pipeline/schemas/manim-clip-metadata.schema.json` 定义 Manim Clip metadata schema 草稿。
  - `packages/manim-pipeline/docs/resource-package.md` 定义 Manim 资源包目录结构、草稿阶段和渲染阶段字段。
  - `packages/manim-pipeline/docs/render-export-and-platform-card.md` 说明如何导出 `mp4` / `webm` / poster，并说明后续如何接入平台资源卡。
  - `content/manim/SH-HS-MATH-HJ-B2-C07-L01-M01/` 已创建“正弦曲线的来源”资源包，包含 `metadata.yaml`、`README.md`、`storyboard.md`、`scene.py`、`review.md` 和 `dist/final/` 视频产物。
  - 当前 `L01-M01` Manim 资源仍为 `draft` 内容状态，但渲染阶段已到 `video_ready`：已导出 1080p30 `mp4`、`webm` 和 poster，可用于平台预览和内部教研复核。
  - `content/manim/SH-HS-MATH-HJ-B2-C07-L05-M01/` 已创建“图像变换顺序解释”资源包，包含 `metadata.yaml`、`README.md`、`storyboard.md`、`scene.py`、`review.md` 和 `dist/final/` 视频产物；当前为 `rendered` / `video_ready`，已导出 1080p30、约 53.5 秒的 `mp4`、`webm` 和 poster。
  - `content/manim/SH-HS-MATH-HJ-B2-C07-L06-M01/` 已创建“为什么正切图像有渐近线”资源包，包含 `metadata.yaml`、`README.md`、`storyboard.md`、`scene.py`、`review.md` 和 `dist/final/` 视频产物；当前为 `rendered` / `video_ready`，已导出 1080p30、38.4 秒的 `mp4`、`webm` 和 poster。
  - `content/manim/SH-HS-MATH-HJ-B2-C08-L04-M01/` 已创建“投影有向长度导入动画”资源包，包含 `metadata.yaml`、`README.md`、`storyboard.md`、`scene.py` 和 `review.md`；当前为 `scene_draft` / `metadata_ready`，未渲染视频，后续需补齐完整 Manim 动画、预览和数学审校。
- 已在 `track/platform-shell` 上搭建教师端平台壳 MVP：
  - 根目录新增 npm/Vite 工程脚本，`apps/web` 为教师工作台入口。
  - `apps/web/src/lib/content.js` 可读取 `content/curriculum/index.yaml`、`content/applets/*/metadata.yaml` 和 `content/manim/*/metadata.yaml`，生成平台需要的课程树、课时资源卡、metadata 预览和脚本入口数据。
  - 平台壳现可识别 `files.src_entry` 且 `implementation.html_src_status: runnable` 的 Applet 资源，并在教师工作台资源详情区提供 iframe 真实课件预览。
  - 平台壳现可识别 Manim `metadata_ready` 与 `video_ready` 状态；`video_ready` 且 `files.output_webm` / `files.output_mp4` 存在的资源会在教师工作台资源详情区提供 `<video>` 预览。
  - `apps/web/src/data/workspace-data.json` 由 `npm run generate:content` 生成，供前端静态读取。
  - 页面已包含教材树、课时知识卡、资源卡片、样板 Applet metadata 预览、真实 Applet iframe 预览、样板 Manim 视频预览、教师脚本、学生活动和 Manim 分镜入口；Diagnosis 资源包已开始落地，但平台壳尚未读取 `content/diagnosis/*/metadata.yaml`，因此课时页中 Diagnosis 入口仍显示规划中占位。
- 已创建首版内容校验闸门：
  - `scripts/validate-content.js` 会读取课程图谱、Applet metadata、Manim metadata 和 Diagnosis metadata。
  - 已接入 Applet / Manim / Diagnosis JSON Schema 校验，并额外检查资源 ID 命名、目录名一致性、课时归属、课程图谱 `proposed_resource_id` 对齐、声明文件存在性。
  - Manim `video_ready` 资源会检查 `render_plan.phase: rendered`，并确认 `files.output_mp4`、`files.output_webm` 和 `files.poster` 都位于 `dist/final/` 且真实存在。
  - Diagnosis 资源包首期要求 `README.md`、`item-bank.yaml`、`scoring-rubric.md`、`teacher-notes.md` 和 `review.md`，并校验错因标签、题组摘要、反馈策略和评分规则。
  - `npm run verify` 现在会先执行 `npm run validate:content`，再运行测试和平台构建。
- 已创建首版资源工厂工作流：
  - `scripts/generate-resource-backlog.js` 会从 `content/curriculum/index.yaml` 的 `digital_entry_points` 和已落地的 Applet / Manim / Diagnosis 资源包生成生产 backlog。
  - `content/production/resource-backlog.json` 当前列出必修第二册第 6、7、8 章共 30 个资源工作单元：25 个已实现、5 个仍为 `planned`；第 7 章 15 个均已实现，第 8 章 10 个数字化必要性筛选后的候选均已落地，第 6 章 5 个候选仅为 draft 课程图谱中的 planned 资源，不应在纸质教材或 dolearning 终核前 scaffold。当前 Applet 为 17 个总计、14 个已实现、3 个待创建；Manim 为 4 个总计、4 个已实现、0 个待创建；Diagnosis 为 9 个总计、7 个已实现、2 个待创建；每个 item 都包含推荐分支、下一步动作和可复制到新 Codex 对话的 `threadPrompt`。8.3 暂缓资源和第 6 章未终核资源都不进入 scaffold 生产队列。
  - `scripts/scaffold-resource-packages.js` 提供首版批量资源骨架生成能力：当前已支持 Applet、Manim Clip 和 Diagnosis planned item 的 dry-run、按数量或 ID 生成、嵌套文件写入和避免覆盖已有资源包。
  - 已修正 Applet scaffold 模板，避免在 `pedagogy` 中写入 Applet schema 不接受的 `classroom_use` 字段；Manim 与 Diagnosis 仍保留各自 schema 需要的课堂使用说明。
  - `npm run generate:backlog` 已加入脚本，`npm run verify` 现在会先校验内容、生成 backlog，再运行测试和平台构建。
  - `docs/resource-factory-workflow.md` 记录了课程图谱 -> backlog -> 单资源对话 -> 校验 -> 合并的半自动生产流程。
- 已建立并行章节工厂规则：
  - `docs/parallel-chapter-factory.md` 定义了多章节并行推进时的来源核对、课程图谱、数字化必要性筛选、总控验收和 scaffold 顺序。
  - 后续可每轮并行 3 到 5 个章节，但只先做目录来源和必要性筛选；完整资源制作仍按单资源或同类型小批量推进。
  - 并行章节建议使用独立短分支或 git worktree，避免多个对话同时修改同一分支和同一批 YAML。
- 已完成首轮数学符号与布局统一修正：
  - 平台侧和课件侧已接入富数学文本渲染，常见的 `π/2`、`-3π/2` 等会以竖式分数显示，避免 `pi/2`、`Theta` 或横向斜杠破坏数学语言。
  - `content/shared/math-text-normalizer.js` 已覆盖普通 HTML 文本、动态 DOM 更新和 SVG `<text>` 中的简单 π 分数标签。
  - `SH-HS-MATH-HJ-B2-C07-L06-A01` 与 `SH-HS-MATH-HJ-B2-C07-L07-A01` 已完成正切相关课件首屏尺寸压缩、平台 iframe 高度优化和基础浏览器复核。

## 已建立的项目骨架

- Git 仓库已初始化，默认稳定分支为 `main`，当前日常开发分支为 `develop`。
- 本仓库 Git 提交身份已配置为 `EasonZhangyichen <easonzhangyc1008@gmail.com>`。
- GitHub 远程仓库已配置并完成初始推送：
  - `origin`: `https://github.com/EasonZhangyichen/shanghai-hs-math-teaching-aids.git`
  - 远程默认分支：`main`
  - 可见性：public
  - 已推送分支：`main`、`develop`、`release/v0.1-trig-mvp`、全部 `track/*` 分支
  - 已推送标签：`v0.0.0-bootstrap`
- 已创建长期分支：
  - `release/v0.1-trig-mvp`
  - `track/curriculum-map`
  - `track/trig-sample-pack`
  - `track/applet-sdk`
  - `track/manim-pipeline`
  - `track/platform-shell`
  - `track/review-system`
  - `track/design-system`
- `docs/`：长期上下文、计划、架构决策、内容标准。
- `content/curriculum/`：沪教版课程图谱数据入口。
- `content/applets/`：HTML 交互课件资产入口。
- `content/manim/`：Manim 动画资产入口。
- `content/diagnosis/`：诊断任务资产入口。
- `content/production/`：资源生产 backlog 和后续调度数据入口。
- `apps/web`：教师端平台壳 MVP，当前读取课程图谱和样板资源包生成工作台。
- `apps/`：后续继续承载独立课件播放器和其他前端入口。
- `packages/`：后续共享 SDK、引擎适配和 schema。
- `scripts/`：内容校验、生成和导出工具。

## 当前尚未完成

- 尚未正式核验沪教版教材全册课时目录。
- 必修第二册第 6 章“三角”已有 draft 图谱和来源核对记录，但尚未完成纸质教材/已登录 dolearning 终核；尤其需要确认 6.1 是否按 5 个教材节点组织、`6.1.2 任意角及其度量` 是否包含角度制与弧度制的多课时拆分、6.3 是否只有正弦定理和余弦定理两个教材节点。
- 必修第二册第 7 章目录已完成首版结构化整理，但尚未完成纸质教材人工终核。
- 必修第二册第 8 章“平面向量”已完成首版结构化整理、dolearning 来源核对记录和 planned resource 数字化必要性筛选落地，但尚未完成纸质教材/已登录 dolearning 终核；尤其需要确认 8.3 是教材四小节拆分，还是 dolearning 三课时分组。第 8 章 6 个筛选后保留的 Applet 资源包、3 个 Diagnosis 资源包和 1 个 Manim Clip 资源包均已生成骨架；8.3 暂缓资源仍不进入 scaffold 生产队列。
- 第 7 章的第 6 章前置节点已 draft 展开，但仍需人工终核；第 9 章复数等后续节点仍是引用占位，尚未展开为完整图谱。
- 尚未创建独立课件播放器；教师工作台内已完成样板 Applet iframe 预览接入，但尚未沉淀为独立 `apps/player`。
- 已创建八个第 7 章可运行 HTML Applet 原型，并已接入平台壳 iframe 预览；另有六个第 8 章 Applet 处于 scaffolded 骨架状态。所有 Applet 尚未完成数学审校、课堂节奏试读和浏览器交互复核。
- 已创建四个 Manim 场景脚本：`L01-M01`、`L05-M01` 与 `L06-M01` 均已导出可播放 `mp4` / `webm` / poster，`SH-HS-MATH-HJ-B2-C08-L04-M01` 当前仅为 `scene_draft` / `metadata_ready` 骨架；四者尚未完成数学审校或课堂试用。
- 已将 Applet、Manim 和 Diagnosis metadata JSON Schema 接入首版自动校验脚本。
- 已建立首版资源生产 backlog，可按单个资源工作单元开启新对话，避免全高中内容挤在一个上下文中；当前必修第二册第 7 章 15 个资源工作单元和第 8 章 10 个筛选后候选均已落地，第 6 章新增 5 个 planned 候选但仅用于记录必要性，不应立即 scaffold，并已补充 Applet / Manim / Diagnosis 全类型 scaffold 命令以减少后续手工建目录成本。
- 当前第 7 章和第 8 章 backlog 已无 `planned` item；第 6 章 5 个 planned item 必须等待纸质教材或已登录 dolearning 终核后再进入 scaffold。下一步仍应优先推进第 7、8 章已实现资源的数学审校、课堂节奏试读和状态升级，或继续做其他章节来源核对，而不是继续新增同质资源。
- 已开始第一轮并行章节工厂中的 B2-C06 来源核对任务；后续可由总控继续选择 3 到 5 个新章节，只做沪教版来源核对、课程图谱和数字化必要性筛选，通过验收后再进入 scaffold。
- 平台壳已读取 `content/manim/*/metadata.yaml` 并渲染样板 Manim 视频资源卡；尚未沉淀为独立播放器或接入播放器级学习状态记录。
- 尚未配置 GitHub 分支保护规则。

## 继续工作时优先读取

每次新的 Codex 会话应先读取：

1. `docs/00-project-brief.md`
2. `docs/01-current-state.md`
3. `docs/02-next-actions.md`
4. `docs/git-workflow.md`
5. `docs/content-standards.md`
6. `docs/codex-collaboration-guide.md`
7. `docs/resource-factory-workflow.md`
8. `docs/parallel-chapter-factory.md`
9. `docs/thread-starter-prompts.md`
10. `content/curriculum/index.yaml`
11. `content/production/resource-backlog.json`
