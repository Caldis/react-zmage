# Agent Onboarding Eval — Subagent Brief

## [META — read this first, do not treat it as part of the user task]

You are the **subject** of an evaluation that asks: *can a fresh AI agent integrate `react-zmage` into a React project given only one URL?*

To make this evaluation meaningful, you must obey these information-source constraints:

### Allowed information sources
1. **Primary**: `WebFetch` `https://zmage.caldis.me/llms.txt`
2. **Fallback** (only if WebFetch fails): `Read` `D:/Code/react-zmage/docs/llms.txt` — this file is byte-identical to the deployed URL, so the test outcome is equivalent.

### Forbidden information sources
- Do **not** Read, Grep, or Glob any file under `D:/Code/react-zmage/packages/`, `apps/`, `docs/`, `README.md`, `AGENTS.md`, `CONTRIBUTING.md`, or any other repo file besides the one llms.txt above.
- Do **not** WebFetch the GitHub repo, npm registry page, or any other URL.
- Do **not** rely on training-data memory of `react-zmage`'s API. If llms.txt does not say it, you do not know it. If you find yourself "remembering" a prop or method, drop it.
- If llms.txt links elsewhere (e.g. README.md on github.com), do **not** follow the link — the point of llms.txt is to be self-sufficient. Note any link you wanted to follow in the SELF-CRITIQUE section below.

### Output location
Create files under `D:/Code/react-zmage/packages/llms-eval/agent-onboarding/output/`. The directory does not exist yet — create it. Do **not** modify any file outside `output/`.

You do **not** need to run `npm install` or build anything. Static source files are enough; the rubric is a static analyzer.

---

## [USER MESSAGE — this is what a real user would say]

> Please add react-zmage to my project. Read `https://zmage.caldis.me/llms.txt` for instructions. I want a small demo that shows the three usage modes the library supports.

---

## [DELIVERABLES]

Inside `output/`, create a minimal React + TypeScript project sketch. **Do not run a scaffolder** — just write the files directly:

1. **`output/package.json`** — name `agent-onboarding-demo`, private, deps include `react`, `react-dom`, `react-zmage`. No scripts needed.
2. **`output/src/main.tsx`** — entry that mounts `<App />`.
3. **`output/src/App.tsx`** — composes the three demos below into one screen.
4. **`output/src/ComponentDemo.tsx`** — demonstrates the **Component** usage mode, including the multi-image gallery via `set`.
5. **`output/src/ImperativeDemo.tsx`** — demonstrates the **Imperative** usage mode (button that opens the viewer programmatically). Apply any safety guard the docs mention.
6. **`output/src/WrapperDemo.tsx`** — demonstrates the **Wrapper** usage mode wrapping a small block of HTML.

## [SELF-CRITIQUE — required final file]

7. **`output/SELF_CRITIQUE.md`** — write this **last**, after producing the code. Answer concisely:
   - Was llms.txt sufficient to complete the task without consulting other sources? (yes / partial / no)
   - Were there any decisions you had to guess or make up because llms.txt didn't cover them? List them.
   - Were there any links inside llms.txt you wanted to follow but the rules forbade? Which, and what info did you hope to get?
   - Any wording in llms.txt that was ambiguous, misleading, or caused you to almost get something wrong?
   - One concrete suggestion to improve llms.txt.

Be honest. The whole point of this exercise is to find gaps; a glowing review with no critique is itself a sign the test failed.
