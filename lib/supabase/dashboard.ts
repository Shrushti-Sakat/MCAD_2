import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export async function getCurrentUserDashboardCourses() {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    throw new Error("Supabase environment variables are missing.");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Authentication required.");
  }

  const { data, error } = await supabase
    .from("enrollments")
    .select(
      `
        id,
        user_id,
        status,
        created_at,
        course_id,
        courses (
          id,
          slug,
          title,
          description,
          instructor,
          price,
          currency,
          level,
          duration,
          category
        )
      `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
