"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, ExternalLink } from "lucide-react";

import ScrollFloat from "@/components/ui/ScrollFloat";
import CountUp from "@/components/ui/CountUp";
import TiltedCard from "@/components/ui/TiltedCard";
import { Safari } from "@/components/ui/safari";
import { Iphone } from "@/components/ui/iphone";
import { NoiseTexture } from "@/components/ui/noise-texture";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { fadeUp, stagger, VIEWPORT } from "@/lib/motion";
import type { Project, ProjectSection } from "@/content/projects";
import { useLocale } from "@/components/layout/locale-provider";
import { localePath } from "@/lib/seo";

/** Cover image that drifts slightly slower than the page — depth, not spectacle. */
function CaseHero({ project }: { project: Project }) {
  const { locale, dict } = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <header ref={ref} className="relative min-h-[85svh] overflow-hidden pt-40 pb-20">
      <motion.div
        aria-hidden="true"
        style={reduced ? undefined : { y, scale }}
        className="absolute inset-0"
      >
        <Image
          src={project.cover}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
      </motion.div>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/70 to-ink"
      />
      <NoiseTexture className="absolute inset-0 opacity-[0.04]" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-[55svh] max-w-6xl flex-col justify-end px-6">
        <motion.div
          variants={stagger(0, 0.09)}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp} className="mb-6 flex items-center gap-3">
            <Link
              href={localePath("/projects", locale)}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint transition-colors hover:text-gold"
            >
              Work
            </Link>
            <span className="text-faint">/</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
              {dict.sections.projectCategories[project.category]}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="max-w-[16ch] text-[clamp(2.5rem,7vw,5.25rem)]"
          >
            {project.name}
            <span className="text-gold">.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-dim"
          >
            {project.intro}
          </motion.p>

          {project.liveUrl && (
            <motion.div variants={fadeUp} className="mt-9">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm transition-colors hover:border-gold hover:text-gold"
              >
                Visit live site
                <ExternalLink className="size-4" />
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </header>
  );
}

function MetaRail({ project }: { project: Project }) {
  const { dict } = useLocale();
  const labels = dict.sections.caseStudy;
  const rows = [
    { label: labels.client, value: project.client },
    { label: labels.year, value: project.year },
    { label: labels.role, value: project.role },
  ];

  return (
    <aside className="lg:sticky lg:top-32 lg:self-start">
      <dl className="space-y-6">
        {rows.map((row) => (
          <div key={row.label}>
            <dt className="eyebrow mb-2">{row.label}</dt>
            <dd className="text-sm leading-relaxed text-text">{row.value}</dd>
          </div>
        ))}
        <div>
          <dt className="eyebrow mb-3">{labels.stack}</dt>
          <dd>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-faint"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
    </aside>
  );
}

function Narrative({ section }: { section: ProjectSection }) {
  const reduced = useReducedMotion();

  return (
    <section>
      {reduced ? (
        <h2 className="text-3xl tracking-tight sm:text-4xl">{section.heading}</h2>
      ) : (
        <ScrollFloat
          containerClassName="!my-0"
          textClassName="text-3xl sm:text-4xl tracking-tight"
          animationDuration={1}
          stagger={0.02}
          scrollStart="center bottom+=30%"
          scrollEnd="bottom bottom-=20%"
        >
          {section.heading}
        </ScrollFloat>
      )}

      <div className="mt-6 space-y-5">
        {section.body.map((paragraph) => (
          <motion.p
            key={paragraph.slice(0, 40)}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="max-w-2xl text-[17px] leading-[1.75] text-dim"
          >
            {paragraph}
          </motion.p>
        ))}
      </div>
    </section>
  );
}

