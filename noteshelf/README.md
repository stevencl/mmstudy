# Noteshelf

A small, deliberately simple **note-taking app** used as the stimulus
application for the *Multi-Chat Mental Model Study*. It is designed to be read
and understood in a few minutes.

## What it does

- Create, edit, and delete notes
- Add tags to notes
- Filter notes by tag
- Search notes

## Structure

```
noteshelf/
  frontend/   React + Vite + TypeScript web client
  backend/    Express REST API with an in-memory store
  shared/     TypeScript types shared by frontend and backend
  tests/      (empty — adding tests is the first study task)
```

The three layers are intentionally small:

| Layer    | Key files |
| -------- | --------- |
| shared   | `shared/src/index.ts` — `Note`, inputs, query types, open contracts |
| backend  | `backend/src/server.ts` (routes), `notes.ts` (tag/filter/search logic), `store.ts` (in-memory data) |
| frontend | `frontend/src/App.tsx`, `components/`, `tags.ts` (tag handling), `api.ts` (HTTP client) |

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

## A note for facilitators

This codebase contains a small number of **intentional cross-layer
inconsistencies** used to provoke breakdowns during the study. They are not
documented here on purpose — see the facilitation kit's
*moderator-only perturbation guide*. Please don't share that guide with
participants.
