"use client";

import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

import { SiteButton } from "@/components/site/button";
import { useAuthModal } from "@/components/site/auth-modal-context";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

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
  const { openAuthModal } = useAuthModal();

  return (
    <SiteButton
      onClick={async (event) => {
        const supabase = getSupabaseBrowserClient();
        const label =
          purchaseLabel ??
          (typeof children === "string" ? children : "Selected course");

        if (!supabase) {
          openAuthModal({ label });
          return;
        }

        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          onClick?.(event);
          return;
        }

        openAuthModal({
          label,
        });
      }}
      variant={variant}
      {...props}
    >
      {children}
    </SiteButton>
  );
}
