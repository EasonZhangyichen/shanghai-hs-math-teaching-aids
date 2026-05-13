# B2-C08-L04-M01 投影导入 Manim 视频质量闸门复核

- 复核日期：2026-05-13
- 复核分支：`codex/review-b2-c08-l04-m01-video-gate`
- 复核对象：`content/manim/SH-HS-MATH-HJ-B2-C08-L04-M01/**`
- 写入范围：仅本报告；未修改 Manim 包本体、平台代码、课程图谱、backlog 或 generated files

## 结论

`SH-HS-MATH-HJ-B2-C08-L04-M01` 的视频内容已通过本轮观看复核：成片聚焦“有向投影长度”，用 `b` 的方向作为有向轴，展示从 `a` 的终点作垂线、投影点 `H` 在正方向/原点/反方向三种位置，以及投影长度正、零、负的变化。画面未出现 `a dot b`、`theta`、`pi` 等英文 fallback，也未提前展开完整数量积定义。

视频产物层面，`mp4`、`webm` 和 poster 均存在，均可解码；`mp4` 为 1920x1080、30fps、36.8 秒，符合 30 到 45 秒课堂导入预期。poster 取自钝角与末尾衔接画面，能代表主体画面。

平台状态层面，当前 `metadata.status: draft` 合理；当前 `platform_card.availability: metadata_ready` 也合理，因为 metadata 仍为 `render_plan.phase: scene_draft`，`files` 未声明 `output_mp4`、`output_webm`、`poster`，平台生成数据中 `package.media.hasOutputMp4/hasOutputWebm/hasPoster` 仍为 `false`。本轮建议总控不要 `hold_for_revision` 视频内容，可在补齐平台元数据字段后将平台可用性推进到 `video_ready`；但资源顶层仍应保持 `draft`，并继续要求教师观看确认课堂语言和暂停节奏。

## 复核依据

- 项目锚点文件：`docs/00-project-brief.md`、`docs/01-current-state.md`、`docs/02-next-actions.md`、`docs/git-workflow.md`、`docs/content-standards.md`、`docs/codex-collaboration-guide.md`、`docs/resource-factory-workflow.md`、`docs/parallel-quality-system.md`
- 课程图谱：`content/curriculum/index.yaml` 中 `SH-HS-MATH-HJ-B2-C08-L04`
- backlog：`content/production/resource-backlog.json` 中 `SH-HS-MATH-HJ-B2-C08-L04-M01`
- 资源文件：`metadata.yaml`、`README.md`、`storyboard.md`、`scene.py`、`review.md`
- 产物文件：`dist/final/SH-HS-MATH-HJ-B2-C08-L04-M01.mp4`、`.webm`、`-poster.png`
- 观看方式：`ffprobe` 读取媒体信息，`ffmpeg` 完整解码 mp4/webm/poster，抽帧生成接触表，并人工查看 poster、9 秒、34 秒、36.5 秒关键画面

## 视频数学口径

通过项：

- 主线聚焦 L04「向量的投影」：定 `b` 的正方向、从 `a` 的终点作垂线、投影点 `H` 落到有向轴、读取有向投影长度。
- 锐角、直角、钝角三段分别呈现 `H` 在正方向、与 `O` 重合、在反方向，符号逻辑清楚。
- 数量积只在末尾以“下一课：用它理解数量积”作衔接，没有展示 `a·b = |a||b|cosθ` 或运算律。
- 画面文字使用 `θ`、`cosθ`、`投影长度`、`正方向`、`反方向`、`垂线`、`投影点 H` 等中文课堂表达；未在成片画面看到 `theta`、`pi`、`a dot b`。
- 暂停节奏适合教师讲解：垂线生成后、直角归零后、钝角负投影后均有可停顿的稳定画面。

注意项：

- 末尾出现“有向投影长度 = |a|cosθ”，可作为 L04 到 L05 的轻量衔接；教师口播仍应强调“本课只读有向投影长度，数量积完整定义放到下一课”。
- 第 8 章仍为 draft，`8.3` 边界仍待纸质教材或已登录 dolearning/上海数字教学平台终核；本视频通过不代表第 8 章进入发布链路。

## 视频产物检查

| 项目 | 结果 |
|---|---|
| mp4 | 存在；`h264`，1920x1080，30fps，36.8 秒，1104 帧；完整解码无错误输出 |
| webm | 存在；`vp9`，1920x1080，30fps，36.8 秒；完整解码无错误输出 |
| poster | 存在；PNG，1920x1080；画面为钝角负投影与末尾衔接，主体明确 |
| 主画面 | 坐标/向量/垂线/投影点/符号读数不互相遮挡，适合平台预览和课堂大屏 |
| 音频 | mp4 未带音轨，符合教师现场口播型 Manim 导入的使用方式 |

## 平台接入状态

当前状态判断：

- `metadata.status: draft`：合理。资源仍未完成教师观看确认、课堂试读或总控发布判断。
- `platform_card.availability: metadata_ready`：当前合理。原因不是视频缺失，而是 metadata 尚未按 `video_ready` 契约声明稳定视频入口。
- `render_plan.phase: scene_draft`：与实际已有成片不一致；若升级平台可用性，应改为 `rendered`。
- `files.output_mp4` / `files.output_webm` / `files.poster`：当前未声明，导致 `apps/web/src/data/workspace-data.json` 中该包 `package.media` 仍显示三项为 `false`。

建议总控后续若推进 `video_ready`，应同步完成：

```yaml
render_plan:
  phase: "rendered"
files:
  output_mp4: "dist/final/SH-HS-MATH-HJ-B2-C08-L04-M01.mp4"
  output_webm: "dist/final/SH-HS-MATH-HJ-B2-C08-L04-M01.webm"
  poster: "dist/final/SH-HS-MATH-HJ-B2-C08-L04-M01-poster.png"
platform_card:
  availability: "video_ready"
  preview_behavior: "video_player"
```

补充风险：平台当前资源卡 `note` 仍从课程图谱/backlog 继承旧句子“解释 a cos theta 的正负”。本轮按禁止范围没有修改 `content/curriculum/index.yaml` 或 generated files；若总控要把资源卡开放给教师预览，应在单独全局符号清理中把该 note 改为 `|a|cosθ` 或避免展示旧 note。

## 建议状态

- 视频内容：通过本轮质量闸门，不建议 `hold_for_revision`。
- 平台可用性：建议总控补齐 metadata 视频入口后推进到 `video_ready`。
- 顶层内容状态：继续保持 `draft`。
- 教研状态：仍需教师观看确认，不进入 `classroom_trial`、`release_candidate` 或 `published`。

## 剩余风险

1. 教师需确认“有向投影长度”是否符合本校课堂语言；若习惯说“向量在某方向上的投影”，口播中应补一句“这里读的是有方向符号的长度”。
2. 末尾数量积衔接虽然未越界展开定义，但建议教师播放时在最后一句处暂停，明确完整定义在下一课处理。
3. 平台卡片 note 仍有 `a cos theta` 旧表达，属于全局课程图谱/生成数据口径风险，不是成片风险。
4. 第 8 章课时边界仍需人工终核；本报告只建议视频资产和平台预览状态，不建议发布链路状态。

## 本轮未做事项

- 未重新渲染视频。
- 未修改 `content/manim/SH-HS-MATH-HJ-B2-C08-L04-M01/**`。
- 未修改 `content/curriculum/index.yaml`。
- 未修改 `content/production/resource-backlog.json`。
- 未修改 `apps/web/src/data/workspace-data.json`。
- 未修改平台代码或其他 Applet / Manim / Diagnosis 包。
