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
    // 单列 + 小字号: 任意语言下都能完整展示 label, 不依赖截断或 wrap
    <div className="grid gap-1.5">
      {KEYS.map(({ key, labelKey }) => (
        <label key={String(key)} className="flex items-center justify-between gap-3 text-[11px] leading-tight">
          <span className="text-muted-foreground">{t(labelKey)}</span>
          <Switch
            checked={!!obj[key]}
            onCheckedChange={(checked) => onChange({ ...obj, [key]: checked })}
          />
        </label>
      ))}
    </div>
  )
}
