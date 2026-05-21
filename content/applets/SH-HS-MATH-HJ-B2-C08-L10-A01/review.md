# 审核记录：向量法路径比较板

资源 ID：`SH-HS-MATH-HJ-B2-C08-L10-A01`

当前状态：`draft`

本轮日期：2026-05-20

本轮范围：仅 `content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01/**`

## 本轮结论

建议维持 `self_checked_draft`，并继续保留 `hold_for_platform_iframe_fit` 的复核记录直到总控复验。

本轮专项处理平台 iframe fit、首屏压缩、路径比较板可见性和位置向量简写口径。资源以三角形 `ABC` 中 `D` 在 `AB`、`E` 在 `AC` 为情境，围绕 `DE` 的三条路径分解比较“第一步选择、选基向量、逐段翻译、化简等式”的方法。资源不做题库，不进入 8.3 坐标法深水区，不修改课程图谱。

## 数学自检

- 默认基向量：设 `p` 表示向量 `AB`，`q` 表示向量 `AC`。若 `\frac{AD}{AB} = m`、`\frac{AE}{AC} = n`，则 `AD = m p`、`AE = n q`，所以 `DE = AE - AD = -m p + n q`。
- 替换基向量：设 `p` 表示向量 `AB`，`r` 表示向量 `BC`。因为 `AC = p + r`，所以 `AE = n(p + r)`，`DE = AE - AD = (n - m)p + n r`。
- 位置向量简写：原 `D = mp`、`E = nq` 容易把点与向量直接等同；本轮改为 `AD = mp`、`AE = nq`。若课堂口头使用“D 点对应 mp、E 点对应 nq”，必须补明“以 A 为共同起点的位置向量”，并建议数学教师专项确认该简写是否写入正式脚本。
- 沪教版先修链：8.4 本题只调用 8.1 线性运算、8.2 数量积、8.3 坐标表示中的已学工具；本题第一步优先基底法或路径法，数量积/坐标法只在后续要求长度、夹角、垂直或数值化时进入。
- 路径一：`D → A → E`，对应 `DA + AE`。
- 路径二：`D → B → C → E`，对应 `DB + BC + CE`。
- 路径三：`D → B → E`，对应 `DB + BE`。
- 三条路径表达不同，化简后对应同一个目标向量 `DE`。
- 本资源只训练向量应用建模的第一步选择，不展开坐标建系、复杂解析几何或数量积求角求长。

## 本轮修改

- `src/index.html`：进一步压缩 applet 外边距、顶部栏、按钮、画板高度和滑块区域；把“路径等式”前置到右侧面板上半区；把点位置表达从 `D = mp`、`E = nq` 改为 `AD = mp`、`AE = nq`。
- `src/index.html`：补充 `max-height: 620px` 的平台 iframe 紧凑模式，并在该模式下隐藏首段说明文字，确保 560px 高度下路径按钮、基向量切换、比例滑块、路径等式、基向量等式和核心画板仍优先首屏可见。
- `src/index.html`：将课堂可见分点比例、常见刻度和基向量组按钮改为上下分式与双行紧凑卡，避免比例和基向量组以横向斜杠形式显示。
- `src/index.html`：修复 `AB、BC` 换基且 `m = n` 时零项被过滤后公式残留前导加号的问题，避免出现 `DE = AE - AD = + 0.65r`。
- `src/platform-fit.self-check.test.mjs`：新增资源级自检，锁定平台 iframe 紧凑 CSS、正式 `AD/AE` 口径、`hold_for_platform_iframe_fit` 风险记录和零项公式格式。
- `src/platform-fit.self-check.test.mjs`：补充斜杠比例红灯检查，锁定 HTML、README、教师脚本、学生活动和审核记录的数学显示口径。
- `metadata.yaml`：把学习目标、数学范围、数据契约和反馈原则统一为 `AD` / `AE` 向量表达，并加入位置向量简写审校提示；`status` 保持 `draft`，`compliance.review_status` 保持 `self_checked_draft`。
- `README.md`：补充平台 iframe 560px 首屏压缩说明和位置向量简写边界。
- `teacher-script.md`：把正式板书口径改为 `AD = mp`、`AE = nq`、`DE = AE - AD`，并标注口头简写需补明共同起点。
- `student-task.md`：把填空从 `D/E` 点等式改为 `AD/AE/DE` 向量等式。

## 验证记录

