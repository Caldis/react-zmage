# react-zmage webhooks

react-zmage has no webhook system.

The package runs inside the user's React app and does not host server-side accounts, projects, jobs, events, or subscriptions. There is no webhook registration endpoint and no webhook payload schema. Agents should use React lifecycle callbacks such as `onBrowsing`, `onZooming`, `onSwitching`, `onRotating`, and `onError` inside the application code when they need local event handling.
