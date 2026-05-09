# 资源工厂批次规划器

更新时间：2026-05-09

## 目标

`scripts/plan-resource-batch.js` 是只读 dry-run 工具，用来帮助总控从 `content/production/resource-backlog.json` 中选择下一轮“生产线 3 个 + 审核线 3 个”候选。

它只输出建议，不写入：

- `content/production/resource-backlog.json`
- `apps/web/src/data/workspace-data.json`
- `content/curriculum/index.yaml`
- `content/applets/**`
- `content/manim/**`
- `content/diagnosis/**`

## 使用方式

默认输出 Markdown 报告：

```bash
node scripts/plan-resource-batch.js --production-limit 3 --review-limit 3
```

如需给总控或其他脚本读取结构化结果：

```bash
node scripts/plan-resource-batch.js --production-limit 3 --review-limit 3 --json
```

可选参数：

```text
--production-limit <n>    输出生产线候选数量，默认 3
--review-limit <n>        输出审核线候选数量，默认 3
--source-check-limit <n>  输出来源终核队列数量，默认 6
--hold-limit <n>          输出暂缓/低优先级队列数量，默认 6
--json                    输出 JSON，不输出 Markdown
```

## 分流规则

生产线候选：

- 已落地但仍是 scaffold 或 `metadata_ready` 骨架的资源，建议动作为 `refine_existing_scaffold`。
- 最高建议状态为 `self_checked_draft`。
- 对第 8 章这类仍需终核的章节，报告会保留来源风险；这不是允许进入最终发布前状态。

审核线候选：

- 已落地且不再是骨架的 Applet、Manim 或 Diagnosis。
- 建议动作为 `review_existing_resource`。
- 只建议数学审校、浏览器复核或课堂试读准备度检查，不给最终发布状态建议。

来源终核队列：

- `scaffoldPolicy: blocked_until_source_verified` 的 planned item。
- 即使 `scaffoldPolicy` 误写为 ready，只要课程图谱显示章节或课时仍需人工终核，也只进入来源终核。

暂缓与低优先级：

- 必修第二册第 8 章 `8.3` 边界待确认项。
- 文本中已说明普通板书、纸笔任务、静态讲解、合并或取消更合适的候选。
- `follow_up_optional` 或选学内容应低于核心生产和审核候选。

## 硬边界

- 未终核 planned item 不进入 scaffold 建议。
- blocked planned item 不进入生产建议。
- 8.3 暂缓项不进入 scaffold 或完整制作建议。
- 普通板书或纸笔任务更合适时，输出低优先级或暂不数字化。
- 工具不得创建目录、写资源包、改课程图谱或改 backlog。

## 总控使用建议

总控收到报告后，仍应人工复核：

- 候选是否与本轮 3+3 写入范围互不重叠。
- 第 8 章候选是否避开 8.3。
- 已实现资源的建议状态是否过高。
- blocked planned 是否只作为来源终核任务。
- 是否需要先合并其他生产线或审核线结果，再统一再生 generated files。
