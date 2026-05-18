-- ============================================================
-- MCAD Solutions — Full Database Migration
-- Run this ONCE in Supabase SQL Editor
-- ============================================================

-- Extensions
create extension if not exists "pgcrypto";

-- ============================================================
-- ENUMS
-- ============================================================
do $$ begin
  create type public.app_role as enum ('student', 'admin');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.order_status as enum ('pending', 'paid', 'failed', 'refunded');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.enrollment_status as enum ('pending', 'active', 'completed', 'cancelled');
exception when duplicate_object then null; end $$;

-- ============================================================
-- HELPER FUNCTIONS
-- ============================================================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  NEW.updated_at = timezone('utc', now());
  return NEW;
exception when others then
  return NEW;
end; $$;

-- ============================================================
-- TABLES
-- ============================================================

-- Profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  role text check (role in ('admin', 'student')) default 'student',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

-- Products
create table if not exists public.products (
  id text primary key,
  category text not null default 'Robotics',
  title text not null,
  description text not null default '',
  type text not null default 'Platform',
  price_text text not null default 'Price on request',
  use_case text not null default '',
  highlights text[] not null default '{}',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

-- Product Variants
create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id text not null references public.products(id) on delete cascade,
  color text not null,
  color_hex text not null default '#000000',
  image_url text not null,
  stock integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

-- Courses
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  instructor text not null,
  price numeric(10,2) not null check (price >= 0),
  currency text not null default 'INR',
  level text not null,
  duration text not null,
  category text not null default 'ROS2',
  is_published boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

-- Lessons
create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  description text not null,
  lesson_order integer not null check (lesson_order > 0),
  is_preview boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  unique (course_id, lesson_order)
);

-- Orders
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  item_type text not null,
  item_id text not null,
  amount numeric(10,2) not null check (amount >= 0),
  currency text not null default 'INR',
  status text not null default 'pending',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

-- Enrollments
create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid references public.courses(id) on delete cascade,
  course_slug text not null,
  status text not null default 'active',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (user_id, course_slug)
);

-- ============================================================
-- INDEXES
-- ============================================================
create index if not exists idx_product_variants_product_id on public.product_variants(product_id);
create index if not exists idx_orders_user_id on public.orders(user_id);
create index if not exists idx_enrollments_user_id on public.enrollments(user_id);
create index if not exists idx_enrollments_course_id on public.enrollments(course_id);

-- ============================================================
-- TRIGGERS
-- ============================================================
drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles
  for each row execute procedure public.set_updated_at();

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at before update on public.products
  for each row execute procedure public.set_updated_at();

drop trigger if exists courses_set_updated_at on public.courses;
create trigger courses_set_updated_at before update on public.courses
  for each row execute procedure public.set_updated_at();

drop trigger if exists orders_set_updated_at on public.orders;
create trigger orders_set_updated_at before update on public.orders
  for each row execute procedure public.set_updated_at();

-- Auto-create profile on signup (auto-admin for specific email)
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  v_role text;
begin
  v_role := case
    when new.email = 'admin@mcad.com' then 'admin'
    else 'student'
  end;
  insert into public.profiles (id, name, role)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'name', ''), v_role)
  on conflict (id) do update set role = excluded.role;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- ADMIN HELPER FUNCTION
-- ============================================================
create or replace function public.is_admin(uid uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = uid and role = 'admin');
$$;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.product_variants enable row level security;
alter table public.courses enable row level security;
alter table public.lessons enable row level security;
alter table public.orders enable row level security;
alter table public.enrollments enable row level security;

-- Profiles
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles for select to authenticated
  using (auth.uid() = id or public.is_admin(auth.uid()));

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles for insert to authenticated
  with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles for update to authenticated
  using (auth.uid() = id) with check (auth.uid() = id);

-- Products (public read, admin write)
drop policy if exists "products_public_read" on public.products;
create policy "products_public_read" on public.products for select to anon, authenticated using (true);

drop policy if exists "products_admin_write" on public.products;
create policy "products_admin_write" on public.products for all to authenticated
  using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- Product Variants (public read, admin write)
