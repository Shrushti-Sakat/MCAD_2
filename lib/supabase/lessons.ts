import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export type LessonInput = {
  course_id: string;
  title: string;
  description: string;
  lesson_order: number;
  is_preview?: boolean;
};

function getClient() {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) {
    throw new Error("Supabase not configured");
  }
  return supabase as any;
}

export async function listLessons(courseId?: string) {
  const supabase = getClient();
  let query = supabase.from("lessons").select("*").order("lesson_order", { ascending: true });
  if (courseId) query = query.eq("course_id", courseId);
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function createLesson(input: LessonInput) {
  const supabase = getClient();
  const payload = {
    course_id: input.course_id,
    title: input.title,
    description: input.description,
    lesson_order: Math.max(1, Math.floor(input.lesson_order || 1)),
    is_preview: Boolean(input.is_preview),
  };
  const { error } = await supabase.from("lessons").insert(payload);
  if (error) throw error;
}

export async function updateLesson(id: string, update: Partial<LessonInput>) {
  const supabase = getClient();
  const payload = {
    title: update.title,
    description: update.description,
    lesson_order:
      update.lesson_order === undefined ? undefined : Math.max(1, Math.floor(update.lesson_order)),
    is_preview: update.is_preview,
  };
  const { error } = await supabase.from("lessons").update(payload).eq("id", id);
  if (error) throw error;
}

export async function deleteLesson(id: string) {
  const supabase = getClient();
  const { error } = await supabase.from("lessons").delete().eq("id", id);
  if (error) throw error;
}
