#!/usr/bin/env node
/**
 * Intercept `npm publish` run at the workspace root.
 *
 * Why: the root is a pnpm workspace meta-package (`private: true`); only
 *      `packages/core` is the publishable artifact (`react-zmage`). A bare
 *      `npm publish` at root would otherwise either silently succeed at
 *      doing nothing useful, or confuse the user with a cryptic
 *      "Cannot publish over previously published version" / "private package"
 *      error from npm.
 *
 * What this script does: prints a clear redirect message pointing at the
 *      canonical publish path, then exits non-zero so npm aborts before
 *      doing anything destructive. We deliberately do NOT auto-forward to
 *      `packages/core && npm publish` because OTP / login state is touchy
 *      and shell-forking inside prepublishOnly is fragile across pnpm /
 *      npm / yarn — better to fail loud and let the human re-run the
 *      correct command in the correct cwd.
 *
 * Hook: wired into root package.json `prepublishOnly`. npm runs that hook
 *       on `npm publish` (and only on publish — `npm install` does not
 *       trigger it), so this never fires during normal install.
 */

const RED = '\x1b[31m'
const YELLOW = '\x1b[33m'
const CYAN = '\x1b[36m'
const BOLD = '\x1b[1m'
const RESET = '\x1b[0m'

console.error(`
${RED}${BOLD}✗ npm publish was invoked at the workspace root.${RESET}

${YELLOW}This is the pnpm workspace meta-package (private: true).${RESET}
The publishable artifact lives at ${BOLD}packages/core${RESET} (npm name: ${BOLD}react-zmage${RESET}).

${CYAN}Use one of these instead:${RESET}

  ${BOLD}pnpm publish:core${RESET}                    # recommended (root script alias)
  ${BOLD}cd packages/core && npm publish${RESET}     # equivalent

${YELLOW}Aborting root publish to prevent confusion.${RESET}
`)

process.exit(1)