drop policy if exists "variants_public_read" on public.product_variants;
create policy "variants_public_read" on public.product_variants for select to anon, authenticated using (true);

drop policy if exists "variants_admin_write" on public.product_variants;
create policy "variants_admin_write" on public.product_variants for all to authenticated
  using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- Courses (public read, admin write)
drop policy if exists "courses_public_read" on public.courses;
create policy "courses_public_read" on public.courses for select to anon, authenticated
  using (is_published = true);

drop policy if exists "courses_admin_write" on public.courses;
create policy "courses_admin_write" on public.courses for all to authenticated
  using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- Lessons (public read)
drop policy if exists "lessons_public_read" on public.lessons;
create policy "lessons_public_read" on public.lessons for select to anon, authenticated using (true);

drop policy if exists "lessons_admin_write" on public.lessons;
create policy "lessons_admin_write" on public.lessons for all to authenticated
  using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- Orders
drop policy if exists "orders_own" on public.orders;
create policy "orders_own" on public.orders for all to authenticated
  using (auth.uid() = user_id or public.is_admin(auth.uid()))
  with check (auth.uid() = user_id or public.is_admin(auth.uid()));

-- Enrollments
drop policy if exists "enrollments_own" on public.enrollments;
create policy "enrollments_own" on public.enrollments for all to authenticated
  using (auth.uid() = user_id or public.is_admin(auth.uid()))
  with check (auth.uid() = user_id or public.is_admin(auth.uid()));

-- ============================================================
-- SEED: COURSES + LESSONS
-- ============================================================
insert into public.courses (slug, title, description, instructor, price, currency, level, duration, category)
values
  ('ros2-foundations', 'ROS2 Foundations for Robotics Engineers',
   'A starter program covering nodes, topics, services, launch flows, and real robotics project structure.',
   'Aarav Kulkarni', 14999.00, 'INR', 'Beginner to Intermediate', '8 weeks', 'ROS2 Core'),
  ('ros2-navigation-systems', 'ROS2 Navigation and Autonomous Systems',
   'A systems-focused track exploring localization, mapping, navigation concepts, and sensor-driven autonomy.',
   'Neha Deshmukh', 19499.00, 'INR', 'Intermediate', '10 weeks', 'Robotics Systems'),
  ('ros2-lab-project-accelerator', 'ROS2 Lab Project Accelerator',
   'A lab-focused sprint designed around ROS2 project execution, hardware integration, and repeatable demo quality.',
   'Ritika Joshi', 11999.00, 'INR', 'All levels', '6 weeks', 'Lab Accelerator')
on conflict (slug) do update set
  title = excluded.title, description = excluded.description,
  instructor = excluded.instructor, price = excluded.price,
  level = excluded.level, duration = excluded.duration, category = excluded.category,
  is_published = true;

-- Seed lessons
with c as (select id, slug from public.courses)
insert into public.lessons (course_id, title, description, lesson_order, is_preview)
select c.id, v.title, v.description, v.lesson_order, true
from c join (values
  ('ros2-foundations','ROS2 architecture and workspace setup','Set up a clean robotics workspace.',1),
  ('ros2-foundations','Nodes, topics, and message flow','Core communication model in ROS2.',2),
  ('ros2-foundations','Services, actions, and launch files','Multi-node coordination patterns.',3),
  ('ros2-foundations','Mini project and debugging workflow','Hands-on troubleshooting and delivery.',4),
  ('ros2-navigation-systems','Sensor pipelines and system state','How sensor data drives navigation.',1),
  ('ros2-navigation-systems','Localization and mapping concepts','Spatial awareness and motion planning.',2),
  ('ros2-navigation-systems','Navigation stack foundations','Planning, recovery, and movement.',3),
  ('ros2-navigation-systems','Autonomy case study','Apply the stack to a real scenario.',4),
  ('ros2-lab-project-accelerator','Lab roadmap and project planning','Define technical milestones.',1),
  ('ros2-lab-project-accelerator','System integration sprint','Connect modules into one workflow.',2),
  ('ros2-lab-project-accelerator','Technical review and debugging drills','Harden your project.',3),
  ('ros2-lab-project-accelerator','Final live robot demonstration','Complete ROS2 lab demo.',4)
) as v(slug, title, description, lesson_order) on c.slug = v.slug
on conflict (course_id, lesson_order) do update set
  title = excluded.title, description = excluded.description;

