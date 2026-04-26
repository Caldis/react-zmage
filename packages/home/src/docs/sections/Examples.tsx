import Zmage from 'react-zmage'
import { Heading } from '@/docs/Heading'
import { CodeBlock } from '@/components/CodeBlock'

export function Examples () {
  return (
    <section className="mt-12 space-y-4">
      <Heading id="examples">Examples</Heading>

      <h3 className="mt-6 text-lg font-semibold">Single image</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <Zmage src="/imgSet/childsDream/1.jpg" alt="童夢 · ONE" className="w-full rounded-md" />
        <CodeBlock code={`<Zmage src="/imgSet/childsDream/1.jpg" alt="..." />`} language={'tsx' as any} />
      </div>

      <h3 className="mt-6 text-lg font-semibold">Multi-image gallery</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <Zmage
          src="/imgSet/childsDream/3.jpg"
          alt="童夢 · THREE"
          className="w-full rounded-md"
          set={[
            { src: '/imgSet/childsDream/3.jpg', alt: '童夢 · THREE' },
            { src: '/imgSet/childsDream/4.jpg', alt: '童夢 · FOUR' },
            { src: '/imgSet/childsDream/5.jpg', alt: '童夢 · FIVE' },
          ]}
        />
        <CodeBlock code={`<Zmage
  src="..."
  set={[
    { src: '...', alt: '...' },
    { src: '...', alt: '...' },
  ]}
/>`} language={'tsx' as any} />
      </div>
    </section>
  )
}
