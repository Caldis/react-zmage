import Zmage from 'react-zmage'
import { CodeSnippet, buildPropsObject } from '@/playground/CodeSnippet'
import { EventLog } from '@/playground/EventLog'

export default function WrapperMode ({ values }: { values: Record<string, any> }) {
  const props = buildPropsObject(values)
  const Wrapper = (Zmage as any).Wrapper
  return (
    <div className="space-y-6">
      <CodeSnippet values={values} mode="wrapper" />
      <div className="rounded-lg border border-border bg-card/30 p-6">
        <Wrapper {...props}>
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
