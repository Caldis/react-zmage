# Changelog

## Unreleased

- **feat (preset default)**: omitted `preset` now resolves as `'auto'`, using `(pointer: coarse) and (hover: none)` to choose mobile defaults on touch-first devices and desktop defaults elsewhere. Use `preset="desktop"` to force the old desktop bundle on touch devices.
- **feat (mobile gestures)**: mobile preset now enables horizontal drag paging, vertical drag-to-exit, pinch zoom, double-tap zoom, managed `touch-action`, and bounce-like pan resistance while zoomed.
- **feat (wheel zoom)**: desktop preset now supports smooth wheel / trackpad zoom while already zoomed, with configurable direction reversal and a `1000ms` exit guard to prevent residual wheel events after zoom-out.
- **feat (controller API)**: `controller.placement` moves the toolbar to screen edges / centers, and `controller.render({ state, actions, slots })` lets consumers replace the full controller UI while reusing built-in slots.
- **feat (cover geometry)**: `animate.cover` now matches cover `object-fit` / `object-position`, clip, and border radius during open / close so cropped covers start from the visible cover frame. Parent-wrapper clipping is intentionally not inferred.
- **docs / demo**: synchronized README, zh-CN README, AGENTS, llms.txt, home docs, playground controls, llms-eval, and home demo image geometry for the new preset, gesture, controller, and cover-animation options.

## 1.6.0

- **feat (Wrapper shared gallery)**: `<Zmage.Wrapper>` now supports an explicit `set` as a shared gallery for rich-text / CMS content. When a child `<img>` is clicked, Wrapper matches that image's `src` against `set[i].src` and opens the matching page; `defaultPage` remains the fallback when no match is found.
- **feat (Wrapper captions)**: Wrapped images can now provide viewer captions through `data-zmage-caption` or the nearest `figcaption` when no explicit `set` is supplied. This lets existing article / markdown / CMS markup feed the viewer without rewriting image nodes into `<Zmage>` components.
- **docs / demo**: The Wrapper playground now renders a dense editorial layout with hero imagery, floated figures, side figures, repeated crops, captions, and prose. The generated snippet now mirrors real Wrapper usage: image data lives in descendant `<img>` nodes, while viewer behavior stays on `<Zmage.Wrapper>`.
- **docs**: README, zh-CN README, AGENTS, llms.txt, home docs, and all seven home i18n files now describe which props apply in Wrapper mode and which props are component-only (`browsing`, top-level `src` / `alt` / `caption`).
- **release**: Published as `react-zmage@1.6.0`.

## 1.5.0

- **feat (HotKey rotate / download / custom descriptors)**: desktop preset now supports `[` / `]` for rotation, plus opt-in `Mod+S` download. Every `HotKey` entry accepts `boolean | string | string[]`, so users can rebind actions to physical `e.code` descriptors such as `KeyA`, `KeyD`, `BracketLeft`, or `Mod+S`.
- **feat (`loadingDelay`)**: added `loadingDelay` to delay the loading indicator before showing it. The default `200ms` threshold avoids flicker when cached images load quickly; `0` restores the legacy instant-show behavior.
- **breaking (`closeOnDoubleClick` renamed)**: `closeOnDoubleClick` was renamed to `hideOnDblClick`, matching the existing `hideOnScroll` auto-dismiss naming family.
- **fix (jump-page animation)**: large page jumps in multi-image sets now fade instead of swiping, avoiding visible teleport-like movement on long jumps.
- **fix (close animation target)**: close animations now track the cover element's viewport position per frame, avoiding landing offsets when the page scrolls or resizes during close.
- **fix (zoom availability after page switch)**: `canZoom` now converges on key-reuse page-change paths, so Space / zoom-button availability reflects the current image's natural dimensions.
- **fix (scale calibration)**: late-arriving image dimensions cancel an already-started calibration transition instead of stacking a second transform path.

## 1.4.1

- **fix (modal hotkey isolation)**: while `<Zmage>` is browsing, ESC / arrow keys / Space are captured and consumed before outer modal or dialog listeners can react. This prevents a host modal from closing together with the viewer. Keys still bubble when Zmage is configured not to consume them, such as `hotKey.close=false`.

## 1.4.0

