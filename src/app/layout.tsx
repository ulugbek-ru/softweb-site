import type { Metadata, Viewport } from "next";
import { Inter, Outfit, Space_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#07080c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "SoftWeb",
    "Digital Agency",
    "Web Development",
    "UI/UX Design",
    "Next.js Developer",
    "Full-Stack Web Development",
    "Website Price Calculator",
    "E-Commerce Solutions",
    "Uzbekistan Web Studio",
    "High-Performance Websites",
  ],
  authors: [{ name: siteConfig.founder, url: siteConfig.telegramUrl }],
  creator: siteConfig.founder,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.founder,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} ${spaceMono.variable} font-sans bg-[#07080c] text-[#f3f4f6] antialiased selection:bg-brand-indigo/30 selection:text-white min-h-screen relative`}
      >
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "rgba(13, 15, 23, 0.95)",
              color: "#f3f4f6",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(12px)",
              fontFamily: "var(--font-inter)",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
