"use client";

import { useRouter } from "next/navigation";

import { SiteButton } from "@/components/site/button";
import { useAuthModal } from "@/components/site/auth-modal-context";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type BuyCourseButtonProps = {
  className?: string;
  courseId: string;
};

/**
 * Checks auth before navigating to checkout.
 * Opens Auth Modal if the user is not logged in; after successful
 * login/signup the user is automatically redirected to checkout.
 */
export function BuyCourseButton({ className, courseId }: BuyCourseButtonProps) {
  const { openAuthModal, setOnAuthComplete } = useAuthModal();
  const router = useRouter();

  const checkoutUrl = `/checkout?type=course&courseId=${courseId}`;

  async function handleClick() {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      openAuthModal({ label: "Course enrollment" });
      return;
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.user) {
      // Already authenticated → go straight to checkout
      router.push(checkoutUrl);
      return;
    }

    // Not authenticated → open modal and queue navigation
    setOnAuthComplete(() => {
      router.push(checkoutUrl);
    });
    openAuthModal({ label: "Course enrollment" });
  }

  return (
    <SiteButton className={className ?? "w-full"} onClick={handleClick}>
      Buy Course
    </SiteButton>
  );
}
