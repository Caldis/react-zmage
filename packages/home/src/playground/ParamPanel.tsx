import * as React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { PresetScopeBadge } from '@/components/PresetScopeBadge'
import { PARAM_SCHEMA, type ParamDef, type ParamGroup } from '@/schema/param-schema'
import { useT } from '@/i18n/useT'
import type { I18nKey } from '@/i18n/dict'
import { ScalarControl } from './controls/ScalarControl'
import { ControllerControl } from './controls/ControllerControl'
import { HotKeyControl } from './controls/HotKeyControl'
import { AnimateControl } from './controls/AnimateControl'
import { GestureControl } from './controls/GestureControl'
import { SetControl } from './controls/SetControl'
import { CallbackControl } from './controls/CallbackControl'
import { DataPresetToggle } from './DataPresetToggle'

// Map each ParamGroup to the corresponding docs anchor in
// packages/home/src/docs/sections/Props.tsx (keep in sync with <Heading id="props-*"> there).
const GROUP_TO_DOCS_ANCHOR: Record<ParamGroup, string> = {
  data: '/docs#props-data',
  preset: '/docs#props-preset',
  interface: '/docs#props-interface',
  controller: '/docs#props-controller',
  hotkey: '/docs#props-hotkey',
  animate: '/docs#props-animate',
  gesture: '/docs#props-gesture',
  lifecycle: '/docs#props-lifecycle',
  controlled: '/docs#props-controlled',
}

const GROUP_ORDER: ParamGroup[] = ['data', 'preset', 'interface', 'controller', 'hotkey', 'animate', 'gesture', 'lifecycle', 'controlled']
const GROUP_LABELS: Record<ParamGroup, I18nKey> = {
  data: 'group.data',
  preset: 'group.preset',
  interface: 'group.interface',
  controller: 'group.controller',
  hotkey: 'group.hotkey',
  animate: 'group.animate',
  gesture: 'group.gesture',
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
    if (c.component === 'gesture') return <GestureControl value={value} onChange={onChange} />
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
    for (const def of PARAM_SCHEMA) {
      const bucket = map.get(def.group) ?? []
      if (!map.has(def.group)) map.set(def.group, bucket)
      bucket.push(def)
    }
    return map
  }, [])

  return (
    <TooltipProvider delayDuration={300}>
      <Accordion type="multiple" defaultValue={GROUP_ORDER as string[]} className="w-full">
        {GROUP_ORDER.map(group => {
          const items = grouped.get(group)
          if (!items || items.length === 0) return null
          return (
            <AccordionItem key={group} value={group} className="border-border/60">
              <AccordionTrigger className="px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {t(GROUP_LABELS[group])}
              </AccordionTrigger>
              <AccordionContent className="space-y-3 px-3 pb-3 pt-1">
                {group === 'data' && (
                  <DataPresetToggle values={values} onChange={onChange} />
                )}
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
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            to={GROUP_TO_DOCS_ANCHOR[def.group] ?? '/docs'}
                            aria-label={t('param.viewInDocs')}
                            className="inline-flex items-center text-muted-foreground/60 hover:text-foreground transition-colors"
                          >
                            <BookOpen className="h-3 w-3" />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="text-xs">
                          {t('param.viewInDocs')}
                        </TooltipContent>
                      </Tooltip>
                      {def.presetScope && <PresetScopeBadge scope={def.presetScope} />}
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
