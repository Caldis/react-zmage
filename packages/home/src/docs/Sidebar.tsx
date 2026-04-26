import { useT } from '@/i18n/useT'
import type { I18nKey } from '@/i18n/dict'
import { cn } from '@/lib/utils'

type Item = { id: string; labelKey: I18nKey }
type Group = { titleKey: I18nKey; items: Item[] }

export const SIDEBAR_GROUPS: Group[] = [
  {
    titleKey: 'docs.sidebar.gettingStarted',
    items: [
      { id: 'installation', labelKey: 'docs.sidebar.quickstart' },
      { id: 'ssr', labelKey: 'docs.sidebar.ssr' },
    ],
  },
  {
    titleKey: 'docs.sidebar.concepts',
    items: [
      { id: 'modes', labelKey: 'docs.sidebar.modes' },
      { id: 'theming', labelKey: 'docs.sidebar.theming' },
    ],
  },
  {
    titleKey: 'docs.sidebar.props',
    items: [
      { id: 'props-data', labelKey: 'group.data' },
      { id: 'props-preset', labelKey: 'group.preset' },
      { id: 'props-interface', labelKey: 'group.interface' },
      { id: 'props-controller', labelKey: 'group.controller' },
      { id: 'props-hotkey', labelKey: 'group.hotkey' },
      { id: 'props-animate', labelKey: 'group.animate' },
      { id: 'props-lifecycle', labelKey: 'group.lifecycle' },
      { id: 'props-controlled', labelKey: 'group.controlled' },
    ],
  },
  {
    titleKey: 'docs.sidebar.recipes',
    items: [
      { id: 'examples', labelKey: 'docs.sidebar.examples' },
      { id: 'typescript', labelKey: 'docs.sidebar.typescript' },
    ],
  },
  {
    titleKey: 'docs.sidebar.reference',
    items: [
      { id: 'migration', labelKey: 'docs.sidebar.migration' },
      { id: 'faq', labelKey: 'docs.sidebar.faq' },
    ],
  },
]

export function Sidebar ({ activeId }: { activeId: string }) {
  const { t } = useT()
  return (
    <nav className="space-y-6 text-sm">
      {SIDEBAR_GROUPS.map(g => (
        <div key={g.titleKey}>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t(g.titleKey)}</div>
          <ul className="space-y-1 border-l border-border/60">
            {g.items.map(it => {
              const active = it.id === activeId
              return (
                <li key={it.id}>
                  <a
                    href={`#${it.id}`}
                    className={cn(
                      '-ml-px block border-l-2 px-3 py-1 transition-colors',
                      active ? 'border-foreground text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {t(it.labelKey)}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}
