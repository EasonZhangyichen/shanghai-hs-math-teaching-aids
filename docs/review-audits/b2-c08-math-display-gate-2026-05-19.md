# B2-C08 数学公式显示审核线报告

日期：2026-05-19  
分支：`codex/audit-b2-c08-math-display-gate`  
范围：

- `content/applets/SH-HS-MATH-HJ-B2-C08-L01-A01/**`
- `content/applets/SH-HS-MATH-HJ-B2-C08-L02-A01/**`
- `content/applets/SH-HS-MATH-HJ-B2-C08-L03-A01/**`
- `content/applets/SH-HS-MATH-HJ-B2-C08-L04-A01/**`
- `content/applets/SH-HS-MATH-HJ-B2-C08-L05-A01/**`
- `content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01/**`

本轮只做报告，不修改资源包、不修改课程图谱、不提交 generated files。第 8 章仍未完成纸质教材、已登录 dolearning 和上海数字教育平台终核；本报告不得作为进入 `classroom_trial`、`release_candidate` 或 `published` 的依据。

## 总体结论

B2-C08 已实现 Applet 的数学公式显示闸门未通过。主要阻断点是：

- `L04-A01` 课堂读数卡直接暴露 `angle_degrees`、`cos_theta`、`signed_projection`、`dot_sign` 等英文/代码占位，并在投影解释中显示点坐标。
- `L05-A01` 课堂可见区域使用 `π/2`、`π/3`、`2π/3` 等横向纯文本分式，未采用上下结构或等效数学排版。
- `L10-A01` 课堂可见区域使用 `AD/AB`、`AE/AC`、`AB / AC`、`1/2` 等横向比例/分式写法，并仍保留 `hold_for_platform_iframe_fit` 风险记录。

`L01-A01`、`L02-A01`、`L03-A01` 未发现 `theta`、`pi`、`pi/2` 直接可见问题，但仍有轻量数学显示或 8.3 前置风险，不能因“可运行”而提升状态。

## 资源逐项审核

### SH-HS-MATH-HJ-B2-C08-L01-A01

资源：向量表示与等价拖拽板

1. 发现的问题  
   未发现课堂可见 `theta`、`pi`、`pi/2`、横向分式或英文变量占位。页面主要使用“向右/向上若干格”“长度”“方向”等几何语言，符合前期收回 8.3 坐标化的方向。  
   轻微显示风险：关系框中 `AB = CD = 0`、`AB 与 CD 表示同一向量` 没有向量箭头或“向量 AB”文字保护，课堂上可能被读成线段等式。

2. 涉及文件和位置  
   `content/applets/SH-HS-MATH-HJ-B2-C08-L01-A01/src/index.html` 428-459、802-810、836-844。

3. 是否课堂可见  
   是，位于读数面板、等价判断框和分步提示。

4. 问题类型  
   轻微数学显示问题/数学口径问题；未构成明显 8.3 前置风险。

5. 修复优先级  
   P2。建议后续将 `AB`、`CD` 统一改为“向量 AB”“向量 CD”或使用稳定向量符号显示。

6. 建议后续修复线  
   不单独开高优先级线；可并入“B2-C08 向量符号微修线”。

### SH-HS-MATH-HJ-B2-C08-L02-A01

资源：向量加减法构造器

1. 发现的问题  
   未发现课堂可见 `theta`、`pi`、`pi/2` 或横向分式。`a + b`、`a - b`、`-b` 使用数学字母而非英文占位。  
   轻微显示风险：分步提示中出现 `O -> A -> S`，属于 ASCII 路径箭头；当前读数持续强调“向右/向上若干格”，若教师处理不当，可能滑向分量读法。

2. 涉及文件和位置  
   `content/applets/SH-HS-MATH-HJ-B2-C08-L02-A01/src/index.html` 391-408、421-435、887-902、916-939。

3. 是否课堂可见  
   是，出现在读数面板、构造解释和阶段提示。

4. 问题类型  
   轻微数学显示问题；弱 8.3 前置风险。当前没有坐标点、有序数对或坐标公式。

5. 修复优先级  
   P2。把 `O -> A -> S` 改成 `O → A → S`，并在后续复核中继续保持“几何位移”语言。

6. 建议后续修复线  
   可并入“B2-C08 向量符号微修线”；暂不需要单独阻塞修复。

### SH-HS-MATH-HJ-B2-C08-L03-A01

资源：数乘伸缩实验室

