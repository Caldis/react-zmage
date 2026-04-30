# 复杂动画与交互问题分析框架

> 一套针对动画与交互 bug 的系统性调试方法论。
> 提炼自 react-zmage flip 模块连续两波 bug 修复 (2026-04-29 ~ 2026-04-30) 的实战经验。
>
> 适用场景: React/Vue 等组件库内部动画路径、CSS transition / animation 与 JS 状态机交互、
> 用户感知到"看起来不对"但代码层面"逻辑正确"的视觉 bug。
>
> 不适用: 单一函数返回值错、网络请求失败、明显的 null deref 等纯逻辑问题。

---

## 0. 为什么动画 bug 需要专门的方法论

普通 bug 调试可以"读代码 → 找 bug → 改代码"。动画 bug 不能,因为:

| 动画 bug 的特性 | 调试影响 |
|---|---|
| **视觉是真理** | 代码逻辑可以"完全正确"而用户感知"完全错误"。所有自动化测试加起来不能替代一次人工肉眼验收 |
| **跨子系统** | React state ↔ React render ↔ React commit ↔ DOM mutation ↔ CSS recalc ↔ CSS transition ↔ CSS animation ↔ 浏览器 paint。任意两层错位都会产生视觉 bug |
| **帧级时序** | 一帧 (16ms) 内事件顺序决定动画是否触发。componentDidUpdate 在 commit 之后、paint 之前的窗口决定能否中断 transition |
| **多视觉源叠加** | 同一元素可能同时有 React 写入的 inline style、命令式 DOM mutation、CSS class 应用的样式、`@keyframes`、`transition`,每条都可能成为调试盲区 |
| **jsdom 不忠实** | jsdom 不跑 CSS 动画,WAAPI stub 残缺,RAF 用 setTimeout 模拟。**单测通过 ≠ 用户视觉正确** |
| **修复反向 bug** | 一个简单的"禁用所有动画"修复,可能在杀掉 bug 的同时杀掉合法动画。**反向 bug 比原 bug 更难发现** |

## 1. 核心理念 (4 条)

### 1.1 视觉是真理 — 用户描述优先于代码推理

用户说"图 4 出现时有缩放动画"是事实陈述。code review 看到的"transform 数值正确"是无关。

**实操**:
- 第一手记录用户原话 (含口语化描述)
- 任何方案设计前,先确认能完全复现用户描述的视觉
- 自动化测试只是"非视觉部分"的回归保护,不是验收依据

### 1.2 数据竞态优先于视觉黑客

视觉 bug 看似在"动画层",根因往往在"数据层"。先排查数据是否在错的时序到位,再考虑视觉补丁。

**反例**: 看到 scale 在切页时跳变,首先想到的是"加个 transition: none 抑制动画"。这是黑客。
**正例**: 追问"为什么这一帧 scale 是错的?",发现 dims 状态没及时到位,才是根因。

视觉黑客修出来的 bug 往往拽出反向 bug (见本框架 §3.4 "陷阱信号识别")。

### 1.3 多角色独立审视 + 信心校准

任何复杂方案,**单线程思维有死角**。固化以下三角色:
- **Investigator** — 找根因,不提方案
- **Solution Architect** — 列方案,不实施
- **Red Team** — 找方案的失败模式,不接受 generic 论证

并在落地前**显式列出每个组件的把握度** (HIGH/MED/LOW),让用户基于真实 uncertainty 决策。

### 1.4 既有 pattern 复用 ≫ 发明新机制

如果代码库已有 `setNodeTransitionNone` 命令式 helper,新增的"中断动画"逻辑应该用同一 helper,不要发明新 helper。这降低维护负担、继承既有的 cleanup 不变量、让 reviewer 上下文负担最小。

---

## 2. 五阶段流程

```
症状捕获 ──▶ 机制定位 ──▶ 方案枚举 ──▶ 红队验证 ──▶ 落地与人工验收
   ↑                                                     │
   └─────── 用户视觉验收失败时回到任意上游阶段 ───────────┘
```

每阶段都可能因发现新事实**回到上游**。这是 feature,不是 bug — 不要为了"线性推进"而吞下半生不熟的方案。

### 2.1 阶段一: 症状捕获

**目标**: 用最少假设把用户描述固化为可验证的"复现路径 + 视觉断言 + 反向情况"。

**活动**:

