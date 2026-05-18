import type { DashboardCourse } from "@/lib/mock-dashboard";

import { DashboardCourseCard } from "@/components/site/dashboard-course-card";
import { SectionHeading } from "@/components/site/section-heading";

type DashboardCourseListProps = {
  courses: DashboardCourse[];
};

export function DashboardCourseList({ courses }: DashboardCourseListProps) {
  return (
    <section className="section-shell mt-12 sm:mt-16">
      <SectionHeading
        eyebrow="Purchased Courses"
        title="Track your enrolled learning paths"
        description={
          <p>
            This dashboard uses mock progress data for now, but the layout is ready to
            connect to real Supabase enrollments and lesson completion later.
          </p>
        }
      />

      <div className="mt-6 sm:mt-10 grid gap-3 sm:gap-6">
        {courses.map((course) => (
          <DashboardCourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}
