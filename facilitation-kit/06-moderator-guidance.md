# Moderator-Only Perturbation Guide

> **CONFIDENTIAL — do not share with participants.** This guide explains the
> breakdowns the study is designed to surface, how you steer toward them, and how
> to probe them. **Important:** in this study the cross-layer inconsistencies are
> **not baked into the code**. The base app is a clean, minimal notes app
> (notes CRUD only). The breakdowns **emerge** as participants build features
> across **separate agents/chats that don't share context**. Keep this open
> during sessions.

## Why perturbations exist

Insight comes from **breakdowns, not smooth use**. Each perturbation forces a
moment where the participant must reveal a hidden assumption about **what
parallel chats/agents know, share, and inherit** — i.e. whether their mental
model matches the reference model:

- **Session = shared scope** (workspace, config, context shared by all chats).
- **Chat = independent stream** (no automatic chat-to-chat knowledge sharing).
- **No hierarchy** (spawned helpers are peers, not context-inheriting children).
- **Status rolls up** from peer streams to the session.

**The mechanism is structural, not a planted bug.** Each separate effort (a new
chat, and the Frontend/Backend custom agents) starts with **only its own
context** — this is simply how the tools behave by default. So a decision made in
one place — "tags keep their case", "filtering means ALL", "search covers the
body" — is simply **not known** to the next one unless the participant carries it
over or writes it into a shared place (the `shared/` layer, the code, or back to
the product owner). The study watches whether participants *expect* that
propagation to happen for free.

> **Note (deliberate design):** the custom agent definitions
> (`.github/agents/*.agent.md`) do **not** tell the agents "you only know
> your own conversation." We rely on the tool's natural default isolation
> instead. Telegraphing it in the agent prompt would confound the study — a
> participant who read it could attribute every breakdown to that line rather
> than reveal their own assumption.

---

## Expected emergent divergences (what you're steering toward)

These are **not in the code** — they appear when two chats decide the same open
question differently. Your job is to leave the open questions open and let the
chat boundary do the work.

### D-tags — Tag handling (Task 2)  ·  resurfaces in Task 4
- **Open questions the build leaves undecided:** Does a tag keep its
  capitalisation (`"Work"`) or get normalised (`"work"`)? Are tags
  comma-separated/free-form? Trimmed? De-duplicated?
- **How it diverges:** the Frontend agent (chat 1) settles one answer with the
  participant; the Backend agent (chat 2, new conversation) never heard it and
  picks its own. Classic outcome: UI shows `Work`, server stores/matches `work`,
  so filtering by a cased tag misbehaves.
- **Where the decision *should* live:** the `shared/` layer (a documented
  contract both import), the product owner, or at least pasted into both chats.
  Probe for this.

### D-filter — Multi-tag filter meaning ANY vs ALL (Task 2)
- **Open question:** when several tags are selected, match notes with **ANY** of
  them or **ALL** of them?
- **How it diverges:** you answer this in the **Frontend chat only** (see P2).
  The Backend chat doesn't know your answer, so the server may implement the
  opposite. UI intent and server behaviour disagree.

### D-fork — Forked-conversation inheritance (Task 2b)
- **What it tests:** the **fork** feature seeds a new conversation with the
  parent's history up to the fork point. Two things the participant may conflate:
  (1) does the fork carry the *decision* settled with the parent (ANY/ALL), not
  just the message text? (2) does the fork have its **own files**, or the **same
  workspace** as the parent?
- **How it diverges:** a forked conversation is an **independent stream** but runs
  on the **same working tree**. Building the opposite filtering design in the fork
  **overwrites** the original implementation on disk — there are not two
  codebases. A participant who expects two independent versions (separate history
  *and* separate files) hits a Session ≠ Chat breakdown: the **conversation**
  forked, the **session/workspace** did not. Watch, too, for the reverse
  assumption that the **parent** conversation now knows what the fork did (it
  doesn't — they're peers once split).
- **Where the boundary actually sits:** history forks; the workspace is shared and
  rolls up to the one session. Probe for where they think "the other version"
  lives.

### D-search — Search scope (Task 3)
- **Open question:** does search match title only? title + body? tags too?
  case-sensitive?
