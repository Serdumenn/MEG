# MEG — Project Status & Tasks

## Current State (Phase 2 Complete)

### Working Features
- [x] Dashboard with exam countdown, today's focus, 30-day timeline
- [x] Daily Lessons — 8 tenses, 30 days, EN/TR content, formula blocks, signal words
- [x] AI Chat with Claude API streaming (SSE), correction extraction
- [x] Progress Tracker — streak, mastery grid, heatmap, error patterns
- [x] Settings — Claude API key, exam date, data reset
- [x] Voice Input — Web Speech API mic, auto-send on final transcript
- [x] Voice Output — Browser TTS reads AI responses aloud, mute toggle
- [x] Personalized system prompt (Fatih's profile, phase-specific focus)
- [x] Dark cyberpunk theme, mobile-first, bottom nav / desktop sidebar
- [x] GitHub Pages compatible (hash router, relative base)

### File Map
```
src/
  main.jsx, App.jsx, App.css
  data/curriculum.js          — 8 tenses, 30-day schedule, system prompt builder
  hooks/useLocalStorage.js    — localStorage hook + helpers (streak, errors)
  hooks/useClaude.js          — Claude API streaming hook
  pages/Dashboard.jsx/.css    — Home page with countdown + timeline
  pages/Lesson.jsx/.css       — Daily tense lesson viewer
  pages/Chat.jsx/.css         — AI chat with voice I/O
  pages/Progress.jsx/.css     — Stats, mastery, error patterns
  pages/Settings.jsx/.css     — API key, exam date, reset
  components/Nav.jsx/.css     — Bottom tab / sidebar nav
  components/Toast.jsx/.css   — Global toast notifications
  components/ProgressRing.jsx — SVG circular progress
```

---

## Phase 3 — Dual AI + Enhanced Voice (In Progress)

### New Features
- [ ] Gemini AI as free default provider (AI Studio key)
- [ ] Claude as premium provider option
- [ ] Provider selector in Settings (two tabs)
- [ ] Provider-specific API key management
- [ ] Voice accent selector (en-US, en-GB, en-AU)
- [ ] Voice speed slider (0.5x–1.5x)
- [ ] Voice preview button in Settings
- [ ] Provider badge in Chat header

### New Files to Create
- [x] `src/hooks/useGemini.js` — Gemini streaming hook
- [x] `src/hooks/useAI.js` — Provider abstraction
- [x] `src/hooks/useVoice.js` — TTS hook (extracted from Chat.jsx)
- [x] `src/components/VoiceSettings.jsx` + `.css` — Voice controls

### Files Modified
- [x] `src/hooks/useLocalStorage.js` — Added AI_PROVIDER, GEMINI_API_KEY, VOICE_ACCENT, VOICE_SPEED
- [x] `src/pages/Chat.jsx` — Uses useAI + useVoice, shows provider badge
- [x] `src/pages/Chat.css` — Provider badge styles (.provider-gemini, .provider-claude)
- [x] `src/pages/Settings.jsx` — Provider tabs, conditional API key, voice settings section
- [x] `src/pages/Settings.css` — .provider-tabs, .provider-tab styles

### Build Status
✅ Production build passes — 54 modules, 244KB JS (78KB gzipped), 0 errors
