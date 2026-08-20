"use client";

import { useEffect, useState } from "react";

/**
 * Tracks `prefers-reduced-motion`.
 *
 * The CSS media query in globals.css neuters CSS animations, but it cannot stop
 * a WebGL render loop or a GSAP timeline — those have to be skipped in JS. Every
 * shader-backed background on the site gates on this hook and swaps in a static
 * gradient instead.
 *
 * Starts `false` so server and first client render agree; the effect corrects it
 * immediately after mount.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);

    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
