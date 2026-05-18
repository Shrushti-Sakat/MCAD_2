"use client";

import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

type SiteButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    fullWidth?: boolean;
    asChild?: boolean;
  }
>;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-brand to-brand-dark text-white shadow-[0_12px_30px_rgba(124,63,14,0.18)] hover:brightness-105 border border-brand/80",
  secondary:
    "bg-white text-foreground border border-border hover:border-brand hover:text-brand shadow-[0_8px_18px_rgba(30,20,10,0.05)]",
  ghost: "bg-transparent text-foreground hover:bg-brand-soft hover:text-brand-dark",
};

export function SiteButton({
  children,
  className,
  fullWidth = false,
  type = "button",
  variant = "primary",
  asChild = false,
  ...props
}: SiteButtonProps) {
  const Comp: any = asChild ? "span" : "button";

  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center rounded-full px-4 sm:px-5 py-2.5 sm:py-3 min-h-[44px] text-sm font-semibold transition duration-200 touch-manipulation",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        fullWidth && "w-full",
        variantStyles[variant],
        className,
      )}
      type={asChild ? undefined : type}
      {...props}
    >
      {children}
    </Comp>
  );
}
