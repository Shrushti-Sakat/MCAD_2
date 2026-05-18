import { CheckCircle2, Download, Home } from "lucide-react";
import Link from "next/link";

import { PageHero } from "@/components/site/page-hero";
import { SiteButton } from "@/components/site/button";
import { mockProducts } from "@/lib/mock-products";

const purchased = mockProducts[0];

export default function OrderSuccessPage() {
  return (
    <>
      <PageHero
        eyebrow="Order confirmed"
        title="Your mock order is placed"
        description="We’ve recorded your checkout for M CAD Solutions. A confirmation email would normally be sent; for this mock flow, you can return to the catalog or download a placeholder receipt."
      />

      <section className="section-shell pb-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr]">
          <div className="rounded-[1.75rem] border border-white/80 bg-white/90 p-8 shadow-soft">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-brand-dark">Success</p>
                <p className="text-xl font-semibold text-foreground">Checkout captured</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-muted">
              This is a mock confirmation. In a live setup, we’d email the receipt and share tracking once the kit ships. Authentication remains required for any future purchases.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link href="/products">
                <SiteButton fullWidth variant="secondary" className="gap-2">
                  <Home className="h-4 w-4" />
                  Back to catalog
                </SiteButton>
              </Link>
              <SiteButton fullWidth className="gap-2">
                <Download className="h-4 w-4" />
                Download mock receipt
              </SiteButton>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/80 bg-white/90 p-6 shadow-soft">
            <p className="text-xs uppercase tracking-[0.22em] text-brand-dark">Order summary</p>
            <div className="mt-4 rounded-xl border border-border/70 p-4">
              <p className="text-sm font-semibold text-foreground">{purchased.title}</p>
              <p className="text-xs text-muted">{purchased.category}</p>
              <p className="mt-3 text-sm text-foreground">
                {purchased.description}
              </p>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="font-semibold text-foreground">{purchased.type}</span>
                <span className="font-semibold text-foreground">{purchased.price}</span>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-sm text-muted">
              <p>Mock order ID: ORD-MCAD-2048</p>
              <p>Payment status: Marked as paid (demo)</p>
              <p>Delivery: 5-7 working days (mock timeline)</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
