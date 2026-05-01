# Phase 5 Controller API Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add controller toolbar placement and a full custom controller render callback without changing existing controller defaults.

**Architecture:** Extend the public controller types/defaults first, then split `Control.tsx` into module-level slot builders. Placement is a CSS-module concern on the default toolbar only. Custom rendering receives derived public state, action callbacks, and default slots, but does not own gesture or image state.

**Tech Stack:** React function components, TypeScript, CSS modules/Less, Vitest/jsdom, Vite home docs.

---

## File Structure

- `packages/core/src/types/global.ts`: add `ControllerPlacement`, render state/action/slot types, and `ControllerRender`.
- `packages/core/src/types/default.ts`: add `placement: 'top-right'` to desktop and mobile controller defaults.
- `packages/core/src/components/Control/Control.tsx`: resolve placement, build default slots, build custom render args, preserve existing default UI.
- `packages/core/src/components/Control/Control.module.less`: add placement classes and placement-specific enter transforms.
- `packages/core/src/__tests__/Zmage.test.tsx`: add controller placement and custom render behavior tests.
- `README.md`, `AGENTS.md`, `llms.txt`: document public controller API changes.
- `packages/home/src/schema/param-schema.ts`: add controller placement default/schema support.
- `packages/home/src/docs/sections/Props.tsx`: include `placement` and `render` in controller detail docs.
- `packages/home/src/playground/controls/ControllerControl.tsx`: add placement select; do not add callback source editing.
- `packages/home/src/i18n/*.ts`: add localized copy for new controller keys.
- `packages/llms-eval/eval.test.mjs`: assert public docs include controller placement/render.

## Task 1: Public Types And Defaults

**Files:**
- Modify: `packages/core/src/types/global.ts`
- Modify: `packages/core/src/types/default.ts`
- Test: `packages/core/src/__tests__/Zmage.test.tsx`

- [ ] Add failing component tests for placement defaults and runtime fallback:

```tsx
it('controller 默认 placement 为 top-right', async () => {
  render(<Zmage src={SRC} alt="controller-placement-default" preset="desktop" />)
  fireEvent.click(screen.getByAltText('controller-placement-default'))
  await wait(50)
  expect(document.getElementById('zmageControl')?.dataset.placement).toBe('top-right')
})

it('controller.placement 支持 bottom-center', async () => {
  render(<Zmage src={SRC} alt="controller-placement-bottom" controller={{ placement: 'bottom-center' }} />)
  fireEvent.click(screen.getByAltText('controller-placement-bottom'))
  await wait(50)
  expect(document.getElementById('zmageControl')?.dataset.placement).toBe('bottom-center')
})

it('controller.placement 运行时非法值回退到 top-right', async () => {
  render(<Zmage src={SRC} alt="controller-placement-invalid" controller={{ placement: 'bad-place' } as any} />)
  fireEvent.click(screen.getByAltText('controller-placement-invalid'))
  await wait(50)
  expect(document.getElementById('zmageControl')?.dataset.placement).toBe('top-right')
})
```

- [ ] Run the focused tests and confirm they fail because no `data-placement` exists:

```bash
pnpm --filter react-zmage test -- Zmage.test.tsx -t "controller.*placement"
```

- [ ] Add public types in `global.ts`:

```ts
export type ControllerPlacement =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center'
  | 'left-center'
  | 'right-center'

export interface ControllerRenderState {
  show: boolean
  zoom: boolean
  page: number
  total: number
  canZoom: boolean
  canPrev: boolean
  canNext: boolean
  canDownload: boolean
  preset: Exclude<Preset, 'auto'>
  placement: ControllerPlacement
  current?: Set
}

export interface ControllerRenderActions {
  close: () => void
  zoom: () => void
  rotateLeft: () => void
  rotateRight: () => void
  prev: () => void
  next: () => void
  toPage: (page: number) => void
  download: () => void
}

export interface ControllerRenderSlots {
  Toolbar: ReactNode
  Pagination: ReactNode
  FlipLeft: ReactNode
  FlipRight: ReactNode
}

export type ControllerRender = (args: {
  state: ControllerRenderState
  actions: ControllerRenderActions
  slots: ControllerRenderSlots
}) => ReactNode
```

