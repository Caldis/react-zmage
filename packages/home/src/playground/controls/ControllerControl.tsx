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

export function ControllerControl ({ value, onChange }: { value: ControllerSet | boolean | undefined; onChange: (v: any) => void }) {
  const { t } = useT()
  const obj: ControllerSet = (typeof value === 'object' && value) ? value : {}
  return (
    <div className="grid gap-1.5">
      {KEYS.map(({ key, labelKey, descKey }) => (
        <label key={String(key)} className="flex items-center justify-between gap-3 text-[11px] leading-tight">
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="cursor-help font-mono text-muted-foreground decoration-dotted underline-offset-4 hover:underline">
                {String(key)}
              </span>
            </TooltipTrigger>
            <TooltipContent side="left" className="max-w-[260px] text-xs">
              <div className="font-medium">{t(labelKey)}</div>
              <div className="mt-0.5 text-primary-foreground/80">{t(descKey)}</div>
            </TooltipContent>
          </Tooltip>
          <Switch
            checked={!!obj[key]}
            onCheckedChange={(checked) => onChange({ ...obj, [key]: checked })}
          />
        </label>
      ))}
    </div>
  )
}
