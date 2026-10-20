import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudy } from "@/components/projects/case-study";
import { ClosingCta } from "@/components/sections/closing-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { getNextProjectFor, getProjectFor, getProjects } from "@/content/projects";
import { getDictionary } from "@/content/dictionaries";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, graph } from "@/lib/schema";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getProjects("fr").map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectFor(slug, "fr");

  if (!project) return { title: "Introuvable", robots: { index: false, follow: false } };

  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    locale: "fr",
    image: project.cover,
    imageAlt: `${project.name} — réalisation de Phiro Technologies`,
  });
}

export default async function FrenchProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectFor(slug, "fr");

  if (!project) notFound();

  const dict = getDictionary("fr");

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema(
            [
              { name: "Accueil", path: "/" },
              { name: dict.sections.pages.projects.eyebrow, path: "/projects" },
              { name: project.name, path: `/projects/${project.slug}` },
            ],
            "fr"
          )
        )}
      />
      <CaseStudy project={project} next={getNextProjectFor(slug, "fr")} locale="fr" />
      <ClosingCta locale="fr" />
    </>
  );
}
