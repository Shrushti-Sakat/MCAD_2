"use client";

import { useState } from "react";
import { ArrowRight, Bot, Cpu, Radar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import type { RobotProduct } from "@/lib/mock-products";

type ProductCardProps = {
  product: RobotProduct;
};

export function ProductCard({ product }: ProductCardProps) {
  const hasVariants = product.variants && product.variants.length > 0;
  // PRODUCT CARD FIX: Fall back gracefully to a placeholder if no image exists
  const defaultImage = hasVariants && product.variants[0].image ? product.variants[0].image : "/placeholder-product.png";
  
  // PRODUCT CARD FIX: Use local state for reactive image swapping without page navigation
  const [activeImage, setActiveImage] = useState(defaultImage);

  // Handle image error - fallback to bot icon
  const handleImageError = () => {
    setActiveImage("");
  };

  // TODO: If the schema doesn't have per-variant images, it needs a schema addition.
  // Fortunately, product.variants already returns per-color image URLs.

  return (
    <article className="flex flex-col rounded-[2rem] border border-white/80 bg-white/90 p-4 sm:p-7 shadow-soft">
      {/* PRODUCT CARD FIX: Dedicated image zone at the top of each card */}
      {/* Image is full card width on mobile (w-full) and constrained to an aspect-ratio */}
      <div className="relative mb-4 sm:mb-5 w-full aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-[#f5f5f5]">
        {activeImage ? (
          <Image
            src={activeImage}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-opacity duration-300"
            onError={handleImageError}
            unoptimized
            priority={false}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <Bot className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 sm:gap-4">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-brand-dark">
          {product.category}
        </p>
        <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-brand-soft text-brand-dark flex-shrink-0">
          <Bot className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
      </div>

      <Link href={`/products/${product.id}`}>
        <h2 className="mt-3 sm:mt-5 text-lg sm:text-2xl font-semibold tracking-tight text-foreground hover:text-brand-dark transition-colors">
          {product.title}
        </h2>
      </Link>
      <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-6 sm:leading-7 text-muted">{product.description}</p>

      {/* Color variant dots */}
      {hasVariants && product.variants.length > 1 && (
        <div className="mt-3 sm:mt-4 flex items-center gap-1 flex-wrap">
          <span className="text-xs text-muted mr-1">Colors:</span>
          {product.variants
            .filter((v, index, self) => {
              // Keep only first occurrence of each unique color
              const firstIndex = self.findIndex((item) => item.color === v.color);
              return index === firstIndex;
            })
            .slice(0, 6)
            .map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => {
                  // PRODUCT CARD FIX: Update displayed image reactively on click/tap (mobile support)
                  if (v.image) setActiveImage(v.image);
                }}
                onMouseEnter={() => {
                  // PRODUCT CARD FIX: Swap on hover for desktop
                  if (v.image) setActiveImage(v.image);
                }}
                title={v.color}
                // PRODUCT CARD FIX: Minimum touch target size set to 44x44px (h-11 w-11)
                className="group relative flex h-11 w-11 items-center justify-center touch-manipulation"
                aria-label={`Select ${v.color}`}
              >
                <span
                  className="block h-4 w-4 sm:h-5 sm:w-5 rounded-full shadow-sm transition-transform group-hover:scale-125"
                  style={{
                    backgroundColor: v.colorHex,
                    border:
                      v.colorHex === "#f0ece6"
                        ? "1.5px solid #d5cfc6"
                        : "1.5px solid rgba(0,0,0,0.1)",
                  }}
                />
              </button>
            ))}
        </div>
      )}

      <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3 rounded-[1.5rem] border border-border/70 bg-brand-soft/35 p-3 sm:p-4">
        <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-foreground">
          <Cpu className="h-3 w-3 sm:h-4 sm:w-4 text-brand-dark flex-shrink-0" />
          <span className="font-medium">{product.type}</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-foreground">
          <Radar className="h-3 w-3 sm:h-4 sm:w-4 text-brand-dark flex-shrink-0" />
          <span>{product.useCase}</span>
        </div>
      </div>

      <div className="mt-4 sm:mt-6 space-y-2">
        {product.highlights.map((highlight) => (
          <div
            key={highlight}
            className="rounded-2xl border border-white/70 bg-white/70 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm leading-5 sm:leading-6 text-muted"
          >
            {highlight}
          </div>
        ))}
      </div>

      <div className="mt-auto pt-6 sm:pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 border-t border-border/70">
        <div className="pt-4 sm:pt-6 w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <Link
            href={`/enquiry?type=product&name=${encodeURIComponent(product.title)}`}
            className="inline-flex items-center justify-center rounded-full bg-brand px-4 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-white transition hover:bg-brand-dark w-full sm:w-auto"
          >
            Enquire Now
            <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
          </Link>
          <Link
            className="inline-flex items-center justify-center rounded-full border border-border bg-white px-4 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-foreground transition hover:border-brand hover:text-brand-dark w-full sm:w-auto"
            href={`/products/${product.id}`}
          >
            View product
          </Link>
        </div>
      </div>
    </article>
  );
}
