import { Sidebar } from '@/docs/Sidebar'
import { useScrollSpy } from '@/docs/Toc'
import { Footer } from '@/components/Footer'
import { useT } from '@/i18n/useT'
import { Installation } from '@/docs/sections/Installation'
import { ThreeModes } from '@/docs/sections/ThreeModes'
import { Theming } from '@/docs/sections/Theming'
import { Props } from '@/docs/sections/Props'
import { Examples } from '@/docs/sections/Examples'
import { TypeScript } from '@/docs/sections/TypeScript'
import { Migration } from '@/docs/sections/Migration'

export default function Docs () {
  const activeId = useScrollSpy('main h2[id], main h3[id]')
  const { t } = useT()
  return (
    <>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-20">
            <Sidebar activeId={activeId} />
          </div>
        </aside>
        <main className="max-w-none space-y-2 min-w-0">
          <h1 className="text-3xl font-semibold tracking-tight">{t('docs.title')}</h1>
          <Installation />
          <ThreeModes />
          <Theming />
          <Props />
          <Examples />
          <TypeScript />
          <Migration />
        </main>
      </div>
      <Footer />
    </>
  )
}
