#!/usr/bin/env node
/**
 * Hooked into packages/core `postpublish`. Runs *after* a successful publish
 * to remind the maintainer to consider whether this release's changes affect
 * `llms.txt` (the LLM-facing public API summary). It does NOT run the eval —
 * the maintainer judges whether re-running is warranted.
 *
 * llms.txt single source of truth: repo-root `llms.txt`. `docs/llms.txt` is
 * auto-synced by the home build's vite plugin.
 */

const GREEN = '\x1b[32m'
const YELLOW = '\x1b[33m'
const CYAN = '\x1b[36m'
const DIM = '\x1b[2m'
const BOLD = '\x1b[1m'
const RESET = '\x1b[0m'

console.error(`
${GREEN}${BOLD}✓ react-zmage published.${RESET}

${CYAN}${BOLD}Reminder — did this release touch the public API surface?${RESET}
  Public-API changes (props, defaults, exports, subpaths, three-mode contracts,
  TS types in ${BOLD}packages/core/src/types/${RESET}) probably need an update to ${BOLD}llms.txt${RESET}
  at the repo root, then a re-run of the onboarding eval.

${CYAN}If yes, run:${RESET}
  ${BOLD}pnpm --filter llms-eval run test${RESET}                         ${DIM}# static contract checks${RESET}
  ${BOLD}node packages/llms-eval/agent-onboarding/rubric.mjs${RESET}      ${DIM}# rerun behavioral eval after dispatching a fresh subagent${RESET}

${YELLOW}Note: edit only the repo-root ${BOLD}llms.txt${RESET}${YELLOW} — ${BOLD}docs/llms.txt${RESET}${YELLOW} is auto-synced by the home build's vite plugin.${RESET}
`)
