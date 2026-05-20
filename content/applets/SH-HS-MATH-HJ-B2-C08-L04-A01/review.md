# 审核记录：投影长度与夹角实验室

资源 ID：`SH-HS-MATH-HJ-B2-C08-L04-A01`

当前状态：`draft`

本轮日期：2026-05-20

本轮范围：仅 `content/applets/SH-HS-MATH-HJ-B2-C08-L04-A01/**`

## 本轮结论

建议保持 `self_checked_draft`。本轮只修复课堂显示、8.3 坐标前置风险和 560px 高度 iframe 紧凑显示；因第 8 章教材来源和课时边界未终核，只保留 `draft` / `self_checked_draft` / `metadata_ready` 草稿边界。

资源主线仍聚焦 8.2.1「向量的投影」：学生拖动蓝色向量 `a` 与橙色方向向量 `b`，观察夹角 `θ`、垂足 `F`、有向投影长度、`cos θ` 和数量积符号的联系。

## 本轮修改

- `src/index.html`：读数卡改为“夹角 θ”“cos θ”“有向投影长度”“数量积符号”，移除课堂可见运行态字段名。
- `src/index.html`：第 2、3、4 步提示改为“垂足 F”“方向轴上的有向位置”等几何语言，不再显示垂足的坐标式点读数；画板保留淡色网格和原点 `O`，不显示数字刻度。
- `src/index.html`：560px 高度紧凑态隐藏可选总结块和图例，右侧面板改为不依赖内部滚动；读数卡保持 2 列、按钮保持 40px 以上触控高度。
- `metadata.yaml`：状态保持 `status: draft`，`compliance.review_status: self_checked_draft`；运行态读数合并为 `projection_state`，避免平台元信息面板露出旧字段名。
- `README.md`、`teacher-script.md`、`student-task.md`：同步改为 `cos θ`、几何语言和“辅助网格与方向轴”口径。
- `src/projection-layout.self-check.test.mjs`：新增课堂标签、坐标前置和 560px iframe 紧凑态自检。

## 数学自检

- 投影方向：以橙色非零向量 `b` 的方向作为读数方向。
- 垂足口径：从蓝色向量 `a` 的终点 `A` 向 `b` 所在直线作垂线，垂足为 `F`。
- 有向投影口径：沿 `b` 的方向读取 `OF`；`F` 在同向一侧为正，在 `O` 点为 0，在反向一侧为负。
- 夹角边界：锐角时 `cos θ > 0`，直角时 `cos θ = 0`，钝角时 `cos θ < 0`。
- 数量积边界：本资源只建立“数量积符号与有向投影同号”的直观，不做完整数量积公式训练。
- 零向量边界：`a` 或 `b` 为零向量时，界面提示夹角或投影方向不规定。

## 验证记录

- 资源内自检红绿：先补课堂字段名、坐标前置和紧凑态检查并确认红灯；修复后 `node --test content/applets/SH-HS-MATH-HJ-B2-C08-L04-A01/src/projection-layout.self-check.test.mjs` 通过，5 项测试全绿。
- `npm run validate:content`：通过。输出为 `Content validation passed: 70 lessons, 14 applet(s), 4 Manim clip(s), 7 diagnosis package(s).`
- Browser 直达页复核：使用 `http://127.0.0.1:8765/content/applets/SH-HS-MATH-HJ-B2-C08-L04-A01/src/index.html`，标题为“投影长度与夹角实验室”，DOM 非空；过滤 Browser 插件自身 Statsig 网络噪声后，未见本资源相关 console error。
- `864x560` 复核：页面 `scrollHeight = clientHeight = 560`；点击“钝角例”和“4 正负联系”后，面板内部 `scrollHeight = clientHeight = 309`、`overflowY = hidden`，数量积符号读数为“负”，热区等效直径约 45px。
- `936x560` 复核：页面 `scrollHeight = clientHeight = 560`；点击“钝角例”和“4 正负联系”后，面板内部 `scrollHeight = clientHeight = 309`、`overflowY = hidden`，数量积符号读数为“负”，热区等效直径约 52px。
- `npm run verify`：本轮最终验证通过；内容校验、backlog 生成、node test 和 Vite build 均通过，Vite 仍有既有 chunk 体积提示。

## 平台接入边界

当前 `src/index.html` 可直接打开运行，metadata 表示平台可生成 iframe 预览。该修正只表示“可运行预览入口”与真实文件状态一致，不代表独立数学教师复核、浏览器/触控复核、课堂试读或正式流转已完成。

## 剩余风险

- 第 8 章仍处于 `draft` / `needs_manual_textbook_check`；8.3 课时边界未终核，本资源不能作为第 8 章全章已终核证据。
- 尚未经过数学教师复核，尤其需要确认“先讲有向投影，再连接数量积符号”的课堂边界是否符合本校进度。
- 尚未经过真实投屏、真实触控大屏和教师 14 分钟流程试读；当前触控结论来自 Browser 等效视口和桌面指针点击。
- 560px 高度紧凑态会隐藏可选总结块和图例，以优先保证主画板、读数卡、关系说明和触控热区首屏可用；宽高更充裕时仍保留完整辅助信息。

## 下一状态建议

- 建议：维持 `self_checked_draft`。
- 来源边界：纸质教材或已登录平台目录未终核前，只保持 `draft` / `self_checked_draft` / `metadata_ready`。
- 流转边界：本轮不触发更高正式流转。
