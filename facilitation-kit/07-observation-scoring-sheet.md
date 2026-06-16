# Observation & Scoring Sheet

**Participant ID:** ________  **Date:** ________  **Moderator:** ________
**AI tool used:** ________________  **Parallel-agent experience (screener Q6):**
[ ] heavy [ ] light [ ] single-chat-only

> Fill the live-observation sections during the session; complete scoring
> immediately after while memory is fresh. Score reasoning, not skill.

---

## A. Baseline vocabulary (Task 0 — capture verbatim)

What nouns did they use for the separate "things"? (tabs / agents / chats /
sessions / workers / windows / …)

> ____________________________________________________________

What did they say is **shared** (if anything)?

> ____________________________________________________________

Did they describe any **hierarchy** (lead/worker, parent/child) unprompted?
[ ] yes [ ] no — quote:

> ____________________________________________________________

---

## A2. Parallel-work observation (Task 1 — no perturbation, capture behaviour + words)

**Creation:** what action did they take to make each new thread? (new chat / new
session / new window / tab / …)

> ____________________________________________________________

**Naming:** what did they call each thread they created? (verbatim)

> ____________________________________________________________

**Partitioning:** how did they divide the work? (by layer FE/BE/shared / by task / other)

> ____________________________________________________________

**Switching & attention:** one at a time or a combined view? How did they track
which is which? How did they handle permission/approval prompts from different
threads?

> ____________________________________________________________

**"One thing or three?"** their answer when asked if the parallel threads were
one thing or separate things, and what they share:

> ____________________________________________________________

---

## B. Live observation log (timestamp + what happened + their words)

| Time | Task | Observation / breakdown | Participant quote |
| --- | --- | --- | --- |
|  | 1 *(obs only)* |  |  |
|  | 2 |  |  |
|  | 2b |  |  |
|  | 3 |  |  |
|  | 4 |  |  |
|  | 5 |  |  |

### Breakdown flags (tick any observed)
- [ ] **Context mismatch** — expected two efforts to share knowledge they didn't
- [ ] **Clarification failure** — assumed a decision told to one effort reached others
- [ ] **Sub-agent confusion** — expected a spawned helper to inherit context
- [ ] **Status confusion** — expected one block to halt everything (or vice versa)
- [ ] **Naming conflation** — used one word for both the scope and the stream
- [ ] **Changes-view scope** — expected the Changes view to show repo-wide diffs,
  not just this session's changes
- [ ] **Fork = full copy** — expected a forked conversation to have its own files,
  not just its own history (shared workspace surprised them)

---

## B3. Changes-view scope (P6 — observation-only)

**Did they notice / read the Changes view unprompted while working?**
- [ ] Yes — quote: ______________________________________________
- [ ] No

**When asked what the Changes view shows, they treated it as:**
- [ ] **Repo-wide** ("everything that's different") — *expectation violated*
- [ ] **Session/agent-scoped** ("what this effort/session did") — *aligned*
- [ ] Mixed / unsure
- Verbatim:

> ____________________________________________________________

**Did they expect another chat/agent's edits to appear in this view?**
- [ ] Yes (combined) [ ] No (per-effort) [ ] Didn't split work / n/a

---

## B2. Context hand-off capture (Task 2 — the central probe)

**Decisions settled with the Frontend assistant** (ANY/ALL, tag case,
separators):

> ____________________________________________________________

**At the Backend briefing, did they carry those decisions over?**
- [ ] **Restated** them in the brief (recognised the boundary)
- [ ] **Omitted** them — then it looked like: [ ] an *omission* (added once
  nudged/asked) [ ] an *assumption* (believed it already knew)
- Verbatim of what they actually typed/said to the Backend assistant:

> ____________________________________________________________

**Did the Backend assistant ask a clarifying question?**
- [ ] Yes — participant reaction: [ ] surprised it asked [ ] answered
  consistently with FE [ ] answered *differently* (live divergence)
- [ ] No — it just implemented

**Outcome:** [ ] sides agree [ ] sides diverge (describe: UI ___ vs server ___ )

**Where did they say the decision *should* live?** (shared layer / product owner /
code / "it should just know" / other):

> ____________________________________________________________

---

## B2b. Forked-stream inheritance (Task 2b — fork lineage probe)

**Expectation *before* branching** — "what would that branch already have/know?"
(tick all they named, + verbatim):
- [ ] The conversation/history so far  [ ] The ANY/ALL **decision**  [ ] The
  **code/files** already written  [ ] Didn't mention files

> ____________________________________________________________

**Mechanism they chose to make the alternative:**
- [ ] Fork (found it themselves)  [ ] Fork (only after a hint)  [ ] New chat
- [ ] Copied/duplicated files  [ ] git branch  [ ] Other: ______  [ ] Stuck
- What they *called* it: ______________________________________

