import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useT } from '@/i18n/useT'
import type { I18nKey } from '@/i18n/dict'

type Animate = { browsing?: boolean; flip?: 'fade' | 'crossFade' | 'swipe' | 'zoom' }

const FLIP_OPTIONS: { value: NonNullable<Animate['flip']>; labelKey: I18nKey }[] = [
  { value: 'fade', labelKey: 'animate.flip.fade' },
  { value: 'crossFade', labelKey: 'animate.flip.crossFade' },
  { value: 'swipe', labelKey: 'animate.flip.swipe' },
  { value: 'zoom', labelKey: 'animate.flip.zoom' },
]

export function AnimateControl ({ value, onChange }: { value: Animate | boolean | undefined; onChange: (v: any) => void }) {
  const { t } = useT()
  const obj: Animate = (typeof value === 'object' && value) ? value : {}
  return (
    <div className="grid gap-1.5 text-[11px] leading-tight">
      <label className="flex items-center justify-between gap-3">
        <span className="text-muted-foreground">browsing</span>
        <Switch checked={!!obj.browsing} onCheckedChange={c => onChange({ ...obj, browsing: c })} />
      </label>
      <label className="flex items-center justify-between gap-3">
        <span className="text-muted-foreground">flip</span>
        <Select value={obj.flip ?? 'fade'} onValueChange={(v) => onChange({ ...obj, flip: v })}>
          <SelectTrigger className="h-7 w-32 text-[11px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            {FLIP_OPTIONS.map(o => <SelectItem key={o.value} value={o.value} className="text-[11px]">{t(o.labelKey)}</SelectItem>)}
          </SelectContent>
        </Select>
      </label>
    </div>
  )
}
