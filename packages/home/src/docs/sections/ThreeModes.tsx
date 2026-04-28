import { Heading } from '@/docs/Heading'
import { CodeBlock } from '@/components/CodeBlock'
import { useT } from '@/i18n/useT'

export function ThreeModes () {
  const { t } = useT()
  return (
    <section className="mt-12 space-y-4">
      <Heading id="modes">{t('docs.section.modes.title')}</Heading>
      <p>{t('docs.section.modes.intro')}</p>
      <h3 className="mt-6 text-lg font-semibold">{t('docs.section.modes.componentTitle')}</h3>
      <p>{t('docs.section.modes.componentBody')}</p>
      <CodeBlock code={`<Zmage
  src="hero.jpg"
  set={[...]}
/>`} language={'tsx' as any} />
      <h3 className="mt-6 text-lg font-semibold">{t('docs.section.modes.imperativeTitle')}</h3>
      <p>{t('docs.section.modes.imperativeBody')}</p>
      <CodeBlock code={`Zmage.browsing({ src: 'hero.jpg', set: [...] })
// returns a destructor: () => void`} language={'tsx' as any} />
      <h3 className="mt-6 text-lg font-semibold">{t('docs.section.modes.wrapperTitle')}</h3>
      <p>{t('docs.section.modes.wrapperBody')}</p>
      <CodeBlock code={`<Zmage.Wrapper backdrop="#0a0a0a">
  <article dangerouslySetInnerHTML={{ __html: html }} />
</Zmage.Wrapper>`} language={'tsx' as any} />
      <p className="text-sm text-muted-foreground">{t('docs.section.modes.wrapperNote')}</p>
    </section>
  )
}
