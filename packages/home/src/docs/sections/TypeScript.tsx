import { Heading } from '@/docs/Heading'
import { CodeBlock } from '@/components/CodeBlock'
import { useT } from '@/i18n/useT'

export function TypeScript () {
  const { t } = useT()
  return (
    <section className="mt-12 space-y-4">
      <Heading id="typescript">{t('docs.section.typescript.title')}</Heading>
      <p>{t('docs.section.typescript.intro')}</p>
      <CodeBlock code={`import type {
  BaseType,
  Set,
  Preset,
  ControllerSet,
  HotKey,
  Animate,
  AnimateCoverOptions,
  GestureSet,
  GestureWheelZoomOptions,
} from 'react-zmage'

const props: BaseType = {
  src: 'hero.jpg',
  set: [{ src: 'hero.jpg', alt: 'hero' }],
  preset: 'desktop',
}`} language={'tsx' as any} />
      <p>{t('docs.section.typescript.refIntro')}</p>
      <CodeBlock code={`const ref = useRef<HTMLImageElement>(null)
<Zmage src="..." ref={ref} />`} language={'tsx' as any} />
    </section>
  )
}
