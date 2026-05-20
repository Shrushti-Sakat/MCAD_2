-- ============================================================
-- Fix Row Level Security (RLS) Linter Warnings
-- Run this in your Supabase SQL Editor
-- ============================================================

-- 1. Enable RLS on the courses table
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- 2. Enable RLS on the products table
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 3. Enable RLS on the orders table
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
