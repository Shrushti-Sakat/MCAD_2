import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

import { SiteButton } from "@/components/site/button";

type PlaceOrderButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    label?: string;
  }
>;

export function PlaceOrderButton({ label = "Place order", ...props }: PlaceOrderButtonProps) {
  return (
    <SiteButton fullWidth {...props} className="text-sm sm:text-base min-h-[44px] sm:min-h-[48px]">
      {label}
    </SiteButton>
  );
}