1. 发现的问题  
   课堂可见区域使用 `λ`、`λa`、`|λ|`，未发现 `theta`、`pi`、`pi/2` 或横向分式。  
   可访问文本中仍有 `lambda` 英文读法，例如 `aria-label="调节实数 lambda"`，不是视觉课堂文本，但属于屏幕阅读降级不统一。  
   8.3 前置风险：画板生成 `x`、`y` 坐标轴标签，虽然 review 已说明网格不作 8.3 坐标运算训练，但学生在 8.1.3 课时可能把数乘理解拉向坐标分量。

2. 涉及文件和位置  
   `content/applets/SH-HS-MATH-HJ-B2-C08-L03-A01/src/index.html` 483、524-540、550-594、736-748、801-819、861-877。  
   `content/applets/SH-HS-MATH-HJ-B2-C08-L03-A01/review.md` 28、47-55。

3. 是否课堂可见  
   `λ` 相关显示是课堂可见且基本合格；`lambda` 主要为 aria 文本，不直接视觉可见；`x/y` 坐标轴标签课堂可见。

4. 问题类型  
   8.3 前置风险为主；无主要数学公式显示阻断。

5. 修复优先级  
   P1。建议去掉可见 `x/y` 坐标轴标签，或改成“拖拽网格”非坐标化标记；aria 文本改为“调节实数 λ”。

6. 建议后续修复线  
   开独立“L03 数乘坐标轴弱化线”，只处理坐标轴标签和可访问文本，不改变交互模型。

### SH-HS-MATH-HJ-B2-C08-L04-A01

资源：投影长度与夹角实验室

1. 发现的问题  
   存在课堂可见英文/代码占位：`angle_degrees`、`cos_theta`、`signed_projection`、`dot_sign` 直接显示在读数卡标题中。  
   存在 8.3 前置风险：画板显示坐标网格和坐标数字，解释中出现 `F (x, y)` 形式的投影点坐标。L04 是 8.2.1 投影，当前显示容易把投影概念提前转成坐标点读数。  
   未发现 `pi/2` 或横向分式；`|a| cosθ` 是横向乘积表达，不属于本轮分式阻断。  
   浏览器/iframe 风险：review 记录曾出现 `864x560` 下内部滚动和触控热区偏小，当前已有压缩和热区修复证据，但本轮静态审计发现长英文占位本身仍会造成读数卡拥挤和课堂显示退化。

2. 涉及文件和位置  
   `content/applets/SH-HS-MATH-HJ-B2-C08-L04-A01/src/index.html` 485-500、730-745、884-920。  
   `content/applets/SH-HS-MATH-HJ-B2-C08-L04-A01/README.md` 24。  
   `content/applets/SH-HS-MATH-HJ-B2-C08-L04-A01/metadata.yaml` 66、86-117。  
   `content/applets/SH-HS-MATH-HJ-B2-C08-L04-A01/review.md` 17、30、39、42-55。

3. 是否课堂可见  
   是。读数卡、关系框、网格和投影点说明都在 Applet 主界面可见。

4. 问题类型  
   数学显示问题、8.3 前置风险、浏览器排版问题。`cos_theta` 等也是英文变量/代码占位问题。

5. 修复优先级  
   P0。该资源不能建议进入 `math_review` 或 `browser_review`，应先修公式显示和坐标前置风险。

6. 建议后续修复线  
   开独立“L04 投影公式显示与坐标弱化修复线”：把读数卡改为“夹角 θ”“cos θ”“有向投影长度”“数量积符号”；移除或隐藏坐标数字和 `F (x, y)`，改为“垂足 F 在方向轴上的有向位置”；复测 560px iframe 下读数卡不拥挤。

### SH-HS-MATH-HJ-B2-C08-L05-A01

资源：数量积动态解释器

1. 发现的问题  
   存在课堂可见横向分式：`π/2`、`π/3`、`2π/3`、`3π/4`、`5π/6`。这些出现在角度读数和课堂收束中，违反“分式必须上下结构或等效数学排版”的质量闸门。  
   未发现 `theta`、`pi` 英文占位；希腊字母使用 `θ`、`π`，但分式排版不达标。  
   公式遮挡/iframe：review 记录直达页和 iframe 内部首屏已通过，平台外层仍需滚动到资源卡；本轮未发现新的遮挡证据。

