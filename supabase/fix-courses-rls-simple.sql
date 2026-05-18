-- COMPLETE RLS FIX for courses table
-- Drop all existing policies
DROP POLICY IF EXISTS "courses_public_read" ON public.courses;
DROP POLICY IF EXISTS "courses_authenticated_insert" ON public.courses;
DROP POLICY IF EXISTS "courses_authenticated_update" ON public.courses;
DROP POLICY IF EXISTS "courses_authenticated_delete" ON public.courses;
DROP POLICY IF EXISTS "courses_admin_insert" ON public.courses;
DROP POLICY IF EXISTS "courses_admin_update" ON public.courses;
DROP POLICY IF EXISTS "courses_admin_delete" ON public.courses;

-- Enable RLS
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Policy 1: Everyone can READ published courses
CREATE POLICY "courses_read_published"
  ON public.courses
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

-- Policy 2: Authenticated users can INSERT
CREATE POLICY "courses_insert_authenticated"
  ON public.courses
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy 3: Authenticated users can UPDATE
CREATE POLICY "courses_update_authenticated"
  ON public.courses
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy 4: Authenticated users can DELETE
CREATE POLICY "courses_delete_authenticated"
  ON public.courses
  FOR DELETE
  TO authenticated
  USING (true);
