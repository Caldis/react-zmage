import { useT } from '@/i18n/useT'
import type { I18nKey } from '@/i18n/dict'
import { cn } from '@/lib/utils'

type Item = { id: string; labelKey: I18nKey; items?: Item[] }
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
      {
        id: 'modes',
        labelKey: 'docs.sidebar.modes',
        items: [
          { id: 'modes-component', labelKey: 'docs.section.modes.componentTitle' },
          { id: 'modes-imperative', labelKey: 'docs.section.modes.imperativeTitle' },
          { id: 'modes-wrapper', labelKey: 'docs.section.modes.wrapperTitle' },
        ],
      },
      {
        id: 'theming',
        labelKey: 'docs.sidebar.theming',
        items: [
          { id: 'theming-default', labelKey: 'docs.section.theming.defaultTitle' },
          { id: 'theming-pattern', labelKey: 'docs.section.theming.patternTitle' },
          { id: 'theming-imperative', labelKey: 'docs.section.theming.imperativeTitle' },
          { id: 'theming-icons', labelKey: 'docs.section.theming.iconsTitle' },
          { id: 'theming-toolbar', labelKey: 'docs.section.theming.toolbarTitle' },
        ],
      },
    ],
  },
  {
    titleKey: 'docs.sidebar.props',
    items: [
      { id: 'props', labelKey: 'docs.section.props.title' },
      { id: 'props-data', labelKey: 'group.data' },
      { id: 'props-preset', labelKey: 'group.preset' },
      { id: 'props-preset-bundles', labelKey: 'docs.section.props.preset.title' },
      { id: 'props-interface', labelKey: 'group.interface' },
      { id: 'props-controller', labelKey: 'group.controller' },
      { id: 'props-hotkey', labelKey: 'group.hotkey' },
      { id: 'props-animate', labelKey: 'group.animate' },
      { id: 'props-gesture', labelKey: 'group.gesture' },
      { id: 'props-lifecycle', labelKey: 'group.lifecycle' },
      { id: 'props-controlled', labelKey: 'group.controlled' },
    ],
  },
  {
    titleKey: 'docs.sidebar.recipes',
    items: [
      {
        id: 'examples',
        labelKey: 'docs.sidebar.examples',
        items: [
          { id: 'examples-single', labelKey: 'docs.section.examples.singleTitle' },
          { id: 'examples-gallery', labelKey: 'docs.section.examples.galleryTitle' },
          { id: 'examples-mobile', labelKey: 'docs.section.examples.mobileTitle' },
          { id: 'examples-controller', labelKey: 'docs.section.examples.controllerTitle' },
          { id: 'examples-cover', labelKey: 'docs.section.examples.coverTitle' },
        ],
      },
    ],
  },
  {
    titleKey: 'docs.sidebar.reference',
    items: [
      { id: 'typescript', labelKey: 'docs.sidebar.typescript' },
      { id: 'migration', labelKey: 'docs.sidebar.migration' },
      {
        id: 'faq',
        labelKey: 'docs.sidebar.faq',
        items: [
          { id: 'faq-tailwind-shrink', labelKey: 'docs.section.faq.tailwind-shrink.q' },
          { id: 'faq-r19-imperative', labelKey: 'docs.section.faq.r19-imperative.q' },
          { id: 'faq-wrapper-empty', labelKey: 'docs.section.faq.wrapper-empty.q' },
          { id: 'faq-vite-esm', labelKey: 'docs.section.faq.vite-esm.q' },
          { id: 'faq-wrapper-dynamic', labelKey: 'docs.section.faq.wrapper-dynamic.q' },
          { id: 'faq-lazy-src', labelKey: 'docs.section.faq.lazy-src.q' },
          { id: 'faq-cover-vs-set', labelKey: 'docs.section.faq.cover-vs-set.q' },
          { id: 'faq-controlled-mismatch', labelKey: 'docs.section.faq.controlled-mismatch.q' },
          { id: 'faq-ssr', labelKey: 'docs.section.faq.ssr.q' },
          { id: 'faq-theme', labelKey: 'docs.section.faq.theme.q' },
        ],
      },
    ],
  },
]

function isActiveItem (item: Item, activeId: string): boolean {
  return item.id === activeId || Boolean(item.items?.some(child => isActiveItem(child, activeId)))
}

function SidebarItems ({
  items,
  activeId,
  t,
  depth = 0,
}: {
  items: Item[]
  activeId: string
  t: (key: I18nKey) => string
  depth?: number
}) {
  return (
    <ul className={cn(depth === 0 ? 'space-y-1 border-l border-border/60' : 'mt-1 space-y-1')}>
      {items.map(it => {
        const active = it.id === activeId
        const activeBranch = !active && isActiveItem(it, activeId)
        return (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className={cn(
                '-ml-px block border-l-2 py-1 transition-colors',
                depth === 0 ? 'px-3' : 'px-5 text-xs',
                active
                  ? 'border-foreground text-foreground'
                  : activeBranch
                    ? 'border-border text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground',
              )}
            >
              {t(it.labelKey)}
            </a>
            {it.items && <SidebarItems items={it.items} activeId={activeId} t={t} depth={depth + 1} />}
          </li>
        )
      })}
    </ul>
  )
}

export function Sidebar ({ activeId }: { activeId: string }) {
  const { t } = useT()
  return (
    <nav className="space-y-6 text-sm">
      {SIDEBAR_GROUPS.map(g => (
        <div key={g.titleKey}>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t(g.titleKey)}</div>
          <SidebarItems items={g.items} activeId={activeId} t={t} />
        </div>
      ))}
    </nav>
  )
}
