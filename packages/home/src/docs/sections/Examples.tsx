import Zmage from 'react-zmage'
import { Heading } from '@/docs/Heading'
import { CodeBlock } from '@/components/CodeBlock'
import { useT } from '@/i18n/useT'
import { useThemedBackdrop } from '@/lib/themedBackdrop'

const SINGLE_IMAGE_CODE = `<Zmage
  src="/imgSet/childsDream/1.jpg"
  alt="童夢 · ONE"
/>`

const GALLERY_CODE = `<Zmage
  src="/imgSet/childsDream/3.jpg"
  set={[
    { src: '/imgSet/childsDream/3.jpg', alt: '童夢 · THREE' },
    { src: '/imgSet/childsDream/4.jpg', alt: '童夢 · FOUR' },
    { src: '/imgSet/childsDream/5.jpg', alt: '童夢 · FIVE' },
  ]}
/>`

const MOBILE_GESTURE_CODE = `<Zmage
  src="/imgSet/childsDream/6.jpg"
  preset="mobile"
  gesture={{
    swipe: true,
    dragExit: true,
    pinchZoom: { resetBelowFit: true },
    doubleTapZoom: { scale: 2.5 },
  }}
/>`

const CUSTOM_CONTROLLER_CODE = `<Zmage
  src="/imgSet/childsDream/7.jpg"
  set={[
    { src: '/imgSet/childsDream/7.jpg', alt: '童夢 · SEVEN' },
    { src: '/imgSet/childsDream/8.jpg', alt: '童夢 · EIGHT' },
  ]}
  controller={{
    placement: 'bottom-center',
    render: ({ state, actions }) => {
      if (!state.show || state.zoom) return null

      return (
        <div className="my-zmage-controls" data-placement={state.placement}>
          <button type="button" disabled={!state.canPrev} onClick={actions.prev}>Prev</button>
          <span>{state.page + 1} / {state.total}</span>
          <button type="button" disabled={!state.canNext} onClick={actions.next}>Next</button>
          <button type="button" disabled={!state.canZoom} onClick={actions.zoom}>Zoom</button>
          <button type="button" onClick={actions.close}>Close</button>
        </div>
      )
    },
  }}
/>`

const COVER_GEOMETRY_CODE = `<Zmage
  src="/imgSet/childsDream/9.jpg"
  alt="童夢 · NINE"
  className="h-64 w-full rounded-2xl object-cover"
  style={{ objectPosition: '35% 50%' }}
  animate={{ cover: { objectFit: true, clip: true, radius: true } }}
/>`

export function Examples () {
  const { t } = useT()
  const backdrop = useThemedBackdrop()
  return (
    <section className="mt-12 space-y-4">
      <Heading id="examples">{t('docs.section.examples.title')}</Heading>

      <h3 className="mt-6 text-lg font-semibold">{t('docs.section.examples.singleTitle')}</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <Zmage src="/imgSet/childsDream/1.jpg" alt="童夢 · ONE" backdrop={backdrop} className="w-full rounded-md" />
        <CodeBlock code={SINGLE_IMAGE_CODE} language={'tsx' as any} />
      </div>

      <h3 className="mt-6 text-lg font-semibold">{t('docs.section.examples.galleryTitle')}</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <Zmage
          src="/imgSet/childsDream/3.jpg"
          alt="童夢 · THREE"
          backdrop={backdrop}
          className="w-full rounded-md"
          set={[
            { src: '/imgSet/childsDream/3.jpg', alt: '童夢 · THREE' },
            { src: '/imgSet/childsDream/4.jpg', alt: '童夢 · FOUR' },
            { src: '/imgSet/childsDream/5.jpg', alt: '童夢 · FIVE' },
          ]}
        />
        <CodeBlock code={GALLERY_CODE} language={'tsx' as any} />
      </div>

      <h3 className="mt-6 text-lg font-semibold">{t('docs.section.examples.mobileTitle')}</h3>
      <p className="text-sm text-muted-foreground">{t('docs.section.examples.mobileBody')}</p>
      <div className="grid gap-4 md:grid-cols-2">
        <Zmage
          src="/imgSet/childsDream/6.jpg"
          alt="童夢 · SIX"
          backdrop={backdrop}
          preset="mobile"
          className="h-64 w-full rounded-md object-cover"
          gesture={{
            swipe: true,
            dragExit: true,
            pinchZoom: { resetBelowFit: true },
            doubleTapZoom: { scale: 2.5 },
          }}
        />
        <CodeBlock code={MOBILE_GESTURE_CODE} language={'tsx' as any} />
      </div>

      <h3 className="mt-6 text-lg font-semibold">{t('docs.section.examples.controllerTitle')}</h3>
      <p className="text-sm text-muted-foreground">{t('docs.section.examples.controllerBody')}</p>
      <div className="grid gap-4 md:grid-cols-2">
        <Zmage
          src="/imgSet/childsDream/7.jpg"
          alt="童夢 · SEVEN"
          backdrop={backdrop}
          className="h-64 w-full rounded-md object-cover"
          set={[
            { src: '/imgSet/childsDream/7.jpg', alt: '童夢 · SEVEN' },
            { src: '/imgSet/childsDream/8.jpg', alt: '童夢 · EIGHT' },
          ]}
          controller={{
            placement: 'bottom-center',
            render: ({ state, actions }) => {
              if (!state.show || state.zoom) return null

              return (
                <div
                  className="pointer-events-auto flex items-center gap-2 rounded-md border border-white/15 bg-black/70 px-3 py-2 text-xs text-white shadow-lg"
                  data-placement={state.placement}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    bottom: '1rem',
                    transform: 'translateX(-50%)',
                    zIndex: 1000,
                  }}
                >
                  <button type="button" disabled={!state.canPrev} onClick={actions.prev} className="disabled:opacity-40">Prev</button>
                  <span className="font-mono">{state.page + 1} / {state.total}</span>
                  <button type="button" disabled={!state.canNext} onClick={actions.next} className="disabled:opacity-40">Next</button>
                  <button type="button" disabled={!state.canZoom} onClick={actions.zoom} className="disabled:opacity-40">Zoom</button>
                  <button type="button" onClick={actions.close}>Close</button>
                </div>
              )
            },
          }}
        />
        <CodeBlock code={CUSTOM_CONTROLLER_CODE} language={'tsx' as any} />
      </div>

      <h3 className="mt-6 text-lg font-semibold">{t('docs.section.examples.coverTitle')}</h3>
      <p className="text-sm text-muted-foreground">{t('docs.section.examples.coverBody')}</p>
      <div className="grid gap-4 md:grid-cols-2">
        <Zmage
          src="/imgSet/childsDream/9.jpg"
          alt="童夢 · NINE"
          backdrop={backdrop}
          className="h-64 w-full rounded-2xl object-cover"
          style={{ objectPosition: '35% 50%' }}
          animate={{ cover: { objectFit: true, clip: true, radius: true } }}
        />
        <CodeBlock code={COVER_GEOMETRY_CODE} language={'tsx' as any} />
      </div>
    </section>
  )
}
