"use client";

import { useRouter } from "next/navigation";

import { SiteButton } from "@/components/site/button";
import { useAuthModal } from "@/components/site/auth-modal-context";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type BuyProductButtonProps = {
  className?: string;
  productId: string;
};

/**
 * Checks auth before navigating to checkout.
 * Opens Auth Modal if the user is not logged in; after successful
 * login/signup the user is automatically redirected to checkout.
 */
export function BuyProductButton({ className, productId }: BuyProductButtonProps) {
  const { openAuthModal, setOnAuthComplete } = useAuthModal();
  const router = useRouter();

  const checkoutUrl = `/checkout?type=product&productId=${productId}`;

  async function handleClick() {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      openAuthModal({ label: "Product purchase" });
      return;
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.user) {
      router.push(checkoutUrl);
      return;
    }

    setOnAuthComplete(() => {
      router.push(checkoutUrl);
    });
    openAuthModal({ label: "Product purchase" });
  }

  return (
    <SiteButton className={className ?? "w-full"} onClick={handleClick}>
      Buy Product
    </SiteButton>
  );
}
