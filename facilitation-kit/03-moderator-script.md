# Moderator Script — Multi-Chat Mental Model Study

> **Purpose:** a complete, read-aloud-able facilitation script for the 90-minute
> session. Moderator-spoken lines are in **plain quotes**. Bracketed `[notes]`
> are instructions to you, the moderator — **do not read them aloud**.
>
> **Golden rules** (see also `06-moderator-guidance.md`):
> - Never introduce system terminology ("session", "chat", "scope", "stream",
>   "context", "agent hierarchy"). Mirror the participant's own words.
> - Probe **expectations vs. outcomes** and **reasoning**, never correctness.
> - Silence is your friend. Let them think aloud.
> - You are studying their model, not teaching them ours.

**Materials checklist:**
- [ ] Noteshelf running (backend + frontend), screen-share confirmed
- [ ] Working tree restored to a clean checkout (no tags/filter/search yet, and
  **no other edits** — the participant should feel they've just started)
- [ ] Participant's chosen AI tool ready, able to open multiple chats/agents
- [ ] **Frontend** and **Backend** custom agents available (or recreate by hand)
- [ ] Task cards (`05-task-cards.md`) ready to reveal one at a time
- [ ] Note-taking / scoring sheet (`07-observation-scoring-sheet.md`) open
- [ ] Drawing template (`08-conceptual-model-template.md`) ready for the **pre**
  sketch (Task 0) and the **post** update (replay)
- [ ] Recording started **after** consent
- [ ] Moderator-only perturbation guide (`06-...`) open for your reference

---

## 0–10 min · Introduction + baseline elicitation

### Welcome (≈2 min)
> "Thanks for joining. Over the next 90 minutes I'll ask you to work through a
> few short coding tasks on a small app, using your AI coding tools. I'm
> interested in how *you* think about the work — there are no right or wrong
> answers, and I didn't build the tools we're testing, so you won't hurt my
> feelings. The most useful thing you can do is **think out loud**: tell me what
> you expect, what surprised you, and why."

> "I'll mostly stay quiet and let you work. Sometimes I'll ask what you expected.
> You can skip anything or stop anytime. Any questions before we start?"

[Confirm recording consent is captured. Start recording.]

### App orientation (≈3 min)
> **Read this, not aloud.** Do **not** ask them to open or show their AI tool
> yet. Opening it now — or demoing "how you'd set it up" — primes a particular
> tooling frame before you've captured their *unprompted* mental model. Keep the
> tool closed through Task 0; it comes up naturally when they start Task 1.

> "Here's the app we'll work on — it's called Noteshelf. Take a minute to look
> around. It's a small note-taking app: right now it just creates, shows, and
> deletes notes."

[Give them ~2 min to skim the README / code. Don't explain the structure. Tool
still closed.]

### Task 0 — Baseline mental model (≈5 min, before the tool is open)
[Reveal **Task 0 card**. Read the instruction, then go quiet. This is a
**verbal/abstract** elicitation — they should answer from how they *imagine*
working, not by driving the tool. Keep the AI tool closed.]

> "Imagine you have **several AI assistants** helping you on this project. How
> would you organise the work between them?"

[Probes — ask as needed, neutrally:]
- "What separate things would you set up?"
- "What would each one do?"
- "What should each one **know**?"
- "Is anything shared between them? What?"

[**Capture verbatim**: the nouns they use for the "things" (tabs? agents?
sessions? chats? workers?), and whether they describe anything shared. This is
your pre-exposure baseline for the scoring sheet — taken **before** any tooling
frame has been introduced.]

### Pre-sketch — naive model (≈4 min)
[Use the **ModelCapture** app — make sure this participant is **set active** in
`/moderator`, then hand them the canvas at `/` (it shows only "Draw how you
imagine this works" — no PRE/POST, no ID). Paper template (`08-...`) is the
fallback. This is the **"before" half of a pre/post pair** — it captures their
model *before* the tool has shaped it, so analysis can compare it against the
end-of-session drawing and measure how exposure shifted their thinking.]

> "Before you start working, could you quickly sketch how you *imagine* this
> setup is organised — the **parts**, how they **relate**, and where you think
> **knowledge or memory** lives? Don't overthink it; a rough sketch of your
> current expectation is exactly what I want."

[Keep it light and fast — ~4 min. Don't probe deeply or correct; this is a
first-impression capture. Label it **PRE** and save it. The richer questioning
happens with the **POST** drawing at the end. If they're unsure what to draw,
reassure them a vague or partial sketch is fine — that itself is data.]

---

## 10–25 min · Task 1 — Parallel test generation *(observation & elicitation)*

> **Purpose of this task — read this, not aloud.** Task 1 is **not** a breakdown
> task. **No perturbation is introduced here**, and you should *not* steer toward
> any inconsistency. Its job is to let the participant **actually spin up several
> agents/chats and run them in parallel**, while you observe and elicit how they
> *conceptualise* what they are doing — how they create the threads, what they
> call them, how they divide work, how they switch and handle permission
> prompts, and what they think each one knows. Generating these tests takes ~5
> minutes of three agents working at once; that's plenty of real parallel
> experience to talk about. (No inconsistency is in play here; the
> context-propagation breakdowns emerge later, in Tasks 2–4.)

[Reveal **Task 1 card**.]
> "This app has no tests. I'd like you to add tests for the frontend, the
> backend, and the shared logic. Please use **more than one** AI assistant,
> and divide the work however makes sense to you."

[This is the **first time they open their AI tool** — watch the very first move:
do they open **one** chat/agent or **several** by default? Note their spontaneous
vocabulary as they set up (write exact words on the scoring sheet). Then let them
work. **Stay quiet on correctness** — the tests can pass or fail, it doesn't
matter. Watch the *act of creating and running* the threads.]

**Observe (capture on the scoring sheet, §B and the Task 1 prompts):**
- **Creation:** what exact action do they take to make a second/third thread —
  "new chat", "new session", a new window/tab? Do they hesitate?
- **Naming:** what do they *call* each thing they create? (Use their words.)
- **Partitioning:** how do they split the work — by layer (FE/BE/shared), by
  task, something else?
- **Switching & attention:** do they watch one at a time or expect a combined
  view? How do they track which is which? How do they handle permission/approval
  prompts arriving from different threads?

**Elicitation prompts — tie each to a natural moment, ask neutrally:**
- *(as they create the second thread)* "What did you just make? What would you
  call it?"
- *(while juggling several)* "How are you keeping track of which is which?"
- *(when an approval prompt pops up)* "What's asking for that — and on whose
  behalf?"
- *(near the end, with all three having run)* "While these three were running,
  did you think of them as **one thing** or **three separate things**? What, if
  anything, do they have in common?"

**Changes-view probe (P6 — observation-only, no set-up):** Once the agents have
edited files and the Changes view is populating, watch how the participant reads
it — which view they look at, and whether they expect one chat/agent's Changes to
include another's. At a natural pause, ask **once**, neutrally:
- "This Changes list — what do you think it's showing you right now?"
- "Does it show **everything** that's different in the project, or just **part**
  of it? What decides what shows up here?"
- *(if they've split work across assistants)* "If your other AI assistant also
  edited files, would those show up in this list too?"

[**Listen for:** whether they treat the Changes view as repo-wide ("all
differences") or session/agent-scoped ("what this effort did"). A session-scoped
reading aligns with the reference model (changes are tracked per session and roll
up); a repo-wide expectation that's violated is a breakdown worth recording.]

[**Listen for (record, don't correct):** whether they frame the threads as
independent or as one shared effort; whether 'what they share' is the workspace,
the task, or nothing; the vocabulary they reach for. This is pre-breakdown
baseline that Tasks 2–4 will test against — do **not** resolve or provoke
anything here.]

---

## 25–45 min · Task 2 — Tagging and filtering *(context across the chat boundary)*

> **Purpose — read this, not aloud.** This is the study's central
> context-propagation probe. The participant builds tagging with the **Frontend**
> assistant, then has the **Backend** assistant implement the server side. The
> Backend side starts with **no knowledge** of what was decided with the Frontend
> assistant. The breakdown is **emergent and structural** — does the participant
> assume the Backend assistant already knows the Frontend's decisions (tag
> format, case handling, what "filter by multiple tags" means)? There is **no
> seeded code bug** here; the divergence comes from the boundary between the two
> efforts.

[Reveal **Task 2 card**.]
> "Noteshelf doesn't have tags yet. I'd like you to add tags to notes and the
> ability to filter by tag. Please build the interface first with the
> **Frontend** assistant. Then have the **Backend** assistant implement the
> server side. I'm the product owner — ask me to clarify anything you need."

> **Read this, not aloud — terminology.** Don't say "new chat", "session",
> "stream", or "spawn". Let the participant reach for the Backend assistant
> however they naturally do, and **adopt whatever word they use** for it.

### While they work with the Frontend assistant
[Let the Frontend assistant ask its clarifying questions. **A decision will get
made here that the Backend side won't have seen.** The richest one is usually
multi-tag filtering semantics.]

> **Live perturbation P2 — answer a key decision with the Frontend assistant
> only.** When the Frontend assistant asks (or you prompt it to) **"when several
> tags are selected, should it match notes with ANY of them or ALL of them?"**,
> give a clear answer — recommended: **"ALL"**. Also note any other decisions
> settled here (e.g. "tags keep their capitalisation", "tags are
> comma-separated"). [If the assistant doesn't ask, prompt: "Before you build
> this, anything you'd want to check with me?"]

[Capture on the scoring sheet: exactly which decisions were settled here.]

### When they brief the Backend assistant — observe before you probe
This is the heart of the study. Work through it in order; **do not prompt them to
carry anything over.**

**Observation 1 — the briefing.** Watch *what the participant puts into the
Backend brief*. Do they restate the decisions just settled with the Frontend
assistant (ALL-match, tag case, separators), or leave them out?
- *Restated* → note it; they recognised the second effort doesn't share the
  first's context.
- *Omitted* → **this is the key data point. Don't correct it.** You can't yet
  tell whether it was an **omission** (they'd have included it if nudged) or an
  **assumption** (they believe the Backend assistant already knows). The next two
  observations disambiguate.

**Observation 2 — does the assistant ask?** If the Backend assistant raises a
clarifying question about an omitted decision, that is a natural elicitation
moment — let it happen and watch the participant's reaction:
- Are they *surprised* it's asking (suggests they expected it to already know)?
- Do they answer *consistently* with the Frontend decision, or settle it
  differently (creating a live divergence)?

**Observation 3 — if neither happens** (they omitted it *and* the assistant just
implemented without asking): **record exactly what they did and what the
assistant produced**, then choose a moment to probe. Best timing: at the next
natural pause, or once a concrete divergence is visible on screen — not
mid-keystroke. Ask **one** neutral question and listen:
- "When you set the Backend assistant going, what did you expect it already knew
  about what you and the Frontend side decided?"
- "That filtering decision from earlier — does this one know it? Where does that
  decision actually live right now?"
- "If it implements filtering its own way, what happens?"
- "Where *should* a decision like that live so both sides agree?"

[**Listen for:** the assumption that the second effort inherits the first's
decisions; the moment of surprise/realisation when it doesn't; whether they reach
for the **shared** layer (or the product owner, or the code) as the home for the
decision. If the two sides do diverge (ALL in UI vs ANY on server; cased vs
lowercased tags), let it stand — it resurfaces in Task 4.]

---

## 45–53 min · Task 2b — An alternative version *(fork lineage: what a derived stream inherits)*

> **Purpose — read this, not aloud.** This probes the **fork** feature in the
> Agent window: forking creates a new conversation seeded with the parent's
> history up to the fork point. The question is **what the participant expects a
> forked conversation to carry** — its message history, the *decisions* settled
> in it (the ANY/ALL choice), and crucially whether they distinguish the forked
> **conversation** (an independent stream) from the shared **workspace/files**
> (one session, one working tree). A forked chat edits the *same files*, so
> building the opposite design typically **overwrites** the first on disk — there
> are not two codebases. Watch whether they expect two fully independent versions
> (a Session ≠ Chat violation) or realise the workspace is shared.

[Only run this once tagging actually works **one way**, with a concrete ANY/ALL
choice visible on screen.]

**Step 1 — elicit the expectation *before* they branch.** Before they touch any
mechanism, ask neutrally:
> "Imagine you could branch off from this exact moment to try a different version
> of the filtering. If you did — what would that branch already have, or already
> know?"

[Capture verbatim (§B2b). Listen for what they assume travels: the conversation
so far? the decision you settled together? the code already written? Do they
mention the **files** at all?]

[Reveal **Task 2b card**.]
> "You built multi-tag filtering one way. I'd like to see the **opposite** version
> too — the one you didn't build. Starting from where you are right now, find a
> way to try this alternative **without losing the version you've already got**,
> build it, then help me compare the two."

> **Discovery-first — read this, not aloud.** Do **not** say "fork", "branch",
> "new chat", or point at the feature. Watch whether they reach for forking
> themselves, choose another mechanism (new chat, copy the files, a git branch,
> undo/redo), or don't know how. **Whether they know forking exists is itself
> data.** Only if they're genuinely stuck after trying, offer the minimum: "Some
> tools let you branch a conversation from an earlier point — does yours?" Still
> let them find the actual control.

> **Live perturbation P2b — force the opposite design.** The alternative must be
> the **opposite** of their first choice: if they built **ALL**, the branch builds
> **ANY** (and vice-versa). If they're unsure what "opposite" means, that's the
> same D-filter decision resurfacing — answer it, as product owner, the opposite
> way to before.

**Observe (capture on §B2b):**
- **Mechanism chosen:** fork / new chat / duplicate files / git branch / other /
  stuck. What did they *call* it?
- **History inheritance:** in the new stream, do they re-explain the tagging
  context, or assume it's all there? Do they check?
- **Decision inheritance:** do they treat the earlier ANY/ALL decision as carried
  over, or re-decide it from scratch?
- **Shared-workspace moment:** do they notice the alternative is editing the
  **same files** as the original? Any surprise that the first version
  changed/was overwritten — or do they believe two separate versions now exist?
- **Back-propagation:** afterwards, do they expect the **original** conversation
  to know what the branch did?

**Probes — neutral, tied to a moment:**
- *(in the new stream)* "This one you just started — what does it know about what
  you and the earlier version worked out?"
- *(as they edit)* "The version you built first — where is it right now? What's
  happened to it?"
- *(comparing)* "How would you describe the relationship between these two — the
  same thing, or two separate things? What do they share?"
- *(if surprised the files changed)* "What did you expect to happen to the first
  version's code while you built this one?"

[**Listen for:** the belief that a fork is a fully independent *copy* (its own
history **and** its own files) vs. an understanding that the **conversation**
forked but the **workspace/session** is shared. The former is a clean Session ≠
Chat breakdown — pair it with their POST drawing at the replay.]

---

## 53–65 min · Task 3 — Search (plan / build / review)

> **Purpose — read this, not aloud.** Three **separate stages** (plan → build →
> review), kept independent, test whether the participant expects context to
> travel between stages. The breakdown is emergent: the planner writes a full
> spec, but the build stage only knows what the participant carries over.
> Whatever the implementer guesses (e.g. searches title only, or title+body) the
> reviewer — independent again — judges against *its* understanding, not
> necessarily the plan's.

[Reveal **Task 3 card**.]
> "Now add search. Please do it in **three separate stages**: one to **plan** how
> search should behave, then **build** it, then **review** what was built. Keep
> each stage on its own."

> **Read this, not aloud — terminology.** The card says "stages", not "chats".
> Watch which mechanism the participant chooses to keep the stages separate and
> **what they call it** — adopt their word; don't supply one.

> **Live perturbation P3 — encourage a rich plan, don't manage the hand-off.**
> In the planning stage, draw out a full spec ("what should search match — title?
> body? tags? case-sensitive?"). Then, when they move to building, **say nothing**
> about carrying the plan over — let them decide what to pass. Same going into
> the review stage.

[Probes:]
- "When you started building, what did you expect it already knew from planning?"
- "Should the reviewer share the planner's knowledge, or judge independently?"
- "What information *should* travel between these three, and what shouldn't?"

[**Listen for:** expectation of automatic hand-off between stages; whether they
see independence as a feature (unbiased review) or a bug (lost context).]

---

## 65–78 min · Task 4 — Consistency investigation (+ optional Task 5)

> **Purpose — read this, not aloud.** Tests whether the participant expects a
> helper brought in by another assistant to **inherit** the context that started
> it. Note: many tools won't bring in other helpers automatically just because
> you ask for a review — so the card invites it, and if the participant's tool
> *can* delegate but they don't reach for it, you may neutrally ask whether
> anything else could help (don't name "agents"/"subagents").

[Reveal **Task 4 card**.]
> "Ask one of your AI assistants to check the whole app — frontend, backend, and
> shared code — for anything that doesn't line up. If it can bring in other
> assistants to share the work, let it."

> **Perturbation P4:** a helper brought in to share the work lacks the earlier
> context and so produces an inconsistent or off-base recommendation. In this
> Design-A flow it will likely **rediscover the participant's own divergences**
> from Tasks 2–3 (e.g. the UI filtering "ALL" vs a server that does "ANY", or
> cased vs lowercased tags), or contradict a decision the participant thought was
> settled. Let that play out. [If nothing gets delegated and the tool supports
> it, prompt neutrally: "Could anything else help with this?"]

[Probes:]
- "What did you expect this new helper to already know?"
- "Did it inherit anything from the agent that started it?"
- "How would you describe the relationship between the two?"
- "It just flagged something you'd already decided — why didn't it know?"

[**Listen for:** assumption of parent→child inheritance; expectation of a
hierarchy; surprise that the helper started 'blank'.]

### Optional · Task 5 — Blocked stream (if time, ≈5 min)
[Reveal **Task 5 card** only if pace allows.]
> "Let everything run until each AI effort either finishes or needs something
> from you."

> **Perturbation:** arrange for **one** effort to block awaiting a clarification
> while the others keep going. [You can engineer this by leaving one chat's
> question unanswered.]

[Probes:]
- "What's blocked right now?"
- "Is *everything* waiting, or just part of it?"
- "Where would you expect to see that something needs your attention?"

[**Listen for:** whether they see 'blocked' as a property of the whole workspace
or of one stream; where they expect status to surface.]

---

## 78–90 min · Replay + conceptual reconstruction

> "We're done with the tasks. I'd like to replay a couple of moments and have you
> describe the system as you now understand it."

[Replay 2–3 key moments you flagged (e.g. the tag-case clash, the ANY/ALL
decision, the blank helper agent). For each:]
> "Walk me through what you thought was happening here, and what you expected."

### Drawing activity — POST (≈8 min)
[In **ModelCapture**, **set this participant active again** and hand them the `/`
canvas — it silently **pre-loads their first drawing** so they update it (no
"before/after" wording shown). If on paper, hand back their own PRE sketch. The
power of this step is the **comparison**: ask them to update it now that they've
worked with the system, and narrate what changed.]

> "Here's the quick sketch you drew at the start. Now that you've actually worked
> with it, I'd like you to **update it** — change anything that's different from
> how you imagined it, and add anything you've learned. Draw the **parts**, how
> they **relate**, and where **knowledge or memory** lives."

[While they revise, ask:]
- "What's different from your first sketch? What changed your mind?"
- "What would you call each of these parts?"
- "Which things are grouped together? Which are independent?"
- "If one part learns something, who else knows it?"
- "What stays the same across all of them, and what's separate?"
- "Where would you look to see that something needs your attention?"

[Label this **POST**. In analysis, the PRE→POST delta is itself a finding: how
much, and in what direction, did real exposure move their model toward (or away
from) the reference model?]

### Wrap-up (≈2 min)
> "Last thing — was anything surprising or confusing today? If you could change
> one thing about how these AI assistants are organised, what would it be?"

> "Thank you. This was exactly the kind of insight we're after."

[Stop recording. Save artifacts against the participant ID: recording, **PRE and
POST drawings**, scoring sheet, notes.]

---

## Post-session (moderator, ≈10 min, do immediately)
- [ ] Complete the scoring sheet while fresh (`07-...`).
- [ ] Note 2–3 standout quotes with timestamps.
- [ ] Flag any moment where your prompting may have leaked system terminology.
- [ ] File artifacts under the participant ID.
