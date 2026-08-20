"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { fadeUp, stagger, VIEWPORT } from "@/lib/motion";

interface SectionHeadingProps {
  eyebrow: string;
  /** Plain text before the serif accent word. */
  title: string;
  /** Rendered in italic serif gold. Keep it to one or two words. */
  accent?: string;
  /** Plain text after the accent. */
  titleEnd?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * Every section opens the same way: mono eyebrow, one big headline with a single
 * serif accent, optional lead paragraph. Consistency here is what makes the page
 * read as one design rather than a stack of components.
 */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  titleEnd,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={stagger()}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className={cn(
        "flex flex-col",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <motion.div variants={fadeUp} className="mb-5 flex items-center gap-3">
        <span className="h-px w-8 bg-gold/50" />
        <span className="eyebrow">{eyebrow}</span>
      </motion.div>

      <motion.h2
        variants={fadeUp}
        className={cn(
          "max-w-[20ch] text-[clamp(2rem,4.6vw,3.6rem)]",
          align === "center" && "max-w-[24ch]"
        )}
      >
        {title}
        {accent && (
          <>
            {" "}
            <span className="accent-serif">{accent}</span>
          </>
        )}
        {titleEnd}
        <span className="text-gold">.</span>
      </motion.h2>

      {description && (
        <motion.p
          variants={fadeUp}
          className={cn(
            "mt-6 max-w-xl text-lg leading-relaxed text-dim",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
