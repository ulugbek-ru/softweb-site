import type { Metadata, Viewport } from "next";
import { Ubuntu, Rubik_Spray_Paint, Space_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-ubuntu",
  display: "swap",
});

const rubikSpray = Rubik_Spray_Paint({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-rubik-spray",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#090a0f" },
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
  ],
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
    locale: "uz_UZ",
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
    <html lang="uz" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('softweb-theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (stored === 'dark' || (!stored && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else if (stored === 'light') {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${ubuntu.variable} ${rubikSpray.variable} ${spaceMono.variable} font-sans antialiased min-h-screen relative`}
      >
        <ThemeProvider>
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: "font-sans text-sm rounded-xl border",
            }}
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
