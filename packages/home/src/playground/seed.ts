/**
 * Initial values populated into the playground panel on first render / Reset.
 *
 * The lib's actual defaults (defProp.src='', defProp.set=[]) would render an
 * empty/broken preview and confuse first-time users — so the panel seeds with
 * a working demo. CodeSnippet and shareState both treat values matching this
 * seed as "the default" so the code snippet and shared URL stay clean until
 * the user actually changes something.
 *
 * Single source of truth — touched by Playground.tsx, CodeSnippet.tsx, shareState.ts.
 */
export const PLAYGROUND_SEED = {
  src: '/imgSet/childsDream/1.jpg',
  alt: '童夢 · ONE',
  set: [
    { src: '/imgSet/childsDream/1.jpg', alt: '童夢 · ONE' },
    { src: '/imgSet/childsDream/2.jpg', alt: '童夢 · TWO' },
  ],
}
