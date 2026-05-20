"use client";

import { useRouter } from "next/navigation";

import { SiteButton } from "@/components/site/button";

type BuyProductButtonProps = {
  className?: string;
  productId: string;
};

/**
 * Navigates directly to checkout — no auth required.
 */
export function BuyProductButton({ className, productId }: BuyProductButtonProps) {
  const router = useRouter();

  const checkoutUrl = `/checkout?type=product&productId=${productId}`;

  function handleClick() {
    router.push(checkoutUrl);
  }

  return (
    <SiteButton className={className ?? "w-full"} onClick={handleClick}>
      Buy Product
    </SiteButton>
  );
}
