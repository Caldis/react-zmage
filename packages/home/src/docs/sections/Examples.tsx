import Zmage from 'react-zmage'
import { Heading } from '@/docs/Heading'
import { CodeBlock } from '@/components/CodeBlock'
import { useT } from '@/i18n/useT'

export function Examples () {
  const { t } = useT()
  return (
    <section className="mt-12 space-y-4">
      <Heading id="examples">{t('docs.section.examples.title')}</Heading>

      <h3 className="mt-6 text-lg font-semibold">{t('docs.section.examples.singleTitle')}</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <Zmage src="/imgSet/childsDream/1.jpg" alt="童夢 · ONE" className="w-full rounded-md" />
        <CodeBlock code={`<Zmage
  src="/imgSet/childsDream/1.jpg"
  alt="童夢 · ONE"
/>`} language={'tsx' as any} />
      </div>

      <h3 className="mt-6 text-lg font-semibold">{t('docs.section.examples.galleryTitle')}</h3>
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
