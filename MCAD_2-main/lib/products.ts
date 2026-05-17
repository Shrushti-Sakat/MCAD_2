import { createClient } from "@supabase/supabase-js";

import { mockProducts, type RobotProduct, type ProductVariant } from "@/lib/mock-products";

type ProductsResult = {
  products: RobotProduct[];
  source: "supabase" | "mock";
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Reuse a single client to avoid reconnect overhead.
let cachedClient: ReturnType<typeof createClient> | null = null;
function getClient() {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  if (!supabaseAnonKey.startsWith("eyJ") && !supabaseAnonKey.startsWith("sb_publishable_")) return null;
  if (!cachedClient) {
    cachedClient = createClient(supabaseUrl, supabaseAnonKey);
  }
  return cachedClient;
}

const PRODUCT_COLUMNS =
  "id, category, title, description, type, price_text, use_case, highlights";

function mapRowToProduct(row: {
  id: string;
  category: string | null;
  title: string | null;
  description: string | null;
  type: string | null;
  price_text: string | null;
  use_case: string | null;
  highlights: string[] | null;
}, variants?: ProductVariant[]): RobotProduct {
  return {
    id: row.id,
    category: row.category ?? "Robotics",
    title: row.title ?? "Untitled product",
    description: row.description ?? "",
    type: row.type ?? "Platform",
    price: row.price_text ?? "Price on request",
    useCase: row.use_case ?? "Robotics use case",
    highlights: row.highlights ?? [],
    variants: variants ?? [],
  };
}

export async function getProducts(): Promise<ProductsResult> {
  const supabase = getClient();
  if (!supabase) return { products: mockProducts, source: "mock" };

  try {
    const { data, error } = await supabase
      .from("products")
      .select(PRODUCT_COLUMNS)
      .order("title", { ascending: true });

    if (error || !data) throw error ?? new Error("No data");

    // Fetch variants for all products
    const productIds = data.map((p: any) => p.id);
    const { data: variantsData } = await supabase
      .from("product_variants")
      .select("id, product_id, color, color_hex, image_url, stock")
      .in("product_id", productIds);

    const variantsMap: Record<string, ProductVariant[]> = {};
    (variantsData ?? []).forEach((v: any) => {
      const pid = v.product_id;
      if (!variantsMap[pid]) variantsMap[pid] = [];
      variantsMap[pid].push({
        id: v.id,
        color: v.color,
        colorHex: v.color_hex,
        image: v.image_url,
        stock: v.stock ?? 0,
      });
    });

    return {
      products: data.map((row: any) => mapRowToProduct(row, variantsMap[row.id] ?? [])),
      source: "supabase",
    };
  } catch (err) {
    console.warn("Falling back to mock products:", err);
    return { products: mockProducts, source: "mock" };
  }
}

export async function getProductById(
  id: string,
): Promise<{ product: RobotProduct | null; source: "supabase" | "mock" }> {
  const supabase = getClient();
  if (!supabase) {
    return { product: mockProducts.find((item) => item.id === id) ?? null, source: "mock" };
  }

  try {
    const { data, error } = await supabase
      .from("products")
      .select(PRODUCT_COLUMNS)
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;
    if (!data) return { product: null, source: "supabase" };

    // Fetch variants for this product
    const { data: variantsData } = await supabase
      .from("product_variants")
      .select("id, product_id, color, color_hex, image_url, stock")
      .eq("product_id", id)
      .order("color", { ascending: true });

    const variants: ProductVariant[] = (variantsData ?? []).map((v: any) => ({
      id: v.id,
      color: v.color,
      colorHex: v.color_hex,
      image: v.image_url,
      stock: v.stock ?? 0,
    }));

    return {
      product: mapRowToProduct(data, variants),
      source: "supabase",
    };
  } catch (err) {
    console.warn("Falling back to mock product:", err);
    return {
      product: mockProducts.find((item) => item.id === id) ?? null,
      source: "mock",
    };
  }
}
