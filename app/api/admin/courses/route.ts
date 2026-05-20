import { NextResponse } from "next/server";

import { AdminApiError, requireAdminSupabaseClient } from "@/lib/supabase/admin-api";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parsePrice(value: unknown) {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const numeric = value.replace(/[^\d.]/g, "");
    return Number(numeric || 0);
  }
  return 0;
}

export async function GET(req: Request) {
  try {
    const { supabase } = await requireAdminSupabaseClient(req);
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data);
  } catch (error: any) {
    if (error instanceof AdminApiError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: error?.message ?? "Failed to load courses" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { supabase } = await requireAdminSupabaseClient(req);
    const body = await req.json();
    const payload = {
      slug: body.slug || slugify(body.title || `course-${Date.now()}`),
      title: body.title || "",
      description: body.description || `${body.title || "Course"} description`,
      instructor: body.instructor || "",
      price: parsePrice(body.price),
      currency: body.currency || "INR",
      level: body.level || "All levels",
      duration: body.duration || "TBD",
      category: body.category || body.format || "Digital Twin",
      is_published: body.is_published ?? true,
    };
    const { error } = await supabase.from("courses").insert(payload);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error instanceof AdminApiError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: error?.message ?? "Failed to create course" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { supabase } = await requireAdminSupabaseClient(req);
    const body = await req.json(); // { id, ...fields }
    const { id } = body;
    const update = {
      title: body.title,
      description: body.description,
      instructor: body.instructor,
      price: parsePrice(body.price),
      level: body.level,
      duration: body.duration,
      category: body.category || body.format,
      currency: body.currency || "INR",
      is_published: body.is_published ?? true,
    };
    const { error } = await supabase.from("courses").update(update).eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error instanceof AdminApiError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: error?.message ?? "Failed to update course" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { supabase } = await requireAdminSupabaseClient(req);
    const { id } = await req.json();
    const { error } = await supabase.from("courses").delete().eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error instanceof AdminApiError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: error?.message ?? "Failed to delete course" }, { status: 500 });
  }
}
