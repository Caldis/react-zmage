import * as React from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { HoverDropdownMenu } from './HoverDropdownMenu'
import { useTheme, type Theme } from '@/lib/theme'

const ITEMS: { value: Theme; icon: React.ComponentType<{ className?: string }>; label: string }[] = [
  { value: 'light', icon: Sun, label: 'Light' },
  { value: 'dark', icon: Moon, label: 'Dark' },
  { value: 'system', icon: Monitor, label: 'System' },
]

export function ThemeToggle () {
  const { theme, resolved, setTheme } = useTheme()
  const Icon = resolved === 'dark' ? Moon : Sun
  return (
    <HoverDropdownMenu
      contentClassName="w-36"
      trigger={
        <Button variant="ghost" size="icon" aria-label="Toggle theme">
          <Icon className="h-4 w-4" />
        </Button>
      }
    >
      {ITEMS.map(({ value, icon: I, label }) => (
        <DropdownMenuItem key={value} onClick={() => setTheme(value)} data-active={theme === value}>
          <I className="mr-2 h-4 w-4" />
          {label}
        </DropdownMenuItem>
      ))}
    </HoverDropdownMenu>
  )
}
