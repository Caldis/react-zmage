import * as React from 'react'
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
            <li>React {React.version}</li>
            <li>Vite</li>
            <li>shadcn/ui · Tailwind v4</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 text-xs text-muted-foreground sm:px-6">
          <span>{t('footer.license')}</span>
          <span className="font-mono">react-zmage v{zmagePkg.version} · React {React.version}</span>
          <a href="https://github.com/Caldis/react-zmage" aria-label="GitHub" className="hover:text-foreground">
            <Github className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
