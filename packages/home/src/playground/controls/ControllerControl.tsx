import { HoverSelect } from '@/components/ui/HoverSelect'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useT } from '@/i18n/useT'
import type { I18nKey } from '@/i18n/dict'
import type { BaseType } from 'react-zmage'

type ControllerSet = NonNullable<Exclude<BaseType['controller'], boolean | undefined>>
type ControllerLayout = NonNullable<ControllerSet['layout']>
type ControllerLayoutTarget = 'toolbar' | 'flip' | 'pagination' | 'caption'
type ControllerLayoutEdge = 'top' | 'right' | 'bottom' | 'left'

const KEYS: { key: keyof ControllerSet; labelKey: I18nKey; descKey: I18nKey }[] = [
  { key: 'pagination', labelKey: 'controller.pagination', descKey: 'controller.pagination.desc' },
  { key: 'rotate', labelKey: 'controller.rotate', descKey: 'controller.rotate.desc' },
  { key: 'rotateLeft', labelKey: 'controller.rotateLeft', descKey: 'controller.rotateLeft.desc' },
  { key: 'rotateRight', labelKey: 'controller.rotateRight', descKey: 'controller.rotateRight.desc' },
  { key: 'zoom', labelKey: 'controller.zoom', descKey: 'controller.zoom.desc' },
  { key: 'download', labelKey: 'controller.download', descKey: 'controller.download.desc' },
  { key: 'close', labelKey: 'controller.close', descKey: 'controller.close.desc' },
  { key: 'flip', labelKey: 'controller.flip', descKey: 'controller.flip.desc' },
  { key: 'flipLeft', labelKey: 'controller.flipLeft', descKey: 'controller.flipLeft.desc' },
  { key: 'flipRight', labelKey: 'controller.flipRight', descKey: 'controller.flipRight.desc' },
]

const PLACEMENTS = [
  'top-right',
  'top-left',
  'bottom-right',
  'bottom-left',
  'top-center',
  'bottom-center',
  'left-center',
  'right-center',
] as const
const PLACEMENT_OPTIONS = PLACEMENTS.map((placement) => ({ value: placement, label: placement }))
const DEFAULT_LAYOUT: ControllerLayout = {
  toolbar: { inset: 12 },
  flip: { inset: 0 },
  pagination: { inset: 24 },
  caption: { inset: 60 },
}
const DEFAULT_LAYOUT_INSET: Record<ControllerLayoutTarget, number> = {
  toolbar: 12,
  flip: 0,
  pagination: 24,
  caption: 60,
}
const LAYOUT_CONTROLS: { target: ControllerLayoutTarget; label: string; descKey: I18nKey; max: number }[] = [
  { target: 'toolbar', label: 'toolbar.inset', descKey: 'controller.layout.toolbarInset.desc', max: 80 },
  { target: 'flip', label: 'flip.inset', descKey: 'controller.layout.flipInset.desc', max: 80 },
  { target: 'pagination', label: 'pagination.inset', descKey: 'controller.layout.paginationInset.desc', max: 120 },
  { target: 'caption', label: 'caption.inset', descKey: 'controller.layout.captionInset.desc', max: 180 },
]

// lib (Control.tsx) renders left rotate when `rotateLeft || rotate` is truthy.
// 即 rotate 是 umbrella, 启用时强制覆盖 rotateLeft / rotateRight; flip 同理.
// 把这层关系映成 disabled state, 让 panel 显式呈现.
const UMBRELLA: Partial<Record<keyof ControllerSet, keyof ControllerSet>> = {
  rotateLeft: 'rotate',
  rotateRight: 'rotate',
  flipLeft: 'flip',
  flipRight: 'flip',
}

function readInset (layout: ControllerLayout | undefined, target: ControllerLayoutTarget, fallback: number): number {
  const inset = layout?.[target]?.inset
  if (typeof inset === 'number') return inset
  if (typeof inset === 'string') return Number.parseFloat(inset) || fallback
  const preferredEdges: ControllerLayoutEdge[] = target === 'flip'
    ? ['left', 'right']
    : target === 'pagination' || target === 'caption'
      ? ['bottom', 'top', 'left', 'right']
      : ['top', 'right', 'bottom', 'left']
  for (const edge of preferredEdges) {
    const value = inset?.[edge]
    if (typeof value === 'number') return value
    if (typeof value === 'string') return Number.parseFloat(value) || fallback
  }
  return fallback
}

function writeInset (layout: ControllerLayout | undefined, target: ControllerLayoutTarget, value: number): ControllerLayout {
  const current = layout || DEFAULT_LAYOUT
  const targetConfig = current[target] || {}
  return {
    ...current,
    [target]: {
      ...targetConfig,
      inset: value,
    },
  }
}

