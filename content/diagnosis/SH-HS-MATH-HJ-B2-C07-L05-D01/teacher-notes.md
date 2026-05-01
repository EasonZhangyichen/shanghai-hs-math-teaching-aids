# 教师说明

资源 ID：`SH-HS-MATH-HJ-B2-C07-L05-D01`

## 使用时机

建议放在「函数 `y = A sin(omega x + phi)` 的图像」新授课后半段。学生先看 `SH-HS-MATH-HJ-B2-C07-L05-M01` 的变换顺序动画，再在 `SH-HS-MATH-HJ-B2-C07-L05-A01` 中锁定单参数操作，最后用本诊断任务检查能否从图像读回参数。

## 8 分钟流程

1. 0 到 1 分钟：说明本题组重点不是套公式，而是写出读数理由。
2. 1 到 6 分钟：学生独立完成 6 题，教师不提前提示 `omega = 2pi / T`。
3. 6 到 7 分钟：教师查看错因标签统计，选最高频标签回讲。
4. 7 到 8 分钟：学生订正一题，并补一句“我依据的是哪个图像读数”。

## 讲评路径

| 最高频错因 | 回讲入口 | 追问 |
| --- | --- | --- |
| `period_to_omega_inversion` | 在 Applet 中只调 `omega`，打开周期读数。 | “相邻两个最高点距离变成 pi 时，omega 为什么是 2？” |
| `phase_shift_scale_omission` | 回放 Manim 的 `2x + pi/2 = 2(x + pi/4)`。 | “为什么真正移动的是 pi/4，不是 pi/2？” |
| `phase_shift_sign_error` | 在 Applet 中固定 `omega`，只调 `phi`。 | “`x + a` 和 `x - a` 哪个让图像向左？” |
| `amplitude_reflection_mixup` | 固定 `omega`、`phi`，只改变 `A` 的正负。 | “负号改变的是上下方向，还是左右位置？” |
| `parameter_interference` | 让学生用两个关键点代入候选式。 | “只看周期够不够？还需要哪个点验证？” |

## 教师看板建议

- 若 `period_to_omega_inversion` 命中率超过三分之一，先暂停综合题，集中做周期标尺读数。
- 若两个相位错因同时集中出现，先讲“括号改写”，再讲方向；不要直接背平移口诀。
- 若 `amplitude_reflection_mixup` 集中出现，要求学生口头区分“振幅是距离，负号是翻折”。
- 若 `parameter_interference` 高，说明学生需要更慢的解题流程：先读振幅，再读周期，再用关键点定相位。

## 补救资源

- `SH-HS-MATH-HJ-B2-C07-L05-A01`：三角函数参数变化实验室 Applet。
- `SH-HS-MATH-HJ-B2-C07-L05-M01`：图像变换顺序解释 Manim 草稿。
- 前置复习：`SH-HS-MATH-HJ-B2-C07-L02-A01` 正弦函数性质探究。

## 版权与边界

本题组为原创诊断设计，不复制教材正文、官方课件、教案或商业题库。教师可替换图像读数样例，但应保留错因标签与“读数依据”讲评路径。
