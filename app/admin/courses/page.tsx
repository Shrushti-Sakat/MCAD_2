"use client";

import { useEffect, useState } from "react";


import { AdminModal } from "@/components/admin/admin-modal";
import { AdminTable } from "@/components/admin/admin-table";
import { CourseForm, type CourseFormState } from "@/components/admin/course-form";
import { SiteButton } from "@/components/site/button";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function AdminCoursesPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editingCourse = editingId ? rows.find((c) => c.id === editingId) : undefined;

  const columns = [
    { header: "Title", accessor: (r: typeof rows[0]) => r.title },
    { header: "Slug", accessor: (r: typeof rows[0]) => r.slug },
    { header: "Instructor", accessor: (r: typeof rows[0]) => r.instructor },
    { header: "Price", accessor: (r: typeof rows[0]) => `INR ${Number(r.price ?? 0).toLocaleString("en-IN")}` },
    { header: "Level", accessor: (r: typeof rows[0]) => r.level },
    { header: "Category", accessor: (r: typeof rows[0]) => r.category },
  ];

  function slugify(input: string) {
    return input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function parsePrice(value: string | number) {
    const stringValue = String(value);
    const numeric = stringValue.replace(/[^\d.]/g, "");
    return Number(numeric || 0);
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
        .from("courses")
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
      setError(err?.message ?? "Failed to load courses");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function handleSave(data: CourseFormState) {
    try {
      setError(null);
      console.log("📝 Save triggered with data:", data);
      
      const supabaseClient = getSupabaseBrowserClient();
      if (!supabaseClient) {
        const msg = "Supabase client is not configured";
        console.error("❌", msg);
        setError(msg);
        return;
      }
      
      const supabase = supabaseClient as any;
      const payload = {
        slug: data.slug || slugify(data.title || `course-${Date.now()}`),
        title: data.title,
        description: data.description || `${data.title} description`,
        instructor: data.instructor,
        price: parsePrice(data.price),
        currency: "INR",
        level: data.level,
        duration: data.duration,
        category: data.category || "Digital Twin",
        is_published: true,
      };
      
      console.log("📦 Payload:", payload);
      
      if (editingId) {
        console.log("✏️ Updating course ID:", editingId);
        const { data: result, error } = await supabase
          .from("courses")
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
        console.log("✅ Course updated successfully");
      } else {
        console.log("➕ Creating new course");
        const { data: result, error } = await supabase
          .from("courses")
          .insert([payload])
          .select();
        
        console.log("Insert response:", { result, error });
        if (error) {
          const msg = `Create failed: ${error.message}`;
          console.error("❌", msg);
          setError(msg);
          return;
        }
        console.log("✅ Course created successfully");
      }
      
      console.log("🔄 Reloading courses list...");
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
      console.log("🗑️ Delete triggered for course ID:", row.id);
      
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
        .from("courses")
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
      
      console.log("✅ Course deleted successfully");
      console.log("🔄 Reloading courses list...");
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
          {loading ? "Loading..." : `Total courses: ${rows.length}`}
        </p>
        <SiteButton onClick={() => setModalOpen(true)}>Add course</SiteButton>
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
        title={editingCourse ? "Edit course" : "Add course"}
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingId(null);
        }}
      >
        <CourseForm
          initial={
            editingCourse
              ? {
                  title: editingCourse.title,
                  instructor: editingCourse.instructor,
                  price: String(editingCourse.price),
                  duration: editingCourse.duration,
                  level: editingCourse.level,
                  category: editingCourse.category,
                  description: editingCourse.description,
                  slug: editingCourse.slug,
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
