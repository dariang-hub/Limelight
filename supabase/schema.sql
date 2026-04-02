-- ============================================================
-- LimeLight — Supabase Database Schema
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- ── Extensions ───────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ── profiles ─────────────────────────────────────────────────
-- Extends auth.users with app-specific fields.
-- A row is automatically inserted via trigger on user sign-up.

create table if not exists public.profiles (
  id                  uuid primary key references auth.users(id) on delete cascade,
  email               text,
  full_name           text,
  username            text unique,
  headline            text,                        -- "Mezzo-Soprano | Actor | Dancer"
  discipline          text,                        -- primary discipline chosen at onboarding
  location            text,
  avatar_url          text,
  bio                 text,
  website             text,
  -- Stripe / subscription
  stripe_customer_id  text unique,
  plan                text check (plan in ('starter', 'pro')) default null,
  subscription_status text default 'inactive',
  -- Visibility
  profile_public      boolean not null default true,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Users can read any public profile; only owners can modify
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (profile_public = true or auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-insert profile on new auth user
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

-- ── subscriptions ─────────────────────────────────────────────
create table if not exists public.subscriptions (
  id                       uuid primary key default uuid_generate_v4(),
  user_id                  uuid not null references public.profiles(id) on delete cascade,
  stripe_subscription_id   text unique not null,
  stripe_customer_id       text not null,
  plan                     text not null check (plan in ('starter', 'pro')),
  status                   text not null,           -- active | trialing | past_due | canceled | ...
  trial_end                timestamptz,
  current_period_end       timestamptz,
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);

alter table public.subscriptions enable row level security;

create policy "Users can view own subscriptions"
  on public.subscriptions for select
  using (auth.uid() = user_id);

create trigger subscriptions_updated_at
  before update on public.subscriptions
  for each row execute procedure public.set_updated_at();

-- ── resumes ───────────────────────────────────────────────────
create table if not exists public.resumes (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references public.profiles(id) on delete cascade,
  title         text not null default 'My Resume',
  template      text not null default 'classic',
  content       jsonb not null default '{}',        -- structured resume data
  raw_text      text,                               -- plain-text version for AI scoring
  is_primary    boolean not null default false,
  score         integer,                            -- 0-100 AI score (cached)
  score_data    jsonb,                              -- full score breakdown
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

alter table public.resumes enable row level security;

create policy "Users can manage own resumes"
  on public.resumes for all
  using (auth.uid() = user_id);

-- Only one primary resume per user
create unique index resumes_one_primary_per_user
  on public.resumes (user_id)
  where is_primary = true;

create trigger resumes_updated_at
  before update on public.resumes
  for each row execute procedure public.set_updated_at();

-- ── clips ─────────────────────────────────────────────────────
create table if not exists public.clips (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references public.profiles(id) on delete cascade,
  title         text not null,
  description   text,
  video_url     text,                               -- YouTube / Vimeo URL
  thumbnail_url text,
  category      text,                               -- 'Musical Theatre' | 'Film' | 'Dance' | etc.
  duration      text,                               -- "2:34"
  year          integer,
  is_featured   boolean not null default false,
  sort_order    integer not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

alter table public.clips enable row level security;

create policy "Clips on public profiles are viewable by everyone"
  on public.clips for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = clips.user_id and (p.profile_public = true or auth.uid() = p.id)
    )
  );

create policy "Users can manage own clips"
  on public.clips for all
  using (auth.uid() = user_id);

create trigger clips_updated_at
  before update on public.clips
  for each row execute procedure public.set_updated_at();

-- ── analytics ─────────────────────────────────────────────────
-- One row per user per day; upserted by the profile-view handler.

create table if not exists public.analytics (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid not null references public.profiles(id) on delete cascade,
  date            date not null default current_date,
  profile_views   integer not null default 0,
  resume_views    integer not null default 0,
  clip_views      integer not null default 0,
  link_clicks     integer not null default 0,
  constraint analytics_user_date unique (user_id, date)
);

alter table public.analytics enable row level security;

create policy "Users can view own analytics"
  on public.analytics for select
  using (auth.uid() = user_id);

-- Note: service role key bypasses RLS entirely in Supabase,
-- so API routes using SUPABASE_SERVICE_ROLE_KEY can upsert freely.

-- ── Helpful indexes ────────────────────────────────────────────
create index if not exists idx_resumes_user_id on public.resumes (user_id);
create index if not exists idx_clips_user_id on public.clips (user_id);
create index if not exists idx_analytics_user_date on public.analytics (user_id, date desc);
create index if not exists idx_subscriptions_user_id on public.subscriptions (user_id);
create index if not exists idx_profiles_username on public.profiles (username);
