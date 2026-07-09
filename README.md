# 🏁 F1 Vaguepost Generator

Generate random F1 rumours and cryptic paddock "vagueposts" for Twitter/X — the "if you know, you know 👀" energy, on tap.

**Live site:** https://jeppeolesen.github.io/f1-vaguepost-generator/

> ⚠️ Everything it produces is 100% fabricated. Any resemblance to actual silly season is purely coincidental (and honestly, indistinguishable).

## Features

- **Three modes** — 🎲 Surprise me, 📰 Rumour (structured ITK-style breaking news), 👀 Vaguepost (cryptic one-liners).
- **Fake tweet card** — randomised ITK persona, avatar, and engagement stats for the full screenshot experience.
- **One-click sharing** — copy the text or open a pre-filled X compose window.
- Press **Spacebar** to keep generating.
- Pure static site — HTML/CSS/JS, no build step, no dependencies.

## Project structure

```
index.html      # markup
css/style.css   # styling (F1-themed dark UI + tweet card)
js/data.js      # content banks: drivers, teams, templates…
js/app.js       # generator logic + UI wiring
```

Want funnier output? Edit the `rumours` / `vagueposts` template arrays and the word banks in [`js/data.js`](js/data.js). Tokens like `{driver}`, `{team}`, `{gp}` are filled in automatically.

## Deployment

Pushing to `main` triggers the [GitHub Pages workflow](.github/workflows/deploy.yml) which publishes the site automatically. In the repo, enable **Settings → Pages → Source: GitHub Actions** once.

## Local preview

It's static — just open `index.html`, or run a tiny server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```
