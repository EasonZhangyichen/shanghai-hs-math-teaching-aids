# 必修第二册第 8 章“平面向量”来源核对记录

核对日期：2026-05-07  
工作分支：`track/curriculum-map`  
核对对象：`content/curriculum/index.yaml` 中 `SH-HS-MATH-HJ-B2-C08`

## 本轮范围

- 只核对目录、课时标题、资源标题和可记录的学习要点线索。
- 不制作资源包，不 scaffold，不复制平台课件、教案或视频正文内容。
- 不凭外地教材、通用知识顺序或个人推断补课时。
- 本轮未改动课程图谱 YAML；当前记录用于后续纸质教材和 dolearning 登录态终核。

## 来源优先级与可访问性

| 优先级 | 来源 | 本轮访问结果 | 结论 |
| --- | --- | --- | --- |
| 1 | 沪教版普通高中数学必修第二册纸质教材 | 本地工作区未提供纸质教材照片或扫描件 | 仍需人工终核课时划分、课时数和标题表述 |
| 2 | dolearning.net 上海数字教学/备课资源平台沪教版必修第二册目录 | `https://dolearning.net/lesson` 重定向到登录页；根域跳转到公开介绍页；未取得登录态目录 | 不能把本轮抓取结果视作 dolearning 目录确认；需登录后复核左侧目录 |
| 3 | 上海智慧教育平台/上海市数字教育平台其他官方资源 | 本轮未获取到可直接确认 B2-C08 课时目录的公开页面 | 暂无可用官方补强证据 |
| 4 | 国家智慧教育平台精品课目录 | 搜索结果片段可作辅助线索；部分传课 PDF 直连返回访问受限 | 只能辅助判断，不高于 dolearning 与纸质教材 |
| 5 | 电子课本网、知海、StudyLib、教习网等 secondary cross-check | 可见公开目录或搜索片段 | 只能用于交叉核对章/节/小节标题，不作为最终课时划分依据 |

## 本轮证据摘记

| 来源 | 可记录证据 | 可信等级 | 备注 |
| --- | --- | --- | --- |
| `https://dolearning.net/` | 访问根域会转到公开介绍站点 `about.dolearning.net`，不是备课目录页 | 官方域名访问状态 | 只能说明公开入口形态，不能确认教材目录 |
| `https://dolearning.net/lesson` | 返回到 `passport/login` 登录流程 | 官方域名访问状态 | 说明备课目录需要登录态 |
| `https://dolearning.net/passport/login` | 登录页标题为“尚学趣学习平台” | 官方域名访问状态 | 未登录，未读取备课内容 |
| `https://www.zhihailib.com/book/258430/` | 搜索片段显示第 8 章为“平面向量”，8.1 至 8.4 为“向量的概念和线性运算”“向量的数量积”“向量的坐标表示”“向量的应用” | secondary cross-check | 可辅助确认章/节主干 |
| `https://www.haoduoyun.cc/book/hjb/shuxue/cr2c.shtml` | 搜索片段显示同一章/节主干 | secondary cross-check | 可辅助确认 8.1 至 8.4 标题 |
| `https://www.jiaoshizj.com/k/3040.html` | 搜索片段显示 8.1.1 至 8.3.4 等小节标题 | secondary cross-check | 与当前 YAML 的 8.3 四个小节一致，但低于 dolearning 与纸质教材 |
| 国家智慧教育平台传课目录相关公开片段 | 片段出现 8.3.4“向量数量积与夹角的坐标表示”等线索 | auxiliary reference | 仅作辅助；直连文件访问受限，未记录正文内容 |

## 章/节核对

