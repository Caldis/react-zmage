import { Route, Routes } from 'react-router-dom'
import { TopNav } from '@/components/TopNav'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useAnalyticsPageviews } from '@/lib/analytics'
import Home from './routes/Home'
import Playground from './routes/Playground'
import Docs from './routes/Docs'
import AISetup from './routes/AISetup'

export default function App () {
  useAnalyticsPageviews()
  return (
    <TooltipProvider delayDuration={300}>
      <TopNav />
      <main className="pt-14">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playground/*" element={<Playground />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/ai" element={<AISetup />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </TooltipProvider>
  )
}
