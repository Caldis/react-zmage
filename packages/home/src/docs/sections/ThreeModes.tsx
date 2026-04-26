import { Heading } from '@/docs/Heading'
import { CodeBlock } from '@/components/CodeBlock'

export function ThreeModes () {
  return (
    <section className="mt-12 space-y-4">
      <Heading id="modes">Three modes</Heading>
      <p><code className="rounded bg-muted px-1 font-mono text-xs">react-zmage</code> exposes the same configuration surface through three call shapes:</p>
      <h3 className="mt-6 text-lg font-semibold">Component</h3>
      <CodeBlock code={`<Zmage src="hero.jpg" set={[...]} />`} language={'tsx' as any} />
      <h3 className="mt-6 text-lg font-semibold">Imperative</h3>
      <CodeBlock code={`Zmage.browsing({ src: 'hero.jpg', set: [...] })
// returns a destructor: () => void`} language={'tsx' as any} />
      <h3 className="mt-6 text-lg font-semibold">Wrapper</h3>
      <CodeBlock code={`<Zmage.Wrapper backdrop="#0a0a0a">
  <article dangerouslySetInnerHTML={{ __html: html }} />
</Zmage.Wrapper>`} language={'tsx' as any} />
      <p className="text-sm text-muted-foreground">
        Wrapper queries <code className="rounded bg-muted px-1 font-mono text-xs">img</code> children in <code className="rounded bg-muted px-1 font-mono text-xs">componentDidMount</code> /
        <code className="rounded bg-muted px-1 font-mono text-xs">componentDidUpdate</code>. Imgs injected after the wrapper renders won't get
        bound until the wrapper re-renders.
      </p>
    </section>
  )
}
