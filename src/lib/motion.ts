import type { Variants } from "motion/react";

/**
 * The site's shared motion vocabulary.
 *
 * Every enter animation on the marketing site draws from this file so the whole
 * surface moves with one personality. Reach for these before writing a bespoke
 * `transition={{ ... }}` inline.
 *
 * Only `opacity` and `transform` are ever animated: both are composited on the
 * GPU, so they stay smooth on weak machines. Blur and filter animations are
 * deliberately absent — they repaint every frame.
 */

/** Expo-out. Fast departure, long settle — reads as considered, not bouncy. */
export const EASE = [0.16, 1, 0.3, 1] as const;

export const DURATION = {
  fast: 0.35,
  base: 0.7,
  slow: 1.1,
} as const;

/** Distance an element travels on entry. Kept small; big travel reads as cheap. */
export const TRAVEL = 24;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: TRAVEL },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.slow, ease: EASE } },
};

/** Parent wrapper: children inherit `hidden`/`visible` and play in sequence. */
export const stagger = (delayChildren = 0, staggerChildren = 0.08): Variants => ({
  hidden: {},
  visible: { transition: { delayChildren, staggerChildren } },
});

/** Standard viewport config: play once, trigger slightly before full entry. */
export const VIEWPORT = { once: true, margin: "-80px" } as const;