- [ ] Extend `ControllerSet` with:

```ts
placement?: ControllerPlacement
render?: ControllerRender
```

- [ ] Add defaults in `default.ts`:

```ts
controller: {
  pagination: true,
  rotate: true,
  zoom: true,
  download: false,
  close: true,
  flip: true,
  placement: 'top-right' as const,
},
```

and the same `placement: 'top-right' as const` in the mobile controller default.

- [ ] Run:

```bash
pnpm --filter react-zmage test -- Zmage.test.tsx -t "controller.*placement"
```

Expected after Task 1 implementation: the tests may still fail until `Control.tsx` writes `data-placement`; type errors should be gone.

## Task 2: Default Toolbar Placement

**Files:**
- Modify: `packages/core/src/components/Control/Control.tsx`
- Modify: `packages/core/src/components/Control/Control.module.less`
- Test: `packages/core/src/__tests__/Zmage.test.tsx`

- [ ] Add a failing test that placement does not move side buttons or pagination:

```tsx
it('controller.placement 只移动 toolbar, 不移动翻页和分页节点', async () => {
  render(
    <Zmage
      src="https://example.com/a.jpg"
      alt="controller-placement-scope"
      loop={false}
      controller={{ placement: 'left-center' }}
      set={[
        { src: 'https://example.com/a.jpg' },
        { src: 'https://example.com/b.jpg' },
      ]}
    />
  )
  fireEvent.click(screen.getByAltText('controller-placement-scope'))
  await wait(50)

  expect(document.getElementById('zmageControl')?.dataset.placement).toBe('left-center')
  expect(document.getElementById('zmageControlFlipRight')).toBeTruthy()
  expect(document.getElementById('zmageControlPagination')).toBeTruthy()
})
```

- [ ] Add a failing test for `animate.browsing=false` with placement:

```tsx
it('controller.placement 不破坏 animate.browsing=false 的无动画契约', async () => {
  render(
    <Zmage
      src={SRC}
      alt="controller-placement-no-anim"
      controller={{ placement: 'bottom-left' }}
      animate={{ browsing: false }}
    />
  )
  fireEvent.click(screen.getByAltText('controller-placement-no-anim'))
  await wait(0)
  expect(document.getElementById('zmageControl')?.style.transition).toBe('none')
  expect(document.getElementById('zmageControl')?.dataset.placement).toBe('bottom-left')
})
```

- [ ] Run:

```bash
pnpm --filter react-zmage test -- Zmage.test.tsx -t "controller.placement"
```

Expected: fail before implementation.

- [ ] Add placement constants/helpers in `Control.tsx`:

```ts
const CONTROLLER_PLACEMENTS = new Set<ControllerPlacement>([
  'top-right',
  'top-left',
  'bottom-right',
  'bottom-left',
  'top-center',
  'bottom-center',
  'left-center',
  'right-center',
])

function resolveControllerPlacement (placement: ControllerSet['placement']): ControllerPlacement {
  return typeof placement === 'string' && CONTROLLER_PLACEMENTS.has(placement)
    ? placement
    : 'top-right'
}
```

- [ ] Add placement class mapping:

```ts
const PLACEMENT_CLASS: Record<ControllerPlacement, string> = {
  'top-right': style.topRight,
  'top-left': style.topLeft,
  'bottom-right': style.bottomRight,
  'bottom-left': style.bottomLeft,
  'top-center': style.topCenter,
  'bottom-center': style.bottomCenter,
  'left-center': style.leftCenter,
  'right-center': style.rightCenter,
}
```

- [ ] Update `#zmageControl`:

```tsx
const placement = resolveControllerPlacement(controllerParams.placement)

<div
  id="zmageControl"
  data-placement={placement}
  className={classnames(style.controls, PLACEMENT_CLASS[placement], { [style.show]: !zoom && show })}
  style={{ backgroundColor: effectiveControllerBackdrop, ...browsingTransitionStyle }}
>
```

