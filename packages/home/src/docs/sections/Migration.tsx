import { Heading } from '@/docs/Heading'
import { useT } from '@/i18n/useT'

export function Migration () {
  const { t } = useT()
  return (
    <section className="mt-12 space-y-4">
      <Heading id="migration">{t('docs.section.migration.title')}</Heading>
      <p>{t('docs.section.migration.fromV2')}</p>
      <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
        <li>{t('docs.section.migration.bullet1')}</li>
        <li>{t('docs.section.migration.bullet2')}</li>
      </ul>
    </section>
  )
}