function Metrics({ project }: { project: Project }) {
  const { dict } = useLocale();
  const labels = dict.sections.caseStudy;
  return (
    <section className="relative border-y border-line bg-surface/30 py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(245,200,67,0.07),transparent)]"
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <p className="eyebrow mb-12 text-center">{labels.results}</p>
        <dl className="grid gap-12 sm:grid-cols-3">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="text-center">
              <dd className="flex items-baseline justify-center font-display text-[clamp(2.75rem,6vw,4.5rem)] leading-none tracking-tight">
                {metric.prefix}
                <CountUp to={metric.value} duration={1.6} />
                <span className="text-gold">{metric.suffix}</span>
              </dd>
              <dt className="mt-4 text-sm text-dim">{metric.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Gallery({ project }: { project: Project }) {
  const { dict } = useLocale();
  const labels = dict.sections.caseStudy;
  const reduced = useReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-6 py-28">
      <p className="eyebrow mb-12">{labels.screens}</p>

      <div className="space-y-16">
        {project.gallery.map((item, index) => {
          const content =
            item.frame === "safari" ? (
              <Safari url={project.liveUrl ?? "phirotechnologies.com"} imageSrc={item.src} className="w-full" />
            ) : item.frame === "iphone" ? (
              <Iphone src={item.src} className="mx-auto h-auto w-[280px]" />
            ) : (
              <Image
                src={item.src}
                alt={item.alt}
                width={1600}
                height={1000}
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="w-full rounded-2xl border border-line"
              />
            );

          return (
            <motion.figure
              key={item.src + index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              {reduced || item.frame !== "none" ? (
                content
              ) : (
                <TiltedCard
                  imageSrc={item.src}
                  altText={item.alt}
                  containerHeight="480px"
                  imageHeight="480px"
                  imageWidth="100%"
                  rotateAmplitude={7}
                  scaleOnHover={1.03}
                  showTooltip={false}
                  showMobileWarning={false}
                />
              )}
              <figcaption className="mt-5 font-mono text-xs text-faint">
                {item.alt}
              </figcaption>
            </motion.figure>
          );
        })}
      </div>
    </section>
  );
}

function NextProject({ next }: { next: Project }) {
  const { locale, dict } = useLocale();
  const labels = dict.sections.caseStudy;

  return (
    <Link
      href={localePath(`/projects/${next.slug}`, locale)}
      className="group relative block overflow-hidden border-t border-line"
    >
      <Image
        src={next.cover}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-15 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:opacity-25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 py-32 text-center">
        <p className="eyebrow mb-5">{labels.next}</p>
        <h2 className="flex items-center gap-3 text-[clamp(2rem,5.5vw,4rem)] transition-colors duration-500 group-hover:text-gold">
          {next.name}
          <ArrowUpRight className="size-8 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </h2>
        <p className="mt-4 max-w-md text-sm text-dim">{next.summary}</p>
      </div>
    </Link>
  );
}

export function CaseStudy({ project, next }: { project: Project; next: Project }) {
  return (
    <article>
      <CaseHero project={project} />

      <div className="mx-auto grid max-w-6xl gap-14 px-6 pt-24 pb-28 sm:pt-32 lg:grid-cols-[240px_1fr] lg:gap-20">
        <MetaRail project={project} />

        <div className="space-y-20">
          <Narrative section={project.challenge} />
          <Narrative section={project.approach} />
          <Narrative section={project.outcome} />
        </div>
      </div>

      <Metrics project={project} />
      <Gallery project={project} />

      {project.testimonial && (
        <section className="mx-auto max-w-3xl px-6 pb-28 text-center">
          <motion.blockquote
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <span aria-hidden="true" className="accent-serif text-6xl leading-none">
              &ldquo;
            </span>
            <p className="mt-2 text-2xl leading-snug tracking-tight sm:text-3xl">
              {project.testimonial.quote}
            </p>
            <footer className="mt-8 font-mono text-xs tracking-[0.18em] uppercase text-faint">
              {project.testimonial.author} — {project.testimonial.role}
            </footer>
          </motion.blockquote>
        </section>
      )}

      <NextProject next={next} />
    </article>
  );
}
