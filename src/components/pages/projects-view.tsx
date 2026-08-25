import { PageHero } from "@/components/sections/page-hero";
import { ProjectIndex } from "@/components/sections/project-index";
import { CTA } from "@/components/sections/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { getDictionary } from "@/content/dictionaries";
import { breadcrumbSchema, graph } from "@/lib/schema";
import type { Locale } from "@/lib/seo";

export function ProjectsView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const copy = dict.sections.pages.projects;

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
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        accent={copy.accent}
        description={copy.description ?? ""}
      />
      <ProjectIndex />
      <CTA />
    </>
  );
}
