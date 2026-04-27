import * as React from 'react'
import { CodeBlock } from '@/components/CodeBlock'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useT } from '@/i18n/useT'
import { buildLibProps } from '@/playground/state'

type Mode = 'component' | 'imperative' | 'wrapper'

function isCallback (v: any) {
  return typeof v === 'function' && v?.__zmageLog === true
}

function formatValue (v: any): string {
  if (typeof v === 'string') return JSON.stringify(v)
  if (typeof v === 'function') return `(...args) => console.info(args)`
  return JSON.stringify(v, null, 2)
}

// JSON.stringify(..., 2) 给出的多行块, 每行从 col 0 起步; 嵌进 `  prop={...}` 时
// 需要把第二行起的所有行都加上同样宽度的前导缩进, 才能让闭合括号与 prop 名对齐.
function reindentMultiline (s: string, prefix: string): string {
  if (!s.includes('\n')) return s
  const parts = s.split('\n')
  return parts.map((line, i) => i === 0 ? line : prefix + line).join('\n')
}

function renderJsxProp (k: string, v: any): string {
  if (typeof v === 'string' && !v.includes('\n')) return `  ${k}=${JSON.stringify(v)}`
  if (isCallback(v)) return `  ${k}={(...args) => console.info('${k}', args)}`
  return `  ${k}={${reindentMultiline(formatValue(v), '  ')}}`
}

function renderJsx (props: Record<string, any>) {
  const lines: string[] = ['<Zmage']
  for (const [k, v] of Object.entries(props)) lines.push(renderJsxProp(k, v))
  lines.push('/>')
  return lines.join('\n')
}

function renderImperative (props: Record<string, any>) {
  return [
    `import Zmage from 'react-zmage'`,
    ``,
    `Zmage.browsing(${JSON.stringify(props, null, 2)})`,
  ].join('\n')
}

function renderWrapper (props: Record<string, any>) {
  const entries = Object.entries(props)
  const lines: string[] = []
  if (entries.length === 0) {
    lines.push(`<Zmage.Wrapper>`)
  } else {
    lines.push(`<Zmage.Wrapper`)
    for (const [k, v] of entries) lines.push(renderJsxProp(k, v))
    lines.push(`>`)
  }
  lines.push(`  <article dangerouslySetInnerHTML={{ __html: html }} />`)
  lines.push(`</Zmage.Wrapper>`)
  return lines.join('\n')
}

export function CodeSnippet ({
  values,
  touched,
  hideDefaults,
  onHideDefaultsChange,
  mode,
}: {
  values: Record<string, any>
  touched: ReadonlySet<string>
  hideDefaults: boolean
  onHideDefaultsChange: (v: boolean) => void
  mode: Mode
}) {
  const { t } = useT()
  // hideDefaults 打开 → 不传 touched, 一律剥 schema 默认.
  // hideDefaults 关闭 → 传 touched, 保留用户碰过的默认值.
  const props = buildLibProps(values, hideDefaults ? undefined : touched)
  const code = mode === 'component' ? renderJsx(props)
    : mode === 'imperative' ? renderImperative(props)
      : renderWrapper(props)
  const id = React.useId()
  return (
    <CodeBlock
      code={code}
      language={'tsx' as any}
      actions={
        <div className="flex items-center gap-1.5">
          <Label htmlFor={id} className="cursor-pointer text-[11px] text-muted-foreground">
            {t('pg.code.hideDefaults')}
          </Label>
          <Switch
            id={id}
            checked={hideDefaults}
            onCheckedChange={onHideDefaultsChange}
            className="scale-75 origin-right"
          />
        </div>
      }
    />
  )
}
