"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { ProductVariant } from "@/lib/mock-products";

type ProductVariantSelectorProps = {
  variants: ProductVariant[];
  productTitle: string;
};

export function ProductVariantSelector({
  variants,
  productTitle,
}: ProductVariantSelectorProps) {
  // Get unique colors - keep first occurrence of each color, limit to 6
  const uniqueVariants = useCallback(() => {
    const seen = new Set<string>();
    const unique: ProductVariant[] = [];
    for (const variant of variants) {
      if (!seen.has(variant.color)) {
        seen.add(variant.color);
        unique.push(variant);
        if (unique.length === 6) break;
      }
    }
    return unique;
  }, [variants]);

  const displayVariants = uniqueVariants();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showLogoPopup, setShowLogoPopup] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const selected = displayVariants[selectedIndex];

  useEffect(() => {
    if (typeof window === "undefined") return;
    displayVariants.forEach((variant) => {
      const img = new window.Image();
      img.src = variant.image;
    });
  }, [displayVariants]);

  // Close popup when clicking outside
  useEffect(() => {
    if (!showLogoPopup) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setShowLogoPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showLogoPopup]);

  const switchVariant = useCallback(
    (index: number) => {
      if (index === selectedIndex || index < 0 || index >= displayVariants.length) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setSelectedIndex(index);
        setTimeout(() => setIsTransitioning(false), 60);
      }, 180);
    },
    [selectedIndex, displayVariants.length],
  );

  const onTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.changedTouches[0].clientX;
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    touchEndX.current = event.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) <= 50) return;
    if (diff > 0 && selectedIndex < displayVariants.length - 1) switchVariant(selectedIndex + 1);
    else if (diff < 0 && selectedIndex > 0) switchVariant(selectedIndex - 1);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft" && selectedIndex > 0) switchVariant(selectedIndex - 1);
    else if (event.key === "ArrowRight" && selectedIndex < displayVariants.length - 1) switchVariant(selectedIndex + 1);
  };

  return (
    <div className="space-y-5">
      {/* Image container — clean white, no yellow tints */}
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-[1.75rem] border border-gray-200 bg-white shadow-sm"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onKeyDown={onKeyDown}
        tabIndex={0}
        role="region"
        aria-label={`${productTitle} variant images, swipe or use arrow keys`}
        aria-roledescription="carousel"
      >
        {/* Robot image */}
        <div
          className="relative mx-auto flex aspect-[4/5] max-h-[520px] items-center justify-center p-6 sm:p-8"
          style={{
            transition: "opacity 180ms ease, transform 180ms ease",
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? "scale(0.96)" : "scale(1)",
          }}
        >
          <Image
            alt={`${productTitle} - ${selected.color}`}
            src={selected.image}
            fill
            sizes="(max-width: 640px) 100vw, 500px"
            className="object-contain drop-shadow-xl"
            priority={selectedIndex === 0}
          />
        </div>

        {/* Invisible clickable hotspot over the MCAD logo on the arm base */}
        <div className="absolute" style={{ bottom: "12%", left: "18%", width: "64%", height: "10%" }} ref={popupRef}>
          <button
            type="button"
            onClick={() => setShowLogoPopup((v) => !v)}
            className="h-full w-full cursor-pointer rounded-lg bg-transparent"
            title="Click to learn about custom logo"
            aria-label="MCAD logo — click to learn about custom branding"
          />

          {showLogoPopup && (
            <div className="absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl">
              <div className="mb-1 flex items-center gap-2">
                <span className="text-lg">✨</span>
                <p className="text-sm font-semibold text-gray-800">Custom Logo Option</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                You can have <span className="font-semibold text-gray-800">any desired logo</span> on your purchased arm — your college, department, or lab branding, applied during manufacturing.
              </p>
              <button
                type="button"
                onClick={() => setShowLogoPopup(false)}
                className="mt-3 text-xs font-medium text-gray-400 hover:text-gray-600"
              >
                Got it ✕
              </button>
            </div>
          )}
        </div>

        {/* Low stock badge */}
        {selected.stock <= 5 && (
          <div className="absolute right-4 top-4 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
            Only {selected.stock} left
          </div>
        )}

        {/* Mobile swipe dots */}
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 sm:hidden">
          {displayVariants.map((variant, index) => (
            <div
              key={variant.id}
              className="rounded-full transition-all duration-300"
              style={{
                width: index === selectedIndex ? 20 : 6,
                height: 6,
                backgroundColor: index === selectedIndex ? "var(--brand)" : "rgba(0,0,0,0.15)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Color selector — clean white */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Color: <span className="font-semibold text-gray-800">{selected.color}</span>
          </p>
          <p className="text-xs">
            {selected.stock > 0 ? (
              <span className="font-medium text-emerald-600">In stock ({selected.stock})</span>
            ) : (
              <span className="font-medium text-red-500">Out of stock</span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2.5" role="radiogroup" aria-label="Product color">
          {displayVariants.map((variant, index) => {
            const isSelected = index === selectedIndex;
            return (
              <button
                key={variant.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                aria-label={variant.color}
                title={variant.color}
                onClick={() => switchVariant(index)}
                className="group relative flex items-center justify-center rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2"
                style={{ width: isSelected ? 44 : 36, height: isSelected ? 44 : 36 }}
              >
                <span
                  className="absolute inset-0 rounded-full border-2 transition-all duration-300"
                  style={{
                    borderColor: isSelected ? "var(--brand)" : "transparent",
                    transform: isSelected ? "scale(1)" : "scale(0.85)",
                    opacity: isSelected ? 1 : 0,
                  }}
                />
                <span
                  className="relative rounded-full shadow-sm transition-all duration-200 group-hover:scale-110"
                  style={{
                    width: isSelected ? 30 : 26,
                    height: isSelected ? 30 : 26,
                    backgroundColor: variant.colorHex,
                    border:
                      variant.colorHex === "#f0ece6"
                        ? "1.5px solid #d5cfc6"
                        : "1.5px solid rgba(0,0,0,0.08)",
                  }}
                />
                {isSelected && (
                  <span className="absolute flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="drop-shadow-sm">
                      <path
                        d="M3 7.5L5.5 10L11 4"
                        stroke={
                          ["#f0ece6", "#b0b8c1", "#f0c419"].includes(variant.colorHex)
                            ? "#1a1a1a"
                            : "#ffffff"
                        }
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
