import Zmage from 'react-zmage'
import { CodeSnippet } from '@/playground/CodeSnippet'
import { EventLog } from '@/playground/EventLog'
import { useThemedBackdrop } from '@/lib/themedBackdrop'

export default function WrapperMode ({ values }: { values: Record<string, any> }) {
  const themedBackdrop = useThemedBackdrop()
  // Wrapper 从被点击的 <img> 读 src/alt, 这里只把 backdrop/zIndex/animate 等真正影响 wrapper
  // 行为的字段透下去, 单图相关的 src/set/alt 不传 (避免 defaultProps 把 '' 灌进去).
  const { src: _src, set: _set, alt: _alt, txt: _txt, defaultPage: _defaultPage, ...stripped } = values
  const wrapperProps = { backdrop: themedBackdrop, ...stripped }
  // WYSIWYG: 渲染哪些 <img> 进 wrapper 完全跟随面板的 src / set
  const userHasSet = Array.isArray(values.set) && values.set.length > 0
  const userHasSrc = !!values.src
  const imgs: { src: string; alt?: string }[] = userHasSet
    ? values.set
    : userHasSrc
      ? [{ src: values.src, alt: values.alt }]
      : []
  const Wrapper = (Zmage as any).Wrapper
  return (
    <div className="space-y-6">
      <CodeSnippet values={values} mode="wrapper" />
      <div className="rounded-lg border border-border bg-card/30 p-6">
        <Wrapper {...wrapperProps}>
          <article className="mx-auto max-w-2xl space-y-4 text-sm">
            <p>Wrapper auto-attaches the viewer to every <code className="rounded bg-muted px-1 font-mono text-xs">&lt;img&gt;</code> below:</p>
            {imgs.map((img, i) => (
              <p key={i}><img src={img.src} alt={img.alt ?? ''} className="rounded-md" /></p>
            ))}
            <p className="text-xs text-muted-foreground">
              Note: Wrapper queries <code className="rounded bg-muted px-1 font-mono">img</code> in <code className="rounded bg-muted px-1 font-mono">componentDidMount</code> /
              <code className="rounded bg-muted px-1 font-mono">componentDidUpdate</code>. Imgs injected after the wrapper renders
              won't get bound until the wrapper re-renders.
            </p>
          </article>
        </Wrapper>
      </div>
      <EventLog />
    </div>
  )
}
