import Link from "next/link";
import { ArrowRight, CircleCheckBig, PlayCircle, UserRound } from "lucide-react";

import type { DashboardCourse } from "@/lib/mock-dashboard";

type DashboardCourseCardProps = {
  course: DashboardCourse;
};

export function DashboardCourseCard({ course }: DashboardCourseCardProps) {
  return (
    <article className="rounded-[2rem] border border-white/80 bg-white/90 p-4 sm:p-7 shadow-soft">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
        <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-dark">
          {course.status}
        </span>
        <span className="text-xs sm:text-sm font-semibold text-muted">{course.progress}% complete</span>
      </div>

      <h2 className="mt-3 sm:mt-5 text-lg sm:text-2xl font-semibold tracking-tight text-foreground">
        {course.title}
      </h2>

      <div className="mt-2 sm:mt-4 flex items-center gap-2 text-xs sm:text-sm text-muted">
        <UserRound className="h-3 w-3 sm:h-4 sm:w-4 text-brand-dark flex-shrink-0" />
        <span>{course.instructor}</span>
      </div>

      <div className="mt-4 sm:mt-6">
        <div className="h-2 sm:h-3 overflow-hidden rounded-full bg-brand-soft/70">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-dark via-brand to-accent transition-all"
            style={{ width: `${course.progress}%` }}
          />
        </div>
      </div>

      <div className="mt-4 sm:mt-6 rounded-[1.5rem] border border-border/70 bg-brand-soft/30 p-3 sm:p-4">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand-dark">
          <PlayCircle className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
          Next lesson
        </div>
        <p className="mt-1 sm:mt-2 text-xs sm:text-sm leading-5 sm:leading-6 text-foreground">{course.nextLesson}</p>
      </div>

      <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted">
          <CircleCheckBig className="h-3 w-3 sm:h-4 sm:w-4 text-brand-dark flex-shrink-0" />
          Keep learning momentum
        </div>
        <Link
          className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-border bg-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-foreground transition hover:border-brand hover:text-brand-dark"
          href={`/courses/${course.id}`}
        >
          Open course
          <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
        </Link>
      </div>
    </article>
  );
}
