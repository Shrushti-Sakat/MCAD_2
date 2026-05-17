import { BuyButton } from "@/components/site/buy-button";

type CatalogItem = {
  category: string;
  title: string;
  description: string;
};

type CatalogGridProps = {
  items: CatalogItem[];
};

export function CatalogGrid({ items }: CatalogGridProps) {
  return (
    <section className="section-shell mt-10 sm:mt-14">
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.title}
            className="rounded-[2rem] border border-white/80 bg-white/85 p-7 shadow-soft"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-dark">
              {item.category}
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-foreground">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
            <div className="mt-8">
              <BuyButton purchaseLabel={item.title}>Buy</BuyButton>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
