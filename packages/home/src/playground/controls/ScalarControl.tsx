import * as React from 'react'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { HoverSelect } from '@/components/ui/HoverSelect'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import type { ParamDef } from '@/schema/param-schema'
import { useT } from '@/i18n/useT'

type Props = { def: ParamDef; value: any; onChange: (v: any) => void }

export function ScalarControl ({ def, value, onChange }: Props) {
  const { t } = useT()
  const c = def.control
  if (c.kind === 'switch') {
    return <Switch checked={!!value} onCheckedChange={onChange} />
  }
  if (c.kind === 'number') {
    return (
      <Input
        type="number"
        value={value ?? ''}
        onChange={e => onChange(e.target.value === '' ? undefined : Number(e.target.value))}
        className="h-7 w-24 px-2 text-xs md:text-xs"
      />
    )
  }
  if (c.kind === 'text') {
    return <Input value={value ?? ''} onChange={e => onChange(e.target.value)} className="h-7 px-2 text-xs md:text-xs" />
  }
  if (c.kind === 'slider') {
    return (
      <div className="flex items-center gap-3">
        <Slider min={c.min} max={c.max} step={c.step ?? 1} value={[Number(value ?? 0)]} onValueChange={(v) => onChange(v[0])} className="flex-1" />
        <Input
          type="number"
          value={value ?? 0}
          onChange={e => onChange(Number(e.target.value))}
          className="h-7 w-14 px-2 text-xs md:text-xs"
        />
      </div>
    )
  }
  if (c.kind === 'select') {
    return (
      <HoverSelect
        value={String(value ?? '')}
        onValueChange={onChange}
        triggerClassName="h-7 text-xs"
        options={c.options.map(o => ({ value: o.value, label: t(o.labelKey) }))}
      />
    )
  }
  if (c.kind === 'segmented') {
    return (
      // - flex justify-start: 显式左对齐, 不依赖任何 inline-flex 推断
      // - overflow-x-auto: 长 i18n 值 (日语/德语/俄语) 撑爆 cell 时退化为容器内横滑而不是溢出 panel
      // - 缩小高度+字号: 视觉更轻, 也给长字符串留余量
      <div className="flex justify-start overflow-x-auto">
        <Tabs value={String(value ?? '')} onValueChange={onChange}>
          <TabsList className="h-7 w-fit p-0.5">
            {c.options.map(o => (
              <TabsTrigger
                key={o.value}
                value={o.value}
                className="h-6 px-2 text-[11px]"
              >
                {t(o.labelKey)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    )
  }
  if (c.kind === 'color') {
    const PRESETS = ['#0a0a0a', '#fafafa', 'rgba(0,0,0,0.85)', 'rgba(255,255,255,0.9)']
    return (
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex h-7 items-center gap-2 rounded-md border border-input px-2 text-xs">
            <span className="h-3.5 w-3.5 rounded border" style={{ backgroundColor: value || '#fff' }} />
            <span className="font-mono">{value || ''}</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-56 space-y-2 p-3">
          <Input value={value ?? ''} onChange={e => onChange(e.target.value)} className="h-7 px-2 text-xs md:text-xs" />
          <div className="flex gap-1.5">
            {PRESETS.map(p => (
              <button key={p} onClick={() => onChange(p)} className="h-6 w-6 rounded border" style={{ backgroundColor: p }} aria-label={p} />
            ))}
          </div>
        </PopoverContent>
      </Popover>
    )
  }
  return null
}
