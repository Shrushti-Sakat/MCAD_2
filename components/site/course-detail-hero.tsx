import { Clock3, Radar, UserRound } from "lucide-react";

import Link from "next/link";
import type { Course } from "@/lib/mock-courses";

type CourseDetailHeroProps = {
  course: Course;
};

export function CourseDetailHero({ course }: CourseDetailHeroProps) {
  return (
    <section className="section-shell pt-10">
      <div className="grid gap-8 rounded-[2rem] border border-white/80 bg-white/90 p-8 shadow-soft lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-brand-dark">
            {course.category}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {course.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-muted">{course.description}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-border/70 bg-brand-soft/55 p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-brand-dark">
                <UserRound className="h-4 w-4" />
                Instructor
              </div>
              <p className="mt-2 text-base font-semibold text-foreground">{course.instructor}</p>
            </div>
            <div className="rounded-3xl border border-border/70 bg-brand-soft/55 p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-brand-dark">
                <Clock3 className="h-4 w-4" />
                Duration
              </div>
              <p className="mt-2 text-base font-semibold text-foreground">{course.duration}</p>
            </div>
            <div className="rounded-3xl border border-border/70 bg-brand-soft/55 p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-brand-dark">
                <Radar className="h-4 w-4" />
                Format
              </div>
              <p className="mt-2 text-base font-semibold text-foreground">{course.format}</p>
            </div>
          </div>
        </div>

        <aside className="rounded-[1.75rem] bg-slate-950 p-7 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200">
            Enquire
          </p>
          <p className="mt-4 leading-7 text-slate-200">{course.tagline}</p>
          <div className="mt-6 space-y-3">
            {course.outcomes.map((outcome) => (
              <div
                key={outcome}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 text-slate-100"
              >
                {outcome}
              </div>
            ))}
          </div>
          <div className="mt-7">
            <Link
              href={`/enquiry?type=course&id=${course.id}&name=${encodeURIComponent(course.title)}`}
              className="flex w-full items-center justify-center rounded-full bg-emerald-500 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Enquire Now
            </Link>
          </div>
          <p className="mt-4 text-xs leading-6 text-slate-300">
            Contact us to learn more about bringing this course to your institution.
          </p>
        </aside>
      </div>
    </section>
  );
}
