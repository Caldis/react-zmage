import * as React from 'react'
import { cn } from '@/lib/utils'

type Props = {
  /** CSS selector matched against parent element to find the currently active item. */
  activeSelector?: string
  className?: string
}

type Pos = { left: number; top: number; width: number; height: number }

/**
 * Absolutely-positioned animated indicator that tracks a sibling element matching
 * `activeSelector` within its parent. Use as the first child of a `relative` segment
 * container; siblings stay above via `relative z-10` of their own.
 *
 * Two-phase mount avoids the "fly from (0,0)" flash that a one-shot mount
 * produces (transform changes from initial unset to target value at the same
 * render that turns transitions on, so the browser interpolates):
 *   1. `useLayoutEffect` measures the active element and commits transform/width/height
 *      with **opacity 0 and no transition** — pill silently lands on target.
 *   2. `requestAnimationFrame` flips `ready` next frame; transition + opacity 1
 *      both come on simultaneously, so opacity fades in but transform stays put.
 *   3. Subsequent active changes update pos and ride the transition naturally.
 *
 * Position uses `offsetLeft / offsetTop / offsetWidth / offsetHeight` — these are
 * relative to the `offsetParent`'s padding-box edge, exactly the reference frame
 * absolutely-positioned children use, so no border-thickness compensation is
 * needed. Requires the segment container to be `position: relative`.
 *
 * Listens to MutationObserver (data-state / aria-current / class — covers Radix
 * Tabs, NavLink, custom) and ResizeObserver on the parent + every potential
 * trigger so font-load / window-resize / dynamic content shifts stay aligned.
 */
export function SlidingPill ({
  activeSelector = '[data-state="active"], [aria-current="page"]',
  className,
}: Props) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const [pos, setPos] = React.useState<Pos | null>(null)
  const [ready, setReady] = React.useState(false)

  React.useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const parent = el.parentElement
    if (!parent) return

    const update = () => {
      const active = parent.querySelector<HTMLElement>(activeSelector)
      if (!active) { setPos(null); return }
      setPos({
        left: active.offsetLeft,
        top: active.offsetTop,
        width: active.offsetWidth,
        height: active.offsetHeight,
      })
    }
    update()
    // Position has been committed (opacity still 0, no transition). Next frame:
    // turn on opacity + transitions together — opacity 0→1 fades in, but transform
    // value didn't change from previous frame so no slide-from-(0,0) artifact.
    const raf = requestAnimationFrame(() => setReady(true))

    const mo = new MutationObserver(update)
    mo.observe(parent, {
      attributes: true,
      subtree: true,
      attributeFilter: ['data-state', 'aria-current', 'class'],
    })
    const ro = new ResizeObserver(update)
    ro.observe(parent)
    parent.querySelectorAll<HTMLElement>('[data-state], [role="tab"], a').forEach(el => ro.observe(el))
    return () => {
      cancelAnimationFrame(raf)
      mo.disconnect()
      ro.disconnect()
    }
  }, [activeSelector])

  return (
    <span
      ref={ref}
      aria-hidden
      className={cn(
        // Always pointer-none — pill is decorative; clicks should pass to triggers.
        'pointer-events-none absolute rounded-md bg-background shadow',
        ready ? 'opacity-100' : 'opacity-0',
        ready && 'transition-[transform,width,height,opacity] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]',
        className,
      )}
      style={pos ? {
        // Anchor at parent padding-box top-left, then translate by measured offsets.
        top: 0,
        left: 0,
        transform: `translate(${pos.left}px, ${pos.top}px)`,
        width: pos.width,
        height: pos.height,
      } : undefined}
    />
  )
}
