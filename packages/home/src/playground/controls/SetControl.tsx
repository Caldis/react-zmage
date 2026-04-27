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
    <div className="space-y-3">
      {items.map((it, i) => {
        const num = String(i + 1).padStart(2, '0')
        return (
          <div key={i} className="group flex items-start gap-2">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded border border-border/60 bg-muted">
              {it.src && <img src={it.src} alt="" className="h-full w-full object-cover" />}
              <span className="pointer-events-none absolute bottom-0 right-0 bg-background/80 px-0.5 font-mono text-[9px] leading-tight text-foreground/60">
                {num}
              </span>
            </div>
            <div className="grid min-w-0 flex-1 gap-1">
              <Input
                value={it.src}
                onChange={e => update(i, { src: e.target.value })}
                placeholder="src"
                className="h-7 px-2 text-xs md:text-xs"
              />
              <Input
                value={it.alt ?? ''}
                onChange={e => update(i, { alt: e.target.value })}
                placeholder="alt"
                className="h-7 px-2 text-xs md:text-xs"
              />
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => remove(i)}
              className="h-7 w-7 shrink-0 text-muted-foreground/60 hover:bg-destructive/10 hover:text-destructive"
              aria-label={t('common.remove')}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        )
      })}
      <button
        type="button"
        onClick={add}
        className="flex w-full items-center justify-center gap-1.5 rounded border border-dashed border-border/60 bg-transparent px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-border hover:bg-muted/40 hover:text-foreground"
      >
        <Plus className="h-3 w-3" /> {t('common.add')}
      </button>
    </div>
  )
}
