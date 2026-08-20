"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import SpotlightCard from "@/components/ui/SpotlightCard";
import { BorderBeam } from "@/components/ui/border-beam";
import { SectionHeading } from "@/components/sections/section-heading";
import { featuredProjects } from "@/content/projects";
import { fadeUp, stagger, VIEWPORT } from "@/lib/motion";

export function Work() {
  return (
    <section className="relative border-t border-line py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Selected work"
            title="Projects that speak for"
            accent="themselves"
          />

          <Link
            href="/projects"
            className="group inline-flex shrink-0 items-center gap-2 text-sm text-dim transition-colors hover:text-gold"
          >
            All projects
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-16 grid gap-5 md:grid-cols-3"
        >
          {featuredProjects.map((project) => (
            <motion.div key={project.slug} variants={fadeUp}>
              <Link href={`/projects/${project.slug}`} className="group block h-full">
                <SpotlightCard
                  className="relative h-full overflow-hidden rounded-2xl border border-line bg-surface/60 p-0"
                  spotlightColor="rgba(245, 200, 67, 0.12)"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={project.cover}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px] tracking-[0.18em] text-gold/70 uppercase">
                        {project.category}
                      </span>
                      <span className="h-px flex-1 bg-line" />
                      <span className="font-mono text-[11px] text-faint">
                        {project.year}
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl tracking-tight transition-colors duration-300 group-hover:text-gold">
                      {project.name}
                    </h3>

                    <p className="mt-2.5 text-sm leading-relaxed text-dim">
                      {project.summary}
                    </p>
                  </div>

                  {/* Beam only on hover, so a grid of three doesn't look like a
                      christmas tree at rest. */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <BorderBeam
                      size={140}
                      duration={6}
                      colorFrom="#F5C843"
                      colorTo="#C9962E"
                    />
                  </div>
                </SpotlightCard>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
