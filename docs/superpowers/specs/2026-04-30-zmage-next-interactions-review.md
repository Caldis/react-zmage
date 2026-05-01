# Zmage Next Interactions — Spec Review

**Date:** 2026-04-30
**Reviewer:** Claude (Opus 4.7)
**Scope:** review of
- `2026-04-30-zmage-next-interactions-overview.md`
- `2026-04-30-phase-1-mobile-gestures-design.md`
**Verified against:** `packages/core/src` at HEAD ff80b77

---

## TL;DR

总体方向稳。五个 phase 的拆分合理 (gesture 基础 → cover 几何 → wheel zoom-scale → pinch 复用 → controller API),把"动态 spec 规则"写进 overview 是这次最大亮点 — 它把"压缩上下文也能续写"这个长期痛点变成了一条文档纪律。

但当前这版 spec 还有 **3 个 P0 必须在动手实现前定下来**,否则 Phase 1 实现阶段会被迫现场决策,然后 Phase 2-4 都要回溯:

1. **`gesture` merge 语义自相矛盾。** Overview 同时说 "shallow-merge the object over preset default" (顶层) 和 "A child object overrides only the specified options" (子级)。两条字面互斥。Phase 1 给的伪代码 `{ ...fallback, ...gesture }` 是顶层浅合并,会把 `gesture={{ dragExit: { threshold: 120 } }}` 中 `dragExit` 的 velocity / axisLock / opacity 全部丢掉,直接打脸 phase-1 line 222 的测试断言。
2. **`TouchProfile` 修复 vs 重写没决定。** Phase 1 line 132-136 说 "corrected or replaced",`Next Phase Gate` 还把这个问题留到回顾阶段。但 Phase 4 (pinch) 要复用同一个手势引擎,引擎形状必须先定。
3. **`Animate` 标准化今天不是 mirror,spec 却以"mirror"为前提。** `getControllerConfig(false) → {}`,但 `getAnimateConfig(false) → { browsing: false, flip: false } as unknown as Animate`(见 Browser.tsx:95-97)。spec 说 "merge rule must mirror controller, hotKey, and animate" 是基于不准确的代码现状。`gesture` 的语义需要从两种之间挑一个并明说。

其余是 P1-P3 级别的细节,见后文清单。

---

## 现状 (read-only)

为后面所有结论提供共享前提:

| 事实 | 出处 | 影响 |
|---|---|---|
| `TouchProfile.update()` 的分类块写反了 (`if (behavior !== IDLE)` 应为 `=== IDLE` 或反相) | `Image.utils.ts:456` | 移动端 swipe / dragExit 当前实质失效。spec 修复路径正确。|
| `addEventListener('touchmove', ...)` 未传 options | `Image.tsx:135-137` | window 上 touchmove 默认 passive: true (Chrome 56+);今天调用 `preventDefault()` 是空操作。spec 明确要求 phase 1 改 `{ passive: false }`,正确。|
| `mobile.controller.flip = false` | `default.ts:112` | 今天移动端没翻页 UI;swipe 不是"锦上添花",是"目前唯一可能可用的换页路径"。spec 没写这条 motivation。|
| `getControllerConfig(false) → {}` 但 `getAnimateConfig(false) → { browsing: false, flip: false } cast` | `Browser.tsx:87-97` | Animate 的 false-语义其实和 controller 不一致。spec 把"mirror"当作既成事实在引用,会误导后续设计。|
| `lockTouchInteraction` 改 body/html 的 `overflow` + `position` | `utils/index.ts:54-79` | Phase 1 新触控逻辑会和这个共存,spec 没说现状是否保留。|
| 没有 `openOriginal` action / 字段 | `Control.tsx`、`default.ts` 全文 grep | Overview line 230 列出 `openOriginal: () => void` 是空指针;无现有实现可绑定。|
| 没有 `placement` / 配置位置体系 | controller 全文 | Phase 5 引入 8 种 placement 等于新增公共表面,而非"扩展"。|
| `selectFlipKind` 已经把 `animate=false` 收敛成 `flip: false` | `Image.utils.ts:493-501` | spec 提到的"animate.flip=false 不影响手势识别"现状已经支持,只需在 phase 1 实现阶段做 regression test。|

---