- [ ] Update Less so `.controls` no longer hard-codes only top-right:

```less
.controls {
  box-sizing: border-box;
  position: absolute;
  padding: 0 0.4rem;
  opacity: 0;
  display: flex;
  z-index: 1000;
  border-radius: 5rem;
  transition: transform @animationDuration @animationFunction, opacity @animationDuration;
}

.topRight { top: 0.6rem; right: 0.6rem; transform: translateX(100%); }
.topLeft { top: 0.6rem; left: 0.6rem; transform: translateX(-100%); }
.bottomRight { bottom: 0.6rem; right: 0.6rem; transform: translateX(100%); }
.bottomLeft { bottom: 0.6rem; left: 0.6rem; transform: translateX(-100%); }
.topCenter { top: 0.6rem; left: 50%; transform: translate(-50%, -100%); }
.bottomCenter { bottom: 0.6rem; left: 50%; transform: translate(-50%, 100%); }
.leftCenter { top: 50%; left: 0.6rem; transform: translate(-100%, -50%); }
.rightCenter { top: 50%; right: 0.6rem; transform: translate(100%, -50%); }

.topRight.show,
.topLeft.show,
.bottomRight.show,
.bottomLeft.show { opacity: 0.8; transform: translateX(0); }

.topCenter.show,
.bottomCenter.show { opacity: 0.8; transform: translate(-50%, 0); }

.leftCenter.show,
.rightCenter.show { opacity: 0.8; transform: translate(0, -50%); }
```

- [ ] Run:

```bash
pnpm --filter react-zmage test -- Zmage.test.tsx -t "controller.placement"
```

Expected: placement tests pass.

## Task 3: Custom Render Slots And Actions

**Files:**
- Modify: `packages/core/src/components/Control/Control.tsx`
- Test: `packages/core/src/__tests__/Zmage.test.tsx`

- [ ] Add failing tests for custom render:

```tsx
it('controller=false 不调用 controller.render', async () => {
  const renderController = vi.fn(() => <button>custom</button>)
  render(<Zmage src={SRC} alt="controller-render-disabled" controller={{ render: renderController } as any} />)
  render(<Zmage src={SRC} alt="controller-render-false" controller={false} />)
  fireEvent.click(screen.getByAltText('controller-render-false'))
  await wait(50)
  expect(document.getElementById('zmageControl')).toBeNull()
})

it('controller.render 接收公开状态并可关闭 viewer', async () => {
  const renderController = vi.fn(({ state, actions }) => (
    <button data-testid="custom-close" data-page={state.page} data-total={state.total} onClick={actions.close}>
      close
    </button>
  ))
  render(<Zmage src={SRC} alt="controller-render-close" controller={{ render: renderController }} />)
  fireEvent.click(screen.getByAltText('controller-render-close'))
  await wait(50)
  expect(renderController.mock.calls.at(-1)?.[0].state).toMatchObject({
    page: 0,
    total: 1,
    canPrev: false,
    canNext: false,
    canDownload: true,
    placement: 'top-right',
  })
  fireEvent.click(screen.getByTestId('custom-close'))
  await wait(500)
  expect(document.getElementById('zmage')).toBeNull()
})

it('controller.render actions.next 沿用现有翻页逻辑', async () => {
  const onSwitching = vi.fn()
  const renderController = ({ actions }: ControllerRenderParameters) => (
    <button data-testid="custom-next" onClick={actions.next}>next</button>
  )
  render(
    <Zmage
      src="https://example.com/a.jpg"
      alt="controller-render-next"
      onSwitching={onSwitching}
      controller={{ render: renderController as any }}
      set={[
        { src: 'https://example.com/a.jpg' },
        { src: 'https://example.com/b.jpg' },
      ]}
    />
  )
  fireEvent.click(screen.getByAltText('controller-render-next'))
  await wait(50)
  fireEvent.click(screen.getByTestId('custom-next'))
  await wait(80)
  expect(onSwitching).toHaveBeenCalledWith(1)
  expect((document.getElementById('zmageImage') as HTMLImageElement).src).toContain('b.jpg')
})

it('controller.render 可复用默认 Toolbar slot', async () => {
  const renderController = ({ slots }: ControllerRenderParameters) => <>{slots.Toolbar}</>
  render(<Zmage src={SRC} alt="controller-render-slot" controller={{ render: renderController as any }} />)
  fireEvent.click(screen.getByAltText('controller-render-slot'))
  await wait(50)
  expect(document.getElementById('zmageControl')).toBeTruthy()
  expect(document.getElementById('zmageControlClose')).toBeTruthy()
})

it('controller.render 返回 null 时隐藏全部 controller UI', async () => {
  render(
    <Zmage
      src="https://example.com/a.jpg"
      alt="controller-render-null"
      controller={{ render: () => null }}
      set={[
        { src: 'https://example.com/a.jpg' },
        { src: 'https://example.com/b.jpg' },
      ]}
    />
  )
  fireEvent.click(screen.getByAltText('controller-render-null'))
  await wait(50)
  expect(document.getElementById('zmageControl')).toBeNull()
  expect(document.getElementById('zmageControlFlipRight')).toBeNull()
  expect(document.getElementById('zmageControlPagination')).toBeNull()
})
```

