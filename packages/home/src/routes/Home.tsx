import * as React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Copy, Check, ImageIcon, GalleryHorizontal, Wand2, Code2, Plus, Bot } from 'lucide-react'
import Zmage from 'react-zmage'
import zmagePkg from 'react-zmage/package.json'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CodeBlock } from '@/components/CodeBlock'
import { Footer } from '@/components/Footer'
import { useT } from '@/i18n/useT'
import { cn } from '@/lib/utils'
import { useThemedBackdrop } from '@/lib/themedBackdrop'

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
      className="group inline-flex cursor-pointer items-center gap-2 rounded-md border border-border bg-muted/40 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
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
    // pb-28 (112px) + justify-center 让内容相对默认居中位置上移 56px (1 个 nav header 高度)
    <section className="relative isolate flex h-screen flex-col items-center justify-center overflow-hidden pb-28">
      {/* Grid background — use arbitrary-value bg directly to avoid v4 utility lookup issues */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          backgroundImage:
            'linear-gradient(to right, hsl(var(--foreground) / 0.06) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground) / 0.06) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          // 底部渐隐, 让 hero 与下方 LiveDemo 平滑过渡
          maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
        }}
      />
      {/* Radial glow centered */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,hsl(var(--foreground)/0.08),transparent)]" aria-hidden />
      {/* Corner crosshair markers (4) */}
      <Plus aria-hidden className="absolute top-3 left-3 h-3.5 w-3.5 text-foreground/40" />
      <Plus aria-hidden className="absolute top-3 right-3 h-3.5 w-3.5 text-foreground/40" />
      <Plus aria-hidden className="absolute bottom-3 left-3 h-3.5 w-3.5 text-foreground/40" />
      <Plus aria-hidden className="absolute bottom-3 right-3 h-3.5 w-3.5 text-foreground/40" />

      {/* Content stack */}
      <div className="relative flex max-w-5xl flex-col items-center gap-8 px-4 text-center sm:px-6">
        <img
          src="/logo.png"
          alt="react-zmage"
          className="h-20 w-20 opacity-90 drop-shadow-[0_0_30px_hsl(var(--foreground)/0.18)]"
        />
        <Badge variant="secondary" className="font-mono">
          v{zmagePkg.version} · {t('hero.pill')}
        </Badge>
        <div>
          {/* leading 留够 descender 高度 (g/y/p/q + 角括号下伸); 太紧 (≤1.05) 会被 line-box / overflow-hidden 截掉 */}
          <h1 className={cn(
            'font-sans font-semibold tracking-tight',
            'text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.15]',
          )}>
            {t('hero.title.line1')}
          </h1>
          {/* h2 多一层 bg-clip-text + text-transparent: 渐变 mask 默认贴 line-box 尾, 紧 leading 时
              descender 会进入透明区直接消失. leading 拉到 1.2 + pb-2 让渐变盒子覆盖下伸. */}
          <h2 className={cn(
            'mt-2 bg-clip-text font-sans font-semibold tracking-tight pb-2',
            'text-[clamp(2rem,5.5vw,4rem)] leading-[1.2]',
            'bg-gradient-to-br from-foreground to-foreground/40 text-transparent',
          )}>
            {t('hero.title.line2')}
          </h2>
        </div>
        <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
          {t('hero.subtitle')}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" asChild>
            <Link to="/docs" className="group">
              {t('hero.cta.start')}
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/playground">{t('hero.cta.playground')}</Link>
          </Button>
          <NpmChip />
        </div>
        {/* AI directive: a short, copyable one-liner pointing the user's agent at the
            llmstxt.org-canonical spec served at /llms.txt. The agent fetches that file,
            picks the right usage mode (component / imperative / wrapper) for the user's
            stack, and integrates correctly without us cramming the API into the hero. */}
        <AIDirective />
      </div>
    </section>
  )
}

function AIDirective () {
  const { t } = useT()
  const directive = t('hero.ai.directive')
  const [copied, setCopied] = React.useState(false)
  const onCopy = async () => {
    await navigator.clipboard.writeText(directive)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-[11px]">
      <button
        onClick={onCopy}
        aria-label="Copy AI assistant directive"
        className="group inline-flex cursor-pointer items-center gap-2 rounded-md border border-border/60 bg-muted/30 px-3 py-1.5 font-mono text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <Bot aria-hidden className="h-3.5 w-3.5 opacity-70" />
        <span>{directive}</span>
        {copied
          ? <Check className="h-3.5 w-3.5 text-foreground" />
          : <Copy className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100" />}
      </button>
      <a
        href="/llms.txt"
        target="_blank"
        rel="noreferrer"
        className="text-muted-foreground/70 underline-offset-4 hover:text-foreground hover:underline"
      >
        view llms.txt →
      </a>
    </div>
  )
}

function LiveDemo () {
  const { t } = useT()
  const backdrop = useThemedBackdrop()
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="overflow-hidden rounded-2xl border border-border bg-muted/20 shadow-2xl shadow-black/40">
        <div className="aspect-[16/9] w-full">
          <Zmage
            className="h-full w-full object-cover"
            src="/imgSet/childsDream/1.jpg"
            alt="Live demo"
            backdrop={backdrop}
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