- **feat (`onError`)**: viewer image load failures now call the user-provided `onError`. Cover-image failures already flowed through native `<img>` passthrough; this release exposed the viewer-side failure that had previously been absorbed internally.
- **feat (`closeOnDoubleClick`)**: added an opt-in double-click-to-close interaction for the browsing image. It defaulted to `false` to preserve existing click behavior and was later renamed to `hideOnDblClick` in 1.5.0.
- **docs**: synchronized README, AGENTS, llms.txt, seven-language i18n docs, and llms-eval static contract coverage for the new public props.

## 1.3.1

- **chore (publish hygiene)**: Dropped IIFE / global bundle from the npm tarball. React component libs aren't realistically consumed via `<script src="…">`, and that format was ~60 % of 1.3.0's tarball (`dist/index.global.js` + map). ESM and CJS entries (`dist/index.{mjs,cjs}`) plus the SSR entries remain — typical bundler-based projects see no behavior change, just a smaller install.
- **chore**: Removed `dist/ssr/index.css` — it was byte-identical to `dist/index.css` and not referenced through the `exports` field. The documented stylesheet path `react-zmage/style.css` already maps to `dist/index.css`.
- **chore**: Excluded `src/__tests__/**` from the published `.d.ts` set (`dist/__tests__/setup.d.ts` is no longer shipped).
- **chore**: `packages/core/README.md` is now generated from the repo root `README.md` at publish time (`prepublishOnly` hook → `scripts/sync-core-readme.mjs`). 1.3.0 shipped a stale 0.x-era README on the npm page; 1.3.1 carries the bilingual EN/CN README that's been in the repo root.
- **chore**: Declared `sideEffects: ["./dist/index.css"]` in `package.json` so bundlers know the JS modules themselves are pure (only the stylesheet has side effects). Doesn't change current bundle size — the existing `Zmage.browsing` / `Zmage.Wrapper` statics still attach to the default export — but tells bundlers the JS is safe to drop if unreferenced, future-proofing any later tree-shaking refactor.

Net effect on tarball: 626 KB → ~256 KB compressed (≈ 60 % smaller); 3.1 MB → ~1.1 MB uncompressed. No change to the public API — `import Zmage from 'react-zmage'` and `const Zmage = require('react-zmage')` both keep returning the component as before.

## 1.3.0

- Fixed the viewer overlay layout in mobile viewport emulation when the host page has horizontal overflow. The viewer now uses its own rendered overlay box as the single geometry reference, keeping the backdrop, image, controls, pagination, caption, and loading UI aligned even when browser viewport metrics disagree.
- Fixed Space key UX on small images (issue #129). When the image's natural size is no smaller than the viewport, pressing Space no longer enters an invisible zoom state — the zoom button greys out, Space becomes a no-op (with a brief shake on the disabled button as keyboard feedback), and ESC closes the preview directly instead of being absorbed by the phantom zoom state.
- Added `controller.backdrop` and `controller.color` to `ControllerSet` (issue #129). Decouples the toolbar capsule background and icon color from the modal `backdrop`, so dark `backdrop` values no longer hide near-black icons against a dark capsule. Both fall back to existing behavior when omitted (`backdrop` for the capsule, `currentColor` for icons), and per-button string overrides (`controller.zoom = '#ff8800'` etc.) still take precedence over `controller.color`.
- Tightened the type of `ControllerSet.pagination` from `Omit<ControllerItem, string>` to `Exclude<ControllerItem, string>`. The old form silently degraded to `{}` and accepted any value at compile time; the runtime has always rejected strings (falls through `isValidElement` and renders the default indicator). The type now matches what `README.md` and `llms.txt` already document — `boolean | ReactNode`. Code that previously passed a string for `pagination` will now fail TypeScript compilation; the runtime behavior is unchanged.
- Fixed Migration docs typo: the section was titled "From v2" but no v2 ever existed; the bullets describe upgrading from the original 0.x to 1.x. Renamed the i18n key `migration.fromV2` → `migration.from` and rewrote the heading to "Upgrading from 0.x" across all 7 languages, plus the matching search-result hint.
- Translated the previously English-fallback strings in `de`/`es`/`fr`/`ja`/`ko` for `modes.*.when` and `docs.section.modes.*Body` (6 strings × 5 languages).
