# Home Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `packages/home` as a Vercel/shadcn-style SPA with three routes (`/`, `/playground`, `/docs`), a single param-schema that drives both live debug controls and docs tables, and zh/en + dark/light toggles.

**Architecture:** Vite SPA, BrowserRouter, Tailwind v4 + shadcn primitives, custom minimal i18n (no i18next), theme via `<html class="dark">` + CSS vars, schema as single source of truth for prop metadata. React 19 only — multi-version dev switch removed (lives in sandbox packages).

**Tech Stack:** React 19, Vite, react-router-dom v6, Tailwind v4, shadcn/ui (Radix primitives), lucide-react, prism-react-renderer, Geist fonts.

**Spec:** [`docs/superpowers/specs/2026-04-26-home-redesign-design.md`](../specs/2026-04-26-home-redesign-design.md)

---

## File Structure (final)

```
packages/home/
├─ index.html                  (rewritten)
├─ vite.config.ts              (rewritten)
├─ package.json                (rewritten — deps & scripts)
├─ tailwind.config.ts          (new)
├─ components.json             (new)
├─ tsconfig.json               (verify @ alias)
└─ src/
   ├─ main.tsx                 (rewritten — Router/Theme/I18n providers)
   ├─ App.tsx                  (rewritten — layout shell)
   ├─ ContextBanner.tsx        (rewritten in Tailwind, dev-only)
   ├─ routes/
   │  ├─ Home.tsx
   │  ├─ Playground.tsx
   │  ├─ playground/
   │  │  ├─ ComponentMode.tsx
   │  │  ├─ ImperativeMode.tsx
   │  │  └─ WrapperMode.tsx
   │  └─ Docs.tsx
   ├─ schema/param-schema.ts
   ├─ playground/
   │  ├─ ParamPanel.tsx
   │  ├─ Preview.tsx              (shared preview wrapper helpers)
   │  ├─ CodeSnippet.tsx
   │  ├─ EventLog.tsx
   │  ├─ shareState.ts            (URL hash <-> props)
   │  └─ controls/
   │     ├─ ScalarControl.tsx
   │     ├─ ControllerControl.tsx
   │     ├─ HotKeyControl.tsx
   │     ├─ AnimateControl.tsx
   │     ├─ SetControl.tsx
   │     ├─ PresetControl.tsx
   │     └─ CallbackControl.tsx
   ├─ docs/
   │  ├─ ParamTable.tsx
   │  ├─ Heading.tsx
   │  ├─ Toc.tsx
   │  ├─ Sidebar.tsx
   │  └─ sections/
   │     ├─ Installation.tsx
   │     ├─ ThreeModes.tsx
   │     ├─ Props.tsx
   │     ├─ ControllerDetail.tsx
   │     ├─ AnimateDetail.tsx
   │     ├─ Examples.tsx
   │     ├─ TypeScript.tsx
   │     └─ Migration.tsx
   ├─ components/
   │  ├─ ui/                     (shadcn-installed, see Task 5)
   │  ├─ TopNav.tsx
   │  ├─ Footer.tsx
   │  ├─ ThemeToggle.tsx
   │  ├─ LanguageToggle.tsx
   │  ├─ CodeBlock.tsx
   │  └─ CommandK.tsx
   ├─ i18n/
   │  ├─ dict.ts
   │  ├─ zh-CN.ts
   │  ├─ en.ts
   │  └─ useT.ts
   ├─ lib/
   │  ├─ utils.ts                 (cn helper)
   │  └─ theme.ts
   └─ styles/
      └─ globals.css
```

**Deleted at end:**
- `src/index.module.less`
- `public/highlight/`
- `public/fonts/ubuntu/`
- `public/normalize.css`

---

## Phase 1 — Foundation

### Task 1: Swap dependencies in `packages/home/package.json`

**Files:**
- Modify: `packages/home/package.json`

- [ ] **Step 1: Rewrite `package.json`**

```json
{
  "name": "react-zmage-home",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "dev": "pnpm --filter react-zmage run build && vite dev",
    "build": "pnpm --filter react-zmage run build && rimraf ../../docs && vite build",
    "preview": "vite preview --outDir ../../docs",
    "clean": "rimraf ../../docs",
    "lint": "eslint \"src/**/*.{ts,tsx}\""
  },
  "dependencies": {
    "react": "^19.2.5",
    "react-dom": "^19.2.5",
    "react-router-dom": "^6.30.0",
    "react-zmage": "workspace:*",
    "lucide-react": "^0.469.0",
    "prism-react-renderer": "^2.4.1",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.6.0",
    "geist": "^1.4.0",
    "@radix-ui/react-accordion": "^1.2.3",
    "@radix-ui/react-dialog": "^1.1.4",
    "@radix-ui/react-dropdown-menu": "^2.1.4",
    "@radix-ui/react-popover": "^1.1.4",
    "@radix-ui/react-select": "^2.1.4",
    "@radix-ui/react-separator": "^1.1.1",
    "@radix-ui/react-slider": "^1.2.2",
    "@radix-ui/react-slot": "^1.1.1",
    "@radix-ui/react-switch": "^1.1.2",
    "@radix-ui/react-tabs": "^1.1.2",
    "@radix-ui/react-tooltip": "^1.1.6"
  },
  "devDependencies": {
    "@types/react": "^19.0.7",
    "@types/react-dom": "^19.0.3",
    "@typescript-eslint/eslint-plugin": "^5.62.0",
    "@typescript-eslint/parser": "^5.62.0",
    "@vitejs/plugin-react": "^4.7.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/vite": "^4.0.0",
    "eslint": "^8.57.1",
    "eslint-plugin-react": "^7.37.5",
    "rimraf": "^5.0.10",
    "typescript": "^5.7.3",
    "vite": "^5.4.21"
  }
}
```

- [ ] **Step 2: Install**

Run from repo root: `pnpm install`
Expected: lockfile updates, no errors.

- [ ] **Step 3: Commit**

```bash
git add packages/home/package.json pnpm-lock.yaml
git commit -m "chore(home): swap deps for shadcn/Tailwind/router stack"
```

---

### Task 2: Add Tailwind v4 + shadcn config

**Files:**
- Create: `packages/home/components.json`
- Create: `packages/home/tailwind.config.ts`
- Create: `packages/home/src/styles/globals.css`
- Create: `packages/home/src/lib/utils.ts`
- Modify: `packages/home/tsconfig.json`

