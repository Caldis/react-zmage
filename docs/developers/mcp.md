# react-zmage MCP discovery

react-zmage does not currently run a hosted MCP server.

This is intentional: the product is a React component library, and agents can integrate it by reading the package docs, installing from npm, and editing the user's React codebase. The discovery files at /.well-known/mcp and /.well-known/mcp/server-card.json explicitly state that no MCP transport is available.

Recommended agent path:

1. Fetch https://zmage.caldis.me/llms.txt or https://zmage.caldis.me/llms-full.txt.
2. Inspect the user's image surfaces.
3. Choose Component, Wrapper, or Imperative mode.
4. Install `react-zmage` and import `react-zmage/style.css`.
