import * as React from 'react'
import { ChevronDown, Check } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu'
import { useHoverOpen } from './useHoverOpen'
import { cn } from '@/lib/utils'

type Option = { value: string; label: React.ReactNode }
type Props = {
  value: string
  onValueChange: (v: string) => void
  options: Option[]
  placeholder?: string
  triggerClassName?: string
  contentClassName?: string
}

/**
 * A select-styled chooser that opens on hover.
 *
 * Built on Radix `DropdownMenu` rather than Radix `Select` because the latter is a
 * listbox primitive that owns its own pointer-dismissal logic — when the trigger
 * is opened externally via hover, Select's internal `pointerleave` watchers race
 * the wrapper and the menu can collapse mid-interaction. `DropdownMenu` defers
 * open/close fully to its `open` prop, so the same hover pattern that works for
 * the topbar Theme/Language menus works here too.
 *
 * Visually styled to match the prior Radix `Select` trigger (border + chevron +
 * value), and items show a check on the active option.
 */
export function HoverSelect ({
  value,
  onValueChange,
  options,
  placeholder,
  triggerClassName,
  contentClassName,
}: Props) {
  const { open, setOpen, hoverProps } = useHoverOpen()
  const active = options.find(o => o.value === value)
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild {...hoverProps}>
        <button
          type="button"
          className={cn(
            'flex h-9 w-full cursor-pointer items-center justify-between gap-2 whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background hover:bg-accent/40 focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            triggerClassName,
          )}
        >
          <span className={cn('truncate', !active && 'text-muted-foreground')}>
            {active ? active.label : placeholder}
          </span>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50 transition-transform data-[state=open]:rotate-180" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={4}
        // `nav-menu-anim` is the same in/out keyframe class the topbar HoverDropdownMenu uses —
        // sharing it keeps the rise+fade+scale motion consistent across the app.
        className={cn('nav-menu-anim min-w-[var(--radix-dropdown-menu-trigger-width)]', contentClassName)}
        {...hoverProps}
      >
        {options.map(o => {
          const selected = o.value === value
          return (
            <DropdownMenuItem
              key={o.value}
              onSelect={() => onValueChange(o.value)}
              className={cn('flex items-center justify-between gap-2 pr-2', selected && 'font-medium')}
            >
              <span className="truncate">{o.label}</span>
              {selected && <Check className="h-3.5 w-3.5 shrink-0 opacity-80" />}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
