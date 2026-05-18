-- NUCLEAR OPTION: Drop ALL existing policies by name explicitly
DROP POLICY IF EXISTS "courses_read" ON public.courses;
DROP POLICY IF EXISTS "courses_select_published" ON public.courses;
DROP POLICY IF EXISTS "courses_insert" ON public.courses;
DROP POLICY IF EXISTS "courses_update" ON public.courses;
DROP POLICY IF EXISTS "courses_delete" ON public.courses;
DROP POLICY IF EXISTS "courses_public_read" ON public.courses;
DROP POLICY IF EXISTS "courses_admin_write" ON public.courses;
DROP POLICY IF EXISTS "courses_admin_insert" ON public.courses;
DROP POLICY IF EXISTS "courses_admin_update" ON public.courses;
DROP POLICY IF EXISTS "courses_admin_delete" ON public.courses;
DROP POLICY IF EXISTS "courses_authenticated_insert" ON public.courses;
DROP POLICY IF EXISTS "courses_authenticated_update" ON public.courses;
DROP POLICY IF EXISTS "courses_authenticated_delete" ON public.courses;
DROP POLICY IF EXISTS "courses_read_published" ON public.courses;

-- Make sure RLS is enabled
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Create ONLY 3 new simple policies with NO admin checks

-- Policy 1: Everyone can READ published courses
CREATE POLICY "read_published_courses"
  ON public.courses
  FOR SELECT
  USING (is_published = true);

-- Policy 2: Authenticated users can INSERT, UPDATE, and DELETE
CREATE POLICY "auth_all_operations"
  ON public.courses
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
