import { HoverSelect } from '@/components/ui/HoverSelect'
import { Switch } from '@/components/ui/switch'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useT } from '@/i18n/useT'
import type { I18nKey } from '@/i18n/dict'

type ControllerSet = Record<string, boolean | string | undefined>

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

// lib (Control.tsx) renders left rotate when `rotateLeft || rotate` is truthy.
// 即 rotate 是 umbrella, 启用时强制覆盖 rotateLeft / rotateRight; flip 同理.
// 把这层关系映成 disabled state, 让 panel 显式呈现.
const UMBRELLA: Record<string, string> = {
  rotateLeft: 'rotate',
  rotateRight: 'rotate',
  flipLeft: 'flip',
  flipRight: 'flip',
}

export function ControllerControl ({ value, onChange }: { value: ControllerSet | boolean | undefined; onChange: (v: any) => void }) {
  const { t } = useT()
  const obj: ControllerSet = (typeof value === 'object' && value) ? value : {}
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
      {KEYS.map(({ key, labelKey, descKey }) => {
        const umbrella = UMBRELLA[String(key)]
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
