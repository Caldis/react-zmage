# Copilot instructions for react-zmage

Read `AGENTS.md` before editing. Keep changes scoped, preserve the public API contract, and verify docs/site changes with the relevant `pnpm` scripts before committing.

For package behavior, source wins over prose:

- Props and defaults: `packages/core/src/types/global.ts` and `packages/core/src/types/default.ts`
- Runtime exports: `packages/core/src/index.ts`
- Package exports: `packages/core/package.json`

Use `react-zmage` as a client-side React component package, not as a hosted API. Do not invent OAuth, API key, webhook, MCP, or server-side media-processing behavior.
