import { Route, Routes } from 'react-router-dom'
import { TopNav } from '@/components/TopNav'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useAnalyticsPageviews } from '@/lib/analytics'
import Home from './routes/Home'
import Playground from './routes/Playground'
import Docs from './routes/Docs'
import UseCases from './routes/UseCases'
import AISetup from './routes/AISetup'
import Developers from './routes/Developers'
import { InfoPage } from './routes/InfoPages'

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
          <Route path="/use-cases" element={<UseCases />} />
          <Route path="/ai" element={<AISetup />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/compare" element={<InfoPage page="compare" />} />
          <Route path="/about" element={<InfoPage page="about" />} />
          <Route path="/contact" element={<InfoPage page="contact" />} />
          <Route path="/privacy" element={<InfoPage page="privacy" />} />
          <Route path="/status" element={<InfoPage page="status" />} />
          <Route path="/errors" element={<InfoPage page="errors" />} />
          <Route path="/rate-limits" element={<InfoPage page="rateLimits" />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </TooltipProvider>
  )
}
