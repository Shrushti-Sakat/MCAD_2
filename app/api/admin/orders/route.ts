import { NextResponse } from "next/server";

import { AdminApiError, requireAdminSupabaseClient } from "@/lib/supabase/admin-api";

export async function GET(req: Request) {
  try {
    const { supabase } = await requireAdminSupabaseClient(req);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data);
  } catch (error: any) {
    if (error instanceof AdminApiError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: error?.message ?? "Failed to load orders" }, { status: 500 });
  }
}

// Update status or other fields
export async function PATCH(req: Request) {
  try {
    const { supabase } = await requireAdminSupabaseClient(req);
    const body = await req.json(); // { id, ...fields }
    const { id, ...update } = body;
    const { error } = await supabase.from("orders").update(update).eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error instanceof AdminApiError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: error?.message ?? "Failed to update order" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { supabase } = await requireAdminSupabaseClient(req);
    const { id } = await req.json();
    const { error } = await supabase.from("orders").delete().eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error instanceof AdminApiError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: error?.message ?? "Failed to delete order" }, { status: 500 });
  }
}
