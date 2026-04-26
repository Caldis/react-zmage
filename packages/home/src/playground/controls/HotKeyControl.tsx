import { Switch } from '@/components/ui/switch'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useT } from '@/i18n/useT'
import type { I18nKey } from '@/i18n/dict'

type HotKey = { close?: boolean; zoom?: boolean; flip?: boolean }

export function HotKeyControl ({ value, onChange }: { value: HotKey | boolean | undefined; onChange: (v: any) => void }) {
  const { t } = useT()
  const obj: HotKey = (typeof value === 'object' && value) ? value : {}
  const rows: { key: keyof HotKey; labelKey: I18nKey; descKey: I18nKey }[] = [
    { key: 'close', labelKey: 'hotkey.close', descKey: 'hotkey.close.desc' },
    { key: 'zoom', labelKey: 'hotkey.zoom', descKey: 'hotkey.zoom.desc' },
    { key: 'flip', labelKey: 'hotkey.flip', descKey: 'hotkey.flip.desc' },
  ]
  return (
    <div className="grid gap-1.5">
      {rows.map(({ key, labelKey, descKey }) => (
        <label key={String(key)} className="flex items-center justify-between gap-3 text-[11px] leading-tight">
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="cursor-help text-muted-foreground decoration-dotted underline-offset-4 hover:underline">
                {t(labelKey)}
              </span>
            </TooltipTrigger>
            <TooltipContent side="left" className="max-w-[260px] text-xs">
              {t(descKey)}
            </TooltipContent>
          </Tooltip>
          <Switch checked={!!obj[key]} onCheckedChange={c => onChange({ ...obj, [key]: c })} />
        </label>
      ))}
    </div>
  )
}
