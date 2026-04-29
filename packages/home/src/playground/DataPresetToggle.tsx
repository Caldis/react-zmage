import { useT } from '@/i18n/useT'
import { cn } from '@/lib/utils'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DATA_PRESETS, detectActivePreset, type DataPreset } from './state'

/**
 * 数据预设切换器
 *
 * 设计要点:
 * - 复用 Radix Tabs primitive — 字体 / 高度 / pointer / focus / SlidingPill 全套都从
 *   Tabs 继承, 与页面顶部 [组件 / 命令式 / 包裹器] tab 一致, 不再 hand-roll segmented control.
 * - 唯一定制: trigger 内部塞 mini swatch row + label, swatch 用真实 CSS aspect-ratio
 *   渲染 (6:1 = 横线, 1:6 = 竖线), 让用户一眼读出"按下去会得到什么形状的测试图集".
 */

const SWATCH_SLOT = 14 // px - 单个 swatch 在最长边上的尺寸上限
const SWATCH_GAP = 3
const SWATCH_MIN = 3

function PresetSwatchRow ({ preset, active }: { preset: DataPreset; active: boolean }) {
  return (
    <span
      className="flex shrink-0 items-end overflow-hidden"
      style={{ height: SWATCH_SLOT, gap: SWATCH_GAP }}
      aria-hidden
    >
      {preset.set.map((item, i) => {
        const [w, h] = item.ratio.split('/').map(Number)
        const r = w / h
        const cssW = r >= 1 ? SWATCH_SLOT : SWATCH_SLOT * r
        const cssH = r >= 1 ? SWATCH_SLOT / r : SWATCH_SLOT
        return (
          <span
            key={i}
            className={cn(
              'shrink-0 rounded-[1.5px] ring-1 ring-inset transition-colors',
              active
                ? 'bg-foreground/55 ring-foreground/40'
                : 'bg-foreground/25 ring-foreground/15',
            )}
            style={{ width: cssW, height: cssH, minWidth: SWATCH_MIN, minHeight: SWATCH_MIN }}
          />
        )
      })}
    </span>
  )
}

type Props = {
  values: Record<string, any>
  onChange: (name: string, value: any) => void
}

export function DataPresetToggle ({ values, onChange }: Props) {
  const { t } = useT()
  const active = detectActivePreset(values)

  const apply = (id: DataPreset['id']) => {
    const preset = DATA_PRESETS.find(p => p.id === id)
    if (!preset) return
    onChange('src', preset.src)
    onChange('alt', preset.alt)
    onChange('set', preset.set.map(({ ratio: _r, ...rest }) => rest))
    onChange('defaultPage', 0)
  }

  const labelOf: Record<DataPreset['id'], string> = {
    default: t('playground.preset.default.label'),
    testset: t('playground.preset.testset.label'),
  }

  return (
    <Tabs value={active ?? ''} onValueChange={(v) => apply(v as DataPreset['id'])}>
      <TabsList aria-label={t('playground.preset.aria')} className="grid w-full grid-cols-2 h-auto p-0.5">
        {DATA_PRESETS.map(preset => (
          <TabsTrigger
            key={preset.id}
            value={preset.id}
            title={labelOf[preset.id]}
            className="min-w-0 gap-2 px-2.5 py-1.5"
          >
            <PresetSwatchRow preset={preset} active={active === preset.id} />
            <span className="min-w-0 truncate">{labelOf[preset.id]}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
