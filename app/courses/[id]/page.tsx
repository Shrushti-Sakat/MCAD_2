import { notFound } from "next/navigation";

import { CourseDetailHero } from "@/components/site/course-detail-hero";
import { CourseOverviewPanel } from "@/components/site/course-overview-panel";
import { CurriculumPreview } from "@/components/site/curriculum-preview";
import { getCourseBySlug, getCourses } from "@/lib/courses";

export const dynamic = "force-dynamic";

type CourseDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const { courses } = await getCourses();
  return courses.map((course) => ({ id: course.id }));
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { id } = await params;
  const { course } = await getCourseBySlug(id);

  if (!course) notFound();

  return (
    <>
      <CourseDetailHero course={course} />
      <CourseOverviewPanel course={course} />
      <CurriculumPreview course={course} />
    </>
  );
}
