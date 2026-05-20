import Link from "next/link";

import { navLinks } from "@/components/site/constants";
import { SiteLogo } from "@/components/site/logo";

export function Footer() {
  const socialLinks = [
    { label: "LinkedIn", url: "https://www.linkedin.com/company/mcadsolutions?originalSubdomain=in", icon: "in" },
    { label: "Instagram", url: "https://www.instagram.com/mcadsolution/", icon: "ig" },
    { label: "YouTube", url: "https://www.youtube.com/@mcadsolutionenglish", icon: "yt" },
    { label: "Facebook", url: "https://www.facebook.com/mcadsolutions/", icon: "fb" },
  ];

  return (
    <footer className="mt-12 sm:mt-16 md:mt-24 border-t border-white/70 bg-[rgba(255,248,238,0.82)]">
      <div className="section-shell py-8 sm:py-10 md:py-12">
        <div className="grid gap-8 sm:gap-10 md:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand Section */}
          <div className="space-y-3 sm:space-y-4">

            <p className="max-w-xl text-xs sm:text-sm leading-6 sm:leading-7 text-muted">
              Building Indigenous Robotics Solutions for a Self-Reliant India. Supporting Make in India, Skill India, and Atmanirbhar Bharat initiatives.
            </p>
            <p className="text-xs text-muted/70">© 2026 M CAD Solutions. All rights reserved.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.24em] text-brand-dark">
              Quick Links
            </h3>
            <div className="mt-3 sm:mt-4 flex flex-col gap-2 sm:gap-3 text-xs sm:text-sm text-muted">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-brand transition-colors py-1 touch-manipulation"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.24em] text-brand-dark">
              Contact
            </h3>
            <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3 text-xs sm:text-sm text-muted">
              <p className="py-1">
                <a
                  href="https://maps.app.goo.gl/vNQKkxYNgpedor256"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-brand transition-colors touch-manipulation"
                >
                  📍1st floor, FMCIII BUILDING, Marathwada Mitra Mandal College of Engineering Rd, above Kuka robotics lab, Hingane Home Colony, Karvenagar, Pune, Maharashtra 411052
                </a>
              </p>
              <p className="py-1">
                <a
                  href="tel:+919096708490"
                  className="hover:text-brand transition-colors touch-manipulation block sm:inline"
                >
                  📞 +91 90967 08490
                </a>
              </p>
              <p className="py-1">
                <a
                  href="mailto:manoj@mcadsolutions.in"
                  className="hover:text-brand transition-colors touch-manipulation break-all"
                >
                  📧 manoj@mcadsolutions.in
                </a>
              </p>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.24em] text-brand-dark">
              Connect
            </h3>
            <div className="mt-3 sm:mt-4 flex flex-col gap-2 sm:gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs sm:text-sm text-muted hover:text-brand transition-colors py-1 touch-manipulation"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
