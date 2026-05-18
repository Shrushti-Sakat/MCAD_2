import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export async function createOrder({
  itemId,
  itemTitle,
  itemPrice,          // number (e.g., 14999)
  itemType,           // "product" | "course"
  quantity = 1,
  currency = "INR",
}: {
  itemId: string;
  itemTitle: string;
  itemPrice: number;
  itemType: "product" | "course";
  quantity?: number;
  currency?: string;
}) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) throw new Error("Supabase not configured");

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user) throw new Error("Auth required");

  const payload = {
    user_id: session.user.id,
    type: itemType,
    item_type: itemType,
    item_id: itemId,
    item_title: itemTitle,
    item_price: itemPrice,
    amount: itemPrice * quantity,
    total_amount: itemPrice * quantity,
    currency,
    status: "paid", // change to 'pending' if you add payments later
  };

  const result = await supabase
    .from("orders")
    .insert([payload])
    .select()
    .single();

  const order = result?.data;
  const orderErr = result?.error;

  if (orderErr || !order) {
    console.error("Order insert failed", orderErr);
    throw orderErr ?? new Error("Order insert failed");
  }

  const orderId = (order as any).id;

  const itemPayload = {
    order_id: orderId,
    item_id: itemId,
    item_title: itemTitle,
    item_price: itemPrice,
    item_type: itemType,
    quantity,
  };

  const itemResult = await supabase
    .from("order_items")
    .insert([itemPayload]);

  const itemErr = itemResult?.error;

  if (itemErr) {
    console.error("Order item insert failed", itemErr);
    throw itemErr;
  }

  return orderId;
}
