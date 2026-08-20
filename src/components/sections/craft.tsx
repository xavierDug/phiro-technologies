"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";

import { useReducedMotion } from "@/lib/use-reduced-motion";
import { EASE, fadeUp, stagger, VIEWPORT } from "@/lib/motion";

const POINTS = [
  "Designed and built by the same people",
  "Typed end to end, from database to button",
  "Ships fast on a phone, on real networks",
  "Handed over documented, not abandoned",
];

/**
 * The site's one light band — a deliberate inversion between two dark sections.
 *
 * It exists because the device photograph has a baked-in light background
 * (sampled: #f2f2f2 at the top, #e9e9e9 at the bottom) and no alpha channel.
 * Rather than fight that with blend modes or a feathered mask — both of which
 * leave a visible tonal rectangle on a black page — the section adopts the
 * photo's own background as its surface, so the image has no edges to see.
 *
 * The inversion is also useful on its own: three dark sections in a row is
 * where a long page starts to feel like one endless scroll.
 *
 * Gold has to change value here. `--gold` (#F5C843) sits at roughly 1.7:1 on
 * this surface — invisible. The deeper bronze below is the same hue family at a
 * value that actually reads on light.
 */
const LIGHT_GOLD = "#8A5A1F";

export function Craft() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Small drift only. The photo's background is a vertical gradient, so moving
  // it far would slide its lighter top against the section's darker bottom.
  const deviceY = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f3f3f3_0%,#eeeeee_55%,#e9e9e9_100%)] py-28 text-[#111113] sm:py-36 lg:min-h-[680px]"
    >
      {/* Hairlines mark the inversion as intentional rather than as a gap. */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-8">
        <div>
          <motion.div
            variants={stagger()}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <motion.div variants={fadeUp} className="mb-5 flex items-center gap-3">
              <span
                className="h-px w-8"
                style={{ backgroundColor: `${LIGHT_GOLD}80` }}
              />
              <span
                className="font-mono text-[11px] uppercase tracking-[0.22em]"
                style={{ color: "#6b6b70" }}
              >
                The craft
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="max-w-[16ch] text-[clamp(2rem,4.6vw,3.6rem)]"
            >
              Built for every screen it{" "}
              <span
                className="font-serif italic"
                style={{ color: LIGHT_GOLD, fontWeight: 400 }}
              >
                lands on
              </span>
              <span style={{ color: LIGHT_GOLD }}>.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-md text-lg leading-relaxed text-[#4b4b52]"
            >
              One team, one codebase, one standard — whether it opens on a laptop
              at a desk or a phone on a shop floor.
            </motion.p>
          </motion.div>

          <motion.ul
            variants={stagger(0.15, 0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="mt-9 space-y-3.5"
          >
            {POINTS.map((point) => (
              <motion.li
                key={point}
                variants={fadeUp}
                className="flex items-start gap-3 text-[15px] text-[#4b4b52]"
              >
                <span
                  className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full"
                  style={{
                    backgroundColor: `${LIGHT_GOLD}1a`,
                    border: `1px solid ${LIGHT_GOLD}59`,
                  }}
                >
                  <Check className="size-3" strokeWidth={3} style={{ color: LIGHT_GOLD }} />
                </span>
                {point}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="mt-10"
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-transform duration-300 hover:-translate-y-0.5"
              style={{ backgroundColor: "#111113" }}
            >
              See it in production
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>

      </div>

      {/*
        The shot bleeds off the top, bottom and right of the section rather than
        sitting inside the grid, so there is no rectangle edge to notice.
        The remaining interior edges fade to TRANSPARENT rather than to white:
        the section background is a vertical gradient, so a white overlay would
        be the right tone at the top and visibly wrong by the bottom. Fading to
        transparent lets whatever the background is at that height show through.
      */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 1, ease: EASE }}
        className={[
          "relative mt-14 h-[300px] overflow-hidden sm:h-[420px]",
          // Wider at lg, where the panel is narrowest relative to the section
          // height and therefore crops hardest.
          "lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:h-auto lg:w-[58%] xl:w-[54%]",
          // Mobile: the image is full width, so only the top and bottom need easing.
          "[mask-image:linear-gradient(to_bottom,transparent_0%,black_14%,black_86%,transparent_100%)]",
          // Desktop: feather the inner (left) edge hardest — that is the one
          // sitting against the copy. Right edge is left alone; it runs off-screen.
          "lg:[mask-image:linear-gradient(to_right,transparent_0%,black_10%),linear-gradient(to_bottom,transparent_0%,black_16%,black_84%,transparent_100%)]",
          "lg:[mask-composite:intersect] lg:[-webkit-mask-composite:source-in]",
        ].join(" ")}
      >
        {/* Warm bloom under the devices — ties the shot's green UI back to the
            brand without recolouring the product itself. */}
        <div
          className="pointer-events-none absolute inset-0 z-10 blur-3xl"
          style={{
            background:
              "radial-gradient(55% 50% at 50% 55%, rgba(201,150,46,0.20), transparent 70%)",
          }}
        />

        {/* Oversized so the parallax drift can never pull an edge into frame. */}
        <motion.div
          style={reduced ? undefined : { y: deviceY }}
          className="absolute -inset-y-[8%] inset-x-0"
        >
          <Image
            src="/mutli-device-mock.png"
            alt="A Phiro dashboard running on a laptop, tablet and phone"
            fill
            sizes="(max-width: 1024px) 100vw, 54vw"
            // object-center cropped both sides equally, so narrowing the panel
            // ate into the laptop on the left. Anchoring left keeps the image's
            // left edge intact and takes the crop off the right — the edge that
            // bleeds off-screen anyway.
            className="object-cover object-center lg:object-left"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
