import { Bot, Cpu, Radar } from "lucide-react";

import Link from "next/link";
import { ProductVariantSelector } from "@/components/site/product-variant-selector";
import type { RobotProduct } from "@/lib/mock-products";

type ProductDetailHeroProps = {
  product: RobotProduct;
};

export function ProductDetailHero({ product }: ProductDetailHeroProps) {
  const hasVariants = product.variants && product.variants.length > 0;

  return (
    <section className="section-shell pt-10">
      <div className="grid gap-8 rounded-[2rem] border border-gray-200 bg-white p-8 shadow-soft lg:grid-cols-[1fr_1fr] lg:p-10">
        {/* Left: Variant image + color selector */}
        <div>
          {hasVariants ? (
            <ProductVariantSelector
              variants={product.variants}
              productTitle={product.title}
            />
          ) : (
            <div className="rounded-[1.75rem] border border-border/50 bg-gradient-to-br from-[#faf9f6] via-white to-[#f5f2ed] p-8">
              <div className="flex aspect-[4/5] max-h-[520px] items-center justify-center">
                <p className="text-sm text-muted">Product image</p>
              </div>
            </div>
          )}
        </div>

        {/* Right: Product info + buy */}
        <div className="flex flex-col">
          <p className="w-fit rounded-full border border-gray-300 bg-gray-100 px-3 py-1 text-sm font-semibold uppercase tracking-[0.22em] text-gray-600 shadow-sm">
            {product.category}
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {product.title}
          </h1>
          <div className="mt-4 h-1 w-24 rounded-full bg-[#f0c419]" />
          <p className="mt-5 max-w-3xl rounded-[1.5rem] border border-gray-200 bg-gray-50 px-5 py-4 text-base leading-8 text-gray-600 shadow-sm">
            {product.description}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-4 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                <Bot className="h-4 w-4" />
                Platform
              </div>
              <p className="mt-2 text-base font-semibold text-foreground">{product.type}</p>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-4 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                <Radar className="h-4 w-4" />
                Use case
              </div>
              <p className="mt-2 text-base font-semibold text-foreground">{product.useCase}</p>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-4 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                <Cpu className="h-4 w-4" />
                Stack ready
              </div>
              <p className="mt-2 text-base font-semibold text-foreground">Digital Twin / Gazebo</p>
            </div>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {product.highlights.map((highlight) => (
              <div
                key={highlight}
                className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-600"
              >
                {highlight}
              </div>
            ))}
          </div>

          {/* Enquire section */}
          <div className="mt-auto pt-8">
            <div className="rounded-[1.5rem] bg-slate-950 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200">
                    Enquire
                  </p>
                  <p className="mt-2 text-xl font-semibold">Contact us for details</p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-300">
                Select a color variant above, then enquire to learn more about bringing this platform to your institution.
              </p>

              <div className="mt-5">
                <Link
                  href={`/enquiry?type=product&id=${product.id}&name=${encodeURIComponent(product.title)}`}
                  className="flex w-full items-center justify-center rounded-full bg-emerald-500 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                >
                  Enquire Now
                </Link>
              </div>

              <p className="mt-3 text-xs leading-6 text-slate-400">
                Ships with Digital Twin-ready configuration files.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
