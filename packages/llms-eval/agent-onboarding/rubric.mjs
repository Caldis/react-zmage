#!/usr/bin/env node
/**
 * Static rubric for evaluating subagent output under ./output/.
 * Verdict: did the subagent successfully integrate react-zmage using
 * only llms.txt as its information source?
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const outputDir = path.join(here, 'output')

const VALID_PROPS = new Set([
  'src', 'alt', 'caption', 'set', 'defaultPage',
  'preset',
  'controller', 'hotKey', 'animate', 'gesture',
  'hideOnScroll', 'hideOnDblClick', 'coverVisible', 'backdrop', 'zIndex', 'radius', 'edge', 'loop', 'loadingDelay',
  'onBrowsing', 'onZooming', 'onSwitching', 'onRotating', 'onError',
  'browsing',
  'className', 'style', 'id', 'onClick', 'onLoad', 'title', 'role',
  'children', 'ref', 'key',
  'width', 'height', 'srcSet', 'sizes', 'loading', 'decoding', 'fetchPriority',
  'crossOrigin', 'referrerPolicy', 'useMap', 'tabIndex', 'draggable',
  'data-testid',
])
const VALID_STATICS = new Set(['browsing', 'Wrapper'])
const VALID_SUBPATHS = new Set(['', '/style.css', '/ssr', '/package.json'])

const findings = []
function report(level, id, msg, detail) {
  findings.push({ level, id, msg, detail })
}

function listFiles(dir) {
  if (!fs.existsSync(dir)) return []
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...listFiles(full))
    else out.push(full)
  }
  return out
}

if (!fs.existsSync(outputDir)) {
  console.error(`✗ output/ does not exist at ${outputDir}. Did the subagent run?`)
  process.exit(2)
}

const allFiles = listFiles(outputDir)
const codeFiles = allFiles.filter((f) => /\.(tsx?|jsx?|mjs|cjs)$/.test(f))
const stripComments = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/[^\n]*/g, '$1')
const codeContent = codeFiles.map((f) => ({ file: f, src: stripComments(fs.readFileSync(f, 'utf8')) }))
const allCode = codeContent.map((c) => c.src).join('\n')

// ───────── CRITICAL ─────────
const pkgPath = path.join(outputDir, 'package.json')
if (!fs.existsSync(pkgPath)) {
  report('CRITICAL', 'no-package-json', 'output/package.json is missing')
} else {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
  const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) }
  if (!deps['react-zmage']) report('CRITICAL', 'missing-dep', 'react-zmage not listed in package.json deps')
}