- **How it diverges:** the planning chat writes a full spec; the build chat only
  knows what the participant carried over, so it may implement something
  narrower (e.g. title-only). The review chat, independent again, judges against
  *its* assumptions.

> There is nothing to "verify in the code" beforehand — the base app has no
> tags, filtering, or search. If you want to confirm the clean baseline:
> `GET /api/notes` returns seeded notes with only `title`/`body`; there are no
> tag or search query parameters.

---

## Live perturbations (you introduce these)

### P1 — *(none — Task 1 is observation-only)*
Task 1 introduces **no perturbation**. Do not steer toward any inconsistency.
Use the task purely to observe how the participant creates, names, divides, and
switches between parallel threads, and to elicit how they conceptualise the
parallel work (see the Task 1 section of the moderator script and §C2 of the
scoring sheet).

### P2 — Decide a key question with the Frontend assistant only (Task 2)
- **Setup:** the participant builds the tag UX with the **Frontend** assistant
  first, then briefs the **Backend** assistant for the server side.
- **Move:** while with the **Frontend** assistant, get a concrete decision on the
  table — ideally multi-tag filtering: answer **"ALL"**. Note any other decisions
  made here (case handling, separators). Then **observe before you probe** (this
  is the crux of the study):
  1. **The briefing** — when they set the Backend assistant going, do they
     **restate** those decisions or **omit** them? An omission is the key signal,
     but you can't yet tell *omission* (forgot) from *assumption* (thinks it
     already knows).
  2. **Does the assistant ask?** If the Backend assistant raises a clarifying
     question, let it — watch whether they seem surprised it's asking and whether
     they answer consistently with the Frontend decision or differently.
  3. **If neither happens** (omitted *and* not asked), record what they did and
     what got built, then probe at the next natural pause — ideally once a
     concrete divergence is visible, not mid-keystroke.
- **Probe (one, neutral):** "When you set the Backend assistant going, what did
  you expect it knew about what we just decided? Where does that decision live
  right now? If the two sides end up different, why — and where *should* the
  decision have lived?"

### P2b — Force the opposite design in a forked stream (Task 2b)
- **Setup:** tagging works **one way** (a concrete ANY/ALL choice on screen). The
  participant is asked to try the **opposite** version without losing the first.
