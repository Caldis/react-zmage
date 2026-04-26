/**
 * Next.js App Router Server Component (默认).
 * 通过引入 client component 包装的 Zmage 来验证 RSC + Client boundary 正常.
 */
import { ClientZmage } from '../components/ClientZmage'

export default function Page() {
  return (
    <main>
      <h1>react-zmage in Next.js App Router</h1>
      <ClientZmage src="/photo.jpg" alt="server-rendered → client-hydrated" />
    </main>
  )
}
