import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudy } from "@/components/projects/case-study";
import { ClosingCta } from "@/components/sections/closing-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { getNextProject, getProject, projects } from "@/content/projects";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, graph } from "@/lib/schema";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Every case study is known at build time, so all of them prerender. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Not found", robots: { index: false, follow: false } };

  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    locale: "en",
    image: project.cover,
    imageAlt: `${project.name} — ${project.category} by Phiro Technologies`,
  });
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema(
            [
              { name: "Home", path: "/" },
              { name: "Work", path: "/projects" },
              { name: project.name, path: `/projects/${project.slug}` },
            ],
            "en"
          )
        )}
      />
      <CaseStudy project={project} next={getNextProject(slug)} locale="en" />
      <ClosingCta locale="en" />
    </>
  );
}
