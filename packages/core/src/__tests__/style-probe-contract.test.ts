import { readFileSync } from 'fs'
import path from 'path'
import { describe, expect, test } from 'vitest'

// Locks the contract between styleProbe.ts and Background.module.less.
// styleProbe reads `--rz-stylesheet-loaded` from :root; if the LESS source
// stops declaring it, the probe would always falsely warn "CSS not loaded".
// This test fails loudly if anyone removes/renames the sentinel.
describe('stylesheet-loaded sentinel contract', () => {
  test('Background.module.less declares --rz-stylesheet-loaded: 1 on :root', () => {
    const lessPath = path.resolve(__dirname, '../components/Background/Background.module.less')
    const source = readFileSync(lessPath, 'utf8')
    expect(source).toMatch(/:global\(:root\)\s*\{[^}]*--rz-stylesheet-loaded:\s*1/)
  })

  test('styleProbe.ts reads --rz-stylesheet-loaded and expects "1"', () => {
    const probePath = path.resolve(__dirname, '../utils/styleProbe.ts')
    const source = readFileSync(probePath, 'utf8')
    expect(source).toMatch(/--rz-stylesheet-loaded/)
    expect(source).toMatch(/loaded\s*!==\s*['"]1['"]/)
  })
})
