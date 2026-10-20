import { PageHero } from "@/components/sections/page-hero";
import { ProjectIndex } from "@/components/projects/project-index";
import { ClosingCta } from "@/components/sections/closing-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { getDictionary } from "@/content/dictionaries";
import { byCategoryPriority, CATEGORY_KEYS, getProjects, toProjectSummary } from "@/content/projects";
import { breadcrumbSchema, graph } from "@/lib/schema";
import type { Locale } from "@/lib/seo";

export function ProjectsView({ locale }: { locale: Locale }) {
  const copy = getDictionary(locale).sections.pages.projects;
  const projects = [...getProjects(locale)].sort(byCategoryPriority).map(toProjectSummary);

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema(
            [
              { name: locale === "fr" ? "Accueil" : "Home", path: "/" },
              { name: copy.eyebrow, path: "/projects" },
            ],
            locale
          )
        )}
      />
      <PageHero eyebrow={copy.eyebrow} title={copy.title} accent={copy.accent} description={copy.description} />
      <ProjectIndex projects={projects} categories={CATEGORY_KEYS} />
      <ClosingCta locale={locale} />
    </>
  );
}
