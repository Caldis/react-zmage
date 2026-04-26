import * as React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import { RotateCcw, Share2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useT } from '@/i18n/useT'
import { cn } from '@/lib/utils'
import { ParamPanel } from '@/playground/ParamPanel'
import { PARAM_SCHEMA } from '@/schema/param-schema'
import { encodeStateToHash, decodeStateFromHash } from '@/playground/shareState'
import { PLAYGROUND_SEED } from '@/playground/seed'
import ComponentMode from './playground/ComponentMode'
import ImperativeMode from './playground/ImperativeMode'
import WrapperMode from './playground/WrapperMode'

function defaultValues () {
  const v: Record<string, any> = {}
  for (const def of PARAM_SCHEMA) v[def.name] = def.default
  // WYSIWYG: 用 demo 种子替换 src/alt/set 的 lib 默认空值, 让 panel 一开始就反映真实预览
  Object.assign(v, PLAYGROUND_SEED)
  return v
}

const TABS = [
  { to: '', labelKey: 'pg.tab.component' as const, end: true },
  { to: 'imperative', labelKey: 'pg.tab.imperative' as const, end: false },
  { to: 'wrapper', labelKey: 'pg.tab.wrapper' as const, end: false },
]

export default function Playground () {
  const { t } = useT()
  const [values, setValues] = React.useState<Record<string, any>>(() => {
    const base = defaultValues()
    if (typeof window !== 'undefined') {
      const hydrated = decodeStateFromHash(window.location.hash)
      Object.assign(base, hydrated)
    }
    return base
  })
  const [shared, setShared] = React.useState(false)

  const onChange = React.useCallback((name: string, value: any) => {
    setValues(v => ({ ...v, [name]: value }))
  }, [])

  const onReset = React.useCallback(() => setValues(defaultValues()), [])

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

      <div className="mb-6 inline-flex rounded-lg border border-border bg-muted/30 p-1">
        {TABS.map(tab => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) =>
              cn(
                'rounded-md px-3 py-1.5 text-sm transition-colors',
                isActive ? 'bg-background text-foreground shadow' : 'text-muted-foreground hover:text-foreground',
              )
            }
          >
            {t(tab.labelKey)}
          </NavLink>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        <aside className="rounded-lg border border-border bg-card/30 py-2">
          <ParamPanel values={values} onChange={onChange} />
        </aside>
        <section className="min-w-0">
          <Routes>
            <Route index element={<ComponentMode values={values} />} />
            <Route path="imperative" element={<ImperativeMode values={values} />} />
            <Route path="wrapper" element={<WrapperMode values={values} />} />
          </Routes>
        </section>
      </div>
    </div>
  )
}