1. **复现路径精确化**:
   - 数据集是什么 (N=多少, src 列表, AR 比例)
   - 触发动作序列 (点击什么按钮 / 用什么手势 / 是否经过中间状态)
   - 预期行为 vs 实际行为 (用户语言)

2. **反向情况捕获** ★ 关键
   - "什么情况下不发生?"
   - "什么相邻情况下表现不同?"
   - 例: "1→4 有动画 bug, 但 1→5 和 1→6 都没有" — 这种"邻接对比"是机制定位的金钥匙
   - 例: "首次切换有动画, 二次切换没有" — 状态在一次切换中被改变

3. **陷阱信号识别** ★★ 关键
   - "之前有人尝试修过吗? 修出了什么副作用?"
   - 用户给出"反向 bug 描述" (如"首次没动画二次有") 是金矿
   - 这告诉你**哪类方案已经验证错误**,直接砍掉一片解空间

**交付物**: 一份"用户原话 + 复现步骤 + 反向情况清单 + 已知失败方案"的简表。

**反模式**:
- ❌ 跳过反向情况,直接读代码找 bug → 容易抓住表面机制错过深层共性
- ❌ 接受"应该是 XX 模块的问题"的笼统假设 → 让后续聚焦窗口太窄

### 2.2 阶段二: 机制定位

**目标**: 把症状映射到代码 + 渲染管线的具体 step。**输出"为什么会发生"的完整链路**,不止"在哪发生"。

**活动**:

1. **渲染管线分层追踪**:
   - 从用户操作开始: event handler → setState → React reconcile → React commit (DOM mutation) → cdU → 浏览器 layout → CSS recalc → CSS transition queue → paint
   - 每一步问: 这一步发生了什么? 我们的 state / props / DOM / class / inline style 是什么值?
   - 关键节点: **React commit 之后、浏览器 paint 之前**是命令式干预的最后窗口 (cdU)

2. **CSS 子系统区分** ★
   - `transition` 与 `animation` 是**两个独立子系统**,不会互相影响
   - inline `transition: 'none'` 不会停止 `animation`
   - `animation-name: none` 不会停止 `transition`
   - 这条是动画 bug 调试的"洗水板技能",忘记会导致严重误诊

3. **共性挖掘** ★
   - 多个症状?试着列出"统一的机制" — 单变量解释多症状
   - 例: 三个 issue (扫掠 / 跳页静默 / 跳页应该 fade) 都根源于 `pageWithStep` 的累加方式控制 React key 对齐
   - 找到共性后,方案空间天然收窄

4. **手算验证 (Hand-trace)** ★★ 关键
   - 任何关于"X case 是否会触发"的论证,必须手算至少 3 个具体例子
   - 例: 验证"Math.sign cap 不会撞 src" → 手算 N=4/6/10 三个 case 的 React key 集
   - **不要相信 generic argument**,只信能列具体值的 trace

**交付物**: 一份"事件 → state 变化 → DOM 变化 → 视觉效果"的逐帧时序表 + 多症状的共性 hypothesis。

**反模式**:
- ❌ 直接看 React state 跳过 CSS 子系统区分 → 漏掉 transition vs animation 独立性
- ❌ 接受"应该不会发生" → 必须手算具体 case
- ❌ 在符号层面争论而不落到具体值 → 容易陷入循环

### 2.3 阶段三: 方案枚举

**目标**: 列出至少 4-6 个候选方案,**包括明确不能用的**,然后基于约束筛选。

**活动**:

1. **方案分类轴**:
   - **数据层** (修复 state 时序): 预加载、同步取值、状态前置
   - **视觉层** (CSS / 命令式干预): transition 抑制、class 应用、命令式 DOM
   - **结构层** (改架构): 抽 motionPhase、改 React key 策略、引入新组件

2. **强制列出 anti-solutions**:
   - "这个方案为什么不行?" 写出来
   - 防止 reviewer 重提已被排除的方案
   - 例: "全域 `new Image()` 预热" 违反 lazy-load,**显式列为不可用**

3. **架构不变量对齐**:
   - 翻 CLAUDE.md / AGENTS.md,列出每个项目特有的不变量
   - 本项目: "All cleanup must be cancelable" / "No module-level mutable state" / "react-dom/client via runtime require"
   - 每个候选方案逐条 check
   - 不通过的方案**砍掉**或**显式记录违反原因**

