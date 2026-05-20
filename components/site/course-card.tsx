import { ArrowRight, Clock3, Radar, UserRound } from "lucide-react";
import Link from "next/link";

import { BuyCourseButton } from "@/components/site/buy-course-button";
import type { Course } from "@/lib/mock-courses";

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="flex flex-col rounded-[2rem] border border-white/80 bg-white/90 p-4 sm:p-7 shadow-soft">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.24em] text-brand-dark">
          {course.category}
        </p>
        <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-dark">
          {course.level}
        </span>
      </div>

      <h2 className="mt-3 sm:mt-5 text-lg sm:text-2xl font-semibold tracking-tight text-foreground">
        {course.title}
      </h2>
      <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-6 sm:leading-7 text-muted">{course.description}</p>

      <div className="mt-4 sm:mt-6 grid gap-2 sm:gap-3 text-xs sm:text-sm text-muted grid-cols-1 sm:grid-cols-2">
        <div className="flex items-center gap-2">
          <UserRound className="h-3 w-3 sm:h-4 sm:w-4 text-brand-dark flex-shrink-0" />
          <span className="truncate">{course.instructor}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock3 className="h-3 w-3 sm:h-4 sm:w-4 text-brand-dark flex-shrink-0" />
          <span>{course.duration}</span>
        </div>
        <div className="flex items-center gap-2 sm:col-span-2">
          <Radar className="h-3 w-3 sm:h-4 sm:w-4 text-brand-dark flex-shrink-0" />
          <span>{course.format}</span>
        </div>
      </div>

      <div className="mt-auto pt-6 sm:pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 border-t border-border/70">
        <div className="pt-4 sm:pt-6 w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <Link
            href={`/enquiry?type=course&name=${encodeURIComponent(course.title)}`}
            className="inline-flex items-center justify-center rounded-full bg-brand px-4 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-white transition hover:bg-brand-dark w-full sm:w-auto"
          >
            Enquire Now
            <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
          </Link>
          <Link
            className="inline-flex items-center justify-center rounded-full border border-border bg-white px-4 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-foreground transition hover:border-brand hover:text-brand-dark w-full sm:w-auto"
            href={`/courses/${course.id}`}
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}
