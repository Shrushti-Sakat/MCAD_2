# Dashboard Backend Queries

## Security

- `public.enrollments` is protected by RLS in [`enrollment-purchase.sql`](C:\Users\Shrushti\OneDrive\Desktop\mcad_2\supabase\enrollment-purchase.sql)
- users can only read rows where `user_id = auth.uid()`
- these dashboard queries rely on that RLS behavior

## What to run

You do not need to create new tables for the dashboard backend.

If you already ran:

1. [`schema.sql`](C:\Users\Shrushti\OneDrive\Desktop\mcad_2\supabase\schema.sql)
2. [`course-catalog.sql`](C:\Users\Shrushti\OneDrive\Desktop\mcad_2\supabase\course-catalog.sql)
3. [`enrollment-purchase.sql`](C:\Users\Shrushti\OneDrive\Desktop\mcad_2\supabase\enrollment-purchase.sql)

then you can use [`dashboard-queries.sql`](C:\Users\Shrushti\OneDrive\Desktop\mcad_2\supabase\dashboard-queries.sql) directly.

## Expected behavior

- signed-out users will not get dashboard enrollment data
- signed-in users will only see their own enrolled courses
- joins to `courses` and `lessons` are safe because the base enrollment rows are RLS-scoped
