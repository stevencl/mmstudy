# Moderator-Only Perturbation Guide

> **CONFIDENTIAL — do not share with participants.** This guide documents the
> intentional inconsistencies seeded into Noteshelf and the live perturbations
> you introduce, plus exactly where each one lives in the code and how to trigger
> and probe it. Keep this open during sessions.

## Why perturbations exist

Insight comes from **breakdowns, not smooth use**. Each perturbation is designed
to force a moment where the participant must reveal a hidden assumption about
**what the parallel AI efforts know, share, and inherit** — i.e. whether their
mental model matches the reference model:

- **Session = shared scope** (workspace, config, context shared by all chats).
- **Chat = independent stream** (no automatic chat-to-chat knowledge sharing).
- **No hierarchy** (spawned helpers are peers, not context-inheriting children).
- **Status rolls up** from peer streams to the session.

The seeded faults all share **one root cause**: the `shared` layer is silent on
three behavioural contracts, so the frontend and backend each made a *locally
reasonable but different* choice. That is the lesson — nothing forced the two
streams to agree, and no shared scope captured the decision.

---

## Seeded code faults (already in the app)

### Fault A — Tag case mismatch  ·  feeds Tasks 1, 2, 4

| | |
| --- | --- |
| **Frontend behaviour** | Keeps tags exactly as typed. `"Work"` stays `"Work"`. |
| **Backend behaviour** | Lowercases tags on save and on filter. `"Work"` → `"work"`. |
| **Shared contract** | Silent — no normalization rule. |
| **Where** | FE: `frontend/src/tags.ts` (`cleanTag` only trims). BE: `backend/src/notes.ts` (`normaliseTag` lowercases). Contract gap noted in `shared/src/index.ts` TODOs. |
| **How to observe** | Create a note with tag `Work` in the UI; the chip still reads `Work`, but the stored/filtered value is `work`. Frontend tests will assume case preserved; backend tests will assume lowercase. |
| **Trigger** | Emerges naturally in Task 1 when the two test efforts encode tag assumptions. If it doesn't surface, ask: *"What does each side assume a tag looks like?"* |

### Fault B — Filter ANY vs ALL  ·  feeds Task 2

| | |
| --- | --- |
| **Frontend behaviour** | UI hint reads *"Showing notes with all selected tags."* (implies **ALL / AND**). |
| **Backend behaviour** | `filterByTags` matches a note with **at least one** requested tag (**ANY / OR**). |
| **Shared contract** | Silent — multi-tag semantics undefined. |
| **Where** | FE: `frontend/src/components/TagFilter.tsx` (the hint text). BE: `backend/src/notes.ts` (`filterByTags` uses `.some(...)`). |
| **How to observe** | Select two tags that don't co-occur on any single note; results still appear (OR), contradicting the "all selected tags" hint. |
| **Trigger** | The **live perturbation** below. |

### Fault C — Search scope  ·  feeds Task 3

| | |
| --- | --- |
| **Behaviour** | `searchNotes` matches the term against the **title only**. |
| **Expectation a planner sets** | Search should match title + body + tags, case-insensitive. |
| **Shared contract** | Silent — search scope undefined. |
| **Where** | BE: `backend/src/notes.ts` (`searchNotes` checks `note.title` only). |
| **How to observe** | Search a word that appears only in a note's **body** (e.g. `roadmap` in the seeded "Sprint planning notes") → **0 results**. |
| **Trigger** | The plan/build/review split in Task 3; reviewer or a test catches the gap. |

> **Verification (run anytime against the API):**
> - A: `POST /api/notes {"title":"x","tags":["Work"]}` → returned tag is `work`.
> - B: `GET /api/notes?tags=work,personal` → returns notes matching *either*.
> - C: `GET /api/notes?search=roadmap` → `0` notes (body word, title-only search).

---

## Live perturbations (you introduce these)

### P1 — Tag-case shared understanding (Task 1)
- **Setup:** none — Fault A does the work.
- **Move:** while the participant has two parallel efforts going, let each settle
  on its own tag-case assumption. Don't reconcile them for the participant.
- **Probe:** "Should these two share an understanding of how tags work? Where
  should that live? If one learns the rule, who else should know?"

### P2 — ANY/ALL clarification to one chat only (Task 2)
- **Setup:** wait for a chat to ask about multi-tag filtering. If none asks,
  prompt one: *"Before you build this, anything you'd want to check with me?"*
- **Move:** answer **"ALL"** (match every selected tag) — but **only in that one
  chat**. Do not repeat it elsewhere. The backend already does ANY/OR and the UI
  hint says "all", so your decision now lives in exactly one stream and
  contradicts the code.
- **Probe:** "Who received that decision? Where does it live now? Do the other
  efforts know? If you opened a brand-new chat and asked it to filter, what would
  it assume?"

### P3 — Partial context hand-off (Task 3)
- **Setup:** have the participant use three separate efforts (plan / build /
  review).
- **Move:** encourage the planner to write a **full** spec. When they move to the
  build effort, **let them decide what context to carry over** — don't remind
  them to paste the full plan. The title-only `searchNotes` (Fault C) makes any
  gap visible at review.
- **Probe:** "When you opened the build chat, what did you expect it already
  knew? Should the reviewer share the planner's knowledge or be independent?"

### P4 — Blank helper agent (Task 4)
- **Setup:** participant asks an agent to check consistency and allows it to
  spawn helpers.
- **Move:** treat the spawned helper as starting **without** the prior
  conversation's context (most tools do this by default). Let it rediscover or
  contradict earlier findings/decisions.
- **Probe:** "What did you expect it to already know? Did it inherit anything
  from the agent that started it? How would you describe their relationship?"

### P5 — One blocked stream (optional, Task 5)
- **Setup:** multiple efforts running.
- **Move:** leave **one** effort's question unanswered so it blocks, while others
  continue.
- **Probe:** "What's blocked — everything, or one part? Where would you expect to
  see that something needs you?"

---

## Mapping: perturbation → concept → scoring dimension

| Perturbation | Concept tested | Scoring dimension(s) |
| --- | --- | --- |
| P1 / Fault A | Shared context vs independent streams | Context model; Independence |
| P2 / Fault B | Context propagation; decision ownership | Context model; Session ≠ Chat |
| P3 / Fault C | Independence of streams; context boundaries | Independence; Context model |
| P4 | Hierarchy & context inheritance | Hierarchy; Context model |
| P5 | Session- vs chat-level state | Session ≠ Chat; Lifecycle |

## Guardrails
- Never name the faults or use system terms ("scope", "stream", "context
  inheritance") while probing — mirror the participant's words.
- Perturb **once** and observe; don't pile on. If a participant is distressed or
  stuck, relieve the perturbation and move on.
- If you accidentally leak terminology or over-steer, **note it** on the scoring
  sheet so analysis can discount that moment.

## Resetting between sessions
The backend store is in-memory and **reseeds on restart**. Restart the backend
(`npm run dev:backend`) before each participant to clear notes and any
participant-written code changes that touched runtime data. If participants
edited source files, `git checkout`/restore the `noteshelf/` working tree (or
keep a clean copy per session).
