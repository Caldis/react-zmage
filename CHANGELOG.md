# Changelog

## Unreleased

- Fixed the viewer overlay layout in mobile viewport emulation when the host page has horizontal overflow. The viewer now uses its own rendered overlay box as the single geometry reference, keeping the backdrop, image, controls, pagination, caption, and loading UI aligned even when browser viewport metrics disagree.
- Fixed Space key UX on small images (issue #129). When the image's natural size is no smaller than the viewport, pressing Space no longer enters an invisible zoom state — the zoom button greys out, Space becomes a no-op (with a brief shake on the disabled button as keyboard feedback), and ESC closes the preview directly instead of being absorbed by the phantom zoom state.
- Added `controller.backdrop` and `controller.color` to `ControllerSet` (issue #129). Decouples the toolbar capsule background and icon color from the modal `backdrop`, so dark `backdrop` values no longer hide near-black icons against a dark capsule. Both fall back to existing behavior when omitted (`backdrop` for the capsule, `currentColor` for icons), and per-button string overrides (`controller.zoom = '#ff8800'` etc.) still take precedence over `controller.color`.
- Fixed Migration docs typo: the section was titled "From v2" but no v2 ever existed; the bullets describe upgrading from the original 0.x to 1.x. Renamed the i18n key `migration.fromV2` → `migration.from` and rewrote the heading to "Upgrading from 0.x" across all 7 languages, plus the matching search-result hint.
- Translated the previously English-fallback strings in `de`/`es`/`fr`/`ja`/`ko` for `modes.*.when` and `docs.section.modes.*Body` (6 strings × 5 languages).
