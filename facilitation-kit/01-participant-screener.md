# Participant Screener — Multi-Chat Mental Model Study

> Goal: recruit professional developers who actively use AI coding tools and are
> comfortable across frontend and backend, while screening out people whose
> answers would bias the study (e.g. they already work on agent-harness internals
> and know the exact "session vs chat" terminology).

**Target N:** 8–12 participants (qualitative). Recruit 2–3 reserves.
**Estimated screener length:** 3–4 minutes.

---

## Section A — Role & experience

1. **What best describes your current role?**
   - [ ] Software engineer / developer
   - [ ] Engineering manager who still codes weekly
   - [ ] Data / ML engineer
   - [ ] Other (specify): ____________
   - [ ] Not currently writing code → **screen out**

2. **How many years have you worked as a professional developer?**
   - [ ] < 2 years → *maybe (reserve)*
   - [ ] 2–5 years → **qualify**
   - [ ] 6–10 years → **qualify**
   - [ ] 10+ years → **qualify**

3. **In a typical month, do you work across both frontend and backend code?**
   - [ ] Yes, regularly → **qualify**
   - [ ] Sometimes → **qualify**
   - [ ] Rarely / never → **screen out**

## Section B — AI coding tool usage

4. **Which AI coding tools have you used in the last 3 months?** (select all)
   - [ ] GitHub Copilot (IDE)
   - [ ] GitHub Copilot CLI
   - [ ] Claude Code
   - [ ] Codex / ChatGPT for coding
   - [ ] Cursor / Windsurf / other agentic IDE
   - [ ] Other: ____________
   - [ ] None → **screen out**

5. **How often do you use an AI coding assistant?**
   - [ ] Daily → **qualify**
   - [ ] A few times a week → **qualify**
   - [ ] A few times a month → *maybe (reserve)*
   - [ ] Less than monthly → **screen out**

6. **Have you ever run more than one AI chat/agent at the same time on the same
   project (e.g. parallel tasks, a "team" of agents, multiple terminals/tabs)?**
   - [ ] Yes, deliberately and often → **qualify**
   - [ ] Once or twice / experimented → **qualify (ideal)**
   - [ ] No, always one at a time → **qualify** (we want a range here)

## Section C — Bias / exclusion screens

7. **Do you currently build or contribute to the internals of an AI agent
   framework, agent harness, or multi-agent orchestration platform?**
   - [ ] Yes → **screen out** (too close to the system model under test)
   - [ ] No → **qualify**

8. **Have you participated in a research study about AI agent "sessions" or
   "multi-chat" features in the last 6 months?**
   - [ ] Yes → **screen out**
   - [ ] No → **qualify**

## Section D — Logistics

9. Comfortable thinking aloud and sharing your screen for a 90-minute moderated
   session? **[ ] Yes  [ ] No → screen out**
10. Comfortable with the session being recorded for internal research use?
    **[ ] Yes  [ ] No → screen out**
11. Time zone / availability windows: ____________
12. Preferred AI tool to use during the session (we will accommodate where
    possible): ____________

---

## Quota guidance

Aim for a mix on **parallel-agent experience** (Q6) so we can compare mental
models across exposure levels:

| Segment | Target |
| --- | --- |
| Heavy parallel-agent users | 3–4 |
| Light / occasional parallel users | 3–4 |
| Single-chat-only users | 2–3 |

Avoid over-indexing on power users — single-chat users often reveal the
strongest conceptual divergences.
