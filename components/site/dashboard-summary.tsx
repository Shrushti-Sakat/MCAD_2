import { BookOpen, ChartNoAxesColumn, Target } from "lucide-react";

import type { DashboardCourse } from "@/lib/mock-dashboard";

type DashboardSummaryProps = {
  courses: DashboardCourse[];
};

export function DashboardSummary({ courses }: DashboardSummaryProps) {
  const completedOrNearComplete = courses.filter((course) => course.progress >= 80).length;
  const averageProgress = Math.round(
    courses.reduce((sum, course) => sum + course.progress, 0) / courses.length,
  );

  const stats = [
    {
      label: "Purchased courses",
      value: String(courses.length),
      icon: BookOpen,
    },
    {
      label: "Average progress",
      value: `${averageProgress}%`,
      icon: ChartNoAxesColumn,
    },
    {
      label: "Near completion",
      value: String(completedOrNearComplete),
      icon: Target,
    },
  ] as const;

  return (
    <section className="section-shell mt-10 sm:mt-14">
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-[2rem] border border-white/80 bg-white/90 p-4 sm:p-7 shadow-soft"
          >
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-brand-soft text-brand-dark">
              <stat.icon className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <p className="mt-3 sm:mt-5 text-2xl sm:text-3xl font-semibold text-foreground">{stat.value}</p>
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm leading-5 sm:leading-6 text-muted">{stat.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
