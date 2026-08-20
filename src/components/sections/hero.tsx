"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, ArrowDown } from "lucide-react";

import Aurora from "@/components/ui/Aurora";
import SplitText from "@/components/ui/SplitText";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { NoiseTexture } from "@/components/ui/noise-texture";
import { Magnetic } from "@/components/layout/magnetic";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { EASE } from "@/lib/motion";

/** Gold ramp fed to the Aurora shader — brand gold, deepened at both ends. */
const AURORA_STOPS = ["#C9962E", "#F5C843", "#8A5A1F"];

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Background layer */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {reduced ? (
          // Static stand-in: same composition, no WebGL context, no animation.
          <div className="absolute inset-x-0 top-0 h-[60vh] bg-[radial-gradient(60%_100%_at_50%_0%,rgba(245,200,67,0.22),transparent_70%)]" />
        ) : (
          <div className="absolute inset-x-0 top-0 h-[70vh] opacity-90">
            <Aurora colorStops={AURORA_STOPS} amplitude={1.1} blend={0.55} speed={0.6} />
          </div>
        )}

        {/* Fade the aurora into the page rather than cutting it off. */}
        <div className="absolute inset-x-0 top-[45vh] h-[35vh] bg-gradient-to-b from-transparent to-ink" />
        <NoiseTexture className="absolute inset-0 opacity-[0.035]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          className="mb-8 flex"
        >
          <div className="group flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-4 py-1.5 backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-gold shadow-[0_0_10px_2px_rgba(245,200,67,0.6)]" />
            <AnimatedShinyText className="text-xs tracking-wide">
              Available for new projects
            </AnimatedShinyText>
          </div>
        </motion.div>

        <h1 className="max-w-[16ch] text-[clamp(2.9rem,8.5vw,6.5rem)]">
          {reduced ? (
            <span className="block">Purpose,</span>
          ) : (
            <SplitText
              tag="span"
              text="Purpose,"
              className="block"
              delay={28}
              duration={1}
              ease="power4.out"
              splitType="chars"
              from={{ opacity: 0, y: 60, rotateX: -60 }}
              to={{ opacity: 1, y: 0, rotateX: 0 }}
            />
          )}
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.45 }}
            className="block"
          >
            <span className="accent-serif">Engineered</span>
            <span className="text-gold">.</span>
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
          className="mt-8 max-w-lg text-lg leading-relaxed text-dim"
        >
          We design and build smart, scalable software for companies that need it
          to still make sense in three years.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.72 }}
          className="mt-11 flex flex-wrap items-center gap-3"
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
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-7 py-3.5 text-sm text-text transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              See our work
            </Link>
          </Magnetic>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute inset-x-0 bottom-8 flex justify-center"
        aria-hidden="true"
      >
        <motion.div
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="eyebrow">Scroll</span>
          <ArrowDown className="size-4 text-faint" />
        </motion.div>
      </motion.div>
    </section>
  );
}
