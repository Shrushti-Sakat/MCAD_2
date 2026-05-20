# Course Catalog Backend For MCAD Solutions

## What this adds

- `courses` table for public browse data
- `lessons` table for curriculum preview
- `enrollments` table prepared for future purchase-to-access flow
- mock seed data for three ROS2-focused courses
- RLS policies that allow public read access to published courses and lessons

## Apply in Supabase

1. Open the Supabase project dashboard.
2. Go to `SQL Editor`.
3. Run [`course-catalog.sql`](C:\Users\Shrushti\OneDrive\Desktop\mcad_2\supabase\course-catalog.sql).
4. Use [`course-queries.sql`](C:\Users\Shrushti\OneDrive\Desktop\mcad_2\supabase\course-queries.sql) for testing or wiring the frontend later.

## Public access model

- `courses` can be read by `anon` and `authenticated` users when `is_published = true`
- `lessons` can be read publicly only when their parent course is published
- `enrollments` stay private and are limited to the signed-in owner

## Notes

- This file assumes the existing `profiles` table from [`schema.sql`](C:\Users\Shrushti\OneDrive\Desktop\mcad_2\supabase\schema.sql) already exists for future authenticated enrollments.
- If you already created `public.enrollments` from the earlier auth schema, this script will not reshape that table automatically. In that case, either create a migration that adds `course_id` and aligns the columns, or use a separate table name such as `course_enrollments`.
- Prices are stored as numeric values to support future checkout and reporting logic.
