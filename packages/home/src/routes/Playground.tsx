import * as React from 'react'
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import { RotateCcw, Share2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useT } from '@/i18n/useT'
import { cn } from '@/lib/utils'
import { ParamPanel } from '@/playground/ParamPanel'
import { PARAM_SCHEMA } from '@/schema/param-schema'
import ComponentMode from './playground/ComponentMode'
import ImperativeMode from './playground/ImperativeMode'
import WrapperMode from './playground/WrapperMode'

function defaultValues () {
  const v: Record<string, any> = {}
  for (const def of PARAM_SCHEMA) v[def.name] = def.default
  return v
}

const TABS = [
  { to: '', labelKey: 'pg.tab.component' as const, end: true },
  { to: 'imperative', labelKey: 'pg.tab.imperative' as const, end: false },
  { to: 'wrapper', labelKey: 'pg.tab.wrapper' as const, end: false },
]

export default function Playground () {
  const { t } = useT()
  const [values, setValues] = React.useState<Record<string, any>>(defaultValues)
  const [shared, setShared] = React.useState(false)
  const navigate = useNavigate()

  const onChange = React.useCallback((name: string, value: any) => {
    setValues(v => ({ ...v, [name]: value }))
  }, [])

  const onReset = React.useCallback(() => setValues(defaultValues()), [])

  const onShare = React.useCallback(async () => {
    // wired up properly in Task 22
    await navigator.clipboard.writeText(window.location.href)
    setShared(true)
    setTimeout(() => setShared(false), 1500)
  }, [])

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
        <aside className="rounded-lg border border-border bg-card/30 py-1">
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
