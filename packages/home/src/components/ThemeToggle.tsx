import { Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/lib/theme'

// Single-click toggle between light and dark.
// Initial state stays 'system' (driven by prefers-color-scheme); the first
// click commits the user to an explicit theme — `theme.tsx` keeps tracking
// 'system' internally so the default-state semantics still hold for first-time
// visitors. To revert to system, clear localStorage `zmage.theme`.
export function ThemeToggle () {
  const { resolved, setTheme } = useTheme()
  const Icon = resolved === 'dark' ? Moon : Sun
  const next = resolved === 'dark' ? 'light' : 'dark'
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={`Switch to ${next} theme`}
      onClick={() => setTheme(next)}
    >
      <Icon className="h-4 w-4" />
    </Button>
  )
}
