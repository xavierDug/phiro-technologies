"use client";

import type { Variants } from "motion/react";
import { motion } from "motion/react";

import { SectionHeading } from "@/components/sections/section-heading";
import { getSiteContent } from "@/content/site";
import { useLocale } from "@/components/layout/locale-provider";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { EASE } from "@/lib/motion";

/**
 * "What we believe": the statement pins, the beliefs move past it, and each one
 * takes focus automatically as it crosses the middle of the screen.
 *
 * Replaces a React Bits CardSwap deck and then a cursor-lit wall of type. The
 * deck showed one belief at a time on a 4.2s timer, so the first thing an About
 * visitor met was a wait. The wall fixed that but tied the whole effect to
 * pointer position, which made it a reward for owning a mouse — invisible on
 * every phone and tablet, which is most of the traffic this page will see.
 *
 * Scroll is the one input every visitor already has, so scroll drives it here.
 */

/**
 * Only the middle ~20% of the viewport counts as "in view", so focus follows the
 * reader rather than firing everything at once. `once: false` lets it re-light
 * on the way back up.
 */
const FOCUS_BAND = { once: false, margin: "-40% 0px -40% 0px" } as const;

/**
 * Focus is signalled with discrete properties — surface, border, the gold edge,
 * a small nudge — and never by fading the card out.
 *
 * The first cut of this dimmed the whole belief to 32% opacity when unfocused,
 * which measured at 1.66:1 against the page for the 15px body copy. Unreadable,
 * and unreadable in a way that only resolves if you keep scrolling at the right
 * speed. Fading a container is a blunt instrument: it takes the body text down
 * with everything else, and body text has the least headroom. Nothing below
 * ~0.8 opacity clears AA, and by 0.8 there is no visible effect left to have.
 *
 * So the body copy holds `text-dim` (7.28:1) in both states. The heading is
 * where the dimming happens, because large text can afford it — #8a8a92 still
 * measures 5.95:1 and reads as clearly recessed next to #fafaf9.
 */
const card: Variants = {
  rest: {
    x: 0,
    backgroundColor: "rgba(11, 11, 13, 0.3)",
    borderColor: "rgba(255, 255, 255, 0.07)",
    transition: { duration: 0.5, ease: EASE },
  },
  focus: {
    x: 8,
    backgroundColor: "rgba(11, 11, 13, 0.85)",
    borderColor: "rgba(245, 200, 67, 0.35)",
    transition: { duration: 0.55, ease: EASE },
  },
};

const heading: Variants = {
  rest: { color: "#8a8a92", transition: { duration: 0.5, ease: EASE } },
  focus: { color: "#fafaf9", transition: { duration: 0.55, ease: EASE } },
};

const edge: Variants = {
  rest: { scaleY: 0, transition: { duration: 0.4, ease: EASE } },
  focus: { scaleY: 1, transition: { duration: 0.55, ease: EASE } },
};

export function Mission() {
  const reduced = useReducedMotion();
  const { locale, dict } = useLocale();
  const copy = dict.sections.mission;
  const { values } = getSiteContent(locale);

  // With reduced motion the focus pass is skipped entirely and every belief
  // simply renders in its focused state — the readable one.
  const focusProps = reduced
    ? ({ animate: "focus" } as const)
    : ({
        initial: "rest",
        whileInView: "focus",
        viewport: FOCUS_BAND,
      } as const);

  return (
    <section className="relative overflow-hidden border-t border-line py-28 sm:py-36">
      {/* Anchored to the section, not to the pinned column: the column is only
          `sticky` at `lg`, so hanging this off it would move the bloom to a
          different containing block at the breakpoint. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 size-[560px] rounded-full bg-[radial-gradient(circle,rgba(245,200,67,0.10),transparent_65%)] blur-2xl"
      />

      <div className="relative mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow={copy.eyebrow}
            title={copy.title}
            accent={copy.accent}
            description={copy.description}
          />
        </div>

        <ul className="space-y-4">
          {values.map((value) => (
            <motion.li
              key={value.title}
              variants={card}
              {...focusProps}
              className="relative rounded-2xl border p-8 sm:p-10"
            >
              <motion.span
                aria-hidden="true"
                variants={edge}
                className="absolute inset-y-8 left-0 w-px origin-top bg-gradient-to-b from-gold to-transparent"
              />

              <motion.h3
                variants={heading}
                className="text-[clamp(1.5rem,2.8vw,2.15rem)] leading-[1.1] tracking-tight"
              >
                {value.title}
              </motion.h3>

              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-dim">
                {value.description}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
