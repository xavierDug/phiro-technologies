import Image from "next/image";
import { Info, TriangleAlert, Sparkles } from "lucide-react";

import { Inline } from "@/components/blog/inline";
import type { Block } from "@/content/blog/types";
import { cn } from "@/lib/utils";

/**
 * Renders a post body.
 *
 * Deliberately a server component: the article text is the entire SEO payload,
 * so it has to exist in the initial HTML rather than arriving after hydration.
 * Nothing here needs interactivity — the one interactive piece of an article
 * page (the progress rail) is a separate client island.
 *
 * The measure is capped at 68 characters. Long-form body copy on a dark surface
 * loses the reader past roughly 75, and the marketing site's own sections are
 * all short enough that they never had to solve this.
 */

const MEASURE = "mx-auto w-full max-w-[44rem]";

export function Prose({ blocks }: { blocks: Block[] }) {
  return (
    <div className="text-[1.0625rem] leading-[1.75] text-ink-soft sm:text-[1.1875rem]">
      {blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
    </div>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className={cn(MEASURE, "mt-6 first:mt-0")}>
          <Inline text={block.text} />
        </p>
      );

    case "heading": {
      // Anchor offset clears the sticky navbar when a TOC link jumps here.
      if (block.level === 2) {
        return (
          <h2
            id={block.id}
            className={cn(
              MEASURE,
              "mt-16 scroll-mt-28 text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.12] tracking-[-0.03em] text-ink"
            )}
          >
            {block.text}
          </h2>
        );
      }
      return (
        <h3
          id={block.id}
          className={cn(MEASURE, "mt-10 scroll-mt-28 text-[1.375rem] tracking-[-0.02em] text-ink")}
        >
          {block.text}
        </h3>
      );
    }

    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <List
          className={cn(
            MEASURE,
            "mt-6 space-y-3",
            block.ordered ? "list-none [counter-reset:step]" : "list-none"
          )}
        >
          {block.items.map((item, i) => (
            <li key={i} className="relative pl-7">
              {block.ordered ? (
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-[0.2em] font-mono text-sm text-muted [counter-increment:step] before:content-[counter(step)]"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="absolute left-1 top-[0.7em] size-1.5 rounded-full bg-ink"
                />
              )}
              <Inline text={item} />
            </li>
          ))}
        </List>
      );
    }

    case "code":
      return (
        <figure className={cn(MEASURE, "mt-8")}>
          <div className="overflow-hidden rounded-xl bg-ink text-on-ink">
            <div className="flex items-center justify-between border-b border-line-on-ink px-5 py-2.5">
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-on-ink-muted">{block.lang}</span>
              <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" />
            </div>
            {/* Own scroll container: a wide line must never make the page scroll. */}
            <pre className="overflow-x-auto px-5 py-5 text-[0.8125rem] leading-relaxed">
              <code className="font-mono text-on-ink">{block.code}</code>
            </pre>
          </div>
          {block.caption && (
            <figcaption className="mt-3 text-sm text-muted">{block.caption}</figcaption>
          )}
        </figure>
      );

    case "callout": {
      const warn = block.tone === "warn";
      const Icon = warn ? TriangleAlert : block.tone === "win" ? Sparkles : Info;

      // A hairline-only version had no left bar and no tint, but also no
      // physical presence — it read as a stray paragraph rather than an
      // aside worth pausing on. This gives it real weight the same way the
      // `code` block above already does: a bordered surface-2 panel with a
      // header row. Same container, same rhythm — a callout now reads as a
      // sibling of that device rather than a one-off. The fill stays neutral
      // (never gold- or red-tinted); only the icon and the closing dash
      // carry tone, and red is reserved for an actual warning.
      return (
        <aside
          className={cn(
            MEASURE,
            "mt-8 overflow-hidden rounded-xl border bg-card",
            warn ? "border-error/30" : "border-line-strong"
          )}
        >
          <div
            className={cn(
              "flex items-center justify-between border-b px-4 py-2.5",
              warn ? "border-error/20" : "border-line"
            )}
          >
            <span className="flex items-center gap-2">
              <Icon
                className={cn("size-3.5 shrink-0", warn ? "text-error" : "text-ink")}
                aria-hidden="true"
              />
              {block.title && <span className="eyebrow">{block.title}</span>}
            </span>
            <span
              aria-hidden="true"
              className={cn("size-1.5 rounded-full", warn ? "bg-error" : "bg-gold")}
            />
          </div>
          <p className="px-5 py-4 text-base leading-relaxed text-ink-soft">
            <Inline text={block.text} />
          </p>
        </aside>
      );
    }

    case "quote":
      return (
        <figure className={cn(MEASURE, "mt-10")}>
          <blockquote>
            <p className="font-serif text-[clamp(1.6rem,2.8vw,2.1rem)] leading-[1.2] text-ink">
              &ldquo;{block.text}&rdquo;
            </p>
          </blockquote>
          {block.cite && (
            <figcaption className="mt-3 text-sm text-muted">
              — {block.cite}
            </figcaption>
          )}
        </figure>
      );

    case "image":
      return (
        <figure className="mt-10">
          {/* Breaks the measure on purpose: figures read better slightly wider
              than the text column they interrupt. */}
          <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-xl border border-line bg-card">
            <Image
              src={block.src}
              alt={block.alt}
              width={1600}
              height={900}
              sizes="(max-width: 768px) 100vw, 768px"
              className="h-auto w-full"
            />
          </div>
          {block.caption && (
            <figcaption className={cn(MEASURE, "mt-3 text-sm text-muted")}>
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "table":
      return (
        <figure className={cn(MEASURE, "mt-8")}>
          <div className="overflow-x-auto rounded-xl border border-line-strong bg-card">
            <table className="w-full border-collapse text-left text-[0.9375rem]">
              <thead>
                <tr className="border-b border-line-strong bg-panel">
                  {block.head.map((cell) => (
                    <th
                      key={cell}
                      scope="col"
                      className="px-4 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted"
                    >
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, i) => (
                  <tr key={i} className="border-b border-line last:border-0">
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={cn(
                          "px-4 py-3 align-top text-ink-soft",
                          j === 0 && "text-ink"
                        )}
                      >
                        <Inline text={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && (
            <figcaption className="mt-3 text-sm text-muted">{block.caption}</figcaption>
          )}
        </figure>
      );

    case "divider":
      return <hr className={cn(MEASURE, "my-14 border-line-strong")} />;
  }
}
