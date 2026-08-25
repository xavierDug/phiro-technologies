"use client";

import { motion } from "motion/react";

import { SectionHeading } from "@/components/sections/section-heading";
import { getSiteContent } from "@/content/site";
import { useLocale } from "@/components/layout/locale-provider";
import { EASE, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * The four steps, as four quadrants split by a gold cross.
 *
 * Attempt five, and the first with any real presence. The history is worth
 * keeping because it is mostly a record of over-building: a vertical fade-up
 * list that read as filler; a GSAP horizontal pin that fought touch scrolling;
 * 21st.dev's scroll-driven card stack, which spent three viewport heights and
 * showed one card at a time to deliver four short paragraphs, under a headline
 * promising no theatre; then a single-screen connector rail, which fixed the
 * scroll cost but was so quiet it read as a placeholder.
 *
 * The diagnosis that finally mattered was positional, not typographic. This
 * section sits between Services (a dense bento of graphics) and Craft (a
 * full-bleed photograph). Anything built from hairlines and small text is going
 * to look thin in that company no matter how well it is set. So the answer here
 * is scale: numerals big enough to be architecture rather than ornament.
 *
 * Numbering earns its place — this content genuinely is a sequence, and the
 * numerals are what carry the section at a glance. The test for a device like
 * this is whether removing it costs anything; remove these and the section goes
 * back to being a quiet grid of paragraphs.
 *
 * No hover states and one entrance, deliberately. "Four steps, no theatre"
 * should be able to hold the page standing still.
 */
export function Process() {
  const { locale, dict } = useLocale();
  const copy = dict.sections.process;
  const { processSteps } = getSiteContent(locale);

  return (
    <section className="relative border-t border-line py-28 sm:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/3 h-[520px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(245,200,67,0.05),transparent)]"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          accent={copy.accent}
          description={copy.description}
        />

        {/*
          The cross is drawn by the cells' own borders rather than by an overlay,
          so it can never drift out of register with the content:
            · row rule — every cell but the first when stacked; at `sm` only the
              second row, so cell 1 has to take its mobile rule back off
            · column rule — the right-hand cells, at `sm` and up
          Horizontal padding is applied to the inner edges only, which keeps the
          outer columns flush with the container and therefore aligned with the
          section heading above.
        */}
        <ol className="mt-16 grid grid-cols-1 sm:grid-cols-2">
          {processSteps.map((step, index) => (
            <motion.li
              key={step.index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.75, ease: EASE, delay: index * 0.1 }}
              className={cn(
                "relative overflow-hidden py-12 sm:py-14",
                index > 0 && "border-t border-line",
                index === 1 && "sm:border-t-0",
                index % 2 === 1 && "sm:border-l sm:border-line",
                index % 2 === 0 ? "sm:pr-12" : "sm:pl-12"
              )}
            >
              {/* Outlined so it reads as structure rather than as a second,
                  competing piece of copy. Cropped at the top by the cell's own
                  overflow, which is what keeps it feeling built-in. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-4 right-0 select-none font-display text-[8rem] leading-none text-transparent sm:text-[10rem]"
                style={{ WebkitTextStroke: "1px rgba(245,200,67,0.18)" }}
              >
                {step.index}
              </span>

              <div className="relative">
                <span className="font-mono text-[11px] tracking-[0.22em] text-gold">
                  {step.index}
                </span>
                <h3 className="mt-5 max-w-[14ch] text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.1] tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-dim">
                  {step.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
