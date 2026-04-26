import { Heading } from '@/docs/Heading'
import { CodeBlock } from '@/components/CodeBlock'
import { useT } from '@/i18n/useT'

export function Installation () {
  const { t } = useT()
  return (
    <section className="mt-12 space-y-4">
      <Heading id="installation">{t('docs.section.installation.title')}</Heading>
      <p>{t('docs.section.installation.intro')}</p>
      <CodeBlock code={`pnpm add react-zmage
# or
npm install react-zmage`} language={'bash' as any} />
      <p>{t('docs.section.installation.then')}</p>
      <CodeBlock code={`import Zmage from 'react-zmage'
import 'react-zmage/style.css'`} language={'tsx' as any} />
      <Heading id="ssr" level={3}>{t('docs.section.installation.ssrTitle')}</Heading>
      <p>{t('docs.section.installation.ssrBody')}</p>
      <CodeBlock code={`import Zmage from 'react-zmage/ssr'`} language={'tsx' as any} />
    </section>
  )
}
