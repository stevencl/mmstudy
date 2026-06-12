Multi-Chat Mental Model Study
1. Overview
Purpose
Understand how developers conceptualise multi-agent workflows and compare their mental models to the system’s conceptual model defined in multi-chat.md.
This study aims to:
•	Identify how developers naturally think about sessions, chats, agents, and context
•	Surface breakdowns where expectations do not match system behaviour
•	Compare participant mental models to the reference model
•	Provide actionable insight for product and design teams

Reference conceptual model (summary)
From the multi-chat document:
•	A session is a shared coordination scope
•	A chat is a stream of interaction within that scope
•	One session contains multiple chats
•	Chats are independent but share session-level context
Important constraints:
•	No chat-to-chat communication
•	No explicit hierarchy (no parent/child agents)
•	Coordination occurs outside the feature layer
Key distinction:
→ Session = scope
→ Chat = stream

Core research question
Where does the user’s mental model diverge from the system’s conceptual model—and why?

2. Study design
Method
•	Moderated task-based UX study
•	Behavioural observation + targeted perturbations
•	Post-task conceptual reconstruction

Session length
90 minutes

Participants
•	Professional developers
•	Familiar with AI coding tools (Copilot, Claude Code, etc.)
•	Comfortable working across frontend + backend systems

Stimulus application
Noteshelf — simple note-taking app
Capabilities:
•	Create/edit/delete notes
•	Add tags
•	Filter notes
•	Search notes
Code structure:
1     noteshelf/
2       frontend/
3       backend/
4       shared/
5       tests/
Design principles:
•	Easy to understand quickly
•	Clean modular structure
•	Subtle cross-layer inconsistencies for breakdowns

3. Key conceptual dimensions
Participants will be evaluated across six dimensions:
1.	Session vs Chat distinction
2.	Context / memory model
3.	Independence of chats
4.	Hierarchy assumptions
5.	Unit of work (chat vs task vs agent)
6.	Lifecycle model (chat creation/removal)

4. Session flow
Time	Activity
0–10 min	Introduction + baseline elicitation
10–25 min	Task 1: Parallel test generation
25–45 min	Task 2: Tagging + filtering
45–60 min	Task 3: Search (plan/build/review)
60–75 min	Task 4: Agent investigation
75–90 min	Replay + conceptual reconstruction

5. Tasks and perturbations

Task 0 — Baseline mental model
Instructions:
Imagine you have multiple AI agents helping you work on this project.How would you organise your work?
Prompts:
•	What are the separate things you would create?
•	What does each one do?
•	What should each one know?
•	What is shared?
Goal:
Elicit native concepts without system influence.

Task 1 — Parallel test generation
Instructions:
The app has no tests.Use multiple agents or chats to add tests for frontend, backend, and shared logic.Divide the work however you think makes sense.
Perturbation:
•	Frontend assumes tag case preserved
•	Backend assumes lowercase normalisation
Moderator probes:
•	Should these agents have shared understanding?
•	Where should that knowledge live?
•	If one learns something, who should know?
Concept tested:
•	Shared context vs independent streams

Task 2 — Tagging and filtering
Instructions:
Add tagging and filtering functionality.Clarify requirements as needed.
Perturbation:
•	One agent asks ANY vs ALL filtering
•	Participant answers
•	Another agent proceeds differently
Moderator probes:
•	Who received that clarification?
•	Where does that decision live?
•	Should other agents pick it up?
Concept tested:
•	Context propagation
•	Decision ownership

Task 3 — Search (plan/build/review)
Instructions:
Add search functionality.Use separate agents/chats for planning, implementation, and review.
Perturbation:
•	Planner defines full behaviour
•	Implementer receives partial context
•	Reviewer detects mismatch
Moderator probes:
•	Did you expect shared knowledge?
•	Should review be independent?
•	What should be shared vs separate?
Concept tested:
•	Independence of streams
•	Context boundaries

Task 4 — Agent investigation
Instructions:
Ask an agent to check consistency across the system.Allow it to spawn other agents if needed.
Perturbation:
•	Worker agent lacks prior context
•	Produces inconsistent recommendation
Moderator probes:
•	What did you expect it to know?
•	Did it inherit context?
•	What is its relationship to the parent?
Concept tested:
•	Hierarchy assumptions
•	Context inheritance

Task 5 — Blocked stream
Instructions:
Continue until all agents are complete or need input.
Perturbation:
•	One agent blocks on missing clarification
•	Others continue working
Moderator probes:
•	What is blocked?
•	Is everything blocked or one stream?
•	Where should status appear?
Concept tested:
•	Session vs chat-level state

6. Replay and conceptual reconstruction
Participants review key moments and describe the system.
Elicitation:
•	What are the different parts of the system?
•	What would you call each?
•	Which things are grouped together?
•	Which are independent?
Activity:
Participants draw a conceptual model:
•	Entities (nodes)
•	Relationships (edges)
•	Context boundaries

7. Analysis framework
Each participant is scored across dimensions.
Dimension	0 = mismatch	1 = partial	2 = aligned
Session ≠ Chat	Conflated	Partial	Clear distinction
Context model	Per-chat	Mixed	Session-level
Independence	Expect sync	Mixed	Independent
Hierarchy	Strong	Partial	Flat
Unit of work	Chat = task	Mixed	Distinct
Lifecycle	Static	Mixed	Dynamic

Output format
For each participant:
1     Mental model summary:
2     
3     - Unit of work:
4     - Context model:
5     - Relationship model:
6     - Lifecycle model:
7     
8     Breakdowns observed:
9     - Context mismatch
10     - Clarification failure
11     - Sub-agent confusion
12     
13     Alignment:
14     - Session as scope: low / medium / high
15     - Chat as stream: low / medium / high

8. Expected outcomes
Likely findings:
•	Users conflate session and chat
•	Users expect implicit context sharing
•	Users assume hierarchy (parent/child agents)
•	Users treat chats as tasks
Weakest concepts:
•	Scope vs stream distinction
•	Independence of chats
•	Location of memory and decisions

9. Key principle
Insight comes from breakdowns, not smooth use
Perturbations are designed to expose:
•	hidden assumptions
•	mismatched expectations
•	implicit mental models

10. Moderator guidance
•	Avoid introducing system terminology
•	Use neutral language
•	Focus on expectations vs outcomes
•	Probe reasoning, not correctness

11. Study success criteria
The study is successful if it produces:
•	Clear taxonomy of user mental models
•	Identifiable divergence patterns
•	Evidence-based articulation of conceptual gaps
•	Actionable insights for product design

12. Optional extensions
Future iterations may include:
•	Comparing CLI vs UI mental models
•	Longitudinal follow-up (model evolution over time)
•	A/B testing different conceptual framings

End of Study Plan
