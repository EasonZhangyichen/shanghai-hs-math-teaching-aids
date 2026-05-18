# B2-C08-L04-M01 投影导入 Manim 视频质量闸门复核

- 复核日期：2026-05-18
- 复核分支：`codex/review-b2-c08-l04-m01-video-gate`
- 复核对象：`content/manim/SH-HS-MATH-HJ-B2-C08-L04-M01/**`
- 写入范围：仅本报告；未修改 Manim 包本体、平台代码、课程图谱、backlog 或 generated files

## 结论

`SH-HS-MATH-HJ-B2-C08-L04-M01` 当前成片可保持 `video_ready`。视频主线已收束到“有向投影长度”：定 `b` 的正方向，从 `a` 的终点作垂线，读取投影点 `H` 在正方向、原点、反方向三种位置对应的正、零、负。画面未出现 `a dot b`、`theta`、`pi` 这类英文 fallback，也未提前展开完整数量积定义式或运算律。

视频产物完整：`mp4`、`webm` 和 poster 均存在且可解码；`mp4` 为 1920x1080、30fps、36.8 秒，符合平台对 30 到 45 秒课堂导入 Manim 的预期。poster 选在钝角负投影与末尾衔接画面，能代表主体内容。

平台状态层面，当前 `metadata.status: draft` 合理，应继续保持；当前 `platform_card.availability: video_ready` 也合理，因为 metadata 已补齐 `render_plan.phase: rendered`、`files.output_mp4`、`files.output_webm` 和 `files.poster`。不建议回退到 `metadata_ready`，也不建议 `hold_for_revision`。但本片仍只适合平台预览和教师观看复核，不应进入 `classroom_trial`、`release_candidate` 或 `published`。

## 复核依据

- 项目锚点文件：`docs/00-project-brief.md`、`docs/01-current-state.md`、`docs/02-next-actions.md`、`docs/git-workflow.md`、`docs/content-standards.md`、`docs/codex-collaboration-guide.md`、`docs/resource-factory-workflow.md`、`docs/parallel-quality-system.md`
- 课程图谱：`content/curriculum/index.yaml` 中 `SH-HS-MATH-HJ-B2-C08-L04`
- backlog：`content/production/resource-backlog.json` 中 `SH-HS-MATH-HJ-B2-C08-L04-M01`
- 资源文件：`metadata.yaml`、`README.md`、`storyboard.md`、`scene.py`、`review.md`
- 产物文件：`dist/final/SH-HS-MATH-HJ-B2-C08-L04-M01.mp4`、`.webm`、`-poster.png`
- 观看方式：`ffprobe` 读取媒体信息，`ffmpeg` 完整解码 mp4/webm，查看 poster，并抽帧复核锐角、直角、钝角和末尾衔接画面

## 视频数学口径

通过项：

- 主线聚焦 L04「向量的投影」，没有把任务提前变成 L05 的数量积定义课。
- 画面表达顺序清楚：`b` 的方向作为有向轴，`a` 的终点向轴作垂线，投影点 `H` 决定有向投影长度。
- 锐角、直角、钝角三段最终停帧分别对应 `H` 在正方向、与 `O` 重合、在反方向，符号结论正确。
- 数量积只在末尾以“下一课：用它理解数量积”作衔接，没有展示 `a·b = |a||b|cosθ` 或数量积运算律。
- 画面文字使用 `θ`、`cosθ`、`投影长度`、`有向投影长度`、`正方向`、`反方向`、`垂线`、`投影点 H` 等课堂表达；源码与文本检索未发现成片相关的 `theta`、`pi`、`a dot b` fallback。

注意项：

- 抽帧显示角度从锐角转到直角、从直角转到钝角的运动过程中，底部读数会短暂保留上一段说明；最终稳定停帧正确。教师讲解时建议在“直角：H 与 O 重合”或“钝角：H 在反方向”文字稳定后暂停，不建议在旋转过渡中间暂停。
- 末尾“有向投影长度 = |a|cosθ”适合作为 L04 到 L05 的轻量衔接；教师口播仍应明确完整数量积定义放到下一课。
- 第 8 章仍为 draft，`8.3` 边界仍待纸质教材或已登录 dolearning/上海数字教学平台终核；本视频通过不代表第 8 章进入发布链路。

