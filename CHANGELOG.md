# Changelog

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
