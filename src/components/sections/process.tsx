"use client";

import {
  CardTransformed,
  CardsContainer,
  ContainerScroll,
} from "@/components/ui/animated-cards-stack";
import { SectionHeading } from "@/components/sections/section-heading";
import { processSteps } from "@/content/site";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { motion } from "motion/react";
import { fadeUp, VIEWPORT } from "@/lib/motion";

/**
 * The four steps, as a scroll-driven card stack: each card rotates up off the
 * deck and out as you scroll, revealing the next.
 *
 * Replaced two earlier attempts. The first was a vertical fade-up list (the old
 * `story.tsx`), which read as filler. The second pinned the section and scrolled
 * it horizontally with GSAP, which fought touch scrolling on mobile. React Bits'
 * ScrollStack was the obvious third option but instantiates Lenis — window-level
 * smooth scroll we deliberately ruled out — so this uses 21st.dev's
 * motion-only equivalent instead.
 */
export function Process() {
  const reduced = useReducedMotion();

  return (
    <section className="relative border-t border-line py-28 sm:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/4 h-[600px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(245,200,67,0.06),transparent)]"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="How we work"
          title="Four steps, no"
          accent="theatre"
          description="The same sequence on every engagement, whether it is a landing page or a multi-tenant platform."
          align="center"
          className="items-center"
        />
      </div>

      {reduced ? (
        // The stack is a scroll effect; without it, a plain list says the same thing.
        <div className="mx-auto mt-16 grid max-w-4xl gap-4 px-6 sm:grid-cols-2">
          {processSteps.map((step) => (
            <motion.article
              key={step.index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="rounded-2xl border border-line bg-surface/60 p-8"
            >
              <span className="font-mono text-xs tracking-[0.2em] text-gold/70">
                {step.index}
              </span>
              <h3 className="mt-5 text-2xl tracking-tight">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-dim">
                {step.description}
              </p>
            </motion.article>
          ))}
        </div>
      ) : (
        <ContainerScroll className="h-[320vh]">
          <div className="sticky top-0 flex h-svh w-full items-center">
            <CardsContainer className="mx-auto h-[380px] w-[min(90vw,520px)]">
              {processSteps.map((step, index) => (
                <CardTransformed
                  key={step.index}
                  arrayLength={processSteps.length}
                  index={index + 2}
                  variant="dark"
                  role="article"
                  className="!items-start !justify-start !gap-0 !border-line !bg-surface/90 !p-9 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.9)] sm:!p-11"
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="font-mono text-xs tracking-[0.22em] text-gold">
                      {step.index}
                    </span>
                    <span className="font-mono text-[11px] text-faint">
                      {String(index + 1)} / {processSteps.length}
                    </span>
                  </div>

                  <span
                    aria-hidden="true"
                    className="mt-6 font-display text-[5.5rem] leading-none text-white/[0.05]"
                  >
                    {step.index}
                  </span>

                  <h3 className="mt-4 text-left text-3xl tracking-tight">
                    {step.title}
                  </h3>

                  <p className="mt-4 text-left text-[15px] leading-relaxed text-dim">
                    {step.description}
                  </p>

                  <div className="mt-auto h-px w-full bg-gradient-to-r from-gold/50 to-transparent" />
                </CardTransformed>
              ))}
            </CardsContainer>
          </div>
        </ContainerScroll>
      )}
    </section>
  );
}