## 视频产物检查

| 项目 | 结果 |
|---|---|
| mp4 | 存在；`h264`，1920x1080，30fps，36.800000 秒，约 1.2 MB；完整解码无错误输出 |
| webm | 存在；`vp9`，1920x1080，30fps，36.800000 秒，约 979 KB；完整解码无错误输出 |
| poster | 存在；PNG，1920x1080，约 271 KB；画面为钝角负投影与末尾衔接，主体明确 |
| 主画面 | 向量 `a` / `b`、垂线、投影点 `H`、有向投影线段和符号读数不互相遮挡，适合平台预览和课堂大屏 |
| 音频 | 未带音轨，符合教师现场口播型 Manim 导入的使用方式 |

## 平台接入状态

当前状态判断：

- `metadata.status: draft`：合理。资源仍未完成教师观看确认、课堂试读或总控发布判断。
- `render_plan.phase: rendered`：合理。实际产物已存在且可解码。
- `files.output_mp4` / `files.output_webm` / `files.poster`：合理。三项均指向 `dist/final/` 下稳定文件。
- `platform_card.availability: video_ready`：合理。平台可读取 video player 入口；不应回退为 `metadata_ready`。
- `content/production/resource-backlog.json` 中该资源也已聚合为 `availability: video_ready`，与 metadata 一致。

建议：

- 视频资产状态保持 `video_ready`。
- 顶层内容状态继续保持 `draft`。
- 审校状态最多作为“可进入教师观看/视频节奏复核队列”，不直接进入 `classroom_trial`、`release_candidate` 或 `published`。

## 建议状态

- 视频内容：通过本轮质量闸门，不建议 `hold_for_revision`。
- 平台可用性：保持 `video_ready`。
- 顶层内容状态：继续保持 `draft`。
- 教研状态：仍需教师观看确认课堂语言、暂停点和末尾数量积衔接。
- 禁止升级：`classroom_trial`、`release_candidate`、`published`。

## 剩余风险

1. 教师需确认“有向投影长度”是否符合本校课堂语言；若习惯说“向量在某方向上的投影”，口播中应补一句“这里读的是有方向符号的长度”。
2. 旋转过渡中底部读数会短暂保留上一段说明，建议教师只在文字稳定后的锐角、直角、钝角停帧暂停讲解。
3. 末尾数量积衔接虽然未越界展开定义，但建议教师播放到最后一句时明确“完整定义下一课处理”。
4. 第 8 章课时边界仍需人工终核；本报告只建议视频资产和平台预览状态，不建议发布链路状态。

## 验证记录

已运行：

- `python3 -m py_compile content/manim/SH-HS-MATH-HJ-B2-C08-L04-M01/scene.py`：通过，无错误输出。
- `npm run validate:content`：通过。输出 `Content validation passed: 70 lessons, 14 applet(s), 4 Manim clip(s), 7 diagnosis package(s).`
- `npm run verify`：通过。内容校验、backlog 生成、32 项 node test 和 Vite build 均通过；Vite 仍提示单个 chunk 超过 500 kB，这是既有构建体积提示，不指向本资源。

生成文件检查：

- `npm run verify` 执行了 `generate:backlog` 与 `generate:content`。
- 验证后检查工作区，未发现 `content/production/resource-backlog.json` 或 `apps/web/src/data/workspace-data.json` diff。

## 本轮未做事项

- 未重新渲染视频。
- 未修改 `content/manim/SH-HS-MATH-HJ-B2-C08-L04-M01/**`。
- 未修改 `content/curriculum/index.yaml`。
- 未修改 `content/production/resource-backlog.json`。
- 未修改 `apps/web/src/data/workspace-data.json`。
- 未修改平台代码或其他 Applet / Manim / Diagnosis 包。
