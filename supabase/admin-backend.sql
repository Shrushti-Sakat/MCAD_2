-- Phase 8B: Admin backend role + RLS + examples

alter table public.profiles
  add column if not exists role text check (role in ('admin', 'student')) default 'student';

update public.profiles
set role = 'student'
where role is null;

create or replace function public.is_admin(uid uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = uid
      and p.role = 'admin'
  );
$$;

alter table public.courses enable row level security;
alter table public.lessons enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

drop policy if exists courses_read on public.courses;
create policy courses_read on public.courses
  for select using (true);

drop policy if exists courses_write on public.courses;
create policy courses_write on public.courses
  for all using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

drop policy if exists lessons_read on public.lessons;
create policy lessons_read on public.lessons
  for select using (true);

drop policy if exists lessons_write on public.lessons;
create policy lessons_write on public.lessons
  for all using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

drop policy if exists products_read on public.products;
create policy products_read on public.products
  for select using (true);

drop policy if exists products_write on public.products;
create policy products_write on public.products
  for all using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

drop policy if exists orders_read on public.orders;
create policy orders_read on public.orders
  for select using (
    public.is_admin(auth.uid()) or user_id = auth.uid()
  );

drop policy if exists orders_write on public.orders;
create policy orders_write on public.orders
  for all using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

drop policy if exists order_items_read on public.order_items;
create policy order_items_read on public.order_items
  for select using (
    public.is_admin(auth.uid()) or exists (
      select 1
      from public.orders o
      where o.id = order_items.order_id
        and o.user_id = auth.uid()
    )
  );

drop policy if exists order_items_write on public.order_items;
create policy order_items_write on public.order_items
  for all using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

-- Example queries (run in app code with authenticated admin user token)
-- select * from public.courses order by created_at desc;
-- insert into public.lessons (course_id, title, description, lesson_order, is_preview)
-- values ('<course_uuid>', 'ROS2 Intro', 'Getting started', 1, true);
-- update public.products set price_text = 'INR 1,90,000' where id = 'agv-lab-bot';
-- select * from public.orders order by created_at desc;
