import { Heading } from '@/docs/Heading'
import { CodeBlock } from '@/components/CodeBlock'

export function Installation () {
  return (
    <section className="mt-12 space-y-4">
      <Heading id="installation">Installation</Heading>
      <p>Install via your package manager:</p>
      <CodeBlock code={`pnpm add react-zmage
# or
npm install react-zmage`} language={'bash' as any} />
      <p>Then import the component and its stylesheet:</p>
      <CodeBlock code={`import Zmage from 'react-zmage'
import 'react-zmage/style.css'`} language={'tsx' as any} />
      <Heading id="ssr" level={3}>SSR</Heading>
      <p>For server-rendered apps, use the <code className="rounded bg-muted px-1 font-mono text-xs">/ssr</code> entry to avoid touching <code className="rounded bg-muted px-1 font-mono text-xs">document</code> at import time:</p>
      <CodeBlock code={`import Zmage from 'react-zmage/ssr'`} language={'tsx' as any} />
    </section>
  )
}
