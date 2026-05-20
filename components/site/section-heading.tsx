import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: ReactNode;
};

export function SectionHeading({
  description,
  eyebrow,
  title,
}: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-brand-dark">
        {eyebrow}
      </p>
      <h2 className="mt-4 sm:mt-6 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      <div className="mt-4 sm:mt-8 text-sm sm:text-base leading-6 sm:leading-7 text-muted">{description}</div>
    </div>
  );
}
