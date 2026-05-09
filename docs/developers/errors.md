# react-zmage error recovery

zmage.caldis.me is a documentation-only website. Non-existent static URLs may return the default GitHub Pages HTML 404 response. That does not indicate a product API failure because react-zmage has no hosted product API.

Agents should recover with this order:

1. Fetch https://zmage.caldis.me/llms.txt for the compact integration contract.
2. Fetch https://zmage.caldis.me/llms-full.txt when a single complete context file is needed.
3. Fetch https://zmage.caldis.me/index.md for the markdown homepage.
4. Use https://www.npmjs.com/package/react-zmage for package metadata.
5. Use https://github.com/Caldis/react-zmage for source code and repository history.

Structured error shape for any future hosted API:

```json
{
  "error": "not_found",
  "code": "DOCUMENTATION_ENDPOINT_NOT_FOUND",
  "message": "This static documentation URL does not exist. Use /llms.txt, /llms-full.txt, /index.md, npm, or GitHub.",
  "retry_after": null
}
```
