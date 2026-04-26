import * as React from 'react'
import { cn } from '@/lib/utils'
import { useT } from '@/i18n/useT'

export function Toc ({ activeId }: { activeId: string }) {
  const { t } = useT()
  const [items, setItems] = React.useState<{ id: string; text: string; level: number }[]>([])
  React.useEffect(() => {
    const headings = Array.from(document.querySelectorAll('main h2[id], main h3[id]'))
    setItems(headings.map(h => ({
      id: h.id,
      text: h.textContent || '',
      level: Number(h.tagName[1]),
    })))
  }, [])
  return (
    <div className="text-sm">
      <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t('docs.toc.title')}</div>
      <ul className="space-y-1.5">
        {items.map(it => (
          <li key={it.id} className={cn(it.level === 3 && 'pl-3')}>
            <a href={`#${it.id}`} className={cn('block transition-colors', it.id === activeId ? 'text-foreground' : 'text-muted-foreground hover:text-foreground')}>
              {it.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function useScrollSpy (selector: string) {
  const [activeId, setActiveId] = React.useState<string>('')
  React.useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(selector))
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting)
                                .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: [0, 1] },
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [selector])
  return activeId
}
