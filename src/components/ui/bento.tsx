"use client";

// Installed from 21st.dev — @kinfe123/bento.
// Registry-owned. Structure is upstream's: a tall graphic area with a frosted
// text panel pulled up over its bottom edge, and corner rounding applied only
// on the grid's outer corners so the whole set reads as one slab.
//
// Two deliberate deviations from the source, both documented at the line:
// the violet inset glow is swapped for Phiro gold, and the import is
// `motion/react` rather than `framer-motion` to match the rest of the site.

import { clsx } from "clsx";
import { motion } from "motion/react";

export function BentoCard({
  dark = false,
  className = "",
  eyebrow,
  title,
  description,
  graphic,
  fade = [],
}: {
  dark?: boolean;
  className?: string;
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  graphic?: React.ReactNode;
  fade?: ("top" | "bottom")[];
}) {
  return (
    <motion.div
      initial="idle"
      whileHover="active"
      variants={{ idle: {}, active: {} }}
      data-dark={dark ? "true" : undefined}
      className={clsx(
        className,
        "group relative flex flex-col overflow-hidden rounded-lg",
        "transform-gpu bg-surface/70 shadow-sm ring-1 ring-white/10",
        // Upstream: #8686f01f (violet). Phiro gold at the same weight.
        "[box-shadow:0_-20px_80px_-20px_rgba(245,200,67,0.10)_inset] [border:1px_solid_rgba(255,255,255,0.07)]",
        "transition-colors duration-500 hover:ring-gold/25"
      )}
    >
      <div className="relative h-[19rem] shrink-0 sm:h-[21rem]">
        {graphic}
        {fade.includes("top") && (
          <div className="absolute inset-0 bg-gradient-to-b from-ink to-50% opacity-60" />
        )}
        {fade.includes("bottom") && (
          <div className="absolute inset-0 bg-gradient-to-t from-ink to-50% opacity-60" />
        )}
      </div>

      {/* Pulled up over the graphic and frosted — this overlap is the pattern's
          signature and the reason each card needs so little text of its own. */}
      <div className="relative isolate z-20 -mt-24 h-[11.5rem] bg-gradient-to-t from-surface/95 via-surface/80 to-transparent p-8 backdrop-blur-xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold/80">
          {eyebrow}
        </p>
        <p className="mt-2 text-2xl font-medium tracking-tight text-text">{title}</p>
        <p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-dim">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default BentoCard;
