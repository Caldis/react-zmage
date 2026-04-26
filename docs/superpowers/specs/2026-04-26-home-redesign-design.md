# Home Site Redesign — shadcn / Vercel-style + Live Playground + API Docs

**Date:** 2026-04-26
**Scope:** `packages/home/` (the site published to `zmage.caldis.me` via `docs/`)
**Status:** Approved (pending implementation plan)

## Goal

Rebuild the marketing site at `zmage.caldis.me` with a Vercel-style aesthetic
(shadcn/ui + Tailwind v4), and add two new capabilities the current single-page
walkthrough lacks:

1. A **live Playground** where visitors can tweak every `<Zmage>` prop in real
   time and see both the rendered viewer and the generated code.
2. A proper **API Docs** route, sourced from the same prop schema as the
   playground so the two cannot drift.

The library itself (`packages/core`) is **out of scope**. Sandboxes
(`packages/sandbox-r1{7,8,9}`, `packages/sandbox-nextjs`) and demo apps
(`apps/demo-ssr`, `apps/demo-nextjs`) are also out of scope.

## Non-Goals

- No SSR / SSG. The site stays a Vite SPA.
- No mdx loader. Docs narrative is plain TSX.
- No external search (Algolia etc.). Search is client-side fuzzy over headings + prop names.
- No user accounts or persisted playground configs beyond URL hash sharing.
- No multi-React-version dev switch in the new home (`dev:r17` / `dev:r18` / `dev:r19` are removed). React-version compatibility verification continues to live in the sandbox packages and `pnpm -w run check`.
- No mobile playground polish beyond "works and is usable". The playground is desktop-first.

## Routes

| Route | Purpose |
|---|---|
| `/` | Landing — hero, live demo strip, feature grid, three-modes showcase, footer |
| `/playground` | Live prop debugging. Three tabs: **Component**, **Imperative**, **Wrapper** |
| `/docs` | API reference. Three-column docs layout with sidebar + content + ToC |

Routing uses `react-router-dom` `BrowserRouter`. Vite build copies
`dist/index.html` → `dist/404.html` so GitHub Pages serves the SPA shell for
unknown paths.

## Tech Stack Changes

**Added:**
- `react-router-dom@^6`
- `tailwindcss@^4` + `@tailwindcss/vite`
- `class-variance-authority`, `clsx`, `tailwind-merge`
- `lucide-react`
- `@radix-ui/react-*` (pulled in transitively by shadcn `<Tabs>`, `<Switch>`, `<Slider>`, `<Select>`, `<Tooltip>`, `<Popover>`, `<Accordion>`, `<Dialog>`)
- `prism-react-renderer` (replaces highlight.js)

**Removed:**
- `react17` / `react-dom17` / `react18` / `react-dom18` alias deps
- `less`
- highlight.js assets in `public/highlight/`
- `dev:r17` / `dev:r18` / `dev:r19` scripts

**Locked:**
- React 19 only.

## File Layout

