type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ description, eyebrow, title }: PageHeroProps) {
  return (
    <section className="section-shell pt-4 sm:pt-6">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/85 px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-8 shadow-soft">
        <div className="pointer-events-none absolute -left-10 -top-10 h-36 w-36 rounded-full bg-brand-soft/60 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 -bottom-14 h-44 w-44 rounded-full bg-brand/10 blur-3xl" />
        <div className="relative">
          <span className="inline-flex items-center rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-brand-dark">
            {eyebrow}
          </span>
          <h1 className="mt-2 sm:mt-3 text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground [text-wrap:balance]">
            {title}
          </h1>
          <p className="mt-2 sm:mt-3 max-w-5xl text-sm sm:text-base lg:text-base leading-6 sm:leading-7 text-muted text-pretty">{description}</p>
        </div>
      </div>
    </section>
  );
}
