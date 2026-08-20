"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Mail } from "lucide-react";

import { Particles } from "@/components/ui/particles";
import { Magnetic } from "@/components/layout/magnetic";
import { contactDetails } from "@/content/site";
import { fadeUp, stagger, VIEWPORT } from "@/lib/motion";

export function CTA() {
  return (
    <section className="relative overflow-hidden border-t border-line py-32 sm:py-40">
      <Particles
        className="pointer-events-none absolute inset-0"
        quantity={90}
        ease={70}
        color="#f5c843"
        size={0.5}
        staticity={40}
      />

      {/* Single gold bloom behind the headline — the accent for this viewport. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[820px] max-w-[110vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(245,200,67,0.14),transparent)] blur-2xl"
      />

      <motion.div
        variants={stagger(0, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="relative mx-auto max-w-3xl px-6 text-center"
      >
        <motion.p variants={fadeUp} className="eyebrow mb-6">
          Next step
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="text-[clamp(2.25rem,6vw,4.25rem)]"
        >
          Ready to build something{" "}
          <span className="accent-serif">great</span>
          <span className="text-gold">?</span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-dim"
        >
          Tell us what you are trying to make happen. We will tell you honestly
          whether we are the right people to build it.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Magnetic>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-[#ffd75e]"
            >
              Start a project
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Magnetic>

          <Magnetic>
            <a
              href={`mailto:${contactDetails.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-7 py-3.5 text-sm text-text transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              <Mail className="size-4" />
              Email us directly
            </a>
          </Magnetic>
        </motion.div>

        <motion.p variants={fadeUp} className="mt-8 font-mono text-xs text-faint">
          {contactDetails.responseTime}
        </motion.p>
      </motion.div>
    </section>
  );
}
