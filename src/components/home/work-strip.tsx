import Image from "next/image";
import Link from "next/link";

import { getDictionary } from "@/content/dictionaries";
import { getProjects } from "@/content/projects";
import { localePath, type Locale } from "@/lib/seo";

/** Cards on the ring. 16 x 22.5deg = one full turn; see `.work-strip` in globals.css. */
const CARD_COUNT = 16;

/**
 * Real work on the inside of a slowly turning cylinder. The camera sits just
 * inside it, so the card facing you is flat and the ones beside it bend toward
 * you before fading out at the edges.
 *
 * Pure CSS 3D (globals.css): no WebGL, no animation loop, no client JS. Turns
 * once every 150s, pauses on hover or focus, and holds still on touch devices
 * and under reduced motion. Adapted from 21st's "Tilted Grid Hero"; the source
 * was not used.
 */
export function WorkStrip({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const categories = dict.sections.projectCategories;
  // Screenshots only: a logo card ("mark") breaks the strip's rhythm.
  const projects = getProjects(locale).filter((project) => project.coverStyle !== "mark");
  if (projects.length === 0) return null;

  const cards = Array.from({ length: CARD_COUNT }, (_, i) => ({
    project: projects[i % projects.length],
    // Only the first pass is exposed to assistive tech and the tab order.
    repeat: i >= projects.length,
  }));

  return (
    <div
      role="region"
      aria-label={dict.nav.work}
      className="work-strip fade-up"
      style={{ "--delay": "600ms" } as React.CSSProperties}
    >
      <div aria-hidden="true" className="work-strip__floor" />
      <div className="work-strip__ring">
        {cards.map(({ project, repeat }, i) => (
          <Link
            key={i}
            href={localePath(`/projects/${project.slug}`, locale)}
            className="work-strip__card group"
            style={{ "--i": i } as React.CSSProperties}
            {...(repeat ? { "aria-hidden": true, tabIndex: -1 } : {})}
          >
            <span className="block aspect-[16/10] overflow-hidden rounded-xl border border-line bg-panel shadow-[0_30px_60px_-30px_rgb(11_11_13/0.35)]">
              <Image
                src={project.cover}
                alt={repeat ? "" : project.title}
                width={1200}
                height={750}
                sizes="(max-width: 640px) 240px, 460px"
                className="size-full object-cover object-top-left"
              />
            </span>
            <span className="mt-3 flex justify-between gap-3 px-0.5 font-mono text-[0.6875rem] tracking-[0.12em] text-faint uppercase max-sm:text-[0.625rem]">
              <span className="text-ink">{project.name}</span>
              <span>{categories[project.category]}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
