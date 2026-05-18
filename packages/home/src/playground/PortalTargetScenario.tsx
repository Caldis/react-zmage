import * as React from 'react'
import Zmage from 'react-zmage'
import { useT } from '@/i18n/useT'
import { useThemedBackdrop } from '@/lib/themedBackdrop'
import { siteZmageAnimate } from '@/lib/zmageSiteConfig'

const SCENARIO_SET = [
  { src: '/imgSet/childsDream/8.jpg', alt: 'Portal target demo 1' },
  { src: '/imgSet/childsDream/7.jpg', alt: 'Portal target demo 2' },
]

export function PortalTargetScenario () {
  const { t } = useT()
  const backdrop = useThemedBackdrop()
  const [portalTarget, setPortalTarget] = React.useState<HTMLElement | null>(null)
  const setPortalRoot = React.useCallback((node: HTMLDivElement | null) => {
    setPortalTarget(prev => prev === node ? prev : node)
  }, [])

  return (
    <div className="grid gap-3 rounded-lg border border-border bg-card/40 p-3 md:grid-cols-[minmax(0,1fr)_220px]">
      <div className="min-w-0">
        <div className="text-sm font-medium">{t('pg.portalTarget.title')}</div>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {t('pg.portalTarget.body')}
        </p>
        <p className="mt-2 rounded-md bg-muted/35 px-2.5 py-2 font-mono text-[11px] leading-relaxed text-muted-foreground">
          {'portalTarget={viewerRoot}'}
        </p>
      </div>
      <div className="relative min-h-[132px] rounded-md border border-dashed border-border bg-muted/20 p-2">
        <div ref={setPortalRoot} className="absolute inset-2 rounded-md border border-dashed border-primary/35 bg-background/45 px-2 py-1 text-[11px] text-muted-foreground">
          {t('pg.portalTarget.root')}
        </div>
        <Zmage
          src={SCENARIO_SET[0].src}
          alt={t('pg.portalTarget.imageAlt')}
          set={SCENARIO_SET}
          portalTarget={portalTarget}
          backdrop={backdrop}
          animate={siteZmageAnimate}
          className="absolute bottom-3 right-3 h-20 w-28 cursor-zoom-in rounded-md border border-background object-cover shadow-sm"
        />
      </div>
    </div>
  )
}
