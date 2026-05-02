---
name: sync-public-docs
description: Use when modifying public API in packages/core (types/global.ts, types/default.ts, index.ts, or package.json `exports` field), adding/renaming/removing props, changing default values, before publishing a new react-zmage version, or when the user says "sync docs" / "update public docs" / "propagate this change" / "同步文档" / "更新对外文档" / "准备发版". This skill coordinates four documentation destinations that drift independently — packages/core types & defaults, packages/home docs sections + schema, docs/llms.txt, and README.md / AGENTS.md. The repo has TS-level guards on type imports, but defaults values, natural-language docs, README/AGENTS prose, llms.txt, and playground snippets have NO automatic guards — this skill IS the documented process that closes that gap. Trigger it aggressively whenever core's public surface changes; over-triggering is cheap, missed sync causes shipped doc drift.
---

# Sync public docs (react-zmage)

## Why this skill exists

The repo has four "outward-facing" documentation surfaces and only two of them are guarded automatically:

| Destination | Source of truth | Auto-guard? |
|---|---|---|
| `packages/core/src/types/` | itself | — (this IS the source) |
| `packages/home/src/schema/param-schema.ts` | imports `BaseType` from `react-zmage` (typed) **but defaults are hand-copied** | ✅ types only; ❌ default values |
| `packages/home/src/docs/sections/*.tsx` + i18n keys | hand-written prose | ❌ |
| `packages/home/src/playground/*` + `routes/playground/*` | hand-written examples | ❌ |
| `docs/llms.txt` | checked-in file served as `/llms.txt` | ✅ static contract tests, ❌ content is still hand-written |
| `packages/llms-eval/eval.test.mjs` (11-item contract) | `llms.txt` ↔ core | ✅ but **manual run only** |
| `README.md` / `AGENTS.md` | hand-written | ❌ |

When core's public API changes, drift across these surfaces is silent — TS will flag a renamed type symbol but won't flag a stale default value, an outdated prop description in `Props.tsx`, or a removed prop still mentioned in `README.md`.

The cost of drift is real: README is what npm shows; `llms.txt` is what AI agents read; `home/docs` is what the live site renders. They can each go wrong independently.

## When to invoke

Strong triggers (just do it):

- Any change to `packages/core/src/types/global.ts`, `types/default.ts`, or `index.ts`
- Any change to `packages/core/package.json` `exports` field, `peerDependencies`, or `version`
- Adding, renaming, or removing a prop on `<Zmage>`
- Changing a default value in `defProp` or `defPreset`
- Changing the static method surface of `Zmage` (e.g. adding a new `Zmage.X`)
- Changing what `react-zmage/ssr` exports
- The user says "sync docs", "propagate this", "update public docs", "同步文档", "准备发版"

Weak triggers (consider, then judge):

- Pure internal refactors that don't change public types or defaults — usually skip
- Documentation-only PRs that already touch one destination — still run steps 5–6 to verify the others didn't drift
- Tooling/build config changes — only if they alter `exports`, peerDeps, or what consumers see

## The 6-step flow

These steps are deliberately separated so each one can be paused for human review. The reason for splitting "draft" from "write" is that drafts are cheap to throw away; writes touch many files and are expensive to revert.

### Step 1 — Diagnose what changed

Read the diff. List every change to public API surface, grouped by category:

- **Type symbols added/removed/renamed** in `packages/core/src/types/global.ts`
- **Default values changed** in `packages/core/src/types/default.ts` (`defProp`, `defPreset.desktop`, `defPreset.mobile`)
- **Runtime exports changed** in `packages/core/src/index.ts` (default export, static methods, named exports)
- **`exports` field / subpaths / peerDeps** in `packages/core/package.json`

Use `git diff` against `master` (the default branch is `master`, not `main`). If the user is mid-refactor and the change is uncommitted, use the working tree.

If nothing on this list moved, **stop here**. Tell the user the change doesn't affect public surface, no sync needed.

### Step 2 — Enumerate sync destinations

For each change, identify which destinations need updating. Use this map. Each cell = "yes" unless marked `–`.

