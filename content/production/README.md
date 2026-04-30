# Production 资源生产目录

本目录存放由脚本生成的资源生产清单和后续生产调度数据。

## 文件

- `resource-backlog.json`：由 `npm run generate:backlog` 从 `content/curriculum/index.yaml` 和已落地资源包生成。

## 使用原则

- 不手写修改 `resource-backlog.json`，先修改课程图谱或资源包 metadata，再重新运行生成脚本。
- 新对话优先从 backlog 中选择一个 item，并复制对应的 `threadPrompt`。
- 新增或修改资源后运行 `npm run generate:backlog` 和 `npm run verify`。
