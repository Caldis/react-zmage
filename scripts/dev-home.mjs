#!/usr/bin/env node
import { readdir, unlink } from 'node:fs/promises'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const coreRoot = path.join(repoRoot, 'packages/core')
const homeRoot = path.join(repoRoot, 'packages/home')
const homeConfig = path.join(homeRoot, 'vite.config.mts')
const homeRequire = createRequire(path.join(homeRoot, 'package.json'))
const viteEntry = homeRequire.resolve('vite')

let server
let shuttingDown = false

async function shutdown (exitCode = 0) {
  if (shuttingDown) return
  shuttingDown = true

  if (server) {
    await server.close().catch((error) => {
      console.error('[dev] failed to close Vite server:', error)
    })
  }

  await cleanupTsupTempConfigs()
  process.exit(exitCode)
}

async function cleanupTsupTempConfigs () {
  const entries = await readdir(coreRoot).catch(() => [])
  await Promise.all(entries
    .filter((entry) => /^tsup\.config\.bundled_[\w-]+\.mjs$/.test(entry))
    .map((entry) => unlink(path.join(coreRoot, entry)).catch(() => {})))
}

process.once('SIGINT', () => {
  void shutdown(130)
})

process.once('SIGTERM', () => {
  void shutdown(143)
})

async function main () {
  await cleanupTsupTempConfigs()

  console.log('[dev] starting home Vite server with react-zmage source alias...')
  const { createServer } = await import(pathToFileURL(viteEntry).href)
  server = await createServer({
    root: homeRoot,
    configFile: homeConfig,
  })
  await server.listen()
  server.printUrls()
  server.bindCLIShortcuts({
    print: true,
    customShortcuts: [
      {
        key: 'q',
        description: 'quit dev server',
        action: () => shutdown(0),
      },
    ],
  })
}

main().catch((error) => {
  console.error(error)
  void shutdown(1)
})
