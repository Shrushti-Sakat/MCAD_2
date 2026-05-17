alter table public.enrollments
  add column if not exists course_id uuid;

update public.enrollments e
set course_id = c.id
from public.courses c
where e.course_slug = c.slug
  and e.course_id is null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'enrollments_course_id_fkey'
  ) then
    alter table public.enrollments
      add constraint enrollments_course_id_fkey
      foreign key (course_id) references public.courses(id) on delete cascade;
  end if;
end
$$;

create index if not exists enrollments_user_id_idx
  on public.enrollments(user_id);

create index if not exists enrollments_course_id_idx
  on public.enrollments(course_id);

create unique index if not exists enrollments_user_course_unique_idx
  on public.enrollments(user_id, course_id)
  where course_id is not null;

alter table public.enrollments enable row level security;

drop policy if exists "enrollments_select_own" on public.enrollments;
create policy "enrollments_select_own"
  on public.enrollments
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "enrollments_insert_own" on public.enrollments;
create policy "enrollments_insert_own"
  on public.enrollments
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "enrollments_update_own" on public.enrollments;
create policy "enrollments_update_own"
  on public.enrollments
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create or replace function public.enroll_in_course(p_course_id uuid)
returns public.enrollments
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_user_id uuid;
  v_course public.courses%rowtype;
  v_enrollment public.enrollments%rowtype;
begin
  v_user_id := auth.uid();

  if v_user_id is null then
    raise exception 'Authentication required';
  end if;

  select *
  into v_course
  from public.courses
  where id = p_course_id
    and is_published = true;

  if not found then
    raise exception 'Course not found or not available for enrollment';
  end if;

  insert into public.enrollments (
    user_id,
    course_id,
    course_slug,
    status
  )
  values (
    v_user_id,
    v_course.id,
    v_course.slug,
    'active'
  )
  on conflict (user_id, course_slug) do update
  set
    course_id = excluded.course_id,
    status = excluded.status,
    updated_at = timezone('utc', now())
  returning * into v_enrollment;

  return v_enrollment;
end;
$$;