- [ ] **Step 1: Create `components.json`**

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/styles/globals.css",
    "baseColor": "zinc",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/lib/hooks"
  }
}
```

- [ ] **Step 2: Create `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      keyframes: {
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 200ms ease-out',
        'slide-up': 'slide-up 280ms cubic-bezier(0.2, 0.7, 0.3, 1)',
      },
      backgroundImage: {
        'grid': 'linear-gradient(to right, rgb(255 255 255 / 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.04) 1px, transparent 1px)',
      },
    },
  },
} satisfies Config
```

- [ ] **Step 3: Create `src/styles/globals.css`**

```css
@import "tailwindcss";
@import "geist/font/sans";
@import "geist/font/mono";

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 5.9% 10%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
  }

  * { border-color: hsl(var(--border)); }
  body {
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}
```

- [ ] **Step 4: Create `src/lib/utils.ts`**

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 5: Verify `tsconfig.json` has `@/*` alias**

Open `packages/home/tsconfig.json`. If `paths` is missing, add under `compilerOptions`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  }
}
```

- [ ] **Step 6: Commit**

```bash
git add packages/home/components.json packages/home/tailwind.config.ts packages/home/src/styles/globals.css packages/home/src/lib/utils.ts packages/home/tsconfig.json
git commit -m "chore(home): scaffold shadcn + Tailwind v4 config"
```

---

### Task 3: Rewrite `vite.config.ts`

**Files:**
- Modify: `packages/home/vite.config.ts`

- [ ] **Step 1: Replace contents**

```ts
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'

const docsDir = path.resolve(__dirname, '../../docs')

const spaFallback: Plugin = {
  name: 'home-spa-fallback',
  closeBundle () {
    const index = path.join(docsDir, 'index.html')
    const fallback = path.join(docsDir, '404.html')
    if (fs.existsSync(index)) {
      fs.copyFileSync(index, fallback)
    }
  },
}

export default defineConfig({
  plugins: [react(), tailwindcss(), spaFallback],
  server: {
    host: process.env.HOST || '127.0.0.1',
    port: Number(process.env.PORT || 8080),
  },
  publicDir: path.resolve(__dirname, 'public'),
  build: {
    outDir: docsDir,
    emptyOutDir: true,
  },
  preview: {
    host: process.env.HOST || '127.0.0.1',
    port: Number(process.env.PREVIEW_PORT || 4173),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    dedupe: ['react', 'react-dom'],
  },
})
```

- [ ] **Step 2: Commit**

```bash
git add packages/home/vite.config.ts
git commit -m "chore(home): vite config for tailwind + 404 fallback"
```

---

### Task 4: Rewrite `index.html`

**Files:**
- Modify: `packages/home/index.html`

- [ ] **Step 1: Replace contents**

```html
<!DOCTYPE html>
<html lang="zh-CN" class="dark">
  <head>
    <title>react-zmage — Drop-in image zoom for React</title>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="A React component that turns any <img> into a fullscreen, keyboard-navigable image viewer." />
    <meta name="baidu-site-verification" content="9qj6NCtojt" />
    <link rel="apple-touch-icon" href="/logo.png" />
    <link rel="icon" href="/favicon.ico" />
    <script>
      // Avoid flash-of-light-theme: resolve theme before paint.
      try {
        const stored = localStorage.getItem('zmage.theme')
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        const theme = stored === 'light' ? 'light' : stored === 'dark' ? 'dark' : (prefersDark ? 'dark' : 'light')
        document.documentElement.classList.toggle('dark', theme === 'dark')
      } catch {}
    </script>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add packages/home/index.html
git commit -m "chore(home): rewrite index.html, drop highlight.js + ubuntu font"
```

---

### Task 5: Install shadcn primitives

**Files:** auto-generated under `packages/home/src/components/ui/`

- [ ] **Step 1: Run shadcn CLI from `packages/home/`**

```bash
cd packages/home
pnpm dlx shadcn@latest add button slider switch select tabs accordion popover dialog tooltip separator sheet dropdown-menu badge card input label
```

Accept all prompts (use existing components.json).

- [ ] **Step 2: Verify generated files**

Run: `ls src/components/ui`
Expected: `accordion.tsx, badge.tsx, button.tsx, card.tsx, dialog.tsx, dropdown-menu.tsx, input.tsx, label.tsx, popover.tsx, select.tsx, separator.tsx, sheet.tsx, slider.tsx, switch.tsx, tabs.tsx, tooltip.tsx`

- [ ] **Step 3: Commit**

```bash
cd ../..
git add packages/home/src/components/ui/
git commit -m "feat(home): install shadcn UI primitives"
```

---

### Task 6: Theme provider + ThemeToggle

**Files:**
- Create: `packages/home/src/lib/theme.ts`
- Create: `packages/home/src/components/ThemeToggle.tsx`

- [ ] **Step 1: Create `src/lib/theme.ts`**

```tsx
import * as React from 'react'

export type Theme = 'light' | 'dark' | 'system'
const STORAGE_KEY = 'zmage.theme'

type Ctx = { theme: Theme; resolved: 'light' | 'dark'; setTheme: (t: Theme) => void }
const ThemeCtx = React.createContext<Ctx | null>(null)

function readStored (): Theme {
  if (typeof window === 'undefined') return 'system'
  const v = localStorage.getItem(STORAGE_KEY)
  return v === 'light' || v === 'dark' || v === 'system' ? v : 'system'
}

function systemPrefersDark () {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function ThemeProvider ({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>(readStored)
  const [resolved, setResolved] = React.useState<'light' | 'dark'>(() =>
    theme === 'system' ? (systemPrefersDark() ? 'dark' : 'light') : theme
  )

  React.useEffect(() => {
    const apply = () => {
      const r = theme === 'system' ? (systemPrefersDark() ? 'dark' : 'light') : theme
      setResolved(r)
      document.documentElement.classList.toggle('dark', r === 'dark')
    }
    apply()
    if (theme !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [theme])

  const setTheme = React.useCallback((t: Theme) => {
    localStorage.setItem(STORAGE_KEY, t)
    setThemeState(t)
  }, [])

  return <ThemeCtx.Provider value={{ theme, resolved, setTheme }}>{children}</ThemeCtx.Provider>
}

export function useTheme () {
  const ctx = React.useContext(ThemeCtx)
  if (!ctx) throw new Error('useTheme must be inside ThemeProvider')
  return ctx
}
```

- [ ] **Step 2: Create `src/components/ThemeToggle.tsx`**

```tsx
import { Sun, Moon, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useTheme, type Theme } from '@/lib/theme'

const ITEMS: { value: Theme; icon: React.ComponentType<{ className?: string }>; label: string }[] = [
  { value: 'light', icon: Sun, label: 'Light' },
  { value: 'dark', icon: Moon, label: 'Dark' },
  { value: 'system', icon: Monitor, label: 'System' },
]

export function ThemeToggle () {
  const { theme, resolved, setTheme } = useTheme()
  const Icon = resolved === 'dark' ? Moon : Sun
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Toggle theme">
          <Icon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        {ITEMS.map(({ value, icon: I, label }) => (
          <DropdownMenuItem key={value} onClick={() => setTheme(value)} data-active={theme === value}>
            <I className="mr-2 h-4 w-4" />
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add packages/home/src/lib/theme.ts packages/home/src/components/ThemeToggle.tsx
git commit -m "feat(home): theme provider + dark/light/system toggle"
```

---

### Task 7: i18n provider + dictionaries (chrome strings)

**Files:**
- Create: `packages/home/src/i18n/dict.ts`
- Create: `packages/home/src/i18n/zh-CN.ts`
- Create: `packages/home/src/i18n/en.ts`
- Create: `packages/home/src/i18n/useT.ts`

- [ ] **Step 1: Create `src/i18n/zh-CN.ts`** (canonical key set; en mirrors it)

```ts
export const zhCN = {
  // Nav
  'nav.playground': '调试',
  'nav.docs': '文档',
  'nav.github': 'GitHub',

  // Hero
  'hero.pill': 'React 19 ready',
  'hero.title.line1': '为每张 <img> 加上缩放',
  'hero.title.line2': '即插即用,零配置',
  'hero.subtitle': '一个轻量 React 组件,把任何图片变成全屏、可键盘导航的查看器。无需 portal,无需状态管线,只需一个 <Zmage>。',
  'hero.cta.start': '快速开始',
  'hero.cta.playground': '打开调试台',
  'hero.cta.npm.copied': '已复制',

  // Live demo strip
  'demo.caption': '这是一个真实的 <Zmage>。点击图片、滚动、按 Space 试试。',

  // Feature grid
  'feature.dropin.title': '替换 <img>',
  'feature.dropin.hint': '原生属性全部透传,style/className/onClick 一切照旧。',
  'feature.set.title': '多图序列',
  'feature.set.hint': '传入 set 即可获得画廊,左右键切换。',
  'feature.imperative.title': '命令式调用',
  'feature.imperative.hint': '从任意事件回调启动查看器。',
  'feature.wrapper.title': '自动包裹',
  'feature.wrapper.hint': '为子节点中的所有 <img> 自动绑定查看器。',

  // Three modes
  'modes.title': '三种使用方式',
  'modes.component.label': '组件',
  'modes.component.desc': '最常见,把 <img> 直接换成 <Zmage>。',
  'modes.imperative.label': '命令式',
  'modes.imperative.desc': '在事件处理器里弹出查看器,适合超出 JSX 范围的场景。',
  'modes.wrapper.label': '包裹器',
  'modes.wrapper.desc': '不改动子组件,自动给所有 <img> 加上查看器。',
  'modes.try': '试一下 →',

  // Footer
  'footer.project': '项目',
  'footer.repo': '代码仓库',
  'footer.issues': '反馈与建议',
  'footer.changelog': '更新日志',
  'footer.madeby': '作者',
  'footer.illustrator': '插图作者',
  'footer.tech': '技术栈',
  'footer.license': 'MIT 许可证',

  // Playground shell
  'pg.title': '参数调试台',
  'pg.subtitle': '调整任意 prop,实时查看 <Zmage> 的反馈。',
  'pg.reset': '重置',
  'pg.share': '分享链接',
  'pg.shared': '已复制链接',
  'pg.tab.component': '组件',
  'pg.tab.imperative': '命令式',
  'pg.tab.wrapper': '包裹器',
  'pg.preview.tip': '提示:Space 缩放 · ←/→ 翻页 · ESC 关闭',
  'pg.preview.trigger': '触发查看器',
  'pg.events.title': '事件',
  'pg.events.empty': '启用任意 lifecycle 回调以查看事件流。',
  'pg.code.title': '代码',
  'pg.copy': '复制',
  'pg.copied': '已复制',

  // Group labels
  'group.data': '数据',
  'group.preset': '预设',
  'group.interface': '界面与交互',
  'group.controller': '控制器',
  'group.hotkey': '快捷键',
  'group.animate': '动画',
  'group.lifecycle': '生命周期',
  'group.controlled': '受控',

  // Common
  'common.desktopOnly': '仅桌面端',
  'common.required': '必填',
  'common.default': '默认',
  'common.add': '新增',
  'common.remove': '删除',
  'common.enable': '启用',
  'common.disable': '禁用',

  // Docs shell
  'docs.title': 'API 文档',
  'docs.search.placeholder': '搜索文档...',
  'docs.search.empty': '没有匹配项',
  'docs.toc.title': '本页目录',
  'docs.sidebar.gettingStarted': '开始使用',
  'docs.sidebar.quickstart': '快速开始',
  'docs.sidebar.ssr': 'SSR',
  'docs.sidebar.concepts': '概念',
  'docs.sidebar.modes': '三种模式',
  'docs.sidebar.props': 'API 参数',
  'docs.sidebar.recipes': '场景示例',
  'docs.sidebar.examples': '示例',
  'docs.sidebar.typescript': 'TypeScript',
  'docs.sidebar.reference': '参考',
  'docs.sidebar.migration': '迁移指南',
}

export type I18nDict = typeof zhCN
export type I18nKey = keyof I18nDict
```

- [ ] **Step 2: Create `src/i18n/en.ts`**

```ts
import type { I18nDict } from './zh-CN'

export const en: I18nDict = {
  'nav.playground': 'Playground',
  'nav.docs': 'Docs',
  'nav.github': 'GitHub',

  'hero.pill': 'React 19 ready',
  'hero.title.line1': 'Zoom every <img>.',
  'hero.title.line2': 'Drop-in. Zero config.',
  'hero.subtitle': 'A tiny React component that turns any image into a fullscreen, keyboard-navigable viewer. No portal setup. No state plumbing. Just <Zmage>.',
  'hero.cta.start': 'Get started',
  'hero.cta.playground': 'Open playground',
  'hero.cta.npm.copied': 'Copied',

  'demo.caption': 'This is a real <Zmage>. Try clicking, scrolling, hitting Space.',

  'feature.dropin.title': 'Drop-in <img>',
  'feature.dropin.hint': 'Native props pass through. style, className, onClick — all forwarded.',
  'feature.set.title': 'Multi-image set',
  'feature.set.hint': 'Pass a set and you get a gallery, with arrow-key navigation.',
  'feature.imperative.title': 'Imperative API',
  'feature.imperative.hint': 'Open the viewer from any event handler.',
  'feature.wrapper.title': 'Auto-wrap any DOM',
  'feature.wrapper.hint': 'Attach the viewer to every <img> inside, no JSX changes.',

  'modes.title': 'Three ways to use it',
  'modes.component.label': 'Component',
  'modes.component.desc': 'Most common. Swap <img> for <Zmage>.',
  'modes.imperative.label': 'Imperative',
  'modes.imperative.desc': 'Open the viewer from arbitrary event handlers.',
  'modes.wrapper.label': 'Wrapper',
  'modes.wrapper.desc': "Don't touch children — auto-attach the viewer to every <img> within.",
  'modes.try': 'Try it →',

  'footer.project': 'Project',
  'footer.repo': 'Repository',
  'footer.issues': 'Issues',
  'footer.changelog': 'Changelog',
  'footer.madeby': 'Made by',
  'footer.illustrator': 'Illustrator',
  'footer.tech': 'Built with',
  'footer.license': 'MIT License',

  'pg.title': 'Playground',
  'pg.subtitle': 'Tweak every prop and watch the viewer react in real time.',
  'pg.reset': 'Reset',
  'pg.share': 'Share',
  'pg.shared': 'Link copied',
  'pg.tab.component': 'Component',
  'pg.tab.imperative': 'Imperative',
  'pg.tab.wrapper': 'Wrapper',
  'pg.preview.tip': 'Tip: Space to zoom · ←/→ to flip · ESC to close',
  'pg.preview.trigger': 'Trigger viewer',
  'pg.events.title': 'Events',
  'pg.events.empty': 'Enable any lifecycle callback to see events stream here.',
  'pg.code.title': 'Code',
  'pg.copy': 'Copy',
  'pg.copied': 'Copied',

  'group.data': 'Data',
  'group.preset': 'Preset',
  'group.interface': 'Interface',
  'group.controller': 'Controller',
  'group.hotkey': 'HotKey',
  'group.animate': 'Animate',
  'group.lifecycle': 'Lifecycle',
  'group.controlled': 'Controlled',

  'common.desktopOnly': 'Desktop only',
  'common.required': 'Required',
  'common.default': 'Default',
  'common.add': 'Add',
  'common.remove': 'Remove',
  'common.enable': 'Enable',
  'common.disable': 'Disable',

  'docs.title': 'API Reference',
  'docs.search.placeholder': 'Search docs...',
  'docs.search.empty': 'No matches',
  'docs.toc.title': 'On this page',
  'docs.sidebar.gettingStarted': 'Getting started',
  'docs.sidebar.quickstart': 'Quickstart',
  'docs.sidebar.ssr': 'SSR',
  'docs.sidebar.concepts': 'Concepts',
  'docs.sidebar.modes': 'Modes',
  'docs.sidebar.props': 'Props',
  'docs.sidebar.recipes': 'Recipes',
  'docs.sidebar.examples': 'Examples',
  'docs.sidebar.typescript': 'TypeScript',
  'docs.sidebar.reference': 'Reference',
  'docs.sidebar.migration': 'Migration',
}
```

- [ ] **Step 3: Create `src/i18n/dict.ts`**

```ts
export { zhCN, type I18nDict, type I18nKey } from './zh-CN'
export { en } from './en'
```

- [ ] **Step 4: Create `src/i18n/useT.ts`**

```tsx
import * as React from 'react'
import { zhCN, en, type I18nDict, type I18nKey } from './dict'

export type Lang = 'zh-CN' | 'en'
const STORAGE_KEY = 'zmage.lang'
const DICTS: Record<Lang, I18nDict> = { 'zh-CN': zhCN, 'en': en }

function detect (): Lang {
  if (typeof window === 'undefined') return 'zh-CN'
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'zh-CN' || stored === 'en') return stored
  const nav = navigator.language || 'zh-CN'
  return nav.toLowerCase().startsWith('zh') ? 'zh-CN' : 'en'
}

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: I18nKey) => string }
const I18nCtx = React.createContext<Ctx | null>(null)

export function I18nProvider ({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Lang>(detect)
  const t = React.useCallback((k: I18nKey) => DICTS[lang][k] ?? k, [lang])
  const setLang = React.useCallback((l: Lang) => {
    localStorage.setItem(STORAGE_KEY, l)
    setLangState(l)
    document.documentElement.lang = l
  }, [])
  React.useEffect(() => { document.documentElement.lang = lang }, [lang])
  return <I18nCtx.Provider value={{ lang, setLang, t }}>{children}</I18nCtx.Provider>
}

export function useT () {
  const ctx = React.useContext(I18nCtx)
  if (!ctx) throw new Error('useT must be inside I18nProvider')
  return ctx
}
```

- [ ] **Step 5: Commit**

```bash
git add packages/home/src/i18n/
git commit -m "feat(home): minimal i18n provider with zh-CN/en dictionaries"
```

---

### Task 8: Router shell + route stubs

**Files:**
- Modify: `packages/home/src/main.tsx`
- Modify: `packages/home/src/App.tsx`
- Create: `packages/home/src/routes/Home.tsx` (stub)
- Create: `packages/home/src/routes/Playground.tsx` (stub)
- Create: `packages/home/src/routes/Docs.tsx` (stub)
- Modify: `packages/home/src/ContextBanner.tsx`

- [ ] **Step 1: Rewrite `src/main.tsx`**

```tsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'react-zmage/style.css'
import './styles/globals.css'
import { ThemeProvider } from '@/lib/theme'
import { I18nProvider } from '@/i18n/useT'
import App from './App'

const root = document.getElementById('app')
if (!root) throw new Error('Missing #app root element')

createRoot(root).render(
  <React.StrictMode>
    <ThemeProvider>
      <I18nProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </I18nProvider>
    </ThemeProvider>
  </React.StrictMode>
)
```

- [ ] **Step 2: Rewrite `src/App.tsx`**

```tsx
import { Route, Routes } from 'react-router-dom'
import { ContextBanner } from './ContextBanner'
import Home from './routes/Home'
import Playground from './routes/Playground'
import Docs from './routes/Docs'

export default function App () {
  return (
    <>
      {import.meta.env.DEV && <ContextBanner />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playground/*" element={<Playground />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  )
}
```

- [ ] **Step 3: Stub routes — `src/routes/Home.tsx`**

```tsx
export default function Home () {
  return <div className="min-h-screen flex items-center justify-center text-2xl">Home (stub)</div>
}
```

- [ ] **Step 4: Stub routes — `src/routes/Playground.tsx`**

```tsx
export default function Playground () {
  return <div className="min-h-screen flex items-center justify-center text-2xl">Playground (stub)</div>
}
```

- [ ] **Step 5: Stub routes — `src/routes/Docs.tsx`**

```tsx
export default function Docs () {
  return <div className="min-h-screen flex items-center justify-center text-2xl">Docs (stub)</div>
}
```

- [ ] **Step 6: Rewrite `ContextBanner.tsx`** (minimal Tailwind version)

```tsx
import zmagePkg from 'react-zmage/package.json'

export function ContextBanner () {
  return (
    <div className="fixed bottom-3 right-3 z-[9999] rounded-md border border-border bg-background/80 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur">
      <span className="font-mono">react-zmage v{zmagePkg.version}</span>
      <span className="mx-2 opacity-50">·</span>
      <span>React {require('react').version}</span>
    </div>
  )
}
```

(If `require` complains under TS, use `import React from 'react'` and `React.version`.)

- [ ] **Step 7: Run dev server and verify**

```bash
cd packages/home && pnpm dev
```

Visit `http://127.0.0.1:8080/`, `http://127.0.0.1:8080/playground`, `http://127.0.0.1:8080/docs`. Each should show its stub page. Toggle dark/light by setting `localStorage.setItem('zmage.theme','light')` in DevTools and reloading.

- [ ] **Step 8: Commit**

```bash
git add packages/home/src/main.tsx packages/home/src/App.tsx packages/home/src/routes/ packages/home/src/ContextBanner.tsx
git commit -m "feat(home): router shell with three route stubs"
```

---

## Phase 2 — Chrome (TopNav + Footer)

### Task 9: CodeBlock component

**Files:**
- Create: `packages/home/src/components/CodeBlock.tsx`

- [ ] **Step 1: Create the component**

```tsx
import * as React from 'react'
import { Highlight, themes, type Language } from 'prism-react-renderer'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useTheme } from '@/lib/theme'

type Props = {
  code: string
  language?: Language
  showCopy?: boolean
  className?: string
}

export function CodeBlock ({ code, language = 'tsx' as Language, showCopy = true, className }: Props) {
  const { resolved } = useTheme()
  const [copied, setCopied] = React.useState(false)
  const onCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  const theme = resolved === 'dark' ? themes.vsDark : themes.vsLight
  return (
    <div className={cn('relative rounded-lg border border-border bg-muted/30 overflow-hidden', className)}>
      {showCopy && (
        <Button
          size="icon"
          variant="ghost"
          onClick={onCopy}
          className="absolute right-2 top-2 h-7 w-7 opacity-70 hover:opacity-100"
          aria-label="Copy code"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        </Button>
      )}
      <Highlight code={code.trim()} language={language} theme={theme}>
        {({ className: cls, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={cn(cls, 'overflow-x-auto p-4 text-sm font-mono leading-6')} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, k) => <span key={k} {...getTokenProps({ token })} />)}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add packages/home/src/components/CodeBlock.tsx
git commit -m "feat(home): CodeBlock with prism-react-renderer + copy button"
```

---

### Task 10: TopNav

**Files:**
- Create: `packages/home/src/components/TopNav.tsx`
- Modify: `packages/home/src/App.tsx`

- [ ] **Step 1: Create `src/components/TopNav.tsx`**

```tsx
import { Link, NavLink } from 'react-router-dom'
import { Github, Menu } from 'lucide-react'
import zmagePkg from 'react-zmage/package.json'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from './ThemeToggle'
import { LanguageToggle } from './LanguageToggle'
import { useT } from '@/i18n/useT'
import { cn } from '@/lib/utils'

const links = [
  { to: '/playground', key: 'nav.playground' as const },
  { to: '/docs', key: 'nav.docs' as const },
]

export function TopNav () {
  const { t } = useT()
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-14 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center gap-6 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="" className="h-7 w-7" />
          <span className="font-mono text-sm font-medium">react-zmage</span>
          <Badge variant="secondary" className="font-mono text-[10px]">v{zmagePkg.version}</Badge>
        </Link>
        <nav className="hidden flex-1 items-center gap-1 md:flex">
          {links.map(({ to, key }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'rounded-md px-3 py-1.5 text-sm transition-colors',
                  isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                )
              }
            >
              {t(key)}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <LanguageToggle />
          <ThemeToggle />
          <Button variant="ghost" size="icon" asChild aria-label={t('nav.github')}>
            <a href="https://github.com/Caldis/react-zmage" target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" />
            </a>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <nav className="mt-8 flex flex-col gap-1">
                {links.map(({ to, key }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      cn(
                        'rounded-md px-3 py-2 text-base transition-colors',
                        isActive ? 'bg-accent text-foreground' : 'text-muted-foreground hover:bg-accent/60',
                      )
                    }
                  >
                    {t(key)}
                  </NavLink>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Wire TopNav into `App.tsx`**

Replace `App.tsx` with:

```tsx
import { Route, Routes } from 'react-router-dom'
import { ContextBanner } from './ContextBanner'
import { TopNav } from '@/components/TopNav'
import Home from './routes/Home'
import Playground from './routes/Playground'
import Docs from './routes/Docs'

export default function App () {
  return (
    <>
      {import.meta.env.DEV && <ContextBanner />}
      <TopNav />
      <main className="pt-14">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playground/*" element={<Playground />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add packages/home/src/components/TopNav.tsx packages/home/src/App.tsx
git commit -m "feat(home): top nav with theme/language/github"
```

---

### Task 11: LanguageToggle

**Files:**
- Create: `packages/home/src/components/LanguageToggle.tsx`

- [ ] **Step 1: Create the component**

```tsx
import { Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useT, type Lang } from '@/i18n/useT'

const LANGS: { value: Lang; label: string }[] = [
  { value: 'zh-CN', label: '中文' },
  { value: 'en', label: 'English' },
]

export function LanguageToggle () {
  const { lang, setLang } = useT()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Language">
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        {LANGS.map(({ value, label }) => (
          <DropdownMenuItem key={value} onClick={() => setLang(value)} data-active={lang === value}>
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add packages/home/src/components/LanguageToggle.tsx
git commit -m "feat(home): language toggle (zh-CN / en)"
```

---

### Task 12: Footer

**Files:**
- Create: `packages/home/src/components/Footer.tsx`

- [ ] **Step 1: Create**

```tsx
import { Github } from 'lucide-react'
import zmagePkg from 'react-zmage/package.json'
import { useT } from '@/i18n/useT'

export function Footer () {
  const { t } = useT()
  return (
    <footer className="mt-32 border-t border-border/60 bg-muted/20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <h4 className="text-sm font-medium">{t('footer.project')}</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a className="hover:text-foreground" href="https://github.com/Caldis/react-zmage">{t('footer.repo')}</a></li>
            <li><a className="hover:text-foreground" href="https://github.com/Caldis/react-zmage/issues">{t('footer.issues')}</a></li>
            <li><a className="hover:text-foreground" href="https://github.com/Caldis/react-zmage/releases">{t('footer.changelog')}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium">{t('footer.madeby')}</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a className="hover:text-foreground" href="https://github.com/Caldis">Caldis</a></li>
            <li>
              <span>{t('footer.illustrator')}: </span>
              <a className="hover:text-foreground" href="https://www.behance.net/gallery/56119387/_">sslololss Guihuahuzi</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium">{t('footer.tech')}</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>React 19</li>
            <li>Vite</li>
            <li>shadcn/ui · Tailwind v4</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 text-xs text-muted-foreground sm:px-6">
          <span>{t('footer.license')} · v{zmagePkg.version}</span>
          <a href="https://github.com/Caldis/react-zmage" aria-label="GitHub" className="hover:text-foreground">
            <Github className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add packages/home/src/components/Footer.tsx
git commit -m "feat(home): footer with project/author/tech columns"
```

---

## Phase 3 — Home `/`

### Task 13: Hero section

**Files:**
- Create: `packages/home/src/routes/Home.tsx` (replace stub)

- [ ] **Step 1: Replace stub with Hero + placeholders for next sections**

```tsx
import * as React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Copy, Check } from 'lucide-react'
import zmagePkg from 'react-zmage/package.json'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/Footer'
import { useT } from '@/i18n/useT'
import { cn } from '@/lib/utils'

function NpmChip () {
  const cmd = 'pnpm add react-zmage'
  const [copied, setCopied] = React.useState(false)
  const { t } = useT()
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(cmd)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      className="group inline-flex items-center gap-2 rounded-md border border-border bg-muted/40 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:bg-muted"
    >
      <span>$ {cmd}</span>
      {copied
        ? <><Check className="h-3.5 w-3.5" /> <span className="text-foreground">{t('hero.cta.npm.copied')}</span></>
        : <Copy className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100" />}
    </button>
  )
}

function Hero () {
  const { t } = useT()
  return (
    <section className="relative isolate overflow-hidden">
      {/* grid background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid [background-size:40px_40px]" aria-hidden />
      {/* radial glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,hsl(var(--foreground)/0.08),transparent)]" aria-hidden />

      <div className="mx-auto flex min-h-[80vh] max-w-5xl flex-col items-center px-4 py-32 text-center sm:px-6">
        <Badge variant="secondary" className="mb-8 font-mono">
          v{zmagePkg.version} · {t('hero.pill')}
        </Badge>
        <h1 className={cn(
          'font-sans font-semibold tracking-tight',
          'text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.05]',
        )}>
          {t('hero.title.line1')}
        </h1>
        <h2 className={cn(
          'mt-2 bg-clip-text font-sans font-semibold tracking-tight',
          'text-[clamp(2rem,5.5vw,4rem)] leading-[1.1]',
          'bg-gradient-to-br from-foreground to-foreground/40 text-transparent',
        )}>
          {t('hero.title.line2')}
        </h2>
        <p className="mt-8 max-w-2xl text-base text-muted-foreground sm:text-lg">
          {t('hero.subtitle')}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" asChild>
            <Link to="/docs">{t('hero.cta.start')} <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/playground">{t('hero.cta.playground')}</Link>
          </Button>
          <NpmChip />
        </div>
      </div>
    </section>
  )
}

export default function Home () {
  return (
    <>
      <Hero />
      {/* TODO sections wired in Tasks 14-15 */}
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Verify in dev**

