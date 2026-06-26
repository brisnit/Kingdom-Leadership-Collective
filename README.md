# Kingdom Leadership Collective

A luxury, black-and-white editorial marketing site for a premium mentorship
community for Christian business leaders. Built to feel like a $25,000/year
private leadership society — not a church brochure, not a SaaS landing page.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 3** with a strict monochrome design system
- **lucide-react** for the few icons used (menu / close only)
- Fonts: **Playfair Display** (serif display) + **Inter** (sans body) via `next/font`

## Design system (enforced)

- Black (`#0A0A0A`) and white (`#FFFFFF`) only — no color, no accents, no gradients
- Global `border-radius: 0` — every button, card, input, and container is a sharp rectangle
- Thin hairline rules, large whitespace, uppercase micro-labels with wide tracking
- Alternating black-on-white and white-on-black editorial sections
- Subtle fade-in-on-scroll only; respects `prefers-reduced-motion`

The palette and radius rules live in [`tailwind.config.ts`](tailwind.config.ts)
and [`app/globals.css`](app/globals.css).

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (type-checked)
npm run start    # serve the production build
```

## Structure

```
app/
  layout.tsx       # fonts + metadata
  page.tsx         # the one-page site (13 sections, assembled from components)
  globals.css      # base styles + radius enforcement + reveal animation
components/         # reusable building blocks
  Section, Eyebrow, Button, EditorialQuote, ScoreboardCard, RhythmPanel,
  TrackAccordion, ResourceGrid, MentorQuestion, DashboardMetric, CTASection,
  Hero, Navigation, Footer, Reveal
lib/
  content.ts       # all copy/data — edit here to change wording
  utils.ts         # className helper
```

## Editing content

All section copy lives in [`lib/content.ts`](lib/content.ts). Update text,
tracks, resources, or metrics there without touching layout code.
