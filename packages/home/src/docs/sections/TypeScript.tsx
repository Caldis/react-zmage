import { Heading } from '@/docs/Heading'
import { CodeBlock } from '@/components/CodeBlock'

export function TypeScript () {
  return (
    <section className="mt-12 space-y-4">
      <Heading id="typescript">TypeScript</Heading>
      <p>Types are co-located with the runtime export. The full prop union is <code className="rounded bg-muted px-1 font-mono text-xs">BaseType</code>:</p>
      <CodeBlock code={`import type { BaseType, Set, Preset, ControllerSet, HotKey, Animate } from 'react-zmage'

const props: BaseType = {
  src: 'hero.jpg',
  set: [{ src: 'hero.jpg', alt: 'hero' }],
  preset: 'desktop',
}`} language={'tsx' as any} />
      <p>The component accepts a ref, which forwards to the cover <code className="rounded bg-muted px-1 font-mono text-xs">img</code>:</p>
      <CodeBlock code={`const ref = useRef<HTMLImageElement>(null)
<Zmage src="..." ref={ref} />`} language={'tsx' as any} />
    </section>
  )
}