Reload `/`. Hero should occupy 80vh+, dark by default, gradient subtitle, CTA buttons functional, npm chip copy works.

- [ ] **Step 3: Commit**

```bash
git add packages/home/src/routes/Home.tsx
git commit -m "feat(home): hero section"
```

---

### Task 14: Live Demo Strip + Feature Grid

**Files:**
- Modify: `packages/home/src/routes/Home.tsx`

- [ ] **Step 1: Add `LiveDemo` and `FeatureGrid` components, insert into Home**

Add above `export default function Home`:

```tsx
import Zmage from 'react-zmage'
import { Card } from '@/components/ui/card'
import { CodeBlock } from '@/components/CodeBlock'
import { ImageIcon, GalleryHorizontal, Wand2, Code2 } from 'lucide-react'

function LiveDemo () {
  const { t } = useT()
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="overflow-hidden rounded-2xl border border-border bg-muted/20 shadow-2xl shadow-black/40">
        <div className="aspect-[16/9] w-full">
          <Zmage
            className="h-full w-full object-cover"
            src="/imgSet/childsDream/1.jpg"
            alt="Live demo"
            set={[
              { src: '/imgSet/childsDream/1.jpg', alt: '童夢 · ONE' },
              { src: '/imgSet/childsDream/2.jpg', alt: '童夢 · TWO' },
              { src: '/imgSet/childsDream/3.jpg', alt: '童夢 · THREE' },
              { src: '/imgSet/childsDream/4.jpg', alt: '童夢 · FOUR' },
            ]}
          />
        </div>
      </div>
      <p className="mt-6 text-center text-sm text-muted-foreground">{t('demo.caption')}</p>
    </section>
  )
}

const FEATURES = [
  { icon: ImageIcon, titleKey: 'feature.dropin.title' as const, hintKey: 'feature.dropin.hint' as const, code: '<Zmage src="..." />' },
  { icon: GalleryHorizontal, titleKey: 'feature.set.title' as const, hintKey: 'feature.set.hint' as const, code: '<Zmage src="..." set={[...]} />' },
  { icon: Code2, titleKey: 'feature.imperative.title' as const, hintKey: 'feature.imperative.hint' as const, code: 'Zmage.browsing({ src })' },
  { icon: Wand2, titleKey: 'feature.wrapper.title' as const, hintKey: 'feature.wrapper.hint' as const, code: '<Zmage.Wrapper>{children}</Zmage.Wrapper>' },
]

function FeatureGrid () {
  const { t } = useT()
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="grid gap-4 md:grid-cols-2">
        {FEATURES.map(({ icon: I, titleKey, hintKey, code }) => (
          <Card key={titleKey} className="group relative overflow-hidden border-border/60 bg-card/40 p-6 transition-colors hover:bg-card/70">
            <I className="h-5 w-5 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">{t(titleKey)}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{t(hintKey)}</p>
            <div className="mt-5">
              <CodeBlock code={code} language={'tsx' as any} showCopy={false} />
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
```

Update Home body:

```tsx
export default function Home () {
  return (
    <>
      <Hero />
      <LiveDemo />
      <FeatureGrid />
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Verify in dev**

Click the demo image, browse with arrow keys, ensure backdrop opens correctly. Hover feature cards.

- [ ] **Step 3: Commit**

```bash
git add packages/home/src/routes/Home.tsx
git commit -m "feat(home): live demo strip + feature grid"
```

---

### Task 15: Three Modes Showcase

**Files:**
- Modify: `packages/home/src/routes/Home.tsx`

- [ ] **Step 1: Add `ThreeModes` component**

```tsx
const MODE_CODE = {
  component: `<Zmage src="hero.jpg" set={[...]} />`,
  imperative: `import Zmage from 'react-zmage'

button.onclick = () => Zmage.browsing({
  src: 'hero.jpg', set: [...]
})`,
  wrapper: `<Zmage.Wrapper>
  <article dangerouslySetInnerHTML={{ __html: html }} />
</Zmage.Wrapper>`,
}

function ThreeModes () {
  const { t } = useT()
  const cards = [
    { code: MODE_CODE.component, labelKey: 'modes.component.label' as const, descKey: 'modes.component.desc' as const, link: '/playground' },
    { code: MODE_CODE.imperative, labelKey: 'modes.imperative.label' as const, descKey: 'modes.imperative.desc' as const, link: '/playground/imperative' },
    { code: MODE_CODE.wrapper, labelKey: 'modes.wrapper.label' as const, descKey: 'modes.wrapper.desc' as const, link: '/playground/wrapper' },
  ]
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <h2 className="text-3xl font-semibold tracking-tight">{t('modes.title')}</h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {cards.map(c => (
          <div key={c.labelKey} className="flex flex-col">
            <span className="text-xs font-mono text-muted-foreground">{t(c.labelKey)}</span>
            <CodeBlock code={c.code} className="mt-2 flex-1" />
            <p className="mt-4 text-sm text-muted-foreground">{t(c.descKey)}</p>
            <Link to={c.link} className="mt-3 text-sm text-foreground hover:opacity-70">{t('modes.try')}</Link>
          </div>
        ))}
      </div>
    </section>
  )
}
```

Update Home body to include `<ThreeModes />` between FeatureGrid and Footer.

- [ ] **Step 2: Verify visual order — Hero → LiveDemo → FeatureGrid → ThreeModes → Footer.**

- [ ] **Step 3: Commit**

```bash
git add packages/home/src/routes/Home.tsx
git commit -m "feat(home): three modes showcase"
```

---

## Phase 4 — Schema

### Task 16: ParamDef types + schema (Data / Preset / Interface / Controlled)

**Files:**
- Create: `packages/home/src/schema/param-schema.ts`

- [ ] **Step 1: Create schema file with types and the four scalar groups**

```ts
import type { BaseType } from 'react-zmage'
import type { I18nKey } from '@/i18n/dict'

// ─────────────────────────────────────────────────────────────
// Default values mirrored from packages/core/src/types/default.ts
// (defProp / defPreset are NOT part of react-zmage's public exports
//  and tsup bundles dist/, so we cannot deep-import them. If you change
//  defaults in packages/core, update the values here.)
// ─────────────────────────────────────────────────────────────
export const defProp = {
  src: '',
  alt: '',
  txt: '',
  set: [] as { src: string; alt?: string; text?: string }[],
  defaultPage: 0,
  preset: '',
  controller: {} as Record<string, boolean>,
  hotKey: {} as Record<string, boolean>,
  animate: {} as Record<string, unknown>,
  hideOnScroll: true,
  coverVisible: false,
  backdrop: '#FFFFFF',
  zIndex: 1000,
  radius: 0,
  edge: 0,
  loop: true,
}

export const defPreset = {
  desktop: {
    controller: { pagination: true, rotate: true, zoom: true, download: false, close: true, flip: true },
    hotKey: { close: true, zoom: true, flip: true },
    animate: { browsing: true, flip: 'fade' as const },
  },
  mobile: {
    controller: { pagination: true, rotate: false, zoom: false, download: false, close: true, flip: false },
    hotKey: { close: false, zoom: false, flip: false },
    animate: { browsing: true, flip: 'swipe' as const },
  },
}

