import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageLoader from "@/components/layout/PageLoader";
import LenisProvider from "@/components/layout/LenisProvider";
import "@/styles/globals.scss";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-urbanist",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://strongterra.com"),
  title: {
    default: "Earthstrong Canada | Rooted In Efficiency",
    template: "%s | Earthstrong Canada",
  },
  description:
    "Advanced agricultural crop nutrition and soil analysis solutions for Canadian farmers. Rooted In Efficiency.",
  openGraph: {
    title: "Earthstrong Canada | Rooted In Efficiency",
    description:
      "Advanced crop nutrition and soil analysis solutions for Western Canadian farmers.",
    url: "https://strongterra.com",
    siteName: "Earthstrong Canada",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "/images/hero/homepage-hero.webp",
        width: 1920,
        height: 1080,
        alt: "Earthstrong Canada — Crop nutrition solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Earthstrong Canada | Rooted In Efficiency",
    description:
      "Advanced crop nutrition and soil analysis solutions for Western Canadian farmers.",
    images: ["/images/hero/homepage-hero.webp"],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={urbanist.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Earthstrong Canada",
              url: "https://strongterra.com",
              logo: "https://strongterra.com/images/logo/earthstrong-logo.svg",
              description:
                "Advanced agricultural crop nutrition and soil analysis solutions for Canadian farmers.",
              parentOrganization: {
                "@type": "Organization",
                name: "Floratine Products Group",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-204-583-4427",
                email: "info@Strongterra.com",
                contactType: "customer service",
                areaServed: "CA",
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "CA",
              },
            }),
          }}
        />
        <LenisProvider>
          <PageLoader />
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
