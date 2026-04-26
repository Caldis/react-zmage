import * as React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Copy, Check } from 'lucide-react'
import zmagePkg from 'react-zmage/package.json'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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

export default function Home () {
  return (
    <>
      <Hero />
      {/* TODO sections wired in Tasks 14-15 */}
      <Footer />
    </>
  )
}
