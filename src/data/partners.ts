import type { Partner } from "@/types";

export const partners: Partner[] = [
  {
    name: "Pioneer Co-op",
    logo: "/images/partners/pioneer-coop.png",
    location: "Swift Current",
    province: "Saskatchewan",
  },
  {
    name: "Emerge Agro",
    logo: "/images/partners/emerge.png",
    location: "Eston",
    province: "Saskatchewan",
  },
  {
    name: "Kindersley District Co-Op",
    logo: "/images/partners/kindersley-coop.webp",
    location: "Kindersley",
    province: "Saskatchewan",
  },
  {
    name: "NuEra Seeds",
    logo: "/images/partners/nu-era-seeds.png",
    location: "Gladstone",
    province: "Manitoba",
  },
  {
    name: "Agro Plus",
    logo: "/images/partners/agroplus.png",
    location: "Lethbridge & Medicine Hat",
    province: "Alberta",
  },
  {
    name: "Knee Hill Soil Services",
    logo: "/images/partners/knee-hill.svg",
    location: "Linden",
    province: "Alberta",
  },
];

export const partnersByProvince = partners.reduce<Record<string, Partner[]>>(
  (acc, partner) => {
    if (!acc[partner.province]) acc[partner.province] = [];
    acc[partner.province].push(partner);
    return acc;
  },
  {}
);
