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

## B. Live observation log (timestamp + what happened + their words)

| Time | Task | Observation / breakdown | Participant quote |
| --- | --- | --- | --- |
|  | 1 |  |  |
|  | 2 |  |  |
|  | 3 |  |  |
|  | 4 |  |  |
|  | 5 |  |  |

### Breakdown flags (tick any observed)
- [ ] **Context mismatch** — expected two efforts to share knowledge they didn't
- [ ] **Clarification failure** — assumed a decision told to one chat reached others
- [ ] **Sub-agent confusion** — expected a spawned helper to inherit context
- [ ] **Status confusion** — expected one block to halt everything (or vice versa)
- [ ] **Naming conflation** — used one word for both the scope and the stream

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
