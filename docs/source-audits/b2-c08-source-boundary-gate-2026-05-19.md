# B2-C08 平面向量来源边界闸门复核

复核日期：2026-05-19  
复核分支：`codex/integrate-b2-c08-audit-batch-20260519`  
复核对象：必修第二册第 8 章 `SH-HS-MATH-HJ-B2-C08`、当前已实现 B2-C08 资源与既有来源记录  
写入范围：仅本报告；未修改课程图谱、资源包、生产 backlog、平台生成数据或资源状态字段

## 本轮范围

- 本轮是总控在 worker 重做来源边界审核失败后补做的 docs-only 闸门复核。
- worker 线程因主工作区存在非本任务的 `content/manim/**` 未提交改动而停止，没有创建新分支、没有新增审核文档、没有运行 `npm run validate:content`，因此不能作为完成结果接收。
- 本轮不生产资源、不恢复 8.3 暂缓项、不修改 `content/curriculum/index.yaml`。
- 本轮只判断当前 B2-C08 已实现资源是否仍可作为 draft 资源归属候选，以及哪些边界必须继续冻结。

## 读取依据

- `content/curriculum/index.yaml`
- `content/production/resource-backlog.json`
- `docs/source-audits/b2-c08-dolearning-audit.md`
- `docs/source-audits/b2-c08-digital-necessity-review.md`
- `docs/source-audits/b2-c08-source-tightening.md`
- 当前 B2-C08 Applet、Diagnosis、Manim 资源包的 `metadata.yaml` 与 `review.md`

## 8.3 来源边界结论

当前仍不能确认 8.3「向量的坐标表示」应按教材 `8.3.1` 至 `8.3.4` 四小节，还是按 dolearning 左侧目录三课时分组进入平台课时。

| 证据线索 | 当前可用性 | 总控判断 |
| --- | --- | --- |
| 公开 secondary cross-check 支持 `8.3.1`、`8.3.2`、`8.3.3`、`8.3.4` 四个小节标题 | 可用于 draft 记录 | 不足以证明正式课时边界或课时数 |
| 用户提供的 dolearning 截图线索显示 8.3 可能为「向量的坐标表示（1）（2）（3）」 | 只作为待核线索 | 需要纸质教材或已登录 dolearning / 上海数字教学平台目录终核 |
| 当前 YAML 中 `B2-C08` 标记 `needs_manual_textbook_check: true` 与 `period_status: 8.3_boundary_pending_manual_check` | 与风险一致 | 继续保留，不提升来源状态 |

结论：`8.3_boundary_pending_manual_check` 继续成立。`SH-HS-MATH-HJ-B2-C08-L06`、`L07`、`L08`、`L09` 只能作为 draft 课程图谱节点，不得恢复或新增独立数字资源。

## 已实现资源归属

当前 B2-C08 已实现资源均位于 8.1、8.2 或 8.4，不在 8.3 暂缓范围内；但它们只能作为后续审校候选，不能进入发布链路。

| 资源 | 当前归属 | 闸门判断 |
| --- | --- | --- |
| `SH-HS-MATH-HJ-B2-C08-L01-A01` | `8.1.1` 向量的概念 | 已完成前置语言修复，主线回到几何位移、大小、方向和位置无关性；仍需数学教师审校，不升级状态。 |
| `SH-HS-MATH-HJ-B2-C08-L02-A01` | `8.1.2` 向量的加法和减法 | 已完成前置语言修复，主线回到首尾相接、端点顺序、相反向量和几何路径；仍需数学审校与课堂节奏复核。 |
| `SH-HS-MATH-HJ-B2-C08-L02-D01` | `8.1.2` 向量的加法和减法 | 题组聚焦方向、闭合路径和端点顺序，未把 8.3 坐标运算作为主线；可进入教师题组复核和限时试做准备。 |
| `SH-HS-MATH-HJ-B2-C08-L03-A01` | `8.1.3` 实数与向量的乘法 | 主线是数乘的长度、方向、零向量和共线边界；网格只能作为拖拽背景，不作为 8.3 坐标训练。 |
| `SH-HS-MATH-HJ-B2-C08-L04-A01` | `8.2.1` 向量的投影 | `html_src_status: runnable` 与平台 iframe 事实一致；可用于投影和夹角直观，不得把 L04 讲成完整数量积课。 |
| `SH-HS-MATH-HJ-B2-C08-L04-M01` | `8.2.1` 向量的投影 | `video_ready` 只表示平台可预览；可进入内部教师观看确认队列，不进入课堂试用或发布。 |
| `SH-HS-MATH-HJ-B2-C08-L05-A01` | `8.2.2` 数量积的定义与运算律 | 当前记录已补充平台 iframe 与触控风险；仍需数学审校、真实投屏和教师试读准备。 |
| `SH-HS-MATH-HJ-B2-C08-L05-D01` | `8.2.2` 数量积的定义与运算律 | 题组已补充 180° 反向边界和限时节奏记录；保持草稿状态。 |
| `SH-HS-MATH-HJ-B2-C08-L10-A01` | `8.4` 向量的应用 | 正式表达统一为 `AD = mp` / `AE = nq`；继续保留 `hold_for_platform_iframe_fit`，且必须以 8.3 已学为使用前提。 |
| `SH-HS-MATH-HJ-B2-C08-L10-D01` | `8.4` 向量的应用 | 题组聚焦第一步策略选择，已补明非零向量边界；不承担完整证明批改。 |

## 冻结项

以下 8.3 相关候选继续冻结，不恢复、不 scaffold、不进入下一轮生产或审核：

- `SH-HS-MATH-HJ-B2-C08-L06-A01`
- `SH-HS-MATH-HJ-B2-C08-L06-M01`
- `SH-HS-MATH-HJ-B2-C08-L07-A01`
- `SH-HS-MATH-HJ-B2-C08-L09-A01`
- `SH-HS-MATH-HJ-B2-C08-L09-D01`

已降级的 `SH-HS-MATH-HJ-B2-C08-L08-A01`、`SH-HS-MATH-HJ-B2-C08-L08-D01`、`SH-HS-MATH-HJ-B2-C08-L10-M01` 也不恢复为独立资源候选。

## 状态闸门

- B2-C08 章节来源状态继续保持 `draft` / `needs_manual_textbook_check` / `8.3_boundary_pending_manual_check`。
- B2-C08 已实现资源最高只允许保持 `draft`、`self_checked_draft`、`metadata_ready` 或 `video_ready`。
- `video_ready` 仅表示平台视频入口可预览，不代表课堂试用、候选发布或正式发布。
- 本轮不得、也未建议任何 B2-C08 资源进入 `classroom_trial`、`release_candidate` 或 `published`。

## 下一步

下一轮不恢复生产线。先完成数学教师审校、真实投屏/触控复核、教师观看确认和题组限时试做准备；8.3 课时边界必须等纸质教材或已登录 dolearning / 上海数字教学平台终核后再决定是否重排课程图谱或恢复候选资源。
