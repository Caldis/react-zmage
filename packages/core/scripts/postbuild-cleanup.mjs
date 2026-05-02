#!/usr/bin/env node
// Keep the published package lean after tsup + tsc emit. Runs at the tail of
// `pnpm --filter react-zmage build`.

import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const dist = resolve(here, '..', 'dist')
const ssr = resolve(dist, 'ssr')

// Preserve the public `react-zmage/ssr` subpath without shipping a second copy
// of the root bundle. The file names remain stable for consumers that resolve
// the export target directly.
mkdirSync(ssr, { recursive: true })
writeFileSync(resolve(ssr, 'index.mjs'), "export { default } from '../index.mjs'\n")
writeFileSync(resolve(ssr, 'index.cjs'), "module.exports = require('../index.cjs')\n")

const dead = [
  'index.cjs.map',
  'index.mjs.map',
  'index.css.map',
  'ssr/index.css',
  'ssr/index.css.map',
  'ssr/index.cjs.map',
  'ssr/index.mjs.map',
]

for (const rel of dead) {
  rmSync(resolve(dist, rel), { force: true })
}