export type ControlKind =
  | { kind: 'switch' }
  | { kind: 'slider'; min: number; max: number; step?: number }
  | { kind: 'number' }
  | { kind: 'text' }
  | { kind: 'color' }
  | { kind: 'select'; options: { value: string; labelKey: I18nKey }[] }
  | { kind: 'segmented'; options: { value: string; labelKey: I18nKey }[] }
  | { kind: 'object'; component: 'controller' | 'hotkey' | 'animate' | 'set' }
  | { kind: 'callback'; events: string[] }

export type ParamGroup =
  | 'data' | 'preset' | 'interface' | 'controller' | 'hotkey' | 'animate' | 'lifecycle' | 'controlled'

export type ParamDef<K extends keyof BaseType = keyof BaseType> = {
  name: K
  group: ParamGroup
  default: unknown
  control: ControlKind
  i18n: { labelKey: I18nKey; descKey: I18nKey }
  desktopOnly?: boolean
  required?: boolean
  since?: string
}

export const PARAM_SCHEMA: ParamDef[] = [
  // Data
  { name: 'src', group: 'data', default: '', required: true, control: { kind: 'text' },
    i18n: { labelKey: 'param.src.label', descKey: 'param.src.desc' } },
  { name: 'alt', group: 'data', default: '', control: { kind: 'text' },
    i18n: { labelKey: 'param.alt.label', descKey: 'param.alt.desc' } },
  { name: 'txt', group: 'data', default: '', control: { kind: 'text' },
    i18n: { labelKey: 'param.txt.label', descKey: 'param.txt.desc' } },
  { name: 'set', group: 'data', default: [], control: { kind: 'object', component: 'set' },
    i18n: { labelKey: 'param.set.label', descKey: 'param.set.desc' } },
  { name: 'defaultPage', group: 'data', default: 0, control: { kind: 'number' },
    i18n: { labelKey: 'param.defaultPage.label', descKey: 'param.defaultPage.desc' } },

  // Preset
  { name: 'preset', group: 'preset', default: '', control: {
      kind: 'segmented',
      options: [
        { value: 'desktop', labelKey: 'preset.desktop' },
        { value: 'mobile', labelKey: 'preset.mobile' },
        { value: '', labelKey: 'preset.none' },
      ],
    },
    i18n: { labelKey: 'param.preset.label', descKey: 'param.preset.desc' } },

  // Interface & interaction
  { name: 'backdrop', group: 'interface', default: defProp.backdrop, control: { kind: 'color' },
    i18n: { labelKey: 'param.backdrop.label', descKey: 'param.backdrop.desc' } },
  { name: 'zIndex', group: 'interface', default: defProp.zIndex, control: { kind: 'number' },
    i18n: { labelKey: 'param.zIndex.label', descKey: 'param.zIndex.desc' } },
  { name: 'radius', group: 'interface', default: defProp.radius, control: { kind: 'slider', min: 0, max: 32, step: 1 },
    i18n: { labelKey: 'param.radius.label', descKey: 'param.radius.desc' } },
  { name: 'edge', group: 'interface', default: defProp.edge, control: { kind: 'slider', min: 0, max: 64, step: 1 },
    i18n: { labelKey: 'param.edge.label', descKey: 'param.edge.desc' } },
  { name: 'loop', group: 'interface', default: defProp.loop, control: { kind: 'switch' },
    i18n: { labelKey: 'param.loop.label', descKey: 'param.loop.desc' } },
  { name: 'hideOnScroll', group: 'interface', default: defProp.hideOnScroll, desktopOnly: true, control: { kind: 'switch' },
    i18n: { labelKey: 'param.hideOnScroll.label', descKey: 'param.hideOnScroll.desc' } },
  { name: 'coverVisible', group: 'interface', default: defProp.coverVisible, desktopOnly: true, control: { kind: 'switch' },
    i18n: { labelKey: 'param.coverVisible.label', descKey: 'param.coverVisible.desc' } },

  // Controlled
  { name: 'browsing', group: 'controlled', default: undefined, control: { kind: 'switch' },
    i18n: { labelKey: 'param.browsing.label', descKey: 'param.browsing.desc' } },
]
```

- [ ] **Step 2: Sanity-check that `BaseType` keys still match**

Run: `pnpm --filter react-zmage-home exec tsc --noEmit`
Expected: zero errors. If a `name` field reports "is not assignable to keyof BaseType", the prop was renamed/removed in `packages/core` — update the schema entry to match.

- [ ] **Step 3: Commit**

```bash
git add packages/home/src/schema/param-schema.ts
git commit -m "feat(home): param-schema scalar groups"
```

---

### Task 17: Schema (Controller / HotKey / Animate / Lifecycle) + bilingual i18n keys

**Files:**
- Modify: `packages/home/src/schema/param-schema.ts`
- Modify: `packages/home/src/i18n/zh-CN.ts`
- Modify: `packages/home/src/i18n/en.ts`

- [ ] **Step 1: Append entries to PARAM_SCHEMA**

```ts
  // Controller
  { name: 'controller', group: 'controller', default: defPreset.desktop.controller, control: { kind: 'object', component: 'controller' },
    i18n: { labelKey: 'param.controller.label', descKey: 'param.controller.desc' } },

  // HotKey
  { name: 'hotKey', group: 'hotkey', default: defPreset.desktop.hotKey, control: { kind: 'object', component: 'hotkey' },
    i18n: { labelKey: 'param.hotKey.label', descKey: 'param.hotKey.desc' } },

  // Animate
  { name: 'animate', group: 'animate', default: defPreset.desktop.animate, control: { kind: 'object', component: 'animate' },
    i18n: { labelKey: 'param.animate.label', descKey: 'param.animate.desc' } },

  // Lifecycle
  { name: 'onBrowsing', group: 'lifecycle', default: undefined, control: { kind: 'callback', events: ['onBrowsing'] },
    i18n: { labelKey: 'param.onBrowsing.label', descKey: 'param.onBrowsing.desc' } },
  { name: 'onZooming', group: 'lifecycle', default: undefined, control: { kind: 'callback', events: ['onZooming'] },
    i18n: { labelKey: 'param.onZooming.label', descKey: 'param.onZooming.desc' } },
  { name: 'onSwitching', group: 'lifecycle', default: undefined, control: { kind: 'callback', events: ['onSwitching'] },
    i18n: { labelKey: 'param.onSwitching.label', descKey: 'param.onSwitching.desc' } },
  { name: 'onRotating', group: 'lifecycle', default: undefined, control: { kind: 'callback', events: ['onRotating'] },
    i18n: { labelKey: 'param.onRotating.label', descKey: 'param.onRotating.desc' } },
```

- [ ] **Step 2: Append schema-related keys to `zh-CN.ts`**

```ts
  // Preset values
  'preset.desktop': '桌面端',
  'preset.mobile': '移动端',
  'preset.none': '无',

  // Animate flip values
  'animate.flip.fade': '淡入淡出',
  'animate.flip.crossFade': '交叉淡入',
  'animate.flip.swipe': '滑动',
  'animate.flip.zoom': '缩放',

  // ControllerSet keys
  'controller.pagination': '分页指示器',
  'controller.rotate': '旋转',
  'controller.rotateLeft': '左旋',
  'controller.rotateRight': '右旋',
  'controller.zoom': '缩放',
  'controller.download': '下载',
  'controller.close': '关闭',
  'controller.flip': '翻页',
  'controller.flipLeft': '上一张',
  'controller.flipRight': '下一张',

  // HotKey keys
  'hotkey.close': '关闭(ESC)',
  'hotkey.zoom': '缩放(空格)',
  'hotkey.flip': '翻页(←/→)',

  // Param labels & descs
  'param.src.label': 'src',
  'param.src.desc': '图片地址,必填项。',
  'param.alt.label': 'alt',
  'param.alt.desc': '图片标题,作为大图查看时的标题显示。',
  'param.txt.label': 'txt',
  'param.txt.desc': '图片描述,大图下方的辅助文案。',
  'param.set.label': 'set',
  'param.set.desc': '图片集合;传入后启用画廊模式,左右键翻页。',
  'param.defaultPage.label': 'defaultPage',
  'param.defaultPage.desc': '初始页索引,从 0 开始。',
  'param.preset.label': 'preset',
  'param.preset.desc': '预设方案,决定 controller / hotKey / animate 的默认值。',
  'param.backdrop.label': 'backdrop',
  'param.backdrop.desc': '查看器背景颜色,任意有效 CSS 颜色字符串。',
  'param.zIndex.label': 'zIndex',
  'param.zIndex.desc': '查看器层级。',
  'param.radius.label': 'radius',
  'param.radius.desc': '图片圆角,单位 px。',
  'param.edge.label': 'edge',
  'param.edge.desc': '图片到视口的最小边距,单位 px。',
  'param.loop.label': 'loop',
  'param.loop.desc': '到达末尾时是否循环回到第一张。',
  'param.hideOnScroll.label': 'hideOnScroll',
  'param.hideOnScroll.desc': '滚动页面时自动关闭查看器。',
  'param.coverVisible.label': 'coverVisible',
  'param.coverVisible.desc': '查看时保留封面图。',
  'param.controller.label': 'controller',
  'param.controller.desc': '控制器按钮开关;传 false 关闭整组,或传部分对象覆盖默认。',
  'param.hotKey.label': 'hotKey',
  'param.hotKey.desc': '快捷键开关。',
  'param.animate.label': 'animate',
  'param.animate.desc': '动画配置:浏览动画 + 翻页动画。',
  'param.onBrowsing.label': 'onBrowsing',
  'param.onBrowsing.desc': '查看器打开/关闭时回调,参数 boolean。',
  'param.onZooming.label': 'onZooming',
  'param.onZooming.desc': '进入/退出放大模式时回调,参数 boolean。',
  'param.onSwitching.label': 'onSwitching',
  'param.onSwitching.desc': '翻页时回调,参数为新页索引。',
  'param.onRotating.label': 'onRotating',
  'param.onRotating.desc': '旋转时回调,参数为角度。',
  'param.browsing.label': 'browsing',
  'param.browsing.desc': '受控的浏览状态;给值即转为受控模式,需要配套 onBrowsing。',
```

- [ ] **Step 3: Append the same keys (English) to `en.ts`**

Use English strings for each key. Keep label values verbatim (`src`, `alt`, etc. — they're API names). For descs, mirror Chinese meaning. (Translate every key added in Step 2.)

Example:
```ts
  'preset.desktop': 'Desktop',
  'preset.mobile': 'Mobile',
  'preset.none': 'None',
  'animate.flip.fade': 'Fade',
  'animate.flip.crossFade': 'Cross fade',
  'animate.flip.swipe': 'Swipe',
  'animate.flip.zoom': 'Zoom',
  'controller.pagination': 'Pagination',
  'controller.rotate': 'Rotate',
  'controller.rotateLeft': 'Rotate left',
  'controller.rotateRight': 'Rotate right',
  'controller.zoom': 'Zoom',
  'controller.download': 'Download',
  'controller.close': 'Close',
  'controller.flip': 'Flip',
  'controller.flipLeft': 'Previous',
  'controller.flipRight': 'Next',
  'hotkey.close': 'Close (ESC)',
  'hotkey.zoom': 'Zoom (Space)',
  'hotkey.flip': 'Flip (←/→)',
  'param.src.label': 'src',
  'param.src.desc': 'Image URL. Required.',
  'param.alt.label': 'alt',
  'param.alt.desc': 'Image title, shown above the viewer.',
  'param.txt.label': 'txt',
  'param.txt.desc': 'Caption shown below the viewer.',
  'param.set.label': 'set',
  'param.set.desc': 'Multi-image set; enables gallery mode with arrow-key navigation.',
  'param.defaultPage.label': 'defaultPage',
  'param.defaultPage.desc': 'Initial page index (0-based).',
  'param.preset.label': 'preset',
  'param.preset.desc': 'Preset bundle; drives default values for controller / hotKey / animate.',
  'param.backdrop.label': 'backdrop',
  'param.backdrop.desc': 'Viewer backdrop color. Any valid CSS color.',
  'param.zIndex.label': 'zIndex',
  'param.zIndex.desc': 'Stacking level for the viewer.',
  'param.radius.label': 'radius',
  'param.radius.desc': 'Image corner radius (px).',
  'param.edge.label': 'edge',
  'param.edge.desc': 'Minimum margin between image and viewport (px).',
  'param.loop.label': 'loop',
  'param.loop.desc': 'Loop back to the first image when reaching the end.',
  'param.hideOnScroll.label': 'hideOnScroll',
  'param.hideOnScroll.desc': 'Close the viewer when the page scrolls.',
  'param.coverVisible.label': 'coverVisible',
  'param.coverVisible.desc': 'Keep the cover image visible while browsing.',
  'param.controller.label': 'controller',
  'param.controller.desc': 'Control-bar buttons. Pass false to disable all, or a partial object to override.',
  'param.hotKey.label': 'hotKey',
  'param.hotKey.desc': 'Keyboard shortcuts.',
  'param.animate.label': 'animate',
  'param.animate.desc': 'Animation config: browsing animation + flip animation.',
  'param.onBrowsing.label': 'onBrowsing',
  'param.onBrowsing.desc': 'Fired when the viewer opens/closes (boolean).',
  'param.onZooming.label': 'onZooming',
  'param.onZooming.desc': 'Fired when entering/leaving zoom mode (boolean).',
  'param.onSwitching.label': 'onSwitching',
  'param.onSwitching.desc': 'Fired on page change (new page index).',
  'param.onRotating.label': 'onRotating',
  'param.onRotating.desc': 'Fired on rotation (degrees).',
  'param.browsing.label': 'browsing',
  'param.browsing.desc': 'Controlled browsing state. Providing this switches to controlled mode; pair with onBrowsing.',
```

- [ ] **Step 4: TypeScript check**

Run from repo root: `pnpm --filter react-zmage-home exec tsc --noEmit`
Expected: zero errors. Any "key X missing" error in `en.ts` indicates dictionaries are out of sync — fix by adding the missing key.

- [ ] **Step 5: Commit**

```bash
git add packages/home/src/schema/param-schema.ts packages/home/src/i18n/zh-CN.ts packages/home/src/i18n/en.ts
git commit -m "feat(home): finish param-schema + bilingual i18n keys"
```

---

## Phase 5 — Playground

### Task 18: Playground shell + ParamPanel + ScalarControl

**Files:**
- Modify: `packages/home/src/routes/Playground.tsx`
- Create: `packages/home/src/routes/playground/ComponentMode.tsx`
- Create: `packages/home/src/routes/playground/ImperativeMode.tsx`
- Create: `packages/home/src/routes/playground/WrapperMode.tsx`
- Create: `packages/home/src/playground/ParamPanel.tsx`
- Create: `packages/home/src/playground/controls/ScalarControl.tsx`

- [ ] **Step 1: Create `playground/controls/ScalarControl.tsx`**

```tsx
import * as React from 'react'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import type { ParamDef } from '@/schema/param-schema'
import { useT } from '@/i18n/useT'

