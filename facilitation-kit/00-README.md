# Facilitation Kit — Multi-Chat Mental Model Study

Everything a moderator needs to run, observe, and analyse the study. The
stimulus application lives one level up in `../noteshelf/`.

## Contents

| File | Purpose | Audience |
| --- | --- | --- |
| `01-participant-screener.md` | Recruit and qualify participants | Recruiter |
| `02-consent-form.md` | Consent & recording agreement | Participant |
| `03-moderator-script.md` | Full 90-minute read-aloud script | Moderator |
| `05-task-cards.md` | Participant-facing task prompts (reveal one at a time) | Participant |
| `06-moderator-guidance.md` | **CONFIDENTIAL** — seeded faults + live perturbations | Moderator only |
| `07-observation-scoring-sheet.md` | Per-participant live notes + dimension scoring | Moderator |
| `08-conceptual-model-template.md` | Drawing canvas + coding overlay | Participant + Moderator |
| `09-analysis-synthesis-template.md` | Cross-participant synthesis → findings | Analyst |

> ⚠️ **Do not share `06-moderator-guidance.md` (or this note about it) with
> participants.** It reveals the planted inconsistencies.

## The 90-minute flow at a glance

| Time | Activity | Card | Perturbation |
| --- | --- | --- | --- |
| 0–10 | Intro + baseline | Task 0 | — |
| 10–25 | Parallel test generation | Task 1 | Fault A (tag case) |
| 25–45 | Tagging + filtering | Task 2 | P2 + Fault B (ANY/ALL) |
| 45–60 | Search: plan/build/review | Task 3 | P3 + Fault C (search scope) |
| 60–75 | Agent investigation (+ optional blocked stream) | Task 4 (5) | P4 (P5) |
| 75–90 | Replay + conceptual reconstruction | — | — |

## What we're testing

Whether developers' mental models match the system's conceptual model:

- **Session = shared scope**; **Chat = independent stream**.
- No automatic chat-to-chat knowledge sharing; spawned chats are **peers**, not
  context-inheriting children; status **rolls up** from streams to the session.

Six scored dimensions: Session≠Chat, Context model, Independence, Hierarchy,
Unit of work, Lifecycle.

## Per-session checklist

**Before:**
- [ ] Restart the backend so the store reseeds (`cd ../noteshelf && npm run dev:backend`).
- [ ] Restore the `noteshelf/` working tree if a previous participant edited files.
- [ ] Start the frontend (`npm run dev:frontend`) and confirm it loads.
- [ ] Have task cards, scoring sheet, and `06-...` open. Recording ready.

**After:**
- [ ] Complete the scoring sheet immediately.
- [ ] Save recording, drawing, notes under the participant ID.
- [ ] Note any terminology leakage to discount in analysis.

## Running the app
See `../noteshelf/README.md`.