4. **既有 pattern 复用度评分**:
   - 与 zoom-follow / closing-follow / setNodeTransitionNone 等既有 pattern 的相似度
   - 高相似度 = 低维护成本 = 优先级高

5. **方案矩阵**:
   ```
   | # | 方案 | 解决 Issue 1 | 解决 Issue 2 | LOC | 风险 | 与既有 pattern |
   ```
   一表对比,让权衡显式。

**交付物**: 方案矩阵 + 推荐方案 + 明确的"为什么不选其他"理由。

**反模式**:
- ❌ 只想出 1-2 个方案就推荐 → 覆盖不全
- ❌ 不写 anti-solutions → 后续讨论会重新走老路
- ❌ 不对齐架构不变量 → 上线后被既有不变量反噬

### 2.4 阶段四: 红队验证

**目标**: 用"对抗性视角"找推荐方案的失败模式,在落地前堵漏。

**活动**:

1. **独立 agent / 独立思维**:
   - 不要让方案设计者自己审自己 — 视角已经被框定
   - 红队的输入应该是: "这是方案,这是约束,你的任务是找 break case"

2. **必查清单**:
   - **新方案与既有 pattern 的交互**: 加新 RAF 会和现有 RAF 冲突吗?新 timer 会和 closing path 冲突吗?
   - **rapid-fire 操作**: 用户连续点击 / 连续翻页 / 连续开关 — 状态机是否仍正确?
   - **生命周期**: cWU 时新引入的资源是否被 cancel?StrictMode 双 mount 是否泄漏?
   - **边界 N 值**: N=0/1/2/小型集 是否退化正确?N=很大时性能?
   - **cross-mode 交互**: flip='none' / animate=false 等"特殊模式"是否绕过了你的修复?

3. **Generic claim 验证**:
   - 红队发现"X 在 case Y 会失败"时,不要 take it at face value
   - 让原方案设计者**手算**该 case
   - 50% 概率是误报 (我们这一波架构师的 "Math.sign cap 撞 src" 就是误报)
   - 50% 概率是真问题,加固方案

4. **测试盲区扫描**:
   - 哪些行为不能在 jsdom 中验证?(CSS animation 实际播放、真正的 paint、跨浏览器差异)
   - 这些必须在"人工视觉验收"清单里显式标出

**交付物**: 红队报告 + 加固后的方案 + 必须人工验收的清单。

**反模式**:
- ❌ 红队报告的所有问题都接受 → 没有过滤,方案被过度设计
- ❌ 红队报告的所有问题都拒绝 → 没有自省,真问题漏掉
- ❌ 跳过红队 → 方案上线后用户充当红队 (代价最高)

### 2.5 阶段五: 落地与人工验收

**目标**: 实施方案 + 多层验证 + 显式信心校准 + 移交人工视觉验收。

**活动**:

1. **实施前 commit hygiene**:
   - 确认工作区干净 (`git status --short`)
   - 在 master 还是 worktree?(默认: 多步骤改动用 worktree;一次性的细节修复在 master 也行,但要明确)
   - 准备的 commit message 是否能让未来的 git blame reviewer 一眼明白?

2. **测试金字塔**:
   ```
   L1 单元测试 (utils 纯函数)         — 100% 必跑, 数学正确性
   L2 集成测试 (vitest jsdom)         — 锁 React state + DOM 行为
   L3 类型 + 构建 (tsup + tsc)        — 编译期保证
   L4 跨版本沙盒 (pnpm -w run check) — r17/r18/r19/nextjs SSR smoke
   L5 人工视觉验收 (real browser)    — ★ 唯一能验证视觉的层
   ```
   **L5 永远不能被自动化替代**。Agent 必须在落地报告中明确"等待人工验收"。

3. **信心校准模板** ★★ 关键
   ```
   维度          把握度  依据
   ---------------------------------
   数学正确性    HIGH    手算覆盖 N=4/6/10
   架构合理性    HIGH    复用既有 pattern
   测试可重复性  MED-HI  jsdom timer 编排可能要 1-2 次试
   视觉满意度    MED     "瞬移消失 + 渐显" 可能不是用户期望的真 crossfade
   ```
   **在落地前**给用户看,让用户基于真实把握度决定是否前进。

4. **失败回滚预案**:
   - branch 保留作回退保险 (除非显式合并到 master)
   - worktree 保留作 diff 对比
   - commit 拆分到适合 revert 的粒度 (即"一个 commit 解决一个独立 concern")

