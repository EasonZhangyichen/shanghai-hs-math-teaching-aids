# Applet 事件协议

Applet 与播放器通过 iframe `postMessage` 通信。协议分两层：

- 协议事件：播放器和 Applet 必须共同理解的通用事件，例如 `player:init`、`applet:ready`。
- 业务事件：metadata 中声明的学科交互事件，例如 `theta_changed`、`key_angle_reached`。

## 消息信封

所有消息必须使用同一信封：

```json
{
  "sdk": "sh-hs-math-applet-sdk",
  "sdkVersion": "0.1.0",
  "resourceId": "SH-HS-MATH-HJ-B2-C07-L01-A01",
  "instanceId": "lesson-player-001",
  "type": "applet:stateChanged",
  "seq": 12,
  "timestamp": "2026-04-30T10:15:30.000Z",
  "payload": {}
}
```

字段要求：

| 字段 | 要求 |
| --- | --- |
| `sdk` | 固定为 `sh-hs-math-applet-sdk`。 |
| `sdkVersion` | 协议版本，当前为 `0.1.0`。 |
| `resourceId` | 当前资源 ID，必须等于 metadata `id`。 |
| `instanceId` | 播放器为每次嵌入分配的实例 ID。 |
| `type` | 协议事件名。 |
| `seq` | 单调递增序号，由发送方维护。 |
| `timestamp` | ISO 8601 UTC 时间。 |
| `payload` | 事件载荷。 |

接收方必须忽略未知字段，必须忽略 `sdk` 不匹配的消息。

## 播放器到 Applet

| 事件 | 触发时机 | payload |
| --- | --- | --- |
| `player:init` | iframe 加载后，播放器发送初始化数据。 | `metadata`、`mode`、`initialState`、`display`、`capabilities` |
| `player:command` | 教师点击播放器级控制。 | `command`、`args` |
| `player:setState` | 恢复快照或跳转到某个教学状态。 | `state`、`reason` |
| `player:setMode` | 切换课堂、学生或预览模式。 | `mode` |
| `player:resize` | iframe 尺寸或显示密度变化。 | `width`、`height`、`devicePixelRatio` |
| `player:requestState` | 播放器主动请求完整状态。 | `reason` |

`mode` 当前允许：

- `classroom`
- `student`
- `preview`

`player:command` 的基础命令：

- `play`
- `pause`
- `reset`
- `reveal`
- `hide`
- `toggle`

具体 `args` 由资源 metadata 的 `interaction_design.teacher_controls` 和 `data_contract.events` 解释。

## Applet 到播放器

| 事件 | 触发时机 | payload |
| --- | --- | --- |
| `applet:ready` | Applet 初始化完成，可接收播放器命令。 | `supportedSdkVersion`、`capabilities`、`initialState` |
| `applet:stateChanged` | 状态发生变化。 | `state`、`patch`、`domainEvent` |
| `applet:interaction` | 学生或教师发生可记录的交互。 | `action`、`source`、`state` |
| `applet:checkpoint` | 到达关键教学点或诊断点。 | `checkpoint`、`state`、`evidence` |
| `applet:error` | 发生可恢复或不可恢复错误。 | `code`、`message`、`recoverable` |

`applet:stateChanged` 中：

- `state` 是完整可恢复状态。
- `patch` 是本次变化的字段。
- `domainEvent` 是 metadata 中声明的业务事件名，例如 `theta_changed`。

## 业务事件命名

metadata 中的 `data_contract.events` 使用 `snake_case`，只描述学科交互语义，不直接承担跨 iframe 协议职责。

示例：

```yaml
data_contract:
  events:
    - name: "theta_changed"
      payload: ["theta", "sine_value", "point_p", "point_q"]
    - name: "key_angle_reached"
      payload: ["theta", "sine_value"]
```

运行时映射为：

```json
{
  "type": "applet:stateChanged",
  "payload": {
    "domainEvent": "theta_changed",
    "patch": {
      "theta": 1.5707963268,
      "sine_value": 1
    },
    "state": {
      "theta": 1.5707963268,
      "point_p": [0, 1],
      "sine_value": 1,
      "point_q": [1.5707963268, 1],
      "trace_visible": true
    }
  }
}
```

## 错误事件

`applet:error` 的 `code` 使用稳定字符串：

- `metadata_mismatch`
- `unsupported_sdk_version`
- `invalid_state`
- `render_failed`
- `interaction_failed`
- `asset_load_failed`

错误消息面向开发者和审校者，不直接展示给学生。播放器可以把错误转换为课堂友好的提示。

## 安全与兼容

- 播放器必须校验 iframe 来源，Applet 必须校验父窗口来源。
- Applet 必须能忽略未知协议事件。
- 播放器必须能忽略未知业务事件。
- `player:setState` 必须是幂等操作，同一状态重复发送不应改变数学结果。
- Applet 不应直接依赖浏览器本地存储保存课堂状态，状态持久化由播放器负责。
