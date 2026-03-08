import HeroSlider from "@/components/home/HeroSlider";
import ManifestoSection from "@/components/home/ManifestoSection";
import FeaturedProduct from "@/components/home/FeaturedProduct";
import ProductGrid from "@/components/home/ProductGrid";
import SmallProductCards from "@/components/home/SmallProductCards";
import PartnerMarquee from "@/components/home/PartnerMarquee";

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
