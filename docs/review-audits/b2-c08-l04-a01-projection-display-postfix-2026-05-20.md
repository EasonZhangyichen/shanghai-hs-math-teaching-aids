# B2 C08 L04 A01 投影显示后置复核

日期：2026-05-20

分支：`codex/audit-b2-c08-l04-projection-display-postfix`

范围：仅复核 `content/applets/SH-HS-MATH-HJ-B2-C08-L04-A01/**`。未升级内容状态。

## 结论

未发现阻断项。`L04-A01` 已清除课堂可见的 `angle_degrees`、`cos_theta`、`signed_projection`、`dot_sign` 等运行态字段名；`F(x,y)`、坐标数字刻度和坐标读数前置风险已弱化为“垂足 F”“方向轴上的有向位置”等几何语言。`864x560` 与 `936x560` 等效 iframe 视口下未见页面或面板内部滚动，按钮与拖拽热区满足触控下限，公式未挤出容器。

## 静态复核

- `rg` 复核 `src/index.html`、`projection-layout.self-check.test.mjs`、`README.md`、`metadata.yaml`、`student-task.md`、`teacher-script.md`：课堂可见旧字段名和 `F(x,y)` 未命中。
- 读数卡显示为“夹角 θ”“cos θ”“有向投影长度”“数量积符号”。
- 画板仅保留原点 `O`、向量标签、垂足 `F` 和投影/夹角标注；未显示坐标数字刻度。
- 资源自检已覆盖课堂标签、坐标前置弱化、560px 紧凑态、40px 按钮和透明拖拽热区。

## 浏览器复核

直达页：`http://127.0.0.1:8765/content/applets/SH-HS-MATH-HJ-B2-C08-L04-A01/src/index.html`

交互路径：打开页面 -> 点击“钝角例” -> 点击“4 正负联系”。

| 视口 | 页面滚动 | 面板滚动 | 最小按钮高 | 拖拽热区等效直径 | 公式状态 | 读数 |
| --- | --- | --- | --- | --- | --- | --- |
| `864x560` | `scrollHeight = clientHeight = 560` | `.panel` 与 `.panel-inner` 均无内部滚动 | `40px` | 约 `45.3px` | 宽度 `286px <= 302px`，未挤出 | 数量积符号 `负` |
| `936x560` | `scrollHeight = clientHeight = 560` | `.panel` 与 `.panel-inner` 均无内部滚动 | `40px` | 约 `51.6px` | 宽度 `286px <= 302px`，未挤出 | 数量积符号 `负` |

两档视口下 `summary-box` 与 `legend` 在紧凑态隐藏，卡片与按钮未检测到重叠。页面控制台未见本资源相关 error/warn；Browser 插件自身 Statsig 网络噪声不计入资源问题。

## 命令验证

- `node --test content/applets/SH-HS-MATH-HJ-B2-C08-L04-A01/src/projection-layout.self-check.test.mjs`：5 项通过。
- `npm run validate:content`：通过，输出 `Content validation passed: 70 lessons, 14 applet(s), 4 Manim clip(s), 7 diagnosis package(s).`
- `npm run verify`：通过，36 项 node test 全绿，Vite build 成功；仍有既有 chunk 大小提示。

## 保留风险

- 本次是浏览器等效视口与静态自检复核，不替代真实投屏、真实触控大屏和教师流程试读。
- 本次不提升 `draft` / `self_checked_draft` 以外的状态。
