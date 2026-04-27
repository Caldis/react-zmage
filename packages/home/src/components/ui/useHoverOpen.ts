import * as React from 'react'

/**
 * Reusable hover-to-open state for Radix popper-based primitives (Dropdown, Select, ...).
 * Returns `open` + `setOpen` (forward to Radix `open`/`onOpenChange`) and `hoverProps`
 * to apply to BOTH the trigger AND the portaled content — needed because the content
 * is portaled out of the trigger's DOM subtree, so a mouseleave from the trigger to
 * the content has to be bridged. closeDelay > openDelay gives users time to bridge
 * the small `sideOffset` gap.
 */
export function useHoverOpen ({
  openDelay = 60,
  closeDelay = 140,
}: { openDelay?: number; closeDelay?: number } = {}) {
  const [open, setOpen] = React.useState(false)
  const timer = React.useRef<number | undefined>(undefined)

  const clear = () => {
    if (timer.current !== undefined) {
      window.clearTimeout(timer.current)
      timer.current = undefined
    }
  }
  const schedule = React.useCallback((next: boolean, delay: number) => {
    clear()
    timer.current = window.setTimeout(() => setOpen(next), delay)
  }, [])

  React.useEffect(() => () => clear(), [])

  const onMouseEnter = React.useCallback(() => schedule(true, openDelay), [schedule, openDelay])
  const onMouseLeave = React.useCallback(() => schedule(false, closeDelay), [schedule, closeDelay])

  return {
    open,
    setOpen,
    hoverProps: { onMouseEnter, onMouseLeave },
  }
}
