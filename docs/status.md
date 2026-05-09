# react-zmage status

react-zmage is a static documentation site and npm package. There is no hosted runtime API, background job system, status dashboard, service account, MCP transport, webhook delivery service, or rate-limited endpoint.

| Surface | Status |
| --- | --- |
| Documentation site | Static GitHub Pages content |
| npm package | `react-zmage` |
| Source repository | https://github.com/Caldis/react-zmage |
| API authentication | Not required |
| API rate limits | Not applicable |
| Hosted MCP server | Not available |
| Webhooks | Not available |

If an agent receives an HTML 404 from GitHub Pages, it should fetch /developers/errors.md, /llms.txt, /llms-full.txt, /index.md, npm, or GitHub instead of retrying the missing endpoint.
