import * as React from 'react'
import { useT } from '@/i18n/useT'

type Entry = { ts: string; name: string; args: any[] }

export function EventLog () {
  const { t } = useT()
  const [entries, setEntries] = React.useState<Entry[]>([])
  React.useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { name: string; args: any[] }
      setEntries(prev => [
        { ts: new Date().toLocaleTimeString(), name: detail.name, args: detail.args },
        ...prev,
      ].slice(0, 50))
    }
    window.addEventListener('zmage-pg-event', handler)
    return () => window.removeEventListener('zmage-pg-event', handler)
  }, [])
  return (
    <div className="rounded-lg border border-border bg-card/30">
      <div className="border-b border-border px-3 py-2 text-xs font-medium text-muted-foreground">{t('pg.events.title')}</div>
      <div className="max-h-48 overflow-y-auto p-3 font-mono text-xs">
        {entries.length === 0
          ? <div className="text-muted-foreground">{t('pg.events.empty')}</div>
          : entries.map((e, i) => (
            <div key={i} className="flex gap-2">
              <span className="text-muted-foreground">{e.ts}</span>
              <span>{e.name}</span>
              <span className="truncate text-muted-foreground">{JSON.stringify(e.args)}</span>
            </div>
          ))}
      </div>
    </div>
  )
}
