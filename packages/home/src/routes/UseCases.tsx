import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, FileText, Newspaper, PanelsTopLeft, Code2, Server, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Footer } from '@/components/Footer'
import { useT } from '@/i18n/useT'

const useCases = [
  {
    icon: BookOpen,
    titleKey: 'useCases.card.blog.title',
    bodyKey: 'useCases.card.blog.body',
  },
  {
    icon: FileText,
    titleKey: 'useCases.card.cms.title',
    bodyKey: 'useCases.card.cms.body',
  },
  {
    icon: Newspaper,
    titleKey: 'useCases.card.news.title',
    bodyKey: 'useCases.card.news.body',
  },
  {
    icon: PanelsTopLeft,
    titleKey: 'useCases.card.mdx.title',
    bodyKey: 'useCases.card.mdx.body',
  },
  {
    icon: Code2,
    titleKey: 'useCases.card.lightbox.title',
    bodyKey: 'useCases.card.lightbox.body',
  },
  {
    icon: Server,
    titleKey: 'useCases.card.ssr.title',
    bodyKey: 'useCases.card.ssr.body',
  },
] as const

const facts = [
  'useCases.fact.react',
  'useCases.fact.modes',
  'useCases.fact.input',
  'useCases.fact.ssr',
  'useCases.fact.gallery',
  'useCases.fact.origin',
] as const

const faq = [
  {
    questionKey: 'useCases.faq.what.q',
    answerKey: 'useCases.faq.what.a',
  },
  {
    questionKey: 'useCases.faq.lightbox.q',
    answerKey: 'useCases.faq.lightbox.a',
  },
  {
    questionKey: 'useCases.faq.richText.q',
    answerKey: 'useCases.faq.richText.a',
  },
  {
    questionKey: 'useCases.faq.ssr.q',
    answerKey: 'useCases.faq.ssr.a',
  },
] as const

const modes = [
  ['Component', 'useCases.mode.component'],
  ['Imperative', 'useCases.mode.imperative'],
  ['Wrapper', 'useCases.mode.wrapper'],
] as const

export default function UseCases () {
  const { t } = useT()

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{t('useCases.eyebrow')}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            {t('useCases.title')}
          </h1>
          <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
            {t('useCases.body')}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/docs">
                {t('useCases.cta.docs')}
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/playground/wrapper">{t('useCases.cta.wrapper')}</Link>
            </Button>
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map(({ icon: Icon, titleKey, bodyKey }) => (
            <Card key={titleKey} className="border-border/70 bg-card/40 p-5">
              <Icon className="h-5 w-5 text-muted-foreground" />
              <h2 className="mt-4 text-lg font-medium">{t(titleKey)}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{t(bodyKey)}</p>
            </Card>
          ))}
        </div>

        <section className="mt-20 grid gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{t('useCases.mode.eyebrow')}</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">{t('useCases.mode.title')}</h2>
          </div>
          <div className="grid gap-3">
            {modes.map(([label, bodyKey]) => (
              <div key={label} className="grid gap-2 border-b border-border pb-4 sm:grid-cols-[9rem_1fr]">
                <span className="font-mono text-sm text-foreground">{label}</span>
                <span className="text-sm leading-6 text-muted-foreground">{t(bodyKey)}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{t('useCases.facts.eyebrow')}</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">{t('useCases.facts.title')}</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {facts.map(factKey => (
              <div key={factKey} className="flex min-w-0 items-start gap-3 rounded-md border border-border bg-muted/20 p-3 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
                <span>{t(factKey)}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20" id="faq">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{t('useCases.faq.eyebrow')}</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">{t('useCases.faq.title')}</h2>
          <div className="mt-8 divide-y divide-border border-y border-border">
            {faq.map(item => (
              <article key={item.questionKey} className="py-6">
                <h3 className="text-base font-medium">{t(item.questionKey)}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{t(item.answerKey)}</p>
              </article>
            ))}
          </div>
        </section>
      </section>
      <Footer />
    </>
  )
}
