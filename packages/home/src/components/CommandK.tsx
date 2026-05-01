import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { SIDEBAR_GROUPS } from '@/docs/Sidebar'
import { FAQ_ITEMS } from '@/docs/sections/FAQ'
import { PARAM_SCHEMA } from '@/schema/param-schema'
import { useT } from '@/i18n/useT'
import { Button } from '@/components/ui/button'
import type { I18nKey } from '@/i18n/dict'

const IS_MAC = typeof navigator !== 'undefined' && /mac|iphone|ipad|ipod/i.test(navigator.platform || navigator.userAgent || '')
const SHORTCUT_LABEL = IS_MAC ? '⌘K' : 'Ctrl+K'

type Item = { id: string; label: string; desc: string; href: string; group: string }

// Sub-property entries surfaced in search. Each leaf gets its own searchable entry,
// linking back to the parent group's anchor in the Props section.
type SubEntry = {
  parent: 'controller' | 'hotkey' | 'animate' | 'gesture'
  /** Leaf key, e.g. "flip", "flipLeft". Combined with the parent into the displayed label. */
  leaf: string
  /** i18n key for the localized leaf name. */
  labelKey: I18nKey
  /** i18n key for the longer description. May be omitted for value-style entries. */
  descKey?: I18nKey
  /** Optional override for the dotted-path token in the haystack — used when the
   *  parent prop is `hotKey` (camel) but the i18n namespace is `hotkey` (lower). */
  parentDisplay?: string
  /** Marks this as a "value you can pass" rather than a sub-property toggle. */
  isValue?: boolean
}

