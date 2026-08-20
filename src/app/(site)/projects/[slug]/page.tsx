import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudy } from "@/components/sections/case-study";
import { CTA } from "@/components/sections/cta";
import { getNextProject, getProject, projects } from "@/content/projects";

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

  if (!project) return { title: "Not found" };

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [{ url: project.cover }],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return (
    <>
      <CaseStudy project={project} next={getNextProject(slug)} />
      <CTA />
    </>
  );
}
