"use client";

import { useEffect, useState } from "react";


import { AdminTable } from "@/components/admin/admin-table";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function AdminOrdersPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const columns = [
    { header: "Order ID", accessor: (r: typeof rows[0]) => r.id },
    { header: "User", accessor: (r: typeof rows[0]) => r.user_id },
    { header: "Type", accessor: (r: typeof rows[0]) => r.type ?? r.item_type ?? "-" },
    { header: "Status", accessor: (r: typeof rows[0]) => r.status },
    {
      header: "Total",
      accessor: (r: typeof rows[0]) =>
        `INR ${Number(r.total_amount ?? r.amount ?? 0).toLocaleString("en-IN")}`,
    },
  ];

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const supabaseClient = getSupabaseBrowserClient();
      if (!supabaseClient) {
        setRows([]);
        setError("Supabase client is not configured");
        return;
      }
      const supabase = supabaseClient as any;
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        setRows([]);
        setError(error.message);
        return;
      }
      setRows(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setRows([]);
      setError(err?.message ?? "Failed to load orders");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function handleDelete(row: (typeof rows)[0]) {
    setError(null);
    const supabaseClient = getSupabaseBrowserClient();
    if (!supabaseClient) {
      setError("Supabase client is not configured");
      return;
    }
    const supabase = supabaseClient as any;
    const { error } = await supabase.from("orders").delete().eq("id", row.id);
    if (error) {
      setError(error.message);
      return;
    }
    await load();
  }

  return (
    <>
      <p className="mb-3 text-sm text-muted">{loading ? "Loading..." : ""}</p>
      {error ? <p className="mb-3 text-sm text-red-700">{error}</p> : null}
      <AdminTable columns={columns} data={rows} onDelete={handleDelete} />
    </>
  );
}
