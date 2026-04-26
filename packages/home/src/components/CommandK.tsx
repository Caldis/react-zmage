import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { SIDEBAR_GROUPS } from '@/docs/Sidebar'
import { PARAM_SCHEMA } from '@/schema/param-schema'
import { useT } from '@/i18n/useT'
import { Button } from '@/components/ui/button'
import type { I18nKey } from '@/i18n/dict'

const IS_MAC = typeof navigator !== 'undefined' && /mac|iphone|ipad|ipod/i.test(navigator.platform || navigator.userAgent || '')
const SHORTCUT_LABEL = IS_MAC ? '⌘K' : 'Ctrl+K'

type Item = { id: string; label: string; href: string; group: string }

function buildIndex (t: (k: I18nKey) => string): Item[] {
  const out: Item[] = []
  for (const g of SIDEBAR_GROUPS) {
    for (const it of g.items) {
      out.push({ id: it.id, label: t(it.labelKey), href: `/docs#${it.id}`, group: t(g.titleKey) })
    }
  }
  for (const def of PARAM_SCHEMA) {
    out.push({ id: `prop-${def.name}`, label: def.name as string, href: `/docs#props-${def.group}`, group: 'Props' })
  }
  return out
}

function fuzzyScore (q: string, label: string) {
  const ql = q.toLowerCase(); const ll = label.toLowerCase()
  if (ll.includes(ql)) return 100 - (ll.indexOf(ql))
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
      .map(it => ({ it, s: fuzzyScore(q, it.label) }))
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
      <DialogContent className="max-w-xl p-0">
        <div className="border-b border-border p-3">
          <Input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder={t('docs.search.placeholder')} className="border-0 px-0 focus-visible:ring-0" />
        </div>
        <ul className="max-h-72 overflow-y-auto p-2">
          {results.length === 0 ? (
            <li className="p-3 text-sm text-muted-foreground">{t('docs.search.empty')}</li>
          ) : results.map(r => (
            <li key={r.id}>
              <button
                className="flex w-full cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent"
                onClick={() => { setOpen(false); navigate(r.href) }}
              >
                <span>{r.label}</span>
                <span className="text-xs text-muted-foreground">{r.group}</span>
              </button>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  )
}