**交付物**:
- 一个或多个 commits
- 测试通过 evidence (paste tail)
- 信心校准表
- 给用户的视觉验收清单 (具体哪些场景要重点试)

**反模式**:
- ❌ 自动化测试通过就声称"修复完成" → 视觉 bug 没法被自动测试覆盖
- ❌ 把多个 concern 塞一个 commit → 难 revert
- ❌ 不给用户验收清单,让用户自己想该试什么 → 容易漏覆盖

---

## 3. Multi-Agent 协作模板

### 3.1 角色与 prompt 设计要点

| 角色 | 关键约束 | prompt 必含 |
|---|---|---|
| **Investigator** | 不提方案,只取证 | 用户原话 + 已知症状 + 待验证假设 + 期望输出格式 (file:line trace) |
| **Solution Architect** | 不实施,列方案矩阵 | investigator 输出 + 硬约束清单 + anti-solutions 提示 |
| **Red Team** | 对抗性,找失败模式 | 推荐方案 + 实施草图 + "你的任务是 break it" + 必查清单 |
| **Implementer** | 严格按方案实施 + TDD | 方案完整版 + 文件路径 + step-by-step + 不允许 over-engineer |

### 3.2 通用 prompt 骨架

```
You are [ROLE].

## Working dir
[path]

## Context (concrete facts already established)
[user's words / previous findings / file:line refs]

## Your specific task
[narrow scope, exclude what's NOT your job]

## Constraints (hard)
- [each constraint as one line, e.g. "no preloading"]

## Output format
[exact structure expected — table / matrix / pseudocode]

## Anti-patterns to avoid in your output
- [explicit list of "do not propose X / do not investigate Y"]
```

### 3.3 串行 vs 并行

- **探查类任务 (investigator)**: 串行,后续依赖前面发现
- **验证类任务 (architect, red-team)**: 可并行,互相 challenge
- **实施类任务 (implementer)**: 串行,有顺序依赖

### 3.4 Agent 输出的处理原则

- **不全盘接受**: 任何 agent 的 generic claim 都需手算验证
- **不全盘拒绝**: 即便看似错误,先理解为什么 agent 这样想
- **保持选择权**: agent 给方案,人 (controller / user) 做选择
- **追加信心标注**: 把 agent 输出 normalize 到"哪些把握高 / 哪些不确定"

---

## 4. 动画专用知识库

### 4.1 渲染管线时序 (React + 浏览器)

```
用户事件 (click / keydown)
    │
    ▼
event handler 同步代码 (setState 调用)
    │
    ▼
React reconciler (Virtual DOM diff)
    │
    ▼
React commit (DOM mutation: 设 inline style, classList 等)
    │  ★ 此处 inline style 的旧值与新值差异 → 触发 transition queue
    ▼
componentDidUpdate (cdU) 同步执行 ★ 命令式干预的窗口
    │  ★ 此处可以再 setNode... 改 inline style, 抢在 paint 前撤销 transition
    ▼
浏览器 layout / style recalc
    │
    ▼
浏览器 paint (用户看到的第一帧)
    │
    ▼
后续帧: CSS transition / animation 推进
```

**关键洞察**:
- cdU 是 React 给我们的"最后干预窗口"。在此修改 inline style 可以让浏览器在 paint 前重新决策
- `requestAnimationFrame` 调度的回调在 paint 之后下一帧执行,**不能用于干预当前 commit 的 transition**
- 想"snap to end value"取消 transition: cdU 中 `style.transition = 'none'` (在 paint 前生效)
- 想"延迟一帧再执行": `requestAnimationFrame`

### 4.2 CSS transition vs animation 差异表

| 维度 | CSS transition | CSS animation (`@keyframes`) |
|---|---|---|
| 触发 | 属性值变化 | 元素挂上有 `animation-name` 的 class |
| 终止方式 1 | `transition-property: none` 立即取消, snap 到当前 target | `animation-name: none` 立即取消, **不 snap**, 跳回基础样式 |
| 终止方式 2 | 设置 inline `transition: 'none'` 取消所有属性 transition | 设置 `animation: none` 仅影响该元素 |
| 互不影响 | inline `transition: 'none'` ❌ 不影响 animation | `animation-name: none` ❌ 不影响 transition |
| 中间值检测 | `getComputedStyle()` 返回插值后的实际值 | 同 |
| 重启 | 仅当属性值再次变化时 | 移除 class + 强制 reflow + 重新加 class |

