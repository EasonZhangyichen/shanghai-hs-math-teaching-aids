# Applet 资源包目录规范

## 目录命名

Applet 资源包必须放在：

```text
content/applets/<resource-id>/
```

`<resource-id>` 使用项目资源 ID 规则：

```text
SH-HS-MATH-HJ-B2-C07-L01-A01
```

含义为地区、学段、学科、教材版本、册别、章节、课时和 Applet 序号。资源 ID 一旦被课堂脚本、课程图谱或播放器引用，不应重命名；需要大改时通过资源版本推进。

## content_spec_only 阶段

只做内容规格草稿时，允许暂不创建 `src/`。此阶段必须至少包含：

```text
content/applets/<resource-id>/
  metadata.yaml
  README.md
  teacher-script.md
  student-task.md
  review.md
```

对应 metadata 字段必须写成：

```yaml
status: "draft"
implementation:
  phase: "content_spec_only"
  html_src_status: "not_started"
```

该阶段不能进入 `math_review`，也不能被播放器列为可运行资源。

## 可运行阶段

进入可运行原型后，必须补齐：

```text
content/applets/<resource-id>/
  src/
    index.html
```

可以按引擎需要增加：

```text
content/applets/<resource-id>/
  src/
    applet.js
    styles.css
    assets/
```

`src/index.html` 是播放器唯一稳定入口。其他文件只能由 `index.html` 相对引用，不能要求播放器了解内部构建结构。

## 文件职责

| 文件 | 职责 |
| --- | --- |
| `metadata.yaml` | 结构化元数据、课程定位、交互状态、事件列表、审核状态和实现状态。 |
| `README.md` | 资源定位、教学问题、交互脚本概览和实现验收点。 |
| `teacher-script.md` | 教师课堂操作流程、暂停点、提问链和板书建议。 |
| `student-task.md` | 学生活动任务、观察表、预测问题和表达要求。 |
| `review.md` | 数学审校、教学审校、交互审校、版权合规和推进门槛。 |
| `src/index.html` | 可嵌入播放器的 Applet 运行入口。 |

## metadata 要求

`metadata.yaml` 必须能映射到 [applet-metadata.schema.json](../schemas/applet-metadata.schema.json)。其中：

- `id` 必须等于资源包目录名。
- `resource_type` 必须为 `applet`。
- `status` 必须使用统一资源状态。
- `curriculum.lesson_id` 必须能在 `content/curriculum/index.yaml` 中找到对应课时。
- `data_contract.state_variables` 必须列出播放器需要保存或诊断的核心状态。
- `data_contract.events` 必须列出 Applet 业务事件，例如 `theta_changed`、`key_angle_reached`。
- `files` 中记录的文件名必须与资源包实际文件一致。

## 依赖与素材

- Applet 默认应能离线运行。
- 如使用第三方库，必须在 `README.md` 或后续实现文档中记录库名、版本、license 和加载方式。
- 如使用图片、音频或外部素材，必须在 `review.md` 中记录来源与版权状态。
- 不允许复制教材正文、官方课件、商业平台资源或未授权图片。

## 进入 review 的目录门槛

进入 `math_review` 前，资源包必须满足：

1. `metadata.yaml` 字段完整并通过 schema 解析。
2. `src/index.html` 可由浏览器直接打开或通过静态服务加载。
3. Applet 能发送 `applet:ready`，并能响应 `player:init`。
4. 教师脚本、学生活动和审核记录与当前实现一致。
5. `review.md` 中列出仍需审校者关注的数学边界和课堂风险。
