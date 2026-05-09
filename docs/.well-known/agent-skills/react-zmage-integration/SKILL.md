---
name: react-zmage-integration
description: Use when adding the react-zmage React image viewer to an existing React, Next.js, MDX, CMS, markdown, or rich text image surface.
---

# react-zmage integration

## When to use this skill

Use this skill when a user wants fullscreen image preview, image zoom, a React lightbox alternative, CMS image preview, MDX image preview, or gallery browsing in a React app.

Do not use this skill for unrelated image processing, server-side media transformation, account automation, OAuth setup, webhook setup, or MCP server work. react-zmage is a client-side React package.

## Read first

Fetch https://zmage.caldis.me/llms.txt for the compact integration contract. Use https://zmage.caldis.me/llms-full.txt when you need the full README and repository agent notes in one request.

## Install

```bash
npm install react-zmage
```

Import the stylesheet once from the app-level style entry:

```ts
import 'react-zmage/style.css'
```

## Choose a mode

- Component mode: replace owned React `<img>` markup with `<Zmage src="..." alt="..." />`.
- Wrapper mode: wrap CMS, MDX, markdown, rich text, or generated HTML with `<Zmage.Wrapper>`.
- Imperative mode: call `Zmage.browsing(options)` from a button, command, callback, or non-image event.

Prefer omitted `preset` so it resolves to `auto`. Keep optional behavior props unset during a basic install unless the user asks for them or testing exposes a concrete need.
