import * as React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Copy, Check, ImageIcon, GalleryHorizontal, Smartphone, Server, Plus, Bot, Sparkles, Keyboard, Mouse, MousePointer2, MousePointerClick } from 'lucide-react'
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
import { useCopyToClipboard } from '@/lib/useCopyToClipboard'
import { siteZmageAnimate, siteZmageController } from '@/lib/zmageSiteConfig'

const CHILDS_DREAM_BEHANCE_URL = 'https://www.behance.net/gallery/56119387/_'

function NpmChip () {
  const cmd = 'npm install react-zmage'
  const { copied, copy } = useCopyToClipboard()
  return (
    <button
      onClick={() => void copy(cmd)}
      className="group inline-flex max-w-full cursor-pointer items-center gap-2 rounded-md border border-border bg-muted/40 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      <span className="min-w-0 truncate">$ {cmd}</span>
      {copied
        ? <Check className="h-3.5 w-3.5 text-foreground" />
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
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[min(600px,150vw)] w-[min(900px,190vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,hsl(var(--foreground)/0.08),transparent)]" aria-hidden />
      {/* Corner crosshair markers (4) */}
      <Plus aria-hidden className="absolute top-3 left-3 h-3.5 w-3.5 text-foreground/40" />
      <Plus aria-hidden className="absolute top-3 right-3 h-3.5 w-3.5 text-foreground/40" />
      <Plus aria-hidden className="absolute bottom-3 left-3 h-3.5 w-3.5 text-foreground/40" />
      <Plus aria-hidden className="absolute bottom-3 right-3 h-3.5 w-3.5 text-foreground/40" />

      {/* Content stack */}
      <div className="relative flex w-full max-w-5xl min-w-0 flex-col items-center gap-8 px-4 text-center sm:px-6">
        <img
          src="/logo.png"
          alt="react-zmage"
          className="h-20 w-20 opacity-90 drop-shadow-[0_0_30px_hsl(var(--foreground)/0.18)]"
        />
        <Badge variant="secondary" className="font-mono">
          v{zmagePkg.version} · {t('hero.pill')}
        </Badge>
        <div>
          {/* One semantic H1, split visually into two lines for layout and emphasis. */}
          <h1 className="font-sans font-semibold tracking-tight">
            {/* leading 留够 descender 高度 (g/y/p/q + 角括号下伸); 太紧 (≤1.05) 会被 line-box / overflow-hidden 截掉 */}
            <span className={cn(
              'block',
              'text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.15]',
            )}>
              {t('hero.title.line1')}
            </span>
            {/* 第二行多一层 bg-clip-text + text-transparent: 渐变 mask 默认贴 line-box 尾, 紧 leading 时
              descender 会进入透明区直接消失. leading 拉到 1.2 + pb-2 让渐变盒子覆盖下伸. */}
            <span className={cn(
              'mt-2 block bg-clip-text pb-2',
              'text-[clamp(2rem,5.5vw,4rem)] leading-[1.2]',
              'bg-gradient-to-br from-foreground to-foreground/40 text-transparent',
            )}>
              {t('hero.title.line2')}
            </span>
          </h1>
        </div>
        <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
          {t('hero.subtitle')}
        </p>
        <div className="flex max-w-full flex-wrap items-center justify-center gap-3">
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
  const { copied, copy } = useCopyToClipboard()
  return (
    // Vertical: kicker label sits on its own line above the directive pill.
    // The label is a hierarchy hint — uppercase + tracking + lower opacity reads as
    // a section header, not body text, so it doesn't compete with the pill below.
    <div className="mt-4 flex flex-col items-center gap-1.5">
      <span className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-muted-foreground/80">
        <Sparkles aria-hidden className="h-3.5 w-3.5" />
        {t('hero.ai.label')}
      </span>
      <div className="flex flex-wrap items-center justify-center gap-2 text-[11px]">
        <button
          onClick={() => void copy(directive)}
          aria-label={t('hero.ai.copyLabel')}
          className="group inline-flex max-w-full cursor-pointer items-center gap-2 rounded-md border border-border/60 bg-muted/30 px-3 py-1.5 font-mono text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Bot aria-hidden className="h-3.5 w-3.5 opacity-70" />
          <span className="min-w-0 break-words text-left">{directive}</span>
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
          {t('hero.ai.viewLlms')}
        </a>
      </div>
    </div>
  )
}

function LiveDemo () {
  const { t } = useT()
  const backdrop = useThemedBackdrop()
  type DemoKey = Parameters<typeof t>[0]
  const set = [
    { src: '/imgSet/childsDream/demo.jpg', alt: t('demo.scene.portal.alt'), caption: t('demo.scene.portal.caption') },
    { src: '/imgSet/childsDream/2.jpg', alt: t('demo.scene.forest.alt'), caption: t('demo.scene.forest.caption') },
    { src: '/imgSet/childsDream/3.jpg', alt: t('demo.scene.tide.alt'), caption: t('demo.scene.tide.caption') },
    { src: '/imgSet/childsDream/4.jpg', alt: t('demo.scene.canopy.alt'), caption: t('demo.scene.canopy.caption') },
    { src: '/imgSet/childsDream/5.jpg', alt: t('demo.scene.flamingo.alt'), caption: t('demo.scene.flamingo.caption') },
    { src: '/imgSet/childsDream/6.jpg', alt: t('demo.scene.lamp.alt'), caption: t('demo.scene.lamp.caption') },
    { src: '/imgSet/childsDream/7.jpg', alt: t('demo.scene.crystal.alt'), caption: t('demo.scene.crystal.caption') },
    { src: '/imgSet/childsDream/8.jpg', alt: t('demo.scene.rescue.alt'), caption: t('demo.scene.rescue.caption') },
  ]
  const capabilities = [
    { icon: MousePointerClick, label: t('demo.feature.cover') },
    { icon: MousePointer2, label: t('demo.feature.space') },
    { icon: Mouse, label: t('demo.feature.wheel') },
  ]
  const Figure = ({
    page,
    labelKey,
    className,
    imageClassName,
    labelClassName,
    objectPosition = 'center',
  }: {
    page: number
    labelKey: DemoKey
    className: string
    imageClassName: string
    labelClassName?: string
    objectPosition?: React.CSSProperties['objectPosition']
  }) => {
    const item = set[page]
    return (
      <figure className={cn('group relative min-w-0 overflow-hidden rounded-lg bg-muted/30', className)}>
        <Zmage
          className={cn('block h-full w-full rounded-lg object-cover transition duration-300 group-hover:scale-[1.012]', imageClassName)}
          style={{ objectPosition }}
          src={item.src}
          alt={item.alt}
          caption={item.caption}
          backdrop={backdrop}
          set={set}
          defaultPage={page}
          radius={10}
          edge={12}
          animate={siteZmageAnimate}
          controller={siteZmageController}
        />
        <figcaption className={cn(
          'pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/70 via-black/15 to-transparent p-3 text-xs text-white',
          labelClassName,
        )}>
          <span className="font-medium">{t(labelKey)}</span>
          <span className="font-mono opacity-75">{String(page + 1).padStart(2, '0')}</span>
        </figcaption>
      </figure>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="mb-3 inline-flex items-center gap-2 rounded-md border border-border bg-muted/40 px-2.5 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles aria-hidden className="h-3.5 w-3.5" />
            {t('demo.eyebrow')}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t('demo.title')}</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">{t('demo.body')}</p>
        </div>
        <div className="hidden w-fit max-w-full flex-col gap-2 text-sm md:flex">
          <div className="inline-flex items-center gap-2 rounded-md border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-amber-950 shadow-sm dark:text-amber-100">
            <Keyboard aria-hidden className="h-4 w-4 shrink-0" />
            <span>{t('demo.shiftHint')}</span>
          </div>
        </div>
      </div>

      <article className="grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(260px,0.58fr)_minmax(260px,0.72fr)] lg:grid-rows-[13rem_14rem_12rem]">
        <Figure
          page={0}
          labelKey="demo.tile.cover"
          className="aspect-[5/4] border border-border lg:col-span-2 lg:row-span-2 lg:aspect-auto"
          imageClassName=""
          objectPosition="52% 48%"
        />

        <div className="flex min-w-0 flex-col justify-between gap-6 border-y border-border py-5 lg:row-span-1">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              <a
                href={CHILDS_DREAM_BEHANCE_URL}
                target="_blank"
                rel="noreferrer"
                className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                {t('demo.story.project')}
              </a>
              <span> · {t('demo.story.author')}</span>
            </p>
            <p className="mt-3 text-xl font-medium leading-8 tracking-normal">{t('demo.story.title')}</p>
          </div>
          <p className="text-sm leading-7 text-muted-foreground">{t('demo.story.lead')}</p>
        </div>

        <Figure
          page={1}
          labelKey="demo.tile.gallery"
          className="aspect-[4/3] border border-border lg:row-span-1 lg:aspect-auto"
          imageClassName=""
          objectPosition="50% 42%"
        />

        <div className="flex min-w-0 flex-col justify-end border-y border-border py-5 text-sm leading-7 text-muted-foreground lg:col-start-2 lg:row-start-3">
          <p>{t('demo.story.middle')}</p>
        </div>

        <Figure
          page={6}
          labelKey="demo.tile.controller"
          className="aspect-[16/10] border border-border lg:col-start-1 lg:row-start-3 lg:aspect-auto"
          imageClassName=""
          objectPosition="50% 45%"
        />

        <Figure
          page={4}
          labelKey="demo.tile.zoom"
          className="aspect-[16/10] border border-border lg:col-start-3 lg:row-start-3 lg:aspect-auto"
          imageClassName=""
          objectPosition="50% 42%"
        />
      </article>

      <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,0.82fr)_minmax(0,1.18fr)]">
        <Figure
          page={2}
          labelKey="demo.tile.ratio"
          className="aspect-[16/10] border border-border"
          imageClassName=""
          objectPosition="50% 46%"
        />
        <Figure
          page={5}
          labelKey="demo.tile.lamp"
          className="aspect-[4/3] border border-border md:aspect-[5/4]"
          imageClassName=""
          objectPosition="50% 48%"
        />
        <Figure
          page={7}
          labelKey="demo.tile.rescue"
          className="aspect-[16/9] border border-border"
          imageClassName=""
          objectPosition="52% 45%"
        />
      </div>

      <div className="mt-5 grid gap-2 lg:grid-cols-3">
        {capabilities.map(({ icon: Icon, label }) => (
          <div key={label} className="flex min-h-11 min-w-0 items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm leading-5 text-muted-foreground">
            <Icon aria-hidden className="h-4 w-4 shrink-0 text-foreground" />
            <span className="min-w-0">{label}</span>
          </div>
        ))}
      </div>
      <p className="mt-5 text-sm text-muted-foreground">{t('demo.caption')}</p>
    </section>
  )
}

