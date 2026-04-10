# CLAUDE.md — MEG Project Rules

## Workflow Orchestration

### 1. Plan Mode Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately — don't keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy
- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution

### 3. Self-Improvement Loop
- After ANY correction from the user: update `tasks/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project

### 4. Verification Before Done
- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### 5. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes — don't over-engineer
- Challenge your own work before presenting it

### 6. Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests — then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

---

## Task Management
1. **Plan First**: Write plan to `tasks/todo.md` with checkable items
2. **Verify Plan**: Check in before starting implementation
3. **Track Progress**: Mark items complete as you go
4. **Explain Changes**: High-level summary at each step
5. **Document Results**: Add review section to `tasks/todo.md`
6. **Capture Lessons**: Update `tasks/lessons.md` after corrections

---

## Core Principles
- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs.

---

## MEG Project Context

### What is MEG
MEG (My English Guide) is a free, serious English learning app for Turkish speakers. It is not a toy, not a game. It is a real English teacher in your pocket. Anyone can use it — no payment, no complexity. The entire focus is speaking, grammar practice, and error correction through AI conversation.

### Users
- Turkish speakers learning English
- Any level: A1, A2, B1, B2
- They come to PRACTICE, not to read
- Every screen should push them toward doing something

### Tech Stack
- React + Vite
- Firebase SDK v9+ (modular)
- React Router (hash router for GitHub Pages)
- Gemini 1.5 Flash API (hardcoded key, free for all users)
- Web Speech API (voice input)
- Google TTS API (voice output)
- No TypeScript — plain JavaScript
- GitHub Pages hosting

### Design — DO NOT CHANGE
- Background: #1a1a1a
- Surface: #262626
- Accent: #cc785c
- Text: #ececec / #8b8b8b
- System fonts only, no decorative fonts
- Claude-inspired dark theme — minimal, clean, flat
- All UI text in Turkish, grammar content in English

### Key Rules for This Project
- Never change visual design unless explicitly asked
- Always read existing files before making changes
- Firebase data must be structured exactly as defined in the spec
- Every error must be saved to Firestore automatically
- Gemini system prompt must be built dynamically from user's Firebase data
- Mobile-first always
- Loading states on every async operation
- Error boundaries on every page