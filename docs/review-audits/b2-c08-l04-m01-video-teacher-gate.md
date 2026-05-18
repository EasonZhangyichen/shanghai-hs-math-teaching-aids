# B2-C08-L04-M01 教师观看闸门复核

- 复核日期：2026-05-18
- 复核分支：`codex/review-b2-c08-l04-m01-video-teacher-gate`
- 复核对象：`SH-HS-MATH-HJ-B2-C08-L04-M01`「投影有向长度导入动画」
- 写入范围：仅本报告；未修改课程图谱、backlog、平台生成数据、平台源码、资源包或视频文件本体

## 结论

本轮建议保持 `video_ready`，并进入内部 `teacher_watch_ready` 教师观看确认队列。资源顶层仍应保持 `draft`，第 8 章课时边界未终核前不得进入更高发布链路。

成片主线聚焦「有向投影长度」：先把 `b` 的方向作为有向轴，再从 `a` 的终点作垂线，读取投影点 `H` 在正方向、原点、反方向三种位置对应的正、零、负。抽帧、`scene.py`、`storyboard.md` 和 metadata 口径一致，未出现 `a·b = |a||b|cosθ` 这类完整数量积定义式，也未讲数量积运算律或应用。

平台入口口径一致：`metadata.yaml` 已有 `render_plan.phase: rendered`、`files.output_mp4`、`files.output_webm`、`files.poster` 和 `platform_card.availability: video_ready`；`content/production/resource-backlog.json` 与 `apps/web/src/data/workspace-data.json` 也聚合为 `video_ready` 视频预览入口。

## 复核依据

- 项目锚点：`docs/00-project-brief.md`、`docs/01-current-state.md`、`docs/02-next-actions.md`、`docs/git-workflow.md`、`docs/content-standards.md`、`docs/codex-collaboration-guide.md`、`docs/parallel-quality-system.md`、`docs/resource-factory-workflow.md`
- 课程图谱：`content/curriculum/index.yaml` 中 `SH-HS-MATH-HJ-B2-C08-L04`
- 资源包：`metadata.yaml`、`README.md`、`storyboard.md`、`scene.py`、`review.md`
- 平台聚合：`content/production/resource-backlog.json`、`apps/web/src/data/workspace-data.json`
- 产物检查：`ffprobe` 媒体信息、`ffmpeg` 完整解码、视频抽帧 contact sheet、poster 文件信息

## 教学内容检查

通过项：

- 只建立「有向投影长度」直觉，没有提前完整讲数量积定义。
- 锐角停帧为 `H` 在正方向，读数 `投影长度 = |a|cosθ > 0`。
- 直角停帧为 `H` 与 `O` 重合，读数 `投影长度 = 0`。
- 钝角停帧为 `H` 在反方向，读数 `投影长度 = |a|cosθ < 0`。
- 末尾文字为「本课收束 / 有向投影长度 = |a|cosθ / 下一课：用它理解数量积」，属于轻量衔接，不构成 L05 数量积定义教学。
- 画面数学符号使用 `a`、`b`、`θ`、`cosθ`、`|a|cosθ`、`O`、`H`，未见 `theta`、`pi` 或英文 fallback。

教师观看建议：

- 本视频没有内置音轨，更适合教师现场口播。建议教师口播时明确一句：「这里读的是有方向符号的长度，不是普通非负线段长。」
- 建议在垂线和投影点 `H` 出现后暂停，追问「如果只看普通线段长，哪里会丢掉方向信息？」
- 建议在直角或钝角文字稳定后暂停，追问「为什么变成钝角后，不只是长短变化，而是符号变成负？」
- 最后一屏应只作为下一课提示，教师口播需明确完整数量积定义放到后续 `SH-HS-MATH-HJ-B2-C08-L05`。

## 视频产物检查

| 项目 | 结果 |
|---|---|
| mp4 | 存在；`h264`，1920x1080，30fps，36.800000 秒；完整解码无错误输出 |
| webm | 存在；`vp9`，1920x1080，30fps，36.800000 秒；完整解码无错误输出 |
| poster | 存在；PNG，1920x1080，8-bit RGB |
| 音轨 | 未发现音频流，符合教师现场口播型导入动画用法 |

## 平台入口检查

- `metadata.status: draft`：合理，仍不代表数学审校、教师观看和课堂使用全部通过。
- `compliance.review_status: self_checked_draft`：合理，本轮只做教师观看闸门复核，不直接改资源状态字段。
- `render_plan.phase: rendered`：与实际 mp4/webm/poster 存在且可解码一致。
- `platform_card.availability: video_ready`：与 `files.output_mp4`、`files.output_webm`、`files.poster` 一致。
- 平台聚合数据中该资源的 `availability` / `implementationStage` 均能读到 `video_ready`，并含 webm、mp4、poster 路径；未发现 metadata 与平台预览说明不一致。

## 建议状态

- 视频入口：保持 `video_ready`。
- 教师观看：建议进入内部 `teacher_watch_ready` 队列。
- 顶层资源：继续保持 `draft`，本分支不修改 metadata。
- 发布链路：第 8 章课时边界未终核前不得进入 `release_candidate`；本轮不建议 `published`。

## 剩余风险

1. 第 8 章课时划分和 8.3 边界仍需纸质教材或已登录 dolearning/上海数字教学平台终核，本报告不解决课程图谱终核问题。
2. `|a|cosθ` 在 L04 作为投影长度表达是合适的，但教师口播必须避免顺势写出完整数量积定义式。
3. 旋转过渡中底部说明会短暂保留上一状态，教师应在文字稳定后的锐角、直角、钝角停帧暂停。
4. 尚需真实教师在课堂节奏中观看确认：36.8 秒长度、两处暂停点和末尾衔接是否符合本校授课习惯。

## 验证记录

已运行：

- `python3 -m py_compile content/manim/SH-HS-MATH-HJ-B2-C08-L04-M01/scene.py`
- `npm run validate:content`
- `npm run verify`

验证结果：

- `py_compile` 通过。
- `validate:content` 通过。
- `verify` 通过；内容校验、backlog 生成、平台内容生成、Node 测试和 Vite 构建均完成。Vite 仍有单个 chunk 超过 500 kB 的既有体积提示，不指向本报告。

## 改动范围声明

- 未修改 `content/curriculum/index.yaml`。
- 未修改 `content/production/resource-backlog.json`。
- 未修改 `apps/web/src/data/workspace-data.json`。
- 未修改 `content/manim/SH-HS-MATH-HJ-B2-C08-L04-M01/**`。
- 未修改平台源码、其他资源包或视频文件本体。
