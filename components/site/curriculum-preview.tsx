import type { Course } from "@/lib/mock-courses";

import { SectionHeading } from "@/components/site/section-heading";

type CurriculumPreviewProps = {
  course: Course;
};

export function CurriculumPreview({ course }: CurriculumPreviewProps) {
  return (
    <section className="section-shell mt-16">
      <SectionHeading
        eyebrow="Curriculum Preview"
        title="A guided path through modern robotics and Digital Twin concepts"
        description={
          <p>
            This preview helps learners understand the course structure before purchase,
            which keeps the browsing experience transparent and conversion-friendly.
          </p>
        }
      />

      <div className="mt-10 grid gap-5">
        {course.curriculum.map((module, index) => (
          <article
            key={module.title}
            className="grid gap-4 rounded-[1.75rem] border border-white/80 bg-white/90 p-6 shadow-soft lg:grid-cols-[96px_1fr]"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-brand-soft text-lg font-semibold text-brand-dark">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-foreground">{module.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{module.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
