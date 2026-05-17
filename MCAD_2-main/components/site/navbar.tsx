"use client";

import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { ChevronDown, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { navLinks } from "@/components/site/constants";
import { SiteLogo } from "@/components/site/logo";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    async function loadUser() {
      const result = await supabase.auth.getUser();
      setUser(result.data.user ?? null);
    }
    void loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const email = user?.email ?? null;
  const userInitial = email?.charAt(0).toUpperCase() ?? "U";

  async function handleLogout() {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    await supabase.auth.signOut();
    localStorage.removeItem('admin_session');
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    router.push('/');
  }

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle body scroll locking
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* ─── STICKY HEADER ─── */}
      <header className="sticky top-0 z-[100] w-full border-b border-gray-100 bg-white/95 backdrop-blur-sm px-4 py-3 sm:py-4">
        <div className="mx-auto flex max-w-[1800px] items-center justify-between gap-4">
          <SiteLogo />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-4 rounded-full bg-gray-50/80 px-4 py-1 border border-gray-100">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  className={cn(
                    "rounded-full px-5 py-2 text-sm font-medium transition-all",
                    isActive ? "bg-brand text-white shadow-sm" : "text-gray-600 hover:text-brand hover:bg-white"
                  )}
                  href={link.href}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Desktop Auth */}
            <div className="hidden md:block">
              {email ? (
                <div className="relative">
                  <button
                    className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 hover:border-brand/30 transition-colors"
                    onClick={() => setDropdownOpen((o) => !o)}
                    type="button"
                  >
                    <div className="h-8 w-8 rounded-full bg-brand flex items-center justify-center text-white text-xs font-bold">
                      {userInitial}
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white border border-gray-100 shadow-xl p-1 z-50">
                      <Link
                        href="/dashboard"
                        className="flex w-full items-center gap-2 rounded-xl px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        className="flex w-full items-center gap-2 rounded-xl px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={handleLogout}
                        type="button"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Link
                    href="/auth/login"
                    className="text-sm font-bold text-gray-700 hover:text-brand transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/courses"
                    className="rounded-full bg-brand px-6 py-2.5 text-sm font-bold text-white hover:bg-brand-dark transition-colors"
                  >
                    Explore Tracks
                  </Link>
                </div>
              )}
            </div>

            {/* HAMBURGER - Compact and accessible */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              type="button"
              className="md:hidden flex shrink-0 h-[44px] w-[44px] items-center justify-center rounded-full bg-gray-50 text-brand-dark border border-gray-200 active:scale-90 transition-transform"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={22} strokeWidth={2.5} /> : <Menu size={22} strokeWidth={2.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* COMPACT FLOATING MENU */}
      <div
        className={cn(
          "fixed inset-0 z-[90] md:hidden transition-all duration-300",
          mobileMenuOpen ? "bg-black/20 pointer-events-auto backdrop-blur-[2px]" : "bg-transparent pointer-events-none backdrop-blur-0"
        )}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={cn(
            "absolute top-[72px] left-4 right-4 bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl p-6 transition-all duration-300 ease-out origin-top",
            mobileMenuOpen ? "translate-y-0 opacity-100 scale-100" : "-translate-y-4 opacity-0 scale-95"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-2xl px-5 py-4 text-base font-bold transition-colors",
                    isActive ? "bg-brand text-white shadow-lg shadow-brand/10" : "text-gray-600 hover:bg-gray-50"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 pt-6 border-t border-gray-50">
            {email ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 px-2">
                  <div className="h-10 w-10 rounded-full bg-brand flex items-center justify-center text-white text-sm font-bold">
                    {userInitial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Signed In</p>
                    <p className="text-sm font-bold text-gray-800 truncate">{email}</p>
                  </div>
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gray-50 py-4 text-sm font-bold text-gray-700 transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-red-50 py-4 text-sm font-bold text-red-600 transition-colors"
                  type="button"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  href="/auth/login"
                  className="w-full flex items-center justify-center rounded-2xl border-2 border-gray-100 bg-white py-4 text-base font-bold text-gray-700 hover:border-gray-200 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/courses"
                  className="w-full flex items-center justify-center rounded-2xl bg-brand py-4 text-base font-bold text-white shadow-lg shadow-brand/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Explore Tracks
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
