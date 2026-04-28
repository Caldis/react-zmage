# README Renovation + Three-Mode Doc Sync

**Date:** 2026-04-28
**Status:** Approved (chat sign-off, 2026-04-28). Implementation in progress.
**Owner:** Caldis (via Claude assist)

## Goal

Renovate the project README with two outcomes:

1. **Bilingual presentation** — English as the default (npm/GitHub render target), Simplified Chinese as a peer file. Match GitHub OSS conventions used by Vant / ahooks / Naive UI.
2. **Lock the "three usage modes" framing as the README's heart** — currently the docs explain *how* to call each mode but not *when* to choose it. Add the missing positioning angle.

A secondary outcome: keep the home-package playground and docs pages in sync with the new framing, so README and the live demo say the same thing.

## Non-goals

- No npm release. README and home content do not enter the published tarball
  (`packages/core/files: ["dist/"]`).
- No prop / behavior changes to the published `react-zmage` library.
- No translation of de / es / fr / ja / ko strings — those get EN-fallback
  placeholders with `// TODO: translate` markers; native translation is a
  later PR.

## Scope

### File-level deliverables

| File | Action | Notes |
|---|---|---|
| `README.md` | rewrite | English default; mirrors AGENTS.md + llms.txt tone |
| `README.zh-CN.md` | create | 1:1 structural mirror; keep current Chinese README's technical voice |
| `packages/home/src/i18n/en.ts` | extend | new keys `modes.*.when`, `docs.section.modes.*Body`; refresh `modes.*.desc` |
| `packages/home/src/i18n/zh-CN.ts` | extend | parallel CN copy |
| `packages/home/src/i18n/{de,es,fr,ja,ko}.ts` | extend | EN-fallback placeholders + `// TODO: translate` |
| `packages/home/src/docs/sections/ThreeModes.tsx` | edit | render `Body` paragraph above each code block |
| `packages/home/src/routes/Playground.tsx` | edit | add subtitle line below tab pills using `modes.{active}.when` |
| `.gitignore` | edited (already done) | added `tmp/` and `/*.png` |
| `CLAUDE.md` | created (already done) | playwright MCP screenshot rule |

### Three-mode positioning copy (canonical)

These strings drive both READMEs and the home i18n:

**Component**
- *When*: Default. You control the JSX.
- EN: "Replace any `<img>` with `<Zmage>`. The default; reach for this first."
- CN: "把 `<img>` 直接换成 `<Zmage>` 即可。最常见，多数页面用这个。"

**Imperative**
- *When*: No cover image, no JSX node, callable from anywhere.
- EN: "Open the viewer from anywhere — event handlers, async callbacks, third-party widgets. No cover image required, nothing leaks into your component tree."
- CN: "在任意位置（事件处理器、异步回调、第三方组件）弹出查看器。不需要封面图，也不会向组件树里塞东西。"

**Wrapper**
- *When*: HTML you don't render yourself.
- EN: "When you don't control the rendered HTML — markdown, CMS rich text, `dangerouslySetInnerHTML` — wrap the subtree and every `<img>` inside automatically gains the viewer."
- CN: "当你控制不了渲染出的 HTML 时使用（markdown 输出、CMS 富文本、`dangerouslySetInnerHTML`）。包住子树，里面所有 `<img>` 自动接上查看器。"

### README structure (both EN and CN, 1:1 mirror)

```
[language switcher row]
[centered logo + title + tagline]
[badge row: npm version / downloads / bundle size / React 16.8-19 / MIT]
[3-bullet feature highlights]
[quick links: Demo · Playground · API · AGENTS.md]

## Install
## Three ways to use it          ← canonical positioning section
## Usage examples
   ### Component
   ### Imperative
   ### Wrapper
   ### TypeScript                 (collapsed via <details>)
   ### SSR / RSC                  (collapsed via <details>)
## API reference                  (existing tables, lightly trimmed)
## React compatibility
## Contributing
## License
```

### Removed / merged from current README

- "Quick Contract" table → folded into Three Ways section.
- "React 版本兼容" long block → 1 row + 1 footnote.
- Repeated prop examples → most live in home Playground; README keeps 1-2 representative ones.
- "引用" Material Icons attribution → demoted to Acknowledgements footer.

## Approach

### Implementation order

1. **i18n keys first** — the home components reference them, so add keys before
   referencing them. Sequence: `en.ts` and `zh-CN.ts` together (canonical
   pair), then the 5 fallback-placeholder files.
2. **home component edits** — `ThreeModes.tsx` and `Playground.tsx` consume
   the new keys.
3. **README.md (EN)** — full rewrite, sourced from `AGENTS.md` and `llms.txt`
   (both already in idiomatic English).
4. **README.zh-CN.md** — mirror EN structure, translate.
5. **Verify** — `pnpm build` (catches i18n type errors), `pnpm test` (sanity).
   Skip the heavy `pnpm -w run check` since this PR doesn't touch the
   published library surface.

### Why i18n placeholders for de/es/fr/ja/ko

The home schema has 7 languages. Adding new keys only to en+zh-CN would leave
fallback misses for users on the other locales. Adding EN copy + `// TODO`
keeps the type schema complete and consistent (per `sync-public-docs` skill's
"first uniformity, then translation" pattern), at the cost of those locales
showing English text temporarily — strictly better than missing strings.

## Risk + verification

- **i18n type drift**: TypeScript may catch mismatched key sets between
  language files. `pnpm build` will surface this.
- **Playground rendering regression**: the new subtitle line below tab pills
  shouldn't shift layout meaningfully, but worth eyeballing in dev (manual
  step, not part of automated check).
- **README link rot**: the language switcher links must resolve. Validated by
  presence of both `README.md` and `README.zh-CN.md` in repo root.
- **No release impact**: README and home are excluded from the npm tarball
  (`files` field in `packages/core/package.json`), so this work cannot
  destabilize published consumers.

## Out of scope (parked for future PRs)

- Hero animated GIF / screenshot — defer until asset is recorded.
- Native translations for de / es / fr / ja / ko.
- Wider home polish (typography, layout, etc.).
- Comparison table vs other image-zoom libraries.
