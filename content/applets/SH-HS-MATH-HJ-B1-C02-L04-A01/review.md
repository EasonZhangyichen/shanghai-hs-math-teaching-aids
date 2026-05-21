# 审核记录

资源 ID：`SH-HS-MATH-HJ-B1-C02-L04-A01`

当前状态：`draft`

## 自检结论

- 2026-05-21 从 planned 资源生产为可运行 HTML Applet 草稿，未修改课程图谱、生产 backlog 或平台生成数据。
- `src/index.html` 支持调节参数 `a`、`b`，切换四类不等号，显示临界点、数轴解集、端点开闭、全集和空集。
- 数学显示中临界点分式使用上下结构，教师脚本和学生活动中的分式使用 MathML。
- `metadata.status` 保持 `draft`，`compliance.review_status` 保持 `self_checked_draft`。

## 数学口径

- 模型为 <math><mi>a</mi><mi>x</mi><mo>+</mo><mi>b</mi><mo>□</mo><mn>0</mn></math>。
- 当 `a > 0` 时，解集方向按原不等号读取。
- 当 `a < 0` 时，除以负数后不等号方向改变。
- 当 `a = 0` 时，原式退化为常数与 0 的大小判断，解集为全集或空集。
- 严格不等号对应空心端点，不严格不等号对应实心端点。

## 范围边界

- 不做常规移项、一元一次不等式刷题或机械化简。
- 不处理一元一次不等式组交集的完整训练。
- 不进入一元二次不等式、分式不等式或含绝对值不等式。
- 不把资源状态提升到后续审核或发布阶段。

## 已做本地验证

- `node --test content/applets/SH-HS-MATH-HJ-B1-C02-L04-A01/src/parameter-inequality-line.self-check.test.mjs` 已先红灯确认缺少资源包文件；实现后资源内自检通过。
- `npm run validate:content` 已在隔离 worktree 通过。
- `npm run verify` 已运行，失败点为项目测试中的全局资源数量断言仍停留在旧计数；本资源目录内自检和内容 schema 均通过。
- Browser 抽查 `http://127.0.0.1:4179/`：默认状态显示 `x ≤ 2`；点击“负系数”后显示 `x > 2`、向右取值、空心端点；点击“全集”和“空集”后分别显示整条数轴或没有阴影，且均显示没有临界点。Browser 插件自身 Statsig 网络噪声不影响本地页面结果。

## 剩余风险

- 第 2 章课时边界仍需纸质教材或已登录平台终核。
- 当前是作者自检草稿，含参数分类语言、退化情形表达和课堂提问链仍需数学教师审校。
- 真实投屏、真实触控大屏和平台 Markdown 中 MathML 分式渲染仍需抽样确认。
