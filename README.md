# svg153.github.io

Personal portfolio site for [Sergio Valverde (svg153)](https://github.com/svg153) — Platform Engineer, DevOps & SRE, GitHub Star.

Live at: **[svg153.github.io](https://svg153.github.io/web)**

## Stack

- Static HTML/CSS/JS — no build step, deploys directly to GitHub Pages
- GitHub-inspired dark theme
- Font Awesome + Primer CSS + Octicons (via CDN)
- Custom CSS split into `theme.css`, `layout.css`, `components.css`, `timeline.css`

## Local development

```bash
make serve
```

## Deploy

Pushes to `main` automatically deploy via [GitHub Actions](.github/workflows/deploy.yml).
