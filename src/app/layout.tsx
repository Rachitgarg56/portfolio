import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { profile } from "@/data/profile";
import { site } from "@/lib/site";
import { brand } from "@/lib/brand";
import { Container } from "@/components/layout/container";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import "@/styles/globals.css";

const geist = localFont({
  src: "../styles/fonts/geist-latin-variable.woff2",
  variable: "--font-geist",
  display: "swap",
  weight: "100 900",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

export const metadata: Metadata = {
  title: { default: site.title, template: `%s | ${profile.name}` },
  description: site.description,
  applicationName: `${profile.name} — Portfolio`,
  authors: [{ name: profile.name }],
  ...(site.url ? { metadataBase: site.url } : {}),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: `${profile.name} — Portfolio`,
    title: site.title,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
};

export const viewport: Viewport = { themeColor: brand.canvas };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geist.variable}>
      <body id="top">
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Container>
          <SiteHeader />
          <main id="main-content" tabIndex={-1}>{children}</main>
          <SiteFooter />
        </Container>
      </body>
    </html>
  );
}
