-- ============================================================================
-- Kingdom Leadership Collective — core schema
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New query).
-- It is idempotent: safe to run more than once.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- profiles — one row per executive, extending auth.users
-- ----------------------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  full_name   text,
  company     text,
  title       text,
  cohort      text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Profiles are viewable by their owner" on public.profiles;
create policy "Profiles are viewable by their owner"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Profiles are editable by their owner" on public.profiles;
create policy "Profiles are editable by their owner"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "Profiles are insertable by their owner" on public.profiles;
create policy "Profiles are insertable by their owner"
  on public.profiles for insert
  with check (auth.uid() = id);

-- ----------------------------------------------------------------------------
-- scoreboard_assessments — the Five Scoreboards, tracked over time.
-- Dimensions: business | leadership | character | generosity | spiritual
-- The dashboard reads the most recent assessment per dimension; history of
-- rows gives the trend ("growth, not comparison").
-- ----------------------------------------------------------------------------
create table if not exists public.scoreboard_assessments (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  dimension   text not null check (
                dimension in ('business','leadership','character','generosity','spiritual')
              ),
  score       integer not null check (score between 0 and 100),
  reflection  text,
  assessed_at date not null default current_date,
  created_at  timestamptz not null default now()
);

create index if not exists scoreboard_assessments_user_dim_idx
  on public.scoreboard_assessments (user_id, dimension, assessed_at desc);

alter table public.scoreboard_assessments enable row level security;

drop policy if exists "Assessments are owned by the user" on public.scoreboard_assessments;
create policy "Assessments are owned by the user"
  on public.scoreboard_assessments for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ----------------------------------------------------------------------------
-- daily_entries — the daily app loop (morning / midday / evening).
-- One row per user per day per period. `content` is JSONB so each period can
-- carry its own structured prompts without schema churn.
-- ----------------------------------------------------------------------------
create table if not exists public.daily_entries (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  entry_date  date not null default current_date,
  time_of_day text not null check (time_of_day in ('morning','midday','evening')),
  content     jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (user_id, entry_date, time_of_day)
);

create index if not exists daily_entries_user_date_idx
  on public.daily_entries (user_id, entry_date desc);

alter table public.daily_entries enable row level security;

drop policy if exists "Daily entries are owned by the user" on public.daily_entries;
create policy "Daily entries are owned by the user"
  on public.daily_entries for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ----------------------------------------------------------------------------
-- updated_at maintenance
-- ----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists daily_entries_set_updated_at on public.daily_entries;
create trigger daily_entries_set_updated_at
  before update on public.daily_entries
  for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- Auto-create a profile when a new auth user signs up.
-- full_name / company / title are read from the sign-up metadata if present.
-- ----------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, company, title)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'company',
    new.raw_user_meta_data ->> 'title'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
