# MEG — My English Guide 🎮

> Your personal AI-powered English learning companion. 30 days. 8 tenses. A2 → B1.

A dark-themed, game-inspired web app for a Turkish game developer preparing for a B1 English speaking exam. Built with React + Vite, powered by Claude AI.

---

## Features

| Feature | Description |
|---|---|
| 📅 **Dashboard** | Exam countdown, today's lesson, 30-day timeline, quick stats |
| 📖 **Daily Lessons** | 8 tenses over 30 days — formula, signal words, examples (EN/TR), common mistakes |
| 💬 **AI Chat Coach** | Real-time streaming conversation with Claude. Corrects mistakes immediately, explains why |
| 📊 **Progress Tracker** | Streak counter, tense mastery grid, 30-day heatmap, error pattern analysis |
| ⚙️ **Settings** | API key setup, exam date, data reset |

## 30-Day Curriculum

| Days | Tense | Phase |
|---|---|---|
| 1–3 | Present Simple | Learn / Deepen / Drill |
| 4–6 | Present Continuous | Learn / Deepen / Drill |
| 7 | Mixed Review | Review |
| 8–10 | Past Simple | Learn / Deepen / Drill |
| 11–13 | Past Continuous | Learn / Deepen / Drill |
| 14 | Mixed Review | Review |
| 15–17 | Present Perfect | Learn / Deepen / Drill |
| 18–19 | Past Perfect | Learn / Deepen |
| 20 | Mixed Review | Review |
| 21–23 | Future (will) | Learn / Deepen / Drill |
| 24–27 | Mixed Practice | All tenses |
| 28–30 | Mock Exam | Speaking exam simulation |

---

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Run locally
```bash
npm run dev
```
Open `http://localhost:5173`

### 3. Add your Claude API key
1. Get a key at [console.anthropic.com](https://console.anthropic.com)
2. Open MEG → Settings → paste your key → Save

### 4. Build for production
```bash
npm run build
```
Output goes to `dist/` — ready for GitHub Pages.

---

## Deploy to GitHub Pages

1. Create a GitHub repo and push this project
2. Go to **Settings → Pages → Source: Deploy from branch → `main` → `/` (root)**
3. Push the `dist/` folder:

```bash
# Option A: deploy dist/ directly to gh-pages branch
npm run build
npx gh-pages -d dist

# Option B: serve from /docs
# Change vite.config.js outDir to 'docs', then push
```

Or use the GitHub Actions workflow (add `.github/workflows/deploy.yml`):

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci && npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## Tech Stack

- **React 18** + **Vite 6** — fast dev, optimised build
- **React Router v6** (hash-based — no server config needed)
- **Claude API** (`claude-sonnet-4-20250514`) — streaming via `anthropic-dangerous-direct-browser-access`
- **Pure CSS** — no UI library, custom dark/neon design system
- **localStorage** — all progress stored locally, no backend needed

---

## Privacy

- Your API key is stored **only in your browser's localStorage**
- No data is sent to any server except Anthropic's API when you chat
- All progress, streaks, and error patterns live entirely on your device

---

*Built for a Turkish game developer preparing for an A2→B1 English speaking exam in 30 days. Good luck! 🏆*
