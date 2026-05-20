"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { navLinks } from "@/components/site/constants";
import { SiteLogo } from "@/components/site/logo";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const toggleMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

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
                    isActive
                      ? "bg-brand text-white shadow-sm"
                      : "text-gray-600 hover:text-brand hover:bg-white"
                  )}
                  href={link.href}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Section — Desktop CTA + Hamburger on Mobile */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Desktop CTA */}
            <Link
              href="/courses"
              className="hidden md:inline-flex rounded-full bg-brand px-6 py-2.5 text-sm font-bold text-white hover:bg-brand-dark transition-colors"
            >
              Explore Tracks
            </Link>

            {/* HAMBURGER - Mobile only (Natively inside normal flexbox flow for 100% device compatibility) */}
            <button
              onClick={toggleMenu}
              type="button"
              className="md:hidden flex shrink-0 h-[48px] w-[48px] items-center justify-center rounded-full bg-gray-50 text-brand-dark border border-gray-200 active:scale-95 transition-transform"
              style={{ touchAction: "manipulation" }}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X size={24} strokeWidth={2.5} />
              ) : (
                <Menu size={24} strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        <div
          className={cn(
            "absolute top-full left-4 right-4 mt-2 bg-white rounded-[2rem] border border-gray-100 shadow-2xl p-6 transition-all duration-300 ease-out origin-top md:hidden z-[105]",
            mobileMenuOpen
              ? "translate-y-0 opacity-100 scale-100 pointer-events-auto"
              : "-translate-y-4 opacity-0 scale-95 pointer-events-none"
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
                    isActive
                      ? "bg-brand text-white shadow-lg shadow-brand/10"
                      : "text-gray-600 hover:bg-gray-50"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 pt-6 border-t border-gray-50">
            <Link
              href="/courses"
              className="w-full flex items-center justify-center rounded-2xl bg-brand py-4 text-base font-bold text-white shadow-lg shadow-brand/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore Tracks
            </Link>
          </div>
        </div>
      </header>

      {/* MOBILE BACKDROP OVERLAY */}
      <div
        className={cn(
          "fixed inset-0 z-[90] md:hidden transition-all duration-300",
          mobileMenuOpen
            ? "bg-black/20 pointer-events-auto backdrop-blur-[2px]"
            : "bg-transparent pointer-events-none backdrop-blur-0"
        )}
        onClick={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
