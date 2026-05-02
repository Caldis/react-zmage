---
name: release-workflow
description: >-
  Use when the user wants to ship a new version of react-zmage to npm. Strong
  triggers — "发版" / "我要发版" / "准备发版" / "release a new version" /
  "publish to npm" / "ship 1.x.y" / "提交推送 我要发版". Also activate when user
  asks to "bump version" or "tag a release". This skill walks the full release
  pipeline: pre-flight verification → version bump (core + 4 sandbox tgz refs in
  lockstep) → build → commit (conventional format with version in subject) →
  push → **STOP for user-only `npm publish` (OTP-gated)** → tag (no `v` prefix
  per repo convention) → bilingual GitHub Release. Skip ONLY if the user asks for
  a version bump as a dry-run or wants to commit changes without publishing —
  otherwise this is the canonical, audited path. Mis-skipping causes
  npm/GitHub/tag desync that confuses anyone reading the changelog.
---

# Release workflow (react-zmage)

## Why this skill exists

A react-zmage release has to land in three places that drift independently:

| Surface | What it shows | Failure mode if missed |
|---|---|---|
| npm registry | latest tarball + version | "1.5.0 was published but npm shows 1.4.1" |
| Git tag | reproducible commit anchor | bisects skip the release; CI tooling looking for tags breaks |
| GitHub Release page | human-facing changelog (bilingual) | repo browsers see no changelog; migration guidance invisible |

The npm side requires an interactive OTP that **only the human user can supply** — which means the agent cannot drive the whole flow end-to-end. The skill exists to enforce a clean stop/resume around that human checkpoint, plus to bake in the lesser-known repo conventions (no `v` prefix on tags, bilingual notes structure, sandbox `.tgz` paths bumped in lockstep with core).

## When to invoke

**Strong triggers (just do it):**

- "发版" / "我要发版" / "准备发版" / "release" / "publish to npm" / "ship X.Y.Z"
- "bump version and push"
- "tag a release"
- "提交推送 我要发版"

**Weak triggers (consider, then judge):**

- User says "commit and push" right after material changes to `packages/core/src/**` — they may want a release but didn't say so. Ask once: "ship a release with this, or commit-only?"
- Conversation has been around polishing public API (props, defaults, docs) — release may be the implicit next step. Don't auto-trigger; surface the option.

**Skip:**

- Pure internal refactor / test additions with no public-API change — release is overkill.
- User explicitly says "don't publish, just commit" or "preview only".

## Pre-flight (Step 0 — before bumping anything)

Run these *all* and confirm they pass:

```bash
# Core unit + integration tests
pnpm --filter react-zmage test

# Public-docs contract (asserts llms.txt, README, AGENTS, types stay aligned)
pnpm --filter llms-eval run test

# i18n key parity across 7 languages — must all be equal
for lang in en de es fr ja ko zh-CN; do
  count=$(grep -cE "^[[:space:]]+'[^']+':" "packages/home/src/i18n/$lang.ts")
  echo "$lang: $count keys"
done

# Build core to verify dist artifacts produce
pnpm --filter react-zmage run build

# (Optional but strong) full sandbox check — catches dist regressions
pnpm -w run check
```

If `sync-public-docs` was triggered earlier in the conversation, or if the release includes user-facing docs / homepage / examples, also confirm:
- `pnpm --filter react-zmage-home run build` succeeded
- regenerated `docs/index.html`, `docs/404.html`, and `docs/assets/*` are included when the home bundle changed
- If `docs/llms.txt` changed, `pnpm --filter llms-eval run test` passed and `docs/llms.txt` is included in the commit
- the built docs bundle contains the new public examples or labels (for example, grep the latest `docs/assets/*.js` for the new example headings / i18n strings)
- `docs/.nojekyll` exists if the repo contains Markdown under `docs/` that Jekyll could parse as Liquid

If anything is red, **fix it before continuing**. A release must be on green.

## The release flow (Steps 1–9)

### Step 1 — Diagnose unreleased commits and decide the version

```bash
# Find the last released tag
git tag -l --sort=-v:refname | head -3
# → 1.5.0 / 1.4.1 / 1.4.0  (no `v` prefix — repo convention)

# Enumerate everything since the last tag
git log --oneline <last-tag>..HEAD
```

Group commits into:

- **BREAKING** — explicit `!` marker (e.g. `refactor(core)!: rename X → Y`) or any change that breaks consumer code at compile time / runtime
- **feat** — additive new capability
- **fix** — bug fix observable to consumers
- **chore / refactor / test / docs** — internal-only; **don't** mention in release notes

Semver suggestion → **always confirm with the user** before bumping:

| Accumulated | Strict semver | Repo history shows |
|---|---|---|
| any BREAKING | major (X+1.0.0) | maintainer has historically chosen minor for explicit-`!` renames (e.g. 1.5.0 carried `closeOnDoubleClick → hideOnDblClick` `!`). Ask, don't assume. |
| feat only | minor (X.Y+1.0) | follow |
| fix only | patch (X.Y.Z+1) | follow |

**Always present the choice and let the user pick.** Frame it as: "Strict semver says X.Y.Z, but you've historically chosen W.V.U. Which one?"

### Step 2 — Bump versions in lockstep

Core is the source of truth. Four sandbox packages pin its `.tgz` for integration tests — they all carry the same version string and must move together.

Files to edit (verify with `grep '"react-zmage"' packages/sandbox-*/package.json` first; the list may grow):

```
packages/core/package.json                 →  "version": "<NEW>"
packages/sandbox-r17/package.json          →  "react-zmage": "file:..\\..\\.pack\\react-zmage-<NEW>.tgz"
packages/sandbox-r18/package.json          →  same
packages/sandbox-r19/package.json          →  same
packages/sandbox-nextjs/package.json       →  same
```

Other workspace packages (`home`, `llms-eval`, `apps/*`) stay on `0.0.0` — they're private/internal and not published.

### Step 3 — Build core to verify dist

```bash
pnpm --filter react-zmage run build
```

Must show `Build success` for both ESM and CJS, plus the `ssr/` subentry. If tsup fails, do not proceed — the dist is what npm ships.

### Step 4 — Commit (conventional format with version in subject)

Repo style (see `git log --format=%s -10`): the commit that ships *also* bumps the version. Subject line names the headline change and ends with the version in parens.

```
<type>(<scope>): <headline> (<X.Y.Z>)

<body — 3–5 paragraphs covering what shipped, why, and any gotchas>

<optional code example or migration note>

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
```

Examples from repo history:

- `fix(core): isolate ESC/hotkeys from outer modal listeners (1.4.1)`
- `feat(core): hotKey rotate / download + custom-descriptor surface (1.5.0)`

Stage files **explicitly** (no `git add -A`) — see Anti-patterns. Use a HEREDOC to preserve message formatting:

```bash
git commit -m "$(cat <<'EOF'
feat(core): <headline> (<X.Y.Z>)

<body>

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

### Step 5 — Push to master

```bash
git push origin master
```

Capture the resulting commit SHA — later steps need it.

### Step 5.5 — GitHub Actions and Pages gate

After pushing, inspect the workflows for the pushed commit before asking the user to publish to npm:

```bash
gh run list --commit <commit-sha> --limit 10 --json databaseId,workflowName,status,conclusion,url
gh run watch <run-id> --exit-status
```

At minimum, CI must pass. If Pages is triggered, it must also pass unless the release explicitly does not touch public docs or site assets. For any failed run:

```bash
gh run view <run-id> --json jobs,conclusion,status,url
gh run view <run-id> --log-failed
```

Fix the logged root cause locally, run the closest matching verification command, commit the fix, push again, and re-check the new workflow runs. Do **not** continue to npm publish while the release commit or a follow-up fix commit is still red.

If homepage examples / docs changed, verify the deployed site after Pages succeeds. Fetch `https://zmage.caldis.me/` with a no-cache header, extract the current `assets/*.js`, and confirm it contains the expected new example labels in English and Chinese. If Pages is green but the old asset is still served, report the cache delay and retry before calling the website updated.

### Step 6 — STOP. Tell the user to run npm publish themselves.

**This is the hard stop. Do not run `npm publish` from the agent.**

The npm account requires an OTP (one-time password) at publish time. Only the user can supply it interactively. Suggest the exact command and wait:

> Pushed `<sha>` to master. Run `cd packages/core && npm publish` yourself (needs your OTP). Tell me when it's done and I'll handle tag + GitHub Release.

If the user offers to "let you publish" — politely decline and ask them to run it. The OTP friction is intentional security; bypassing it is not in scope.

### Step 7 — After user confirms publish: tag and push it

Repo convention: **bare-version tags, no `v` prefix.** Verify with `git tag -l | head` — historical tags are `1.5.0`, `1.4.1`, `0.8.5`, etc. Mismatching this breaks tools that assume monotonic naming.

```bash
git tag <X.Y.Z> <commit-sha>
git push origin <X.Y.Z>
```

(Lightweight tag is fine — repo history uses both. `--follow-tags` only pushes annotated tags, so explicit `git push origin <tag>` is the safe form.)

### Step 8 — Create the bilingual GitHub Release

Notes structure (see `gh release view 1.4.1 --json body --jq .body` for the canonical template):