type Props = { def: ParamDef; value: any; onChange: (v: any) => void }

export function ScalarControl ({ def, value, onChange }: Props) {
  const { t } = useT()
  const c = def.control
  if (c.kind === 'switch') {
    return <Switch checked={!!value} onCheckedChange={onChange} />
  }
  if (c.kind === 'number') {
    return (
      <Input
        type="number"
        value={value ?? ''}
        onChange={e => onChange(e.target.value === '' ? undefined : Number(e.target.value))}
        className="h-8 w-24"
      />
    )
  }
  if (c.kind === 'text') {
    return <Input value={value ?? ''} onChange={e => onChange(e.target.value)} className="h-8" />
  }
  if (c.kind === 'slider') {
    return (
      <div className="flex items-center gap-3">
        <Slider min={c.min} max={c.max} step={c.step ?? 1} value={[Number(value ?? 0)]} onValueChange={(v) => onChange(v[0])} className="flex-1" />
        <Input
          type="number"
          value={value ?? 0}
          onChange={e => onChange(Number(e.target.value))}
          className="h-8 w-16"
        />
      </div>
    )
  }
  if (c.kind === 'select') {
    return (
      <Select value={String(value ?? '')} onValueChange={onChange}>
        <SelectTrigger className="h-8">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {c.options.map(o => <SelectItem key={o.value} value={o.value}>{t(o.labelKey)}</SelectItem>)}
        </SelectContent>
      </Select>
    )
  }
  if (c.kind === 'segmented') {
    return (
      <Tabs value={String(value ?? '')} onValueChange={onChange}>
        <TabsList className="h-8">
          {c.options.map(o => <TabsTrigger key={o.value} value={o.value} className="h-7 text-xs">{t(o.labelKey)}</TabsTrigger>)}
        </TabsList>
      </Tabs>
    )
  }
  if (c.kind === 'color') {
    const PRESETS = ['#0a0a0a', '#fafafa', 'rgba(0,0,0,0.85)', 'rgba(255,255,255,0.9)']
    return (
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex h-8 items-center gap-2 rounded-md border border-input px-2 text-xs">
            <span className="h-4 w-4 rounded border" style={{ backgroundColor: value || '#fff' }} />
            <span className="font-mono">{value || ''}</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-56 space-y-2 p-3">
          <Input value={value ?? ''} onChange={e => onChange(e.target.value)} className="h-8" />
          <div className="flex gap-1.5">
            {PRESETS.map(p => (
              <button key={p} onClick={() => onChange(p)} className="h-6 w-6 rounded border" style={{ backgroundColor: p }} aria-label={p} />
            ))}
          </div>
        </PopoverContent>
      </Popover>
    )
  }
  return null
}
```

- [ ] **Step 2: Create `playground/ParamPanel.tsx`**

```tsx
import * as React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { PARAM_SCHEMA, type ParamDef, type ParamGroup } from '@/schema/param-schema'
import { useT } from '@/i18n/useT'
import { ScalarControl } from './controls/ScalarControl'
import { ControllerControl } from './controls/ControllerControl'
import { HotKeyControl } from './controls/HotKeyControl'
import { AnimateControl } from './controls/AnimateControl'
import { SetControl } from './controls/SetControl'
import { CallbackControl } from './controls/CallbackControl'

const GROUP_ORDER: ParamGroup[] = ['data', 'preset', 'interface', 'controller', 'hotkey', 'animate', 'lifecycle', 'controlled']
const GROUP_LABELS: Record<ParamGroup, 'group.data' | 'group.preset' | 'group.interface' | 'group.controller' | 'group.hotkey' | 'group.animate' | 'group.lifecycle' | 'group.controlled'> = {
  data: 'group.data',
  preset: 'group.preset',
  interface: 'group.interface',
  controller: 'group.controller',
  hotkey: 'group.hotkey',
  animate: 'group.animate',
  lifecycle: 'group.lifecycle',
  controlled: 'group.controlled',
}

type Props = {
  values: Record<string, any>
  onChange: (name: string, value: any) => void
}

function renderControl (def: ParamDef, value: any, onChange: (v: any) => void) {
  const c = def.control
  if (c.kind === 'object') {
    if (c.component === 'controller') return <ControllerControl value={value} onChange={onChange} />
    if (c.component === 'hotkey') return <HotKeyControl value={value} onChange={onChange} />
    if (c.component === 'animate') return <AnimateControl value={value} onChange={onChange} />
    if (c.component === 'set') return <SetControl value={value} onChange={onChange} />
  }
  if (c.kind === 'callback') {
    return <CallbackControl events={c.events} value={value} onChange={onChange} />
  }
  return <ScalarControl def={def} value={value} onChange={onChange} />
}

