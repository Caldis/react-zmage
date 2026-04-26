import { Sidebar } from '@/docs/Sidebar'
import { Toc, useScrollSpy } from '@/docs/Toc'
import { Footer } from '@/components/Footer'
import { useT } from '@/i18n/useT'
import { Installation } from '@/docs/sections/Installation'
import { ThreeModes } from '@/docs/sections/ThreeModes'
import { Props } from '@/docs/sections/Props'

export default function Docs () {
  const activeId = useScrollSpy('main h2[id], main h3[id]')
  const { t } = useT()
  return (
    <>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[220px_1fr_220px]">
        <aside className="hidden lg:block">
          <div className="sticky top-20">
            <Sidebar activeId={activeId} />
          </div>
        </aside>
        <main className="max-w-none space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">{t('docs.title')}</h1>
          <Installation />
          <ThreeModes />
          <Props />
        </main>
        <aside className="hidden xl:block">
          <div className="sticky top-20">
            <Toc activeId={activeId} />
          </div>
        </aside>
      </div>
      <Footer />
    </>
  )
}
