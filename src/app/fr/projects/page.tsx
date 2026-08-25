import type { Metadata } from "next";

import { ProjectsView } from "@/components/pages/projects-view";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Réalisations",
  description:
    "Études de cas d'un studio logiciel montréalais : SaaS multilocataire, plateformes de réservation et sites produits, avec le raisonnement technique derrière chaque projet.",
  path: "/projects",
  locale: "fr",
});

export default function FrenchProjectsPage() {
  return <ProjectsView locale="fr" />;
}