export function ParamPanel ({ values, onChange }: Props) {
  const { t } = useT()
  const grouped = React.useMemo(() => {
    const map = new Map<ParamGroup, ParamDef[]>()
    for (const g of GROUP_ORDER) map.set(g, [])
    for (const def of PARAM_SCHEMA) map.get(def.group)!.push(def)
    return map
  }, [])

  return (
    <Accordion type="multiple" defaultValue={GROUP_ORDER as string[]} className="w-full">
      {GROUP_ORDER.map(group => {
        const items = grouped.get(group)!
        if (items.length === 0) return null
        return (
          <AccordionItem key={group} value={group} className="border-border/60">
            <AccordionTrigger className="px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {t(GROUP_LABELS[group])}
            </AccordionTrigger>
            <AccordionContent className="space-y-3 px-3 pb-3">
              {items.map(def => (
                <div key={def.name} className="grid grid-cols-[120px_1fr] items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs">{def.name}</span>
                    {def.required && <Badge variant="destructive" className="h-4 px-1 text-[9px]">*</Badge>}
                    {def.desktopOnly && <Badge variant="secondary" className="h-4 px-1 text-[9px]">D</Badge>}
                  </div>
                  <div>{renderControl(def, values[def.name], (v) => onChange(def.name, v))}</div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}
```

- [ ] **Step 3: Create stub object-control files** so ParamPanel compiles. (Filled out in Task 19.)

`packages/home/src/playground/controls/ControllerControl.tsx`:
```tsx
export function ControllerControl ({ value, onChange }: { value: any; onChange: (v: any) => void }) {
  return <div className="text-xs text-muted-foreground">controller (todo)</div>
}
```

Repeat (rename + same body) for `HotKeyControl.tsx`, `AnimateControl.tsx`, `SetControl.tsx`, `CallbackControl.tsx`. Each exports a function named after its file.

- [ ] **Step 4: Build Playground shell `routes/Playground.tsx`**

```tsx
import * as React from 'react'
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import { RotateCcw, Share2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useT } from '@/i18n/useT'
import { cn } from '@/lib/utils'
import { ParamPanel } from '@/playground/ParamPanel'
import { PARAM_SCHEMA } from '@/schema/param-schema'
import ComponentMode from './playground/ComponentMode'
import ImperativeMode from './playground/ImperativeMode'
import WrapperMode from './playground/WrapperMode'

function defaultValues () {
  const v: Record<string, any> = {}
  for (const def of PARAM_SCHEMA) v[def.name] = def.default
  return v
}

const TABS = [
  { to: '', labelKey: 'pg.tab.component' as const, end: true },
  { to: 'imperative', labelKey: 'pg.tab.imperative' as const, end: false },
  { to: 'wrapper', labelKey: 'pg.tab.wrapper' as const, end: false },
]

export default function Playground () {
  const { t } = useT()
  const [values, setValues] = React.useState<Record<string, any>>(defaultValues)
  const [shared, setShared] = React.useState(false)
  const navigate = useNavigate()

  const onChange = React.useCallback((name: string, value: any) => {
    setValues(v => ({ ...v, [name]: value }))
  }, [])

  const onReset = React.useCallback(() => setValues(defaultValues()), [])

  const onShare = React.useCallback(async () => {
    // wired up properly in Task 22
    await navigator.clipboard.writeText(window.location.href)
    setShared(true)
    setTimeout(() => setShared(false), 1500)
  }, [])

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{t('pg.title')}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t('pg.subtitle')}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onReset}>
            <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> {t('pg.reset')}
          </Button>
          <Button variant="outline" size="sm" onClick={onShare}>
            {shared ? <Check className="mr-1.5 h-3.5 w-3.5" /> : <Share2 className="mr-1.5 h-3.5 w-3.5" />}
            {shared ? t('pg.shared') : t('pg.share')}
          </Button>
        </div>
      </div>

      <div className="mb-6 inline-flex rounded-lg border border-border bg-muted/30 p-1">
        {TABS.map(tab => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) =>
              cn(
                'rounded-md px-3 py-1.5 text-sm transition-colors',
                isActive ? 'bg-background text-foreground shadow' : 'text-muted-foreground hover:text-foreground',
              )
            }
          >
            {t(tab.labelKey)}
          </NavLink>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        <aside className="rounded-lg border border-border bg-card/30 py-1">
          <ParamPanel values={values} onChange={onChange} />
        </aside>
        <section className="min-w-0">
          <Routes>
            <Route index element={<ComponentMode values={values} />} />
            <Route path="imperative" element={<ImperativeMode values={values} />} />
            <Route path="wrapper" element={<WrapperMode values={values} />} />
          </Routes>
        </section>
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Stub the three mode files**

`routes/playground/ComponentMode.tsx`:
```tsx
export default function ComponentMode ({ values }: { values: Record<string, any> }) {
  return <div className="text-sm text-muted-foreground">Component mode (preview comes in Task 20)</div>
}
```
Same shape for `ImperativeMode.tsx` and `WrapperMode.tsx`.

- [ ] **Step 6: Verify in dev**

Visit `/playground`. Left panel renders all groups with collapsible accordion. Tweaking sliders/switches updates internal state (no preview yet). Tabs route between three placeholders.

- [ ] **Step 7: Commit**

```bash
git add packages/home/src/routes/Playground.tsx packages/home/src/routes/playground/ packages/home/src/playground/
git commit -m "feat(home): playground shell with param panel + scalar controls"
```

---

### Task 19: Object controls (Controller / HotKey / Animate / Set / Preset / Callback)

**Files:**
- Modify: `packages/home/src/playground/controls/ControllerControl.tsx`
- Modify: `packages/home/src/playground/controls/HotKeyControl.tsx`
- Modify: `packages/home/src/playground/controls/AnimateControl.tsx`
- Modify: `packages/home/src/playground/controls/SetControl.tsx`
- Modify: `packages/home/src/playground/controls/CallbackControl.tsx`

- [ ] **Step 1: Implement `ControllerControl`**

```tsx
import { Switch } from '@/components/ui/switch'
import { useT } from '@/i18n/useT'
import type { I18nKey } from '@/i18n/dict'

type ControllerSet = Record<string, boolean | string | undefined>

const KEYS: { key: keyof ControllerSet; labelKey: I18nKey }[] = [
  { key: 'pagination', labelKey: 'controller.pagination' },
  { key: 'rotate', labelKey: 'controller.rotate' },
  { key: 'rotateLeft', labelKey: 'controller.rotateLeft' },
  { key: 'rotateRight', labelKey: 'controller.rotateRight' },
  { key: 'zoom', labelKey: 'controller.zoom' },
  { key: 'download', labelKey: 'controller.download' },
  { key: 'close', labelKey: 'controller.close' },
  { key: 'flip', labelKey: 'controller.flip' },
  { key: 'flipLeft', labelKey: 'controller.flipLeft' },
  { key: 'flipRight', labelKey: 'controller.flipRight' },
]

export function ControllerControl ({ value, onChange }: { value: ControllerSet | boolean | undefined; onChange: (v: any) => void }) {
  const { t } = useT()
  const obj: ControllerSet = (typeof value === 'object' && value) ? value : {}
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
      {KEYS.map(({ key, labelKey }) => (
        <label key={String(key)} className="flex items-center justify-between gap-2 text-xs">
          <span>{t(labelKey)}</span>
          <Switch
            checked={!!obj[key]}
            onCheckedChange={(checked) => onChange({ ...obj, [key]: checked })}
          />
        </label>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Implement `HotKeyControl`**

```tsx
import { Switch } from '@/components/ui/switch'
import { useT } from '@/i18n/useT'

type HotKey = { close?: boolean; zoom?: boolean; flip?: boolean }

export function HotKeyControl ({ value, onChange }: { value: HotKey | boolean | undefined; onChange: (v: any) => void }) {
  const { t } = useT()
  const obj: HotKey = (typeof value === 'object' && value) ? value : {}
  return (
    <div className="grid gap-2">
      {(['close', 'zoom', 'flip'] as const).map(k => (
        <label key={k} className="flex items-center justify-between gap-2 text-xs">
          <span>{t(`hotkey.${k}` as any)}</span>
          <Switch checked={!!obj[k]} onCheckedChange={c => onChange({ ...obj, [k]: c })} />
        </label>
      ))}
    </div>
  )
}
```

- [ ] **Step 3: Implement `AnimateControl`**

```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useT } from '@/i18n/useT'
import type { I18nKey } from '@/i18n/dict'

type Animate = { browsing?: boolean; flip?: 'fade' | 'crossFade' | 'swipe' | 'zoom' }

const FLIP_OPTIONS: { value: Animate['flip']; labelKey: I18nKey }[] = [
  { value: 'fade', labelKey: 'animate.flip.fade' },
  { value: 'crossFade', labelKey: 'animate.flip.crossFade' },
  { value: 'swipe', labelKey: 'animate.flip.swipe' },
  { value: 'zoom', labelKey: 'animate.flip.zoom' },
]

export function AnimateControl ({ value, onChange }: { value: Animate | boolean | undefined; onChange: (v: any) => void }) {
  const { t } = useT()
  const obj: Animate = (typeof value === 'object' && value) ? value : {}
  return (
    <div className="grid gap-2 text-xs">
      <label className="flex items-center justify-between gap-2">
        <span>browsing</span>
        <Switch checked={!!obj.browsing} onCheckedChange={c => onChange({ ...obj, browsing: c })} />
      </label>
      <label className="flex items-center justify-between gap-2">
        <span>flip</span>
        <Select value={obj.flip ?? 'fade'} onValueChange={(v) => onChange({ ...obj, flip: v })}>
          <SelectTrigger className="h-7 w-32"><SelectValue /></SelectTrigger>
          <SelectContent>
            {FLIP_OPTIONS.map(o => <SelectItem key={o.value} value={o.value!}>{t(o.labelKey)}</SelectItem>)}
          </SelectContent>
        </Select>
      </label>
    </div>
  )
}
```

- [ ] **Step 4: Implement `SetControl`**

```tsx
import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useT } from '@/i18n/useT'

type SetItem = { src: string; alt?: string }

export function SetControl ({ value, onChange }: { value: SetItem[] | undefined; onChange: (v: SetItem[]) => void }) {
  const { t } = useT()
  const items: SetItem[] = Array.isArray(value) ? value : []
  const update = (i: number, patch: Partial<SetItem>) => {
    const next = items.slice()
    next[i] = { ...next[i], ...patch }
    onChange(next)
  }
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i))
  const add = () => onChange([...items, { src: '', alt: '' }])
  return (
    <div className="space-y-2">
      {items.map((it, i) => (
        <div key={i} className="grid grid-cols-[40px_1fr_1fr_auto] items-center gap-2">
          <div className="h-10 w-10 overflow-hidden rounded border border-border bg-muted">
            {it.src && <img src={it.src} alt="" className="h-full w-full object-cover" />}
          </div>
          <Input value={it.src} onChange={e => update(i, { src: e.target.value })} placeholder="src" className="h-8 text-xs" />
          <Input value={it.alt ?? ''} onChange={e => update(i, { alt: e.target.value })} placeholder="alt" className="h-8 text-xs" />
          <Button size="icon" variant="ghost" onClick={() => remove(i)} aria-label={t('common.remove')}>
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ))}
      <Button size="sm" variant="outline" onClick={add}>
        <Plus className="mr-1 h-3.5 w-3.5" /> {t('common.add')}
      </Button>
    </div>
  )
}
```

- [ ] **Step 5: Implement `CallbackControl`**

```tsx
import { Switch } from '@/components/ui/switch'

type Props = { events: string[]; value: ((...a: any[]) => void) | undefined; onChange: (v: any) => void }

export function CallbackControl ({ events, value, onChange }: Props) {
  const enabled = typeof value === 'function' && (value as any).__zmageLog === true
  return (
    <Switch
      checked={enabled}
      onCheckedChange={(c) => {
        if (c) {
          const name = events[0]
          const fn: any = (...args: any[]) => {
            window.dispatchEvent(new CustomEvent('zmage-pg-event', { detail: { name, args } }))
          }
          fn.__zmageLog = true
          fn.__name = name
          onChange(fn)
        } else {
          onChange(undefined)
        }
      }}
    />
  )
}
```

(Callbacks fan out via a `CustomEvent` so the EventLog can subscribe regardless of which mode tab is active. The schema's `events[0]` is used to label entries.)

- [ ] **Step 6: Verify in dev**

Visit `/playground`. Each accordion group reveals its bespoke control. Toggle some `controller` keys, change `animate.flip`, add a set entry, flip a callback toggle.

- [ ] **Step 7: Commit**

```bash
git add packages/home/src/playground/controls/
git commit -m "feat(home): bespoke controls for object-shaped props"
```

---

### Task 20: CodeSnippet + Preview (Component mode)

**Files:**
- Create: `packages/home/src/playground/CodeSnippet.tsx`
- Modify: `packages/home/src/routes/playground/ComponentMode.tsx`

- [ ] **Step 1: Create `playground/CodeSnippet.tsx`**

```tsx
import * as React from 'react'
import { CodeBlock } from '@/components/CodeBlock'
import { PARAM_SCHEMA } from '@/schema/param-schema'

type Mode = 'component' | 'imperative' | 'wrapper'

function isCallback (v: any) {
  return typeof v === 'function' && v?.__zmageLog === true
}

function isDefault (name: string, value: any) {
  const def = PARAM_SCHEMA.find(d => d.name === name)
  if (!def) return true
  // Treat object-equality only for primitives; for objects do shallow JSON compare.
  if (value === undefined) return true
  if (typeof value === 'object') {
    try { return JSON.stringify(value) === JSON.stringify(def.default) } catch { return false }
  }
  return value === def.default
}

function formatValue (v: any): string {
  if (typeof v === 'string') return JSON.stringify(v)
  if (typeof v === 'function') {
    return `(...args) => console.info(args)`
  }
  return JSON.stringify(v, null, 2)
}

export function buildPropsObject (values: Record<string, any>) {
  const out: Record<string, any> = {}
  for (const def of PARAM_SCHEMA) {
    const v = values[def.name]
    if (def.required) { out[def.name] = v ?? '' ; continue }
    if (isDefault(def.name, v)) continue
    out[def.name] = v
  }
  return out
}

function renderJsx (values: Record<string, any>) {
  const props = buildPropsObject(values)
  const lines: string[] = ['<Zmage']
  for (const [k, v] of Object.entries(props)) {
    if (typeof v === 'string' && !v.includes('\n')) {
      lines.push(`  ${k}=${JSON.stringify(v)}`)
    } else if (isCallback(v)) {
      lines.push(`  ${k}={(...args) => console.info('${k}', args)}`)
    } else {
      lines.push(`  ${k}={${formatValue(v)}}`)
    }
  }
  lines.push('/>')
  return lines.join('\n')
}

function renderImperative (values: Record<string, any>) {
  const props = buildPropsObject(values)
  return [
    `import Zmage from 'react-zmage'`,
    ``,
    `Zmage.browsing(${JSON.stringify(props, null, 2)})`,
  ].join('\n')
}

function renderWrapper (values: Record<string, any>) {
  const props = buildPropsObject(values)
  const propsStr = Object.entries(props)
    .map(([k, v]) => typeof v === 'string' ? `${k}=${JSON.stringify(v)}` : `${k}={${formatValue(v)}}`)
    .join(' ')
  return [
    `<Zmage.Wrapper${propsStr ? ' ' + propsStr : ''}>`,
    `  <article dangerouslySetInnerHTML={{ __html: html }} />`,
    `</Zmage.Wrapper>`,
  ].join('\n')
}

export function CodeSnippet ({ values, mode }: { values: Record<string, any>; mode: Mode }) {
  const code = mode === 'component' ? renderJsx(values)
    : mode === 'imperative' ? renderImperative(values)
    : renderWrapper(values)
  return <CodeBlock code={code} language={'tsx' as any} />
}
```

- [ ] **Step 2: Implement `routes/playground/ComponentMode.tsx`**

```tsx
import Zmage from 'react-zmage'
import { CodeSnippet } from '@/playground/CodeSnippet'
import { buildPropsObject } from '@/playground/CodeSnippet'
import { useT } from '@/i18n/useT'
import { EventLog } from '@/playground/EventLog'

const FALLBACK_SET = [
  { src: '/imgSet/childsDream/1.jpg', alt: '童夢 · ONE' },
  { src: '/imgSet/childsDream/2.jpg', alt: '童夢 · TWO' },
]

export default function ComponentMode ({ values }: { values: Record<string, any> }) {
  const { t } = useT()
  const props = buildPropsObject(values)
  const safeProps = {
    ...props,
    src: props.src || '/imgSet/childsDream/1.jpg',
    set: props.set?.length ? props.set : FALLBACK_SET,
  }
  return (
    <div className="space-y-6">
      <CodeSnippet values={values} mode="component" />
      <div className="rounded-lg border border-border bg-card/30 p-6">
        <div className="mx-auto max-w-md">
          <Zmage {...(safeProps as any)} className="w-full rounded-md" />
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">{t('pg.preview.tip')}</p>
      </div>
      <EventLog />
    </div>
  )
}
```

- [ ] **Step 3: Stub `EventLog.tsx`** (filled out in Task 21)

`packages/home/src/playground/EventLog.tsx`:
```tsx
export function EventLog () { return null }
```

- [ ] **Step 4: Verify in dev**

`/playground` → Component tab → CodeSnippet shows only non-default props; preview renders a Zmage; clicking opens viewer; toggling `radius`/`backdrop` updates both code and preview.

- [ ] **Step 5: Commit**

```bash
git add packages/home/src/playground/CodeSnippet.tsx packages/home/src/playground/EventLog.tsx packages/home/src/routes/playground/ComponentMode.tsx
git commit -m "feat(home): playground component mode with live code + preview"
```

---

### Task 21: Imperative + Wrapper modes + EventLog

**Files:**
- Modify: `packages/home/src/routes/playground/ImperativeMode.tsx`
- Modify: `packages/home/src/routes/playground/WrapperMode.tsx`
- Modify: `packages/home/src/playground/EventLog.tsx`

- [ ] **Step 1: Implement `EventLog.tsx`**

```tsx
import * as React from 'react'
import { useT } from '@/i18n/useT'

type Entry = { ts: string; name: string; args: any[] }

export function EventLog () {
  const { t } = useT()
  const [entries, setEntries] = React.useState<Entry[]>([])
  React.useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { name: string; args: any[] }
      setEntries(prev => [
        { ts: new Date().toLocaleTimeString(), name: detail.name, args: detail.args },
        ...prev,
      ].slice(0, 50))
    }
    window.addEventListener('zmage-pg-event', handler)
    return () => window.removeEventListener('zmage-pg-event', handler)
  }, [])
  return (
    <div className="rounded-lg border border-border bg-card/30">
      <div className="border-b border-border px-3 py-2 text-xs font-medium text-muted-foreground">{t('pg.events.title')}</div>
      <div className="max-h-48 overflow-y-auto p-3 font-mono text-xs">
        {entries.length === 0
          ? <div className="text-muted-foreground">{t('pg.events.empty')}</div>
          : entries.map((e, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-muted-foreground">{e.ts}</span>
                <span>{e.name}</span>
                <span className="truncate text-muted-foreground">{JSON.stringify(e.args)}</span>
              </div>
            ))}
      </div>
    </div>
  )
}
```

EventLog reads `detail.name` directly because `CallbackControl` (Task 19 Step 5) already dispatches it.

- [ ] **Step 2: Implement `ImperativeMode.tsx`**

```tsx
import * as React from 'react'
import Zmage from 'react-zmage'
import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'
import { CodeSnippet } from '@/playground/CodeSnippet'
import { buildPropsObject } from '@/playground/CodeSnippet'
import { EventLog } from '@/playground/EventLog'
import { useT } from '@/i18n/useT'

export default function ImperativeMode ({ values }: { values: Record<string, any> }) {
  const { t } = useT()
  const destructorRef = React.useRef<(() => void) | null>(null)
  const onTrigger = () => {
    destructorRef.current?.()
    const props = buildPropsObject(values)
    if (!props.src && (!props.set || props.set.length === 0)) {
      props.src = '/imgSet/childsDream/1.jpg'
    }
    destructorRef.current = (Zmage as any).browsing(props)
  }
  React.useEffect(() => () => { destructorRef.current?.() }, [])

  return (
    <div className="space-y-6">
      <CodeSnippet values={values} mode="imperative" />
      <div className="flex justify-center rounded-lg border border-border bg-card/30 p-12">
        <Button size="lg" onClick={onTrigger}>
          <Play className="mr-2 h-4 w-4" /> {t('pg.preview.trigger')}
        </Button>
      </div>
      <EventLog />
    </div>
  )
}
```

- [ ] **Step 3: Implement `WrapperMode.tsx`**

```tsx
import Zmage from 'react-zmage'
import { CodeSnippet } from '@/playground/CodeSnippet'
import { buildPropsObject } from '@/playground/CodeSnippet'
import { EventLog } from '@/playground/EventLog'

export default function WrapperMode ({ values }: { values: Record<string, any> }) {
  const props = buildPropsObject(values)
  const Wrapper = (Zmage as any).Wrapper
  return (
    <div className="space-y-6">
      <CodeSnippet values={values} mode="wrapper" />
      <div className="rounded-lg border border-border bg-card/30 p-6">
        <Wrapper {...props}>
          <article className="prose prose-zinc dark:prose-invert mx-auto max-w-2xl">
            <p>Wrapper auto-attaches the viewer to every <code>&lt;img&gt;</code> below:</p>
            <p><img src="/imgSet/childsDream/1.jpg" alt="童夢 · ONE" /></p>
            <p><img src="/imgSet/childsDream/2.jpg" alt="童夢 · TWO" /></p>
            <p><img src="/imgSet/childsDream/3.jpg" alt="童夢 · THREE" /></p>
            <p className="text-xs text-muted-foreground">
              Note: Wrapper queries <code>img</code> in <code>componentDidMount</code> /
              <code>componentDidUpdate</code>. Imgs injected after the wrapper renders
              won't get bound until the wrapper re-renders.
            </p>
          </article>
        </Wrapper>
      </div>
      <EventLog />
    </div>
  )
}
```

(If the project doesn't have `@tailwindcss/typography`, drop the `prose` classes — text styling is fine without them.)

- [ ] **Step 4: Verify in dev**

- Component tab: zmage opens on cover click.
- Imperative tab: clicking "Trigger" opens viewer; toggling `onBrowsing` callback then triggering shows events.
- Wrapper tab: clicking inline imgs opens viewer.

- [ ] **Step 5: Commit**

```bash
git add packages/home/src/playground/EventLog.tsx packages/home/src/playground/controls/CallbackControl.tsx packages/home/src/routes/playground/
git commit -m "feat(home): playground imperative + wrapper modes + event log"
```

---

### Task 22: Reset + Share via URL hash

**Files:**
- Create: `packages/home/src/playground/shareState.ts`
- Modify: `packages/home/src/routes/Playground.tsx`

- [ ] **Step 1: Create `playground/shareState.ts`**

```ts
import { PARAM_SCHEMA } from '@/schema/param-schema'

// Hash format: #?key1=value1&key2=value2 (URL-encoded JSON for non-string values)

function isCallback (v: any) { return typeof v === 'function' && v?.__zmageLog === true }
function isDefault (name: string, v: any) {
  const def = PARAM_SCHEMA.find(d => d.name === name)
  if (!def) return true
  if (v === undefined) return true
  try { return JSON.stringify(v) === JSON.stringify(def.default) } catch { return false }
}

export function encodeStateToHash (values: Record<string, any>): string {
  const params = new URLSearchParams()
  for (const [k, v] of Object.entries(values)) {
    if (isDefault(k, v)) continue
    if (isCallback(v)) {
      params.set(k, '__log__')
      continue
    }
    if (typeof v === 'string') params.set(k, v)
    else params.set(k, JSON.stringify(v))
  }
  return '#?' + params.toString()
}

