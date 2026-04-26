import Zmage from 'react-zmage'
import { CodeSnippet, buildPropsObject } from '@/playground/CodeSnippet'
import { EventLog } from '@/playground/EventLog'
import { useThemedBackdrop } from '@/lib/themedBackdrop'

const FALLBACK_IMGS = [
  { src: '/imgSet/childsDream/1.jpg', alt: '童夢 · ONE' },
  { src: '/imgSet/childsDream/2.jpg', alt: '童夢 · TWO' },
  { src: '/imgSet/childsDream/3.jpg', alt: '童夢 · THREE' },
]

export default function WrapperMode ({ values }: { values: Record<string, any> }) {
  const themedBackdrop = useThemedBackdrop()
  const allProps = buildPropsObject(values)
  // Wrapper 从被点击的 <img> 自身读 src/alt, 不要把面板里的 src/set 透传给 Wrapper 实例
  // (defaultProps 会把空 src 灌回去, 触发 empty-src 警告). 这里剥掉单图相关字段,
  // 但保留 backdrop/zIndex/animate 等真正影响 wrapper 行为的 props.
  const { src: _src, set: _set, alt: _alt, txt: _txt, defaultPage: _defaultPage, ...stripped } = allProps
  const wrapperProps = { backdrop: themedBackdrop, ...stripped }
  // WYSIWYG: 渲染哪些 <img> 进 wrapper 取决于面板里有没有 src / set
  const userHasSet = Array.isArray(allProps.set) && allProps.set.length > 0
  const userHasSrc = !!allProps.src
  const imgs: { src: string; alt?: string }[] = userHasSet
    ? (allProps.set as { src: string; alt?: string }[])
    : userHasSrc
      ? [{ src: allProps.src, alt: allProps.alt }]
      : FALLBACK_IMGS
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
