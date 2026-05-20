import { BuyButton } from "@/components/site/buy-button";
import { coursesPreview } from "@/components/site/constants";
import { SectionHeading } from "@/components/site/section-heading";

export function CoursePreviewSection() {
  return (
    <section className="section-shell mt-24">
      <SectionHeading
        eyebrow="Featured Access"
        title="Training tracks built for campus robotics labs and broad student participation"
        description={
          <p>
            These sample tracks show how Digital Twin training can support a college lab rollout,
            from beginner-friendly foundations to hardware integration and project delivery.
          </p>
        }
      />
      <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {coursesPreview.map((course) => (
          <article
            key={course.title}
            className="rounded-[2rem] border border-white/80 bg-white/85 p-7 shadow-soft"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-dark">
              {course.category}
            </p>
            <h3 className="mt-4 text-2xl font-semibold text-foreground">{course.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted">{course.summary}</p>
            <div className="mt-8 flex items-center justify-between gap-4">
              <span className="text-sm font-semibold text-foreground">{course.price}</span>
              <BuyButton purchaseLabel={course.title}>Buy</BuyButton>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
