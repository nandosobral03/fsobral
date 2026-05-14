---
name: verify
description: Run lint and build to verify changes compile and pass lint checks. Use after making code changes.
---

Run the following commands sequentially and report results:

1. `bun run lint` — check for ESLint errors
2. `bun run build` — verify production build succeeds

If either step fails, analyze the errors and suggest fixes. Do not attempt to fix automatically unless the user asks.
