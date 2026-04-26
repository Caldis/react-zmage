import { Switch } from '@/components/ui/switch'
import { useT } from '@/i18n/useT'
import type { I18nKey } from '@/i18n/dict'

type HotKey = { close?: boolean; zoom?: boolean; flip?: boolean }

export function HotKeyControl ({ value, onChange }: { value: HotKey | boolean | undefined; onChange: (v: any) => void }) {
  const { t } = useT()
  const obj: HotKey = (typeof value === 'object' && value) ? value : {}
  const rows: { key: keyof HotKey; labelKey: I18nKey }[] = [
    { key: 'close', labelKey: 'hotkey.close' },
    { key: 'zoom', labelKey: 'hotkey.zoom' },
    { key: 'flip', labelKey: 'hotkey.flip' },
  ]
  return (
    <div className="grid gap-1.5">
      {rows.map(({ key, labelKey }) => (
        <label key={String(key)} className="flex items-center justify-between gap-3 text-[11px] leading-tight">
          <span className="text-muted-foreground">{t(labelKey)}</span>
          <Switch checked={!!obj[key]} onCheckedChange={c => onChange({ ...obj, [key]: c })} />
        </label>
      ))}
    </div>
  )
}
