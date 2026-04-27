import * as React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

type ContentProps = React.ComponentPropsWithoutRef<typeof DropdownMenuContent>

type Props = {
  trigger: React.ReactElement
  children: React.ReactNode
  align?: ContentProps['align']
  sideOffset?: ContentProps['sideOffset']
  contentClassName?: string
  openDelay?: number
  closeDelay?: number
}

export function HoverDropdownMenu ({
  trigger,
  children,
  align = 'end',
  sideOffset,
  contentClassName,
  openDelay = 60,
  closeDelay = 140,
}: Props) {
  const [open, setOpen] = React.useState(false)
  const timer = React.useRef<number | undefined>(undefined)

  const clear = () => {
    if (timer.current !== undefined) {
      window.clearTimeout(timer.current)
      timer.current = undefined
    }
  }
  const schedule = (next: boolean, delay: number) => {
    clear()
    timer.current = window.setTimeout(() => setOpen(next), delay)
  }
  const onEnter = () => schedule(true, openDelay)
  const onLeave = () => schedule(false, closeDelay)

  React.useEffect(() => () => clear(), [])

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild onMouseEnter={onEnter} onMouseLeave={onLeave}>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        sideOffset={sideOffset}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        className={cn('nav-menu-anim', contentClassName)}
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