## P0 — 必须在 Phase 1 动工前定下来

### 1. `gesture` merge 语义必须以"per-child shallow merge"为准,并明文写出来

Overview 当前两段矛盾:

> Line 51: `typeof gesture === 'object'`: shallow-merge the object over the current preset default.
> Line 54: A child object enables that child feature and overrides only the specified options.

字面解读"shallow-merge 顶层"会让 `gesture = { dragExit: { threshold: 120 } }` 把整段 `dragExit` 的其它默认值(velocity / axisLock / opacity)冲掉。但 phase-1 line 222 的测试断言要求"merges only that option" — 必须保留其它默认值。

**建议改写 (overview 替换原 line 47-54)**:

> Top-level merge of `gesture` is per-child, not a single-level spread.
> For each known child key (`swipe`, `dragExit`, ...):
> - 用户没传该 key → 用 preset 该 key 的默认值
> - 用户传 `false` → 该 key 关闭 (`false`)
> - 用户传 `true` → 该 key 启用,选项用该 key 的默认 option object
> - 用户传 object → `{ ...presetDefaultForThatKey, ...userObject }` 浅合并 (子级浅合并,不递归)
>
> 这与 `controller` 不同 — `controller` 是单层布尔字段,所以单层 spread 够用;`gesture` 因为子项本身是 option object,必须两层。

并把 phase-1 line 117-122 的伪代码改成:

```ts
getGestureConfig = (gesture: Props['gesture'], fallback: GestureSet): GestureSet => {
  if (gesture === false) return { swipe: false, dragExit: false }
  if (typeof gesture !== 'object') return normalizeGestureSet(fallback)
  const merged: GestureSet = {}
  for (const key of GESTURE_KEYS) {
    merged[key] = mergeChild(fallback[key], gesture[key])
  }
  return normalizeGestureSet(merged)
}
```

`mergeChild` 的规则要写在 spec 内,不能"实现时再决定"。

### 2. 决定:重写 `TouchProfile`,不修

理由:

- Phase 4 (pinch) 必须共享同一个手势状态机入口 (start / move / end + classification),否则 swipe + pinch 切换会出现两个引擎抢 `touchstart` 的冲突。
- 现有 `TouchProfile` 的命名 (`LIVING` 是疑似 typo 的 "leaving"?)、`updateCounter` 死代码、`getTouchConfig` 的 `enableSwiping/enableLiving` flag 写法都不适合作为长期基底。
- 修 vs 重写都要测试,工作量差不多;但 "修" 会留下命名包袱并让 phase 4 又改一次。

**建议 Phase 1 spec 加一节 `Engine Decision`**:

> Phase 1 ships a new `TouchGesture` class (rename or replace `TouchProfile`) with:
> - `state: 'idle' | 'detecting' | 'swiping' | 'dragExiting' | 'ended'`
> - `start(point)`, `move(point)`, `end(): { kind, distance, velocity }`
> - 分类阈值 (`TOUCH_BEHAVIOR_THRESHOLD = 5`) 保留为内部常量,不公开
> - 接受 / 拒绝阈值由 normalized `gesture.swipe` / `gesture.dragExit` 选项注入
> - Phase 4 在同一个类上扩展 `pinch` state,不另建一个并行引擎

并把 Phase 1 Done When 加一行:`旧 TouchProfile 类被删除,所有引用迁到新引擎`。

### 3. 选定 `gesture === false` 与 `gesture.X === false` 的归一形态

候选 A — 留空 (mirror controller):

```ts
gesture === false → {}                  // 没有 swipe / dragExit key
gesture = { swipe: false } → { swipe: false }  // 显式 false
```

候选 B — 显式 false 标记 (mirror animate):

```ts
gesture === false → { swipe: false, dragExit: false }
```

候选 A 让消费方需要 truthy 检查 (`if (config.swipe)`),候选 B 让消费方对所有已知 key 都做布尔检查。**推荐候选 B**,理由:

- normalize 出口形状稳定,消费方不用判 key 是否存在
- TypeScript 上更明确 (`GestureSet` 所有 key 都是 boolean | object)
- 与"normalized 优先用 option 对象"的原则更一致 (overview line 92)

确定后请把 spec line 49 与 phase-1 line 98-100 的描述统一到这个形态。

