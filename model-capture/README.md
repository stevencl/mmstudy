# ModelCapture

A small local web app for capturing a participant's **conceptual model drawing**
during the Multi-Chat Mental Model Study — once before the tasks and once after —
and for adding the moderator's coding overlay afterwards.

It runs on the **participant's VM** in the browser. The participant only ever sees
a plain drawing canvas with a neutral prompt: **"Draw how you imagine this
works."** They are **never** shown a participant ID, the words *before/after* or
*PRE/POST*, or the reference model — so they don't realise the exercise is
repeated and compared. All of that lives on a separate moderator screen.

## How it maps to the study

- Replaces the paper canvas in `facilitation-kit/08-conceptual-model-template.md`.
- **First** drawing = the PRE baseline (Task 0, tool closed).
- **Second** drawing = the POST update (replay). The canvas silently re-loads the
  participant's first drawing so they *update* it — framed neutrally, with no
  "compare" wording.
- The moderator's **coding overlay** form mirrors template 08 exactly (the six
  reference-model rows, edge/hierarchy/memory analysis, one-line
  characterisation, and the PRE→POST delta).

## Run it

```bash
cd model-capture
npm install        # first time only
npm run dev        # backend on :4100, frontend on :5273
```

Then:

- **Participant canvas:** http://localhost:5273/
- **Moderator console:** http://localhost:5273/moderator

> Tip: open the moderator console in one browser/tab/profile and the participant
> canvas in another (or hand the participant a window already on `/`). The
> participant URL shows nothing that reveals the study design.

## Session flow

1. **Moderator** (`/moderator`): create the participant (enter their ID + date),
   then click **set active**.
2. Hand the machine to the participant on the `/` canvas. They draw and click
   **I'm done** → saves the *first* drawing.
3. Later (after the tasks), on `/moderator` click **set active** for the same
   participant again. Back on `/`, the participant sees their earlier sketch
   pre-loaded and updates it → click **I'm done** → saves the *second* drawing.
4. After the session, open the participant on `/moderator`, fill in the **coding
   overlay**, and click **Export bundle**.

The active-participant state is shared server-side, so the participant canvas
always records against whoever the moderator most recently set active. When both
drawings are in, the canvas shows a neutral "All done" screen.

## Export

**Export bundle** writes `model-capture/exports/<participant-id>/`:

- `capture-1.png`, `capture-1.excalidraw.json` (first drawing)
- `capture-2.png`, `capture-2.excalidraw.json` (second drawing)
- `overlay.json` (moderator coding)
- `summary.md` (human-readable summary incl. the PRE→POST delta)

`.excalidraw.json` files can be re-opened at <https://excalidraw.com> for review.

## Data & privacy

- Everything is stored locally in SQLite at `backend/data/captures.db` — nothing
  leaves the machine, no accounts, no external services.
- The participant UI never requests or displays identifying info.

## Reset between participants

Nothing to reset — each participant is a separate record. To wipe **all** data
for a fresh study, stop the app and delete `backend/data/captures.db*` (and, if
desired, the `exports/` subfolders).

## Stack

npm-workspaces monorepo (same shape as `noteshelf/`):

- `frontend/` — React + Vite + [Excalidraw](https://github.com/excalidraw/excalidraw) whiteboard
- `backend/` — Express + better-sqlite3
