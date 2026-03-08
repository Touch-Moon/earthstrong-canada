import type { Metadata } from "next";
import NutritionClient from "@/components/nutrition/NutritionClient";

export const metadata: Metadata = {
  title: "Nutrition | Earthstrong Canada",
  description:
    "Explore Earthstrong Canada's complete nutrition management solutions — from nitrogen management and nutrient protection to foliar application.",
};

export default function NutritionPage() {
  return <NutritionClient />;
}
