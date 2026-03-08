import type { Metadata } from "next";
import VisionHero from "@/components/vision/VisionHero";
import ServicePillars from "@/components/vision/ServicePillars";
import ClientShowcase from "@/components/vision/ClientShowcase";

export const metadata: Metadata = {
  title: "Vision",
  description:
    "Rooted In Efficiency — the philosophy behind Earthstrong Canada's approach to crop nutrition and soil analysis.",
};

export default function VisionPage() {
  return (
    <>
      <VisionHero />
      <ServicePillars />
      <ClientShowcase />
    </>
  );
}
