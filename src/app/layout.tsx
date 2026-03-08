import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageLoader from "@/components/layout/PageLoader";
import LenisProvider from "@/components/layout/LenisProvider";
import "@/styles/globals.scss";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-urbanist",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Earthstrong Canada | Rooted In Efficiency",
    template: "%s | Earthstrong Canada",
  },
  description:
    "Advanced agricultural crop nutrition and soil analysis solutions for Canadian farmers. Rooted In Efficiency.",
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
        <LenisProvider>
          <PageLoader />
          <Header />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
