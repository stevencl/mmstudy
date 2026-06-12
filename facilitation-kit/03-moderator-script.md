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
- [ ] Participant's chosen AI tool ready, able to open multiple chats/agents
- [ ] Task cards (`05-task-cards.md`) ready to reveal one at a time
- [ ] Note-taking / scoring sheet (`07-observation-scoring-sheet.md`) open
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

### Tool & app orientation (≈3 min)
> "First, show me the AI setup you'd normally use for a project like this. Open
> it the way you usually would."

[Let them open their tool. Note: do they open one chat or several by default?
Note their spontaneous vocabulary — write exact words on the scoring sheet.]

> "Here's the app we'll work on — it's called Noteshelf. Take a minute to look
> around. It's a small note-taking app: notes, tags, filtering, search."

[Give them ~2 min to skim the README / code. Don't explain the structure.]

### Task 0 — Baseline mental model (≈5 min)
[Reveal **Task 0 card**. Read the instruction, then go quiet.]

> "Imagine you have **several AI assistants** helping you on this project. How
> would you organise the work between them?"

[Probes — ask as needed, neutrally:]
- "What separate things would you set up?"
- "What would each one do?"
- "What should each one **know**?"
- "Is anything shared between them? What?"

[**Capture verbatim**: the nouns they use for the "things" (tabs? agents?
sessions? chats? workers?), and whether they describe anything shared. This is
your pre-exposure baseline for the scoring sheet.]

---

## 10–25 min · Task 1 — Parallel test generation

[Reveal **Task 1 card**.]
> "This app has no tests. I'd like you to add tests for the frontend, the
> backend, and the shared logic. Please use **more than one** AI chat or agent,
> and divide the work however makes sense to you."

[Let them set up and work. Observe how they partition the work and whether they
expect the parallel workers to share any understanding.]

> **Perturbation (built into the code — faults A):** the frontend keeps tag text
> as typed (e.g. `"Work"`) while the backend stores tags lowercased (`"work"`).
> The two test efforts will encode **contradictory assumptions about tag case**.
> [You don't need to force this; it emerges when they test tag behaviour. If
> they don't hit it, you may steer: "What does each side assume a tag looks
> like?"]

[Probes when the divergence surfaces — or proactively near the end:]
- "Should these two efforts share an understanding of how tags work?"
- "Where should that knowledge live?"
- "If one of them figures out the rule, who else should know it?"

[**Listen for:** do they expect the two chats to *automatically* share what they
learned? Do they treat them as one shared brain or two independent ones?]

---

## 25–45 min · Task 2 — Tagging and filtering

[Reveal **Task 2 card**.]
> "Now add tagging and filtering. Treat me as the product owner — ask me to
> clarify requirements whenever you need to."

> **Perturbation (live + faults B):** when the participant asks (or you prompt
> one chat to ask) **"should filtering by multiple tags match ANY of them or
> ALL of them?"**, give a clear answer **to that one chat only** (recommended:
> say **"ALL"**). The backend already implements **ANY (OR)**, and the UI hint
> reads *"Showing notes with all selected tags."* So the decision you gave lives
> in only one place and contradicts the running code.
> [Mechanics in `06-moderator-guidance.md`. If no chat asks, prompt one:
> "Before you build this, is there anything you'd want to check with me?"]

[Probes after the clarification is given:]
- "Who just received that decision?"
- "Where does that decision now live?"
- "Do the other chats/efforts know about it? Should they?"
- "If you opened a fresh chat right now and asked it to filter, what would it
  assume?"

[**Listen for:** assumption that a decision told to one chat propagates to all;
confusion about where a shared decision is recorded.]

---

## 45–60 min · Task 3 — Search (plan / build / review)

[Reveal **Task 3 card**.]
> "Add search. This time, use **separate** chats or agents for the three stages:
> one to **plan** the behaviour, one to **build** it, and one to **review** it."

> **Perturbation (workflow + fault C):** encourage the planner to specify full
> behaviour (e.g. "search should match title, body, and tags, case-insensitive").
> Then have the implementer work from **only partial context** (don't hand it the
> planner's full spec — let the participant decide what to pass). The existing
> `searchNotes` helper matches **title only**, so the reviewer (or a test) will
> find a mismatch between the plan and the build.

[Probes:]
- "When you opened the build chat, what did you expect it already knew from the
  planning chat?"
- "Should the review be done by something that shares the planner's knowledge,
  or something independent?"
- "What information *should* travel between these three, and what shouldn't?"

[**Listen for:** expectation of automatic context hand-off between stages;
beliefs about whether independence is good (unbiased review) or bad (lost
context).]

---

## 60–75 min · Task 4 — Agent investigation (+ optional Task 5)

[Reveal **Task 4 card**.]
> "Ask one of your AI agents to check the system for consistency across the
> frontend, backend, and shared code. If it can, let it bring in other agents to
> help."

> **Perturbation:** a spun-up helper agent lacks the earlier context and so
> produces an inconsistent or off-base recommendation (it will likely rediscover
> the tag-case / filter / search mismatches from scratch, or contradict an
> earlier decision). Let that play out.

[Probes:]
- "What did you expect this new helper to already know?"
- "Did it inherit anything from the agent that started it?"
- "How would you describe the relationship between the two?"

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

## 75–90 min · Replay + conceptual reconstruction

> "We're done with the tasks. I'd like to replay a couple of moments and have you
> describe the system as you now understand it."

[Replay 2–3 key moments you flagged (e.g. the tag-case clash, the ANY/ALL
decision, the blank helper agent). For each:]
> "Walk me through what you thought was happening here, and what you expected."

### Drawing activity (≈8 min)
> "Could you sketch how you think this system is organised? Draw the **parts**,
> how they **relate**, and where you think **knowledge or memory** lives. Use any
> words and shapes you like."

[Hand over the drawing template (`08-conceptual-model-template.md`) or a blank
canvas. While they draw, ask:]
- "What would you call each of these parts?"
- "Which things are grouped together? Which are independent?"
- "If one part learns something, who else knows it?"
- "What stays the same across all of them, and what's separate?"

### Wrap-up (≈2 min)
> "Last thing — was anything surprising or confusing today? If you could change
> one thing about how these AI assistants are organised, what would it be?"

> "Thank you. This was exactly the kind of insight we're after."

[Stop recording. Save artifacts against the participant ID: recording, drawing,
scoring sheet, notes.]

---

## Post-session (moderator, ≈10 min, do immediately)
- [ ] Complete the scoring sheet while fresh (`07-...`).
- [ ] Note 2–3 standout quotes with timestamps.
- [ ] Flag any moment where your prompting may have leaked system terminology.
- [ ] File artifacts under the participant ID.
