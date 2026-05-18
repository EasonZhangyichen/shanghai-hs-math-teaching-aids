# B2-C08-L10-A01 修复后质量闸门复核

复核日期：2026-05-18

复核对象：`content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01/**`

写入范围：仅本报告。未修改资源包本体、平台源码、课程图谱、生产 backlog 或平台生成文件。

## 总体结论

`SH-HS-MATH-HJ-B2-C08-L10-A01`「向量法路径比较板」已经不是 scaffold 占位，当前数学模型、先修链、教师脚本和交互结构足以进入 `math_review` 队列。它以三角形分点问题为核心，比较基底法、路径法、数量积/坐标法的第一步建模选择，符合 8.4「向量的应用」的后置综合资源定位。

但本轮不建议进入 `browser_review`。后续正式浏览器报告 `docs/browser-audits/b2-c08-l10-a01-browser-gate.md` 已确认直达页基本可用，但平台 iframe 中基向量切换、路径等式和课堂策略区不能在 560px iframe 首屏内完整呈现，建议仍保持 `hold_for_platform_iframe_fit`。

建议状态：`math_review_ready_with_platform_iframe_hold`。

不建议状态：不建议 `hold_for_revision` 回修资源内容主线；暂不进入 `browser_review`、`classroom_trial`、`release_candidate` 或 `published`。第 8 章课时归属仍未完成纸质教材或已登录平台终核，资源必须继续保持 `draft` / `self_checked_draft`。

## 复核依据

- 已读取项目锚点文档、课程图谱和生产 backlog。
- 已读取目标资源包的 `metadata.yaml`、`README.md`、`teacher-script.md`、`student-task.md`、`review.md` 和 `src/index.html`。
- 已对照 `docs/browser-audits/b2-c08-l10-a01-browser-gate.md` 的正式浏览器结论。
- 本轮只做复核报告，不修改目标资源包。

## 数学与方法链

通过项：

- 资源明确放在 8.4「向量的应用」，并写明使用前提来自 8.1 线性运算、8.2 数量积和 8.3 坐标表示之后，未把后续知识提前给低课时使用。
- 主问题限定为三角形 `ABC` 中 `D` 在 `AB`、`E` 在 `AC`，目标是比较 `DE` 的第一步建模路径，不做通用解题器。
- 默认基向量 `p = AB`、`q = AC` 时，`AD/AB = m`、`AE/AC = n` 对应 `DE = -m p + n q`；三条路径 `D -> A -> E`、`D -> B -> C -> E`、`D -> B -> E` 的化简结果一致。
- 切换为 `p = AB`、`r = BC` 时，`AC = p + r`，`DE = (n - m)p + n r`，与 HTML 中的路径读数一致。
- “数量积/坐标法”被处理为条件性工具：当题目要求长度、夹角、垂直或数值坐标时再调用；当前题只求向量表达，优先基底法或路径法，这个比较合理。
- 没有发现把 8.3 坐标表示错误前置为本课核心的问题；坐标法只作为 8.4 已学后的策略判断，不展开坐标公式训练。

需保留的数学审校点：

- 页面和文档仍使用 `D = mp`、`E = nq` 这类位置向量简写。进入正式数学审校时，建议确认是否统一改成 `AD = m AB`、`AE = n AC` 或明确“以 A 为共同起点的位置表达”，避免学生把点与向量混读。
- “数量积/坐标法”合并为一个按钮适合做起手策略比较，但若后续补度量型例题，应拆成独立片段，不宜把投影、数量积、坐标法全部塞进本板。

## 沪教版一致性

通过项：

- 当前资源仍属于必修第二册第 8 章「平面向量」下的 8.4「向量的应用」。
- 使用的向量加减法、数乘、路径和、基向量表达、数量积/坐标法选择，都符合 8.4 综合应用的后置位置。
- 未恢复 8.3 暂缓资源，未修改课程图谱，也未把坐标表示作为本课核心生产对象。

必须保留：

- 第 8 章图谱仍为 `draft` / `needs_manual_textbook_check`，尤其 8.3 三课时还是四小节边界尚未终核。
- 因课时归属未终核，本资源不建议升级到 `classroom_trial` 或更高状态；只能进入数学审校和平台适配修复/复核队列。

## 课堂可用性

通过项：

- 教师脚本压缩为 12 到 16 分钟片段，主线为“读条件 -> 比较第一步 -> 选基 -> 走路径 -> 化简比较”，课堂节奏可读。
- 12 分钟版本可跳过 `AB/BC` 换基，只保留 `AB/AC` 与三条路径；16 分钟版本再加入换基比较，脚本已有降载说明。
- 学生活动包含第一步选择表、基底表达、路径比较表和反思题，若按脚本裁剪使用，负担总体适中。
- HTML 已包含方法按钮、路径按钮、基向量切换、比例滑块、典型分点预设、分步揭示和读数面板，能支撑课堂比较。

需保留的课堂风险：

- 若要求学生完整填写三条路径、换基表达和反思题，12 分钟内会偏紧；建议把“换一组基向量”作为 16 分钟版本或课后延伸。
- 平台 iframe 首屏适配仍是浏览器闸门阻塞点：正式浏览器报告显示基向量切换和路径等式不能与核心画板、路径按钮、滑块、读数完整同屏。
- 尚未覆盖真实教室触控屏、投屏缩放、Safari 或低配 Windows 教师机。

## 闸门判断

| 闸门 | 结论 | 说明 |
| --- | --- | --- |
| 数学链 | 通过，可送 `math_review` | 三条路径与两组基向量表达一致，数量积/坐标法边界清楚。 |
| 沪教版一致性 | 有条件通过 | 归属 8.4 合理，但第 8 章课时边界仍需纸质教材或已登录平台终核。 |
| 课堂试读准备 | 基本可读，不直接进试用 | 12 到 16 分钟脚本可行，但真实教师试读前仍需数学审校与平台适配复核。 |
| 浏览器闸门 | 不通过 | 直达页可用，但平台 iframe 首屏不能完整支撑核心比较流程，保持 `hold_for_platform_iframe_fit`。 |

## 建议状态

- 建议进入：`math_review`
- 暂不进入：`browser_review`
- 平台专项状态：`hold_for_platform_iframe_fit`
- 不建议退回：`hold_for_revision`，除非数学审校要求先统一位置向量记号
- 禁止升级：`classroom_trial`、`release_candidate`、`published`

## 总控特别关注

1. 数学审校时请重点看 `D = mp`、`E = nq` 是否需要改为 `AD = m AB`、`AE = n AC` 或补足位置向量语境。
2. 浏览器/平台修复应优先解决 iframe 内 560px 高度下基向量切换、路径等式与核心控件不能同屏的问题。
3. 第 8 章教材目录终核完成前，本资源应继续保留 `draft`，不要因为数学闸门可送审而升级发布链路。

## 本分支验证记录

已运行：

- `npm run validate:content`：通过。输出 `Content validation passed: 70 lessons, 14 applet(s), 4 Manim clip(s), 7 diagnosis package(s).`
- `npm run verify`：通过。内容校验、backlog 生成、32 项 node test 和 Vite build 均通过；Vite 仍提示单个 chunk 超过 500 kB，这是既有构建体积提示，不指向本资源。

生成文件检查：

- `npm run verify` 执行了 `generate:backlog` 与 `generate:content`，但本轮检查后未发现 `content/production/resource-backlog.json` 或 `apps/web/src/data/workspace-data.json` diff。
