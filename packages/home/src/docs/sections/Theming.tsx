import { Heading } from '@/docs/Heading'
import { CodeBlock } from '@/components/CodeBlock'
import { useT } from '@/i18n/useT'

export function Theming () {
  const { t } = useT()
  return (
    <section className="mt-12 space-y-4">
      <Heading id="theming">{t('docs.section.theming.title')}</Heading>
      <p>{t('docs.section.theming.intro')}</p>

      <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
        <li>{t('docs.section.theming.bullet.backdrop')}</li>
        <li>{t('docs.section.theming.bullet.icons')}</li>
        <li>{t('docs.section.theming.bullet.scoped')}</li>
      </ul>

      <Heading id="theming-default" level={3}>{t('docs.section.theming.defaultTitle')}</Heading>
      <p>{t('docs.section.theming.defaultBody')}</p>
      <CodeBlock code={`<Zmage src="hero.jpg" />
// equivalent to
<Zmage src="hero.jpg" backdrop="#FFFFFF" />`} language={'tsx' as any} />

      <Heading id="theming-pattern" level={3}>{t('docs.section.theming.patternTitle')}</Heading>
      <p>{t('docs.section.theming.patternBody')}</p>
      <CodeBlock code={`import { useTheme } from 'next-themes' // or your own hook
import Zmage from 'react-zmage'

function Photo (props) {
  const { resolvedTheme } = useTheme()
  const backdrop = resolvedTheme === 'dark' ? '#0a0a0a' : '#fafafa'
  return <Zmage backdrop={backdrop} {...props} />
}`} language={'tsx' as any} />

      <Heading id="theming-imperative" level={3}>{t('docs.section.theming.imperativeTitle')}</Heading>
      <p>{t('docs.section.theming.imperativeBody')}</p>
      <CodeBlock code={`const themedBackdrop = document.documentElement.classList.contains('dark')
  ? '#0a0a0a'
  : '#fafafa'

Zmage.browsing({ src: 'hero.jpg', backdrop: themedBackdrop })`} language={'tsx' as any} />

      <Heading id="theming-icons" level={3}>{t('docs.section.theming.iconsTitle')}</Heading>
      <p>{t('docs.section.theming.iconsBody')}</p>
      <CodeBlock code={`/* In your global CSS, after react-zmage/style.css */
#zmage svg {
  color: hsl(var(--foreground));   /* match your design system */
}`} language={'css' as any} />

      <Heading id="theming-toolbar" level={3}>{t('docs.section.theming.toolbarTitle')}</Heading>
      <p>{t('docs.section.theming.toolbarBody')}</p>
      <CodeBlock code={`<Zmage
  src="hero.jpg"
  backdrop="#0a0a0a"
  controller={{
    backdrop: 'rgba(0,0,0,0.4)',  // toolbar capsule, decoupled from modal backdrop
    color: '#ffffff',             // icon color (per-button string overrides still win)
  }}
/>`} language={'tsx' as any} />
    </section>
  )
}
