import { NextResponse } from "next/server";

import { AdminApiError, requireAdminSupabaseClient } from "@/lib/supabase/admin-api";

function parseLessonOrder(value: unknown) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return 1;
  }
  return Math.floor(parsed);
}

export async function GET(req: Request) {
  try {
    const { supabase } = await requireAdminSupabaseClient(req);
    const courseId = new URL(req.url).searchParams.get("course_id");

    let query = supabase.from("lessons").select("*").order("lesson_order", { ascending: true });
    if (courseId) {
      query = query.eq("course_id", courseId);
    }

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data);
  } catch (error: any) {
    if (error instanceof AdminApiError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: error?.message ?? "Failed to load lessons" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { supabase } = await requireAdminSupabaseClient(req);
    const body = await req.json();

    if (!body?.course_id) {
      return NextResponse.json({ error: "course_id is required" }, { status: 400 });
    }

    const payload = {
      course_id: body.course_id,
      title: body.title || "Untitled lesson",
      description: body.description || "Lesson details",
      lesson_order: parseLessonOrder(body.lesson_order),
      is_preview: Boolean(body.is_preview),
    };

    const { error } = await supabase.from("lessons").insert(payload);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error instanceof AdminApiError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: error?.message ?? "Failed to create lesson" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { supabase } = await requireAdminSupabaseClient(req);
    const body = await req.json();

    if (!body?.id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const update = {
      title: body.title,
      description: body.description,
      lesson_order: body.lesson_order ? parseLessonOrder(body.lesson_order) : undefined,
      is_preview: body.is_preview,
    };

    const { error } = await supabase.from("lessons").update(update).eq("id", body.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error instanceof AdminApiError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: error?.message ?? "Failed to update lesson" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { supabase } = await requireAdminSupabaseClient(req);
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const { error } = await supabase.from("lessons").delete().eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error instanceof AdminApiError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: error?.message ?? "Failed to delete lesson" }, { status: 500 });
  }
}
