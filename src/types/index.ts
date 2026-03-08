export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  shortDescription: string;
  heroImage: string;
  thumbnailImage: string;
  categories: ExpertiseCategory[];
  features: { title: string; description: string }[];
  subProducts?: { name: string; focus: string; description: string }[];
}

export type ExpertiseCategory =
  | "soil-analysis"
  | "crop-nutrition"
  | "nutrient-protection"
  | "foliar-application"
  | "soil-sampling"
  | "nitrogen-management";

export const expertiseCategoryLabels: Record<ExpertiseCategory, string> = {
  "soil-analysis": "Soil Analysis",
  "crop-nutrition": "Crop Nutrition",
  "nutrient-protection": "Nutrient Protection",
  "foliar-application": "Foliar Application",
  "soil-sampling": "Soil Sampling",
  "nitrogen-management": "Nitrogen Management",
};

export interface TeamMember {
  name: string;
  title: string;
  bio: string;
  image: string;
  initials: string;
}

export interface Partner {
  name: string;
  logo: string;
  location: string;
  province: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  companyName: string;
  tagline: string;
  email: string;
  phone: string;
  parentCompany: string;
}
