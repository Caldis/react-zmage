import * as React from 'react'
import { ExpandablePanel } from '@/components/ExpandablePanel'
import { useT } from '@/i18n/useT'
import { cn } from '@/lib/utils'

type Entry = { ts: string; name: string; args: any[] }

function EventRows ({
  entries,
  emptyLabel,
  compact = false,
}: {
  entries: Entry[]
  emptyLabel: string
  compact?: boolean
}) {
  if (entries.length === 0) {
    return <div className="text-muted-foreground">{emptyLabel}</div>
  }

  return (
    <>
      {entries.map((entry, index) => (
        <div key={index} className={cn('grid gap-2', compact ? 'grid-cols-[5.5rem_7rem_minmax(0,1fr)]' : 'grid-cols-[6rem_8rem_minmax(0,1fr)]')}>
          <span className="text-muted-foreground">{entry.ts}</span>
          <span>{entry.name}</span>
          <span className="truncate text-muted-foreground">{JSON.stringify(entry.args)}</span>
        </div>
      ))}
    </>
  )
}

export function EventLog ({ compact = false }: { compact?: boolean }) {
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

  if (compact) {
    return (
      <ExpandablePanel
        title={t('pg.events.title')}
        description={t('pg.events.subtitle')}
        expandLabel={t('common.expand')}
        preview={
          <div className="code-block-scroll max-h-36 overflow-auto font-mono text-xs leading-5">
            <EventRows entries={entries.slice(0, 8)} emptyLabel={t('pg.events.empty')} compact />
          </div>
        }
        expanded={
          <div className="code-block-scroll h-[62dvh] overflow-auto rounded-lg border border-border bg-muted/25 p-3 font-mono text-xs leading-5">
            <EventRows entries={entries} emptyLabel={t('pg.events.empty')} />
          </div>
        }
      />
    )
  }

  return (
    <div className="rounded-lg border border-border bg-card/30">
      <div className="border-b border-border px-3 py-2 text-xs font-medium text-muted-foreground">{t('pg.events.title')}</div>
      <div className="max-h-48 overflow-y-auto p-3 font-mono text-xs">
        <EventRows entries={entries} emptyLabel={t('pg.events.empty')} />
      </div>
    </div>
  )
}
