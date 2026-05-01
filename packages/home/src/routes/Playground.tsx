import * as React from 'react'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { RotateCcw, Share2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useT } from '@/i18n/useT'
import { cn } from '@/lib/utils'
import { ParamPanel } from '@/playground/ParamPanel'
import { SlidingPill } from '@/components/ui/SlidingPill'
import { encodeStateToHash, decodeStateFromHash } from '@/playground/shareState'
import { applyPresetDrivenDefaults, getInitialValues } from '@/playground/state'
import ComponentMode from './playground/ComponentMode'
import ImperativeMode from './playground/ImperativeMode'
import WrapperMode from './playground/WrapperMode'

const TABS = [
  { to: '', labelKey: 'pg.tab.component' as const, end: true },
  { to: 'imperative', labelKey: 'pg.tab.imperative' as const, end: false },
  { to: 'wrapper', labelKey: 'pg.tab.wrapper' as const, end: false },
]

export default function Playground () {
  const { t } = useT()
  const location = useLocation()
  // Active-mode "when to use" key, derived from URL — drives the subtitle below the tab pills.
  const activeWhenKey = location.pathname.endsWith('/imperative')
    ? 'modes.imperative.when' as const
    : location.pathname.endsWith('/wrapper')
      ? 'modes.wrapper.when' as const
      : 'modes.component.when' as const
  const [values, setValues] = React.useState<Record<string, any>>(() => {
    const base = getInitialValues()
    if (typeof window !== 'undefined') {
      const hydrated = decodeStateFromHash(window.location.hash)
      Object.assign(base, hydrated)
      applyPresetDrivenDefaults(base, new Set(Object.keys(hydrated)))
    }
    return base
  })
  // dirty 集合: snippet 显示规则的输入. URL 里出现的 key 视为用户曾经动过, 重载后 snippet 仍然展示.
  const [touched, setTouched] = React.useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set()
    return new Set(Object.keys(decodeStateFromHash(window.location.hash)))
  })
  // snippet-only display preference: when true, drop every prop equal to its schema default
  // regardless of dirty bit. 不影响 livedemo / 分享 URL.
  const [hideDefaults, setHideDefaults] = React.useState(false)
  const [shared, setShared] = React.useState(false)

  const onChange = React.useCallback((name: string, value: any) => {
    setValues(v => {
      const next = { ...v, [name]: value }
      if (name === 'preset') {
        applyPresetDrivenDefaults(next, touched)
      }
      return next
    })
    setTouched(t => t.has(name) ? t : new Set(t).add(name))
  }, [touched])

  const onReset = React.useCallback(() => {
    setValues(getInitialValues())
    setTouched(new Set())
  }, [])

  const onShare = React.useCallback(async () => {
    const url = window.location.origin + window.location.pathname + encodeStateToHash(values)
    window.history.replaceState(null, '', url)
    await navigator.clipboard.writeText(url)
    setShared(true)
    setTimeout(() => setShared(false), 1500)
  }, [values])

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{t('pg.title')}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t('pg.subtitle')}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onReset}>
            <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> {t('pg.reset')}
          </Button>
          <Button variant="outline" size="sm" onClick={onShare}>
            {shared ? <Check className="mr-1.5 h-3.5 w-3.5" /> : <Share2 className="mr-1.5 h-3.5 w-3.5" />}
            {shared ? t('pg.shared') : t('pg.share')}
          </Button>
        </div>
      </div>

      <div className="relative mb-3 inline-flex rounded-lg border border-border bg-muted/30 p-1">
        <SlidingPill />
        {TABS.map(tab => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) =>
              cn(
                'relative z-10 cursor-pointer rounded-md px-3 py-1.5 text-sm transition-colors',
                isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
              )
            }
          >
            {t(tab.labelKey)}
          </NavLink>
        ))}
      </div>
      <p className="mb-6 max-w-3xl text-sm text-muted-foreground">{t(activeWhenKey)}</p>

      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        <aside className="rounded-lg border border-border bg-card/30 py-2">
          <ParamPanel values={values} onChange={onChange} />
        </aside>
        <section className="min-w-0">
          <Routes>
            <Route index element={<ComponentMode values={values} touched={touched} hideDefaults={hideDefaults} onHideDefaultsChange={setHideDefaults} />} />
            <Route path="imperative" element={<ImperativeMode values={values} touched={touched} hideDefaults={hideDefaults} onHideDefaultsChange={setHideDefaults} />} />
            <Route path="wrapper" element={<WrapperMode values={values} touched={touched} hideDefaults={hideDefaults} onHideDefaultsChange={setHideDefaults} />} />
          </Routes>
        </section>
      </div>
    </div>
  )
}
