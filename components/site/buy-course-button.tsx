"use client";

import { useRouter } from "next/navigation";

import { SiteButton } from "@/components/site/button";

type BuyCourseButtonProps = {
  className?: string;
  courseId: string;
};

/**
 * Navigates directly to checkout — no auth required.
 */
export function BuyCourseButton({ className, courseId }: BuyCourseButtonProps) {
  const router = useRouter();

  const checkoutUrl = `/checkout?type=course&courseId=${courseId}`;

  function handleClick() {
    router.push(checkoutUrl);
  }

  return (
    <SiteButton className={className ?? "w-full"} onClick={handleClick}>
      Buy Course
    </SiteButton>
  );
}
