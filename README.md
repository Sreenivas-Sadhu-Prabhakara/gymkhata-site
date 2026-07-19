# GymKhata — explainer site

A standalone marketing / explainer page for **GymKhata**, the renewal and
win-back engine for Indian gym and fitness-studio owners.

> **Kill silent churn.** Gyms don't lose members — they forget them. GymKhata
> tracks every membership expiry, runs a three-rung reminder ladder
> (expiring in 7 days → expired → 30-day win-back) into one outbox, and turns
> trials into paying members. **Rs 799/mo.**

This repo is **only the explainer website**. It is deliberately separate from
the product's application source.

## What's here

| File          | Purpose                                                        |
|---------------|----------------------------------------------------------------|
| `index.html`  | The whole page — all nine sections, in order.                  |
| `styles.css`  | All styling. Palette built around the accent `#DC2626`.        |
| `app.js`      | Sticky-nav shadow, smooth scroll, animated counters, and the hero "churn meter" story. Tiny, no dependencies. |
| `favicon.svg` | Inline dumbbell mark.                                          |

## Design notes

- **Palette:** warm near-black ink `#1A1514`, off-white paper `#FBF7F2`, a
  muted clay tint `#EFE6DB`, the accent red `#DC2626`, and a success green
  `#0F7A4D` for "renewed / converted" states.
- **Signature element:** the hero **churn meter** — a roster of member dots
  where some quietly fade to grey ("lapsing") and the reminder ladder pulls a
  few back to red ("won back"). It animates the product's entire thesis.
- **Product preview:** a pure-HTML/CSS dashboard "screenshot" with realistic
  Indian names, Bengaluru areas, and rupee figures.

## Running it

Fully self-contained — no build step, no CDNs, no external fonts or scripts.

```bash
# just open it
open index.html

# or serve locally
python3 -m http.server 8080   # then visit http://localhost:8080
```

Deploys to any static host (Netlify, Cloudflare Pages, GitHub Pages, S3)
unchanged — upload the folder as-is.

## Accessibility

- Keyboard focus is always visible; there's a skip-to-content link.
- `prefers-reduced-motion` is respected: counters snap to their value and the
  churn meter shows a static end-state instead of animating.
- The page never scrolls horizontally on mobile.

---

A **KARYA studio** build · contact **sreeni.nintendo@gmail.com**