const importsDefault = /import\s+\w+\s+from\s+['"]react-zmage['"]/.test(allCode)
if (!importsDefault) report('CRITICAL', 'no-default-import', 'no `import X from "react-zmage"` found')

const importsCss = /import\s+['"]react-zmage\/style\.css['"]/.test(allCode)
if (!importsCss) report('CRITICAL', 'no-css-import', '`import "react-zmage/style.css"` is missing — viewer will render unstyled')

// ───────── MODES ─────────
const usesComponent = /<Zmage[\s>]/.test(allCode) && !/<Zmage\.Wrapper/.test(allCode.replace(/<Zmage[\s>][^]*?<Zmage\.Wrapper/g, ''))
  || /<Zmage\s+[^>]*src=/.test(allCode)
const usesImperative = /Zmage\.browsing\s*\(/.test(allCode)
const usesWrapper = /<Zmage\.Wrapper[\s>]/.test(allCode)

if (!usesComponent) report('MODE', 'no-component-mode', 'Component mode (<Zmage src=...>) not demonstrated')
if (!usesImperative) report('MODE', 'no-imperative-mode', 'Imperative mode (Zmage.browsing(...)) not demonstrated')
if (!usesWrapper) report('MODE', 'no-wrapper-mode', 'Wrapper mode (<Zmage.Wrapper>) not demonstrated')

// multi-image set
const usesSet = /\bset=\{/.test(allCode) || /\bset:\s*\[/.test(allCode)
if (!usesSet) report('EXTRA', 'no-multi-image', 'multi-image gallery via `set` prop not demonstrated')

// ───────── CORRECTNESS ─────────

// SSR guard around Zmage.browsing — file-level: a guard anywhere in the file
// covers all calls in it (the docs require the guard, not its placement)
for (const { file, src } of codeContent) {
  const callMatches = [...src.matchAll(/Zmage\.browsing\s*\(/g)]
  if (callMatches.length === 0) continue
  const fileHasGuard = /typeof\s+window\s*[!=]==\s*['"]undefined['"]/.test(src)
  if (fileHasGuard) continue
  for (const m of callMatches) {
    const before = src.slice(Math.max(0, m.index - 400), m.index)
    const inEventHandler = /\bon[A-Z][a-zA-Z]+\s*=\s*\{/.test(before) || /=>\s*\{?[^}]*$/.test(before)
    if (!inEventHandler) {
      report('CORRECTNESS', 'unsafe-imperative', `Zmage.browsing() called without typeof window guard or event-handler context in ${path.relative(outputDir, file)}`)
    }
  }
}

// invalid props on <Zmage ...>
const tagPropsRe = /<Zmage(?:\.Wrapper)?\s+([^>]*?)\/?>/g
for (const { file, src } of codeContent) {
  let m
  const re = new RegExp(tagPropsRe.source, 'g')
  while ((m = re.exec(src))) {
    const propBlob = m[1]
    const propRe = /(\w[\w-]*)\s*=/g
    let pm
    while ((pm = propRe.exec(propBlob))) {
      const prop = pm[1]
      if (!VALID_PROPS.has(prop) && !prop.startsWith('data-') && !prop.startsWith('aria-')) {
        report('CORRECTNESS', 'unknown-prop', `unknown prop "${prop}" on <Zmage> in ${path.relative(outputDir, file)}`)
      }
    }
  }
}

// invalid Zmage.X static accesses
const staticRe = /\bZmage\.(\w+)/g
const seenStatics = new Set()
let sm
while ((sm = staticRe.exec(allCode))) {
  const member = sm[1]
  if (!VALID_STATICS.has(member)) {
    if (!seenStatics.has(member)) {
      seenStatics.add(member)
      report('CORRECTNESS', 'unknown-static', `unknown static Zmage.${member} — only Zmage.browsing and Zmage.Wrapper exist`)
    }
  }
}

// invalid subpath imports
const importRe = /from\s+['"]react-zmage(\/[^'"]*)?['"]/g
let im
while ((im = importRe.exec(allCode))) {
  const sub = im[1] || ''
  if (!VALID_SUBPATHS.has(sub)) {
    report('CORRECTNESS', 'unknown-subpath', `imports invalid subpath "react-zmage${sub}" — only ., /style.css, /ssr exist`)
  }
}

// ───────── SCORING ─────────
const score = {
  critical: { max: 30, value: 30 },
  modes:    { max: 30, value: 30 },
  correctness: { max: 30, value: 30 },
  extras:   { max: 10, value: 0 },
}
for (const f of findings) {
  if (f.level === 'CRITICAL') score.critical.value -= 10
  else if (f.level === 'MODE') score.modes.value -= 10
  else if (f.level === 'CORRECTNESS') score.correctness.value -= 5
}
if (usesSet) score.extras.value += 10
score.critical.value = Math.max(0, score.critical.value)
score.modes.value = Math.max(0, score.modes.value)
score.correctness.value = Math.max(0, score.correctness.value)

const total = score.critical.value + score.modes.value + score.correctness.value + score.extras.value
const verdict = total >= 90 ? 'EXCELLENT'
  : total >= 75 ? 'PASS'
  : total >= 50 ? 'MARGINAL'
  : 'FAIL'

const RED = '\x1b[31m', GREEN = '\x1b[32m', YELLOW = '\x1b[33m', CYAN = '\x1b[36m', BOLD = '\x1b[1m', RESET = '\x1b[0m'
const colorFor = (v) => v === 'EXCELLENT' || v === 'PASS' ? GREEN : v === 'MARGINAL' ? YELLOW : RED

console.log(`\n${BOLD}${CYAN}═══ react-zmage llms.txt onboarding evaluation ═══${RESET}\n`)
console.log(`Files in output/: ${allFiles.length} (${codeFiles.length} code files)`)
console.log(`Critical:    ${score.critical.value}/${score.critical.max}`)
console.log(`Modes:       ${score.modes.value}/${score.modes.max}`)
console.log(`Correctness: ${score.correctness.value}/${score.correctness.max}`)
console.log(`Extras:      ${score.extras.value}/${score.extras.max}`)
console.log(`${BOLD}Total: ${total}/100  →  ${colorFor(verdict)}${verdict}${RESET}\n`)

if (findings.length === 0) {
  console.log(`${GREEN}No findings. The subagent integrated react-zmage cleanly from llms.txt alone.${RESET}\n`)
} else {
  console.log(`${BOLD}Findings:${RESET}`)
  for (const f of findings) {
    const col = f.level === 'CRITICAL' ? RED : f.level === 'MODE' ? YELLOW : f.level === 'CORRECTNESS' ? YELLOW : CYAN
    console.log(`  ${col}[${f.level}]${RESET} ${f.id}: ${f.msg}`)
  }
  console.log()
}

const reportPath = path.join(here, 'report.json')
fs.writeFileSync(reportPath, JSON.stringify({ verdict, total, score, findings }, null, 2))
console.log(`Detailed report → ${path.relative(here, reportPath)}\n`)

process.exit(verdict === 'FAIL' ? 1 : 0)