function withoutLayout (obj: ControllerSet): ControllerSet {
  const { layout: _layout, ...rest } = obj
  return rest
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
        min={min}
        max={max}
        step={step}
        onChange={e => {
          const next = Number(e.target.value)
          if (Number.isFinite(next)) onChange(next)
        }}
        className="h-7 w-16 px-2 text-xs md:text-xs"
      />
    </div>
  )
}

export function ControllerControl ({ value, onChange }: { value: ControllerSet | boolean | undefined; onChange: (v: any) => void }) {
  const { t } = useT()
  const obj: ControllerSet = (typeof value === 'object' && value) ? value : {}
  const layoutEnabled = !!obj.layout
  const setLayoutInset = (target: ControllerLayoutTarget, inset: number) => {
    onChange({ ...obj, layout: writeInset(obj.layout, target, inset) })
  }

  return (
    <div className="grid gap-1.5">
      <label className="mb-1 grid grid-cols-[72px_1fr] items-center gap-2 rounded-md border border-border/70 p-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="cursor-help font-mono text-[11px] text-muted-foreground decoration-dotted underline-offset-4 hover:underline">
              placement
            </span>
          </TooltipTrigger>
          <TooltipContent side="left" className="max-w-[260px] text-xs">
            <div className="font-medium">{t('controller.placement')}</div>
            <div className="mt-0.5 text-primary-foreground/80">{t('controller.placement.desc')}</div>
          </TooltipContent>
        </Tooltip>
        <HoverSelect
          value={typeof obj.placement === 'string' ? obj.placement : 'top-right'}
          onValueChange={(placement) => onChange({ ...obj, placement })}
          options={PLACEMENT_OPTIONS}
          triggerClassName="h-7 px-2 text-[11px]"
          contentClassName="text-xs"
        />
      </label>
      <div className="mb-1 rounded-md border border-border/70 p-2">
        <label className="flex items-center justify-between gap-3 text-[11px] leading-tight">
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="cursor-help font-mono text-muted-foreground decoration-dotted underline-offset-4 hover:underline">
                layout
              </span>
            </TooltipTrigger>
            <TooltipContent side="left" className="max-w-[260px] text-xs">
              <div className="font-medium">{t('controller.layout')}</div>
              <div className="mt-0.5 text-primary-foreground/80">{t('controller.layout.desc')}</div>
            </TooltipContent>
          </Tooltip>
          <Switch checked={layoutEnabled} onCheckedChange={(checked) => onChange(checked ? { ...obj, layout: DEFAULT_LAYOUT } : withoutLayout(obj))} />
        </label>
        {layoutEnabled && (
          <div className="mt-2 grid gap-2 border-t border-border/70 pt-2">
            {LAYOUT_CONTROLS.map(({ target, label, descKey, max }) => (
              <div key={target} className="grid gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-help font-mono text-[11px] text-muted-foreground decoration-dotted underline-offset-4 hover:underline">
                      {label}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="left" className="max-w-[260px] text-xs">
                    {t(descKey)}
                  </TooltipContent>
                </Tooltip>
                <NumberControl
                  value={readInset(obj.layout, target, DEFAULT_LAYOUT_INSET[target])}
                  min={0}
                  max={max}
                  step={1}
                  onChange={(inset) => setLayoutInset(target, inset)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      {KEYS.map(({ key, labelKey, descKey }) => {
        const umbrella = UMBRELLA[key]
        const overridden = !!umbrella && !!obj[umbrella]
        return (
          <label
            key={String(key)}
            className={`flex items-center justify-between gap-3 text-[11px] leading-tight ${overridden ? 'opacity-50' : ''}`}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="cursor-help font-mono text-muted-foreground decoration-dotted underline-offset-4 hover:underline">
                  {String(key)}
                </span>
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-[260px] text-xs">
                <div className="font-medium">{t(labelKey)}</div>
                <div className="mt-0.5 text-primary-foreground/80">{t(descKey)}</div>
                {overridden && (
                  <div className="mt-1 border-t border-primary-foreground/15 pt-1 text-primary-foreground/70">
                    {t('controller.overriddenBy')} <code className="font-mono">{umbrella}</code>
                  </div>
                )}
              </TooltipContent>
            </Tooltip>
            <Switch
              checked={!!obj[key]}
              disabled={overridden}
              onCheckedChange={(checked) => onChange({ ...obj, [key]: checked })}
            />
          </label>
        )
      })}
    </div>
  )
}
