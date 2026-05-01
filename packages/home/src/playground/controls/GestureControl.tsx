import { HoverSelect } from '@/components/ui/HoverSelect'
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

type GestureWheelZoomOptions = {
  step?: number
  smooth?: boolean
  minScale?: 'fit' | number
  maxScale?: number
  center?: 'pointer' | 'viewport'
  reverse?: boolean
  exitGuardDuration?: number
}

type GesturePinchZoomOptions = {
  minScale?: 'fit' | number
  maxScale?: number
  resetBelowFit?: boolean
  center?: 'gesture' | 'viewport'
}

type GestureDoubleTapZoomOptions = {
  scale?: number
  minScale?: 'fit' | number
  maxScale?: number
  center?: 'tap' | 'viewport'
  interval?: number
  distance?: number
}

type GestureTouchAction = 'managed' | 'auto' | 'manipulation' | 'none'

type GestureSet = {
  swipe?: boolean | GestureSwipeOptions
  dragExit?: boolean | GestureDragExitOptions
  wheelZoom?: boolean | GestureWheelZoomOptions
  pinchZoom?: boolean | GesturePinchZoomOptions
  doubleTapZoom?: boolean | GestureDoubleTapZoomOptions
  touchAction?: GestureTouchAction
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

const DEFAULT_WHEEL_ZOOM: Required<GestureWheelZoomOptions> = {
  step: 0.12,
  smooth: true,
  minScale: 'fit',
  maxScale: 4,
  center: 'pointer',
  reverse: false,
  exitGuardDuration: 1000,
}

const DEFAULT_PINCH_ZOOM: Required<GesturePinchZoomOptions> = {
  minScale: 'fit',
  maxScale: 4,
  resetBelowFit: true,
  center: 'gesture',
}

const DEFAULT_DOUBLE_TAP_ZOOM: Required<GestureDoubleTapZoomOptions> = {
  scale: 1,
  minScale: 'fit',
  maxScale: 4,
  center: 'tap',
  interval: 300,
  distance: 32,
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
  const wheelZoom = (obj.wheelZoom && typeof obj.wheelZoom === 'object') ? { ...DEFAULT_WHEEL_ZOOM, ...obj.wheelZoom } : DEFAULT_WHEEL_ZOOM
  const pinchZoom = (obj.pinchZoom && typeof obj.pinchZoom === 'object') ? { ...DEFAULT_PINCH_ZOOM, ...obj.pinchZoom } : DEFAULT_PINCH_ZOOM
  const doubleTapZoom = (obj.doubleTapZoom && typeof obj.doubleTapZoom === 'object') ? { ...DEFAULT_DOUBLE_TAP_ZOOM, ...obj.doubleTapZoom } : DEFAULT_DOUBLE_TAP_ZOOM
  const touchAction = obj.touchAction || 'managed'

  const setSwipe = (next: boolean | GestureSwipeOptions) => onChange({ ...obj, swipe: next })
  const setDragExit = (next: boolean | GestureDragExitOptions) => onChange({ ...obj, dragExit: next })
  const setWheelZoom = (next: boolean | GestureWheelZoomOptions) => onChange({ ...obj, wheelZoom: next })
  const setPinchZoom = (next: boolean | GesturePinchZoomOptions) => onChange({ ...obj, pinchZoom: next })
  const setDoubleTapZoom = (next: boolean | GestureDoubleTapZoomOptions) => onChange({ ...obj, doubleTapZoom: next })

  return (
    <div className="grid gap-2 text-[11px] leading-tight">
      <label className="flex items-center justify-between gap-3">
        <TipLabel name="gesture" descKey="gesture.desc" />
        <Switch checked={!disabled} onCheckedChange={checked => onChange(checked ? { swipe: DEFAULT_SWIPE, dragExit: DEFAULT_DRAG_EXIT, wheelZoom: DEFAULT_WHEEL_ZOOM, pinchZoom: DEFAULT_PINCH_ZOOM, doubleTapZoom: DEFAULT_DOUBLE_TAP_ZOOM, touchAction: 'managed' } : false)} />
      </label>
      {!disabled && (
        <>
          <label className="grid grid-cols-[72px_1fr] items-center gap-2 rounded border border-border/70 p-2">
            <TipLabel name="touchAction" descKey="gesture.touchAction.desc" />
            <HoverSelect
              value={touchAction}
              onValueChange={v => onChange({ ...obj, touchAction: v as GestureTouchAction })}
              triggerClassName="h-7 text-[11px]"
              options={[
                { value: 'managed', label: 'managed' },
                { value: 'auto', label: 'auto' },
                { value: 'manipulation', label: 'manipulation' },
                { value: 'none', label: 'none' },
              ]}
            />
          </label>
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
          <div className="rounded border border-border/70 p-2">
            <label className="flex items-center justify-between gap-3">
              <TipLabel name="pinchZoom" descKey="gesture.pinchZoom.desc" />
              <Switch checked={obj.pinchZoom !== false} onCheckedChange={checked => setPinchZoom(checked ? pinchZoom : false)} />
            </label>
            {obj.pinchZoom !== false && (
              <div className="mt-2 grid gap-2">
                <OptionNumber name="maxScale" descKey="gesture.pinchZoom.maxScale.desc" value={pinchZoom.maxScale} min={1} max={8} step={0.25} onChange={v => setPinchZoom({ ...pinchZoom, maxScale: v })} />
                <label className="grid grid-cols-[72px_1fr] items-center gap-2">
                  <TipLabel name="minScale" descKey="gesture.pinchZoom.minScale.desc" />
                  <HoverSelect
                    value={pinchZoom.minScale === 'fit' ? 'fit' : String(pinchZoom.minScale)}
                    onValueChange={v => setPinchZoom({ ...pinchZoom, minScale: v === 'fit' ? 'fit' : Number(v) })}
                    triggerClassName="h-7 text-[11px]"
                    options={[
                      { value: 'fit', label: 'fit' },
                      { value: '0.5', label: '0.5' },
                      { value: '1', label: '1' },
                    ]}
                  />
                </label>
                <label className="grid grid-cols-[72px_1fr] items-center gap-2">
                  <TipLabel name="center" descKey="gesture.pinchZoom.center.desc" />
                  <HoverSelect
                    value={pinchZoom.center}
                    onValueChange={v => setPinchZoom({ ...pinchZoom, center: v as GesturePinchZoomOptions['center'] })}
                    triggerClassName="h-7 text-[11px]"
                    options={[
                      { value: 'gesture', label: 'gesture' },
                      { value: 'viewport', label: 'viewport' },
                    ]}
                  />
                </label>
                <label className="flex items-center justify-between gap-3">
                  <TipLabel name="resetBelowFit" descKey="gesture.pinchZoom.resetBelowFit.desc" />
                  <Switch checked={pinchZoom.resetBelowFit !== false} onCheckedChange={checked => setPinchZoom({ ...pinchZoom, resetBelowFit: checked })} />
                </label>
              </div>
            )}
          </div>
          <div className="rounded border border-border/70 p-2">
            <label className="flex items-center justify-between gap-3">
              <TipLabel name="doubleTapZoom" descKey="gesture.doubleTapZoom.desc" />
              <Switch checked={obj.doubleTapZoom !== false} onCheckedChange={checked => setDoubleTapZoom(checked ? doubleTapZoom : false)} />
            </label>
            {obj.doubleTapZoom !== false && (
              <div className="mt-2 grid gap-2">
                <OptionNumber name="scale" descKey="gesture.doubleTapZoom.scale.desc" value={doubleTapZoom.scale} min={0.5} max={4} step={0.25} onChange={v => setDoubleTapZoom({ ...doubleTapZoom, scale: v })} />
                <OptionNumber name="maxScale" descKey="gesture.doubleTapZoom.maxScale.desc" value={doubleTapZoom.maxScale} min={1} max={8} step={0.25} onChange={v => setDoubleTapZoom({ ...doubleTapZoom, maxScale: v })} />
                <label className="grid grid-cols-[72px_1fr] items-center gap-2">
                  <TipLabel name="minScale" descKey="gesture.doubleTapZoom.minScale.desc" />
                  <HoverSelect
                    value={doubleTapZoom.minScale === 'fit' ? 'fit' : String(doubleTapZoom.minScale)}
                    onValueChange={v => setDoubleTapZoom({ ...doubleTapZoom, minScale: v === 'fit' ? 'fit' : Number(v) })}
                    triggerClassName="h-7 text-[11px]"
                    options={[
                      { value: 'fit', label: 'fit' },
                      { value: '0.5', label: '0.5' },
                      { value: '1', label: '1' },
                    ]}
                  />
                </label>
                <label className="grid grid-cols-[72px_1fr] items-center gap-2">
                  <TipLabel name="center" descKey="gesture.doubleTapZoom.center.desc" />
                  <HoverSelect
                    value={doubleTapZoom.center}
                    onValueChange={v => setDoubleTapZoom({ ...doubleTapZoom, center: v as GestureDoubleTapZoomOptions['center'] })}
                    triggerClassName="h-7 text-[11px]"
                    options={[
                      { value: 'tap', label: 'tap' },
                      { value: 'viewport', label: 'viewport' },
                    ]}
                  />
                </label>
                <OptionNumber name="interval" descKey="gesture.doubleTapZoom.interval.desc" value={doubleTapZoom.interval} min={120} max={600} step={10} onChange={v => setDoubleTapZoom({ ...doubleTapZoom, interval: v })} />
                <OptionNumber name="distance" descKey="gesture.doubleTapZoom.distance.desc" value={doubleTapZoom.distance} min={8} max={80} step={2} onChange={v => setDoubleTapZoom({ ...doubleTapZoom, distance: v })} />
              </div>
            )}
          </div>
          <div className="rounded border border-border/70 p-2">
            <label className="flex items-center justify-between gap-3">
              <TipLabel name="wheelZoom" descKey="gesture.wheelZoom.desc" />
              <Switch checked={obj.wheelZoom !== false} onCheckedChange={checked => setWheelZoom(checked ? wheelZoom : false)} />
            </label>
            {obj.wheelZoom !== false && (
              <div className="mt-2 grid gap-2">
                <OptionNumber name="step" descKey="gesture.wheelZoom.step.desc" value={wheelZoom.step} min={0.02} max={0.5} step={0.01} onChange={v => setWheelZoom({ ...wheelZoom, step: v })} />
                <OptionNumber name="maxScale" descKey="gesture.wheelZoom.maxScale.desc" value={wheelZoom.maxScale} min={1} max={8} step={0.25} onChange={v => setWheelZoom({ ...wheelZoom, maxScale: v })} />
                <label className="grid grid-cols-[72px_1fr] items-center gap-2">
                  <TipLabel name="minScale" descKey="gesture.wheelZoom.minScale.desc" />
                  <HoverSelect
                    value={wheelZoom.minScale === 'fit' ? 'fit' : String(wheelZoom.minScale)}
                    onValueChange={v => setWheelZoom({ ...wheelZoom, minScale: v === 'fit' ? 'fit' : Number(v) })}
                    triggerClassName="h-7 text-[11px]"
                    options={[
                      { value: 'fit', label: 'fit' },
                      { value: '0.5', label: '0.5' },
                      { value: '1', label: '1' },
                    ]}
                  />
                </label>
                <label className="grid grid-cols-[72px_1fr] items-center gap-2">
                  <TipLabel name="center" descKey="gesture.wheelZoom.center.desc" />
                  <HoverSelect
                    value={wheelZoom.center}
                    onValueChange={v => setWheelZoom({ ...wheelZoom, center: v as GestureWheelZoomOptions['center'] })}
                    triggerClassName="h-7 text-[11px]"
                    options={[
                      { value: 'pointer', label: 'pointer' },
                      { value: 'viewport', label: 'viewport' },
                    ]}
                  />
                </label>
                <label className="flex items-center justify-between gap-3">
                  <TipLabel name="reverse" descKey="gesture.wheelZoom.reverse.desc" />
                  <Switch checked={wheelZoom.reverse === true} onCheckedChange={checked => setWheelZoom({ ...wheelZoom, reverse: checked })} />
                </label>
                <OptionNumber name="exitGuardDuration" descKey="gesture.wheelZoom.exitGuardDuration.desc" value={wheelZoom.exitGuardDuration} min={0} max={1000} step={50} onChange={v => setWheelZoom({ ...wheelZoom, exitGuardDuration: v })} />
                <label className="flex items-center justify-between gap-3">
                  <TipLabel name="smooth" descKey="gesture.wheelZoom.smooth.desc" />
                  <Switch checked={wheelZoom.smooth !== false} onCheckedChange={checked => setWheelZoom({ ...wheelZoom, smooth: checked })} />
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
