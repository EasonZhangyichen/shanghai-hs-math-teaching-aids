# Applet 资源目录

本目录用于存放可独立运行或嵌入平台的 HTML 交互课件。

## 推荐结构

```text
content/applets/SH-HS-MATH-HJ-B2-C07-L01-A01/
  metadata.yaml
  README.md
  teacher-script.md
  student-task.md
  review.md
  src/
    index.html
```

`content_spec_only` 草稿阶段可以暂不创建 `src/`，但必须在 `metadata.yaml` 中标注 `implementation.phase: "content_spec_only"` 和 `implementation.html_src_status: "not_started"`。进入 `math_review` 前必须补齐可运行的 `src/index.html`。

完整目录规范见 `packages/applet-sdk/docs/resource-package.md`。

## 命名规则

```text
SH-HS-MATH-HJ-B2-C07-L01-A01
```

含义：上海、高中、数学、沪教版、必修第二册、第 7 章、第 1 课时、第 1 个 Applet。

## 进入 stable 前必须满足

- 数学审校通过。
- 教研审核通过。
- 大屏演示可用。
- 至少有教师脚本和学生活动任务。
- 关键操作和反馈逻辑被记录在 metadata 中。
- 能响应 Applet SDK 事件协议中的 `player:init`，并发送 `applet:ready`。
