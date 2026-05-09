# react-zmage

react-zmage is a free MIT-licensed open-source React image viewer published on npm as `react-zmage`. It turns ordinary `<img>` elements into an origin-expand fullscreen image viewer with galleries, keyboard navigation, mobile gestures, Wrapper mode, and SSR/RSC support.

## Quick start

```bash
npm install react-zmage
```

```tsx
import Zmage from 'react-zmage'
import 'react-zmage/style.css'

export function Photo () {
  return <Zmage src="/photo.jpg" alt="Photo" />
}
```

## Usage modes

| Mode | Use when | Entry |
| --- | --- | --- |
| Component | You own the React image markup | `<Zmage src="..." />` |
| Wrapper | Images come from CMS, MDX, markdown, rich text, or generated HTML | `<Zmage.Wrapper>{children}</Zmage.Wrapper>` |
| Imperative | A button, command, callback, or custom event opens the viewer | `Zmage.browsing(options)` |

## Agent resources

- Full agent context: https://zmage.caldis.me/llms-full.txt
- Compact agent context: https://zmage.caldis.me/llms.txt
- Developer resource index: https://zmage.caldis.me/developers
- OpenAPI metadata for static documentation endpoints: https://zmage.caldis.me/api/openapi.json
- Auth and access notes: https://zmage.caldis.me/developers/auth.md
- MCP status notes: https://zmage.caldis.me/developers/mcp.md
- Webhook status notes: https://zmage.caldis.me/developers/webhooks.md
- Agent discovery file: https://zmage.caldis.me/.well-known/agent.json
- A2A-style discovery card: https://zmage.caldis.me/.well-known/agent-card.json

## Alternatives context

| Package | Best fit | Difference |
| --- | --- | --- |
| react-zmage | Origin-expand fullscreen viewer for React images, galleries, rich text, and SSR/RSC apps | Drop-in image replacement plus Wrapper and imperative modes |
| react-medium-image-zoom | Medium-style single-image zoom | Smaller interaction surface; less gallery and rich-text automation |
| Lightbox.js | General lightbox patterns across stacks | Often configured as a separate gallery layer instead of a React img replacement |
| PhotoSwipe | Mature image gallery engine | Broader gallery engine; React integration usually needs adapter glue |

## Access model

zmage.caldis.me is a documentation-only website. No OAuth, API key, login, hosted MCP server, webhook registration, or rate-limit budget is required to use the package. Install from npm and read source on GitHub.
