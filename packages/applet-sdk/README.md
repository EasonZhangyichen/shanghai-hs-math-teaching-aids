# Applet SDK

本目录定义 HTML 交互 Applet 与教师端播放器之间的第一版契约。当前只沉淀文档和 schema，不包含 Web 平台、播放器实现或具体课件引擎代码。

## 范围

Applet SDK v0.1 负责五件事：

1. 统一 Applet `metadata.yaml` 字段。
2. 统一 `content/applets/<resource-id>/` 资源包目录。
3. 统一资源生命周期、实现阶段和运行态状态字段。
4. 统一 Applet 与播放器的 `postMessage` 事件协议。
5. 统一 iframe 播放器嵌入契约。

第一版以 `content/applets/SH-HS-MATH-HJ-B2-C07-L01-A01/metadata.yaml` 的“单位圆到正弦曲线”资源包为样板，但字段不绑定正弦函数，也不绑定某个渲染引擎。

## 文件

- [schemas/applet-metadata.schema.json](schemas/applet-metadata.schema.json)：Applet metadata JSON Schema。
- [docs/resource-package.md](docs/resource-package.md)：资源包目录规范。
- [docs/status-fields.md](docs/status-fields.md)：状态字段与推进门槛。
- [docs/event-protocol.md](docs/event-protocol.md)：播放器与 Applet 事件协议。
- [docs/player-embed-contract.md](docs/player-embed-contract.md)：iframe 嵌入契约。

## 版本约定

- `schema_version` 当前为 `0.1.0`，在 metadata 中建议填写，但 v0.1 schema 暂不强制要求，以兼容已经创建的样板包。
- 资源自身仍使用独立语义化版本，例如 `SH-HS-MATH-HJ-B2-C07-L01-A01@0.1.0`。
- SDK 契约发生不兼容变化时，必须提升 `schema_version` 的主版本，并在迁移文档中说明旧 metadata 的处理方式。

## 非目标

- 不实现 `apps/player` 或 `apps/web`。
- 不规定 Applet 必须使用 Canvas、SVG、D3、JSXGraph、GeoGebra、CindyJS 或 Three.js。
- 不把教师脚本、学生活动和审核记录压进一个大 metadata 文件；metadata 只保存播放器和检索必须读取的结构化信息。
