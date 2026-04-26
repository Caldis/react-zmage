import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useT } from '@/i18n/useT'

type SetItem = { src: string; alt?: string }

export function SetControl ({ value, onChange }: { value: SetItem[] | undefined; onChange: (v: SetItem[]) => void }) {
  const { t } = useT()
  const items: SetItem[] = Array.isArray(value) ? value : []
  const update = (i: number, patch: Partial<SetItem>) => {
    const next = items.slice()
    next[i] = { ...next[i], ...patch }
    onChange(next)
  }
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i))
  const add = () => onChange([...items, { src: '', alt: '' }])
  return (
    <div className="space-y-2">
      {items.map((it, i) => (
        <div key={i} className="grid grid-cols-[40px_1fr_1fr_auto] items-center gap-2">
          <div className="h-10 w-10 overflow-hidden rounded border border-border bg-muted">
            {it.src && <img src={it.src} alt="" className="h-full w-full object-cover" />}
          </div>
          <Input value={it.src} onChange={e => update(i, { src: e.target.value })} placeholder="src" className="h-8 text-xs" />
          <Input value={it.alt ?? ''} onChange={e => update(i, { alt: e.target.value })} placeholder="alt" className="h-8 text-xs" />
          <Button size="icon" variant="ghost" onClick={() => remove(i)} aria-label={t('common.remove')}>
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ))}
      <Button size="sm" variant="outline" onClick={add}>
        <Plus className="mr-1 h-3.5 w-3.5" /> {t('common.add')}
      </Button>
    </div>
  )
}
