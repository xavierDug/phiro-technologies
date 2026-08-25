"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import SpotlightCard from "@/components/ui/SpotlightCard";
import { CATEGORY_KEYS, getProjects } from "@/content/projects";
import { useLocale } from "@/components/layout/locale-provider";
import { localePath } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

export function ProjectIndex() {
  const { locale, dict } = useLocale();
  const projects = getProjects(locale);
  const categoryLabels = dict.sections.projectCategories;
  const [active, setActive] = useState<string>("All");

  const visible = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((project) => project.category === active),
    [active, projects]
  );

  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORY_KEYS.map((category) => {
            const isActive = category === active;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActive(category)}
                aria-pressed={isActive}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm transition-colors duration-300",
                  isActive ? "text-ink" : "text-dim hover:text-text"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="project-filter"
                    className="absolute inset-0 rounded-full bg-gold"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{categoryLabels[category]}</span>
              </button>
            );
          })}

          <span className="ml-auto font-mono text-xs text-faint">
            {visible.length}{" "}
            {visible.length === 1
              ? dict.sections.projectCount.one
              : dict.sections.projectCount.other}
          </span>
        </div>

        {/* Each card owns its own enter animation rather than inheriting a
            variant from the grid. With parent orchestration, cards mounted by a
            filter change inherited `initial="hidden"` while the parent's
            `whileInView` had already fired with `once: true` — so they never
            got told to become visible and the grid rendered empty. */}
        <motion.div layout className="mt-12 grid gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((project, index) => (
              <motion.article
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{
                  duration: 0.45,
                  ease: EASE,
                  delay: Math.min(index * 0.05, 0.25),
                }}
              >
                <Link
                  href={localePath(`/projects/${project.slug}`, locale)}
                  className="group block h-full"
                >
                  <SpotlightCard
                    className="h-full overflow-hidden rounded-2xl border border-line bg-surface/60 p-0"
                    spotlightColor="rgba(245, 200, 67, 0.12)"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={project.cover}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/15 to-transparent" />
                    </div>

                    <div className="p-7">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold/70">
                          {categoryLabels[project.category]}
                        </span>
                        <span className="h-px flex-1 bg-line" />
                        <span className="font-mono text-[11px] text-faint">
                          {project.year}
                        </span>
                      </div>

                      <h2 className="mt-4 flex items-start gap-2 text-2xl tracking-tight transition-colors duration-300 group-hover:text-gold">
                        {project.name}
                        <ArrowUpRight className="mt-1 size-5 shrink-0 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                      </h2>

                      <p className="mt-3 text-sm leading-relaxed text-dim">
                        {project.summary}
                      </p>

                      <ul className="mt-6 flex flex-wrap gap-2">
                        {project.stack.slice(0, 4).map((tech) => (
                          <li
                            key={tech}
                            className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-faint"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </SpotlightCard>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
