"use client";

import { useEffect, useState } from "react";
import { ShieldAlert, Loader2 } from "lucide-react";

import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { AdminLayout } from "@/components/admin/admin-layout";
import { useAuthModal } from "@/components/site/auth-modal-context";

type GuardProps = {
  children: React.ReactNode;
  title: string;
  description?: string;
  allowedEmails?: string[];
};

/**
 * Lightweight client-side guard: checks Supabase session and a simple admin rule.
 * Rule: user metadata.role === "admin" OR email in allowedEmails (optional).
 * For production, pair with RLS/policies on server.
 */
export function AdminGuard({ children, title, description, allowedEmails = [] }: GuardProps) {
  const [status, setStatus] = useState<"loading" | "allowed" | "denied" | "unauthenticated">(
    "loading",
  );
  const { openAuthModal } = useAuthModal();

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setStatus("denied");
      return;
    }

    async function checkAccess() {
      const result = await supabase.auth.getUser();
      const user = result.data.user;
      if (!user) {
        setStatus("unauthenticated");
        return;
      }

      const metadataRole = (user.user_metadata as { role?: string } | null)?.role;
      const email = user.email?.toLowerCase() ?? "";
      const emailAllowed = allowedEmails.map((v) => v.toLowerCase()).includes(email);

      try {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .maybeSingle();
        const profileRole = (profile as { role?: string } | null)?.role;
        if (!error && (profileRole === "admin" || metadataRole === "admin" || emailAllowed)) {
          setStatus("allowed");
          return;
        }
      } catch {
        // Fall through to metadata/email fallback.
      }

      if (metadataRole === "admin" || emailAllowed) {
        setStatus("allowed");
        return;
      }
      setStatus("denied");
    }

    void checkAccess();

    // Re-check whenever auth state changes (e.g. user signs in via the modal)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      setStatus("loading");
      void checkAccess();
    });

    return () => subscription.unsubscribe();
  }, [allowedEmails]);

  if (status === "loading") {
    return (
      <AdminLayout title="Checking access">
        <div className="flex items-center gap-2 rounded-xl border border-border/70 bg-white/80 px-4 py-3 text-sm text-muted">
          <Loader2 className="h-4 w-4 animate-spin" /> Verifying admin access...
        </div>
      </AdminLayout>
    );
  }

  if (status === "unauthenticated") {
    return (
      <AdminLayout title="Sign in required">
        <div className="flex flex-col gap-4 rounded-xl border border-amber-200 bg-amber-50 px-5 py-5">
          <div className="flex items-center gap-3 text-sm text-amber-800">
            <ShieldAlert className="h-5 w-5 shrink-0" />
            Please sign in with your admin account to access this page.
          </div>
          <button
            type="button"
            onClick={() => openAuthModal()}
            className="w-fit rounded-lg bg-gray-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
          >
            Sign in
          </button>
        </div>
      </AdminLayout>
    );
  }

  if (status === "denied") {
    return (
      <AdminLayout title="Access denied">
        <div className="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-4 text-sm text-red-700">
          <ShieldAlert className="h-5 w-5" />
          Admin access only. Ask an administrator to grant you access.
        </div>
      </AdminLayout>
    );
  }

  return <AdminLayout title={title} description={description}>{children}</AdminLayout>;
}
