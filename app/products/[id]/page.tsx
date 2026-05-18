import { notFound } from "next/navigation";

import { PageHero } from "@/components/site/page-hero";
import { ProductDetailHero } from "@/components/site/product-detail-hero";
import { ProductGrid } from "@/components/site/product-grid";
import { mockProducts } from "@/lib/mock-products";
import { getProductById, getProducts } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return mockProducts.map((product) => ({ id: product.id }));
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const { product } = await getProductById(id);

  if (!product) {
    notFound();
  }

  const { products } = await getProducts();
  const related = products.filter((item) => item.id !== product.id);

  return (
    <>
      <PageHero
        eyebrow="Product"
        title={product.title}
        description="Detailed robotics kit view for M CAD Solutions with Digital Twin-focused specs and secure purchase flow."
      />

      <ProductDetailHero product={product} />

      {related.length > 0 ? (
        <section className="pb-20">
          <div className="section-shell">
            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-brand-dark">
                  More kits
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-foreground">
                  Explore other robotics platforms
                </h2>
              </div>
            </div>
          </div>
          <ProductGrid products={related} />
        </section>
      ) : null}
    </>
  );
}