export function decodeStateFromHash (hash: string): Record<string, any> {
  const out: Record<string, any> = {}
  const q = hash.startsWith('#?') ? hash.slice(2) : hash.startsWith('#') ? hash.slice(1) : hash
  if (!q) return out
  const params = new URLSearchParams(q)
  for (const [k, raw] of params) {
    if (raw === '__log__') {
      const def = PARAM_SCHEMA.find(d => d.name === k)
      if (def?.control.kind === 'callback') {
        const fn: any = (...args: any[]) => {
          window.dispatchEvent(new CustomEvent('zmage-pg-event', { detail: { name: k, args } }))
        }
        fn.__zmageLog = true
        fn.__name = k
        out[k] = fn
      }
      continue
    }
    // Try JSON; fall back to raw string
    try { out[k] = JSON.parse(raw) }
    catch { out[k] = raw }
  }
  return out
}
```

- [ ] **Step 2: Wire into `Playground.tsx`**

Replace the Playground component body to hydrate from hash on mount and update hash on `onShare`:

```tsx
// imports: add at top
import { encodeStateToHash, decodeStateFromHash } from '@/playground/shareState'

// inside Playground():
const [values, setValues] = React.useState<Record<string, any>>(() => {
  const base = defaultValues()
  if (typeof window !== 'undefined') {
    const hydrated = decodeStateFromHash(window.location.hash)
    Object.assign(base, hydrated)
  }
  return base
})

const onShare = React.useCallback(async () => {
  const url = window.location.origin + window.location.pathname + encodeStateToHash(values)
  window.history.replaceState(null, '', url)
  await navigator.clipboard.writeText(url)
  setShared(true)
  setTimeout(() => setShared(false), 1500)
}, [values])
```

- [ ] **Step 3: Verify hash round-trip**

1. Open `/playground`, change `radius` to 12 and `backdrop` to `#0a0a0a`.
2. Click Share. URL becomes `.../playground#?radius=12&backdrop=%230a0a0a` and is in clipboard.
3. Open the copied URL in a new tab. The panel hydrates with `radius=12`, `backdrop=#0a0a0a`.
4. Click Reset. Values revert; hash stays (Reset deliberately does not clear hash — clearing would force a navigation; the next Share will overwrite).

- [ ] **Step 4: Commit**

```bash
git add packages/home/src/playground/shareState.ts packages/home/src/routes/Playground.tsx
git commit -m "feat(home): playground share-via-URL-hash + hydrate-from-hash"
```

---

## Phase 6 — Docs

### Task 23: Docs shell (sidebar + content + ToC) + Heading

**Files:**
- Modify: `packages/home/src/routes/Docs.tsx`
- Create: `packages/home/src/docs/Sidebar.tsx`
- Create: `packages/home/src/docs/Toc.tsx`
- Create: `packages/home/src/docs/Heading.tsx`

- [ ] **Step 1: Create `docs/Heading.tsx`**

```tsx
import * as React from 'react'
import { Link as LinkIcon } from 'lucide-react'

type Props = { id: string; level?: 2 | 3; children: React.ReactNode }

export function Heading ({ id, level = 2, children }: Props) {
  const Tag = (`h${level}` as any) as React.ElementType
  return (
    <Tag id={id} className="group scroll-mt-24 flex items-baseline gap-2">
      <span>{children}</span>
      <a
        href={`#${id}`}
        aria-label="Anchor"
        className="opacity-0 transition-opacity group-hover:opacity-60 hover:opacity-100"
        onClick={(e) => {
          e.preventDefault()
          window.history.replaceState(null, '', `#${id}`)
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }}
      >
        <LinkIcon className="h-3.5 w-3.5" />
      </a>
    </Tag>
  )
}
```

- [ ] **Step 2: Create `docs/Sidebar.tsx`**

```tsx
import { useT } from '@/i18n/useT'
import type { I18nKey } from '@/i18n/dict'
import { cn } from '@/lib/utils'

type Item = { id: string; labelKey: I18nKey }
type Group = { titleKey: I18nKey; items: Item[] }

export const SIDEBAR_GROUPS: Group[] = [
  {
    titleKey: 'docs.sidebar.gettingStarted',
    items: [
      { id: 'installation', labelKey: 'docs.sidebar.quickstart' },
      { id: 'ssr', labelKey: 'docs.sidebar.ssr' },
    ],
  },
  {
    titleKey: 'docs.sidebar.concepts',
    items: [
      { id: 'modes', labelKey: 'docs.sidebar.modes' },
    ],
  },
  {
    titleKey: 'docs.sidebar.props',
    items: [
      { id: 'props-data', labelKey: 'group.data' },
      { id: 'props-preset', labelKey: 'group.preset' },
      { id: 'props-interface', labelKey: 'group.interface' },
      { id: 'props-controller', labelKey: 'group.controller' },
      { id: 'props-hotkey', labelKey: 'group.hotkey' },
      { id: 'props-animate', labelKey: 'group.animate' },
      { id: 'props-lifecycle', labelKey: 'group.lifecycle' },
      { id: 'props-controlled', labelKey: 'group.controlled' },
    ],
  },
  {
    titleKey: 'docs.sidebar.recipes',
    items: [
      { id: 'examples', labelKey: 'docs.sidebar.examples' },
      { id: 'typescript', labelKey: 'docs.sidebar.typescript' },
    ],
  },
  {
    titleKey: 'docs.sidebar.reference',
    items: [
      { id: 'migration', labelKey: 'docs.sidebar.migration' },
    ],
  },
]

