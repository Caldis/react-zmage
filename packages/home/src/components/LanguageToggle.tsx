import { Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { HoverDropdownMenu } from './HoverDropdownMenu'
import { useT, type Lang } from '@/i18n/useT'

const LANGS: { value: Lang; label: string }[] = [
  { value: 'zh-CN', label: '中文' },
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語' },
  { value: 'ko', label: '한국어' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
  { value: 'es', label: 'Español' },
]

export function LanguageToggle () {
  const { lang, setLang } = useT()
  return (
    <HoverDropdownMenu
      contentClassName="w-36"
      trigger={
        <Button variant="ghost" size="icon" aria-label="Language">
          <Globe className="h-4 w-4" />
        </Button>
      }
    >
      {LANGS.map(({ value, label }) => (
        <DropdownMenuItem key={value} onClick={() => setLang(value)} data-active={lang === value}>
          {label}
        </DropdownMenuItem>
      ))}
    </HoverDropdownMenu>
  )
}
