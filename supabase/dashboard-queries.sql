-- Logged-in user's enrolled courses for dashboard
select
  e.id as enrollment_id,
  e.user_id,
  e.status as enrollment_status,
  e.created_at as enrolled_at,
  c.id as course_id,
  c.slug,
  c.title,
  c.description,
  c.instructor,
  c.price,
  c.currency,
  c.level,
  c.duration,
  c.category
from public.enrollments e
join public.courses c on c.id = e.course_id
where e.user_id = auth.uid()
order by e.created_at desc;

-- Logged-in user's enrolled course with curriculum preview
select
  e.id as enrollment_id,
  c.id as course_id,
  c.slug,
  c.title,
  c.instructor,
  l.id as lesson_id,
  l.lesson_order,
  l.title as lesson_title,
  l.description as lesson_description,
  l.is_preview
from public.enrollments e
join public.courses c on c.id = e.course_id
left join public.lessons l on l.course_id = c.id
where e.user_id = auth.uid()
order by c.title asc, l.lesson_order asc;

-- Dashboard summary count for logged-in user
select
  count(*) as enrolled_courses
from public.enrollments
where user_id = auth.uid();