---

## P1 — 在 Phase 1 spec 里也要敲定

### 4. 删掉 `actions.openOriginal`

Overview line 230:

```ts
actions: {
  ...
  openOriginal: () => void
  ...
}
```

代码全仓 grep 没有任何 `openOriginal` 实现;它不是"暴露现有能力",而是"顺手发明一个新 action"。Phase 5 不应该在 controller render API 里夹带新 feature。

**建议**:

- 从 `actions` 列表删除 `openOriginal`
- 如果未来需要 "在新 tab 打开原图",起一个独立的 phase / spec(它涉及 `target="_blank"`、`rel="noopener"`、URL 校验、和 `download` 的语义边界,值得单独设计)

### 5. 写明 `mobile.controller.flip = false` 才是 swipe 的 motivation

今天 mobile 用户没法翻页,这件事在 spec 里完全没出现。两个后果:

- 评审者读不出"为什么这一波要做",会以为是优化项而非补救项
- 实现期可能会有人提议"那要不要顺便把 mobile.controller.flip 也默认开?",但它和 swipe 是互斥设计 (有 swipe 就不需要箭头)

**建议** Phase 1 Goal 节加一句:

> 今天 `defPreset.mobile.controller` 把 `flip`/`rotate`/`zoom`/`download` 全部置为 `false`,移动端只剩 `pagination` 圆点可换页。Phase 1 通过 `gesture.swipe` 把"换页"补回来,使 mobile preset 第一次具备一个完整的浏览器形态。`controller.flip` 在 mobile 保持默认 `false`(与 swipe 互斥,不在同一阶段切换 UI 默认)。

### 6. `getAnimateConfig` 不是 mirror — 三种语义任选一,然后写清

如 P0 现状所说,`animate=false` 当前返回的是带 cast 的 `{ browsing: false, flip: false }`,与 controller / hotKey 不一致。Phase 1 把 `gesture` 引入时:

- 不要在 spec 里说 "mirror animate"
- 选一种 (推荐与候选 B 一致 — 显式 false markers)
- 顺便记 P1 todo:Phase 5 收口时把 `getAnimateConfig` 的 cast 也对齐到同一形态(目前的 cast 是历史包袱,不是设计意图)

### 7. Playwright 测试责任在 Phase 1 还是 Phase 4 要明说

Overview line 302:

> Browser-only behavior such as real touch input, `clip-path` pixels, and wheel smoothness should get small Playwright smoke tests once the relevant phase introduces browser-sensitive behavior.

Phase 1 就是"introduces browser-sensitive behavior" 的那一刻。但 Phase 1 spec 只列了 vitest + jsdom 测试。两个选项:

- (a) Phase 1 加一个最小 Playwright fixture (`apps/demo-nextjs` 已有可用的 mobile preset 页面),验证 `touchstart → touchmove → touchend` 真实派发后页面会切
- (b) 显式声明:"Phase 1 不引入 Playwright;jsdom 用 `dispatchEvent(new TouchEvent(...))` 验证 wiring,真实触控验证延后到 Phase 4 (pinch) 一并加,因为 pinch 在 jsdom 里完全不可能真测"

**推荐 (b)** — 减少 Phase 1 的工作量,但要在 spec 里明写,免得实现期又重新讨论一次。

### 8. `gesture.swipe.threshold` 和 `TOUCH_BEHAVIOR_THRESHOLD = 5` 的关系

Phase 1 spec 里出现了两个含义不同但都叫 "threshold" 的东西:

- `swipe.threshold = 120` — 接受手势的位移阈值 (单位:px)
- `TOUCH_BEHAVIOR_THRESHOLD = 5` — 触发"开始分类"的小位移阈值 (Image.utils.ts:362)

后者必须保留 (否则单纯的点击会被分类为微小 swipe),但 spec 没说它是公开还是私有。**建议**:

- 5px detection floor 保持私有常量,改名为 `GESTURE_DETECT_FLOOR_PX` 或类似,不暴露
- spec 在 "Touch State" 节加一行说明:`threshold` (公开) 是"接受阈值",独立于"分类启动 floor" (私有,固定 5px)

---

## P2 — 实现阶段可解决,但 spec 提一句更稳

