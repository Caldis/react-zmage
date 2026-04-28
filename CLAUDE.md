# CLAUDE.md — react-zmage

Project-scoped instructions for Claude Code (and any other agent that reads this file).

## Browser screenshots — playwright MCP

When invoking any playwright MCP screenshot tool
(`mcp__plugin_playwright_*__browser_take_screenshot`, or any descendant), **the
output path must live under `tmp/screenshot/`**. Never write to:

- the repo root (pollutes `git status` and risks accidental commits)
- `docs/` (those are committed assets — logo, demo images)
- any tracked directory

Concrete rules:

1. Always pass an explicit `filename` / `path` argument like
   `tmp/screenshot/<descriptive-name>.png`.
2. If `tmp/screenshot/` doesn't exist yet, create it first
   (`mkdir -p tmp/screenshot/`).
3. `tmp/` is gitignored, so screenshots never make it into commits.

Background: a previous session dropped five MCP screenshots into the repo root
(`before-click.png`, `narrow-zmage.png`, `scrolled-x.png`,
`scrolled-zmage-first.png`, `zmage-during.png`), polluting `git status`. The
gitignore now defensively blocks `/*.png`, but the primary mechanism is
agents passing the right path on each call.

> Note: Playwright's `testConfig.snapshotPathTemplate` only governs
> `@playwright/test` assertions (`toHaveScreenshot` / `toMatchSnapshot`). It
> does **not** affect the MCP plugin — MCP screenshot paths are caller-controlled.
> Hence the rule is enforced here rather than in a config file.
