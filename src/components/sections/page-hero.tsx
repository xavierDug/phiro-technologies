"use client";

import { motion } from "motion/react";

import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { NoiseTexture } from "@/components/ui/noise-texture";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  accent: string;
  titleEnd?: string;
  description: string;
  className?: string;
}

/**
 * Shared hero for the interior pages (about, projects, contact).
 *
 * Deliberately quieter than the home hero: a flickering grid rather than the
 * WebGL aurora, so the aurora stays a single, unrepeated moment on the site.
 */
export function PageHero({
  eyebrow,
  title,
  accent,
  titleEnd,
  description,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative flex min-h-[70svh] items-end overflow-hidden border-b border-line pb-16 pt-40",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <FlickeringGrid
          className="absolute inset-0 [mask-image:radial-gradient(80%_70%_at_50%_20%,black,transparent)]"
          squareSize={3}
          gridGap={9}
          color="#f5c843"
          maxOpacity={0.16}
          flickerChance={0.1}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
        <NoiseTexture className="absolute inset-0 opacity-[0.035]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="h-px w-8 bg-gold/50" />
          <span className="eyebrow">{eyebrow}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}
          className="max-w-[15ch] text-[clamp(2.75rem,7.5vw,5.75rem)]"
        >
          {title} <span className="accent-serif">{accent}</span>
          {titleEnd}
          <span className="text-gold">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-dim"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}
