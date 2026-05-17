-- COMPLETE CLEANUP AND FRESH RLS SETUP FOR COURSES
-- This will drop ALL existing policies and create new simple ones

-- First, disable RLS temporarily to drop all policies
ALTER TABLE public.courses DISABLE ROW LEVEL SECURITY;

-- Now re-enable it
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Create ONLY these 4 simple policies (no admin checks)

-- Policy 1: Everyone can READ published courses
CREATE POLICY "courses_select_published"
  ON public.courses
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

-- Policy 2: Any authenticated user can INSERT courses
CREATE POLICY "courses_insert"
  ON public.courses
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy 3: Any authenticated user can UPDATE courses  
CREATE POLICY "courses_update"
  ON public.courses
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy 4: Any authenticated user can DELETE courses
CREATE POLICY "courses_delete"
  ON public.courses
  FOR DELETE
  TO authenticated
  USING (true);
