import { ArrowLeft, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";

import { PageHero } from "@/components/site/page-hero";
import { PlaceOrderClient } from "@/components/site/place-order-client";
import { SiteButton } from "@/components/site/button";
import { getProducts } from "@/lib/products";
import { getCourses } from "@/lib/courses";

export const dynamic = "force-dynamic";

type CheckoutPageProps = {
  searchParams: {
    productId?: string;
    courseId?: string;
    type?: string;
  };
};

function parsePriceToNumber(priceText: string) {
  const digits = priceText.replace(/[^\d]/g, "");
  return Number(digits || 0);
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const typeParam = Array.isArray(searchParams.type) ? searchParams.type[0] : searchParams.type;
  const courseIdParam = Array.isArray(searchParams.courseId)
    ? searchParams.courseId[0]
    : searchParams.courseId;
  const productIdParam = Array.isArray(searchParams.productId)
    ? searchParams.productId[0]
    : searchParams.productId;

  const isCourse = typeParam === "course" || !!courseIdParam;
  const isProduct = typeParam === "product" || (!!productIdParam && !isCourse);

  const [{ courses }, { products }] = await Promise.all([getCourses(), getProducts()]);

  const selectedCourse =
    isCourse && courseIdParam
      ? courses.find((c) => c.id === courseIdParam) ?? courses[0]
      : isCourse
        ? courses[0]
        : null;

  const selectedProduct =
    isProduct && productIdParam
      ? products.find((p) => p.id === productIdParam) ?? products[0]
      : !isCourse
        ? products[0]
        : null;

  const item = selectedCourse ?? selectedProduct ?? products[0];
  const itemType = selectedCourse ? "course" : "product";
  const backHref = itemType === "course" ? "/courses" : "/products";
  const backLabel = itemType === "course" ? "Back to courses" : "Back to products";

  const subtotal = parsePriceToNumber(item.price);
  const shipping = itemType === "course" ? 0 : 1500;
  const tax = Math.round(subtotal * 0.12);
  const total = subtotal + shipping + tax;

  return (
    <>
      <PageHero
        eyebrow="Checkout"
        title={itemType === "course" ? "Complete your course enrollment" : "Complete your robotics order"}
        description={
          itemType === "course"
            ? "Review the course details and place a mock enrollment. Authentication stays required at the final step."
            : "Review your robotics kit, add delivery details, and place a mock order. Authentication stays required at the final step."
        }
      />

      <section className="section-shell pb-16">
        <div className="mb-6">
          <Link
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-dark hover:underline"
            href={backHref}
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Left column: forms */}
          <div className="space-y-6">
            <FormCard title="Contact" subtitle="Where we’ll send order updates">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="First name" placeholder="Priyanka" />
                <Field label="Last name" placeholder="Gadre" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email" placeholder="priyanka@example.com" />
                <Field label="Phone" placeholder="+91 98765 43210" />
              </div>
            </FormCard>

            <FormCard title="Shipping" subtitle="Mock delivery details for records">
              <Field label="Address line" placeholder="221B Robotics Street" />
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="City" placeholder="Pune" />
                <Field label="State" placeholder="MH" />
                <Field label="PIN" placeholder="411001" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Country" placeholder="India" />
                <Field label="Notes" placeholder="Gate instructions or lab timing" />
              </div>
            </FormCard>

            <FormCard title="Payment" subtitle="Mock checkout — no live charges">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Cardholder name" placeholder="Priyanka Gadre" />
                <Field label="Card number" placeholder="4242 4242 4242 4242" />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Expiry" placeholder="08/27" />
                <Field label="CVC" placeholder="123" />
                <Field label="ZIP" placeholder="411001" />
              </div>
              <p className="mt-2 text-xs text-muted">
                This flow is mock-only. No payments are processed.
              </p>
            </FormCard>
          </div>

          {/* Right column: order summary */}
          <div className="space-y-6">
            <div className="rounded-[1.5rem] border border-white/80 bg-white/90 p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Order summary</h2>
                <span className="text-xs uppercase tracking-[0.2em] text-brand-dark">Mock</span>
              </div>

              <div className="mt-4 space-y-4">
                <div className="flex items-start gap-3 rounded-xl border border-border/60 p-3">
                  <div className="rounded-xl bg-brand-soft/60 px-3 py-2 text-xs font-semibold text-brand-dark">
                    {item.category}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="text-xs text-muted">
                      {itemType === "course" ? selectedCourse?.format : selectedProduct?.type}
                    </p>
                  </div>
                  <div className="text-right text-sm font-semibold text-foreground">{item.price}</div>
                </div>
              </div>

              <div className="mt-6 space-y-2 text-sm text-foreground">
                <Row label="Subtotal" value={`₹${subtotal.toLocaleString("en-IN")}`} />
                <Row label="Shipping" value={shipping === 0 ? "Included" : `₹${shipping.toLocaleString("en-IN")}`} />
                <Row label="GST (12%)" value={`₹${tax.toLocaleString("en-IN")}`} />
                <div className="flex items-center justify-between border-t border-border/70 pt-3 text-base font-semibold">
                  <span>Total</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="mt-6">
                <PlaceOrderClient />
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs text-muted">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                Checkout stays behind login; browsing remains public.
              </div>
            </div>

            {itemType === "product" ? (
              <div className="rounded-[1.25rem] border border-brand/30 bg-brand-soft/40 p-4 text-sm text-foreground">
                <div className="flex items-center gap-2 text-brand-dark">
                  <Truck className="h-4 w-4" />
                  Delivery timeline (mock)
                </div>
                <p className="mt-2 text-muted">
                  Kits typically dispatch within 5-7 working days after confirmation. Demo-ready configs ship with Digital Twin sample assets.
                </p>
                <div className="mt-3">
                  <SiteButton variant="secondary" fullWidth asChild>
                    <Link href="/enquiry">
                      Need a purchase order draft?
                    </Link>
                  </SiteButton>
                </div>
              </div>
            ) : (
              <div className="rounded-[1.25rem] border border-brand/30 bg-brand-soft/40 p-4 text-sm text-foreground">
                <p className="text-brand-dark font-semibold">Course access notes</p>
                <p className="mt-2 text-muted">
                  Enrollments unlock course content and cohort updates. This is a mock flow—no payment is processed.
                </p>
                <div className="mt-3">
                  <SiteButton variant="secondary" fullWidth asChild>
                    <Link href="/enquiry">
                      Need an invoice copy?
                    </Link>
                  </SiteButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function FormCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[1.5rem] border border-white/80 bg-white/90 p-4 sm:p-6 shadow-soft">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-brand-dark">{title}</p>
          <p className="text-xs sm:text-sm text-muted">{subtitle}</p>
        </div>
      </div>
      <div className="mt-3 sm:mt-5 space-y-3 sm:space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="block space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-foreground">
      <span className="font-semibold">{label}</span>
      <input
        className="w-full rounded-xl border border-border/70 bg-white px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30 touch-manipulation min-h-[44px]"
        placeholder={placeholder}
      />
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-muted">{label}</span>
      <span className="font-medium text-foreground text-right">{value}</span>
    </div>
  );
}
