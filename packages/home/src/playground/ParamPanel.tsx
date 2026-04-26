import * as React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { PARAM_SCHEMA, type ParamDef, type ParamGroup } from '@/schema/param-schema'
import { useT } from '@/i18n/useT'
import type { I18nKey } from '@/i18n/dict'
import { ScalarControl } from './controls/ScalarControl'
import { ControllerControl } from './controls/ControllerControl'
import { HotKeyControl } from './controls/HotKeyControl'
import { AnimateControl } from './controls/AnimateControl'
import { SetControl } from './controls/SetControl'
import { CallbackControl } from './controls/CallbackControl'

const GROUP_ORDER: ParamGroup[] = ['data', 'preset', 'interface', 'controller', 'hotkey', 'animate', 'lifecycle', 'controlled']
const GROUP_LABELS: Record<ParamGroup, I18nKey> = {
  data: 'group.data',
  preset: 'group.preset',
  interface: 'group.interface',
  controller: 'group.controller',
  hotkey: 'group.hotkey',
  animate: 'group.animate',
  lifecycle: 'group.lifecycle',
  controlled: 'group.controlled',
}

type Props = {
  values: Record<string, any>
  onChange: (name: string, value: any) => void
}

function renderControl (def: ParamDef, value: any, onChange: (v: any) => void) {
  const c = def.control
  if (c.kind === 'object') {
    if (c.component === 'controller') return <ControllerControl value={value} onChange={onChange} />
    if (c.component === 'hotkey') return <HotKeyControl value={value} onChange={onChange} />
    if (c.component === 'animate') return <AnimateControl value={value} onChange={onChange} />
    if (c.component === 'set') return <SetControl value={value} onChange={onChange} />
  }
  if (c.kind === 'callback') {
    return <CallbackControl events={c.events} value={value} onChange={onChange} />
  }
  return <ScalarControl def={def} value={value} onChange={onChange} />
}

export function ParamPanel ({ values, onChange }: Props) {
  const { t } = useT()
  const grouped = React.useMemo(() => {
    const map = new Map<ParamGroup, ParamDef[]>()
    for (const g of GROUP_ORDER) map.set(g, [])
    for (const def of PARAM_SCHEMA) map.get(def.group)!.push(def)
    return map
  }, [])

  return (
    <TooltipProvider delayDuration={300}>
      <Accordion type="multiple" defaultValue={GROUP_ORDER as string[]} className="w-full">
        {GROUP_ORDER.map(group => {
          const items = grouped.get(group)!
          if (items.length === 0) return null
          return (
            <AccordionItem key={group} value={group} className="border-border/60">
              <AccordionTrigger className="px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {t(GROUP_LABELS[group])}
              </AccordionTrigger>
              <AccordionContent className="space-y-3 px-3 pb-3 pt-1">
                {items.map(def => (
                  <div key={def.name} className="grid grid-cols-[120px_1fr] items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="font-mono text-xs underline-offset-4 decoration-dotted hover:underline cursor-help">
                            {def.name}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="max-w-[280px] text-xs">
                          {t(def.i18n.descKey)}
                        </TooltipContent>
                      </Tooltip>
                      {def.required && <span aria-label="required" className="text-destructive font-bold text-sm leading-none">*</span>}
                      {def.desktopOnly && <Badge variant="secondary" className="h-4 px-1 text-[9px]">D</Badge>}
                    </div>
                    <div>{renderControl(def, values[def.name], (v) => onChange(def.name, v))}</div>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </TooltipProvider>
  )
}
