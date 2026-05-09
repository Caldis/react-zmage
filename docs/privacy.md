# react-zmage privacy notes

react-zmage is a client-side React package and the documentation site is static. The package does not create accounts, collect API credentials, or send image data to a react-zmage backend.

## Package behavior

The npm package runs inside the user's React app. It displays images already available to that app and does not upload images to a react-zmage server.

## Documentation site

zmage.caldis.me is hosted as static GitHub Pages content and includes Google Analytics page view measurement. External links to GitHub, npm, and other services are governed by those services' policies.

## Agent use

Agents do not need OAuth tokens, API keys, service accounts, or user credentials to read the docs or install the package. Agents should avoid placing private image URLs or secrets in public GitHub issues.
