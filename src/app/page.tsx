import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroSlider from "@/components/home/HeroSlider";
import ManifestoSection from "@/components/home/ManifestoSection";

export const metadata: Metadata = {
  title: "Earthstrong Canada | Rooted In Efficiency",
  description:
    "Bringing Canadian agricultural producers the next level of nutrition management. Advanced crop nutrition, soil analysis, and nutrient protection solutions.",
};

const FeaturedProduct = dynamic(() => import("@/components/home/FeaturedProduct"));
const ProductGrid = dynamic(() => import("@/components/home/ProductGrid"));
const SmallProductCards = dynamic(() => import("@/components/home/SmallProductCards"));
const PartnerMarquee = dynamic(() => import("@/components/home/PartnerMarquee"));

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <ManifestoSection />
      <FeaturedProduct />
      <ProductGrid />
      <SmallProductCards />
      <PartnerMarquee />
    </>
  );
}
