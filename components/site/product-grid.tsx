import type { RobotProduct } from "@/lib/mock-products";

import { ProductCard } from "@/components/site/product-card";

type ProductGridProps = {
  products: RobotProduct[];
};

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <section className="section-shell mt-10 sm:mt-14">
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
