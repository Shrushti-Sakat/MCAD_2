"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

import { PlaceOrderButton } from "@/components/site/place-order-button";
import { useAuthModal } from "@/components/site/auth-modal-context";
import { createOrder } from "@/lib/supabase/orders";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { mockCourses } from "@/lib/mock-courses";
import { mockProducts } from "@/lib/mock-products";

function parsePriceToNumber(priceText: string) {
  const digits = priceText.replace(/[^\d]/g, "");
  return Number(digits || 0);
}

export function PlaceOrderClient() {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { openAuthModal, setOnAuthComplete } = useAuthModal();

  const typeParam = searchParams.get("type");
  const courseIdParam = searchParams.get("courseId");
  const productIdParam = searchParams.get("productId");

  const isCourse = typeParam === "course" || !!courseIdParam;
  const selectedCourse =
    isCourse && courseIdParam
      ? mockCourses.find((c) => c.id === courseIdParam) ?? mockCourses[0]
      : isCourse
        ? mockCourses[0]
        : null;

  const selectedProduct =
    !isCourse && productIdParam
      ? mockProducts.find((p) => p.id === productIdParam) ?? mockProducts[0]
      : !isCourse
        ? mockProducts[0]
        : null;

  const item = selectedCourse ?? selectedProduct ?? mockProducts[0];
  const itemType = selectedCourse ? "course" : "product";
  const itemPrice = parsePriceToNumber(item.price);

  const placeOrder = () => {
    setError(null);
    startTransition(async () => {
      try {
        await createOrder({
          itemId: item.id,
          itemTitle: item.title,
          itemPrice: itemPrice,
          itemType: itemType,
          quantity: 1,
          currency: "INR",
        });
        router.push("/checkout/success");
      } catch (err: any) {
        const message = err?.message ?? "Unable to place order. Please try again.";
        setError(message);
        console.error("Order placement failed:", err);
      }
    });
  };

  const handlePlaceOrder = async () => {
    setError(null);

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      // No client at all — open auth modal
      setOnAuthComplete(placeOrder);
      openAuthModal({ label: item.title });
      return;
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.user) {
      // User is authenticated — proceed
      placeOrder();
      return;
    }

    // Not authenticated — open auth modal, then place order after login
    setOnAuthComplete(placeOrder);
    openAuthModal({ label: item.title });
  };

  return (
    <div className="space-y-2">
      <PlaceOrderButton
        label={pending ? "Placing order..." : "Place order (auth required)"}
        onClick={handlePlaceOrder}
      />
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
