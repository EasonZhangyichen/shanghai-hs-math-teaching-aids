# B2-C08-L05-A01 修复后质量闸门复核

复核对象：`content/applets/SH-HS-MATH-HJ-B2-C08-L05-A01/**`

复核日期：2026-05-13

分支：`codex/review-b2-c08-l05-a01-postfix-gate`

## 结论

`SH-HS-MATH-HJ-B2-C08-L05-A01`“数量积动态解释器”的数学修复已基本通过本次后置闸门：数量积定义、投影读法、零向量边界和 8.3 坐标化边界均已收紧，未发现把 `a = 0` 或 `b = 0` 误判为垂直的残留。可建议进入数学审校链路。

浏览器与课堂闸门仍需带风险：直达 `src/index.html` 在三种视口下首屏可用，拖动、典型角、重置和零向量边界读数稳定；但平台页中该 iframe 在页面首屏之外，滚动到 iframe 后，iframe 内 560px 高度仍会裁掉部分同步读数和符号判断区。因此暂不建议进入 `browser_review` 或 `classroom_trial`，建议状态为 `math_review_ready_with_browser_hold`。

## 读取与对照依据

- 项目上下文：`docs/00-project-brief.md`、`docs/01-current-state.md`、`docs/02-next-actions.md`、`docs/git-workflow.md`、`docs/content-standards.md`、`docs/codex-collaboration-guide.md`、`docs/resource-factory-workflow.md`、`docs/parallel-quality-system.md`。
- 事实源：`content/curriculum/index.yaml` 中 L05 对应 8.2.2“向量的数量积的定义与运算律”；`content/production/resource-backlog.json` 中该资源仍为已实现 Applet 草稿。
- 前置审核：`docs/review-audits/b2-c08-l05-l10-l04m01-math-hj-consistency.md`、`docs/browser-audits/b2-c08-l05-l10-l04m01-browser-video.md`、`docs/classroom-trials/b2-c08-l05-l10-l04m01-classroom-readiness.md`。

## 数学口径复核

| 检查项 | 结论 | 证据 |
| --- | --- | --- |
| 数量积定义 | 通过 | `metadata.yaml` 明确 `a·b = |a||b|cosθ`，README、教师脚本和页面公式一致。 |
| 有向投影长度 | 通过 | 当 `b` 非零时，metadata 写明 `a·b` 等于 `|b|` 乘以 `a` 在 `b` 方向上的有向投影长度；页面 120° 交互读数为 `θ = 120° = 2π/3`、`a·b = -6`、投影 `-2`。 |
| 零向量边界 | 通过 | 代码在零向量分支中将夹角置空，`b = 0` 时 `projectionDefined: false`；实测拖动 `b` 到原点后显示“夹角不规定”“cosθ 不用于零向量边界”“投影方向未规定”。 |
| 不误判垂直 | 通过 | 教师脚本收束为“只有在两个向量都不是零向量时，`a·b = 0` 才能用来判断两向量垂直”；学生任务也要求口头辨析零向量边界。 |
| 投影方向未规定 | 通过 | README、metadata 和页面读数均区分 `b = 0` 的“投影方向未规定”，不再把它读成普通投影长度 0。 |
| 不提前过度引入 8.3 | 通过 | 资源未出现 `a = (x1, y1)`、`b = (x2, y2)` 或 `a·b = x1x2 + y1y2`；淡网格被说明为拖拽背景，不作为坐标公式来源。 |

## 沪教版一致性

- 课时归属保持在沪教版必修第二册第 8 章 8.2.2“向量的数量积的定义与运算律”，未改变课程图谱和课时挂载。
- 资源仍服务“向量的投影 -> 数量积定义与运算律 -> 8.3 坐标表示/8.4 应用”的当前顺序，没有用通用教材顺序替代沪教版顺序。
- 第 8 章整体仍有 `needs_manual_textbook_check` 风险，尤其 8.3 三课时/四小节边界仍需纸质教材或已登录平台终核；本资源不因此进入发布链路。

## 浏览器与平台复核

测试方式：

- 直达资源：`http://127.0.0.1:5173/content/applets/SH-HS-MATH-HJ-B2-C08-L05-A01/src/index.html`
- 平台页：`http://127.0.0.1:5173/#lesson=SH-HS-MATH-HJ-B2-C08-L05`
- 视口：`1366x768`、`1280x720`、`1024x768`
- 工具：Codex Browser 冒烟 + 本机 headless Chrome DevTools Protocol 精确测量。

| 场景 | 1366x768 | 1280x720 | 1024x768 |
| --- | --- | --- | --- |
| 直达页首屏 | 通过；画板、按钮、读数、符号判断均在首屏 | 基本通过；画板、按钮、主要读数可见，符号判断底部约 3px 越过视口 | 通过；画板、按钮、读数、符号判断均在首屏 |
| 直达页交互 | 通过；120° 后 `a·b = -6`，投影 `-2`；重置回 60°；拖动 `b` 到原点显示投影方向未规定 | 同左 | 同左 |
| 平台页首屏 | 不通过；iframe 顶部约在 `top 1673`，需滚动 | 不通过；iframe 顶部约在 `top 1760`，需滚动 | 不通过；iframe 顶部约在 `top 5137`，需大量滚动 |
| 滚动到 iframe 后 | iframe 可见，但内部读数区 bottom 约 585，超过 560px iframe 高度；投影读数和符号判断被裁 | 同左 | iframe 宽高可见性还受页面视口影响，内部读数/符号判断仍被裁 |

控制台记录：

- 未捕获到资源脚本异常。
- 直达页一次 `404` 来自常规静态资源请求，不影响 Applet 主体。
- 平台页出现既有 iframe sandbox warning：`allow-scripts` 与 `allow-same-origin` 同时存在，属于平台级安全提示，不是本资源脚本错误。

## 课堂试读可行性

教师脚本以 10 到 12 分钟组织“观察夹角 -> 显示投影 -> 典型角对照 -> 边界提醒”，学生任务只保留一张符号表、一个 120° 投影解释和零向量口头辨析。以 12 到 16 分钟教师备课试读视角看，节奏可行，且不会强行展开运算律证明、坐标公式或综合应用。

建议真实试读时优先使用直达资源页，或先由总控处理平台 iframe 首屏裁切后再做平台内试读。试读通过前不得进入 `classroom_trial`。

## 建议状态

- 数学闸门：可建议进入 `math_review`。
- 浏览器闸门：暂不进入 `browser_review`，需平台 iframe 裁切风险修复或明确作为风险接受。
- 课堂闸门：可作为 `ready_for_teacher_trial` 候选，但仅限直达页或修复后的平台预览；暂不进入 `classroom_trial`。
- 发布链路：不得进入 `release_candidate` 或 `published`。

## 剩余风险与总控关注

1. 平台 iframe 仍是主要阻塞：页面首屏离 iframe 过远，iframe 内部高度不足以同屏显示完整读数和符号判断。
2. 第 8 章课时边界仍未完成纸质教材或已登录 dolearning 终核，本资源虽对齐当前 8.2.2，但不能脱离全章来源风险升级发布状态。
3. 真实教室触控屏拖拽手感仍需一线设备复核；本次只覆盖桌面浏览器自动化拖动。

## 写入边界

本次只新增本审核报告，未修改资源包本体、课程图谱、生产 backlog、平台代码或 generated files。