export function Sidebar ({ activeId }: { activeId: string }) {
  const { t } = useT()
  return (
    <nav className="space-y-6 text-sm">
      {SIDEBAR_GROUPS.map(g => (
        <div key={g.titleKey}>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t(g.titleKey)}</div>
          <ul className="space-y-1 border-l border-border/60">
            {g.items.map(it => {
              const active = it.id === activeId
              return (
                <li key={it.id}>
                  <a
                    href={`#${it.id}`}
                    className={cn(
                      '-ml-px block border-l-2 px-3 py-1 transition-colors',
                      active ? 'border-foreground text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {t(it.labelKey)}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}
```

- [ ] **Step 3: Create `docs/Toc.tsx`**

```tsx
import * as React from 'react'
import { cn } from '@/lib/utils'
import { useT } from '@/i18n/useT'

export function Toc ({ activeId }: { activeId: string }) {
  const { t } = useT()
  const [items, setItems] = React.useState<{ id: string; text: string; level: number }[]>([])
  React.useEffect(() => {
    const headings = Array.from(document.querySelectorAll('main h2[id], main h3[id]'))
    setItems(headings.map(h => ({
      id: h.id,
      text: h.textContent || '',
      level: Number(h.tagName[1]),
    })))
  }, [])
  return (
    <div className="text-sm">
      <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t('docs.toc.title')}</div>
      <ul className="space-y-1.5">
        {items.map(it => (
          <li key={it.id} className={cn(it.level === 3 && 'pl-3')}>
            <a href={`#${it.id}`} className={cn('block transition-colors', it.id === activeId ? 'text-foreground' : 'text-muted-foreground hover:text-foreground')}>
              {it.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function useScrollSpy (selector: string) {
  const [activeId, setActiveId] = React.useState<string>('')
  React.useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(selector))
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting)
                                .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: [0, 1] },
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [selector])
  return activeId
}
```

- [ ] **Step 4: Replace `routes/Docs.tsx`**

```tsx
import { Sidebar } from '@/docs/Sidebar'
import { Toc, useScrollSpy } from '@/docs/Toc'
import { Footer } from '@/components/Footer'
import { useT } from '@/i18n/useT'

export default function Docs () {
  const activeId = useScrollSpy('main h2[id], main h3[id]')
  const { t } = useT()
  return (
    <>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[220px_1fr_220px]">
        <aside className="hidden lg:block">
          <div className="sticky top-20">
            <Sidebar activeId={activeId} />
          </div>
        </aside>
        <main className="prose prose-zinc dark:prose-invert max-w-none">
          <h1 className="text-3xl font-semibold tracking-tight">{t('docs.title')}</h1>
          {/* sections wired in Tasks 24-25 */}
          <p className="text-muted-foreground">Sections coming next.</p>
        </main>
        <aside className="hidden xl:block">
          <div className="sticky top-20">
            <Toc activeId={activeId} />
          </div>
        </aside>
      </div>
      <Footer />
    </>
  )
}
```

- [ ] **Step 5: Verify in dev**

`/docs` shows three columns at ≥1280px, sidebar links visible, no content sections yet.

- [ ] **Step 6: Commit**

```bash
git add packages/home/src/routes/Docs.tsx packages/home/src/docs/
git commit -m "feat(home): docs shell with sidebar + ToC + scroll spy"
```

---

### Task 24: ParamTable + Installation/ThreeModes/Props sections

**Files:**
- Create: `packages/home/src/docs/ParamTable.tsx`
- Create: `packages/home/src/docs/sections/Installation.tsx`
- Create: `packages/home/src/docs/sections/ThreeModes.tsx`
- Create: `packages/home/src/docs/sections/Props.tsx`
- Modify: `packages/home/src/routes/Docs.tsx`

- [ ] **Step 1: Create `docs/ParamTable.tsx`**

```tsx
import { PARAM_SCHEMA, type ParamGroup } from '@/schema/param-schema'
import { Badge } from '@/components/ui/badge'
import { useT } from '@/i18n/useT'

function inferType (def: typeof PARAM_SCHEMA[number]): string {
  switch (def.control.kind) {
    case 'switch': return 'boolean'
    case 'slider':
    case 'number': return 'number'
    case 'text':
    case 'color': return 'string'
    case 'select':
    case 'segmented': return def.control.options.map(o => `'${o.value}'`).join(' | ')
    case 'object': return def.control.component === 'set' ? 'Set[]' : `${def.control.component[0].toUpperCase()}${def.control.component.slice(1)}Set | boolean`
    case 'callback': return '(arg) => void'
  }
}

function fmtDefault (v: unknown): string {
  if (v === undefined) return '—'
  if (typeof v === 'string') return v === '' ? "''" : `'${v}'`
  if (Array.isArray(v)) return v.length === 0 ? '[]' : '[…]'
  if (typeof v === 'object' && v !== null) return Object.keys(v).length === 0 ? '{}' : '{…}'
  return String(v)
}

export function ParamTable ({ group }: { group: ParamGroup }) {
  const { t } = useT()
  const items = PARAM_SCHEMA.filter(d => d.group === group)
  if (items.length === 0) return null
  return (
    <div className="my-6 overflow-hidden rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-4 py-2.5 font-medium">Prop</th>
            <th className="px-4 py-2.5 font-medium">Type</th>
            <th className="px-4 py-2.5 font-medium">Default</th>
            <th className="px-4 py-2.5 font-medium">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {items.map(d => (
            <tr key={d.name}>
              <td className="px-4 py-2.5 align-top">
                <span className="font-mono">{d.name}</span>
                {d.required && <Badge variant="destructive" className="ml-1.5 h-4 px-1 text-[9px]">{t('common.required')}</Badge>}
                {d.desktopOnly && <Badge variant="secondary" className="ml-1.5 h-4 px-1 text-[9px]">{t('common.desktopOnly')}</Badge>}
              </td>
              <td className="px-4 py-2.5 align-top font-mono text-xs text-muted-foreground">{inferType(d)}</td>
              <td className="px-4 py-2.5 align-top font-mono text-xs">{fmtDefault(d.default)}</td>
              <td className="px-4 py-2.5 align-top text-muted-foreground">{t(d.i18n.descKey)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
```

- [ ] **Step 2: Create `docs/sections/Installation.tsx`**

```tsx
import { Heading } from '@/docs/Heading'
import { CodeBlock } from '@/components/CodeBlock'

export function Installation () {
  return (
    <section>
      <Heading id="installation">Installation</Heading>
      <p>Install via your package manager:</p>
      <CodeBlock code={`pnpm add react-zmage
# or
npm install react-zmage`} language={'bash' as any} />
      <p>Then import the component and its stylesheet:</p>
      <CodeBlock code={`import Zmage from 'react-zmage'
import 'react-zmage/style.css'`} language={'tsx' as any} />
      <Heading id="ssr" level={3}>SSR</Heading>
      <p>For server-rendered apps, use the <code>/ssr</code> entry to avoid touching <code>document</code> at import time:</p>
      <CodeBlock code={`import Zmage from 'react-zmage/ssr'`} language={'tsx' as any} />
    </section>
  )
}
```

- [ ] **Step 3: Create `docs/sections/ThreeModes.tsx`**

```tsx
import { Heading } from '@/docs/Heading'
import { CodeBlock } from '@/components/CodeBlock'

export function ThreeModes () {
  return (
    <section>
      <Heading id="modes">Three modes</Heading>
      <p><code>react-zmage</code> exposes the same configuration surface through three call shapes:</p>
      <h3 className="scroll-mt-24">Component</h3>
      <CodeBlock code={`<Zmage src="hero.jpg" set={[...]} />`} language={'tsx' as any} />
      <h3 className="scroll-mt-24">Imperative</h3>
      <CodeBlock code={`Zmage.browsing({ src: 'hero.jpg', set: [...] })
// returns a destructor: () => void`} language={'tsx' as any} />
      <h3 className="scroll-mt-24">Wrapper</h3>
      <CodeBlock code={`<Zmage.Wrapper backdrop="#0a0a0a">
  <article dangerouslySetInnerHTML={{ __html: html }} />
</Zmage.Wrapper>`} language={'tsx' as any} />
      <p className="text-muted-foreground text-sm">
        Wrapper queries <code>img</code> children in <code>componentDidMount</code> /
        <code>componentDidUpdate</code>. Imgs injected after the wrapper renders won't get
        bound until the wrapper re-renders.
      </p>
    </section>
  )
}
```

- [ ] **Step 4: Create `docs/sections/Props.tsx`**

```tsx
import { Heading } from '@/docs/Heading'
import { ParamTable } from '@/docs/ParamTable'

export function Props () {
  return (
    <section>
      <Heading id="props">Props</Heading>
      <p>Every prop on <code>BaseType</code> can be passed in any of the three modes.</p>
      <Heading id="props-data" level={3}>Data</Heading>
      <ParamTable group="data" />
      <Heading id="props-preset" level={3}>Preset</Heading>
      <ParamTable group="preset" />
      <Heading id="props-interface" level={3}>Interface &amp; interaction</Heading>
      <ParamTable group="interface" />
      <Heading id="props-controller" level={3}>Controller</Heading>
      <ParamTable group="controller" />
      <Heading id="props-hotkey" level={3}>HotKey</Heading>
      <ParamTable group="hotkey" />
      <Heading id="props-animate" level={3}>Animate</Heading>
      <ParamTable group="animate" />
      <Heading id="props-lifecycle" level={3}>Lifecycle</Heading>
      <ParamTable group="lifecycle" />
      <Heading id="props-controlled" level={3}>Controlled</Heading>
      <ParamTable group="controlled" />
    </section>
  )
}
```

- [ ] **Step 5: Wire sections into `Docs.tsx`**

Replace the `<main>` body:
```tsx
<main className="prose prose-zinc dark:prose-invert max-w-none">
  <h1 className="text-3xl font-semibold tracking-tight">{t('docs.title')}</h1>
  <Installation />
  <ThreeModes />
  <Props />
</main>
```

Add imports at the top:
```tsx
import { Installation } from '@/docs/sections/Installation'
import { ThreeModes } from '@/docs/sections/ThreeModes'
import { Props } from '@/docs/sections/Props'
```

- [ ] **Step 6: Verify in dev**

`/docs` renders Installation + ThreeModes + Props with auto-generated tables. Sidebar anchor links jump correctly. ToC populates with all `h2`/`h3` from sections.

- [ ] **Step 7: Commit**

```bash
git add packages/home/src/docs/ParamTable.tsx packages/home/src/docs/sections/Installation.tsx packages/home/src/docs/sections/ThreeModes.tsx packages/home/src/docs/sections/Props.tsx packages/home/src/routes/Docs.tsx
git commit -m "feat(home): docs sections — installation, modes, props"
```

---

### Task 25: Remaining sections — ControllerDetail / AnimateDetail / Examples / TypeScript / Migration

**Files:**
- Create: `packages/home/src/docs/sections/ControllerDetail.tsx`
- Create: `packages/home/src/docs/sections/AnimateDetail.tsx`
- Create: `packages/home/src/docs/sections/Examples.tsx`
- Create: `packages/home/src/docs/sections/TypeScript.tsx`
- Create: `packages/home/src/docs/sections/Migration.tsx`
- Modify: `packages/home/src/routes/Docs.tsx`

- [ ] **Step 1: `ControllerDetail.tsx`** — embed inside the `controller` prop section in Props (instead of separate route).

For simplicity, fold it into `Props.tsx` immediately after `<ParamTable group="controller" />`. Add to that file:

```tsx
<table className="w-full text-sm">
  <thead className="bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
    <tr><th className="px-4 py-2.5">Key</th><th className="px-4 py-2.5">Description</th></tr>
  </thead>
  <tbody className="divide-y divide-border">
    {([
      ['pagination', 'controller.pagination'],
      ['rotate', 'controller.rotate'],
      ['rotateLeft', 'controller.rotateLeft'],
      ['rotateRight', 'controller.rotateRight'],
      ['zoom', 'controller.zoom'],
      ['download', 'controller.download'],
      ['close', 'controller.close'],
      ['flip', 'controller.flip'],
      ['flipLeft', 'controller.flipLeft'],
      ['flipRight', 'controller.flipRight'],
    ] as const).map(([k, key]) => (
      <tr key={k}>
        <td className="px-4 py-2.5 font-mono">{k}</td>
        <td className="px-4 py-2.5 text-muted-foreground">{t(key as any)}</td>
      </tr>
    ))}
  </tbody>
</table>
```

(Pull `t` via `useT()` at the top of `Props.tsx`.)

- [ ] **Step 2: `Examples.tsx`** — embed real `<Zmage>` instances next to source code.

```tsx
import Zmage from 'react-zmage'
import { Heading } from '@/docs/Heading'
import { CodeBlock } from '@/components/CodeBlock'

export function Examples () {
  return (
    <section>
      <Heading id="examples">Examples</Heading>

      <h3 className="scroll-mt-24">Single image</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <Zmage src="/imgSet/childsDream/1.jpg" alt="童夢 · ONE" className="w-full rounded-md" />
        <CodeBlock code={`<Zmage src="/imgSet/childsDream/1.jpg" alt="..." />`} />
      </div>

      <h3 className="scroll-mt-24">Multi-image gallery</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <Zmage
          src="/imgSet/childsDream/3.jpg"
          alt="童夢 · THREE"
          className="w-full rounded-md"
          set={[
            { src: '/imgSet/childsDream/3.jpg', alt: '童夢 · THREE' },
            { src: '/imgSet/childsDream/4.jpg', alt: '童夢 · FOUR' },
            { src: '/imgSet/childsDream/5.jpg', alt: '童夢 · FIVE' },
          ]}
        />
        <CodeBlock code={`<Zmage
  src="..."
  set={[
    { src: '...', alt: '...' },
    { src: '...', alt: '...' },
  ]}
/>`} />
      </div>
    </section>
  )
}
```

- [ ] **Step 3: `TypeScript.tsx`**

```tsx
import { Heading } from '@/docs/Heading'
import { CodeBlock } from '@/components/CodeBlock'

export function TypeScript () {
  return (
    <section>
      <Heading id="typescript">TypeScript</Heading>
      <p>Types are co-located with the runtime export. The full prop union is <code>BaseType</code>:</p>
      <CodeBlock code={`import type { BaseType, Set, Preset, ControllerSet, HotKey, Animate } from 'react-zmage'

const props: BaseType = {
  src: 'hero.jpg',
  set: [{ src: 'hero.jpg', alt: 'hero' }],
  preset: 'desktop',
}`} />
      <p>The component accepts a ref, which forwards to the cover <code>img</code>:</p>
      <CodeBlock code={`const ref = useRef<HTMLImageElement>(null)
<Zmage src="..." ref={ref} />`} />
    </section>
  )
}
```

- [ ] **Step 4: `Migration.tsx`**

```tsx
import { Heading } from '@/docs/Heading'

export function Migration () {
  return (
    <section>
      <Heading id="migration">Migration</Heading>
      <p>From <code>v2</code>:</p>
      <ul>
        <li><code>preset: 'auto'</code> is deprecated — use <code>'desktop'</code> or <code>'mobile'</code>.</li>
        <li>Component is a <code>forwardRef</code> exotic; do not <code>new Zmage()</code>.</li>
        <li>If you import the SSR entry, switch to <code>react-zmage/ssr</code>.</li>
      </ul>
    </section>
  )
}
```

- [ ] **Step 5: Wire into Docs.tsx**

```tsx
import { Examples } from '@/docs/sections/Examples'
import { TypeScript } from '@/docs/sections/TypeScript'
import { Migration } from '@/docs/sections/Migration'

// inside <main>:
<Installation />
<ThreeModes />
<Props />
<Examples />
<TypeScript />
<Migration />
```

- [ ] **Step 6: Verify in dev**

All sections render. Sidebar anchors jump. Examples have live <Zmage>.

- [ ] **Step 7: Commit**

```bash
git add packages/home/src/docs/sections/
git commit -m "feat(home): docs sections — examples, typescript, migration"
```

---

### Task 26: ⌘K search

**Files:**
- Create: `packages/home/src/components/CommandK.tsx`
- Modify: `packages/home/src/components/TopNav.tsx`

- [ ] **Step 1: Create `CommandK.tsx`**

```tsx
import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { SIDEBAR_GROUPS } from '@/docs/Sidebar'
import { PARAM_SCHEMA } from '@/schema/param-schema'
import { useT } from '@/i18n/useT'
import { Button } from '@/components/ui/button'

type Item = { id: string; label: string; href: string; group: string }

function buildIndex (t: (k: any) => string): Item[] {
  const out: Item[] = []
  for (const g of SIDEBAR_GROUPS) {
    for (const it of g.items) {
      out.push({ id: it.id, label: t(it.labelKey), href: `/docs#${it.id}`, group: t(g.titleKey) })
    }
  }
  for (const def of PARAM_SCHEMA) {
    out.push({ id: `prop-${def.name}`, label: def.name as string, href: `/docs#props-${def.group}`, group: 'Props' })
  }
  return out
}

function fuzzyScore (q: string, label: string) {
  const ql = q.toLowerCase(); const ll = label.toLowerCase()
  if (ll.includes(ql)) return 100 - (ll.indexOf(ql))
  let score = 0; let i = 0
  for (const ch of ll) { if (ch === ql[i]) { score += 1; i += 1; if (i >= ql.length) break } }
  return i === ql.length ? score : 0
}

export function CommandK () {
  const { t } = useT()
  const [open, setOpen] = React.useState(false)
  const [q, setQ] = React.useState('')
  const navigate = useNavigate()
  const index = React.useMemo(() => buildIndex(t), [t])
  const results = React.useMemo(() => {
    if (!q.trim()) return index.slice(0, 12)
    return index
      .map(it => ({ it, s: fuzzyScore(q, it.label) }))
      .filter(r => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 12)
      .map(r => r.it)
  }, [q, index])

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(o => !o)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="hidden gap-2 text-muted-foreground sm:inline-flex">
          <Search className="h-3.5 w-3.5" />
          <span>{t('docs.search.placeholder')}</span>
          <span className="ml-auto rounded border border-border bg-background px-1.5 font-mono text-[10px]">⌘K</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl p-0">
        <div className="border-b border-border p-3">
          <Input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder={t('docs.search.placeholder')} className="border-0 px-0 focus-visible:ring-0" />
        </div>
        <ul className="max-h-72 overflow-y-auto p-2">
          {results.length === 0 ? (
            <li className="p-3 text-sm text-muted-foreground">{t('docs.search.empty')}</li>
          ) : results.map(r => (
            <li key={r.id}>
              <button
                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-accent"
                onClick={() => { setOpen(false); navigate(r.href) }}
              >
                <span>{r.label}</span>
                <span className="text-xs text-muted-foreground">{r.group}</span>
              </button>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  )
}
```

- [ ] **Step 2: Add `<CommandK />` to TopNav** (between LanguageToggle and ThemeToggle):

```tsx
<CommandK />
<LanguageToggle />
<ThemeToggle />
```

- [ ] **Step 3: Verify**

Press `⌘K` (or `Ctrl+K`). Type `radius` — jumps to Interface props. Type `quickstart` — jumps to Installation.

- [ ] **Step 4: Commit**

```bash
git add packages/home/src/components/CommandK.tsx packages/home/src/components/TopNav.tsx
git commit -m "feat(home): cmd+k client-side search"
```

---

## Phase 7 — Cleanup + Verify

### Task 27: Delete obsolete files

**Files:**
- Delete: `packages/home/src/index.module.less`
- Delete: `packages/home/public/highlight/`
- Delete: `packages/home/public/fonts/ubuntu/`
- Delete: `packages/home/public/normalize.css`

- [ ] **Step 1: Verify nothing references the old assets**

```bash
cd packages/home
grep -rE 'index\.module\.less|/highlight/|/fonts/ubuntu/|/normalize\.css' src index.html || echo "clean"
```

Expected: `clean`. Any hits → fix the referrer first.

- [ ] **Step 2: Delete**

```bash
rm src/index.module.less
rm -rf public/highlight
rm -rf public/fonts/ubuntu
rm public/normalize.css
```

- [ ] **Step 3: Commit**

```bash
cd ../..
git add -A packages/home/
git commit -m "chore(home): drop obsolete LESS/highlight/ubuntu-font assets"
```

---

### Task 28: Final lint + build verification

- [ ] **Step 1: Lint**

```bash
pnpm --filter react-zmage-home run lint
```

Expected: zero errors.

- [ ] **Step 2: TypeScript check**

```bash
pnpm --filter react-zmage-home exec tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 3: Build**

```bash
pnpm --filter react-zmage-home run build
```

Expected: success; `docs/index.html` and `docs/404.html` both exist.

- [ ] **Step 4: Confirm 404 fallback**

```bash
ls docs/index.html docs/404.html
diff docs/index.html docs/404.html
```

Expected: both files listed; diff produces no output.

- [ ] **Step 5: Preview**

```bash
pnpm --filter react-zmage-home run preview
```

Open `http://127.0.0.1:4173/`, navigate `/playground`, `/docs`, refresh on each — page must not 404 (404.html falls back to SPA shell).

- [ ] **Step 6: Manual smoke checklist** (per `AGENTS.md`, agent should not claim GUI/animation behavior verified — flag this for the human maintainer):

- [ ] Home renders Hero / Live Demo / Feature Grid / Three Modes / Footer.
- [ ] Live demo image opens viewer; arrow keys flip; Space zooms; ESC closes.
- [ ] Theme toggle persists across reload (light / dark / system).
- [ ] Language toggle persists; all UI strings flip between zh/en.
- [ ] Playground: tweak `radius`, `backdrop`, `animate.flip`; preview reflects all three; CodeSnippet shows only non-default props.
- [ ] Playground Reset returns to defaults.
- [ ] Playground Share copies a URL whose hash hydrates the panel on reload.
- [ ] Playground Imperative tab: Trigger button opens viewer.
- [ ] Playground Wrapper tab: clicking inline images opens viewer.
- [ ] Playground Lifecycle: enabling `onBrowsing` and triggering causes events to appear in EventLog.
- [ ] Docs sidebar anchors jump; ToC scroll-spy highlights the current section.
- [ ] ⌘K opens search; typing `radius` lands on the interface props.
- [ ] Mobile (≤768px): TopNav hamburger sheet works; Docs collapses sidebar appropriately.

- [ ] **Step 7: Commit any lint/format fixes**

```bash
git add -A packages/home
git commit -m "chore(home): final lint/format pass" --allow-empty
```

(Use `--allow-empty` only if lint produced no changes; otherwise drop it.)

---

## Self-Review Checklist (run before claiming done)

- [ ] Every spec section has a task that implements it.
- [ ] No unresolved placeholders, TODOs, or "fill in later" remarks remain in source.
- [ ] Imported types and method signatures match across tasks.
- [ ] `pnpm --filter react-zmage-home run lint` passes.
- [ ] `pnpm --filter react-zmage-home run build` succeeds and emits both `index.html` and `404.html`.
- [ ] Schema is the single source: changing one entry in `param-schema.ts` updates both Playground and Docs without further edits.
- [ ] `react17`/`react-dom17`/`react18`/`react-dom18` aliases are gone from `package.json` and `vite.config.ts`.
- [ ] `dev:r17` / `dev:r18` / `dev:r19` scripts are gone.
- [ ] No references remain to the old LESS/highlight/Ubuntu assets.
