import Zmage from 'react-zmage'
import { CodeSnippet } from '@/playground/CodeSnippet'
import { buildLibProps } from '@/playground/state'
import { EventLog } from '@/playground/EventLog'
import { useThemedBackdrop } from '@/lib/themedBackdrop'

type RichImage = {
  src: string
  alt?: string
  caption?: any
}

function captionText (item: RichImage, fallback: string) {
  const { caption } = item
  if (typeof caption === 'string' && caption.trim()) return caption.trim()
  if (caption && typeof caption === 'object' && typeof caption.text === 'string' && caption.text.trim()) {
    return caption.text.trim()
  }
  return item.alt || fallback
}

function getGalleryItems (values: Record<string, any>): RichImage[] {
  if (Array.isArray(values.set) && values.set.length > 0) return values.set
  return values.src ? [{ src: values.src, alt: values.alt, caption: values.caption }] : []
}

function itemAt (items: RichImage[], index: number): RichImage {
  return items[index % items.length]
}

function RichTextComposition ({ items }: { items: RichImage[] }) {
  if (items.length === 0) {
    return (
      <article className="mx-auto max-w-2xl rounded-md border border-dashed border-border p-8 text-sm text-muted-foreground">
        The wrapped subtree has no image nodes yet.
      </article>
    )
  }

  const hero = itemAt(items, 0)
  const inline = itemAt(items, 1)
  const sideA = itemAt(items, 2)
  const sideB = itemAt(items, 3)
  const sideC = itemAt(items, 4)
  const sideD = itemAt(items, 5)

  const Figure = ({
    item,
    className = '',
    imageClassName = '',
    label,
  }: {
    item: RichImage
    className?: string
    imageClassName?: string
    label: string
  }) => (
    <figure className={className}>
      <img
        src={item.src}
        alt={item.alt ?? ''}
        data-zmage-caption={captionText(item, label)}
        className={imageClassName}
      />
      <figcaption className="mt-2 text-[11px] leading-5 text-muted-foreground">
        {captionText(item, label)}
      </figcaption>
    </figure>
  )

  return (
    <article className="overflow-hidden bg-background text-foreground">
      <header className="grid gap-6 border-b border-border bg-muted/20 p-5 md:p-7 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)]">
        <div className="flex min-w-0 flex-col justify-between gap-8">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              <span className="rounded-full border border-border bg-background px-2.5 py-1">Field report</span>
              <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-emerald-700 dark:text-emerald-300">Wrapped HTML</span>
              <span className="rounded-full border border-amber-500/25 bg-amber-500/10 px-2.5 py-1 text-amber-700 dark:text-amber-300">Mixed media</span>
            </div>
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-normal md:text-4xl">
              An annotated image essay inside one Wrapper
            </h2>
            <p className="max-w-[68ch] text-sm leading-7 text-muted-foreground md:text-[15px]">
              Long-form CMS pages rarely render as a neat gallery. They mix hero images, floated figures,
              side notes, dense captions, and repeated thumbnails. This composition keeps that structure intact
              while every nested image remains part of the same viewer configuration.
            </p>
          </div>
          <dl className="grid max-w-xl grid-cols-3 gap-3 text-xs">
            <div className="rounded-md border border-border bg-background p-3">
              <dt className="text-muted-foreground">Images</dt>
              <dd className="mt-1 text-lg font-semibold">{items.length}</dd>
            </div>
            <div className="rounded-md border border-border bg-background p-3">
              <dt className="text-muted-foreground">Source</dt>
              <dd className="mt-1 text-lg font-semibold">HTML</dd>
            </div>
            <div className="rounded-md border border-border bg-background p-3">
              <dt className="text-muted-foreground">Flow</dt>
              <dd className="mt-1 text-lg font-semibold">Auto</dd>
            </div>
          </dl>
        </div>
        <Figure
          item={hero}
          label="Lead image"
          className="min-w-0"
          imageClassName="aspect-[5/4] w-full rounded-md object-cover shadow-sm"
        />
      </header>

      <section className="grid gap-7 p-5 md:p-7 lg:grid-cols-[minmax(0,1.15fr)_minmax(260px,0.85fr)]">
        <div className="min-w-0 space-y-5 text-sm leading-7 text-foreground/85">
          <p>
            The route cuts through a quiet shoreline, a workshop archive, and a narrow set of rooms where
            every surface is used for notes. Image sizes change with the material: field photos need width,
            object studies need height, and repeated details sit beside the text that refers to them.
          </p>
          <Figure
            item={inline}
            label="Inline figure"
            className="my-1 rounded-md border border-border bg-muted/25 p-2 md:float-right md:ml-5 md:w-64"
            imageClassName="aspect-[4/3] w-full rounded object-cover"
          />
          <p>
            In the middle section the reading column narrows and the captions become closer to the images.
            The floated figure interrupts the paragraph without becoming a separate gallery block, so the
            page keeps the uneven rhythm of an edited article.
          </p>
          <blockquote className="border-y border-border py-4 text-lg font-medium leading-8 text-foreground">
            The strongest sequence is not the cleanest grid. It is the one where each image keeps its place
            in the argument.
          </blockquote>
          <p>
            The final pass brings small crops back into view. Repeated images are intentional: they let the
            same material behave as a lead image, a supporting figure, and a tight detail without changing
            the source data.
          </p>
        </div>

        <aside className="grid content-start gap-4">
          <div className="grid grid-cols-2 gap-3">
            <Figure
              item={sideA}
              label="Side image A"
              className="rounded-md border border-border bg-background p-2"
              imageClassName="aspect-[3/4] w-full rounded object-cover"
            />
            <Figure
              item={sideB}
              label="Side image B"
              className="rounded-md border border-border bg-background p-2"
              imageClassName="aspect-square w-full rounded object-cover"
            />
          </div>
          <div className="rounded-md border border-border bg-muted/25 p-4 text-xs leading-6 text-muted-foreground">
            Field notes, measured captions, and repeated crops share the same reading surface. The layout is
            deliberately uneven so dense editorial pages stay close to their real shape.
          </div>
          <Figure
            item={sideC}
            label="Wide supporting image"
            className="rounded-md border border-border bg-background p-2"
            imageClassName="aspect-[16/9] w-full rounded object-cover"
          />
        </aside>
      </section>

      <section className="grid gap-3 border-t border-border bg-muted/20 p-5 md:grid-cols-6 md:p-7">
        <Figure
          item={sideD}
          label="Panorama strip"
          className="md:col-span-3"
          imageClassName="aspect-[16/7] w-full rounded-md object-cover"
        />
        <Figure
          item={hero}
          label="Repeated lead detail"
          className="md:col-span-2"
          imageClassName="aspect-[4/3] w-full rounded-md object-cover"
        />
        <Figure
          item={inline}
          label="Tall crop"
          className="md:col-span-1"
          imageClassName="aspect-[3/5] w-full rounded-md object-cover"
        />
      </section>
    </article>
  )
}