### 9. 单图 `set.length === 1` 的 swipe 行为没说

`toNextPage()` 在单图时会 no-op,但视觉上会出现"看起来能拖、松手回弹"。phase 1 spec 应当显式选一个:

- 推荐:单图时 `swipe` 整体跳过 (不监听 touchmove 横向位移),只保留 `dragExit` 纵向检测。
- 否则用户拖横向看到弹性反弹会以为有"下一页"按钮坏了。

### 10. `hideOnDblClick` 与新触控的协议

桌面 dblclick 是 mouse event;移动端 dblclick 在浏览器层面会被 300ms tap delay 影响。Phase 1 引入 `touchstart/move/end` 监听后:

- 如果手势引擎在 `touchstart` 早早 `preventDefault`,会破坏 click / dblclick 派发
- 建议 spec 写明:**`touchstart` 不调 `preventDefault`;`touchmove` 仅在累计位移 > detect floor 后才 `preventDefault`**;这样轻触不破坏点击链路。

### 11. `Context` 必须明说承载 `gesture`

Phase 1 line 256-257:

> `Context` may carry normalized `gesture`, but should not expose per-frame gesture values.

"may" 太软。实现期会有歧义。建议改成:

> `Context` 承载 normalized `gesture: GestureSet` (由 `Browser.getPropsWithEnv()` 注入),消费方为 Image。
> Per-frame 临时值 (touch coordinates / lock state / RAF target offset) 必须留在 Image 实例字段,不进 Context、不进 React state。

### 12. `index.ts` 显式 re-export 列表

phase-1 line 175 含糊地说 "if new gesture types need re-export"。**直接列**:

```ts
// packages/core/src/index.ts (Phase 1 新增 re-export)
export type {
  GestureSet,
  GestureSwipeOptions,
  GestureDragExitOptions,
} from './types/global'
```

避免实现期漏导出。

### 13. Slot ReactNode 的稳定性

Phase 5 `controller.render` 给的 `slots: { Toolbar, Pagination, FlipLeft, FlipRight }` 是 ReactNode。如果用户写:

```tsx
controller={{
  render: ({ slots }) => <div>{slots.Toolbar}{customExtra}</div>,
}}
```

每次父组件 re-render,`slots.Toolbar` 必须是同一个引用,否则 reconciler 会丢掉子树状态(比如 hover 高亮、聚焦)。Overview line 271 说 "Do not define React components inside React components" 是好的,但还不够。**Phase 5 spec 必须加上**:

> Slots 是 React 元素引用,内部由稳定 component 实例 + memoized 状态计算。`Browser` 不可在 render 内 inline `<DefaultToolbar>` 这种节点;必须用 module-scope component + 通过 props 接受 actions / state。

### 14. `placement` 默认值不能改现有行为

Phase 5 引入 8 种 placement,默认必须 = 今天的位置(实地确认是 top-right)。spec 应明确:

> `controller.placement` 缺省值是 `'top-right'`(与当前实现一致,不是行为变更)。改这个默认在未来若有需要,需要单独 design。

---

## P3 — 可以不改但值得记一下

### 15. Overview vs Phase 1 的默认值重复

`swipe` / `dragExit` 默认值在 overview line 130-145 和 phase-1 line 76-89 各写一份。两份漂移就会 silently 出问题。建议:

- Phase 1 spec 不复制具体数值,只引用 overview 节
- 或者反过来:phase-1 是唯一来源,overview 写 "see Phase 1 spec"
- 任选一种,不要两边都写数字

### 16. `dragExit.opacity` 未来扩展性

`opacity?: boolean` 只能开关;真实产品里通常会想 `{ start: 1, end: 0.4, curve: 'ease-out' }` 这种细调。Phase 1 不必上,但 spec 可以加一句:

> Phase 1 ships `opacity: boolean`. 未来如果产品需要曲线调参,扩展为 `boolean | DragExitOpacityOptions` 是 backward-compatible (boolean 仍然合法)。

### 17. `lockTouchInteraction` 现状沿用

phase-1 没说现有的 `lockTouchInteraction` (改 body 的 overflow / position) 是否保留。**应当保留**,新手势监听是上层叠加,不替换 body-scroll lock。在 Phase 1 spec 加一行:

