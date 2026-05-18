import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Enquiry Sent | MCAD Solutions",
  description: "Your enquiry has been received.",
};

export default function EnquirySuccessPage() {
  return (
    <main className="section-shell py-16 sm:py-24 flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md rounded-[2rem] border border-border/50 bg-white p-8 text-center shadow-soft">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-6">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        
        <h1 className="text-2xl font-bold text-foreground mb-3">Enquiry Sent Successfully</h1>
        <p className="text-muted mb-8 text-sm leading-relaxed">
          Thank you for reaching out to us. Our team will review your message and get back to you within 24-48 hours.
        </p>

        <div className="space-y-3">
          <Link
            href="/courses"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            Explore Courses
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-border/70 bg-gray-50 px-5 py-3.5 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-100"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
