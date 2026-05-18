import type { Course } from "@/lib/mock-courses";

import { CourseCard } from "@/components/site/course-card";

type CourseGridProps = {
  courses: Course[];
};

export function CourseGrid({ courses }: CourseGridProps) {
  return (
    <section className="section-shell mt-10 sm:mt-14">
      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}