const SUB_PARAM_ENTRIES: SubEntry[] = [
  // Controller children — link → /docs#props-controller
  { parent: 'controller', leaf: 'pagination', labelKey: 'controller.pagination', descKey: 'controller.pagination.desc' },
  { parent: 'controller', leaf: 'rotate',      labelKey: 'controller.rotate',      descKey: 'controller.rotate.desc' },
  { parent: 'controller', leaf: 'rotateLeft',  labelKey: 'controller.rotateLeft',  descKey: 'controller.rotateLeft.desc' },
  { parent: 'controller', leaf: 'rotateRight', labelKey: 'controller.rotateRight', descKey: 'controller.rotateRight.desc' },
  { parent: 'controller', leaf: 'zoom',        labelKey: 'controller.zoom',        descKey: 'controller.zoom.desc' },
  { parent: 'controller', leaf: 'download',    labelKey: 'controller.download',    descKey: 'controller.download.desc' },
  { parent: 'controller', leaf: 'close',       labelKey: 'controller.close',       descKey: 'controller.close.desc' },
  { parent: 'controller', leaf: 'flip',        labelKey: 'controller.flip',        descKey: 'controller.flip.desc' },
  { parent: 'controller', leaf: 'flipLeft',    labelKey: 'controller.flipLeft',    descKey: 'controller.flipLeft.desc' },
  { parent: 'controller', leaf: 'flipRight',   labelKey: 'controller.flipRight',   descKey: 'controller.flipRight.desc' },
  // Visual override entries — strings the toolbar renders, not button toggles.
  { parent: 'controller', leaf: 'backdrop',    labelKey: 'controller.backdrop',    descKey: 'controller.backdrop.desc' },
  { parent: 'controller', leaf: 'color',       labelKey: 'controller.color',       descKey: 'controller.color.desc' },

  // HotKey children — link → /docs#props-hotkey. Display the parent as "hotKey"
  // (matching the prop name) while the i18n namespace stays lowercase.
  { parent: 'hotkey', leaf: 'close',     labelKey: 'hotkey.close',     descKey: 'hotkey.close.desc',     parentDisplay: 'hotKey' },
  { parent: 'hotkey', leaf: 'zoom',      labelKey: 'hotkey.zoom',      descKey: 'hotkey.zoom.desc',      parentDisplay: 'hotKey' },
  { parent: 'hotkey', leaf: 'flip',      labelKey: 'hotkey.flip',      descKey: 'hotkey.flip.desc',      parentDisplay: 'hotKey' },
  { parent: 'hotkey', leaf: 'flipLeft',  labelKey: 'hotkey.flipLeft',  descKey: 'hotkey.flipLeft.desc',  parentDisplay: 'hotKey' },
  { parent: 'hotkey', leaf: 'flipRight', labelKey: 'hotkey.flipRight', descKey: 'hotkey.flipRight.desc', parentDisplay: 'hotKey' },

  // Animate children — link → /docs#props-animate.
  // browsing/flip/cover are sub-keys; the four flip animation values are values you can pass.
  { parent: 'animate', leaf: 'browsing', labelKey: 'animate.browsing.desc', descKey: 'animate.browsing.desc' },
  { parent: 'animate', leaf: 'flip',     labelKey: 'animate.flip.desc',     descKey: 'animate.flip.desc' },
  { parent: 'animate', leaf: 'cover',    labelKey: 'animate.cover.desc',    descKey: 'animate.cover.desc' },
  { parent: 'animate', leaf: 'fade',      labelKey: 'animate.flip.fade',      descKey: 'animate.flip.desc', isValue: true },
  { parent: 'animate', leaf: 'crossFade', labelKey: 'animate.flip.crossFade', descKey: 'animate.flip.desc', isValue: true },
  { parent: 'animate', leaf: 'swipe',     labelKey: 'animate.flip.swipe',     descKey: 'animate.flip.desc', isValue: true },
  { parent: 'animate', leaf: 'zoom',      labelKey: 'animate.flip.zoom',      descKey: 'animate.flip.desc', isValue: true },

  // Gesture children — link → /docs#props-gesture.
  { parent: 'gesture', leaf: 'swipe',      labelKey: 'gesture.swipe',      descKey: 'gesture.swipe.desc' },
  { parent: 'gesture', leaf: 'dragExit',   labelKey: 'gesture.dragExit',   descKey: 'gesture.dragExit.desc' },
  { parent: 'gesture', leaf: 'wheelZoom',  labelKey: 'gesture.wheelZoom',  descKey: 'gesture.wheelZoom.desc' },
  { parent: 'gesture', leaf: 'threshold',  labelKey: 'gesture.threshold',  descKey: 'gesture.threshold.desc' },
  { parent: 'gesture', leaf: 'velocity',   labelKey: 'gesture.velocity',   descKey: 'gesture.velocity.desc' },
  { parent: 'gesture', leaf: 'axisLock',   labelKey: 'gesture.axisLock',   descKey: 'gesture.axisLock.desc' },
  { parent: 'gesture', leaf: 'resistance', labelKey: 'gesture.resistance', descKey: 'gesture.resistance.desc' },
  { parent: 'gesture', leaf: 'opacity',    labelKey: 'gesture.opacity',    descKey: 'gesture.opacity.desc' },
  { parent: 'gesture', leaf: 'step',       labelKey: 'gesture.wheelZoom.step', descKey: 'gesture.wheelZoom.step.desc' },
  { parent: 'gesture', leaf: 'smooth',     labelKey: 'gesture.wheelZoom.smooth', descKey: 'gesture.wheelZoom.smooth.desc' },
  { parent: 'gesture', leaf: 'minScale',   labelKey: 'gesture.wheelZoom.minScale', descKey: 'gesture.wheelZoom.minScale.desc' },
  { parent: 'gesture', leaf: 'maxScale',   labelKey: 'gesture.wheelZoom.maxScale', descKey: 'gesture.wheelZoom.maxScale.desc' },
  { parent: 'gesture', leaf: 'center',     labelKey: 'gesture.wheelZoom.center', descKey: 'gesture.wheelZoom.center.desc' },
  { parent: 'gesture', leaf: 'reverse',    labelKey: 'gesture.wheelZoom.reverse', descKey: 'gesture.wheelZoom.reverse.desc' },
  { parent: 'gesture', leaf: 'exitGuardDuration', labelKey: 'gesture.wheelZoom.exitGuardDuration', descKey: 'gesture.wheelZoom.exitGuardDuration.desc' },
]

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
  'props-gesture': 'docs.search.desc.propsGesture',
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
  // Sub-property entries — controller.X / hotKey.X / animate.X (+ flip-animation values).
  // Label embeds the dotted path so the existing label-includes scorer matches both
  // "flip" alone and "controller flip" / "controller.flip" queries.
  for (const sub of SUB_PARAM_ENTRIES) {
    const parentToken = sub.parentDisplay ?? sub.parent
    const localized = t(sub.labelKey)
    const descLine = sub.descKey ? t(sub.descKey) : ''
    const label = sub.isValue
      ? `${parentToken}.flip = "${sub.leaf}"`
      : `${parentToken}.${sub.leaf}`
    // Localized leaf name appears in desc so non-Latin queries still match.
    const desc = descLine && descLine !== localized ? `${localized} — ${descLine}` : localized
    out.push({
      id: `sub-${sub.parent}-${sub.leaf}${sub.isValue ? '-value' : ''}`,
      label,
      desc,
      href: `/docs#props-${sub.parent}`,
      group: propsLabel,
    })
  }
  // Per-FAQ entries — surfaced so queries like "data-src" or "缩略图" hit the specific
  // FAQ rather than only the top-level FAQ anchor. Q is the label (high-weight match);
  // A is the desc (low-weight) so any keyword in the answer still scores.
  const faqLabel = t('docs.sidebar.faq')
  for (const slug of FAQ_ITEMS) {
    out.push({
      id: `faq-${slug}`,
      label: t(`docs.section.faq.${slug}.q` as I18nKey),
      desc: t(`docs.section.faq.${slug}.a` as I18nKey),
      href: `/docs#faq-${slug}`,
      group: faqLabel,
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
