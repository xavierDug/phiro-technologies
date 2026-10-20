"use client";

import { useMemo, useState } from "react";
import { m } from "motion/react";

import { ProjectCard } from "@/components/projects/project-card";
import type { ProjectSummary } from "@/content/projects";
import { useLocale } from "@/components/layout/locale-provider";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Filterable grid. Filtering swaps the list and fades the new cards in — no
 * layout animation, which would need motion's heavier layout engine for a
 * cosmetic gain.
 *
 * The projects arrive as props from the server page rather than being
 * imported here, so the case-study prose never ships in this client bundle.
 */
export function ProjectIndex({ projects, categories }: { projects: ProjectSummary[]; categories: readonly string[] }) {
  const { locale, dict } = useLocale();
  const labels = dict.sections.projectCategories;
  const [active, setActive] = useState<string>("All");

  const visible = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active, projects]
  );

  return (
    <section className="mx-auto max-w-7xl px-5 pb-32 sm:px-10 sm:pb-40">
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line-strong pt-7">
        <div role="group" aria-label={labels.All} className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const on = category === active;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActive(category)}
                aria-pressed={on}
                className={cn(
                  "h-11 rounded-full border px-5 text-sm font-medium transition-colors duration-300",
                  on ? "border-ink bg-ink text-paper" : "border-line-strong hover:border-ink"
                )}
              >
                {labels[category]}
              </button>
            );
          })}
        </div>
        <p className="eyebrow" aria-live="polite">
          {visible.length} {visible.length === 1 ? dict.sections.projectCount.one : dict.sections.projectCount.other}
        </p>
      </div>

      <div className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2 md:gap-y-20">
        {visible.map((project, i) => (
          <m.div
            key={`${active}-${project.slug}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: Math.min(i * 0.06, 0.3) }}
          >
            <ProjectCard project={project} dict={dict} locale={locale} index={i} as="h2" priority={i < 2} />
          </m.div>
        ))}
      </div>
    </section>
  );
}
