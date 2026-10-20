import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { BrowserFrame } from "@/components/ui/browser-frame";
import { ButtonLink } from "@/components/ui/button-link";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Reveal } from "@/components/motion/reveal";
import type { GalleryItem, Project, ProjectSection } from "@/content/projects";
import { getDictionary } from "@/content/dictionaries";
import { localePath, type Locale } from "@/lib/seo";
import { cn } from "@/lib/utils";

/** Label on the left, prose on the right — the case study's reading rhythm. */
function Narrative({ section, divided }: { section: ProjectSection; divided?: boolean }) {
  return (
    <Reveal
      className={cn(
        "grid gap-6 lg:grid-cols-[240px_1fr] lg:gap-20",
        divided && "border-t border-line-strong pt-16"
      )}
    >
      <h2 className="eyebrow pt-2 font-normal tracking-[0.14em]">{section.heading}</h2>
      <div className="max-w-[46rem] space-y-5">
        {section.body.map((paragraph) => (
          <p key={paragraph.slice(0, 32)} className="text-lg leading-[1.7] text-ink-soft sm:text-[1.1875rem]">
            {paragraph}
          </p>
        ))}
      </div>
    </Reveal>
  );
}

function GalleryShot({ item, url }: { item: GalleryItem; url: string }) {
  if (item.frame === "safari") {
    return (
      <div className="rounded-[20px] bg-panel px-[6%] pt-[6%]">
        <BrowserFrame flushBottom>
          <Image src={item.src} alt={item.alt} width={1600} height={1000} sizes="(max-width: 1024px) 90vw, 1100px" className="w-full" />
        </BrowserFrame>
        <span className="sr-only">{url}</span>
      </div>
    );
  }
  return (
    <div className="grid place-items-center rounded-[20px] bg-panel p-[6%]">
      <Image
        src={item.src}
        alt={item.alt}
        width={1400}
        height={1000}
        sizes="(max-width: 1024px) 90vw, 1100px"
        className={cn("h-auto", item.frame === "iphone" ? "w-[260px]" : "w-full rounded-xl")}
      />
    </div>
  );
}