```
packages/home/
├─ index.html              (rewrite: drop highlight.js + Ubuntu font; add font preconnect)
├─ vite.config.ts          (rewrite: tailwind plugin, copy 404.html, drop R-version alias machinery)
├─ package.json            (rewrite per Tech Stack section)
├─ tailwind.config.ts      (new, minimal — content paths + dark variant)
├─ components.json         (new, shadcn CLI config)
├─ tsconfig.json           (kept; verify path alias `@` works)
└─ src/
   ├─ main.tsx             (BrowserRouter, ThemeProvider, I18nProvider, no R-version branching)
   ├─ App.tsx              (top-level layout: TopNav + <Outlet/>; Footer rendered per-route as design dictates)
   ├─ ContextBanner.tsx    (kept, ported to Tailwind; still dev-only via import.meta.env.DEV)
   ├─ routes/
   │  ├─ Home.tsx
   │  ├─ Playground.tsx              (shell + mode tabs)
   │  ├─ playground/
   │  │  ├─ ComponentMode.tsx
   │  │  ├─ ImperativeMode.tsx
   │  │  └─ WrapperMode.tsx
   │  └─ Docs.tsx
   ├─ schema/
   │  └─ param-schema.ts             (single source: each BaseType prop -> group/control/i18n keys; default value imported from packages/core defProp)
   ├─ playground/
   │  ├─ ParamPanel.tsx
   │  ├─ Preview.tsx
   │  ├─ CodeSnippet.tsx              (renders only non-default props)
   │  ├─ EventLog.tsx
   │  └─ controls/
   │     ├─ ScalarControl.tsx        (switch / slider / number / text / color / select / segmented)
   │     ├─ ControllerControl.tsx    (toggles for ControllerSet keys)
   │     ├─ HotKeyControl.tsx        (3 toggles)
   │     ├─ AnimateControl.tsx       (browsing toggle + flip dropdown)
   │     ├─ SetControl.tsx           (repeater of {src, alt})
   │     ├─ PresetControl.tsx        (segmented desktop|mobile|none)
   │     └─ CallbackControl.tsx      (toggle "log to events")
   ├─ docs/
   │  ├─ ParamTable.tsx              (renders prop tables from schema)
   │  ├─ Heading.tsx                 (anchor-link h2/h3 with hover #)
   │  ├─ Toc.tsx                     (right rail, scroll-spy)
   │  └─ sections/
   │     ├─ Installation.tsx
   │     ├─ ThreeModes.tsx
   │     ├─ Props.tsx                (uses ParamTable per group + narrative)
   │     ├─ ControllerDetail.tsx
   │     ├─ AnimateDetail.tsx
   │     ├─ Examples.tsx
   │     ├─ TypeScript.tsx
   │     └─ Migration.tsx
   ├─ components/
   │  ├─ ui/                          (shadcn-installed primitives)
   │  ├─ TopNav.tsx
   │  ├─ Footer.tsx
   │  ├─ ThemeToggle.tsx
   │  ├─ LanguageToggle.tsx
   │  ├─ CodeBlock.tsx                (prism-react-renderer wrapper with copy button)
   │  └─ CommandK.tsx                 (client-side fuzzy search dialog)
   ├─ i18n/
   │  ├─ dict.ts                      (typed dictionary contract)
   │  ├─ zh-CN.ts
   │  ├─ en.ts
   │  └─ useT.ts                      (Provider + hook)
   ├─ lib/
   │  ├─ utils.ts                     (cn() helper)
   │  └─ theme.ts                     (theme state + system detection)
   └─ styles/
      └─ globals.css                  (tailwind directives + shadcn CSS vars for light/dark)
```

## Section: Top Nav

Sticky `position: fixed; top: 0`, height 56px, `backdrop-blur-md` with a subtle bottom border.

| Slot | Content |
|---|---|
| Left | logo svg + "react-zmage" wordmark + version pill (read from `react-zmage/package.json`) |
| Center | Nav links: `Playground` · `Docs` (`Examples` deferred — section anchor on Home is enough for now) |
| Right | LanguageToggle · ThemeToggle · GitHub external link |

Below 768px width: center links collapse into a hamburger sheet.

## Section: Home `/`

Five vertical sections, dark-first, generous whitespace:

1. **Hero** (≥80vh)
   - Pill: `v{version} · React 19 ready`
   - H1: "Zoom every `<img>`."
   - H2 (gradient): "Drop-in. Zero config."
   - Sub: 1-2 lines describing the value prop.
   - CTAs: `[Get started]` (→ `/docs#installation`), `[Open playground ↗]`, copyable `pnpm add react-zmage` chip.
   - Background: faint grid pattern + radial glow at top.
2. **Live Demo Strip** (≥80vh)
   - One real `<Zmage>` instance, full-bleed card, click to open. Caption: "This is a real `<Zmage>`. Try clicking, scrolling, hitting `Space`."
3. **Feature Grid** — 4 cards (icon + title + 1-line hint + minimal code):
   - Drop-in `<img>` — `<Zmage src="..." />`
   - Multi-image set — `<Zmage src="..." set={[...]} />`
   - Imperative API — `Zmage.browsing({ src })`
   - Auto-wrap any DOM — `<Zmage.Wrapper>{children}</Zmage.Wrapper>`
   - Card hover reveals an arrow → links to the corresponding Docs anchor.
4. **Three Modes Showcase** — 3-column comparison (Component / Imperative / Wrapper). Each column: code block + one-line use case + "Try it →" linking the matching Playground tab.
5. **Footer** — three columns (Project / Made by / Tech) + license + version line.

Image assets continue to come from `public/imgSet/childsDream/*` until the
maintainer drops in replacements; the schema's "default set" points there.

## Section: Playground `/playground`

Single shell, three tabs (`Component` | `Imperative` | `Wrapper`) above the split layout. All three tabs share the same `<ParamPanel>` driven by `param-schema.ts`; only the Preview region differs.

