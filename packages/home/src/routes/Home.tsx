import * as React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Copy, Check, ImageIcon, GalleryHorizontal, Wand2, Code2 } from 'lucide-react'
import Zmage from 'react-zmage'
import zmagePkg from 'react-zmage/package.json'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CodeBlock } from '@/components/CodeBlock'
import { Footer } from '@/components/Footer'
import { useT } from '@/i18n/useT'
import { cn } from '@/lib/utils'

function NpmChip () {
  const cmd = 'pnpm add react-zmage'
  const [copied, setCopied] = React.useState(false)
  const { t } = useT()
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(cmd)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      className="group inline-flex items-center gap-2 rounded-md border border-border bg-muted/40 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:bg-muted"
    >
      <span>$ {cmd}</span>
      {copied
        ? <><Check className="h-3.5 w-3.5" /> <span className="text-foreground">{t('hero.cta.npm.copied')}</span></>
        : <Copy className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100" />}
    </button>
  )
}

function Hero () {
  const { t } = useT()
  return (
    <section className="relative isolate overflow-hidden">
      {/* grid background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid [background-size:40px_40px]" aria-hidden />
      {/* radial glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,hsl(var(--foreground)/0.08),transparent)]" aria-hidden />

      <div className="mx-auto flex min-h-[80vh] max-w-5xl flex-col items-center px-4 py-32 text-center sm:px-6">
        <Badge variant="secondary" className="mb-8 font-mono">
          v{zmagePkg.version} · {t('hero.pill')}
        </Badge>
        <h1 className={cn(
          'font-sans font-semibold tracking-tight',
          'text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.05]',
        )}>
          {t('hero.title.line1')}
        </h1>
        <h2 className={cn(
          'mt-2 bg-clip-text font-sans font-semibold tracking-tight',
          'text-[clamp(2rem,5.5vw,4rem)] leading-[1.1]',
          'bg-gradient-to-br from-foreground to-foreground/40 text-transparent',
        )}>
          {t('hero.title.line2')}
        </h2>
        <p className="mt-8 max-w-2xl text-base text-muted-foreground sm:text-lg">
          {t('hero.subtitle')}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" asChild>
            <Link to="/docs">{t('hero.cta.start')} <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/playground">{t('hero.cta.playground')}</Link>
          </Button>
          <NpmChip />
        </div>
      </div>
    </section>
  )
}

function LiveDemo () {
  const { t } = useT()
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="overflow-hidden rounded-2xl border border-border bg-muted/20 shadow-2xl shadow-black/40">
        <div className="aspect-[16/9] w-full">
          <Zmage
            className="h-full w-full object-cover"
            src="/imgSet/childsDream/1.jpg"
            alt="Live demo"
            set={[
              { src: '/imgSet/childsDream/1.jpg', alt: '童夢 · ONE' },
              { src: '/imgSet/childsDream/2.jpg', alt: '童夢 · TWO' },
              { src: '/imgSet/childsDream/3.jpg', alt: '童夢 · THREE' },
              { src: '/imgSet/childsDream/4.jpg', alt: '童夢 · FOUR' },
            ]}
          />
        </div>
      </div>
      <p className="mt-6 text-center text-sm text-muted-foreground">{t('demo.caption')}</p>
    </section>
  )
}

const FEATURES = [
  { icon: ImageIcon, titleKey: 'feature.dropin.title' as const, hintKey: 'feature.dropin.hint' as const, code: '<Zmage src="..." />' },
  { icon: GalleryHorizontal, titleKey: 'feature.set.title' as const, hintKey: 'feature.set.hint' as const, code: '<Zmage src="..." set={[...]} />' },
  { icon: Code2, titleKey: 'feature.imperative.title' as const, hintKey: 'feature.imperative.hint' as const, code: 'Zmage.browsing({ src })' },
  { icon: Wand2, titleKey: 'feature.wrapper.title' as const, hintKey: 'feature.wrapper.hint' as const, code: '<Zmage.Wrapper>{children}</Zmage.Wrapper>' },
]

function FeatureGrid () {
  const { t } = useT()
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="grid gap-4 md:grid-cols-2">
        {FEATURES.map(({ icon: I, titleKey, hintKey, code }) => (
          <Card key={titleKey} className="group relative overflow-hidden border-border/60 bg-card/40 p-6 transition-colors hover:bg-card/70">
            <I className="h-5 w-5 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">{t(titleKey)}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{t(hintKey)}</p>
            <div className="mt-5">
              <CodeBlock code={code} language={'tsx' as any} showCopy={false} />
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}

const MODE_CODE = {
  component: `<Zmage src="hero.jpg" set={[...]} />`,
  imperative: `import Zmage from 'react-zmage'

button.onclick = () => Zmage.browsing({
  src: 'hero.jpg', set: [...]
})`,
  wrapper: `<Zmage.Wrapper>
  <article dangerouslySetInnerHTML={{ __html: html }} />
</Zmage.Wrapper>`,
}

function ThreeModes () {
  const { t } = useT()
  const cards = [
    { code: MODE_CODE.component, labelKey: 'modes.component.label' as const, descKey: 'modes.component.desc' as const, link: '/playground' },
    { code: MODE_CODE.imperative, labelKey: 'modes.imperative.label' as const, descKey: 'modes.imperative.desc' as const, link: '/playground/imperative' },
    { code: MODE_CODE.wrapper, labelKey: 'modes.wrapper.label' as const, descKey: 'modes.wrapper.desc' as const, link: '/playground/wrapper' },
  ]
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <h2 className="text-3xl font-semibold tracking-tight">{t('modes.title')}</h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {cards.map(c => (
          <div key={c.labelKey} className="flex flex-col">
            <span className="text-xs font-mono text-muted-foreground">{t(c.labelKey)}</span>
            <CodeBlock code={c.code} className="mt-2 flex-1" />
            <p className="mt-4 text-sm text-muted-foreground">{t(c.descKey)}</p>
            <Link to={c.link} className="mt-3 text-sm text-foreground hover:opacity-70">{t('modes.try')}</Link>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function Home () {
  return (
    <>
      <Hero />
      <LiveDemo />
      <FeatureGrid />
      <ThreeModes />
      <Footer />
    </>
  )
}
