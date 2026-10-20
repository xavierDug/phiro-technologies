"use client";

import { LazyMotion, domAnimation } from "motion/react";

/**
 * The campaign page's motion features. Components here use the lightweight
 * `m.*` elements, so the full `motion.*` bundle (layout and drag engines) is
 * never shipped — to this page or, through the shared vendor chunk, to the
 * main site.
 */
export function OchMotion({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
