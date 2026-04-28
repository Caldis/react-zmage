#!/usr/bin/env node
// Copy root README.md → packages/core/README.md before npm publish.
// Reason: monorepo subpackage publish picks the README in its OWN directory;
// without this script, npm shows the stale 0.x-era one we used to keep there.
// Wired as `prepublishOnly` in packages/core/package.json.

import { copyFileSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(here, '..')
const src = resolve(repoRoot, 'README.md')
const dst = resolve(repoRoot, 'packages/core/README.md')

readFileSync(src) // throws if missing — better than silently shipping nothing
copyFileSync(src, dst)
console.log(`[sync-core-readme] ${src} → ${dst}`)
