import { Switch } from '@/components/ui/switch'
import { useT } from '@/i18n/useT'
import type { I18nKey } from '@/i18n/dict'

type ControllerSet = Record<string, boolean | string | undefined>

const KEYS: { key: keyof ControllerSet; labelKey: I18nKey }[] = [
  { key: 'pagination', labelKey: 'controller.pagination' },
  { key: 'rotate', labelKey: 'controller.rotate' },
  { key: 'rotateLeft', labelKey: 'controller.rotateLeft' },
  { key: 'rotateRight', labelKey: 'controller.rotateRight' },
  { key: 'zoom', labelKey: 'controller.zoom' },
  { key: 'download', labelKey: 'controller.download' },
  { key: 'close', labelKey: 'controller.close' },
  { key: 'flip', labelKey: 'controller.flip' },
  { key: 'flipLeft', labelKey: 'controller.flipLeft' },
  { key: 'flipRight', labelKey: 'controller.flipRight' },
]

export function ControllerControl ({ value, onChange }: { value: ControllerSet | boolean | undefined; onChange: (v: any) => void }) {
  const { t } = useT()
  const obj: ControllerSet = (typeof value === 'object' && value) ? value : {}
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
      {KEYS.map(({ key, labelKey }) => (
        <label key={String(key)} className="flex items-center justify-between gap-2 text-xs">
          <span>{t(labelKey)}</span>
          <Switch
            checked={!!obj[key]}
            onCheckedChange={(checked) => onChange({ ...obj, [key]: checked })}
          />
        </label>
      ))}
    </div>
  )
}
