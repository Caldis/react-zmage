import * as React from 'react'
import { CodeBlock } from '@/components/CodeBlock'
import { ExpandablePanel } from '@/components/ExpandablePanel'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useT } from '@/i18n/useT'
import { buildLibProps } from '@/playground/state'

export type Mode = 'component' | 'imperative' | 'wrapper'
type GetUmbrellaPhrase = (umbrella: string) => string

type WrapperHtmlImage = {
  src: string
  alt?: string
  caption?: any
}

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

// lib (Control.tsx) 在两组按钮上做了 umbrella OR: 父开关启用时强制覆盖子开关.
// snippet 里把"被覆盖且仍出现在输出中"的子键改成注释行, 让用户拿去粘贴时能直接看出关系.
const UMBRELLA_CHILD_TO_PARENT: Record<string, string> = {
  rotateLeft: 'rotate',
  rotateRight: 'rotate',
  flipLeft: 'flip',
  flipRight: 'flip',
}

function formatControllerObject (v: Record<string, any>, getPhrase: GetUmbrellaPhrase): string {
  const lines: string[] = ['{']
  for (const [k, val] of Object.entries(v)) {
    const parent = UMBRELLA_CHILD_TO_PARENT[k]
    const overridden = !!parent && !!v[parent]
    const propText = `"${k}": ${reindentMultiline(formatValue(val), '  ')}`
    if (overridden) {
      lines.push(`  // ${propText} | ${getPhrase(parent)}`)
    } else {
      lines.push(`  ${propText},`)
    }
  }
  lines.push('}')
  return lines.join('\n')
}

function formatPropsObject (props: Record<string, any>, getPhrase: GetUmbrellaPhrase): string {
  const lines: string[] = ['{']
  for (const [k, v] of Object.entries(props)) {
    const valueText = k === 'controller' && v && typeof v === 'object' && !Array.isArray(v)
      ? formatControllerObject(v, getPhrase)
      : formatValue(v)
    lines.push(`  "${k}": ${reindentMultiline(valueText, '  ')},`)
  }
  lines.push('}')
  return lines.join('\n')
}

function formatPropValue (k: string, v: any, getPhrase: GetUmbrellaPhrase): string {
  // controller 是目前唯一带 umbrella 关系的对象; 直接命中 key 名做特化, 不污染通用路径.
  if (k === 'controller' && v && typeof v === 'object' && !Array.isArray(v)) {
    return formatControllerObject(v, getPhrase)
  }
  return formatValue(v)
}

function renderJsxProp (k: string, v: any, getPhrase: GetUmbrellaPhrase): string {
  if (typeof v === 'string' && !v.includes('\n')) return `  ${k}=${JSON.stringify(v)}`
  if (isCallback(v)) return `  ${k}={(...args) => console.info('${k}', args)}`
  return `  ${k}={${reindentMultiline(formatPropValue(k, v, getPhrase), '  ')}}`
}

function renderJsx (props: Record<string, any>, getPhrase: GetUmbrellaPhrase) {
  const lines: string[] = ['<Zmage']
  for (const [k, v] of Object.entries(props)) lines.push(renderJsxProp(k, v, getPhrase))
  lines.push('/>')
  return lines.join('\n')
}

function renderImperative (props: Record<string, any>, getPhrase: GetUmbrellaPhrase) {
  return [
    `import Zmage from 'react-zmage'`,
    ``,
    `Zmage.browsing(${formatPropsObject(props, getPhrase)})`,
  ].join('\n')
}

function getCaptionText (caption: any, fallback?: string) {
  if (typeof caption === 'string' && caption.trim()) return caption.trim()
  if (caption && typeof caption === 'object' && typeof caption.text === 'string' && caption.text.trim()) {
    return caption.text.trim()
  }
  return fallback || ''
}

function escapeHtmlAttr (value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${')
}

function wrapperImagesFromValues (values: Record<string, any>): WrapperHtmlImage[] {
  if (Array.isArray(values.set) && values.set.length > 0) return values.set
  return values.src ? [{ src: values.src, alt: values.alt, caption: values.caption }] : []
}

function renderWrapperHtml (values: Record<string, any>) {
  const imgs = wrapperImagesFromValues(values).slice(0, 4)
  if (imgs.length === 0) {
    return `const html = \`
<p>CMS or markdown content with image tags.</p>
\``
  }

  const figures = imgs.map((img, i) => {
    const caption = getCaptionText(img.caption, img.alt || `Image ${i + 1}`)
    return [
      `  <figure>`,
      `    <img src="${escapeHtmlAttr(img.src)}" alt="${escapeHtmlAttr(img.alt || '')}" />`,
      caption ? `    <figcaption>${escapeHtmlAttr(caption)}</figcaption>` : '',
      `  </figure>`,
    ].filter(Boolean).join('\n')
  })
  return [
    `const html = \``,
    `  <p>Rich text from a CMS, markdown renderer, or MDX pipeline.</p>`,
    ...figures,
    `\``,
  ].join('\n')
}

function omitWrapperOnlyDataProps (props: Record<string, any>) {
  const {
    src: _src,
    alt: _alt,
    caption: _caption,
    browsing: _browsing,
    ...rest
  } = props
  return rest
}

function renderWrapper (values: Record<string, any>, props: Record<string, any>, getPhrase: GetUmbrellaPhrase) {
  const entries = Object.entries(props)
  const lines: string[] = [renderWrapperHtml(values), '']
  if (entries.length === 0) {
    lines.push(`<Zmage.Wrapper>`)
  } else {
    lines.push(`<Zmage.Wrapper`)
    for (const [k, v] of entries) lines.push(renderJsxProp(k, v, getPhrase))
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
  compact = false,
}: {
  values: Record<string, any>
  touched: ReadonlySet<string>
  hideDefaults: boolean
  onHideDefaultsChange: (v: boolean) => void
  mode: Mode
  compact?: boolean
}) {
  const { t } = useT()
  const getPhrase: GetUmbrellaPhrase = (umbrella) =>
    t('snippet.overriddenByProp').replace('{umbrella}', umbrella)
  // hideDefaults 打开 → 不传 touched, 一律剥 schema 默认.
  // hideDefaults 关闭 → 传 touched, 保留用户碰过的默认值.
  const rawProps = buildLibProps(values, hideDefaults ? undefined : touched)
  const props = mode === 'wrapper' ? omitWrapperOnlyDataProps(rawProps) : rawProps
  const code = mode === 'component' ? renderJsx(props, getPhrase)
    : mode === 'imperative' ? renderImperative(props, getPhrase)
      : renderWrapper(values, props, getPhrase)
  const previewId = React.useId()
  const expandedId = React.useId()
  const renderActions = (id: string) => (
    <div className="flex items-center gap-1.5 whitespace-nowrap">
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
  )
  const actions = renderActions(previewId)

  if (compact) {
    return (
      <ExpandablePanel
        title={t('pg.code.title')}
        description={t('pg.code.subtitle')}
        expandLabel={t('common.expand')}
        preview={
          <CodeBlock
            code={code}
            language={'tsx' as any}
            actions={actions}
            className="h-36"
            preClassName="p-3 pr-44 text-xs leading-5"
          />
        }
        expanded={
          <CodeBlock
            code={code}
            language={'tsx' as any}
            actions={renderActions(expandedId)}
            className="h-[62dvh]"
          />
        }
        previewClassName="p-2"
      />
    )
  }

  return (
    <CodeBlock
      code={code}
      language={'tsx' as any}
      actions={actions}
    />
  )
}
