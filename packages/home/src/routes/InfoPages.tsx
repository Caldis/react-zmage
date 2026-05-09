import { Card } from '@/components/ui/card'
import { Footer } from '@/components/Footer'

type InfoPageKey = 'compare' | 'about' | 'contact' | 'privacy' | 'status' | 'errors' | 'rateLimits'

type InfoSection = {
  title: string
  body: string
}

type InfoPage = {
  eyebrow: string
  title: string
  body: string
  sections: InfoSection[]
}

const pages: Record<InfoPageKey, InfoPage> = {
  compare: {
    eyebrow: 'Comparison',
    title: 'react-zmage vs alternatives',
    body: 'react-zmage is an alternative to react-medium-image-zoom, Lightbox.js, and react-photoswipe when a React page needs fullscreen image preview from existing img elements.',
    sections: [
      {
        title: 'When react-zmage fits',
        body: 'Use react-zmage for documentation screenshots, editorial articles, CMS content, MDX docs, product galleries, and Next.js pages that need SSR/RSC-safe imports.',
      },
      {
        title: 'How it differs',
        body: 'Unlike gallery-first tools, react-zmage can start as a drop-in img replacement and later expand to Wrapper or imperative mode without replacing the page architecture.',
      },
    ],
  },
  about: {
    eyebrow: 'Project',
    title: 'About react-zmage',
    body: 'react-zmage is a free MIT-licensed open-source React image viewer maintained in the Caldis/react-zmage GitHub repository and published to npm as react-zmage.',
    sections: [
      {
        title: 'What it provides',
        body: 'The package turns ordinary img elements into a fullscreen image viewer with origin-expand animation, gallery browsing, keyboard navigation, mobile gestures, Wrapper mode, and an SSR/RSC-safe import path.',
      },
      {
        title: 'Boundaries',
        body: 'There is no hosted runtime API, account system, payment plan, OAuth flow, API key, webhook delivery service, MCP transport, or service-side rate limit.',
      },
    ],
  },
  contact: {
    eyebrow: 'Support',
    title: 'Contact react-zmage',
    body: 'react-zmage support happens through the public GitHub repository.',
    sections: [
      {
        title: 'Public support',
        body: 'Open issues at https://github.com/Caldis/react-zmage/issues for bugs, documentation problems, feature requests, and integration questions.',
      },
      {
        title: 'Private data',
        body: 'Do not post secrets, private images, access tokens, or customer data in public issues. Most reproductions should use placeholder images or public sample assets.',
      },
    ],
  },
  privacy: {
    eyebrow: 'Privacy',
    title: 'react-zmage privacy notes',
    body: 'react-zmage is a client-side React package and the documentation site is static.',
    sections: [
      {
        title: 'Package behavior',
        body: 'The npm package runs inside the user\'s React app. It displays images already available to that app and does not upload images to a react-zmage server.',
      },
      {
        title: 'Documentation site',
        body: 'zmage.caldis.me is hosted as static GitHub Pages content and includes Google Analytics page view measurement. External links to GitHub and npm follow those services\' policies.',
      },
    ],
  },
  status: {
    eyebrow: 'Status',
    title: 'react-zmage status',
    body: 'react-zmage has no hosted runtime service. The public surfaces are the static documentation site, the npm package, and the GitHub source repository.',
    sections: [
      {
        title: 'Available surfaces',
        body: 'Documentation is static GitHub Pages content. The installable package is react-zmage on npm. The source repository is Caldis/react-zmage on GitHub.',
      },
      {
        title: 'Unavailable hosted surfaces',
        body: 'There is no hosted product API, background job system, status dashboard, OAuth application, API key, webhook delivery service, MCP transport, or service-side rate limit.',
      },
    ],
  },
  errors: {
    eyebrow: 'Recovery',
    title: 'react-zmage error recovery',
    body: 'Non-existent zmage.caldis.me paths may return a GitHub Pages HTML 404. That is a static documentation miss, not a failed product API call.',
    sections: [
      {
        title: 'Recovery order',
        body: 'Fetch /llms.txt, /llms-full.txt, /index.md, npm package metadata, or the GitHub repository instead of retrying a missing static endpoint.',
      },
      {
        title: 'Future API shape',
        body: 'If react-zmage ever adds a hosted API, error responses should use JSON with error, code, message, and retry_after fields.',
      },
    ],
  },
  rateLimits: {
    eyebrow: 'Access',
    title: 'react-zmage rate limits',
    body: 'No API rate limits apply to react-zmage because it is a client-side React package and static documentation site, not a hosted network API.',
    sections: [
      {
        title: 'Package use',
        body: 'Installing and using react-zmage does not require API keys, OAuth tokens, Retry-After scheduling, or quota handling.',
      },
      {
        title: 'External services',
        body: 'Agents should still follow npm and GitHub public service policies when fetching package metadata, source files, issues, or release history.',
      },
    ],
  },
}

export function InfoPage ({ page }: { page: InfoPageKey }) {
  const data = pages[page]

  return (
    <>
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{data.eyebrow}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{data.title}</h1>
        <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">{data.body}</p>

        <div className="mt-12 grid gap-4">
          {data.sections.map(section => (
            <Card key={section.title} className="border-border/70 bg-card/40 p-5">
              <h2 className="text-lg font-medium">{section.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{section.body}</p>
            </Card>
          ))}
        </div>
      </section>
      <Footer />
    </>
  )
}
