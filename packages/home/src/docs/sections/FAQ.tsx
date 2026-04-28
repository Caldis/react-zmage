import { Heading } from '@/docs/Heading'
import { CodeBlock } from '@/components/CodeBlock'
import { useT } from '@/i18n/useT'

export const FAQ_ITEMS = [
  'tailwind-shrink',
  'r19-imperative',
  'wrapper-empty',
  'vite-esm',
  'wrapper-dynamic',
  'lazy-src',
  'cover-vs-set',
  'controlled-mismatch',
  'ssr',
  'theme',
] as const

export function FAQ () {
  const { t } = useT()
  return (
    <section className="mt-12 space-y-4">
      <Heading id="faq">{t('docs.section.faq.title')}</Heading>

      <div className="space-y-6">
        <div className="space-y-2">
          <Heading id="faq-tailwind-shrink" level={3}>{t('docs.section.faq.tailwind-shrink.q')}</Heading>
          <p className="text-muted-foreground">{t('docs.section.faq.tailwind-shrink.a')}</p>
          <CodeBlock code={`/* The culprit, often shipped by Tailwind preflight / normalize.css */
img { max-width: 100%; height: auto; }`} language={'css' as any} />
        </div>

        <div className="space-y-2">
          <Heading id="faq-r19-imperative" level={3}>{t('docs.section.faq.r19-imperative.q')}</Heading>
          <p className="text-muted-foreground">{t('docs.section.faq.r19-imperative.a')}</p>
          <CodeBlock code={`// 1.1.2+ — browsing() returns a stable destructor
const close = Zmage.browsing({ src: 'hero.jpg' })
// later:
close?.()`} language={'tsx' as any} />
        </div>

        <div className="space-y-2">
          <Heading id="faq-wrapper-empty" level={3}>{t('docs.section.faq.wrapper-empty.q')}</Heading>
          <p className="text-muted-foreground">{t('docs.section.faq.wrapper-empty.a')}</p>
        </div>

        <div className="space-y-2">
          <Heading id="faq-vite-esm" level={3}>{t('docs.section.faq.vite-esm.q')}</Heading>
          <p className="text-muted-foreground">{t('docs.section.faq.vite-esm.a')}</p>
        </div>

        <div className="space-y-2">
          <Heading id="faq-wrapper-dynamic" level={3}>{t('docs.section.faq.wrapper-dynamic.q')}</Heading>
          <p className="text-muted-foreground">{t('docs.section.faq.wrapper-dynamic.a')}</p>
          <CodeBlock code={`// Bind imperatively from your own click handler instead of relying on Wrapper
function onImgClick (e: React.MouseEvent<HTMLImageElement>) {
  const img = e.currentTarget
  Zmage.browsing({ src: img.src, alt: img.alt })
}`} language={'tsx' as any} />
        </div>

        <div className="space-y-2">
          <Heading id="faq-lazy-src" level={3}>{t('docs.section.faq.lazy-src.q')}</Heading>
          <p className="text-muted-foreground">{t('docs.section.faq.lazy-src.a')}</p>
          <CodeBlock code={`// Pass the real URL via set; the cover src can stay as the placeholder.
<Zmage src={placeholderUrl} set={[{ src: realUrl }]} />

// Or imperatively, from your own click handler:
Zmage.browsing({ src: realUrl })`} language={'tsx' as any} />
        </div>

        <div className="space-y-2">
          <Heading id="faq-cover-vs-set" level={3}>{t('docs.section.faq.cover-vs-set.q')}</Heading>
          <p className="text-muted-foreground">{t('docs.section.faq.cover-vs-set.a')}</p>
          <CodeBlock code={`// Cover stays as the thumbnail; set carries the high-resolution viewer image.
<Zmage src={thumbUrl} set={[{ src: hdUrl }]} />`} language={'tsx' as any} />
        </div>

        <div className="space-y-2">
          <Heading id="faq-controlled-mismatch" level={3}>{t('docs.section.faq.controlled-mismatch.q')}</Heading>
          <p className="text-muted-foreground">{t('docs.section.faq.controlled-mismatch.a')}</p>
          <CodeBlock code={`const [open, setOpen] = React.useState(false)
// Always pair browsing with onBrowsing — internal state otherwise drifts.
<Zmage src="hero.jpg" browsing={open} onBrowsing={setOpen} />`} language={'tsx' as any} />
        </div>

        <div className="space-y-2">
          <Heading id="faq-ssr" level={3}>{t('docs.section.faq.ssr.q')}</Heading>
          <p className="text-muted-foreground">{t('docs.section.faq.ssr.a')}</p>
          <CodeBlock code={`import Zmage from 'react-zmage/ssr'
import 'react-zmage/style.css'

// If you need the imperative API in shared code:
if (typeof window !== 'undefined') {
  Zmage.browsing({ src: 'hero.jpg' })
}`} language={'tsx' as any} />
        </div>

        <div className="space-y-2">
          <Heading id="faq-theme" level={3}>{t('docs.section.faq.theme.q')}</Heading>
          <p className="text-muted-foreground">{t('docs.section.faq.theme.a')}</p>
        </div>
      </div>

      {/* keep type-only ref so the constant is preserved if reordered later */}
      <span className="hidden">{FAQ_ITEMS.join(',')}</span>
    </section>
  )
}
