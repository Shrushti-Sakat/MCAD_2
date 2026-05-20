"use client";

import { CheckCircle2, Loader2, Mail, Phone, Send, User, X, Building2 } from "lucide-react";
import { useState } from "react";

type EnrollmentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  trackName: string;
  trackId: string;
};

export function EnrollmentModal({ isOpen, onClose, trackName, trackId }: EnrollmentModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const fullName = formData.get("fullName") as string;
      const email = formData.get("email") as string;
      const phone = formData.get("phone") as string;
      const organization = formData.get("organization") as string;
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
          organization,
          message,
          trackName,
          type: "enrollment",
        }),
      });

      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (error) {
      console.error("Error submitting enrollment:", error);
      // Still show success even if email fails
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  }

  function handleClose() {
    setIsSuccess(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm sm:p-6 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md overflow-hidden rounded-[2rem] bg-white shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center p-8 sm:p-10 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">Enrollment Request Sent!</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              Thank you for choosing <strong>{trackName}</strong>. Our team will contact you shortly with the next steps.
            </p>
            <button
              onClick={handleClose}
              className="mt-8 w-full rounded-full bg-brand-dark px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div className="flex flex-col h-full max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5 sm:px-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark">Enrollment</p>
                <h3 className="mt-1 text-lg font-bold text-foreground">Track {trackId}</h3>
              </div>
              <button
                onClick={handleClose}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 hover:text-gray-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-6 sm:px-8">
              <p className="text-sm text-muted mb-6">
                Please provide your details below to enroll in <strong>{trackName}</strong>.
              </p>

              <form id="enroll-form" onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase text-gray-500">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      name="fullName"
                      required
                      type="text"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-brand/50 focus:bg-white focus:ring-4 focus:ring-brand-soft"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase text-gray-500">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        name="email"
                        required
                        type="email"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-brand/50 focus:bg-white focus:ring-4 focus:ring-brand-soft"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase text-gray-500">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        name="phone"
                        required
                        type="tel"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-brand/50 focus:bg-white focus:ring-4 focus:ring-brand-soft"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase text-gray-500">College / Organization</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      name="organization"
                      required
                      type="text"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-brand/50 focus:bg-white focus:ring-4 focus:ring-brand-soft"
                      placeholder="Your College Name"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase text-gray-500">Additional Message (Optional)</label>
                  <textarea
                    name="message"
                    rows={3}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm outline-none transition focus:border-brand/50 focus:bg-white focus:ring-4 focus:ring-brand-soft resize-none"
                    placeholder="Any specific requirements or questions?"
                  />
                </div>
              </form>
            </div>

            <div className="border-t border-gray-100 bg-gray-50 px-6 py-5 sm:px-8 flex justify-end">
              <button
                type="submit"
                form="enroll-form"
                disabled={isSubmitting}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-brand-dark px-8 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Details
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
