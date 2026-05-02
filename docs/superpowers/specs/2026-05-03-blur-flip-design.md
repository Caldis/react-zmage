# react-zmage blur flip design

## 背景

`react-zmage` 现有 `animate.flip` 支持 `fade`、`crossFade`、`swipe`、`zoom`、`none`。图片翻页的视觉参数集中在 `packages/core/src/components/Image/Image.utils.ts` 的 `FLIP_VISUAL`，caption 切换跟随 flip 类型，在 `packages/core/src/components/Caption/Caption.tsx` 和 `Caption.module.less` 中维护对应 class。

这次新增 blur 翻页效果。用户在视觉草图中最终选择 A: soft focus crossfade。设计目标是增加一种更柔和的可选翻页效果，同时不改变默认 preset 行为，不影响 `none` 的瞬时切换语义。

## 设计结论

新增公开值:

```ts
type AnimateFlip =
  | 'fade'
  | 'crossFade'
  | 'swipe'
  | 'zoom'
  | 'blur'
  | 'none'
```

默认值保持不变:

- desktop: `animate.flip = 'crossFade'`
- mobile: `animate.flip = 'swipe'`
- `animate=false`: 仍归一为 `{ browsing: false, flip: false, cover: false }`
- `animate.flip='none'`: 仍不渲染 side image，图片与 caption 都直接切换

## 视觉语义

`blur` 使用 soft focus crossfade:

- 新图从失焦和轻微放大状态进入: `opacity: 0`，`filter: blur(14px)`，scale 比 fit 尺寸略大。
- 当前图离开时淡出并失焦: `opacity` 降低，`filter` 过渡到 blur。
- 不引入 viewer 级别遮罩，不使用 `backdrop-filter` 来模糊整层。
- 不增加横向方向位移。它应明显区别于 `crossFade`，更像柔和换焦，而不是滑动翻页。

推荐初始参数:

```ts
blur: {
  offset: 0,
  overflow: 0.018,
  opacity: 0,
  blur: 14,
}
```

这里 `overflow` 复用已有 side image scale 机制。`blur` 为新增可选字段，只参与 style 计算，不改变已有 flip 的参数结构。

## 图片层实现

扩展 `ImageAnimateType`:

```ts
export interface ImageAnimateType {
  offset: number
  overflow: number
  opacity: number
  blur?: number
}
```

`getStyle()` 中按 `animateConfig.blur` 写入 `filter`:

- side image: `filter: blur(${blur}px)`
- center image: 默认 `filter: blur(0px)`
- 未配置 blur 的 flip 不写 filter，避免给已有效果增加无意义 style

图片 transition 需要包含 `filter`:

- `Image.module.less` 的 `.imageLayer` transition 增加 `filter`
- `anim.ts` 的 `animationTransition()` 增加 `filter`
- `motion.ts` 中 slowMotion 的 `controlTransition` 不需要加 filter，因为控制器没有 blur。`browsingTransition` 由 `animationTransition()` 派生后会自然包含 filter。
- `zoomTransition` 可保持现状。zoom 动画不是翻页 blur，不需要把 filter 带入 zoom 进入链路。

`will-change` 可加入 `filter`。需要注意 blur 会触发额外合成和绘制压力，但该效果是用户主动选择的翻页模式，不作为默认值。

## Caption 实现

caption 要和图片层同一语义，不只更新文字:

- `SWITCH_CLASS_BY_FLIP` 增加 `blur: 'switchBlur'`
- `Caption.module.less` 增加 `.switchBlur`
- keyframes 建议:

```less
@keyframes capBlur {
  from {
    opacity: 0;
    filter: blur(8px);
    transform: translate(var(--zmage-caption-translate-x, -50%), 0) scale(0.985);
  }

  to {
    opacity: 1;
    filter: blur(0);
    transform: translate(var(--zmage-caption-translate-x, -50%), 0) scale(1);
  }
}
```

caption 的 `switching` 逻辑不需要新增状态。`flip='none'` 继续跳过 switching class。

## 公开文档同步

这是公开 API 扩展，实现时要同步这些位置:

- `packages/core/src/types/global.ts`: `AnimateFlip`
- `README.md`: Animate 类型和 defaults 说明
- `README.zh-CN.md`: 中文文档同步
- `docs/llms.txt`: API 表格中的 `animate.flip` union
- `packages/home/src/docs/sections/Props.tsx`: `animate.flip` 类型展示
- `packages/home/src/playground/controls/AnimateControl.tsx`: flip 下拉选项
- `packages/home/src/components/CommandK.tsx`: 可搜索选项
- `packages/home/src/schema/param-schema.ts`: playground schema 类型
- `packages/home/src/i18n/*.ts`: 所有语言新增 `animate.flip.blur`

不需要修改默认 preset 文案，除非现有文案列举了全部 flip 值。

## 测试策略

单元测试:

- `Image.utils.test.ts`: `getAnimateConfig('blur')` 返回 `{ offset: 0, overflow: 0.018, opacity: 0, blur: 14 }`
- `Zmage.test.tsx`: `animate.flip='blur'` 渲染 side image，side image 初始 `opacity=0`，`filter` 含 `blur(14px)`，scale 大于 center fit scale
- `Zmage.test.tsx`: caption 翻页时出现 `switchBlur`
- `Zmage.test.tsx`: `animate.flip='none'` 的 caption 断言更新为不匹配 `switch(Fade|CrossFade|Swipe|Zoom|Blur)`

回归测试:

- `animate=false` 仍让非 zoom 图片 transition 为 `none`
- `animate.flip='none'` 仍只影响翻页，不关闭 rotate、resize、zoom toggle 的普通 transition
- `swipe` 的 side image offset 逻辑不受 blur 字段影响

验证命令:

```bash
pnpm test
pnpm -w run check
```

如果实现触及 home 文档和构建产物，再按项目惯例补跑 home build 或仓库 `check` 产生的联动验证。

## 不做的事

- 不把 blur 设为任何 preset 默认值。
- 不增加 `animate.blur` 之类的新顶层配置。
- 不做 viewer 级 `backdrop-filter` 模糊遮罩。
- 不把 blur 绑定到 mobile swipe 手势默认行为。
- 不宣称浏览器 GUI 已验证。动效最终观感仍需要人工打开 demo 检查。

## 实施顺序

1. 扩展 core 类型和 `FLIP_VISUAL`。
2. 给图片 style 和 transition 增加可选 filter。
3. 增加 caption 的 `switchBlur`。
4. 更新 core 单测。
5. 同步 README、`docs/llms.txt`、home docs、playground、CommandK、schema、i18n。
6. 跑 `pnpm test`。
7. 跑 `pnpm -w run check`。
