import type { Product } from "@/types";

export const products: Product[] = [
  {
    slug: "solumetrix",
    name: "Solumetrix",
    tagline: "See What Your Soil Really Holds",
    shortDescription:
      "Patented soil testing technology that identifies what nutrients are truly soluble and accessible to your plants.",
    description:
      "Based on thousands of data correlations refined over three decades, Solumetrix goes beyond standard soil tests. It reveals the nutrients that are actually available to your crops at any given moment, enabling balanced fertility recommendations that maximize yield while minimizing waste.",
    heroImage: "/images/products/solumetrix.webp",
    thumbnailImage: "/images/products/solumetrix.webp",
    categories: ["soil-analysis"],
    features: [
      {
        title: "Patented Analysis",
        description:
          "Proprietary technology correlating thousands of data points to identify truly soluble nutrients in your specific soil conditions.",
      },
      {
        title: "Balanced Recommendations",
        description:
          "Receive fertility recommendations that reflect what your crops actually need — not just what's present, but what's accessible.",
      },
      {
        title: "Data-Driven Results",
        description:
          "Three decades of agricultural research condensed into actionable, field-proven recommendations for Western Canadian conditions.",
      },
      {
        title: "Waste Reduction",
        description:
          "Stop over-applying nutrients that aren't reaching your crops. Maximize ROI by targeting only what's genuinely deficient.",
      },
    ],
  },
  {
    slug: "harbor-brands",
    name: "Harbor Brands",
    tagline: "Soil To Cell Technology",
    shortDescription:
      "Over 9 organically chelated micro and macronutrient solutions using Soil To Cell Technology.",
    description:
      "Harbor's lineup of organically chelated nutrients ensures each element assimilates directly in the plant cell without tie-up in the soil. Tank-mix compatible and proven across Western Canadian conditions.",
    heroImage: "/images/products/harbour-nutrients.webp",
    thumbnailImage: "/images/products/harbour-nutrients.webp",
    categories: ["crop-nutrition", "foliar-application"],
    features: [
      {
        title: "Organic Chelation",
        description:
          "Every Harbor nutrient is organically chelated, preventing soil tie-up and ensuring direct plant cell assimilation.",
      },
      {
        title: "Tank-Mix Compatible",
        description:
          "Seamlessly integrate Harbor products into your existing spray programs without compatibility issues.",
      },
      {
        title: "Full Spectrum Coverage",
        description:
          "Address macro and micronutrient deficiencies with a complete lineup: Boron, Copper, Iron, Potassium, Sulphur, Zinc, and more.",
      },
      {
        title: "Western Canadian Proven",
        description:
          "Formulated and tested specifically for prairie soil and climate conditions.",
      },
    ],
    subProducts: [
      { name: "HARBOR-B", focus: "Boron", description: "Organically chelated boron for canola, alfalfa, and legume applications." },
      { name: "HARBOR-Cl", focus: "Chloride", description: "Chloride supplementation for cereal grains and root crops." },
      { name: "HARBOR-Cu", focus: "Copper", description: "Chelated copper for wheat and barley on copper-deficient soils." },
      { name: "HARBOR-Fe", focus: "Iron", description: "Iron chelate for correcting chlorosis in a wide range of crops." },
      { name: "HARBOR-K", focus: "Potassium", description: "Potassium foliar supplement for yield and quality enhancement." },
      { name: "HARBOR-S", focus: "Sulphur", description: "Sulphur solution for canola and pulse crop applications." },
      { name: "HARBOR-Zn", focus: "Zinc", description: "Chelated zinc for corn and pulse crops on alkaline soils." },
      { name: "HARBOR-Mn", focus: "Manganese", description: "Manganese chelate for soybeans and cereals." },
      { name: "HARBOR 3-18", focus: "Blend", description: "Balanced macro and micronutrient blend for foliar feeding programs." },
    ],
  },
  {
    slug: "collect-n-go",
    name: "Collect-N-Go",
    tagline: "Precision Starts With The Sample",
    shortDescription:
      "Patented soil sampling equipment for precise, repeatable field analysis.",
    description:
      "Collect-N-Go provides standardized, repeatable soil sampling that forms the foundation of precision agriculture. Consistent sampling means consistent data, leading to better nutrient management decisions season after season.",
    heroImage: "/images/products/collect-n-go.jpg",
    thumbnailImage: "/images/products/collect-n-go.jpg",
    categories: ["soil-sampling"],
    features: [
      {
        title: "Patented Technology",
        description:
          "Purpose-built equipment engineered for consistent depth and volume, eliminating sampling variability.",
      },
      {
        title: "Repeatable Results",
        description:
          "Year-over-year comparable data that lets you track soil health trends and measure program effectiveness.",
      },
      {
        title: "Field-Ready Design",
        description:
          "Rugged construction built for Western Canadian field conditions from spring mud to fall frost.",
      },
      {
        title: "Integration Ready",
        description:
          "Works seamlessly with Solumetrix analysis for a complete soil intelligence workflow.",
      },
    ],
  },
  {
    slug: "cove",
    name: "Cove",
    tagline: "Protect Your Nutrient Investment",
    shortDescription:
      "Nutrient protection that keeps applied fertilizers available and working.",
    description:
      "Cove products protect applied nutrients from becoming unavailable in the soil. By reducing salt effects and promoting root development, Cove ensures your fertilizer investment delivers maximum return.",
    heroImage: "/images/products/cove.jpg",
    thumbnailImage: "/images/products/cove.jpg",
    categories: ["nutrient-protection"],
    features: [
      {
        title: "Nitrogen Protection",
        description:
          "COVE-N keeps applied nitrogen in plant-available form longer, reducing volatilization and leaching losses.",
      },
      {
        title: "Phosphorus Protection",
        description:
          "COVE-P prevents phosphorus tie-up in cold, wet soils — critical for early-season prairie conditions.",
      },
      {
        title: "Salt Effect Reduction",
        description:
          "Mitigate fertilizer salt stress at seeding to promote stronger germination and early root development.",
      },
      {
        title: "ROI Amplification",
        description:
          "Every dollar spent on Cove multiplies the effectiveness of your existing fertilizer program.",
      },
    ],
    subProducts: [
      { name: "COVE-N", focus: "Nitrogen", description: "Nitrogen protection additive that reduces volatilization and keeps N in the ammonium form longer." },
      { name: "COVE-P", focus: "Phosphorus", description: "Phosphorus protection for cold soil conditions, preventing early-season tie-up." },
      { name: "COVE-P RTU", focus: "Phosphorus (Ready-To-Use)", description: "Pre-diluted phosphorus protection formula ready for direct application." },
    ],
  },
  {
    slug: "fjord",
    name: "Fjord",
    tagline: "Foliar Efficiency Redefined",
    shortDescription:
      "Foliar nutrients up to 10x more available than soil-applied equivalents.",
    description:
      "Fjord delivers critical nutrients directly through the leaf when crops need them most. Bypassing soil tie-up, Fjord products provide phosphate, calcium, and magnesium at efficiencies far exceeding traditional soil application.",
    heroImage: "/images/products/fjord.jpg",
    thumbnailImage: "/images/products/fjord.jpg",
    categories: ["crop-nutrition", "foliar-application"],
    features: [
      {
        title: "10x Availability",
        description:
          "Foliar-applied Fjord nutrients are up to 10 times more available to the plant than equivalent soil applications.",
      },
      {
        title: "Bypass Soil Tie-Up",
        description:
          "Deliver nutrients directly to where photosynthesis and growth happen — the leaf — not the soil.",
      },
      {
        title: "Critical Stage Timing",
        description:
          "Apply at key growth stages (heading, flowering, grain fill) for targeted nutrient support when it matters most.",
      },
      {
        title: "Multi-Nutrient Coverage",
        description:
          "Address phosphorus, calcium, and magnesium deficiencies with purpose-built foliar formulations.",
      },
    ],
    subProducts: [
      { name: "Fjord-P", focus: "Phosphate + Potassium", description: "High-efficiency foliar phosphate and potassium for early-season establishment and grain fill." },
      { name: "Fjord-Ca", focus: "Calcium", description: "Foliar calcium for improved cell wall strength and stress tolerance." },
      { name: "Fjord-Mg", focus: "Magnesium", description: "Magnesium foliar supplement to support chlorophyll production and photosynthesis." },
    ],
  },
  {
    slug: "advanced-crop-nutrition",
    name: "Advanced Crop Nutrition",
    tagline: "Complete Season Support",
    shortDescription:
      "Nitrogen management, soil aeration, and late-season crop support.",
    description:
      "A complete suite of advanced products supporting every stage of crop growth — from nitrogen management with Augusta Max to soil mineralization with CaL AIR, carbohydrate support with FleKsy, and nitrogen conversion with MoNi.",
    heroImage: "/images/products/specialty-brands.webp",
    thumbnailImage: "/images/products/specialty-brands.webp",
    categories: ["nitrogen-management", "crop-nutrition"],
    features: [
      {
        title: "Nitrogen Management",
        description:
          "Augusta Max optimizes nitrogen conversion and utilization for improved NUE across all crop types.",
      },
      {
        title: "Soil Aeration & Mineralization",
        description:
          "CaL AIR improves soil structure, promotes calcium availability, and enhances microbial activity.",
      },
      {
        title: "Late-Season Support",
        description:
          "FleKsy provides carbohydrate support during grain fill and ripening for improved quality and test weight.",
      },
      {
        title: "Nitrogen Conversion",
        description:
          "MoNi supports the conversion of ammonium to nitrate, improving plant-available nitrogen throughout the season.",
      },
    ],
    subProducts: [
      { name: "Augusta Max", focus: "Nitrogen Management", description: "Improves nitrogen use efficiency by optimizing conversion and reducing losses." },
      { name: "CaL AIR", focus: "Soil Aeration", description: "Enhances soil structure, calcium availability, and beneficial microbial populations." },
      { name: "FleKsy", focus: "Late-Season Carbohydrates", description: "Carbohydrate support for grain fill, ripening, and end-of-season crop quality." },
      { name: "MoNi", focus: "Nitrogen Conversion", description: "Supports ammonium-to-nitrate conversion for consistent plant-available nitrogen." },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getNextProduct(currentSlug: string): Product {
  const idx = products.findIndex((p) => p.slug === currentSlug);
  return products[(idx + 1) % products.length];
}
