import { PARAM_SCHEMA, type ParamGroup } from '@/schema/param-schema'
import { Badge } from '@/components/ui/badge'
import { useT } from '@/i18n/useT'

function inferType (def: typeof PARAM_SCHEMA[number]): string {
  switch (def.control.kind) {
    case 'switch': return 'boolean'
    case 'slider':
    case 'number': return 'number'
    case 'text':
    case 'color': return 'string'
    case 'select':
    case 'segmented': return def.control.options.map(o => `'${o.value}'`).join(' | ')
    case 'object': return def.control.component === 'set' ? 'Set[]' : `${def.control.component[0].toUpperCase()}${def.control.component.slice(1)}Set | boolean`
    case 'callback': return '(arg) => void'
  }
}

function fmtDefault (v: unknown): string {
  if (v === undefined) return '—'
  if (typeof v === 'string') return v === '' ? "''" : `'${v}'`
  if (Array.isArray(v)) return v.length === 0 ? '[]' : '[…]'
  if (typeof v === 'object' && v !== null) return Object.keys(v).length === 0 ? '{}' : '{…}'
  return String(v)
}

export function ParamTable ({ group }: { group: ParamGroup }) {
  const { t } = useT()
  const items = PARAM_SCHEMA.filter(d => d.group === group)
  if (items.length === 0) return null
  return (
    <div className="my-6 overflow-hidden rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-4 py-2.5 font-medium">Prop</th>
            <th className="px-4 py-2.5 font-medium">Type</th>
            <th className="px-4 py-2.5 font-medium">Default</th>
            <th className="px-4 py-2.5 font-medium">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {items.map(d => (
            <tr key={d.name}>
              <td className="px-4 py-2.5 align-top">
                <span className="font-mono">{d.name}</span>
                {d.required && <Badge variant="destructive" className="ml-1.5 h-4 px-1 text-[9px]">{t('common.required')}</Badge>}
                {d.desktopOnly && <Badge variant="secondary" className="ml-1.5 h-4 px-1 text-[9px]">{t('common.desktopOnly')}</Badge>}
              </td>
              <td className="px-4 py-2.5 align-top font-mono text-xs text-muted-foreground">{inferType(d)}</td>
              <td className="px-4 py-2.5 align-top font-mono text-xs">{fmtDefault(d.default)}</td>
              <td className="px-4 py-2.5 align-top text-muted-foreground">{t(d.i18n.descKey)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
