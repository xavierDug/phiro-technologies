import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { ProjectIndex } from "@/components/sections/project-index";
import { CTA } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Work",
  description:
    "SaaS platforms, web applications and marketing sites built by Phiro Technologies — with the reasoning behind each one.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Where ideas become"
        accent="real"
        description="From multi-tenant SaaS to interactive product sites. Each case study covers what was actually hard, not just what shipped."
      />
      <ProjectIndex />
      <CTA />
    </>
  );
}