**In the new stream, did they re-brief the tagging context?**
- [ ] Re-explained it  [ ] Assumed it was already there  [ ] Checked first

**Did they treat the earlier ANY/ALL decision as inherited?**
- [ ] Carried over automatically  [ ] Re-decided it  [ ] Unsure

**Shared-workspace moment** — did they notice the alternative edits the **same
files** (original overwritten)?
- [ ] Expected **two independent versions** (history *and* files) — *Session ≠
  Chat violation*
- [ ] Realised the **workspace is shared** (conversation forked, files did not) —
  *aligned*
- [ ] Surprised when the first version changed  [ ] Didn't notice
- Verbatim:

> ____________________________________________________________

**Back-propagation** — did they expect the **original** conversation to know what
the branch did?
- [ ] Yes (expected it to know)  [ ] No (treated as peers)  [ ] Unsure

---

## C. Dimension scoring (0 = mismatch · 1 = partial · 2 = aligned)

> "Aligned" = matches the reference model (session = shared scope; chat =
> independent stream; peers, not hierarchy; status rolls up).

| # | Dimension | 0 — mismatch | 1 — partial | 2 — aligned | Score | Evidence (time/quote) |
| --- | --- | --- | --- | --- | :---: | --- |
| 1 | **Session ≠ Chat** | Conflates the two | Inconsistent | Clear scope vs stream distinction |  |  |
| 2 | **Context model** | Thinks each chat has its own context | Mixed | Sees context as session-level/shared |  |  |
| 3 | **Independence** | Expects chats to auto-sync | Mixed | Treats chats as independent streams |  |  |
| 4 | **Hierarchy** | Strong parent/child assumption | Partial | Flat — chats are peers |  |  |
| 5 | **Unit of work** | Chat = task | Mixed | Chat distinct from task/agent |  |  |
| 6 | **Lifecycle** | Static (fixed set of chats) | Mixed | Dynamic (created/removed over time) |  |  |

**Total / 12:** ______

> These six dimensions are **scored** and contribute to the total. The
> observation-only categories below (§C2) are **coded, not scored** — they
> capture *how* the participant works so we can compare behaviour across
> participants; they do not change the /12.

---

## C2. Observation-only coding (Task 1 — not scored)

Tick the closest option in each category and add a verbatim note. Use these
consistently across participants so the data is comparable in synthesis.

**O1 — Creation gesture** (what they did to start a new parallel thread)
- [ ] "New chat" within the same window/session
- [ ] "New session"
- [ ] New editor/window or terminal tab
- [ ] Spawned/sub-agent from an existing thread
- [ ] Unsure / hesitated / asked how
- Verbatim + notes: ________________________________________________

**O2 — Naming pattern** (what they called the threads)
- [ ] By layer (e.g. "frontend", "backend", "shared")
- [ ] By task/goal (e.g. "write the tests")
- [ ] By role/persona (e.g. "the tester", "worker 1")
- [ ] By tool default / left unnamed
- [ ] Other
- Verbatim labels: ________________________________________________

**O3 — Partitioning strategy** (how work was divided)
- [ ] By layer (FE / BE / shared)
- [ ] By task type (write vs run vs fix)
- [ ] One thread leads, others assist
- [ ] No clear split / ad hoc
- Notes: __________________________________________________________

**O4 — Attention & tracking** (how they followed parallel threads)
- [ ] One at a time (serial attention)
- [ ] Rapid switching, tracks mentally
- [ ] Expected/looked for a combined/overview view
- [ ] Lost track at some point
- Notes: __________________________________________________________

**O5 — Permission/approval handling**
- [ ] Handled per-thread without confusion
- [ ] Confused about *which* thread was asking
- [ ] Approved without checking source
- [ ] N/A (no prompts arose)
- Notes: __________________________________________________________

**O6 — "One thing or several?"** (their framing of the parallel work)
- [ ] One shared effort / one thing
- [ ] Several independent things
- [ ] Mixed / "depends"
- What they said is shared (verbatim): ____________________________

**O7 — Vocabulary drift vs Task 0** (did their nouns change once working?)
- [ ] Same words as baseline (§A)
- [ ] Shifted — note from → to: ___________________________________

---

## D. Per-participant summary (write after scoring)

```
Mental model summary:
- Unit of work:
- Context model:
- Relationship model:
- Lifecycle model:

Breakdowns observed:
- Context mismatch:
- Clarification failure:
- Sub-agent confusion:

Alignment:
- Session as scope:  low / medium / high
- Chat as stream:    low / medium / high
```

## E. Moderator self-check
- [ ] Did I avoid introducing system terminology? If not, note where:
  > ____________________________________________________________
- [ ] Any moment where my steering may have biased a response (discount in
  analysis)?
  > ____________________________________________________________
- 2–3 standout quotes (with timestamps) for the readout:
  > ____________________________________________________________
