"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

import { SectionHeading } from "@/components/sections/section-heading";
import { journey } from "@/content/site";
import { fadeUp, VIEWPORT } from "@/lib/motion";

export function Journey() {
  const ref = useRef<HTMLDivElement>(null);

  // The gold line fills as the timeline scrolls past, so progress through the
  // story is visible rather than implied.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const glowOpacity = useTransform(scrollYProgress, [0, 0.05, 1], [0, 1, 1]);

  return (
    <section className="border-t border-line py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="The road so far"
          title="How Phiro got"
          accent="here"
          description="Short version: we kept refusing to ship things we would not want to maintain."
        />

        <div ref={ref} className="relative mt-20 pl-10 sm:pl-16">
          {/* Track */}
          <div className="absolute left-[3px] top-2 h-full w-px bg-line sm:left-[7px]" />
          <motion.div
            style={{ scaleY, opacity: glowOpacity }}
            className="absolute left-[3px] top-2 h-full w-px origin-top bg-gradient-to-b from-gold via-gold to-gold-deep shadow-[0_0_12px_rgba(245,200,67,0.5)] sm:left-[7px]"
          />

          <ol className="space-y-16">
            {journey.map((entry) => (
              <motion.li
                key={entry.year}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                className="relative"
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-10 top-2 grid size-2 place-items-center rounded-full bg-gold shadow-[0_0_0_4px_rgba(245,200,67,0.14)] sm:-left-16 sm:size-[15px]"
                />

                <p className="font-mono text-xs tracking-[0.2em] text-gold">
                  {entry.year}
                </p>
                <h3 className="mt-3 text-2xl tracking-tight sm:text-3xl">
                  {entry.title}
                </h3>
                <p className="mt-3 max-w-xl leading-relaxed text-dim">
                  {entry.description}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
