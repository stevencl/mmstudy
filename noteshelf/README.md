# Noteshelf

A small, deliberately simple **note-taking app**. It is designed to be read and
understood in a few minutes, making it a clean starting point for experimenting,
learning, or building out new features.

## What it does

- Create notes (title + body)
- View notes
- Delete notes

That's deliberately all it does today. **Tagging, filtering, and search do not
exist yet** — they're natural next features to add.

## Structure

```
noteshelf/
  frontend/   React + Vite + TypeScript web client
  backend/    Express REST API with an in-memory store
  shared/     TypeScript types shared by frontend and backend
  tests/      (empty — a good place to start adding tests)
  .github/chatmodes/   custom agents: Frontend and Backend specialists
```

The three layers are intentionally small:

| Layer    | Key files |
| -------- | --------- |
| shared   | `shared/src/index.ts` — `Note`, create/update inputs, the home for cross-cutting contracts |
| backend  | `backend/src/server.ts` (routes), `store.ts` (in-memory data) |
| frontend | `frontend/src/App.tsx`, `components/`, `api.ts` (HTTP client) |

## Custom agents

Two custom agents are defined in `.github/chatmodes/` for use in tools that
support them (e.g. GitHub Copilot in VS Code):

- **Frontend** — owns `frontend/`, may read `shared/`, must not edit `backend/`.
- **Backend** — owns `backend/`, may read/extend `shared/`, must not edit `frontend/`.

These roles keep changes scoped to a single layer at a time.

## Running it

Prerequisites: Node.js 20+.

```bash
# from noteshelf/
npm install

# terminal 1 — API on http://localhost:4000
npm run dev:backend

# terminal 2 — web client on http://localhost:5173 (proxies /api to :4000)
npm run dev:frontend
```

Then open http://localhost:5173. The store seeds a few sample notes on start
and resets whenever the backend restarts.

## Type-checking

```bash
npm run typecheck
```

## Contributing

Noteshelf is intentionally minimal, so it's easy to extend. Tagging, filtering,
search, and persistent storage are all natural additions. Keep changes scoped to
a single layer where possible, and update the shared types in `shared/src` when
you change a contract that crosses the frontend/backend boundary.