export default function WrapperMode ({
  values,
  touched,
  hideDefaults,
  onHideDefaultsChange,
}: {
  values: Record<string, any>
  touched: ReadonlySet<string>
  hideDefaults: boolean
  onHideDefaultsChange: (v: boolean) => void
}) {
  const themedBackdrop = useThemedBackdrop()
  // livedemo 用不带 touched 的 buildLibProps; wrapper 再剥单图字段 (它从 <img> 自取 src/alt)
  const runtimeProps = buildLibProps(values)
  const { src: _src, alt: _alt, caption: _caption, browsing: _browsing, ...stripped } = runtimeProps
  const wrapperProps: Record<string, any> = { backdrop: themedBackdrop, ...stripped }
  const galleryItems = getGalleryItems(values)
  const Wrapper = (Zmage as any).Wrapper
  return (
    <div className="space-y-6">
      <CodeSnippet
        values={values}
        touched={touched}
        hideDefaults={hideDefaults}
        onHideDefaultsChange={onHideDefaultsChange}
        mode="wrapper"
      />
      <div className="overflow-hidden rounded-lg border border-border bg-background">
        <Wrapper {...wrapperProps}>
          <RichTextComposition items={galleryItems} />
        </Wrapper>
      </div>
      <EventLog />
    </div>
  )
}