- 最小红灯检查：实现前确认 HTML 缺少 `route-option`、`basis_equation`、`path_delta` 和 `path:selected` 等核心锚点，检查按预期失败。
- 最小绿灯检查：实现后同一检查通过，确认路径按钮、基向量等式、路径等式和路径选择事件锚点已进入 HTML。
- 本轮红灯检查：修复前确认资源包缺少 `8.1 线性运算`、`8.2 数量积`、`8.3 坐标表示`、`第一步选择`、`数量积/坐标法` 和 `method-option` 等锚点，检查按预期失败。
- 本轮绿灯检查：同一锚点检查通过，确认资源包已包含 8.1/8.2/8.3 先修链、第一步选择说明、数量积/坐标法边界和 HTML 方法按钮。
- Browser 平台容器测量：在 dev server 的平台预览页中，`1024x768` 对应 iframe 约 `936x560`，`1280x720` 对应 iframe 约 `864x560`，`1366x768` 对应 iframe 约 `950x560`。
- Browser applet 首屏测量：以上三档 iframe 等效尺寸下，`documentElement.scrollHeight = 560`，核心画板底部约 `381px`，比例滑块底部约 `441px`，路径等式底部约 `536px`，均落在 `560px` iframe 首屏内。
- Browser 交互检查：在 `864x560` 等效尺寸下通过首屏 DOM 选择 `D → B → C → E` 路径，按钮 `aria-pressed` 状态更新，路径等式显示 `DB + BC + CE` 并化简为 `DE = AE - AD = -0.4p + 0.65q`；正式基向量表达保持 `AD = 0.4p`、`AE = 0.65q`，未出现 `D = ...` / `E = ...` 作为正式等式。该检查未产生本地 applet console warning/error；Browser runtime 自身的 Statsig 网络 403 噪声与本资源无关。
- 平台 iframe 复测红灯：在 `864x560` 等效尺寸下，修复前基向量切换区域位于首屏下方；切换 `AB、BC` 且令 `m = n = 0.65` 时，路径公式曾显示 `DE = AE - AD = + 0.65r`。
- 平台 iframe 复测绿灯：在 `864x560` 等效尺寸下，核心画板底部约 `329px`，比例滑块底部约 `389px`，路径按钮底部约 `155px`，路径等式底部约 `370px`，基向量切换底部约 `440px`，基向量等式底部约 `522px`，均落在 560px iframe 首屏内。
- 分式显示 Browser 检查：`864x560` 等效尺寸下，滑块标签显示上下分式，基向量组显示双行卡片；DOM 可见文本未检出分点比例、基向量组和常见刻度的横向斜杠写法。
- 公式复测绿灯：平台预览页中进入 L10 iframe，选择 `D → B → C → E`、`AB、BC` 并设置 `m = 0.65` 后，路径等式和基向量等式均显示 `DE = AE - AD = 0.65r`，未再出现前导加号；资源 console 未见 warning/error。
- 分式显示红灯检查：实现前资源级自检按预期失败，失败点为课堂可见比例仍包含横向斜杠写法。
- `node --test content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01/src/platform-fit.self-check.test.mjs`：通过，5 项资源级自检全部通过。
- `npm run validate:content`：通过。输出为 `Content validation passed: 70 lessons, 14 applet(s), 4 Manim clip(s), 7 diagnosis package(s).`
- `npm run verify`：通过。内容校验、backlog 生成、36 项 node test 和 Vite build 均通过；Vite 仍提示单个 chunk 超过 500 kB，这是既有构建体积提示，不指向本资源。
- `npm run verify` 和平台 dev server 可能再生 `apps/web/src/data/workspace-data.json`；本分支不提交全局生成文件。

## 剩余风险

- 第 8 章仍处于 `draft` / `needs_manual_textbook_check`；课时边界、课时数和标题表述仍需纸质教材或已登录 dolearning/上海数字教学平台终核。
- 尚未经过数学教师复核，尤其需要确认“向量应用”课时中用三角形分点路径作为第一轮策略板是否贴合教师课堂进度。
- 位置向量简写需数学教师专项确认：正式文件已改为 `AD = mp`、`AE = nq`，但课堂口头是否允许说“D 点对应 mp、E 点对应 nq”仍需复核者给统一口径。
- `hold_for_platform_iframe_fit` 继续保留：本轮只证明 L10 资源在平台 iframe 内部 560px 高度下关键控件可见，平台课时页外层仍需要滚动到资源卡片，真实投屏/触控大屏也未完成。
- 尚未经过真实投屏、触控大屏和教师 16 分钟流程试读。
- 当前只比较路径建模，不覆盖完整证明、坐标法系统训练或数量积应用链。

## 下一状态建议

- 建议：维持 `self_checked_draft`；`hold_for_platform_iframe_fit` 只作为风险记录等待总控复验。
- 来源边界：纸质教材或已登录平台目录未终核前，只保持 `draft` / `self_checked_draft` / `metadata_ready`。
- 流转边界：本轮不触发更高正式流转。
