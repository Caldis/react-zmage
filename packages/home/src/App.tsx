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
