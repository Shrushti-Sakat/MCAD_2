# Enrollment Purchase Logic

## Run order

1. Run [`schema.sql`](C:\Users\Shrushti\OneDrive\Desktop\mcad_2\supabase\schema.sql) if you have not already.
2. Run [`course-catalog.sql`](C:\Users\Shrushti\OneDrive\Desktop\mcad_2\supabase\course-catalog.sql) so `courses` exists.
3. Run [`enrollment-purchase.sql`](C:\Users\Shrushti\OneDrive\Desktop\mcad_2\supabase\enrollment-purchase.sql).

## What it does

- upgrades the existing `enrollments` table to support `course_id`
- backfills `course_id` from `course_slug`
- keeps enrollments private to the signed-in owner
- adds an RPC function named `enroll_in_course(uuid)`

## How to use it

- client checks whether a Supabase session exists
- if not signed in, open the auth modal
- after login, call `rpc('enroll_in_course', { p_course_id: courseId })`

## Behavior

- unauthenticated users cannot enroll
- authenticated users can only read and write their own enrollments
- enrolling the same user into the same course again reuses the existing row
