import type { ReactNode } from 'react'
import { ClientHeader } from '../components/ClientHeader'

export const metadata = {
  title: 'react-zmage Next.js demo',
}

export default function RootLayout ({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        <ClientHeader />
        {children}
      </body>
    </html>
  )
}
