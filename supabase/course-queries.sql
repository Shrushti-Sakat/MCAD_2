-- Public course list for browse page
select
  id,
  slug,
  title,
  description,
  instructor,
  price,
  currency,
  level,
  duration,
  category
from public.courses
where is_published = true
order by created_at asc;

-- Public course detail by slug
select
  id,
  slug,
  title,
  description,
  instructor,
  price,
  currency,
  level,
  duration,
  category
from public.courses
where slug = 'ros2-foundations'
  and is_published = true
limit 1;

-- Public curriculum preview for a course
select
  l.id,
  l.title,
  l.description,
  l.lesson_order,
  l.is_preview
from public.lessons l
join public.courses c on c.id = l.course_id
where c.slug = 'ros2-foundations'
  and c.is_published = true
order by l.lesson_order asc;

-- Course list with nested lesson count
select
  c.slug,
  c.title,
  c.instructor,
  c.price,
  count(l.id) as lesson_count
from public.courses c
left join public.lessons l on l.course_id = c.id
where c.is_published = true
group by c.id
order by c.created_at asc;

-- Future authenticated enrollment lookup
select
  e.id,
  e.status,
  e.enrolled_at,
  c.slug,
  c.title
from public.enrollments e
join public.courses c on c.id = e.course_id
where e.user_id = auth.uid()
order by e.enrolled_at desc;