> `lockTouchInteraction` / `unlockTouchInteraction` 在 mobile 显示 / 关闭时调用的现状不变;新 gesture 监听在它之上叠加。

### 18. methodology 没被引用

`docs/superpowers/methodology/2026-04-30-complex-animation-debugging-framework.md` 应该和 Phase 4 (pinch zoom debug) 有关,但目前两份 spec 都没引用。**建议**:

- Phase 1 spec 暂不引用
- Overview 在 "Architecture Constraints" 末尾加一行:"Phase 4 调试若卡帧 / 手势锁定异常,使用 methodology/2026-04-30-complex-animation-debugging-framework.md 的步骤。"

### 19. Phase 2 cover 默认是 opt-out — 风险点

Overview line 184-189:

```ts
cover: { objectFit: true, clip: true, radius: true }
```

全开是默认。这意味着 **现有所有用户在升到带 Phase 2 的版本后,cover 打开动画会变化**。这是 SemVer minor 还是 major 取决于这个变化是否被认为是 "behavior change"。Phase 2 spec 应当显式承诺:

- 提供 visual diff (before/after 截图 + 关键断点)
- 测试覆盖 `<img style="object-fit: cover">` 与 `<img style="object-fit: contain">` 两种入口
- README 升级提示:"如果你依赖了某种特定的 open transition timing,Phase 2 给了 `animate.cover = false` 回到旧路径"

(Phase 2 spec 还没写,这条记下来等 Phase 2 写时强制纳入。)

### 20. `loadingDelay` 类型扩展约束没列入 architecture constraints

虽然 phase 1-5 都不直接动 loadingDelay,但 wheel zoom (Phase 3) / pinch zoom (Phase 4) 的 zoom 动画时长可能会和 loadingDelay 视觉重叠。建议 overview "Architecture Constraints" 加一行:

> Phase 3+ 引入 zoom scale 时,zoom-enter / zoom-follow 的视觉 timing 不能耦合 `loadingDelay`(后者是图片加载防闪策略,前者是输入响应延迟,两者 SoC)。

---

## 我会同意推进的最小条件

1. P0 #1 (merge 语义) 落定,phase-1 伪代码修正
2. P0 #2 (重写 TouchProfile) 落定,Phase 1 Done When 加 "旧类删除"
3. P0 #3 + P1 #6 (false-语义统一) 写到 overview "Public API Direction"
4. P1 #4 (`openOriginal` 删除) 改 overview
5. P1 #5 (motivation 补一句) 改 phase-1 Goal
6. P1 #7 (Playwright 责任明说) 改 overview Testing Strategy
7. P1 #8 (两个 threshold 的命名) 改 phase-1 Touch State 节

P2 / P3 等实现阶段或下一份 spec 时再处理即可,不阻塞 Phase 1 起步。

---

## 我看了但没意见的部分

- 五个 phase 的边界划分 — 合理,wheel 在 pinch 之前是对的
- "Dynamic Spec Rule" — 把上下文压缩问题在文档层面解掉,nice
- 测试金字塔 (pure / jsdom / playwright 分层) — 合理
- 生命周期回调签名不变的承诺 — 合理且必要
- `loop` 仍是 paging wrap 的 source of truth — 合理
- `animate.browsing=false` 仍是全链路 no-animation 的承诺 — 合理
- 文档传播清单 (README / AGENTS / llms.txt / home schema) — 完整,与 sync-public-docs skill 一致
- `passive: false` 的明确要求 — 准确,这是当前移动端 touchmove 的关键缺陷

---

## 附:对 implementation plan 阶段的建议

Phase 1 转 implementation plan 时,**第一个 commit 应该是失败测试**:

1. 加 `mobile preset 下,jsdom 派发 touchstart→touchmove(横向 150px)→touchend 后,onSwitching 被以 nextPage 调用` 的测试
2. 跑 `pnpm test`,这个测试会**失败**(因为 TouchProfile.update 的反向条件 + passive 无法 preventDefault)
3. 然后才动手实现新引擎

这样能在 PR diff 里清晰展示:"今天哪些行为是坏的 + 这次修了哪些"。spec 的 "Tests → Pure Function Tests" 节可以加一句:

> 实现顺序:先加 failing test 锁定当前 bug,再实现新引擎让测试通过。
