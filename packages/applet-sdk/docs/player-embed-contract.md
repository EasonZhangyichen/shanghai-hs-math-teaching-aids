# 播放器嵌入契约

本契约说明教师端平台或独立播放器如何嵌入 Applet。当前只定义接口，不实现 `apps/player`。

## iframe 入口

播放器必须把 Applet 作为 iframe 嵌入，入口固定为资源包内的：

```text
content/applets/<resource-id>/src/index.html
```

推荐 iframe 属性：

```html
<iframe
  title="单位圆到正弦曲线"
  src="/content/applets/SH-HS-MATH-HJ-B2-C07-L01-A01/src/index.html"
  sandbox="allow-scripts allow-same-origin"
  allow="fullscreen"
></iframe>
```

`sandbox` 默认不开放表单提交、弹窗、顶层导航、摄像头、麦克风或地理位置。确需使用额外权限时，必须在 metadata 和审核记录中说明教学必要性。

## 初始化流程

```text
播放器创建 iframe
-> Applet 加载 index.html
-> 播放器发送 player:init
-> Applet 校验 resourceId 和 sdkVersion
-> Applet 回复 applet:ready
-> 播放器允许教师控制和状态记录
```

`player:init` 必须包含：

```json
{
  "metadata": {},
  "mode": "classroom",
  "initialState": {},
  "display": {
    "width": 1280,
    "height": 720,
    "devicePixelRatio": 2
  },
  "capabilities": {
    "statePersistence": true,
    "fullscreen": true,
    "print": false
  }
}
```

## 尺寸与布局

- 播放器负责 iframe 外框尺寸。
- Applet 必须根据 `player:init` 和 `player:resize` 中的 `display` 自适应布局。
- Applet 不应假设固定屏幕尺寸。
- 教室大屏优先支持 16:9，但不应在 4:3 或窄屏预览中裁掉数学对象。
- 关键标签、控制点和公式在投屏距离下应保持可读。

## 状态保存与恢复

播放器通过 `applet:stateChanged` 记录完整 `state`。恢复时发送：

```json
{
  "type": "player:setState",
  "payload": {
    "reason": "restore_snapshot",
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

Applet 接到恢复状态后必须重建画面，而不是只更新内部变量。

## 教师控制

播放器可以提供统一控制按钮，但实际含义由 Applet 解释。基础命令包括：

- `play`
- `pause`
- `reset`
- `reveal`
- `hide`
- `toggle`

示例：

```json
{
  "type": "player:command",
  "payload": {
    "command": "toggle",
    "args": {
      "target": "projection_line",
      "enabled": true
    }
  }
}
```

Applet 必须在执行命令后发送 `applet:stateChanged` 或 `applet:interaction`。

## 模式

播放器至少支持三种嵌入模式：

| mode | 用途 |
| --- | --- |
| `classroom` | 教师大屏演示，强调节奏控制和分步揭示。 |
| `student` | 学生个人或小组操作，强调任务完成和反馈。 |
| `preview` | 平台资源预览，强调快速加载和只读查看。 |

Applet 可以根据模式隐藏或禁用部分控制，但不能改变数学定义、关键状态命名或事件语义。

## 失败处理

如果 Applet 无法初始化，必须发送 `applet:error`。播放器应保留 iframe 外的资源标题、课时、教师脚本入口和错误说明，避免课堂中出现空白页面。

常见失败处理：

- `unsupported_sdk_version`：播放器提示 SDK 版本不兼容。
- `metadata_mismatch`：播放器提示资源包 metadata 与 iframe 入口不一致。
- `asset_load_failed`：播放器提示资源文件缺失，并保留教师脚本入口。

## 不变量

- Applet 不能要求播放器读取 `src/` 内部文件结构。
- Applet 不能直接修改父页面 DOM。
- 播放器不能假设 Applet 的渲染引擎。
- 任何课堂记录必须以事件和状态快照为边界，不读取 Applet 私有变量。