const FEATURES = [
  { icon: ImageIcon, titleKey: 'feature.dropin.title' as const, hintKey: 'feature.dropin.hint' as const, code: '<Zmage src="..." />' },
  { icon: Smartphone, titleKey: 'feature.mobile.title' as const, hintKey: 'feature.mobile.hint' as const, code: '<Zmage preset="auto" src="..." />' },
  { icon: GalleryHorizontal, titleKey: 'feature.set.title' as const, hintKey: 'feature.set.hint' as const, code: '<Zmage src="..." set={[...]} />' },
  { icon: Server, titleKey: 'feature.ssr.title' as const, hintKey: 'feature.ssr.hint' as const, code: 'import Zmage from \'react-zmage/ssr\'' },
]

function FeatureGrid () {
  const { t } = useT()
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="grid gap-4 md:grid-cols-2">
        {FEATURES.map(({ icon: I, titleKey, hintKey, code }) => (
          <Card key={titleKey} className="group relative min-w-0 overflow-hidden border-border/60 bg-card/40 p-6 transition-colors hover:bg-card/70">
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

function AgentFacts () {
  return (
    <section
      aria-hidden="true"
      data-agent-facts
      className="sr-only"
    >
      <div className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">Agent facts</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">Install, cost, and alternatives</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
          react-zmage is a free MIT-licensed open-source package on npm. It is a client-side React component library, not a hosted API service, so there is no OAuth flow, API key, webhook endpoint, MCP server, account, or product rate limit.
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <Card className="border-border/70 bg-card/40 p-5">
          <h3 className="text-base font-medium">Quick start</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Install the package, import the stylesheet once, then choose Component, Wrapper, or Imperative mode for the image surface.
          </p>
          <div className="mt-4">
            <CodeBlock code="npm install react-zmage" language={'bash' as any} showCopy={false} />
          </div>
        </Card>

        <Card className="border-border/70 bg-card/40 p-5">
          <h3 className="text-base font-medium">react-zmage vs alternatives</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            react-zmage is an alternative to react-medium-image-zoom, Lightbox.js, and react-photoswipe when a React page needs fullscreen image preview from existing img elements. Unlike gallery-first tools, it can start as a drop-in image replacement.
          </p>
          <Link to="/compare" className="mt-4 inline-flex text-sm text-foreground underline-offset-4 hover:underline">
            Compare packages
          </Link>
        </Card>

        <Card className="border-border/70 bg-card/40 p-5">
          <h3 className="text-base font-medium">Trust and recovery</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Agents can use the status, about, contact, and privacy pages to avoid guessing about unsupported hosted APIs or private access paths.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <Link to="/status" className="text-foreground underline-offset-4 hover:underline">Status</Link>
            <Link to="/about" className="text-foreground underline-offset-4 hover:underline">About</Link>
            <Link to="/contact" className="text-foreground underline-offset-4 hover:underline">Contact</Link>
            <Link to="/privacy" className="text-foreground underline-offset-4 hover:underline">Privacy</Link>
          </div>
        </Card>
      </div>
    </section>
  )
}

const MODE_CODE = {
  component: `<Zmage src="hero.jpg" />`,
  imperative: `import Zmage from 'react-zmage'

button.onclick = () => Zmage.browsing({
  src: 'hero.jpg'
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
      <div className="mt-10 grid min-w-0 gap-6 md:grid-cols-3">
        {cards.map(c => (
          <div key={c.labelKey} className="flex min-w-0 flex-col">
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
      <AgentFacts />
      <ThreeModes />
      <Footer />
    </>
  )
}
