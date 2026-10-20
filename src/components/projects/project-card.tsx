import Image from "next/image";
import Link from "next/link";

import { BrowserFrame } from "@/components/ui/browser-frame";
import type { ProjectSummary } from "@/content/projects";
import type { Dictionary } from "@/content/dictionaries/types";
import { localePath, type Locale } from "@/lib/seo";
import { cn } from "@/lib/utils";

/** Alternating panel tints so a grid of covers doesn't read as one beige block. */
const PANELS = ["bg-panel", "bg-[#e3e9ee]"] as const;

interface ProjectCardProps {
  project: ProjectSummary;
  dict: Dictionary;
  locale: Locale;
  index?: number;
  /** Heading level, so the card fits the page outline it is placed in. */
  as?: "h2" | "h3";
  /** Set on the first cards in view so their covers load eagerly. */
  priority?: boolean;
}

/**
 * Server component. A screenshot cover sits in browser chrome rising out of a
 * tinted panel; a `mark` cover (a logo) is centred on the panel instead.
 */
export function ProjectCard({ project, dict, locale, index = 0, as: Title = "h3", priority }: ProjectCardProps) {
  const category = dict.sections.projectCategories[project.category];

  return (
    <Link href={localePath(`/projects/${project.slug}`, locale)} className="group block">
      <div
        className={cn(
          "relative aspect-[16/11] overflow-hidden rounded-[18px]",
          PANELS[index % PANELS.length],
          project.coverStyle === "mark" ? "grid place-items-center" : "px-[8%] pt-[8%]"
        )}
      >
        {project.coverStyle === "mark" ? (
          <Image
            src={project.cover}
            alt={project.title}
            width={500}
            height={500}
            priority={priority}
            sizes="(max-width: 768px) 45vw, 260px"
            className="w-[44%] rounded-2xl shadow-[0_30px_60px_-30px_rgb(11_11_13/0.4)] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-[1.04]"
          />
        ) : (
          <BrowserFrame
            flushBottom
            className="transition-transform duration-700 ease-[var(--ease-expo)] group-hover:-translate-y-2"
          >
            <Image
              src={project.cover}
              alt={project.title}
              width={1200}
              height={800}
              priority={priority}
              sizes="(max-width: 1024px) 90vw, 560px"
              className="w-full"
            />
          </BrowserFrame>
        )}
      </div>

      <div className="mt-6 flex items-baseline justify-between gap-4">
        <Title className="text-2xl tracking-[-0.02em] decoration-1 underline-offset-[5px] group-hover:underline">
          {project.name}
        </Title>
        <span className="eyebrow shrink-0">
          {category} · {project.year}
        </span>
      </div>
      <p className="mt-2.5 max-w-[34rem] leading-relaxed text-muted">{project.summary}</p>
    </Link>
  );
}