2. 涉及文件和位置  
   `content/applets/SH-HS-MATH-HJ-B2-C08-L05-A01/src/index.html` 493-495、519-523、541-554、602-607、723-739、885-919。  
   `content/applets/SH-HS-MATH-HJ-B2-C08-L05-A01/teacher-script.md` 52-54。  
   `content/applets/SH-HS-MATH-HJ-B2-C08-L05-A01/review.md` 24、36-49。

3. 是否课堂可见  
   是。角度读数、符号判断、课堂收束列表均可在投屏或 iframe 中出现。

4. 问题类型  
   数学显示问题；少量浏览器排版风险来自分式未上下排版后的紧凑面板显示。

5. 修复优先级  
   P0。该资源不能建议进入 `math_review` 或 `browser_review`，应先修分式显示。

6. 建议后续修复线  
   开独立“L05 π 分式显示修复线”：为 `π/2`、`π/3`、`2π/3` 等角度建立轻量上下分式组件或稳定 HTML 片段，同步修 `teacher-script.md` 中的课堂表格表达，并复测 560px iframe 下不遮挡。

### SH-HS-MATH-HJ-B2-C08-L10-A01

资源：向量法路径比较板

1. 发现的问题  
   存在课堂可见横向比例/分式：`AD/AB = m`、`AE/AC = n`、`AB / AC`、`AB / BC`、`1/4`、`1/3`、`1/2`、`2/3`、`3/4`。比例关系是本资源核心内容，但当前用纯文本斜杠呈现，不符合数学显示闸门。  
   “数量积/坐标法”中的斜杠主要是并列短语，不是分式；但它强化了 8.3 坐标依赖。L10 属于 8.4，若 8.3 已学则不算前置；由于 B2-C08 的 8.3 分组仍未终核，仍应作为总控关注风险。  
   review 已明确保留 `hold_for_platform_iframe_fit`，虽然 560px iframe 内关键控件已有绿灯证据，但总控复验前不宜解除。

2. 涉及文件和位置  
   `content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01/src/index.html` 500-519、532-553、653-663、682-719、724-760、914-940。  
   `content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01/README.md` 29-37、60-71。  
   `content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01/teacher-script.md` 15-16、30、87、93.  
   `content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01/student-task.md` 18-33、83。  
   `content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01/review.md` 13、32-51、62-68。

3. 是否课堂可见  
   是。比例滑块、条件说明、基向量按钮、路径等式和任务纸文本均会被教师或学生看到。

4. 问题类型  
   数学显示问题、浏览器排版风险、8.3 依赖风险。不是 `theta/pi` 问题。

5. 修复优先级  
   P0。该资源不能解除 `hold_for_platform_iframe_fit`，也不能建议进入 `browser_review` 或 `classroom_trial`。

6. 建议后续修复线  
   开独立“L10 比例分式与 iframe 复验线”：把 `AD/AB`、`AE/AC`、`AB/AC`、`1/2` 等改为上下结构或清晰比例公式块；同步 README、teacher-script、student-task；在 `864x560` 与 `936x560` iframe 等效视口复测比例滑块、路径等式和基向量等式不拥挤。

## 后续修复优先级

P0：

1. `L04-A01`：清理英文/代码占位与坐标点读法，弱化坐标网格，复测读数卡布局。
2. `L05-A01`：为所有 `π` 分式建立上下结构或等效数学排版。
3. `L10-A01`：修比例分式和基向量组显示，保留并复验 iframe fit hold。

P1：

4. `L03-A01`：去掉可见 `x/y` 坐标轴标签或改为非坐标化拖拽参照；修 aria 中的 `lambda`。

P2：

5. `L01-A01`、`L02-A01`：统一向量符号、路径箭头和几何位移语言。

## 建议后续独立修复线

- `codex/repair-b2-c08-l04-math-display-coordinate-risk`
- `codex/repair-b2-c08-l05-pi-fraction-display`
- `codex/repair-b2-c08-l10-ratio-fraction-iframe-fit`
- `codex/repair-b2-c08-l03-axis-label-accessibility`
- `codex/repair-b2-c08-l01-l02-vector-symbol-polish`

## 剩余风险

- B2-C08 尚未完成纸质教材、已登录 dolearning、上海数字教育平台终核；不能因本轮审计或单项修复进入课堂试用或发布链路。
- 本轮以静态源码和既有 review/browser 记录为依据，未重新启动浏览器做逐像素复测；后续修复线需要补真实 iframe、投屏和触控复核。
- 工作树中存在本任务范围外的 B2-C07 资源改动，本报告未读取或修改这些改动，也不应在本分支提交它们。
