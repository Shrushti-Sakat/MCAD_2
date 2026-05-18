-- Add RLS policies to allow admins to manage courses

-- CREATE policy for admins
drop policy if exists "courses_admin_insert" on public.courses;
create policy "courses_admin_insert"
  on public.courses
  for insert
  to authenticated
  with check (public.is_admin(auth.uid()));

-- UPDATE policy for admins
drop policy if exists "courses_admin_update" on public.courses;
create policy "courses_admin_update"
  on public.courses
  for update
  to authenticated
  using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

-- DELETE policy for admins
drop policy if exists "courses_admin_delete" on public.courses;
create policy "courses_admin_delete"
  on public.courses
  for delete
  to authenticated
  using (public.is_admin(auth.uid()));
