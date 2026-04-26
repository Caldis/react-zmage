import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { SIDEBAR_GROUPS } from '@/docs/Sidebar'
import { PARAM_SCHEMA } from '@/schema/param-schema'
import { useT } from '@/i18n/useT'
import { Button } from '@/components/ui/button'
import type { I18nKey } from '@/i18n/dict'

const IS_MAC = typeof navigator !== 'undefined' && /mac|iphone|ipad|ipod/i.test(navigator.platform || navigator.userAgent || '')
const SHORTCUT_LABEL = IS_MAC ? '⌘K' : 'Ctrl+K'

type Item = { id: string; label: string; desc: string; href: string; group: string }

// Side-anchor → desc i18n key. Items without an entry fall back to '' (no second line).
const SIDEBAR_DESC: Record<string, I18nKey> = {
  installation: 'docs.search.desc.installation',
  ssr: 'docs.search.desc.ssr',
  modes: 'docs.search.desc.modes',
  theming: 'docs.search.desc.theming',
  'props-data': 'docs.search.desc.propsData',
  'props-preset': 'docs.search.desc.propsPreset',
  'props-interface': 'docs.search.desc.propsInterface',
  'props-controller': 'docs.search.desc.propsController',
  'props-hotkey': 'docs.search.desc.propsHotkey',
  'props-animate': 'docs.search.desc.propsAnimate',
  'props-lifecycle': 'docs.search.desc.propsLifecycle',
  'props-controlled': 'docs.search.desc.propsControlled',
  examples: 'docs.search.desc.examples',
  typescript: 'docs.search.desc.typescript',
  migration: 'docs.search.desc.migration',
  faq: 'docs.search.desc.faq',
}

function buildIndex (t: (k: I18nKey) => string): Item[] {
  const out: Item[] = []
  for (const g of SIDEBAR_GROUPS) {
    for (const it of g.items) {
      const descKey = SIDEBAR_DESC[it.id]
      out.push({
        id: it.id,
        label: t(it.labelKey),
        desc: descKey ? t(descKey) : '',
        href: `/docs#${it.id}`,
        group: t(g.titleKey),
      })
    }
  }
  // Per-prop entries. Each prop's own descKey is already translated and grouped under Props.
  const propsLabel = t('docs.sidebar.props')
  for (const def of PARAM_SCHEMA) {
    out.push({
      id: `prop-${def.name}`,
      label: def.name as string,
      desc: t(def.i18n.descKey),
      href: `/docs#props-${def.group}`,
      group: propsLabel,
    })
  }
  return out
}

function fuzzyScore (q: string, label: string, desc: string) {
  const ql = q.toLowerCase()
  const ll = label.toLowerCase()
  const dl = desc.toLowerCase()
  // Title matches outweigh description matches.
  if (ll.includes(ql)) return 200 - ll.indexOf(ql)
  if (dl && dl.includes(ql)) return 100 - Math.min(dl.indexOf(ql), 99)
  // Subsequence-only fuzzy on label.
  let score = 0; let i = 0
  for (const ch of ll) { if (ch === ql[i]) { score += 1; i += 1; if (i >= ql.length) break } }
  return i === ql.length ? score : 0
}

export function CommandK () {
  const { t } = useT()
  const [open, setOpen] = React.useState(false)
  const [q, setQ] = React.useState('')
  const navigate = useNavigate()
  const index = React.useMemo(() => buildIndex(t), [t])
  const results = React.useMemo(() => {
    if (!q.trim()) return index.slice(0, 12)
    return index
      .map(it => ({ it, s: fuzzyScore(q, it.label, it.desc) }))
      .filter(r => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 12)
      .map(r => r.it)
  }, [q, index])

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(o => !o)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="hidden gap-2 text-muted-foreground sm:inline-flex">
          <Search className="h-3.5 w-3.5" />
          <span>{t('docs.search.placeholder')}</span>
          <span className="ml-auto rounded border border-border bg-background px-1.5 font-mono text-[10px]">{SHORTCUT_LABEL}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl gap-0 p-0">
        <DialogTitle className="sr-only">{t('docs.search.placeholder')}</DialogTitle>
        <DialogDescription className="sr-only">{t('docs.search.placeholder')}</DialogDescription>
        <div className="flex h-12 items-center gap-2 border-b border-border px-4 pr-12">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <Input
            autoFocus
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder={t('docs.search.placeholder')}
            className="border-0 bg-transparent px-0 shadow-none focus-visible:outline-none focus-visible:ring-0"
          />
        </div>
        <ul className="max-h-96 overflow-y-auto p-2">
          {results.length === 0 ? (
            <li className="p-3 text-sm text-muted-foreground">{t('docs.search.empty')}</li>
          ) : results.map(r => (
            <li key={r.id}>
              <button
                className="group flex w-full cursor-pointer items-start gap-3 rounded-md px-3 py-2 text-left transition-colors hover:bg-accent"
                onClick={() => { setOpen(false); navigate(r.href) }}
              >
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-foreground">{r.label}</div>
                  {r.desc && (
                    <div className="mt-0.5 truncate text-xs text-muted-foreground">{r.desc}</div>
                  )}
                </div>
                <span className="shrink-0 self-center rounded border border-border bg-muted/50 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                  {r.group}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  )
}
