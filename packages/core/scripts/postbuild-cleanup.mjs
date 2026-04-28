#!/usr/bin/env node
// Remove dead-weight artifacts that tsup + tsc emit but the published package
// doesn't reference. Runs at the tail of `pnpm --filter react-zmage build`.

import { rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const dist = resolve(here, '..', 'dist')

// Both build configs (browser + SSR) bundle the same Less chain, so tsup
// extracts a byte-identical CSS file for each. Only `dist/index.css` is wired
// through `package.json` `exports["./style.css"]`; the SSR copy has no outlet
// and is dead weight. Setting tsup's own `css: false` doesn't suppress this —
// the lessModulePlugin emits CSS regardless, so we drop the duplicates here.
const dead = [
  'ssr/index.css',
  'ssr/index.css.map',
]

for (const rel of dead) {
  rmSync(resolve(dist, rel), { force: true })
}
