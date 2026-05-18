import { PageHero } from "@/components/site/page-hero";
import { ProductGrid } from "@/components/site/product-grid";
import { getProducts } from "@/lib/products";

export default async function ProductsPage() {
  const { products } = await getProducts();

  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Explore Robots And Lab Platforms For College Robotics Programs"
        description="These products support robotics lab development in colleges, giving teams the physical platforms needed for hands-on Digital Twin training, demos, experiments, and student projects."
      />
      <ProductGrid products={products} />
    </>
  );
}