| Change category | `home/schema` (ParamDef + i18n) | `home/docs/sections` | `home/playground` | `docs/llms.txt` | `README.md` | `AGENTS.md` | `llms-eval/eval.test.mjs` |
|---|---|---|---|---|---|---|---|
| **Add prop** | ✓ ParamDef + i18n keys in all 7 `home/src/i18n/*.ts` | ✓ `Props.tsx` table row + `Examples.tsx` if non-trivial usage | ✓ `ParamPanel.tsx` + new control under `playground/controls/` if user-tunable | ✓ API table | ✓ "API > 基础/功能/界面 Props" section + 示例 | ✓ if it changes the public-API contract | ✓ add an assertion proving the prop is documented |
| **Rename prop** | ✓ ParamDef name + all i18n key referrers | ✓ all sections (`Props`, `Examples`, `Theming`, `Migration`, `FAQ`) — grep the old name | ✓ all `playground/**` and `routes/playground/**` — grep the old name | ✓ | ✓ grep the old name everywhere | ✓ | ✓ |
| **Remove prop** | ✓ delete ParamDef + i18n keys | ✓ delete from `Props.tsx`; **add entry to `Migration.tsx`** | ✓ delete control; remove from `ParamPanel.tsx` | ✓ | ✓ delete + Migration note if breaking | ✓ | ✓ delete the assertion |
| **Default value changed** | ✓ `defProp` (or `defPreset`) **hand-copy** — see comment at top of `param-schema.ts` | ✓ `Props.tsx` "默认" column; `Theming.tsx` if it's `backdrop`-class; `FAQ.tsx` if a common-pitfall default flips | ✓ initial state in `playground/seed/*` (the WYSIWYG seed reflects defaults) | ✓ API table Default column | ✓ "默认" column in API tables | – usually | ✓ if there's a default-value assertion (e.g. backdrop hex) |
| **Add static method on `Zmage`** | – | ✓ `ThreeModes.tsx` if it's a new mode; otherwise the most relevant section | ✓ if it can be exercised from playground UI | ✓ Quick start + Choosing a usage mode | ✓ Quick Contract table + 使用 section | ✓ | ✓ runtime assertion that the static exists |
| **Add subpath in `exports`** | – | ✓ `Installation.tsx` and/or `TypeScript.tsx` | – | ✓ | ✓ Quick Contract | – usually | ✓ `VALID_SUBPATHS` set |
| **peerDep range change** | – | – | – | ✓ "Supports React X through Y" line | ✓ "React 版本兼容" table + badge | – | ✓ peer-range assertion bounds |
| **Behavior/visual change (no API change)** | – | ✓ `Theming.tsx` / `FAQ.tsx` if user-visible; `Migration.tsx` if behaviorally breaking | ✓ playground hint copy if behavior was demoed there | – usually | – usually | – | – |

### Multi-language parity (hard rule, not optional)

Any prose change in `home/src/docs/sections/*.tsx` or any user-visible label in `home/src/playground/` MUST land in **all 7** `home/src/i18n/*.ts` files: `en`, `de`, `es`, `fr`, `ja`, `ko`, `zh-CN`. Divergent key sets break `useT()` lookups silently — there is no compiler error for a missing key. Untranslated entries may use the English source verbatim as a placeholder (better) or omit the value (worse, but acceptable temporarily) — but the **key itself** must exist in every file.

Verify before committing:

```bash
for lang in en de es fr ja ko zh-CN; do
  count=$(grep -cE "^[[:space:]]+'[^']+':" "packages/home/src/i18n/$lang.ts")
  echo "$lang: $count keys"
done
```

All 7 numbers must match. If they diverge, find the missing key with `diff <(grep ... en.ts) <(grep ... <other>.ts)` and add the placeholder.

### Other edge cases

- **llms-eval**: if the change adds new public API, also add a contract assertion in `packages/llms-eval/eval.test.mjs` so future drift is caught.
- **alias members on `Zmage`**: source defines both `Zmage.wrapper` / `Zmage.Wrapper` and `Zmage.browsing` / `Zmage.Browsing`. Pick one casing per document and stay consistent within that document — mixed casing in the same file confuses readers. Cross-document, the recommended convention is PascalCase for the component-shaped wrapper (`<Zmage.Wrapper>`, since JSX wants PascalCase for components) and camelCase for the imperative method (`Zmage.browsing()`).

### Step 3 — Draft the patches

Write out — in your reply, not yet on disk — the exact intended diff for each destination. This is the human review checkpoint: it's much cheaper to revise prose at this stage than to revise after files are written.

Keep drafts terse: file path + before/after snippet, not full file content. The user should be able to skim and approve in one read.

If a destination needs more than ~30 lines of prose, flag it as "needs careful writing" rather than rushing through it.

