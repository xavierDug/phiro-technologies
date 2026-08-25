"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";

import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

interface ArticleRailProps {
  items: { id: string; text: string }[];
  /** The element the progress is measured against — the article body. */
  targetRef: React.RefObject<HTMLElement | null>;
}

/**
 * The article page's one interactive element: a table of contents whose spine
 * is also the reading-progress indicator.
 *
 * Keeping them as one object rather than two is the point. A progress bar tells
 * you how far through you are; a TOC tells you where things are. Fused, the
 * filled portion of the rail shows both at once — how far you have read, and
 * which sections that covers.
 */
export function ArticleRail({ items, targetRef }: ArticleRailProps) {
  const reduced = useReducedMotion();
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Springing the raw progress keeps the fill from twitching on trackpad
  // momentum. Skipped entirely when the reader has asked for reduced motion.
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 32,
    restDelta: 0.001,
  });
  const progress = reduced ? scrollYProgress : smoothed;

  useEffect(() => {
    if (items.length === 0) return;

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    // The band sits just under the sticky navbar: a heading is "active" from the
    // moment it reaches the top of the reading area until the next one does.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <>
      {/* Desktop: sticky rail beside the article. */}
      <nav
        aria-label="On this page"
        className="sticky top-28 hidden max-h-[calc(100vh-9rem)] overflow-y-auto lg:block"
      >
        <p className="eyebrow mb-5">On this page</p>

        <div className="relative flex gap-4">
          {/* The spine. Track, then the gold fill scaled by reading progress. */}
          <div
            aria-hidden="true"
            className="relative w-px shrink-0 self-stretch bg-line-strong"
          >
            <motion.div
              style={{ scaleY: progress, transformOrigin: "top" }}
              className="absolute inset-0 w-px bg-gradient-to-b from-gold-deep via-gold to-gold-deep"
            />
          </div>

          <ul className="min-w-0 space-y-3.5">
            {items.map((item) => {
              const active = item.id === activeId;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active ? "location" : undefined}
                    className={cn(
                      "block text-[0.8125rem] leading-snug transition-colors duration-300",
                      active ? "text-gold" : "text-faint hover:text-dim"
                    )}
                  >
                    {item.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile: a native disclosure. No JS, no focus trap to get wrong. */}
      <details className="group mb-10 rounded-xl border border-line bg-surface/60 lg:hidden">
        <summary className="flex cursor-pointer items-center justify-between px-4 py-3 marker:content-none">
          <span className="eyebrow">On this page</span>
          <span
            aria-hidden="true"
            className="font-mono text-xs text-faint transition-transform duration-300 group-open:rotate-45"
          >
            +
          </span>
        </summary>
        <ul className="space-y-3 border-t border-line px-4 py-4">
          {items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="text-sm text-dim hover:text-gold">
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </details>
    </>
  );
}

/** Wires the rail to the article element it measures. */
export function ArticleLayout({
  toc,
  children,
}: {
  toc: { id: string; text: string }[];
  children: React.ReactNode;
}) {
  const articleRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16">
      <div className="lg:order-1">
        <ArticleRail items={toc} targetRef={articleRef} />
      </div>
      <div ref={articleRef} className="min-w-0 lg:order-2">
        {children}
      </div>
    </div>
  );
}
