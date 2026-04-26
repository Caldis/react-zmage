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
