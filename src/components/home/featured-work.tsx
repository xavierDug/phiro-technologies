import { ButtonLink } from "@/components/ui/button-link";
import { SectionHeading } from "@/components/ui/headline";
import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/projects/project-card";
import { getFeaturedProjects } from "@/content/projects";
import { getDictionary } from "@/content/dictionaries";
import { localePath, type Locale } from "@/lib/seo";
import { cn } from "@/lib/utils";

/** Two columns, the right one dropped by a step, so the grid reads as a layout rather than a table. */
export function FeaturedWork({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const copy = dict.sections.work;
  const projects = getFeaturedProjects(locale).slice(0, 4);

  return (
    <section id="work" className="mx-auto max-w-7xl px-5 pb-28 sm:px-10 sm:pb-36">
      <SectionHeading
        eyebrow={copy.eyebrow}
        title={copy.title}
        accent={copy.accent}
        aside={
          <ButtonLink href={localePath("/projects", locale)} variant="outline">
            {copy.allProjects}
          </ButtonLink>
        }
      />
      <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 md:gap-y-20">
        {projects.map((project, i) => (
          <Reveal key={project.slug} className={cn(i % 2 === 1 && "md:mt-28")}>
            <ProjectCard project={project} dict={dict} locale={locale} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
