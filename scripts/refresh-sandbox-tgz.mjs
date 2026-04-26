/**
 * 同步 sandbox 的 react-zmage tgz 引用 + 刷新 pnpm 缓存
 *
 * 两件事:
 *
 * 1) 读 packages/core/package.json 的 version, 读 .pack/ 里有的 tgz, 把
 *    packages/sandbox-*\/package.json 里 `react-zmage` 的 tgz 路径改写成当前
 *    版本对应的那一个 (e.g. file:..\\..\\.pack\\react-zmage-1.1.1.tgz).
 *    历史 bug: 这一步以前没人做, 导致 lib 版本 bump 后 sandbox 还在跑旧 tgz,
 *    `pnpm -w run check` 矩阵看起来全绿但其实没 cover 新代码.
 *
 * 2) 删掉 node_modules/.pnpm 里 react-zmage@file+* 缓存, 让下一次 pnpm install
 *    只重新解压 tgz, 不触发 Windows + Next.js 上 --force 全量重装的 ENOENT 竞态.
 */
import { rmSync, readdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))

// 1) 同步 sandbox 引用
const corePkg = JSON.parse(readFileSync(join(root, 'packages', 'core', 'package.json'), 'utf8'))
const targetVersion = corePkg.version
const targetTgz = `react-zmage-${targetVersion}.tgz`
const packDir = join(root, '.pack')
const packExists = existsSync(packDir) && readdirSync(packDir).includes(targetTgz)

if (!packExists) {
  console.warn(`[refresh-sandbox-tgz] WARN: .pack/${targetTgz} not found — sandbox refs left untouched. Run \`pnpm --filter react-zmage exec pnpm pack --pack-destination ../../.pack\` first.`)
} else {
  const sandboxes = readdirSync(join(root, 'packages')).filter(d => d.startsWith('sandbox-'))
  let rewritten = 0
  for (const sb of sandboxes) {
    const pkgPath = join(root, 'packages', sb, 'package.json')
    if (!existsSync(pkgPath)) continue
    const raw = readFileSync(pkgPath, 'utf8')
    const re = /(["']react-zmage["']\s*:\s*["'])(file:[^"']+react-zmage-[^"']+\.tgz)(["'])/g
    let didChange = false
    const next = raw.replace(re, (_, p1, oldRef, p3) => {
      // 保留原前缀路径, 只替换文件名
      const newRef = oldRef.replace(/react-zmage-[^/\\]+\.tgz$/, targetTgz)
      if (newRef !== oldRef) didChange = true
      return `${p1}${newRef}${p3}`
    })
    if (didChange) {
      writeFileSync(pkgPath, next)
      rewritten += 1
      console.log(`[refresh-sandbox-tgz] ${sb}: bumped tgz ref → ${targetTgz}`)
    }
  }
  if (rewritten === 0) {
    console.log(`[refresh-sandbox-tgz] sandbox refs already at ${targetTgz}`)
  }
}

// 2) 刷新 .pnpm 缓存
const pnpmDir = join(root, 'node_modules', '.pnpm')
if (!existsSync(pnpmDir)) {
  console.log('[refresh-sandbox-tgz] no .pnpm dir; skip cache flush')
  process.exit(0)
}
const removed = []
for (const entry of readdirSync(pnpmDir)) {
  if (entry.startsWith('react-zmage@file+')) {
    rmSync(join(pnpmDir, entry), { recursive: true, force: true })
    removed.push(entry)
  }
}
console.log(`[refresh-sandbox-tgz] flushed ${removed.length} cache entr${removed.length === 1 ? 'y' : 'ies'}:`)
removed.forEach(e => console.log('  -', e))
