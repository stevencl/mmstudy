# Cross-Participant Analysis & Synthesis Template

> Use after all sessions to turn per-participant scoring sheets into the study's
> deliverables (success criteria §11 of the study plan): a taxonomy of mental
> models, divergence patterns, evidence-based conceptual gaps, and design
> actions.

## 1. Score matrix

Transfer each participant's dimension scores (0/1/2) here.

| Participant | Exp. | 1 Session≠Chat | 2 Context | 3 Independence | 4 Hierarchy | 5 Unit of work | 6 Lifecycle | Total/12 |
| --- | --- | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| P01 |  |  |  |  |  |  |  |  |
| P02 |  |  |  |  |  |  |  |  |
| P03 |  |  |  |  |  |  |  |  |
| P04 |  |  |  |  |  |  |  |  |
| P05 |  |  |  |  |  |  |  |  |
| P06 |  |  |  |  |  |  |  |  |
| P07 |  |  |  |  |  |  |  |  |
| P08 |  |  |  |  |  |  |  |  |
| **Mean** |  |  |  |  |  |  |  |  |

> **Reading the matrix:** the lowest-mean columns are the weakest concepts. The
> study plan predicts these will be **Independence**, **Context model**, and
> **Session ≠ Chat** (scope vs stream). Confirm or refute with your data.

## 2. Divergence patterns (cluster the breakdowns)

For each recurring pattern, record frequency and representative evidence.

| Pattern | # participants | Representative quote (ID, time) | Which perturbation surfaced it |
| --- | --- | --- | --- |
| Expect implicit context sharing across chats |  |  | P2, P3 |
| Assume a decision told to one chat propagates |  |  | P2 |
| Assume spawned helpers inherit parent context |  |  | P4 |
| Treat a chat as identical to a task |  |  | Tasks 2–3 |
| Conflate the shared scope with a single stream |  |  | Task 0, P5 |
| Expect one block to halt all work (or vice versa) |  |  | P5 |
| Read the Changes view as repo-wide, not session-scoped |  |  | P6 |
| Expect a forked conversation to have its own files, not just its own history |  |  | P2b |

## 2b. Parallel-work behaviour tally (Task 1, observation-only)

Aggregate the §C2 codes from each scoring sheet. These are descriptive, not
scored — use them to characterise *how* people work and to contextualise the
divergence patterns above.

| Code | Options → counts |
| --- | --- |
| **O1 Creation gesture** | new chat __ · new session __ · new window/tab __ · spawned sub-agent __ · unsure __ |
| **O2 Naming pattern** | by layer __ · by task __ · by role/persona __ · default/unnamed __ · other __ |
| **O3 Partitioning** | by layer __ · by task type __ · lead+assist __ · ad hoc __ |
| **O4 Attention** | serial __ · rapid switch __ · wanted overview __ · lost track __ |
| **O5 Permissions** | clean __ · confused which thread __ · approved blindly __ · n/a __ |
| **O6 One vs several** | one shared __ · several independent __ · mixed __ |
| **O7 Vocab drift** | same as baseline __ · shifted __ |

> **Look for links:** e.g. do participants who create a "new session" (O1) and
> frame work as "one shared thing" (O6) also score higher on Session≠Chat? Do
> "new chat / several independent" participants cluster with the implicit-sharing
> divergence pattern? Note any such associations (qualitative, given small N).

## 2c. PRE → POST model shift (drawings)

Compare each participant's **PRE** sketch (Task 0) with their **POST** drawing
(replay). The delta isolates what the *tool exposure* taught them from what they
*brought in*.

| Direction of shift | # participants | Typical trigger (which breakdown) |
| --- | --- | --- |
| Toward the reference model (scope/stream became clearer) |  |  |
| Away / more confused |  |  |
| No change (model was stable — entrenched or already aligned) |  |  |

> **Read the delta, not just the endpoint.** A participant who *started* with "one
> big brain" and *moved* toward "separate windows, shared project" tells you the
> product's model is **learnable**; one who stayed on "one big brain" despite the
> breakdowns tells you it's **sticky** and needs stronger signposting.

## 3. Mental-model taxonomy

Group participants into 2–4 archetypes by the *shape* of their model. Suggested
starting archetypes (rename to fit your data):

- **"One big brain"** — assume all chats share memory and decisions automatically.
- **"Org chart"** — assume a lead/worker hierarchy with context flowing down.
- **"Separate windows, shared project"** — closest to the reference model.
- **"Tasks in tabs"** — chat == task, little notion of a shared scope.

For each archetype: who fits, defining beliefs, where it breaks, design
implication.

## 4. Conceptual gaps (evidence-based)

For each gap, state: the system's model → the common user model → the consequence.

| System model | Common user model | Consequence / risk | Strength of evidence |
| --- | --- | --- | --- |
| Chats are independent streams | Chats share a brain | Surprise when knowledge doesn't carry; duplicated/contradictory work | |
| Decisions live where you put them | Decisions are global | Stale/contradictory behaviour across chats | |
| Spawned chats are peers | Helpers inherit context | Mistrust / confusion when a helper "forgets" | |
| Status rolls up from peers | One block = all blocked | Misjudge progress / over- or under-react | |

## 5. Design recommendations

Translate each confirmed gap into an actionable recommendation for product/design.
Phrase as: *Because users believe X, the product should Y.*

1.
2.
3.

## 6. Study success check (§11)

- [ ] Clear taxonomy of user mental models produced
- [ ] Identifiable divergence patterns documented
- [ ] Evidence-based articulation of conceptual gaps
- [ ] Actionable insights for product design

## 7. Threats to validity / caveats
- Moderator terminology leakage (see scoring sheets §E) — discount affected moments.
- Tool differences across participants (different AI tools behave differently).
- Small N — report patterns and quotes, not statistics. Avoid over-claiming.