Note: add a local test helper type if needed:

```ts
type ControllerRenderParameters = Parameters<NonNullable<ControllerSet['render']>>[0]
```

- [ ] Run:

```bash
pnpm --filter react-zmage test -- Zmage.test.tsx -t "controller.render"
```

Expected: fail before implementation.

- [ ] Refactor `Control.tsx` without changing default behavior:
  - build `toolbarSlot`,
  - build `paginationSlot`,
  - build `flipLeftSlot`,
  - build `flipRightSlot`,
  - return default fragment when no `controller.render`.

- [ ] Add derived render state:

```ts
const total = set.length
const current = set[page]
const canPrev = total > 1 && (loop || page > 0)
const canNext = total > 1 && (loop || page < total - 1)
const canDownload = typeof current?.src === 'string' && current.src.length > 0
```

- [ ] Add action object:

```ts
const actions: ControllerRenderActions = {
  close: outBrowsing,
  zoom: () => {
    if (!zoom && !canZoom) return
    toggleZoom()
  },
  rotateLeft: toggleRotate('left'),
  rotateRight: toggleRotate('right'),
  prev: toPrevPage,
  next: toNextPage,
  toPage,
  download: () => {
    if (current?.src) downloadFromLink(current.src)
  },
}
```

- [ ] Call custom render only when it exists:

```tsx
if (typeof controllerParams.render === 'function') {
  return (
    <Fragment>
      {controllerParams.render({
        state: {
          show,
          zoom,
          page,
          total,
          canZoom,
          canPrev,
          canNext,
          canDownload,
          preset: presetIsMobile ? 'mobile' : 'desktop',
          placement,
          current,
        },
        actions,
        slots: {
          Toolbar: toolbarSlot,
          Pagination: paginationSlot,
          FlipLeft: flipLeftSlot,
          FlipRight: flipRightSlot,
        },
      })}
    </Fragment>
  )
}
```

- [ ] Run:

```bash
pnpm --filter react-zmage test -- Zmage.test.tsx -t "controller.render"
pnpm --filter react-zmage test -- Zmage.test.tsx -t "controller.placement|animate.browsing=false"
```

Expected: custom render and placement tests pass, existing no-animation test stays green.

## Task 4: Public Docs, Home Playground, And llms Contract

**Files:**
- Modify: `README.md`
- Modify: `AGENTS.md`
- Modify: `llms.txt`
- Modify: `packages/home/src/schema/param-schema.ts`
- Modify: `packages/home/src/docs/sections/Props.tsx`
- Modify: `packages/home/src/playground/controls/ControllerControl.tsx`
- Modify: `packages/home/src/i18n/de.ts`
- Modify: `packages/home/src/i18n/en.ts`
- Modify: `packages/home/src/i18n/es.ts`
- Modify: `packages/home/src/i18n/fr.ts`
- Modify: `packages/home/src/i18n/ja.ts`
- Modify: `packages/home/src/i18n/ko.ts`
- Modify: `packages/home/src/i18n/zh-CN.ts`
- Modify: `packages/llms-eval/eval.test.mjs`

