import type { Metadata } from "next";
import MissionStatement from "@/components/about/MissionStatement";
import TeamProfiles from "@/components/about/TeamProfiles";
import ClientGrid from "@/components/about/ClientGrid";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Earthstrong Canada — our mission, leadership, and dealer network across Western Canada.",
};

export default function AboutPage() {
  return (
    <>
      <MissionStatement />
      <TeamProfiles />
      <ClientGrid />
    </>
  );
}
