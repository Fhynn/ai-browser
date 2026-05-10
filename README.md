# BrowsePilot AI

BrowsePilot AI is an AI browser companion monorepo with a Vite React web app, a Chrome Extension Manifest V3 side panel, and a shared TypeScript package for agent logic.

## Phase 1 Scaffold

This scaffold includes:

- `apps/web` for the demo and dashboard web app.
- `apps/extension` for the Chrome extension.
- `packages/shared` for reusable types and agent utilities.
- `docs` for architecture, safety, extension install, and Cloud Run notes.

## Commands

```bash
npm install
npm run dev
npm run dev:web
npm run dev:extension
npm run typecheck
npm run lint
npm run build
```

The app must run without `GEMINI_API_KEY`; mock mode is the default path for future phases.
