import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { BrowserFrame } from "@/components/ui/browser-frame";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { getDictionary } from "@/content/dictionaries";
import { getOffer } from "@/content/offer";
import { getProjects } from "@/content/projects";
import { localePath, type Locale } from "@/lib/seo";

/**
 * Real website projects, shown flat (never as the home hero's strip). Only
 * `Website` work: a local business buying a package wants to see sites like
 * the one it is buying.
 */
export function OfferWork({ locale }: { locale: Locale }) {
  const copy = getOffer(locale).work;
  const categories = getDictionary(locale).sections.projectCategories;
  const projects = getProjects(locale)
    .filter((project) => project.category === "Website" && project.coverStyle !== "mark")
    .slice(0, 3);

  if (projects.length === 0) return null;

  return (
    <section aria-labelledby="work-title" className="bg-panel">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-10 sm:py-[clamp(4rem,7vw,6rem)]">
        <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
          <h2 id="work-title" className="text-[clamp(1.75rem,2.8vw,2.25rem)] tracking-[-0.035em]">
            {copy.title}
          </h2>
          <Link
            href={localePath("/projects", locale)}
            className="group inline-flex items-center gap-2 text-[0.9375rem] underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink"
          >
            {copy.seeAll}
            <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
        <RevealGroup as="ul" className="grid gap-5 md:grid-cols-3">
          {projects.map((project, i) => (
            <RevealItem as="li" key={project.slug} className={i > 0 ? "max-md:hidden" : undefined}>
              <Link href={localePath(`/projects/${project.slug}`, locale)} className="group block">
                <BrowserFrame className="transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-1">
                  <Image
                    src={project.cover}
                    alt={project.title}
                    width={1200}
                    height={750}
                    sizes="(max-width: 768px) 92vw, 400px"
                    className="aspect-[16/10] w-full object-cover object-top"
                  />
                </BrowserFrame>
                <p className="mt-3.5 text-sm text-ink-soft">
                  {project.name} <span className="text-faint">· {categories[project.category]}</span>
                </p>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
