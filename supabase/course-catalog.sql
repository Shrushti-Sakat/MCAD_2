create extension if not exists "pgcrypto";

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

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  status text not null default 'pending',
  enrolled_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now()),
  unique (user_id, course_id)
);

create or replace function public.set_catalog_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists courses_set_updated_at on public.courses;
create trigger courses_set_updated_at
  before update on public.courses
  for each row execute procedure public.set_catalog_updated_at();

alter table public.courses enable row level security;
alter table public.lessons enable row level security;
alter table public.enrollments enable row level security;

drop policy if exists "courses_public_read" on public.courses;
create policy "courses_public_read"
  on public.courses
  for select
  to anon, authenticated
  using (is_published = true);

drop policy if exists "lessons_public_read" on public.lessons;
create policy "lessons_public_read"
  on public.lessons
  for select
  to anon, authenticated
  using (
    exists (
      select 1
      from public.courses
      where public.courses.id = lessons.course_id
        and public.courses.is_published = true
    )
  );

drop policy if exists "enrollments_select_own_catalog" on public.enrollments;
create policy "enrollments_select_own_catalog"
  on public.enrollments
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "enrollments_insert_own_catalog" on public.enrollments;
create policy "enrollments_insert_own_catalog"
  on public.enrollments
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "enrollments_update_own_catalog" on public.enrollments;
create policy "enrollments_update_own_catalog"
  on public.enrollments
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

insert into public.courses (
  slug,
  title,
  description,
  instructor,
  price,
  currency,
  level,
  duration,
  category
)
values
  (
    'ros2-foundations',
    'ROS2 Foundations for Robotics Engineers',
    'A starter program covering nodes, topics, services, launch flows, and real robotics project structure for learners entering the ROS2 ecosystem.',
    'Aarav Kulkarni',
    14999.00,
    'INR',
    'Beginner to Intermediate',
    '8 weeks',
    'ROS2 Core'
  ),
  (
    'ros2-navigation-systems',
    'ROS2 Navigation and Autonomous Systems',
    'A systems-focused track exploring localization, mapping, navigation concepts, and sensor-driven autonomy workflows in ROS2.',
    'Neha Deshmukh',
    19499.00,
    'INR',
    'Intermediate',
    '10 weeks',
    'Robotics Systems'
  ),
  (
    'ros2-lab-project-accelerator',
    'ROS2 Lab Project Accelerator',
    'A lab-focused sprint designed around ROS2 project execution, hardware integration, and repeatable demo quality.',
    'Ritika Joshi',
    11999.00,
    'INR',
    'All levels',
    '6 weeks',
    'Lab Accelerator'
  )
on conflict (slug) do update
set
  title = excluded.title,
  description = excluded.description,
  instructor = excluded.instructor,
  price = excluded.price,
  currency = excluded.currency,
  level = excluded.level,
  duration = excluded.duration,
  category = excluded.category,
  is_published = true;

with seeded_lessons as (
  select
    c.id as course_id,
    v.title,
    v.description,
    v.lesson_order,
    v.is_preview
  from public.courses c
  join (
    values
      (
        'ros2-foundations',
        'ROS2 architecture and workspace setup',
        'Set up a clean robotics workspace and understand how ROS2 packages are organized.',
        1,
        true
      ),
      (
        'ros2-foundations',
        'Nodes, topics, and message flow',
        'Build confidence with the core communication model used in ROS2 systems.',
        2,
        true
      ),
      (
        'ros2-foundations',
        'Services, actions, and launch files',
        'Choose the right interaction pattern and coordinate multi-node applications.',
        3,
        true
      ),
      (
        'ros2-foundations',
        'Mini project and debugging workflow',
        'Apply the foundation in a practical robotics workflow with debugging habits.',
        4,
        true
      ),
      (
        'ros2-navigation-systems',
        'Sensor pipelines and system state',
        'Understand how robotics sensor data drives the navigation stack.',
        1,
        true
      ),
      (
        'ros2-navigation-systems',
        'Localization and mapping concepts',
        'Explore the ideas that support spatial awareness and motion planning.',
        2,
        true
      ),
      (
        'ros2-navigation-systems',
        'Navigation stack foundations',
        'Work through planning, recovery behavior, and movement orchestration.',
        3,
        true
      ),
      (
        'ros2-navigation-systems',
        'Autonomy case study',
        'Apply the stack to a realistic warehouse or mobility scenario.',
        4,
        true
      ),
      (
        'ros2-lab-project-accelerator',
        'Lab roadmap and project planning',
        'Define technical milestones for a guided ROS2 robot build.',
        1,
        true
      ),
      (
        'ros2-lab-project-accelerator',
        'System integration sprint',
        'Connect sensing, control, and motion modules into one stable workflow.',
        2,
        true
      ),
      (
        'ros2-lab-project-accelerator',
        'Technical review and debugging drills',
        'Harden your project with mentor-led testing and fault diagnosis.',
        3,
        true
      ),
      (
        'ros2-lab-project-accelerator',
        'Final live robot demonstration',
        'Deliver a complete ROS2 lab demo with clear performance checkpoints.',
        4,
        true
      )
  ) as v(slug, title, description, lesson_order, is_preview)
    on c.slug = v.slug
)
insert into public.lessons (course_id, title, description, lesson_order, is_preview)
select course_id, title, description, lesson_order, is_preview
from seeded_lessons
on conflict (course_id, lesson_order) do update
set
  title = excluded.title,
  description = excluded.description,
  is_preview = excluded.is_preview;
