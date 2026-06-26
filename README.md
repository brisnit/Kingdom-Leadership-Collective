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

The public marketing site runs with no configuration. The **member dashboard**
(executive accounts + tracking) is powered by Supabase — see
[`SETUP.md`](SETUP.md) for the five-minute setup (create a project, paste two
env values, run [`supabase/schema.sql`](supabase/schema.sql)).

## The member area (`/dashboard`)

Authenticated executives get a private, brand-matched dashboard:

- **Auth** — email/password sign-up & sign-in (Supabase Auth), with the private
  area guarded by a Next.js proxy/middleware session check.
- **The Five Scoreboards** — self-assessment of Business, Leadership, Character,
  Generosity, and Spiritual vitality (0–100) with reflections; every save is a
  new dated reading, preserving history and trend.
- **Daily Rhythm** — Morning / Midday / Evening entries mirroring the daily app
  loop from the marketing site.
- **Overview** — a composite standing plus today's rhythm progress.

Row-level security ensures each executive can only ever read or write their own
data.

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
