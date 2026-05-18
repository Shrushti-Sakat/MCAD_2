import { NextResponse } from "next/server";

import { AdminApiError, requireAdminSupabaseClient } from "@/lib/supabase/admin-api";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseHighlights(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((item) => String(item));
  if (typeof value === "string") {
    return value
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);
  }
  return [];
}

export async function GET(req: Request) {
  try {
    const { supabase } = await requireAdminSupabaseClient(req);
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data);
  } catch (error: any) {
    if (error instanceof AdminApiError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: error?.message ?? "Failed to load products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { supabase } = await requireAdminSupabaseClient(req);
    const body = await req.json();
    const payload = {
      id: body.id || slugify(body.title || `product-${Date.now()}`),
      category: body.category || "Robotics",
      title: body.title || "",
      description: body.description || `${body.title || "Product"} description`,
      type: body.type || "Platform",
      price_text: body.price_text || body.price || "INR 0",
      use_case: body.use_case || body.useCase || "General robotics use case",
      highlights: parseHighlights(body.highlights),
    };
    const { error } = await supabase.from("products").insert(payload);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error instanceof AdminApiError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: error?.message ?? "Failed to create product" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { supabase } = await requireAdminSupabaseClient(req);
    const body = await req.json(); // { id, ...fields }
    const { id } = body;
    const update = {
      category: body.category,
      title: body.title,
      description: body.description,
      type: body.type,
      price_text: body.price_text || body.price,
      use_case: body.use_case || body.useCase,
      highlights: parseHighlights(body.highlights),
    };
    const { error } = await supabase.from("products").update(update).eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error instanceof AdminApiError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: error?.message ?? "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { supabase } = await requireAdminSupabaseClient(req);
    const { id } = await req.json();
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error instanceof AdminApiError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: error?.message ?? "Failed to delete product" }, { status: 500 });
  }
}