export function CaseStudy({ project, next, locale }: { project: Project; next: Project; locale: Locale }) {
  const dict = getDictionary(locale);
  const labels = dict.sections.caseStudy;
  const category = dict.sections.projectCategories[project.category];
  // The cover is shown up top; the gallery shows only what is new.
  const gallery = project.gallery.filter((item) => item.src !== project.cover);
  const [outcomeLead, ...outcomeRest] = project.outcome.body;

  const meta = [
    { label: labels.client, value: project.client },
    { label: labels.year, value: project.year },
    { label: labels.role, value: project.role, wide: true },
    { label: labels.stack, value: project.stack.join(" · "), wide: true },
  ];

  return (
    <article>
      <header className="mx-auto max-w-7xl px-5 pt-14 pb-16 sm:px-10 sm:pt-20">
        <Link
          href={localePath("/projects", locale)}
          className="eyebrow group fade-up inline-flex items-center gap-2 transition-colors hover:text-ink"
        >
          <ArrowLeft aria-hidden="true" className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
          {labels.allWork}
        </Link>
        <p className="eyebrow fade-up mt-12 mb-6">
          {labels.eyebrow} · {category} · {project.year}
        </p>
        <h1
          className="fade-up max-w-[14ch] text-[clamp(3rem,7.4vw,6.75rem)] leading-[0.98] tracking-[-0.045em]"
          style={{ "--delay": "60ms" } as React.CSSProperties}
        >
          <span className="accent">{project.name}</span>.
        </h1>

        <div
          className="fade-up mt-14 grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-20"
          style={{ "--delay": "160ms" } as React.CSSProperties}
        >
          <div>
            <p className="max-w-[42rem] text-xl leading-relaxed text-muted">{project.intro}</p>
            {project.liveUrl && (
              <ButtonLink href={project.liveUrl} variant="outline" icon="up-right" className="mt-8">
                {labels.visitSite}
              </ButtonLink>
            )}
          </div>
          <dl className="grid grid-cols-2 content-start gap-x-6 gap-y-7 border-t border-line-strong pt-6">
            {meta.map((row) => (
              <div key={row.label} className={cn(row.wide && "col-span-2")}>
                <dt className="eyebrow">{row.label}</dt>
                <dd className="mt-2 leading-relaxed">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 pb-28 sm:px-10 sm:pb-36">
        <div
          className={cn(
            "fade-up overflow-hidden rounded-3xl bg-panel",
            project.coverStyle === "mark" ? "grid aspect-[16/9] place-items-center" : "px-[6%] pt-[6%]"
          )}
          style={{ "--delay": "240ms" } as React.CSSProperties}
        >
          {project.coverStyle === "mark" ? (
            <Image src={project.cover} alt={project.title} width={500} height={500} priority className="w-1/4 rounded-3xl" />
          ) : (
            <BrowserFrame flushBottom>
              <Image
                src={project.cover}
                alt={project.title}
                width={1600}
                height={1000}
                priority
                sizes="(max-width: 1280px) 90vw, 1100px"
                className="w-full"
              />
            </BrowserFrame>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-16 px-5 pb-28 sm:px-10 sm:pb-32">
        <Narrative section={project.challenge} />
        <Narrative section={project.approach} divided />
      </div>

      {gallery.length > 0 && (
        <div className="mx-auto grid max-w-7xl gap-6 px-5 pb-28 sm:px-10 sm:pb-32 md:grid-cols-2">
          {gallery.map((item, i) => (
            <Reveal key={item.src} className={cn(gallery.length % 2 === 1 && i === 0 && "md:col-span-2")}>
              <GalleryShot item={item} url={project.liveUrl ?? project.name} />
            </Reveal>
          ))}
        </div>
      )}

      <section className="mx-auto max-w-7xl px-5 pb-28 sm:px-10 sm:pb-36">
        <Reveal className="grid gap-6 border-t border-line-strong pt-16 lg:grid-cols-[240px_1fr] lg:gap-20">
          <h2 className="eyebrow pt-2 font-normal tracking-[0.14em]">{project.outcome.heading}</h2>
          <div>
            <p className="max-w-[46rem] font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.2] font-medium tracking-[-0.03em]">
              {outcomeLead}
            </p>
            {outcomeRest.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="mt-5 max-w-[46rem] text-lg leading-[1.7] text-ink-soft">
                {paragraph}
              </p>
            ))}
            <dl className="mt-16 grid gap-8 border-t border-line-strong pt-10 sm:grid-cols-3">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="flex flex-col-reverse justify-end">
                  <dt className="mt-3 text-[0.9375rem] text-muted">{metric.label}</dt>
                  <dd className="font-display text-[clamp(3rem,5vw,4rem)] leading-none font-medium tracking-[-0.045em]">
                    {metric.prefix}
                    <NumberTicker value={metric.value} />
                    {metric.suffix}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </section>

      {project.testimonial && (
        <section className="mx-auto max-w-7xl px-5 pb-28 sm:px-10 sm:pb-36">
          <Reveal as="figure" className="grid gap-6 lg:grid-cols-[240px_1fr] lg:gap-20">
            <span aria-hidden="true" />
            <div>
              <blockquote className="font-serif text-[clamp(2rem,3.8vw,3.25rem)] leading-[1.12] tracking-[-0.015em]">
                &ldquo;{project.testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-7 text-[0.9375rem] text-muted">
                <span className="font-medium text-ink">{project.testimonial.author}</span> · {project.testimonial.role}
              </figcaption>
            </div>
          </Reveal>
        </section>
      )}

      <Link href={localePath(`/projects/${next.slug}`, locale)} className="group block border-t border-line-strong">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-8 px-5 py-20 sm:px-10">
          <div>
            <p className="eyebrow mb-4">{labels.next}</p>
            <p className="font-display text-[clamp(2.75rem,5.6vw,5rem)] leading-none font-medium tracking-[-0.045em] decoration-2 underline-offset-8 group-hover:underline">
              {next.name}
            </p>
          </div>
          <span className="grid size-16 place-items-center rounded-full bg-gold transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1.5">
            <ArrowRight aria-hidden="true" className="size-6" />
          </span>
        </div>
      </Link>
    </article>
  );
}
