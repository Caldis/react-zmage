import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useT } from '@/i18n/useT'
import type { I18nKey } from '@/i18n/dict'

type GestureSwipeOptions = {
  threshold?: number
  velocity?: number
  axisLock?: number
  resistance?: number
}

type GestureDragExitOptions = {
  threshold?: number
  velocity?: number
  axisLock?: number
  opacity?: boolean
}

type GestureSet = {
  swipe?: boolean | GestureSwipeOptions
  dragExit?: boolean | GestureDragExitOptions
}

const DEFAULT_SWIPE: Required<GestureSwipeOptions> = {
  threshold: 120,
  velocity: 0.35,
  axisLock: 1.2,
  resistance: 0.35,
}

const DEFAULT_DRAG_EXIT: Required<GestureDragExitOptions> = {
  threshold: 80,
  velocity: 0.35,
  axisLock: 1.2,
  opacity: true,
}

function TipLabel ({ name, descKey }: { name: string; descKey: I18nKey }) {
  const { t } = useT()
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="cursor-help font-mono text-muted-foreground decoration-dotted underline-offset-4 hover:underline">
          {name}
        </span>
      </TooltipTrigger>
      <TooltipContent side="left" className="max-w-[260px] text-xs">
        {t(descKey)}
      </TooltipContent>
    </Tooltip>
  )
}

function NumberControl ({
  value,
  min,
  max,
  step,
  onChange,
}: {
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
}) {
  return (
    <div className="flex items-center gap-2">
      <Slider min={min} max={max} step={step} value={[value]} onValueChange={(v) => onChange(v[0])} className="flex-1" />
      <Input
        type="number"
        value={value}
        step={step}
        onChange={e => onChange(Number(e.target.value))}
        className="h-7 w-16 px-2 text-xs md:text-xs"
      />
    </div>
  )
}

export function GestureControl ({ value, onChange }: { value: GestureSet | boolean | undefined; onChange: (v: any) => void }) {
  const disabled = value === false
  const obj: GestureSet = (typeof value === 'object' && value) ? value : {}
  const swipe = (obj.swipe && typeof obj.swipe === 'object') ? { ...DEFAULT_SWIPE, ...obj.swipe } : DEFAULT_SWIPE
  const dragExit = (obj.dragExit && typeof obj.dragExit === 'object') ? { ...DEFAULT_DRAG_EXIT, ...obj.dragExit } : DEFAULT_DRAG_EXIT

  const setSwipe = (next: boolean | GestureSwipeOptions) => onChange({ ...obj, swipe: next })
  const setDragExit = (next: boolean | GestureDragExitOptions) => onChange({ ...obj, dragExit: next })

  return (
    <div className="grid gap-2 text-[11px] leading-tight">
      <label className="flex items-center justify-between gap-3">
        <TipLabel name="gesture" descKey="gesture.desc" />
        <Switch checked={!disabled} onCheckedChange={checked => onChange(checked ? { swipe: DEFAULT_SWIPE, dragExit: DEFAULT_DRAG_EXIT } : false)} />
      </label>
      {!disabled && (
        <>
          <div className="rounded border border-border/70 p-2">
            <label className="flex items-center justify-between gap-3">
              <TipLabel name="swipe" descKey="gesture.swipe.desc" />
              <Switch checked={obj.swipe !== false} onCheckedChange={checked => setSwipe(checked ? swipe : false)} />
            </label>
            {obj.swipe !== false && (
              <div className="mt-2 grid gap-2">
                <OptionNumber name="threshold" descKey="gesture.threshold.desc" value={swipe.threshold} min={40} max={240} step={5} onChange={v => setSwipe({ ...swipe, threshold: v })} />
                <OptionNumber name="velocity" descKey="gesture.velocity.desc" value={swipe.velocity} min={0.1} max={1} step={0.05} onChange={v => setSwipe({ ...swipe, velocity: v })} />
                <OptionNumber name="axisLock" descKey="gesture.axisLock.desc" value={swipe.axisLock} min={1} max={2} step={0.05} onChange={v => setSwipe({ ...swipe, axisLock: v })} />
                <OptionNumber name="resistance" descKey="gesture.resistance.desc" value={swipe.resistance} min={0.1} max={1} step={0.05} onChange={v => setSwipe({ ...swipe, resistance: v })} />
              </div>
            )}
          </div>
          <div className="rounded border border-border/70 p-2">
            <label className="flex items-center justify-between gap-3">
              <TipLabel name="dragExit" descKey="gesture.dragExit.desc" />
              <Switch checked={obj.dragExit !== false} onCheckedChange={checked => setDragExit(checked ? dragExit : false)} />
            </label>
            {obj.dragExit !== false && (
              <div className="mt-2 grid gap-2">
                <OptionNumber name="threshold" descKey="gesture.threshold.desc" value={dragExit.threshold} min={40} max={240} step={5} onChange={v => setDragExit({ ...dragExit, threshold: v })} />
                <OptionNumber name="velocity" descKey="gesture.velocity.desc" value={dragExit.velocity} min={0.1} max={1} step={0.05} onChange={v => setDragExit({ ...dragExit, velocity: v })} />
                <OptionNumber name="axisLock" descKey="gesture.axisLock.desc" value={dragExit.axisLock} min={1} max={2} step={0.05} onChange={v => setDragExit({ ...dragExit, axisLock: v })} />
                <label className="flex items-center justify-between gap-3">
                  <TipLabel name="opacity" descKey="gesture.opacity.desc" />
                  <Switch checked={dragExit.opacity !== false} onCheckedChange={checked => setDragExit({ ...dragExit, opacity: checked })} />
                </label>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

function OptionNumber ({
  name,
  descKey,
  value,
  min,
  max,
  step,
  onChange,
}: {
  name: string
  descKey: I18nKey
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
}) {
  return (
    <label className="grid grid-cols-[72px_1fr] items-center gap-2">
      <TipLabel name={name} descKey={descKey} />
      <NumberControl value={value} min={min} max={max} step={step} onChange={onChange} />
    </label>
  )
}