-- ============================================================
-- SEED: PRODUCTS + VARIANTS
-- ============================================================
insert into public.products (id, category, title, description, type, price_text, use_case, highlights)
values
  ('agv-lab-bot', 'Mobile Robotics', 'AGV Lab Bot',
   'A compact autonomous guided vehicle platform designed for ROS2 learning, warehouse simulation, and navigation experiments.',
   'Indoor AGV', 'INR 1,85,000', 'Navigation, path planning, and robotics lab demos',
   array['ROS2-ready integration for classroom and prototyping workflows',
         'Useful for mapping, localization, and movement control demos',
         'Designed as a hands-on learning robot for mobility projects']),
  ('arm-trainer-x2', 'Manipulator Systems', 'Arm Trainer X2',
   'A robotic arm training unit built for pick-and-place demos, kinematics learning, and industrial automation practice.',
   'Training Manipulator', 'INR 2,40,000', 'Kinematics, simulation, and automation skill-building',
   array['Supports robotics fundamentals and industrial motion concepts',
         'Useful for lab-ready automation projects and academic demos',
         'Pairs well with ROS2-centered manipulation learning tracks']),
  ('inspection-rover-mini', 'Field Robotics', 'Inspection Rover Mini',
   'A rugged mock rover concept for inspection workflows, sensor testing, and remote robotics experiments.',
   'Tracked Rover', 'INR 2,95,000', 'Sensor integration, telemetry, and robotics exploration',
   array['Fits robotics prototyping scenarios for mobile field systems',
         'Encourages practical sensor stack and communications learning',
         'Can be positioned as a project robot for advanced cohorts'])
on conflict (id) do update set
  category = excluded.category, title = excluded.title, description = excluded.description,
  type = excluded.type, price_text = excluded.price_text,
  use_case = excluded.use_case, highlights = excluded.highlights;

-- Variants
insert into public.product_variants (product_id, color, color_hex, image_url, stock)
values
  ('agv-lab-bot','Arctic White','#f0ece6','/variant-white.jpeg',12),
  ('agv-lab-bot','Campus Yellow','#f0c419','/variant-yellow.jpeg',9),
  ('agv-lab-bot','Stealth Black','#1a1a1a','/variant-black.png',8),
  ('agv-lab-bot','Industrial Red','#c0392b','/variant-red.png',5),
  ('agv-lab-bot','Navy Blue','#1e3a5f','/variant-blue.png',3),
  ('agv-lab-bot','Brushed Silver','#b0b8c1','/variant-metallic.png',6),
  ('arm-trainer-x2','Arctic White','#f0ece6','/variant-white.jpeg',10),
  ('arm-trainer-x2','Campus Yellow','#f0c419','/variant-yellow.jpeg',8),
  ('arm-trainer-x2','Stealth Black','#1a1a1a','/variant-black.png',7),
  ('arm-trainer-x2','Industrial Red','#c0392b','/variant-red.png',4),
  ('arm-trainer-x2','Navy Blue','#1e3a5f','/variant-blue.png',2),
  ('arm-trainer-x2','Brushed Silver','#b0b8c1','/variant-metallic.png',9),
  ('inspection-rover-mini','Arctic White','#f0ece6','/variant-white.jpeg',6),
  ('inspection-rover-mini','Campus Yellow','#f0c419','/variant-yellow.jpeg',7),
  ('inspection-rover-mini','Stealth Black','#1a1a1a','/variant-black.png',11),
  ('inspection-rover-mini','Industrial Red','#c0392b','/variant-red.png',3),
  ('inspection-rover-mini','Navy Blue','#1e3a5f','/variant-blue.png',7),
  ('inspection-rover-mini','Brushed Silver','#b0b8c1','/variant-metallic.png',5)
on conflict do nothing;
