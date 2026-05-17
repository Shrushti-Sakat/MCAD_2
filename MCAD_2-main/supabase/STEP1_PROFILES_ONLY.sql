-- Run this in Supabase SQL Editor to fix signup + recursion errors
-- Safe to run multiple times

-- Step 1: Kill any broken trigger first
drop trigger if exists on_auth_user_created on auth.users;

-- Step 2: Drop old broken function
drop function if exists public.handle_new_user() cascade;
drop function if exists public.is_admin(uuid) cascade;

-- Step 3: Create profiles table
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  role text check (role in ('admin', 'student')) default 'student',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.profiles enable row level security;

-- Step 4: Create is_admin as SECURITY DEFINER so it bypasses RLS (no recursion)
create or replace function public.is_admin(uid uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = uid and role = 'admin');
$$;

-- Step 5: RLS policies using the function (no recursion)
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select to authenticated
  using (auth.uid() = id or public.is_admin(auth.uid()));

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
  for insert to authenticated
  with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Step 6: Create trigger function (never raises — signup always succeeds)
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', ''),
    case when new.email = 'admin@mcad.com' then 'admin' else 'student' end
  )
  on conflict (id) do update
    set role = excluded.role;
  return new;
exception when others then
  return new;
end; $$;

-- Step 7: Re-attach trigger
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Step 8: Backfill admin role if admin@mcad.com already signed up
update public.profiles
set role = 'admin'
where id in (
  select id from auth.users where email = 'admin@mcad.com'
);
