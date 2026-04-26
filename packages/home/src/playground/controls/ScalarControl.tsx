import * as React from 'react'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
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
        className="h-8 w-24"
      />
    )
  }
  if (c.kind === 'text') {
    return <Input value={value ?? ''} onChange={e => onChange(e.target.value)} className="h-8" />
  }
  if (c.kind === 'slider') {
    return (
      <div className="flex items-center gap-3">
        <Slider min={c.min} max={c.max} step={c.step ?? 1} value={[Number(value ?? 0)]} onValueChange={(v) => onChange(v[0])} className="flex-1" />
        <Input
          type="number"
          value={value ?? 0}
          onChange={e => onChange(Number(e.target.value))}
          className="h-8 w-16"
        />
      </div>
    )
  }
  if (c.kind === 'select') {
    return (
      <Select value={String(value ?? '')} onValueChange={onChange}>
        <SelectTrigger className="h-8">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {c.options.map(o => <SelectItem key={o.value} value={o.value}>{t(o.labelKey)}</SelectItem>)}
        </SelectContent>
      </Select>
    )
  }
  if (c.kind === 'segmented') {
    return (
      <Tabs value={String(value ?? '')} onValueChange={onChange} className="inline-flex">
        <TabsList className="h-8">
          {c.options.map(o => <TabsTrigger key={o.value} value={o.value} className="h-7 text-xs">{t(o.labelKey)}</TabsTrigger>)}
        </TabsList>
      </Tabs>
    )
  }
  if (c.kind === 'color') {
    const PRESETS = ['#0a0a0a', '#fafafa', 'rgba(0,0,0,0.85)', 'rgba(255,255,255,0.9)']
    return (
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex h-8 items-center gap-2 rounded-md border border-input px-2 text-xs">
            <span className="h-4 w-4 rounded border" style={{ backgroundColor: value || '#fff' }} />
            <span className="font-mono">{value || ''}</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-56 space-y-2 p-3">
          <Input value={value ?? ''} onChange={e => onChange(e.target.value)} className="h-8" />
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
