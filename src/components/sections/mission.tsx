"use client";

import { motion } from "motion/react";

import CardSwap, { Card } from "@/components/ui/CardSwap";
import { SectionHeading } from "@/components/sections/section-heading";
import { values } from "@/content/site";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { fadeUp, stagger, VIEWPORT } from "@/lib/motion";

export function Mission() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-t border-line py-28 sm:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="What we believe"
            title="Technology should feel"
            accent="inevitable"
            description="Not clever. Not impressive. Obvious — as though the product could not reasonably have worked any other way. Getting there is the whole job."
          />
        </div>

        {reduced ? (
          // The swapping deck is decorative; a plain list carries the same content.
          <motion.ul
            variants={stagger(0, 0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="space-y-4"
          >
            {values.map((value) => (
              <motion.li
                key={value.title}
                variants={fadeUp}
                className="rounded-2xl border border-line bg-surface/60 p-6"
              >
                <h3 className="text-lg tracking-tight">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-dim">
                  {value.description}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          <div className="relative h-[420px] sm:h-[460px]">
            <CardSwap
              width={420}
              height={300}
              cardDistance={52}
              verticalDistance={62}
              delay={4200}
              pauseOnHover
              skewAmount={5}
              easing="elastic"
            >
              {values.map((value, i) => (
                <Card
                  key={value.title}
                  className="!rounded-2xl !border-line bg-surface p-7"
                >
                  <span className="font-mono text-xs tracking-[0.2em] text-gold/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 text-2xl tracking-tight">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-dim">
                    {value.description}
                  </p>
                </Card>
              ))}
            </CardSwap>
          </div>
        )}
      </div>
    </section>
  );
}
