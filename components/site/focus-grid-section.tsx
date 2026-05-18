import { focusCards } from "@/components/site/constants";

import { SectionHeading } from "@/components/site/section-heading";

export function FocusGridSection() {
  return (
    <section className="section-shell mt-24">
      <SectionHeading
        eyebrow="Platform Benefits"
        title="Built to communicate one clear promise to colleges"
        description={
          <p>
            The experience stays focused on robotics lab development, practical robot platforms,
            and Digital Twin training that colleges can offer to students across every branch and year.
          </p>
        }
      />
      <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {focusCards.map((card) => (
          <div
            key={card.title}
            className="rounded-[2rem] border border-brand/10 bg-gradient-to-br from-white to-brand-soft/40 p-7"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand-dark shadow-soft">
              <card.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-foreground">{card.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
