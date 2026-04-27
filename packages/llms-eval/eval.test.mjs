import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve, join } from 'node:path'
import { createRequire } from 'node:module'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname, '..', '..')
const corePkgDir = join(repoRoot, 'packages', 'core')
const llmsTxt = readFileSync(join(repoRoot, 'llms.txt'), 'utf8')
const corePkg = JSON.parse(readFileSync(join(corePkgDir, 'package.json'), 'utf8'))
const globalTs = readFileSync(join(corePkgDir, 'src', 'types', 'global.ts'), 'utf8')
const defaultTs = readFileSync(join(corePkgDir, 'src', 'types', 'default.ts'), 'utf8')
const indexTs = readFileSync(join(corePkgDir, 'src', 'index.ts'), 'utf8')

// --- Static tests ---

test('npm package name in llms.txt matches core package.json', () => {
  assert.equal(corePkg.name, 'react-zmage')
  assert.match(llmsTxt, /published to npm as `react-zmage`/)
})

test('default export documented as forwardRef component matches index.ts', () => {
  assert.match(llmsTxt, /forwardRef/)
  // index.ts re-exports default from ./Zmage; Zmage.tsx uses React.forwardRef
  const zmageTsx = readFileSync(join(corePkgDir, 'src', 'Zmage.tsx'), 'utf8')
  assert.match(zmageTsx, /React\.forwardRef</)
  assert.match(indexTs, /export \{ default \} from '\.\/Zmage'/)
})

test('subpath react-zmage/style.css declared in exports', () => {
  assert.ok(corePkg.exports['./style.css'], 'exports["./style.css"] missing')
  assert.match(llmsTxt, /react-zmage\/style\.css/)
})

test('subpath react-zmage/ssr declared in exports', () => {
  assert.ok(corePkg.exports['./ssr'], 'exports["./ssr"] missing')
  assert.match(llmsTxt, /react-zmage\/ssr/)
})

test('backdrop default value matches code', () => {
  // grep code: backdrop: '#FFFFFF'
  const m = defaultTs.match(/backdrop:\s*'([^']+)'/)
  assert.ok(m, 'backdrop default not found in default.ts')
  const codeDefault = m[1]
  // Find the API-table row for backdrop (markdown row starting with `|` containing "backdrop")
  const backdropLine = llmsTxt.split('\n').find(
    (line) => /^\s*\|/.test(line) && /\bbackdrop\b/i.test(line) && /#[0-9A-Fa-f]{3,8}/.test(line)
  )
  assert.ok(backdropLine, 'no API-table row in llms.txt declares backdrop default as a hex color')
  const docMatch = backdropLine.match(/#[0-9A-Fa-f]{3,8}/)
  assert.equal(docMatch[0].toUpperCase(), codeDefault.toUpperCase(),
    `llms.txt says backdrop ${docMatch[0]} but code says ${codeDefault}`)
})

test('all packages/... links in llms.txt resolve to local files', () => {
  const re = /\(https:\/\/github\.com\/Caldis\/react-zmage\/blob\/master\/(packages\/[^)]+?)\)/g
  const missing = []
  let m
  while ((m = re.exec(llmsTxt)) !== null) {
    const rel = m[1]
    const local = join(repoRoot, rel)
    if (!existsSync(local)) missing.push(rel)
  }
  assert.deepEqual(missing, [], `missing local files referenced in llms.txt: ${missing.join(', ')}`)
})

test('React peerDep range supports 16.8 through 19', () => {
  const range = corePkg.peerDependencies.react
  // Doc: "React 16.8 through 19"
  assert.match(llmsTxt, /React 16\.8 through 19/)
  assert.match(range, />=\s*16\.8/, `peer range "${range}" should allow >=16.8`)
  assert.match(range, /<\s*20/, `peer range "${range}" should cap below 20`)
})

test('Zmage.browsing return value is destructor (callee returns destroy fn)', () => {
  // Source-level signature check: callee in Zmage.callee.tsx must return a function
  const callee = readFileSync(join(corePkgDir, 'src', 'Zmage.callee.tsx'), 'utf8')
  // Find the exported callee and ensure a destructor is returned
  assert.match(callee, /return\s+(?:\(\s*\)\s*=>|destroy|destructor|function)/,
    'callee does not appear to return a destructor')
  assert.match(llmsTxt, /Returns a destructor/i)
})

test('public type symbols present in types/global.ts', () => {
  for (const sym of ['BaseType', 'Set', 'Preset', 'ControllerSet', 'HotKey', 'Animate']) {
    const re = new RegExp(`(?:export\\s+(?:interface|type)\\s+${sym}\\b)`)
    assert.match(globalTs, re, `${sym} not exported from types/global.ts`)
    assert.match(llmsTxt, new RegExp(`\\b${sym}\\b`), `${sym} not mentioned in llms.txt`)
  }
})

// --- Runtime tests (require built dist) ---

const distMjs = join(corePkgDir, 'dist', 'index.mjs')
const distSsrMjs = join(corePkgDir, 'dist', 'ssr', 'index.mjs')
const distCss = join(corePkgDir, 'dist', 'index.css')
const distAvailable = existsSync(distMjs) && existsSync(distSsrMjs) && existsSync(distCss)

test('built dist files exist for declared exports', { skip: !distAvailable && 'core/dist not built' }, () => {
  assert.ok(existsSync(distMjs), 'dist/index.mjs missing')
  assert.ok(existsSync(distSsrMjs), 'dist/ssr/index.mjs missing')
  assert.ok(existsSync(distCss), 'dist/index.css missing')
})

test('runtime: default export is a ForwardRef object with browsing + Wrapper statics',
  { skip: !distAvailable && 'core/dist not built' },
  async () => {
    // Resolve react/react-dom from core's installed deps
    const coreRequire = createRequire(join(corePkgDir, 'package.json'))
    const reactPath = coreRequire.resolve('react')
    // Make 'react' resolvable for the dynamic import of dist
    const React = (await import(pathToFileURL(reactPath).href)).default ??
                  await import(pathToFileURL(reactPath).href)
    const expectedSymbol = React.forwardRef(() => null).$$typeof

    const mod = await import(pathToFileURL(distMjs).href)
    const Zmage = mod.default
    assert.equal(typeof Zmage, 'object', 'default export should be ForwardRef object')
    assert.equal(Zmage.$$typeof, expectedSymbol,
      'default export $$typeof does not match react.forwardRef symbol')
    assert.equal(typeof Zmage.render, 'function',
      'forwardRef object should expose a .render function')
    assert.equal(typeof Zmage.browsing, 'function',
      'Zmage.browsing should be a function')
    assert.ok(Zmage.Wrapper, 'Zmage.Wrapper should exist')
  })