```
┌───── left panel (320–360px) ─────┬────── right (flex-1) ──────┐
│ Accordion groups, each with rows │  Code snippet (top)         │
│ from param-schema.ts:            │  Preview <Zmage> (middle)   │
│  Data / Preset / Interface /     │  Event log (bottom)         │
│  Controller / HotKey / Animate / │                              │
│  Lifecycle / Controlled          │                              │
└──────────────────────────────────┴──────────────────────────────┘
```

**Header row:** title + subtitle, right side `[Reset]` + `[Share 🔗]`.

**Reset:** restores schema defaults.

**Share:** serializes non-default props into URL hash
(`#?backdrop=%23000&radius=4&...`). Loading the page parses the hash and
hydrates state. Schema's `kind` decides serializer per-prop.

**Code snippet:** `prism-react-renderer`, only non-default props shown, with a
copy button. In Imperative tab, renders `Zmage.browsing({...})` instead.

**Preview:** the actual viewer, sandboxed (modal portals to body as normal).

- **Component tab:** inline `<Zmage {...props} />` rendered directly.
- **Imperative tab:** `[ Trigger viewer ▶ ]` button wired to `Zmage.browsing(currentProps)`. The destructor returned by `browsing()` is held in a ref and called on unmount / re-trigger.
- **Wrapper tab:** a small canvas containing 3-4 `<img>` tags inside `<Zmage.Wrapper {...props}>`, demonstrating how wrapper auto-attaches handlers. Caption explains the wrapper's `componentDidMount`/`componentDidUpdate` re-query behavior (per `AGENTS.md` pitfall #6).

