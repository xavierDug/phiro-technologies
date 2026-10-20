"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

/**
 * Runs during HTML parsing, before the curtain paints: a visitor who has
 * already seen the intro this session (or asked for reduced motion) gets
 * `data-intro="skip"` and the curtain never shows. Otherwise it marks the
 * intro as seen. Wrapped in try/catch because storage can throw (private
 * mode, blocked cookies) — the intro then simply plays.
 */
const BOOT_SCRIPT = `(function(){var d=document.documentElement;try{if(sessionStorage.getItem("phiro-intro")||matchMedia("(prefers-reduced-motion: reduce)").matches){d.dataset.intro="skip";return}sessionStorage.setItem("phiro-intro","1")}catch(e){}d.dataset.intro="play"})();`;

/**
 * How long after load the delayed hero entrances have all finished. Only then
 * is it safe to drop the `--intro` offset (see `.intro-curtain` in
 * globals.css): changing an animation's delay while it runs makes it jump.
 */
const SETTLE_MS = 3600;

/**
 * First-visit curtain: the mark and wordmark on ink, a gold hairline that
 * draws across, then the whole panel lifts away to reveal the page.
 *
 * Everything visual is a CSS animation on server-rendered markup, so it paints
 * with the first HTML and plays without waiting for hydration. The page's own
 * CSS entrances are offset by `--intro` so they start as the curtain lifts.
 * The only client work is clearing that offset afterwards, so pages reached by
 * client-side navigation animate in without the extra delay.
 */
export function IntroCurtain() {
  const pathname = usePathname();
  const firstPath = useRef(pathname);

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro !== "play") return;
    const settle = () => {
      root.dataset.intro = "done";
    };
    if (pathname !== firstPath.current) return settle();
    const timer = window.setTimeout(settle, SETTLE_MS);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
      <div aria-hidden="true" className="intro-curtain">
        <div className="intro-curtain__lockup">
          <Image src="/PhiroTechnoNoText.png" alt="" width={44} height={44} priority />
          <span className="intro-curtain__word">PHIRO</span>
          <span className="intro-curtain__rule" />
        </div>
      </div>
    </>
  );
}
