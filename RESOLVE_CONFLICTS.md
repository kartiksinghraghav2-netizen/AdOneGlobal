# PR #7 Conflict Resolution Guide (index.html + style.css)

This repository change set adds **Tools section + service pages + main.js extraction**.

If GitHub shows conflicts in `index.html` and `style.css`, resolve them with this rule:

## 1) `index.html` — keep these blocks from this branch

1. In `<nav class="nav-links">`, keep:
   - `Services`
   - `About`
   - `Tools`
   - `Book Meeting`
   - `Store`
2. Keep the full `<!-- TOOLS -->` section with `id="tools"`.
3. Keep all service card links:
   - `href="services/social-media-marketing.html"`
   - `href="services/performance-advertising.html"`
   - `href="services/website-design-development.html"`
   - `href="services/content-video-marketing.html"`
   - `href="services/brand-strategy.html"`
   - `href="services/online-reputation.html"`
4. Keep the footer `Tools` anchor in `.footer-links`.
5. Keep:
   - `<script src="main.js"></script>`
   - floating WhatsApp with `rel="noopener noreferrer"`.

## 2) `style.css` — keep these class blocks from this branch

- `.page`, `.bg-orb`, `.bg-orb-left`, `.bg-orb-right`
- `.section-shell`
- `.service-link`, `.service-pointers`
- `.social-block`, `.social-links`, `.social-btn`
- `.tools-grid`, `.tool-card`, `.tool-generator`, `.hook-output`
- `.footer-social`
- reveal animation with `transition-delay: var(--delay, 0ms);`
- `@media (prefers-reduced-motion: reduce)`

## 3) Ensure new files exist after merge

- `main.js`
- `services/brand-strategy.html`
- `services/content-video-marketing.html`
- `services/online-reputation.html`
- `services/performance-advertising.html`
- `services/social-media-marketing.html`
- `services/website-design-development.html`

## 4) Quick post-merge checks

```bash
node --check main.js
python -m http.server 4175
curl -I http://127.0.0.1:4175/index.html
curl -I http://127.0.0.1:4175/main.js
```

If all pass (HTTP 200 + no syntax error), mark conflicts resolved and commit.
