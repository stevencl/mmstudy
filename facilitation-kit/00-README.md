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
| `06-moderator-guidance.md` | **CONFIDENTIAL** — emergent divergences + live perturbations | Moderator only |
| `07-observation-scoring-sheet.md` | Per-participant live notes + dimension scoring | Moderator |
| `08-conceptual-model-template.md` | Drawing canvas (PRE + POST) + coding overlay | Participant + Moderator |
| `../model-capture/` | **ModelCapture app** — digital PRE/POST drawing capture + coding overlay (runs on participant VM) | Participant + Moderator |
| `09-analysis-synthesis-template.md` | Cross-participant synthesis → findings | Analyst |

> ⚠️ **Do not share `06-moderator-guidance.md` (or this note about it) with
> participants.** It reveals the planted inconsistencies.

## The 90-minute flow at a glance

| Time | Activity | Card | Perturbation |
| --- | --- | --- | --- |
| 0–10 | Intro + baseline + **PRE sketch** | Task 0 | — |
| 10–25 | Parallel test generation *(observation/elicitation — no perturbation)* | Task 1 | P6 (changes-view scope, observation-only) |
| 25–45 | Tagging + filtering (Frontend assistant → Backend assistant) | Task 2 | P2 (decide ANY/ALL with the Frontend assistant only) |
| 45–53 | Alternative version — branch off to build the opposite filtering design | Task 2b | P2b (force the opposite design in a forked stream; discovery-first) |
| 53–65 | Search: plan/build/review (3 separate stages) | Task 3 | P3 (don't manage the hand-off) |
| 65–78 | Consistency investigation (+ optional blocked stream) | Task 4 (5) | P4 (helper lacks context) (P5) |
| 78–90 | Replay + **POST drawing** (update their PRE sketch) | — | — |

## What we're testing

Whether developers' mental models match the system's conceptual model:

- **Session = shared scope**; **Chat = independent stream**.
- No automatic chat-to-chat knowledge sharing; spawned chats are **peers**, not
  context-inheriting children; status **rolls up** from streams to the session.

Six scored dimensions: Session≠Chat, Context model, Independence, Hierarchy,
Unit of work, Lifecycle.

## Per-session checklist

**Before:**
- [ ] Restore the `noteshelf/` working tree to a clean checkout (participants
  will have added tags/filtering/search code) — **and no other edits**, so the
  participant feels they've just started. Restart the backend so the store
  reseeds (`cd ../noteshelf && npm run dev:backend`).
- [ ] Start the frontend (`npm run dev:frontend`) and confirm it loads.
- [ ] Confirm the **Frontend** and **Backend** custom agents are available in the
  participant's tool (or be ready to recreate the two roles by hand).
- [ ] Clear any leftover chats/agents from the previous participant.
- [ ] Have task cards, scoring sheet, **drawing template (for PRE & POST)**, and
  `06-...` open. Recording ready.
- [ ] **ModelCapture running** (`cd ../model-capture && npm run dev`): moderator
  console at `/moderator`, participant canvas at `/`. Create the participant and
  **set them active** before the PRE sketch. (Paper template is the fallback.)

**After:**
- [ ] Complete the scoring sheet immediately.
- [ ] Save recording, **PRE & POST drawings**, notes under the participant ID.
- [ ] Note any terminology leakage to discount in analysis.

## Running the app
See `../noteshelf/README.md`.
