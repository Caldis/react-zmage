/**
 * 只刷新 react-zmage 的 pnpm 缓存条目, 不动其他依赖
 *
 * 背景: 每次 pnpm pack 生成的 tgz 内容不变但 hash 会重算 (压缩时间戳等),
 *       pnpm install --force 全量重装会触发 Windows 上 Next.js 大量小文件复制时的 ENOENT
 *       (pnpm 内部从 store 复制时偶发竞态)
 * 做法: 删掉 .pnpm/react-zmage@file+* 条目, 让下一次 pnpm install 只重新解压 tgz
 */
import { rmSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const pnpmDir = join(root, 'node_modules', '.pnpm')

if (!existsSync(pnpmDir)) {
  console.log('[refresh-sandbox-tgz] no .pnpm dir; skip')
  process.exit(0)
}

const removed = []
for (const entry of readdirSync(pnpmDir)) {
  if (entry.startsWith('react-zmage@file+')) {
    const target = join(pnpmDir, entry)
    rmSync(target, { recursive: true, force: true })
    removed.push(entry)
  }
}

console.log(`[refresh-sandbox-tgz] removed ${removed.length} entr${removed.length === 1 ? 'y' : 'ies'}:`)
removed.forEach(e => console.log('  -', e))
