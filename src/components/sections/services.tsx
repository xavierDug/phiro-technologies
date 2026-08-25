"use client";

import { motion } from "motion/react";

import { BentoCard } from "@/components/ui/bento";
import { SectionHeading } from "@/components/sections/section-heading";
import { SERVICE_VISUALS } from "@/components/sections/service-visuals";
import { getSiteContent } from "@/content/site";
import { useLocale } from "@/components/layout/locale-provider";
import { cn } from "@/lib/utils";
import { fadeUp, stagger, VIEWPORT } from "@/lib/motion";

/**
 * Six-column bento: 3 + 3 on the first row, 2 + 2 + 2 on the second.
 *
 * Replaces a denser grid that carried an index, a title, a paragraph, three pill
 * tags AND a visual on every card. The information was right; there was just too
 * much of it per tile to read as anything but cramped. Here the graphic does the
 * explaining and the copy is three short elements on a frosted panel over it.
 *
 * Corner rounding is applied only on the grid's four outer corners, so the set
 * reads as one slab rather than five loose cards.
 */
const CORNERS: Record<string, string> = {
  "01": "max-lg:rounded-t-3xl lg:rounded-tl-3xl",
  "02": "lg:rounded-tr-3xl",
  "03": "lg:rounded-bl-3xl",
  "05": "max-lg:rounded-b-3xl lg:rounded-br-3xl",
};

export function Services() {
  const { locale, dict } = useLocale();
  const copy = dict.sections.services;
  const { services } = getSiteContent(locale);

  return (
    <section className="relative border-t border-line py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          accent={copy.accent}
          description={copy.description}
        />

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-16 grid grid-cols-1 gap-4 lg:grid-cols-6"
        >
          {services.map((service) => {
            const Visual = SERVICE_VISUALS[service.index];

            return (
              <motion.div
                key={service.index}
                variants={fadeUp}
                className={cn(
                  service.span === 3 ? "lg:col-span-3" : "lg:col-span-2",
                  "flex"
                )}
              >
                <BentoCard
                  className={cn("w-full", CORNERS[service.index])}
                  eyebrow={service.eyebrow}
                  title={service.title}
                  description={service.description}
                  graphic={Visual ? <Visual /> : undefined}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
