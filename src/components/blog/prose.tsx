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

const MEASURE = "mx-auto w-full max-w-[68ch]";

export function Prose({ blocks }: { blocks: Block[] }) {
  return (
    <div className="text-[1.0625rem] leading-[1.8] text-text/75 sm:text-[1.125rem]">
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
              "mt-16 scroll-mt-28 text-[clamp(1.7rem,3.2vw,2.35rem)] text-text"
            )}
          >
            {block.text}
          </h2>
        );
      }
      return (
        <h3
          id={block.id}
          className={cn(MEASURE, "mt-10 scroll-mt-28 text-[1.3rem] text-text")}
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
                  className="absolute left-0 top-[0.15em] font-mono text-xs text-gold [counter-increment:step] before:content-[counter(step)]"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="absolute left-1 top-[0.72em] size-1.5 rounded-full bg-gold/60"
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
          <div className="overflow-hidden rounded-xl border border-line bg-surface-2">
            <div className="flex items-center justify-between border-b border-line px-4 py-2">
              <span className="eyebrow !text-[0.625rem]">{block.lang}</span>
              <span aria-hidden="true" className="h-px w-8 bg-gold/40" />
            </div>
            {/* Own scroll container: a wide line must never make the page scroll. */}
            <pre className="overflow-x-auto px-4 py-4 text-[0.8125rem] leading-relaxed">
              <code className="font-mono text-text/85">{block.code}</code>
            </pre>
          </div>
          {block.caption && (
            <figcaption className="mt-3 text-sm text-faint">{block.caption}</figcaption>
          )}
        </figure>
      );

    case "callout": {
      const Icon =
        block.tone === "warn" ? TriangleAlert : block.tone === "win" ? Sparkles : Info;
      const warn = block.tone === "warn";

      return (
        <aside
          className={cn(
            MEASURE,
            "mt-8 rounded-xl border-l-2 py-5 pl-5 pr-5",
            warn
              ? "border-l-destructive/70 bg-destructive/[0.06]"
              : "border-l-gold bg-gold/[0.045]"
          )}
        >
          <div className="flex items-center gap-2.5">
            <Icon
              className={cn("size-4 shrink-0", warn ? "text-destructive" : "text-gold")}
              aria-hidden="true"
            />
            {block.title && (
              <p className="font-display text-sm tracking-tight text-text">
                {block.title}
              </p>
            )}
          </div>
          <p className="mt-2 text-[0.975rem] leading-relaxed text-text/70">
            <Inline text={block.text} />
          </p>
        </aside>
      );
    }

    case "quote":
      return (
        <figure className={cn(MEASURE, "mt-10")}>
          <blockquote className="border-l-2 border-gold/50 pl-6">
            <p className="accent-serif !not-italic text-[clamp(1.3rem,2.4vw,1.7rem)] leading-snug text-text">
              <span className="accent-serif">&ldquo;</span>
              {block.text}
              <span className="accent-serif">&rdquo;</span>
            </p>
          </blockquote>
          {block.cite && (
            <figcaption className="mt-3 pl-6 text-sm text-faint">
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
          <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-xl border border-line bg-surface">
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
            <figcaption className={cn(MEASURE, "mt-3 text-sm text-faint")}>
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "table":
      return (
        <figure className={cn(MEASURE, "mt-8")}>
          <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full border-collapse text-left text-[0.9375rem]">
              <thead>
                <tr className="border-b border-line bg-surface-2">
                  {block.head.map((cell) => (
                    <th
                      key={cell}
                      scope="col"
                      className="px-4 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-faint"
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
                          "px-4 py-3 align-top text-text/75",
                          j === 0 && "text-text/90"
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
            <figcaption className="mt-3 text-sm text-faint">{block.caption}</figcaption>
          )}
        </figure>
      );

    case "divider":
      return <div className={cn(MEASURE, "rule-gold my-14")} aria-hidden="true" />;
  }
}
