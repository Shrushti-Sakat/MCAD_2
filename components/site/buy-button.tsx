"use client";

import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

import { SiteButton } from "@/components/site/button";

type BuyButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    purchaseLabel?: string;
    variant?: "primary" | "secondary" | "ghost";
  }
>;

export function BuyButton({
  children,
  onClick,
  purchaseLabel,
  variant = "primary",
  ...props
}: BuyButtonProps) {
  return (
    <SiteButton
      onClick={onClick}
      variant={variant}
      {...props}
    >
      {children}
    </SiteButton>
  );
}
