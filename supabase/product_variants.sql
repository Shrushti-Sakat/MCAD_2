-- ============================================================
-- Product Variants — Supabase Schema
-- ============================================================
-- Adds color variant support for robotics products.
-- Each product can have multiple color variants, each with
-- its own image, stock count, and color metadata.
-- ============================================================

-- 1. Create the product_variants table
CREATE TABLE IF NOT EXISTS product_variants (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  color       TEXT NOT NULL,
  color_hex   TEXT NOT NULL DEFAULT '#000000',
  image_url   TEXT NOT NULL,
  stock       INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookups by product
CREATE INDEX IF NOT EXISTS idx_product_variants_product_id
  ON product_variants(product_id);

-- ============================================================
-- 2. Row Level Security (RLS) Policies
-- ============================================================

ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;

-- Public read access — anyone can browse variants
CREATE POLICY "Public can read product variants"
  ON product_variants FOR SELECT
  USING (true);

-- Admin insert — only authenticated users can insert
CREATE POLICY "Admins can insert product variants"
  ON product_variants FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Admin update — only authenticated users can update
CREATE POLICY "Admins can update product variants"
  ON product_variants FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Admin delete — only authenticated users can delete
CREATE POLICY "Admins can delete product variants"
  ON product_variants FOR DELETE
  USING (auth.role() = 'authenticated');

-- ============================================================
-- 3. Sample Data (uses placeholder product IDs — replace with
--    real UUIDs from your products table)
-- ============================================================

-- Sample: AGV Lab Bot variants
-- INSERT INTO product_variants (product_id, color, color_hex, image_url, stock)
-- VALUES
--   ('REPLACE_WITH_AGV_UUID', 'Arctic White',   '#f0ece6', '/variant-white.jpeg',    12),
--   ('REPLACE_WITH_AGV_UUID', 'Stealth Black',  '#1a1a1a', '/variant-black.png',     8),
--   ('REPLACE_WITH_AGV_UUID', 'Industrial Red', '#c0392b', '/variant-red.png',       5),
--   ('REPLACE_WITH_AGV_UUID', 'Navy Blue',      '#1e3a5f', '/variant-blue.png',      3),
--   ('REPLACE_WITH_AGV_UUID', 'Brushed Silver', '#b0b8c1', '/variant-metallic.png',  6);

-- Sample: Arm Trainer X2 variants
-- INSERT INTO product_variants (product_id, color, color_hex, image_url, stock)
-- VALUES
--   ('REPLACE_WITH_ARM_UUID', 'Arctic White',   '#f0ece6', '/variant-white.jpeg',    10),
--   ('REPLACE_WITH_ARM_UUID', 'Stealth Black',  '#1a1a1a', '/variant-black.png',     7),
--   ('REPLACE_WITH_ARM_UUID', 'Industrial Red', '#c0392b', '/variant-red.png',       4),
--   ('REPLACE_WITH_ARM_UUID', 'Navy Blue',      '#1e3a5f', '/variant-blue.png',      2),
--   ('REPLACE_WITH_ARM_UUID', 'Brushed Silver', '#b0b8c1', '/variant-metallic.png',  9);

-- Sample: Inspection Rover Mini variants
-- INSERT INTO product_variants (product_id, color, color_hex, image_url, stock)
-- VALUES
--   ('REPLACE_WITH_ROVER_UUID', 'Arctic White',   '#f0ece6', '/variant-white.jpeg',    6),
--   ('REPLACE_WITH_ROVER_UUID', 'Stealth Black',  '#1a1a1a', '/variant-black.png',     11),
--   ('REPLACE_WITH_ROVER_UUID', 'Industrial Red', '#c0392b', '/variant-red.png',       3),
--   ('REPLACE_WITH_ROVER_UUID', 'Navy Blue',      '#1e3a5f', '/variant-blue.png',      7),
--   ('REPLACE_WITH_ROVER_UUID', 'Brushed Silver', '#b0b8c1', '/variant-metallic.png',  5);

-- ============================================================
-- 4. Fetch query — JOIN product with its variants
-- ============================================================

-- Fetch single product with variants:
-- SELECT
--   p.*,
--   COALESCE(
--     json_agg(
--       json_build_object(
--         'id', pv.id,
--         'color', pv.color,
--         'colorHex', pv.color_hex,
--         'image', pv.image_url,
--         'stock', pv.stock
--       )
--     ) FILTER (WHERE pv.id IS NOT NULL),
--     '[]'
--   ) AS variants
-- FROM products p
-- LEFT JOIN product_variants pv ON pv.product_id = p.id
-- WHERE p.id = 'YOUR_PRODUCT_UUID'
-- GROUP BY p.id;

-- ============================================================
-- 5. Storage bucket for variant images
-- ============================================================

-- Create a public storage bucket for product images:
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('product-images', 'product-images', true);

-- RLS for public read on storage:
-- CREATE POLICY "Public read product images"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'product-images');

-- Admin upload:
-- CREATE POLICY "Admin upload product images"
--   ON storage.objects FOR INSERT
--   WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');
