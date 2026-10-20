"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { LazyMotion, MotionConfig } from "motion/react";

/**
 * Motion infrastructure for the main site.
 *
 * - `LazyMotion` ships only the animation features the site uses (no layout
 *   or drag engine), loaded asynchronously after hydration. `strict` turns
 *   any accidental use of the full `motion.*` components into an error.
 *   Components use `m.*`.
 * - `MotionConfig reducedMotion="user"` makes every transform animation respect
 *   the OS "reduce motion" setting without each component checking for it.
 * - The lite flag goes one step further for weaker hardware (see below).
 */

const LiteMotionContext = createContext(true);

const loadFeatures = () => import("@/components/motion/features").then((mod) => mod.default);

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

/**
 * Whether this device should get the reduced motion tier: no scroll-linked
 * parallax, no cursor-following effects. Entrance fades stay — they are cheap.
 *
 * Lite when the user asked for reduced motion, the pointer is coarse (touch:
 * there is no cursor to follow and scroll handlers compete with the browser's
 * own), data saver is on, or the hardware hints say the machine is modest.
 * `deviceMemory` is Chromium-only; absent means "assume capable".
 */
function detectLite(): boolean {
  const nav = navigator as NavigatorWithHints;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const fewCores = (nav.hardwareConcurrency ?? 8) <= 4;
  const lowMemory = (nav.deviceMemory ?? 8) <= 4;
  const saveData = nav.connection?.saveData === true;
  return reduced || coarse || fewCores || lowMemory || saveData;
}

export function MotionProvider({ children }: { children: React.ReactNode }) {
  // Starts lite so the server render and first client render agree, and so a
  // slow device never pays for a frame of the expensive tier.
  const [lite, setLite] = useState(true);

  useEffect(() => {
    setLite(detectLite());
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setLite(detectLite());
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">
        <LiteMotionContext.Provider value={lite}>{children}</LiteMotionContext.Provider>
      </MotionConfig>
    </LazyMotion>
  );
}

/** True when decorative, continuous motion (parallax, magnetic) should be skipped. */
export function useLiteMotion(): boolean {
  return useContext(LiteMotionContext);
}
