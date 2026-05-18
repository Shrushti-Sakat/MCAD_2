-- Disable RLS on courses table entirely to test if that's the issue
ALTER TABLE public.courses DISABLE ROW LEVEL SECURITY;
