import type { Metadata, Viewport } from "next";

import { AuthModal } from "@/components/site/auth-modal";
import { AuthModalProvider } from "@/components/site/auth-modal-context";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";

import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "M CAD Solutions",
  description:
    "M CAD Solutions is a Digital Twin-first robotics academy with physical robot labs and hands-on learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans text-foreground antialiased">
        <AuthModalProvider>
          <div className="relative min-h-screen">
            <Navbar />
            <main>{children}</main>
            <Footer />
            <AuthModal />
          </div>
        </AuthModalProvider>
      </body>
    </html>
  );
}
