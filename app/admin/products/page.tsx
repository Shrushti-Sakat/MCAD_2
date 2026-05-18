"use client";

import { useEffect, useState } from "react";


import { AdminModal } from "@/components/admin/admin-modal";
import { AdminTable } from "@/components/admin/admin-table";
import { ProductForm, type ProductFormState } from "@/components/admin/product-form";
import { SiteButton } from "@/components/site/button";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function AdminProductsPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editingProduct = editingId ? rows.find((p) => p.id === editingId) : undefined;

  const columns = [
    { header: "Title", accessor: (r: typeof rows[0]) => r.title },
    { header: "ID", accessor: (r: typeof rows[0]) => r.id },
    { header: "Category", accessor: (r: typeof rows[0]) => r.category },
    { header: "Type", accessor: (r: typeof rows[0]) => r.type },
    { header: "Use case", accessor: (r: typeof rows[0]) => r.use_case },
    { header: "Price", accessor: (r: typeof rows[0]) => r.price_text },
  ];

  function slugify(input: string) {
    return input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function parseHighlights(value: string) {
    return value
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);
  }

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
        .from("products")
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
      setError(err?.message ?? "Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function handleSave(data: ProductFormState) {
    try {
      setError(null);
      console.log("📝 Product save triggered with data:", data);
      
      const supabaseClient = getSupabaseBrowserClient();
      if (!supabaseClient) {
        const msg = "Supabase client is not configured";
        console.error("❌", msg);
        setError(msg);
        return;
      }
      
      const supabase = supabaseClient as any;
      const payload = {
        id: data.id || slugify(data.title || `product-${Date.now()}`),
        category: data.category || "Robotics",
        title: data.title,
        description: data.description || `${data.title} description`,
        type: data.type || "Platform",
        price_text: data.price,
        use_case: data.useCase,
        highlights: parseHighlights(data.highlights),
      };

      console.log("📦 Product payload:", payload);

      if (editingId) {
        console.log("✏️ Updating product ID:", editingId);
        const { data: result, error } = await supabase
          .from("products")
          .update(payload)
          .eq("id", editingId)
          .select();
        
        console.log("Update response:", { result, error });
        if (error) {
          const msg = `Update failed: ${error.message}`;
          console.error("❌", msg);
          setError(msg);
          return;
        }
        console.log("✅ Product updated successfully");
      } else {
        console.log("➕ Creating new product");
        const { data: result, error } = await supabase
          .from("products")
          .insert([payload])
          .select();
        
        console.log("Insert response:", { result, error });
        if (error) {
          const msg = `Create failed: ${error.message}`;
          console.error("❌", msg);
          setError(msg);
          return;
        }
        console.log("✅ Product created successfully");
      }

      console.log("🔄 Reloading products list...");
      setModalOpen(false);
      setEditingId(null);
      await load();
      console.log("✅ All done!");
    } catch (err: any) {
      const msg = `Error: ${err?.message ?? "Unknown error"}`;
      console.error("❌ Exception:", err);
      setError(msg);
    }
  }

  async function handleDelete(row: (typeof rows)[0]) {
    try {
      setError(null);
      console.log("🗑️ Product delete triggered for ID:", row.id);
      
      const supabaseClient = getSupabaseBrowserClient();
      if (!supabaseClient) {
        const msg = "Supabase client is not configured";
        console.error("❌", msg);
        setError(msg);
        return;
      }
      
      const supabase = supabaseClient as any;
      console.log("🔄 Deleting from Supabase...");
      
      const { data: result, error } = await supabase
        .from("products")
        .delete()
        .eq("id", row.id)
        .select();
      
      console.log("Delete response:", { result, error });
      
      if (error) {
        const msg = `Delete failed: ${error.message}`;
        console.error("❌", msg);
        setError(msg);
        return;
      }
      
      console.log("✅ Product deleted successfully");
      console.log("🔄 Reloading products list...");
      await load();
      console.log("✅ Delete completed!");
    } catch (err: any) {
      const msg = `Delete error: ${err?.message ?? "Unknown error"}`;
      console.error("❌ Exception:", err);
      setError(msg);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between pb-4">
        <p className="text-sm text-muted">
          {loading ? "Loading..." : `Total products: ${rows.length}`}
        </p>
        <SiteButton onClick={() => setModalOpen(true)}>Add product</SiteButton>
      </div>
      {error ? <p className="mb-3 text-sm text-red-700">{error}</p> : null}

      <AdminTable
        columns={columns}
        data={rows}
        onEdit={(row) => {
          setEditingId(row.id);
          setModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      <AdminModal
        title={editingProduct ? "Edit product" : "Add product"}
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingId(null);
        }}
      >
        <ProductForm
          initial={
            editingProduct
              ? {
                  title: editingProduct.title,
                  id: editingProduct.id,
                  category: editingProduct.category,
                  description: editingProduct.description,
                  price: editingProduct.price_text,
                  type: editingProduct.type,
                  useCase: editingProduct.use_case,
                  highlights:
                    Array.isArray(editingProduct.highlights) ? editingProduct.highlights.join(", ") : "",
                }
              : undefined
          }
          onSubmit={handleSave}
          onCancel={() => {
            setModalOpen(false);
            setEditingId(null);
          }}
        />
      </AdminModal>
    </>
  );
}
