"use client";

import { Mail, Phone, User, MessageSquare, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function EnquiryForm({ regardingText }: { regardingText: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const fullName = formData.get("name") as string;
      const email = formData.get("email") as string;
      const phone = formData.get("phone") as string;
      const message = formData.get("message") as string;

      // Send email notification to admin
      await fetch("/api/send-enrollment-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          organization: "",
          message,
          trackName: regardingText || "Product Enquiry",
          type: "enquiry",
        }),
      });

      // Redirect to success page
      router.push("/enquiry/success");
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      // Still redirect even if email fails
      router.push("/enquiry/success");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {regardingText && (
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted flex items-center gap-2">
            <Info className="h-3 w-3" />
            Regarding
          </label>
          <input
            type="text"
            readOnly
            value={regardingText}
            className="w-full rounded-xl border border-brand/20 bg-brand-soft/30 px-4 py-3 sm:py-4 text-sm font-medium text-brand-dark focus:outline-none cursor-not-allowed"
          />
        </div>
      )}

      <div className="space-y-1.5">
        <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted">
          Full Name
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted">
            <User className="h-4 w-4" />
          </div>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            className="w-full rounded-xl border border-border bg-white pl-11 pr-4 py-3 sm:py-4 text-sm text-foreground placeholder:text-muted/50 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            required
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted">
          Email Address
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted">
            <Mail className="h-4 w-4" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            className="w-full rounded-xl border border-border bg-white pl-11 pr-4 py-3 sm:py-4 text-sm text-foreground placeholder:text-muted/50 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            required
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-muted">
          Phone (Optional)
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted">
            <Phone className="h-4 w-4" />
          </div>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+91 98765 43210"
            className="w-full rounded-xl border border-border bg-white pl-11 pr-4 py-3 sm:py-4 text-sm text-foreground placeholder:text-muted/50 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-muted">
          Message
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute top-4 left-0 flex items-start pl-4 text-muted">
            <MessageSquare className="h-4 w-4" />
          </div>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="How can we help you?"
            className="w-full rounded-xl border border-border bg-white pl-11 pr-4 py-3 sm:py-4 text-sm text-foreground placeholder:text-muted/50 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand resize-none"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-6 flex min-h-[44px] sm:min-h-[52px] w-full items-center justify-center rounded-full bg-brand-dark px-5 py-3 sm:py-4 text-sm font-bold text-white transition-opacity hover:opacity-90 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? "Submitting..." : "Submit Enquiry"}
      </button>
    </form>
  );
}
