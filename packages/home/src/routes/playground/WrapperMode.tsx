import Zmage from 'react-zmage'
import { CodeSnippet, buildPropsObject } from '@/playground/CodeSnippet'
import { EventLog } from '@/playground/EventLog'
import { useThemedBackdrop } from '@/lib/themedBackdrop'

export default function WrapperMode ({ values }: { values: Record<string, any> }) {
  const themedBackdrop = useThemedBackdrop()
  // Wrapper 从被点击的 <img> 自身读 src/alt/set, 我们的 props 不能盖掉它们.
  // buildPropsObject 对 required 字段会原样返回(包括默认空字符串), 直接展开会让
  // wrapper 拿到 src='' / set=[] 然后传给 Zmage.browsing, 触发"empty src"警告 + 模态空白.
  // 这里显式剔除 src / set / alt / txt / defaultPage, 让 wrapper 走自动检测路径.
  const { src: _src, set: _set, alt: _alt, txt: _txt, defaultPage: _defaultPage, ...stripped } = buildPropsObject(values)
  // Backdrop: user override wins; otherwise follow site theme.
  const wrapperProps = { backdrop: themedBackdrop, ...stripped }
  const Wrapper = (Zmage as any).Wrapper
  return (
    <div className="space-y-6">
      <CodeSnippet values={values} mode="wrapper" />
      <div className="rounded-lg border border-border bg-card/30 p-6">
        <Wrapper {...wrapperProps}>
          <article className="mx-auto max-w-2xl space-y-4 text-sm">
            <p>Wrapper auto-attaches the viewer to every <code className="rounded bg-muted px-1 font-mono text-xs">&lt;img&gt;</code> below:</p>
            <p><img src="/imgSet/childsDream/1.jpg" alt="童夢 · ONE" className="rounded-md" /></p>
            <p><img src="/imgSet/childsDream/2.jpg" alt="童夢 · TWO" className="rounded-md" /></p>
            <p><img src="/imgSet/childsDream/3.jpg" alt="童夢 · THREE" className="rounded-md" /></p>
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
