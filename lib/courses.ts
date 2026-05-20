import { createClient } from "@supabase/supabase-js";

import { mockCourses, type Course, type CourseModule } from "@/lib/mock-courses";

type CoursesResult = {
  courses: Course[];
  source: "supabase" | "mock";
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let cachedClient: ReturnType<typeof createClient> | null = null;
function getClient() {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  if (!supabaseAnonKey.startsWith("eyJ") && !supabaseAnonKey.startsWith("sb_publishable_")) return null;
  if (!cachedClient) cachedClient = createClient(supabaseUrl, supabaseAnonKey);
  return cachedClient;
}

// Map mock curriculum shape for courses that don't have lessons in DB
const MOCK_CURRICULUM: Record<string, CourseModule[]> = Object.fromEntries(
  mockCourses.map((c) => [c.id, c.curriculum])
);
const MOCK_OUTCOMES: Record<string, string[]> = Object.fromEntries(
  mockCourses.map((c) => [c.id, c.outcomes])
);
const MOCK_FORMAT: Record<string, string> = Object.fromEntries(
  mockCourses.map((c) => [c.id, c.format])
);
const MOCK_TAGLINE: Record<string, string> = Object.fromEntries(
  mockCourses.map((c) => [c.id, c.tagline])
);

function mapRowToCourse(
  row: {
    id: string;
    slug: string;
    title: string;
    description: string;
    instructor: string;
    price: number;
    currency: string;
    level: string;
    duration: string;
    category: string;
  },
  lessons?: { title: string; description: string; lesson_order: number }[]
): Course {
  const slug = row.slug;
  const curriculum: CourseModule[] =
    lessons && lessons.length > 0
      ? lessons
          .sort((a, b) => a.lesson_order - b.lesson_order)
          .map((l) => ({ title: l.title, summary: l.description }))
      : (MOCK_CURRICULUM[slug] ?? []);

  const priceFormatted = `INR ${Number(row.price).toLocaleString("en-IN")}`;

  return {
    id: slug,
    category: row.category,
    title: row.title,
    description: row.description,
    instructor: row.instructor,
    price: priceFormatted,
    duration: row.duration,
    level: row.level,
    format: MOCK_FORMAT[slug] ?? "Live + Guided lab",
    tagline: MOCK_TAGLINE[slug] ?? row.description,
    outcomes: MOCK_OUTCOMES[slug] ?? [],
    curriculum,
  };
}

export async function getCourses(): Promise<CoursesResult> {
  const supabase = getClient();
  if (!supabase) return { courses: mockCourses, source: "mock" };

  try {
    const { data, error } = await supabase
      .from("courses")
      .select("id, slug, title, description, instructor, price, currency, level, duration, category")
      .eq("is_published", true)
      .order("created_at", { ascending: true });

    if (error || !data || data.length === 0) throw error ?? new Error("No courses");

    return { courses: data.map((row: any) => mapRowToCourse(row)), source: "supabase" };
  } catch (err) {
    console.warn("Falling back to mock courses:", err);
    return { courses: mockCourses, source: "mock" };
  }
}

export async function getCourseBySlug(
  slug: string
): Promise<{ course: Course | null; source: "supabase" | "mock" }> {
  const supabase = getClient();
  if (!supabase) {
    return {
      course: mockCourses.find((c) => c.id === slug) ?? null,
      source: "mock",
    };
  }

  try {
    const { data, error } = await supabase
      .from("courses")
      .select("id, slug, title, description, instructor, price, currency, level, duration, category")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();

    if (error) throw error;
    if (!data) return { course: null, source: "supabase" };

    const courseRow = data as { id: string; slug: string; title: string; description: string; instructor: string; price: number; currency: string; level: string; duration: string; category: string };

    const { data: lessonsData } = await supabase
      .from("lessons")
      .select("title, description, lesson_order")
      .eq("course_id", courseRow.id)
      .order("lesson_order", { ascending: true });

    return {
      course: mapRowToCourse(courseRow, lessonsData ?? []),
      source: "supabase",
    };
  } catch (err) {
    console.warn("Falling back to mock course:", err);
    return {
      course: mockCourses.find((c) => c.id === slug) ?? null,
      source: "mock",
    };
  }
}
