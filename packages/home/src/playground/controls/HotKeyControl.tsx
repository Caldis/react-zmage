import { Switch } from '@/components/ui/switch'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useT } from '@/i18n/useT'
import type { I18nKey } from '@/i18n/dict'

// 各 entry 实际类型为 boolean | string | string[] (HotKeyValue), 但 playground 的 Switch
// 仅暴露 boolean 切换; 自定义按键描述符 ('Mod+S' 等) 需要用户直接编辑代码片段。
type HotKeyEntry = boolean | string | string[]
type HotKey = {
  close?: HotKeyEntry
  zoom?: HotKeyEntry
  flip?: boolean
  flipLeft?: HotKeyEntry
  flipRight?: HotKeyEntry
  rotate?: boolean
  rotateLeft?: HotKeyEntry
  rotateRight?: HotKeyEntry
  download?: HotKeyEntry
}

const ROWS: { key: keyof HotKey; labelKey: I18nKey; descKey: I18nKey }[] = [
  { key: 'close', labelKey: 'hotkey.close', descKey: 'hotkey.close.desc' },
  { key: 'zoom', labelKey: 'hotkey.zoom', descKey: 'hotkey.zoom.desc' },
  { key: 'flip', labelKey: 'hotkey.flip', descKey: 'hotkey.flip.desc' },
  { key: 'flipLeft', labelKey: 'hotkey.flipLeft', descKey: 'hotkey.flipLeft.desc' },
  { key: 'flipRight', labelKey: 'hotkey.flipRight', descKey: 'hotkey.flipRight.desc' },
  { key: 'rotate', labelKey: 'hotkey.rotate', descKey: 'hotkey.rotate.desc' },
  { key: 'rotateLeft', labelKey: 'hotkey.rotateLeft', descKey: 'hotkey.rotateLeft.desc' },
  { key: 'rotateRight', labelKey: 'hotkey.rotateRight', descKey: 'hotkey.rotateRight.desc' },
  { key: 'download', labelKey: 'hotkey.download', descKey: 'hotkey.download.desc' },
]

// lib (Browser.tsx handleKeyDown) 通过 resolveSideBinding 实现 per-side OR umbrella 兜底,
// flip / rotate 是 umbrella, 启用后强制覆盖左右两侧 (与 ControllerControl 一致的视觉禁用态).
const UMBRELLA: Record<string, string> = {
  flipLeft: 'flip',
  flipRight: 'flip',
  rotateLeft: 'rotate',
  rotateRight: 'rotate',
}

export function HotKeyControl ({ value, onChange }: { value: HotKey | boolean | undefined; onChange: (v: any) => void }) {
  const { t } = useT()
  const obj: HotKey = (typeof value === 'object' && value) ? value : {}
  return (
    <div className="grid gap-1.5">
      {ROWS.map(({ key, labelKey, descKey }) => {
        const umbrella = UMBRELLA[String(key)]
        const overridden = !!umbrella && !!obj[umbrella as keyof HotKey]
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
              onCheckedChange={c => onChange({ ...obj, [key]: c })}
            />
          </label>
        )
      })}
    </div>
  )
}
