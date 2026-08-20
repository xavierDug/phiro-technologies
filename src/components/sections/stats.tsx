"use client";

import { motion } from "motion/react";

import { NumberTicker } from "@/components/ui/number-ticker";
import { stats } from "@/content/site";
import { fadeUp, stagger, VIEWPORT } from "@/lib/motion";

export function Stats() {
  return (
    <section className="border-t border-line py-20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.dl
          variants={stagger(0, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp}>
              <dt className="eyebrow mb-3">{stat.label}</dt>
              <dd className="flex items-baseline font-display text-[clamp(2.5rem,5vw,3.75rem)] leading-none tracking-tight">
                {stat.prefix}
                <NumberTicker value={stat.value} className="text-text" />
                <span className="text-gold">{stat.suffix}</span>
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
