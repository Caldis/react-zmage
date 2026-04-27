import { HoverSelect } from '@/components/ui/HoverSelect'
import { Switch } from '@/components/ui/switch'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useT } from '@/i18n/useT'
import type { I18nKey } from '@/i18n/dict'

type Animate = { browsing?: boolean; flip?: 'fade' | 'crossFade' | 'swipe' | 'zoom' }

const FLIP_OPTIONS: { value: NonNullable<Animate['flip']>; labelKey: I18nKey }[] = [
  { value: 'fade', labelKey: 'animate.flip.fade' },
  { value: 'crossFade', labelKey: 'animate.flip.crossFade' },
  { value: 'swipe', labelKey: 'animate.flip.swipe' },
  { value: 'zoom', labelKey: 'animate.flip.zoom' },
]

function TipLabel ({ children, descKey }: { children: React.ReactNode; descKey: I18nKey }) {
  const { t } = useT()
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="cursor-help text-muted-foreground decoration-dotted underline-offset-4 hover:underline">
          {children}
        </span>
      </TooltipTrigger>
      <TooltipContent side="left" className="max-w-[260px] text-xs">
        {t(descKey)}
      </TooltipContent>
    </Tooltip>
  )
}

export function AnimateControl ({ value, onChange }: { value: Animate | boolean | undefined; onChange: (v: any) => void }) {
  const { t } = useT()
  const obj: Animate = (typeof value === 'object' && value) ? value : {}
  return (
    <div className="grid gap-1.5 text-[11px] leading-tight">
      <label className="flex items-center justify-between gap-3">
        <TipLabel descKey="animate.browsing.desc">browsing</TipLabel>
        <Switch checked={!!obj.browsing} onCheckedChange={c => onChange({ ...obj, browsing: c })} />
      </label>
      <label className="flex items-center justify-between gap-3">
        <TipLabel descKey="animate.flip.desc">flip</TipLabel>
        <HoverSelect
          value={obj.flip ?? 'fade'}
          onValueChange={(v) => onChange({ ...obj, flip: v })}
          triggerClassName="h-7 w-32 text-[11px]"
          options={FLIP_OPTIONS.map(o => ({ value: o.value, label: t(o.labelKey) }))}
        />
      </label>
    </div>
  )
}