- [ ] Add failing `llms-eval` tests:

```js
test('controller placement and custom render API documented', () => {
  const llms = readFileSync(new URL('../../llms.txt', import.meta.url), 'utf8')
  assert.match(llms, /controller\.placement/)
  assert.match(llms, /ControllerPlacement/)
  assert.match(llms, /controller\.render/)
  assert.match(llms, /ControllerRender/)
})
```

- [ ] Run:

```bash
pnpm --filter llms-eval run test
```

Expected: fail until docs are updated.

- [ ] Update README controller section with:

```ts
type ControllerPlacement =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center'
  | 'left-center'
  | 'right-center'

interface ControllerSet {
  placement?: ControllerPlacement
  render?: ControllerRender
}
```

Also document that placement only moves the toolbar and `controller=false` disables `render`.

- [ ] Update `llms.txt` with the same contract in compact form.

- [ ] Update `AGENTS.md` public quick reference so `ControllerSet` includes `placement` and `render`.

- [ ] Update home schema defaults:

```ts
controller: { pagination: true, rotate: true, zoom: true, download: false, close: true, flip: true, placement: 'top-right' as const }
```

and mobile equivalent.

- [ ] Update `ControllerControl.tsx` with a `HoverSelect` for placement:

```tsx
<HoverSelect
  value={(obj.placement as string) || 'top-right'}
  onValueChange={(placement) => onChange({ ...obj, placement })}
  triggerClassName="h-7 text-[11px]"
  options={[
    { value: 'top-right', label: 'top-right' },
    { value: 'top-left', label: 'top-left' },
    { value: 'bottom-right', label: 'bottom-right' },
    { value: 'bottom-left', label: 'bottom-left' },
    { value: 'top-center', label: 'top-center' },
    { value: 'bottom-center', label: 'bottom-center' },
    { value: 'left-center', label: 'left-center' },
    { value: 'right-center', label: 'right-center' },
  ]}
/>
```

- [ ] Add `placement` and `render` rows to `Props.tsx` controller detail table.

- [ ] Add matching i18n keys to all seven locale files:

```ts
'controller.placement.desc': 'Toolbar placement. Only moves the top toolbar; side flip buttons and pagination stay in their existing positions.',
'controller.render.desc': 'Render callback for a fully custom controller UI. Receives state, actions, and default slots. Disabled when controller=false.',
```

- [ ] Run:

```bash
pnpm --filter llms-eval run test
pnpm --filter react-zmage-home run build
```

Expected: docs contract and home build pass.

## Task 5: Final Verification

**Files:**
- All files changed in Tasks 1-4

- [ ] Run core tests:

```bash
pnpm --filter react-zmage test
```

Expected: all core tests pass. Existing jsdom navigation and React act warnings may still appear.

- [ ] Run core build:

```bash
pnpm --filter react-zmage run build
```

Expected: tsup and declaration build pass.

- [ ] Run home build:

```bash
pnpm --filter react-zmage-home run build
```

Expected: Vite home build passes.

- [ ] Run llms eval:

```bash
pnpm --filter llms-eval run test
```

Expected: all llms-eval tests pass.

- [ ] Run full workspace check:

```bash
pnpm -w run check
```

Expected: core build/pack and React 17/18/19/Next sandboxes pass.

- [ ] Run whitespace check:

```bash
git diff --check
```

Expected: no whitespace errors. Windows CRLF warnings are acceptable if they match current repo behavior.

## Self-Review Checklist

- [ ] Every public type in the spec has an implementation task.
- [ ] `controller=false` disables both slots and render.
- [ ] `placement` affects only `#zmageControl`.
- [ ] `animate.browsing=false` remains a full-chain no-animation contract.
- [ ] Custom render state does not expose internal Browser/Image fields.
- [ ] Documentation covers `placement`, `render`, `state`, `actions`, and `slots`.
- [ ] Tests cover both default-slot composition and fully custom UI.