1. **中文 sections first** — headings: `## 新功能` / `## 视觉更新` / `## 优化` / `## 修复` / `## 破坏变更` (use only the ones that apply)
2. **`---` separator** on its own line
3. **English sections** — same headings translated: `## New Features` / `## Visual Update` / `## Improvements` / `## Fix` / `## Breaking`

Each bullet is **user-facing**: visual changes, API changes, fixes that affect consumers. Skip pure internal refactors, CSS variable renames, test additions.

For features that introduce new public API, include a small code example inside the bullet (see the 1.5.0 release for the hotKey custom-descriptor block as a reference shape).

```bash
gh release create <X.Y.Z> --title "<X.Y.Z>" --notes "$(cat <<'EOF'
## 新功能

- **<headline>**: <user-facing description>.

  ```tsx
  // optional code example for new APIs
  ```

## 修复

- **<bug fixed>**: <symptom>.

---

## New Features

- **<headline>**: <user-facing description>.

  ```tsx
  // same example
  ```

## Fix

- **<bug fixed>**: <symptom>.
EOF
)"
```

The command prints the release URL on success — relay it to the user.

### Step 9 — Final verification

Confirm three surfaces show the same version:

```bash
# 1. npm — open https://www.npmjs.com/package/react-zmage and check the latest version
# (or: npm view react-zmage version)

# 2. Git tag pushed to remote
git ls-remote --tags origin | grep <X.Y.Z>

# 3. GitHub Release listed
gh release view <X.Y.Z> --json url --jq .url
```

If any one is missing, fix it before reporting "done":

- npm missing → user re-runs `npm publish`
- tag missing → re-run `git push origin <X.Y.Z>`
- release missing → re-run `gh release create`

## Anti-patterns

- **Do not run `npm publish` from the agent.** OTP is user-only; running blind triggers an interactive prompt that hangs the agent shell. Always stop at Step 6.
- **Do not use `git tag v<X.Y.Z>`** — repo convention is bare-version. Mismatch breaks tools that scan for monotonic tag names.
- **Do not skip the bilingual notes** even for "small" releases. The Releases page is one of the only English-facing surfaces of this repo; mono-language entries break the rhythm of historical releases.
- **Do not bundle a release commit with unrelated work.** A release commit's diff is a contract — anyone reading the tag's diff later expects to see exactly what shipped.
- **Do not amend a release commit after pushing the tag.** The tag points to the original commit. Amending creates an orphan and confuses bisects. If the release commit needs a fix, ship it as `<X.Y.Z+1>`.
- **Do not skip Step 0's pre-flight tests.** "But the change is small" is the exact condition under which contract tests catch regressions you didn't predict.
- **Do not stage with `git add -A` or `git add .`.** A release commit's file list should be auditable in the commit message; explicit paths force you to notice unintended files (e.g. `.env.local`, an editor config, a worktree leftover).
- **Do not run `git push origin master --follow-tags` for tagging.** Lightweight tags (which the repo uses) are not pushed by `--follow-tags`. Explicit `git push origin <tag>` is the only safe form.
- **Do not amend release notes prose into the commit body.** Commit body = what the diff does, in technical terms. Release notes = user-facing impact, bilingual. Two audiences, two surfaces.

## Final checklist

Before declaring the release complete:

- [ ] Pre-flight (Step 0): tests / contract / i18n parity / build all green
- [ ] Version bumped in `packages/core/package.json` AND all 4 `packages/sandbox-*/package.json` `.tgz` paths
- [ ] If homepage docs/examples changed: home build artifacts are committed, built asset contains the new example labels, and `docs/.nojekyll` exists
- [ ] Commit subject ends with `(<X.Y.Z>)` matching the bumped version
- [ ] `git push origin master` succeeded
- [ ] GitHub Actions for the pushed commit are checked; CI is green, Pages is green when triggered, and failed logs were fixed before publish
- [ ] User confirmed `npm publish` succeeded (Step 6 hard-stop respected)
- [ ] Tag created with bare version (no `v` prefix) pointing to the release commit
- [ ] Tag pushed to origin (`git ls-remote --tags origin` shows it)
- [ ] GitHub Release created with bilingual body (中 → `---` → EN), user-facing bullets only
- [ ] Release URL reported to user

## Notes for future maintenance

If a new sandbox package is added (e.g. `sandbox-r20`), Step 2's file list grows — keep `grep '"react-zmage"' packages/sandbox-*/package.json` as the discovery command rather than hardcoding the count.

If the maintainer ever publishes a `v`-prefixed tag, this skill's "no `v` prefix" rule should be revisited — at that point the convention has changed and the skill should follow.

If `npm publish` ever moves to a token-based CI flow (e.g. via GitHub Actions on tag push), Step 6's hard-stop becomes obsolete — update the skill to reflect whichever side now drives the publish.
