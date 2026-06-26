# Setting Up the Member Area

The marketing site runs with no configuration. The **member dashboard** (auth +
executive tracking) needs a free Supabase project. This takes about five minutes.

## 1. Create a Supabase project

1. Go to <https://supabase.com> and create an account (free tier is plenty).
2. Click **New project**. Give it a name (e.g. `kingdom-leadership`), choose a
   region close to your members, and set a database password (save it somewhere).
3. Wait ~1 minute for the project to provision.

## 2. Add your keys

1. In the Supabase dashboard, open **Project Settings → API**.
2. Copy the **Project URL** and the **anon / public** key.
3. In the project root, copy the example env file and paste your values:

   ```bash
   cp .env.local.example .env.local
   ```

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-KEY
   ```

## 3. Create the database tables

1. In Supabase, open **SQL Editor → New query**.
2. Open [`supabase/schema.sql`](supabase/schema.sql) from this repo, copy its
   full contents into the editor, and click **Run**.
3. This creates the `profiles`, `scoreboard_assessments`, and `daily_entries`
   tables, turns on row-level security (each executive sees only their own
   data), and adds a trigger that creates a profile automatically on sign-up.

## 4. (Recommended for testing) Relax email confirmation

By default Supabase emails a confirmation link before a new account can sign in.

- To test instantly, go to **Authentication → Providers → Email** and turn
  **Confirm email** off. New sign-ups are then logged in immediately.
- For production, leave it on. Confirmation links point back to
  `/auth/confirm`, which this app already handles. Set your site URL under
  **Authentication → URL Configuration** (e.g. `http://localhost:3000` in dev).

## 5. Run it

```bash
npm install
npm run dev
```

- Marketing site: <http://localhost:3000>
- Create an account: <http://localhost:3000/signup>
- Member dashboard (after sign-in): <http://localhost:3000/dashboard>

## What members can do today

- **Sign up / sign in** with email + password (name, company, title captured).
- **The Five Scoreboards** — self-assess Business, Leadership, Character,
  Generosity, and Spiritual vitality from 0–100, with reflections. Every save
  is a new dated reading, so history and growth are preserved.
- **Daily Rhythm** — record Morning (scripture, devotional, reflection, prayer),
  Midday (quote, business challenge), and Evening (gratitude, journal, prayer)
  entries. One row per day per period; revisiting updates it.
- **Overview** — a composite standing across the five scoreboards plus today's
  rhythm progress, all in the brand's monochrome editorial style.

## Coming next (scaffolding ready)

The five development tracks with progress, the generosity deliverables
(Personal Generosity Vision, Family Giving Plan, Legacy Plan, Kingdom Impact
Plan), peer accountability groups of four, and the annual life/business/
generosity/spiritual plans.
