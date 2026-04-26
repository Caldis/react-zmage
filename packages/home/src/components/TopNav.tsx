import { Link, NavLink } from 'react-router-dom'
import { Github, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { ThemeToggle } from './ThemeToggle'
import { LanguageToggle } from './LanguageToggle'
import { CommandK } from './CommandK'
import { useT } from '@/i18n/useT'
import { cn } from '@/lib/utils'

const links = [
  { to: '/playground', key: 'nav.playground' as const },
  { to: '/docs', key: 'nav.docs' as const },
]

export function TopNav () {
  const { t } = useT()
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-14 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="" className="h-7 w-7" />
          {/* Wordmark: bold geometric sans aligned with the rz logo's blocky letterforms */}
          <span className="text-lg font-bold tracking-tight font-sans">react-zmage</span>
        </Link>
        <Separator orientation="vertical" className="hidden h-5 md:block" />
        <nav className="hidden flex-1 items-center gap-1 md:flex">
          {links.map(({ to, key }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'rounded-md px-3 py-1.5 text-sm transition-colors',
                  isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                )
              }
            >
              {t(key)}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <CommandK />
          <LanguageToggle />
          <ThemeToggle />
          <Button variant="ghost" size="icon" asChild aria-label={t('nav.github')}>
            <a href="https://github.com/Caldis/react-zmage" target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" />
            </a>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <nav className="mt-8 flex flex-col gap-1">
                {links.map(({ to, key }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      cn(
                        'rounded-md px-3 py-2 text-base transition-colors',
                        isActive ? 'bg-accent text-foreground' : 'text-muted-foreground hover:bg-accent/60',
                      )
                    }
                  >
                    {t(key)}
                  </NavLink>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
