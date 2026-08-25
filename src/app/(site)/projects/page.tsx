import type { Metadata } from "next";

import { ProjectsView } from "@/components/pages/projects-view";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Work",
  description:
    "Case studies from a Montréal software studio: multi-tenant SaaS, booking platforms and product sites, with the engineering reasoning behind each build.",
  path: "/projects",
  locale: "en",
});

export default function ProjectsPage() {
  return <ProjectsView locale="en" />;
}