| YAML 项 | 当前标题 | 来源证据 | 核对状态 | 疑点 |
| --- | --- | --- | --- | --- |
| `B2-C08` | 平面向量 | secondary cross-check 与辅助片段均支持该章标题 | 暂时确认主干，等待纸质教材/dolearning 终核 | 无新增疑点 |
| `8.1` | 向量的概念和线性运算 | secondary cross-check 支持该标题 | 暂时确认主干，等待 dolearning 左侧目录复核 | 无新增疑点 |
| `8.2` | 向量的数量积 | secondary cross-check 支持该标题 | 暂时确认主干，等待 dolearning 左侧目录复核 | 无新增疑点 |
| `8.3` | 向量的坐标表示 | secondary cross-check 支持该标题 | 节标题暂时确认；课时拆分未确认 | 用户说明的 dolearning 截图显示为“8.3 向量的坐标表示（1）（2）（3）”，与当前 YAML 的 8.3.1 至 8.3.4 四小节拆法存在待核对差异 |
| `8.4` | 向量的应用 | secondary cross-check 支持该标题 | 暂时确认主干，等待 dolearning 左侧目录复核 | 无新增疑点 |

## 当前课时拆分核对

| YAML 课时 | 当前 `textbook_ref` / 标题 | 本轮来源核对 | 建议 |
| --- | --- | --- | --- |
| `L01` | `8.1.1` 向量的概念 | secondary cross-check 支持该小节标题 | 暂不调整，待纸质教材/dolearning 终核 |
| `L02` | `8.1.2` 向量的加法和减法 | secondary cross-check 支持该小节标题 | 暂不调整 |
| `L03` | `8.1.3` 实数与向量的乘法 | secondary cross-check 支持该小节标题 | 暂不调整 |
| `L04` | `8.2.1` 向量的投影 | secondary cross-check 支持该小节标题 | 暂不调整 |
| `L05` | `8.2.2` 向量的数量积的定义与运算律 | secondary cross-check 支持该小节标题 | 暂不调整 |
| `L06` | `8.3.1` 向量基本定理 | secondary cross-check 与辅助片段支持该小节标题 | 暂不调整；重点等待 dolearning 登录态目录确认 |
| `L07` | `8.3.2` 向量的正交分解与坐标表示 | secondary cross-check 与辅助片段支持该小节标题 | 暂不调整；重点等待 dolearning 登录态目录确认 |
| `L08` | `8.3.3` 向量线性运算的坐标表示 | secondary cross-check 与辅助片段支持该小节标题 | 暂不调整；重点等待 dolearning 登录态目录确认 |
| `L09` | `8.3.4` 向量数量积与夹角的坐标表示 | secondary cross-check 与辅助片段支持该小节标题 | 暂不调整；若 dolearning/paper 确认 8.3 只有三课时，需要再决定是否合并或改为平台课时标题 |
| `L10` | `8.4` 向量的应用 | secondary cross-check 支持该节标题 | 暂不调整 |

## 8.3 专项判断

当前 YAML 将 8.3 拆为四个 `textbook_ref`：`8.3.1`、`8.3.2`、`8.3.3`、`8.3.4`。低优先级公开目录片段支持这四个小节标题；但用户提供的 dolearning 截图线索显示左侧目录为“8.3 向量的坐标表示（1）（2）（3）”。

本轮不能确认这两者的关系。可能情形包括：

1. 纸质教材有四个小节，dolearning 把备课资源按三个课时包重组。
2. 纸质教材或 dolearning 最新目录实际是三课时，当前 YAML 的四小节拆分需要调整。
3. dolearning 截图中的“（1）（2）（3）”只是某类资源的课时标题，不等同于教材小节编号。

因此，本轮不改动 `content/curriculum/index.yaml`。下一次需要用纸质教材或已登录 dolearning 左侧目录逐项确认：

- “向量基本定理”是否在 dolearning 8.3 下单列；
- “向量的正交分解与坐标表示”和“向量线性运算的坐标表示”是否被合并进同一课时；
- “向量数量积与夹角的坐标表示”是否作为第三课时、第四小节，或资源标题存在。

## 后续处理建议

- 在取得纸质教材照片或 dolearning 登录态截图前，B2-C08 的 YAML 可保持当前四小节结构，但核对状态应继续视为未终核。
- 若纸质教材和 dolearning 均确认 8.3 为三课时，应另开课程图谱修订任务，只调整 B2-C08 课时结构和对应 backlog，不顺手制作资源。
- 若纸质教材确认 8.3.1 至 8.3.4，而 dolearning 仅按三课时组织资源，应在 YAML 中保留教材小节，并在来源说明里标注 dolearning 是平台课时分组。