**Event log:** scroll-following list with timestamps. Per-callback toggle
(controlled by the schema's `kind: 'callback'` rows under Lifecycle) decides
whether that callback writes to the log.

**Per-control specifics:**

| Group / prop | Control |
|---|---|
| `src`, `alt`, `txt` | text input |
| `set` | repeater: thumbnail + src + alt + remove; `[+ Add]` at bottom |
| `defaultPage` | number input |
| `preset` | segmented `desktop \| mobile \| none` |
| `backdrop` | color picker (popover with hex input + 4 presets) |
| `zIndex` | number input |
| `radius` | slider 0–32 + number |
| `edge` | slider 0–64 + number |
| `loop`, `hideOnScroll`, `coverVisible` | switch (last two badged "desktop only") |
| `controller` | Toggle grid for the 10 `ControllerSet` keys (pagination, rotate, rotateLeft, rotateRight, zoom, download, close, flip, flipLeft, flipRight). `rotate` and `flip` act as parent toggles whose state is reflected by — but does not override — their `*Left`/`*Right` children; the grid renders all 10 cells flat. |
| `hotKey` | 3 toggles |
| `animate` | flip dropdown (`fade \| crossFade \| swipe \| zoom`) + browsing toggle |
| `onBrowsing` / `onZooming` / `onSwitching` / `onRotating` | "log events" switch |
| `browsing` (controlled) | switch — only meaningful when user opts into controlled mode |

## Section: API Docs `/docs`

Three-column layout (≥1280px shows ToC; <1280px hides it; <1024px also collapses sidebar to a top dropdown).

**Sidebar groups:**

- Getting started — Quickstart, SSR
- Concepts — Modes (Component / Imperative / Wrapper)
- Props — Data, Preset, Interface, Controller, HotKey, Animate, Lifecycle, Controlled
- Recipes — Examples, TypeScript
- Reference — Migration

**Content:** prose-width (~720px). Each prop group renders narrative + a
`<ParamTable>` driven by `param-schema.ts`. Column set: Prop / Type / Default /
Description. `controller` and `animate` get an additional sub-section with
their child shapes broken out.

**Headings** carry hover `#` anchor copy.

**Examples section** embeds real `<Zmage>` instances with their source code
side-by-side (no live editor — that's what `/playground` is for).

**⌘K search:** `<Dialog>` + client-side fuzzy filter over (a) sidebar headings,
(b) prop names. No external search.

## Section: Schema as Single Source

`src/schema/param-schema.ts` exports `PARAM_SCHEMA: ParamDef[]`.

```ts
type ControlKind =
  | { kind: 'switch' }
  | { kind: 'slider'; min: number; max: number; step?: number }
  | { kind: 'number' }
  | { kind: 'text' }
  | { kind: 'color' }
  | { kind: 'select'; options: { value: string; labelKey: I18nKey }[] }
  | { kind: 'segmented'; options: { value: string; labelKey: I18nKey }[] }
  | { kind: 'object'; component: 'controller' | 'hotkey' | 'animate' | 'set' }
  | { kind: 'callback'; events: string[] }

type ParamDef = {
  name: keyof BaseType         // compile-time check vs packages/core types
  group: 'data' | 'preset' | 'interface' | 'controller' | 'hotkey' | 'animate' | 'lifecycle' | 'controlled'
  default: unknown             // imported from defProp (no copy)
  control: ControlKind
  i18n: { labelKey: string; descKey: string }
  desktopOnly?: boolean
  required?: boolean
  since?: string
}
```

**Invariants:**

- `default` values are imported from `react-zmage`'s `defProp` (or from `defPreset.desktop` / `defPreset.mobile` for preset-driven defaults). Never duplicate literal values.
- `name` is `keyof BaseType` so a rename in `packages/core/src/types/global.ts` produces a TS error here.
- Both `<ParamTable>` (Docs) and `<ParamPanel>` (Playground) iterate the same array. Adding a new prop is a one-place change.

## Section: i18n

- Languages: `zh-CN` (default for Chinese system locale), `en` (everything else).
- No URL prefix — language is client state stored in `localStorage` under `zmage.lang`. First visit resolves from `navigator.language`.
- Implementation: small custom Provider + `useT()` hook. **No i18next.**
- Type contract: `type I18nKey = keyof typeof zhCN` so missing keys in either dictionary fail compilation.
- Coverage: TopNav, Hero, CTA, Feature cards, Three-modes copy, Playground control labels and descriptions, Docs narrative, schema's `labelKey` / `descKey`.
- Code blocks (English-only by nature) are not translated.

## Section: Theme

- Two CSS-var token sets in `styles/globals.css` under `:root` and `.dark`, following shadcn's standard.
- `<html class="dark">` toggled by `ThemeProvider`. First paint resolves from `prefers-color-scheme` + `localStorage` to avoid flash.
- ThemeToggle: `Sun / Moon / Monitor` lucide icons in a Popover, three options.
- The page chrome is themed; the `<Zmage>` viewer's `backdrop` stays driven by the user's prop value (not site theme).
- Embedded examples in Docs pick `#0a0a0a` in dark, `#fafafa` in light as their default backdrop.

## Section: Build & Deploy

- `vite.config.ts` `closeBundle` hook: copy `dist/index.html` → `dist/404.html` for GitHub Pages SPA fallback.
- Drop the React-version virtual module and alias map. Replace with a plain config.
- `package.json`: drop `dev:r17/r18/r19`, keep `dev` / `build` / `preview` / `lint` (drop `test` since it's an `echo` no-op anyway).
- `build` continues to output to `../../docs` (unchanged).
- The `home` package no longer depends on the multi-version alias gymnastics; all Vite-time env-branching is removed.

## Migration / Cleanup

- Delete: `src/index.module.less`, `public/highlight/`, `public/fonts/ubuntu/`, `public/normalize.css` (Tailwind preflight covers normalization).
- Delete: `react17`, `react-dom17`, `react18`, `react-dom18` alias deps.
- Keep: `public/logo.png`, `public/favicon.ico`, `public/imgSet/childsDream/*`, `public/imgSet/.../<future drops>`.
- The `public/highlight/` removal also drops the `<script src="/highlight/...">` tags in `index.html`.

## Open Items (to resolve during implementation, not blocking)

- Exact font choice (Geist Sans vs Inter; Geist Mono vs JetBrains Mono). Default to Geist via `next/font`-equivalent self-host.
- Final 4 image picks for the Hero / Live Demo Strip / Feature cards. Maintainer is providing replacement images post-redesign; until then, `imgSet/childsDream/*` placeholders are used.
- Whether the version pill links to `CHANGELOG.md` or just shows.

## Verification

- `pnpm --filter react-zmage-home run lint` passes.
- `pnpm --filter react-zmage-home run build` produces `docs/index.html` + `docs/404.html` and the site loads in `pnpm preview`.
- Manual checks (human-only, per AGENTS.md): all three routes navigate correctly, language toggle persists, theme toggle persists with no flash, Playground "Reset" + "Share" round-trip, `<Zmage>` opens / zooms / flips on Home and Playground.
- Bundle is not larger than 2× the current home build (sanity guardrail; if it is, investigate before shipping).
