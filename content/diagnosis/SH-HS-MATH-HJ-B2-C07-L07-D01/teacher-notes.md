# 教师说明

资源 ID：`SH-HS-MATH-HJ-B2-C07-L07-D01`

## 使用时机

建议放在「正切函数的性质」新授课后半段。学生先在 `SH-HS-MATH-HJ-B2-C07-L07-A01` 中观察分段图像、周期 `pi` 对照、奇对称和值域归纳，再用本诊断任务检查是否能把性质写成完整、带条件的一般式。

## 8 分钟流程

1. 0 到 1 分钟：说明本题组重点不是背表格，而是每个结论都要带上定义域和分段条件。
2. 1 到 6 分钟：学生独立完成 6 题，教师不提前提示“整体单调”的陷阱。
3. 6 到 7 分钟：教师查看错因标签统计，选最高频标签回讲。
4. 7 到 8 分钟：学生订正一题，并补写一个定义区间、渐近线公式或性质比较理由。

## 讲评路径

| 最高频错因 | 回讲入口 | 追问 |
| --- | --- | --- |
| `domain_asymptote_omission` | 回到 L06 图像生成器或 L06 Manim，显示 `cos x = 0`。 | “哪些 x 让 tan x = sin x / cos x 无意义？” |
| `global_monotonic_overreach` | 打开 L07 Applet 的分段高亮。 | “能不能跨过渐近线比较左右两段的函数值？” |
| `interval_formula_error` | 板书一个分支，再平移 `kpi`。 | “端点为什么不能写成闭区间？” |
| `range_asymptote_conflict` | 只显示一个定义区间上的正切分支。 | “这一段的 y 值从哪里变化到哪里？” |
| `period_pi_confusion` | 打开 `x` 与 `x + pi` 周期对照。 | “为什么正切的重复距离比正弦余弦短？” |
| `parity_symmetry_mixup` | 打开奇对称对照或代入 `-x`。 | “`tan(-x) = -tan x` 对应哪一种图像对称？” |

## 教师看板建议

- 若 `global_monotonic_overreach` 命中率超过三分之一，先暂停性质表格讲评，统一处理“函数定义域不连续时如何说单调”。
- 若 `domain_asymptote_omission` 与 `interval_formula_error` 同时高发，说明学生没有把渐近线转写成区间端点，先做一般式板书。
- 若 `range_asymptote_conflict` 高发，避免只说“值域为 R”，要让学生口头描述一个分支从负无穷到正无穷。
- 若 `period_pi_confusion` 高发，要求学生用公式 `tan(x + pi) = tan x` 和图像平移各解释一次。

## 补救资源

- `SH-HS-MATH-HJ-B2-C07-L07-A01`：正切性质分段观察 Applet。
- `SH-HS-MATH-HJ-B2-C07-L06-A01`：正切函数图像生成器 Applet。
- `SH-HS-MATH-HJ-B2-C07-L06-M01`：为什么正切图像有渐近线 Manim。

## 版权与边界

本题组为原创诊断设计，不复制教材正文、官方课件、教案或商业题库。教师可根据班级情况替换题干措辞，但应保留错因标签与“分段条件优先”的讲评路径。