**实战教训** (本项目): 我们的 scale 校准 interrupt 用 `setNodeTransitionNone` 写 `transition: 'none'`。后来加跳页 fade-in 时,如果用 CSS transition 实现,会被 interrupt 杀掉。改用 CSS `@keyframes` 实现,因为是独立子系统,**完全不冲突**。

### 4.3 jsdom 测试边界

| 能在 jsdom 测的 | 不能在 jsdom 测的 |
|---|---|
| inline style 字符串值 (`element.style.transition === 'none'`) | CSS transition 实际是否播放 |
| classList 增删 (`classList.contains('jumpFadeIn')`) | CSS animation 实际帧 |
| DOM identity (`newNode === oldNode`) → 验证 React key 复用 | `getComputedStyle()` 真实值 (jsdom 返回的是最后 inline 值) |
| setTimeout / requestAnimationFrame 调度 (用 vi.useFakeTimers 或真定时器) | 跨浏览器差异 |
| onLoad 事件 (用 `fireEvent.load` 手动触发) | 真实图片解码时序 |

**测试断言原则**: 断**确定性产物** (className, DOM identity, style 字符串),不断**视觉中间值** (实际渲染的 opacity 数值)。

### 4.4 React key 复用机制

React 在同 parent 下用 `key` prop 决定节点复用:
- 同一 parent 在两次 render 中,如果某个子节点的 key 在两次 render 中都存在,React 复用同一 DOM 节点,只更新 props
- key 不同 = unmount + mount

**动画影响**:
- 复用节点的 inline style 变化 → CSS transition 在新旧值之间插值
- 全新 mount 节点没有"旧值",CSS transition 不触发 (除非在 mount 后再变值)

**实战教训** (本项目): `imageIndexWithStep + src` 作为 key 的设计巧妙在于步进翻页 (step+1) 时新 center 与旧 step+1 side 共享 key,自动获得 slide-in 动画。但跳页 (step+5) 时这种"自动复用"反而失效,导致跳页无动画。修复需要 **额外控制 pageWithStep 的累加方式**才能让 key 集合行为符合直觉。

---

## 5. 信心校准模板

落地前对方案做四维度评分,呈现给用户决策:

```markdown
| 维度 | 评分 | 依据 / 风险 |
|---|---|---|
| 数学/算法正确性 | HIGH 90-100% | [手算覆盖 case 列表] |
| 架构合理性 | HIGH 90-100% | [与既有 pattern 的相似度] |
| 测试可重复性 | MED 70-90% | [可能要 1-2 次 timer 编排迭代] |
| 视觉满意度 | LOW-MED 50-80% | [明确 trade-off, 等用户验收] |
| 单测+构建一次过把握 | [%] | [基于上面四项综合] |
| 视觉验收一次过把握 | [%] | [永远 < 100%, 因为只有人能判断] |
```

**关键原则**:
- 不要为了显得"专业"虚报 HIGH。LOW 是诚实的反馈
- 对每个 LOW/MED 项,提供 mitigation 与 fallback
- 在 commit 前给用户看,让用户基于真实把握度决定

---

## 6. 动画 bug 反模式 (本项目踩过的坑)

| 反模式 | 典型表现 | 应该怎样 |
|---|---|---|
| **全域预加载** | 在 viewer 打开时 `new Image()` 加载整个 set | 违反 lazy-load 契约。改用 onLoad 反应式触发 |
| **Blanket transition 抑制** | "页变化就 `transition: none`" | 杀掉所有合法 flip 动画。改用精准条件 (page change AND dim 未知 AND show=true) |
| **修复后不验证反向 case** | 改完 Bug 1 不试"是否产生反向 Bug 2" | 红队阶段强制查"反向 bug 信号" |
| **接受 generic argument** | "X 应该不会发生" | 手算具体 case |
| **跳过用户视觉验收** | "测试全过 = 完成" | 视觉 bug 必须人工验收 |
| **方案与既有 pattern 不一致** | 加新 motionPhase 而不是复用 setNodeTransitionNone | 优先复用,降低维护成本 |
| **多 concern 一个 commit** | "fix everything in one commit" | 一个 concern 一个 commit, 方便 revert |
| **不写 anti-solutions** | 只列推荐方案 | 显式记录"为什么不选 X",防 reviewer 走老路 |
| **timer 没 cleanup** | 加 setTimeout / RAF 没在 cWU cancel | 违反"All cleanup must be cancelable" |

