import type { Course } from "@/lib/mock-courses";

type CourseOverviewPanelProps = {
  course: Course;
};

export function CourseOverviewPanel({ course }: CourseOverviewPanelProps) {
  return (
    <section className="section-shell mt-16">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/90 p-7 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-dark">
            Course Overview
          </p>
          <p className="mt-5 text-base leading-8 text-muted">{course.tagline}</p>
        </div>
        <div className="rounded-[2rem] border border-white/80 bg-gradient-to-br from-white to-brand-soft/40 p-7 shadow-soft">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-muted">Level</p>
              <p className="mt-2 text-lg font-semibold text-foreground">{course.level}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-muted">Format</p>
              <p className="mt-2 text-lg font-semibold text-foreground">{course.format}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
