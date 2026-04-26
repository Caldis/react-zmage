import { Heading } from '@/docs/Heading'

export function Migration () {
  return (
    <section className="mt-12 space-y-4">
      <Heading id="migration">Migration</Heading>
      <p>From <code className="rounded bg-muted px-1 font-mono text-xs">v2</code>:</p>
      <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
        <li><code className="rounded bg-muted px-1 font-mono text-xs">preset: 'auto'</code> is deprecated — use <code className="rounded bg-muted px-1 font-mono text-xs">'desktop'</code> or <code className="rounded bg-muted px-1 font-mono text-xs">'mobile'</code>.</li>
        <li>Component is a <code className="rounded bg-muted px-1 font-mono text-xs">forwardRef</code> exotic; do not <code className="rounded bg-muted px-1 font-mono text-xs">new Zmage()</code>.</li>
        <li>If you import the SSR entry, switch to <code className="rounded bg-muted px-1 font-mono text-xs">react-zmage/ssr</code>.</li>
      </ul>
    </section>
  )
}