---

## 7. 案例: react-zmage flip 模块连续两波修复

本框架提炼自以下两波修复,可作为本框架的具体实例参考。

### 7.1 第一波: scale 校准 transition 中断 (commit 0664d82)

- **症状**: `flip='none'` 切不同 AR 图首次有缩放动画;`flip='swipe'` 跳页 1→4 新图有缩放动画
- **根因**: `imageDimensions[page]` 在新 center mount 时未知 → centerScale fallback 到上一页 → onLoad 后异步 setState → CSS transition 产生 350ms 缩放动画
- **失败方案** (前次会话遗留): blanket `transition: none` → 反向 bug "首次切换无任何动画"
- **采用方案**: cdU 检测 dim 到达 → `setNodeTransitionNone` 中断,RAF 后恢复 (与 zoom-follow / closing-follow 同 pattern)
- **关键洞察**: 用 `pendingDimCalibration` flag 而非 `_type === 'browsing'` guard,避免误中断 cover→browsing 动画

### 7.2 第二波: pagination shortest-path + 跳页 fade (commit 2fda167)

- **症状**:
  - Issue 1: 用户希望"跨预取环 (>2) 的切换降级为 fade"
  - Issue 2: N=6 page 0 → 分页器图6 无动画 (按左方向键有)
- **共性根因**: `pageWithStep` 累加方式控制 React key 对齐 → handleToPage 用 raw step (+5) 而非 loop-aware 最短路径 (-1) → key 不命中预取环
- **三组件协调修复**:
  1. `resolveShortestStep` 纯函数 + `handleToPage` 用最短路径 (Issue 2)
  2. `handleSwitchPages` 当 `|step|>2` 时 cap pageWithStep advance 到 `Math.sign(step)` (消灭跳页 wrong-direction reuse)
  3. `Image.cdU` 检测跳页 + 加 `jumpFadeIn` class 触发 CSS `@keyframes` (Issue 1 视觉)
- **关键交互**: 用 CSS `@keyframes` 而非 CSS transition,因为后者会被既有 `setNodeTransitionNone` 杀掉
- **架构师误报**: "Math.sign cap 撞 src" 经手算 N=4/6/10 否定 — 验证了"不接受 generic claim"的原则价值

---

## 8. 调用方核对清单

复杂动画 bug 调试启动时,过一遍这个清单:

- [ ] 用户原话精确记录?
- [ ] 反向情况 (什么 case 不发生) 询问过?
- [ ] 历史失败方案 (陷阱信号) 收集过?
- [ ] 渲染管线时序追踪到具体 step?
- [ ] CSS transition 与 animation 子系统区分清楚了吗?
- [ ] 多症状的共性 hypothesis 形成了吗?
- [ ] 至少 4-6 个候选方案 (含 anti-solutions) 列了吗?
- [ ] 每个方案对照架构不变量 check 了吗?
- [ ] 红队 agent (或独立思维) 验证过推荐方案?
- [ ] 红队的 generic claim 都手算验证了吗?
- [ ] 方案矩阵 + 推荐 + 信心校准给用户了吗?
- [ ] 用户对方案 confirm 后才动手?
- [ ] L1-L4 自动化测试都通过了吗?
- [ ] 给用户人工视觉验收的具体清单了吗?
- [ ] 反向 bug 在视觉验收清单里被显式覆盖了吗?
- [ ] commit message 让未来 git blame reviewer 一眼明白了吗?
- [ ] cWU / cleanup 路径处理了新加的 timer / RAF / class 吗?

每个 ❌ 都是潜在的二次返工点。

---

## 附: 工具与参考

- 项目内 pattern: `setNodeTransitionNone` / `cancelClosingFollow` / `pendingRafHandles` (见 `Image.tsx`)
- vitest 测试模式: `mockImageDimensionsBySrc` (见 `Zmage.test.tsx`)
- 既有 plan 文档: `docs/superpowers/plans/2026-04-29-flip-refactor-wave-1.md`
- 项目不变量: `AGENTS.md` "Architectural invariants" section
- React commit / cdU / paint 时序: React 官方文档 + CSS Transitions Level 1 spec

---

> 本框架是工具,不是教条。每个项目都有特殊性,本框架的某些步骤在简单场景可以省略,在复杂场景应该展开。用专业判断决定 fidelity 级别。