- **Discovery-first:** do **not** name "fork"/"branch" or point at the feature.
  Whether they reach for forking, pick another mechanism (new chat, copy files,
  git branch), or don't know it exists is **data**. Offer a minimal hint only if
  genuinely stuck ("Some tools let you branch a conversation from an earlier
  point — does yours?").
- **Move:** the alternative must be the **opposite** of their first choice (ALL →
  ANY, or ANY → ALL). If they're vague on "opposite", answer it — as product
  owner — the opposite way to before.
- **Elicit the expectation *first*** (before they branch): "If you branched off
  from this exact moment, what would that branch already have or know?" Capture
  whether they mention the conversation, the **decision**, and the **files**.
- **Probe (after they're in the new stream):** "What does this one know about what
  the earlier version worked out? The version you built first — where is it now,
  what's happened to its code? Are these two the same thing or separate things —
  what do they share? Would the original conversation know what this one did?"
- **Listen for:** fork-as-independent-copy (own history **and** own files) vs.
  forked-conversation-on-a-shared-workspace. The former is a clean Session ≠ Chat
  breakdown (see **D-fork**).

### P3 — Don't manage the plan→build→review hand-off (Task 3)
- **Setup:** three separate stages — plan, build, review — kept independent.
- **Move:** draw a **full** spec out of the planning stage (title? body? tags?
  case?). When they move to building, **let them decide** what context to carry;
  don't remind them to pass the plan. Same into the review stage.
- **Probe:** "When you started building, what did you expect it already knew?
  Should the reviewer share the planner's knowledge or judge independently? What
  *should* travel between the three?"

### P4 — Helper brought in to share the work (Task 4)
- **Setup:** participant asks an assistant to check consistency and lets it bring
  in other helpers. **Caveat:** many tools won't delegate automatically just
  because you ask for a review. If the participant's tool *can* delegate but they
  don't reach for it, prompt neutrally ("Could anything else help with this?") —
  don't say "agent"/"subagent"/"spawn".
- **Move:** treat any helper brought in as starting **without** the prior
  conversation's context (most tools do this by default). It will likely
  **rediscover the participant's own Task 2–3 divergences** (e.g. UI "ALL" vs
  server "ANY", cased vs lowercased tags) or contradict a decision they thought
  was settled. Let it play out.
- **Probe:** "What did you expect it to already know? Did it inherit anything
  from the assistant that brought it in? It just flagged something you'd decided —
  why didn't it know? How would you describe their relationship?"

### P5 — One blocked stream (optional, Task 5)
- **Setup:** multiple chats running.
- **Move:** leave **one** chat's question unanswered so it blocks, while others
  continue.
- **Probe:** "What's blocked — everything, or one part? Where would you expect to
  see that something needs you?"

### P6 — Changes-view scope (observation-only, no set-up)
- **What it tests:** how the participant reads the Agent window's **Changes
  view** — do they treat it as **session/agent-scoped** (it shows what *this*
  effort changed, and changes roll up per session — aligns with the reference
  model) or as a **repo-wide** "everything that's different" view? Of particular
  interest: when work is split across **multiple chats/agents**, do they expect
  one chat's Changes view to show **another chat's** edits?
- **No set-up, no seeded edit.** The participant must feel they've **just got
  started** on a clean app — do **not** plant any pre-existing change. This probe
  rides on the changes the participant's own agents make during Tasks 1–4.
- **Move (observe, don't lead):** as agents edit files, watch how the participant
  uses the Changes view — which one they look at, whether they're surprised by
  what is or isn't listed, and whether they expect a combined vs. per-effort view.
- **Probe (one, neutral, at a natural pause):** "What do you think this Changes
  list is showing — everything that's different in the project, or just part of
  it? If your other chat/agent also edited files, would those show up here too?"
- **Listen for:** repo-wide expectation (a combined, global diff) vs.
  session/agent-scoped reading (changes belong to the effort that made them and
  roll up to the session). Where do they think the **boundary** of "what counts
  as a change here" sits — the repo, the session, or the individual chat/agent?

---

## Mapping: perturbation → concept → scoring dimension

| Perturbation | Concept tested | Scoring dimension(s) |
| --- | --- | --- |
| Task 1 (no perturbation) | Baseline: how they create/name/divide parallel threads | Unit of work; Session ≠ Chat (observation only, not scored as breakdown) |
| P2 / D-filter, D-tags | Context propagation across the chat boundary; decision ownership | Context model; Independence; Session ≠ Chat |
| P2b / D-fork | What a **forked** stream inherits: history vs. decision vs. shared workspace | Session ≠ Chat; Context model; Independence |
| P3 / D-search | Independence of streams; context boundaries | Independence; Context model |
| P4 / re-surfaced divergences | Hierarchy & context inheritance | Hierarchy; Context model |
| P5 | Session- vs chat-level state | Session ≠ Chat; Lifecycle |
| P6 / changes-view scope | Is change-tracking repo-wide or session/agent-scoped? | Session ≠ Chat; Context model |

## Guardrails
- Never use system terms ("scope", "stream", "context inheritance", "session vs
  chat") while probing — mirror the participant's words.
- **Don't supply mechanism words either.** Avoid leading with "new chat",
  "agent", "subagent", "spawn", "thread". The task cards say neutral things
  ("interface/server side", "stages", "other assistants"); let the participant
  choose how to separate the work and **adopt whatever word they use** for it.
  What word they reach for is itself data.
- Don't present a divergence as a code bug or "frontend vs backend impl" —
  independent internal implementations are *legitimate*. The point is the
  **missing shared decision**: nothing forced the two efforts to agree. Probe
  where that decision should have lived.
- The custom agents are **not** told they're context-isolated — that's the
  tool's natural default. Don't describe them to the participant as isolated; let
  the gap surface on its own.
- Perturb **once** and observe; don't pile on. If a participant is distressed or
  stuck, relieve the perturbation and move on.
- If you accidentally leak terminology or over-steer, **note it** on the scoring
  sheet so analysis can discount that moment.

## Resetting between sessions
The backend store is in-memory and **reseeds on restart**. Before each
participant: restart the backend (`npm run dev:backend`) and **restore the
`noteshelf/` working tree** — participants will have edited source files to add
tags/filtering/search, so reset to a clean checkout (or keep a pristine copy per
session). Also clear any new chats/agents from the previous participant.
