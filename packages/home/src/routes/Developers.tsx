import { ExternalLink } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Footer } from '@/components/Footer'

const resources = [
  ['llms.txt', '/llms.txt', 'Compact agent instructions for choosing the right react-zmage integration mode.'],
  ['llms-full.txt', '/llms-full.txt', 'Single-file agent context that includes the compact guide, README, and repository agent notes.'],
  ['index.md', '/index.md', 'Markdown version of the homepage for agents that prefer prose over HTML.'],
  ['OpenAPI metadata', '/api/openapi.json', 'Read-only description of static documentation endpoints. This is not a runtime product API.'],
  ['Auth notes', '/developers/auth.md', 'The package and docs require no OAuth, API key, login, or rate-limit budget.'],
  ['MCP notes', '/developers/mcp.md', 'Current MCP status and the recommended fallback for coding agents.'],
  ['Webhook notes', '/developers/webhooks.md', 'Why a client-side React component has no webhook events or registration API.'],
  ['Agent discovery', '/.well-known/agent.json', 'Machine-readable identity, package, and integration resource links.'],
  ['A2A card', '/.well-known/agent-card.json', 'A discovery card that describes the documentation surface without claiming an A2A task endpoint.'],
  ['Agent skill', '/.well-known/agent-skills/react-zmage-integration/SKILL.md', 'A portable skill for adding react-zmage to existing React image surfaces.'],
] as const

export default function Developers () {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">Developer resources</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            react-zmage machine-readable docs
          </h1>
          <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
            These endpoints are for coding agents, search crawlers, and developers who need the package contract without running the React UI. react-zmage is a free MIT-licensed npm package, not a hosted API service.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {resources.map(([title, href, body]) => (
            <Card key={href} className="border-border/70 bg-card/40 p-5">
              <a href={href} className="inline-flex items-center gap-2 text-base font-medium underline-offset-4 hover:underline">
                {title}
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </a>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
            </Card>
          ))}
        </div>
      </section>
      <Footer />
    </>
  )
}
