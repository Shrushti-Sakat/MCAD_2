"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

import { SiteButton } from "@/components/site/button";
import { useAuthModal } from "@/components/site/auth-modal-context";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type AuthMode = "login" | "signup";

export function AuthModal() {
  const { closeAuthModal, completePendingPurchase, isOpen, pendingLabel } = useAuthModal();
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setStatus(null);
      setPassword("");
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    setStatus(null);

    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      setStatus("Add your Supabase public URL and anon key to enable auth.");
      setIsSubmitting(false);
      return;
    }

    const response =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    if (response.error) {
      setStatus(response.error.message);
      setIsSubmitting(false);
      return;
    }

    if (response.data.session?.user) {
      completePendingPurchase();
      setIsSubmitting(false);
      return;
    }

    setStatus(
      mode === "login"
        ? "Login successful. Continue to checkout flow."
        : "Signup successful. Check your email if confirmation is enabled.",
    );
    setIsSubmitting(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-3 sm:px-4 py-4 sm:py-8 overflow-y-auto">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        onClick={closeAuthModal}
      />
      <div className="glass-panel relative z-10 w-full max-w-md rounded-[2rem] border border-white/80 p-5 sm:p-6 shadow-soft my-auto">
        <div className="mb-5 sm:mb-6 flex items-start justify-between gap-3 sm:gap-4">
          <div className="flex-1">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.24em] text-brand-dark">
              Continue to purchase
            </p>
            <h2 className="mt-2 text-xl sm:text-2xl font-semibold text-foreground leading-tight">
              Access your M CAD account
            </h2>
            <p className="mt-2 text-xs sm:text-sm leading-5 sm:leading-6 text-muted">
              Browsing stays open to everyone. Authentication begins only when you
              decide to buy a course or product.
            </p>
            {pendingLabel ? (
              <p className="mt-2 sm:mt-3 rounded-2xl bg-brand-soft px-3 py-2 text-xs sm:text-sm font-medium text-brand-dark">
                Purchase selected: {pendingLabel}
              </p>
            ) : null}
          </div>
          <button
            aria-label="Close auth modal"
            className="rounded-full border border-border p-2 text-muted transition hover:text-foreground flex-shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
            onClick={closeAuthModal}
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-4 sm:mb-5 grid grid-cols-2 gap-2 rounded-full bg-white p-1">
          <button
            className={`rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition touch-manipulation min-h-[44px] ${
              mode === "login" ? "bg-brand text-white" : "text-muted"
            }`}
            onClick={() => setMode("login")}
            type="button"
          >
            Login
          </button>
          <button
            className={`rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition touch-manipulation min-h-[44px] ${
              mode === "signup" ? "bg-brand text-white" : "text-muted"
            }`}
            onClick={() => setMode("signup")}
            type="button"
          >
            Signup
          </button>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <label className="block text-xs sm:text-sm font-medium text-foreground">
            Email
            <input
              className="mt-1.5 sm:mt-2 w-full rounded-2xl border border-border bg-white px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none transition focus:border-brand touch-manipulation min-h-[44px]"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="student@mcadsolutions.com"
              type="email"
              value={email}
              autoComplete="email"
            />
          </label>
          <label className="block text-xs sm:text-sm font-medium text-foreground">
            Password
            <input
              className="mt-1.5 sm:mt-2 w-full rounded-2xl border border-border bg-white px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none transition focus:border-brand touch-manipulation min-h-[44px]"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              type="password"
              value={password}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
            />
          </label>
          {status ? <p className="text-xs sm:text-sm text-muted bg-red-50 rounded-2xl px-3 py-2">{status}</p> : null}
          <SiteButton fullWidth onClick={handleSubmit} disabled={isSubmitting} className="min-h-[44px] text-sm sm:text-base">
            {isSubmitting ? "Please wait..." : mode === "login" ? "Login" : "Create account"}
          </SiteButton>
        </div>
      </div>
    </div>
  );
}
