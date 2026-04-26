import type { ReactNode } from 'react'

export const metadata = {
  title: 'react-zmage Next.js sandbox',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
