import { Mail, Phone, User, MessageSquare, Info } from "lucide-react";
import { EnquiryForm } from "@/components/site/enquiry-form";

export const metadata = {
  title: "Enquiry | MCAD Solutions",
  description: "Get in touch regarding our products and courses.",
};

export default async function EnquiryPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; name?: string; variant?: string }>;
}) {
  const resolvedParams = await searchParams;
  const { type, name, variant } = resolvedParams;

  let regardingText = "";
  let enquiryType = "enquiry";
  let itemName = ""; // The raw course/product name for email
  
  if (type) {
    enquiryType = `${type}-enquiry`; // "course-enquiry" or "product-enquiry"
    const typeLabel = type.charAt(0).toUpperCase() + type.slice(1);
    
    if (name) {
      itemName = name; // Just the clean name, e.g. "Digital Twin Foundation..."
      regardingText = `${typeLabel}: ${name}`;
      if (variant && variant !== "Default") {
        regardingText += ` (${variant})`;
        itemName += ` (${variant})`;
      }
    } else {
      regardingText = `${typeLabel} Enquiry`;
    }
  }

  return (
    <main className="section-shell py-12 sm:py-20 flex justify-center min-h-[80vh]">
      <div className="w-full max-w-2xl rounded-[2rem] border border-border/50 bg-white/90 p-6 sm:p-10 shadow-soft relative overflow-hidden">
        {/* Background Accent */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-soft/50 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-emerald-50 blur-3xl" />

        <div className="relative z-10">
          <div className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Get in Touch
            </h1>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted">
              Fill out the form below and our team will get back to you shortly.
            </p>
          </div>

          {/* ENQUIRY FIX: Functional Enquiry Form UI */}
          <EnquiryForm regardingText={regardingText} enquiryType={enquiryType} itemName={itemName} />
        </div>
      </div>
    </main>
  );
}
