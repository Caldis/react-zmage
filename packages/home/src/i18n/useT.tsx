import * as React from 'react'
import { zhCN, en, ja, ko, fr, de, es, type I18nDict, type I18nKey } from './dict'

export type Lang = 'zh-CN' | 'en' | 'ja' | 'ko' | 'fr' | 'de' | 'es'
const STORAGE_KEY = 'zmage.lang'
const DICTS: Record<Lang, I18nDict> = {
  'zh-CN': zhCN,
  'en': en,
  'ja': ja,
  'ko': ko,
  'fr': fr,
  'de': de,
  'es': es,
}

function detect (): Lang {
  if (typeof window === 'undefined') return 'en'
  const stored = localStorage.getItem(STORAGE_KEY) as Lang | null
  if (stored && stored in DICTS) return stored
  const nav = (navigator.language || 'en').toLowerCase()
  if (nav.startsWith('zh')) return 'zh-CN'
  if (nav.startsWith('ja')) return 'ja'
  if (nav.startsWith('ko')) return 'ko'
  if (nav.startsWith('fr')) return 'fr'
  if (nav.startsWith('de')) return 'de'
  if (nav.startsWith('es')) return 'es'
  return 'en'
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