### Step 4 — Dispatch parallel write subagents

Once drafts are approved, write the changes. Prefer parallelism — most destinations are independent.

Group rules:

- **Group A (parallel-safe)**: `home/schema/param-schema.ts`, `home/docs/sections/*.tsx`, `home/src/i18n/*.ts`, `README.md`, `AGENTS.md`, `packages/llms-eval/eval.test.mjs` — these don't conflict.
- **Group B (sequential, single-writer)**: `docs/llms.txt` is one file; one writer.

Dispatch one Agent per destination in Group A in a single tool-call message; do `docs/llms.txt` separately. Each subagent's prompt should include:

- The exact draft from Step 3 for that destination
- An instruction to NOT modify any file outside its assigned destination
- A reminder that `docs/llms.txt` is the single source of truth served as `/llms.txt`

### Step 5 — Re-eval the result

Two evaluation layers, both in `packages/llms-eval/`:

**Static contract** (always run after `docs/llms.txt` changes):

```bash
pnpm --filter llms-eval run test
```

This is the 11-item check that `llms.txt`'s factual claims match core's reality. If any assertion fails, the sync is incomplete — go back to Step 3 for the affected destination.

**Behavioral eval** (run when public surface changed materially — new modes, props, subpaths, or anything an AI integrator would notice):

1. Delete `packages/llms-eval/agent-onboarding/output/` and `report.json` from the previous run.
2. Dispatch a fresh subagent with the brief at `packages/llms-eval/agent-onboarding/prompt.md`. The subagent must obey the META section's information-source constraints (only the deployed `llms.txt` URL, fall back to local `docs/llms.txt` if WebFetch fails, no other repo files, no GitHub).
3. Run `node packages/llms-eval/agent-onboarding/rubric.mjs` to score the output (target ≥ 90/100).
4. Read `packages/llms-eval/agent-onboarding/output/SELF_CRITIQUE.md` — this is the *qualitative* signal (rubric-100 doesn't mean docs are good; SELF_CRITIQUE shows what the integrator had to guess).

Skip the behavioral eval for tiny changes (e.g., a typo fix, a peerDep bump from `<20` to `<21`); the static contract suffices.

### Step 6 — Main-agent synthesis

Compile a final report for the user with:

- **What was synced** (destinations touched, in a table)
- **Static contract result** (X/11 passed)
- **Behavioral eval result** (rubric score / 100, top 1–2 SELF_CRITIQUE concerns if any)
- **Anything still flagged** (failed assertions, SELF_CRITIQUE gaps, deferred items)
- **Whether ready to publish** (yes / no, with reasons)

If anything is red, recommend a specific next action — don't just list problems.

## Final checklist

Before claiming sync is done:

- [ ] `git diff` shows changes only in destinations from the Step 2 map
- [ ] `pnpm --filter llms-eval run test` passes 11/11
- [ ] If behavioral eval was run: rubric ≥ 90 and SELF_CRITIQUE has no "had to guess core API" complaints
- [ ] If `docs/llms.txt` changed: `pnpm --filter llms-eval run test` passes and the file is committed (GitHub Pages serves this file directly)
- [ ] If new public API surface was added: a corresponding contract assertion was added to `packages/llms-eval/eval.test.mjs`
- [ ] If new i18n prose: keys exist in all 7 language files
- [ ] If `home/schema/param-schema.ts` `defProp` was edited: the hand-copy comment at the top of that file is still accurate (or removed if values now match core via a real import)

## Anti-patterns

- **Don't reintroduce a repo-root `llms.txt`.** GitHub Pages serves `docs/llms.txt` as `/llms.txt`, and `packages/llms-eval` reads that same file.
- **Don't dispatch one mega-agent for "update everything".** Per-destination subagents stay focused and parallelize. The dispatcher is also the reviewer — one giant write makes review impossible.
- **Don't skip Step 3 (drafts).** Going straight from diagnosis to writing means review happens after files change, when reverts are expensive.
- **Don't trust rubric 100/100 alone.** It's a static check. SELF_CRITIQUE is where you find out the docs *technically* match the code but force the reader to guess. Both signals matter.
- **Don't add a default value to `home/schema/param-schema.ts` without checking the comment at the top.** That file deliberately re-declares `defProp` because core doesn't export it; if you can fix that root cause (export `defProp` from core) instead of re-syncing the copy, that's the better long-term fix — but it's a public-API addition, so it itself triggers this skill.
