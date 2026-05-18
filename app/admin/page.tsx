"use client";

import { useEffect, useState } from "react";

import { AdminCard } from "@/components/admin/admin-card";
import { AdminTable } from "@/components/admin/admin-table";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type Order = {
  id: string;
  item_type: string;
  item_id: string;
  amount: number;
  status: string;
  created_at: string;
};

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [counts, setCounts] = useState({ courses: 0, products: 0, orders: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const supabase = getSupabaseBrowserClient();
      if (!supabase) {
        setLoading(false);
        return;
      }

      try {
        const [
          { count: courseCount, error: ce },
          { count: productCount, error: pe },
          { data: ordersData, error: oe },
        ] = await Promise.all([
          supabase.from("courses").select("*", { count: "exact", head: true }),
          supabase.from("products").select("*", { count: "exact", head: true }),
          supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(5),
        ]);

        const firstError = ce || pe || oe;
        if (firstError) {
          setError(firstError.message);
        } else {
          setCounts({
            courses: courseCount ?? 0,
            products: productCount ?? 0,
            orders: ordersData?.length ?? 0,
          });
          setOrders((ordersData ?? []) as Order[]);
        }
      } catch (err: any) {
        setError(err?.message ?? "Failed to load admin data");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  return (
    <>
      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AdminCard label="Courses" value={loading ? "…" : String(counts.courses)} hint="Published learning tracks" />
        <AdminCard label="Products" value={loading ? "…" : String(counts.products)} hint="Robotics kits in catalog" />
        <AdminCard label="Orders" value={loading ? "…" : String(counts.orders)} hint="Total orders placed" />
      </div>

      <div className="mt-8 space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Recent orders</h2>
        {loading ? (
          <p className="text-sm text-muted">Loading…</p>
        ) : orders.length === 0 ? (
          <p className="text-sm text-muted">No orders yet.</p>
        ) : (
          <AdminTable
            columns={[
              { header: "Order ID", accessor: (r: Order) => r.id.slice(0, 8) + "…" },
              { header: "Type", accessor: (r: Order) => r.item_type },
              { header: "Item", accessor: (r: Order) => r.item_id },
              { header: "Amount", accessor: (r: Order) => `₹${Number(r.amount).toLocaleString("en-IN")}` },
              { header: "Status", accessor: (r: Order) => r.status },
            ]}
            data={orders}
          />
        )}
      </div>
    </>
  );
}
