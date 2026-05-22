import type { Metadata, Viewport } from "next";

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
  keywords: [
    "M CAD Solutions",
    "Digital Twin",
    "Robotics Academy",
    "Robot Labs",
    "Hands-on Learning",
    "ROS2",
    "STEM Education",
  ],
  metadataBase: new URL("https://mcadsolution.in"),
  openGraph: {
    title: "M CAD Solutions",
    description:
      "M CAD Solutions is a Digital Twin-first robotics academy with physical robot labs and hands-on learning.",
    url: "https://mcadsolution.in",
    siteName: "M CAD Solutions",
    images: [
      {
        url: "/webs_logo.png",
        width: 512,
        height: 512,
        alt: "M CAD Solutions Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "M CAD Solutions",
    description:
      "M CAD Solutions is a Digital Twin-first robotics academy with physical robot labs and hands-on learning.",
    images: ["/webs_logo.png"],
  },
  icons: {
    icon: "/webs_logo.png",
    apple: "/webs_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans text-foreground antialiased">
        <div className="relative min-h-screen">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

