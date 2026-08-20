"use client";

import Image from "next/image";
import { motion } from "motion/react";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiDotnet,
  SiStripe,
  SiFigma,
} from "react-icons/si";

import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { AnimatedList } from "@/components/ui/animated-list";
import { Terminal, AnimatedSpan, TypingAnimation } from "@/components/ui/terminal";
import { EASE, VIEWPORT } from "@/lib/motion";

/**
 * Graphics for the bento cards.
 *
 * Each one fills its card's graphic area edge to edge and keeps its subject in
 * the UPPER two-thirds: the card's frosted copy panel is pulled up over the
 * bottom ~6rem, so anything low in the frame ends up behind it.
 */

/** 01 — Platforms: a real shipped product. */
export function SaasVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src="/saas-gym.png"
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover object-left-top opacity-80 transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
    </div>
  );
}

const EVENTS = [
  { label: "Member checked in", meta: "Front desk · now", tone: "text-gold" },
  { label: "Payment succeeded", meta: "Stripe · $89.00", tone: "text-emerald-400" },
  { label: "Booking confirmed", meta: "Bay 3 · 14:30", tone: "text-gold" },
  { label: "Plan upgraded", meta: "Annual · +$420", tone: "text-emerald-400" },
];

/** 02 — Applications: things happening, live. */
export function RealtimeVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden px-8 pt-10">
      <AnimatedList delay={1800} className="gap-2.5">
        {EVENTS.map((event) => (
          <figure
            key={event.label}
            className="flex w-full items-center gap-3 rounded-xl border border-line bg-ink/80 px-4 py-3.5 backdrop-blur-sm"
          >
            <span className={`size-1.5 shrink-0 rounded-full bg-current ${event.tone}`} />
            <figcaption className="min-w-0 flex-1">
              <span className="block truncate text-[13px] text-text">{event.label}</span>
              <span className="block truncate font-mono text-[10px] text-faint">
                {event.meta}
              </span>
            </figcaption>
          </figure>
        ))}
      </AnimatedList>
    </div>
  );
}

const LOAD_TIMES = [
  { label: "Typical agency build", seconds: 4.1, width: "100%", tone: "bg-white/12" },
  { label: "A Phiro build", seconds: 0.8, width: "20%", tone: "bg-gold" },
];

/**
 * 03 — Websites.
 *
 * Was a circular Lighthouse gauge at 98/100, which read as a full ring with a
 * suspicious notch — the score was too good to visualise that way. A comparison
 * people can feel says more.
 */
export function PerformanceVisual() {
  return (
    <div className="absolute inset-0 flex flex-col justify-start gap-7 px-8 pt-14">
      {LOAD_TIMES.map((row, i) => (
        <div key={row.label}>
          <div className="mb-2.5 flex items-baseline justify-between">
            <span className="text-xs text-dim">{row.label}</span>
            <span className={`font-mono text-xs ${i === 1 ? "text-gold" : "text-faint"}`}>
              {row.seconds.toFixed(1)}s
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              className={`h-full rounded-full ${row.tone}`}
              initial={{ width: 0 }}
              whileInView={{ width: row.width }}
              viewport={VIEWPORT}
              transition={{ duration: 1.1, ease: EASE, delay: 0.15 + i * 0.15 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

const TOOL_ICONS = [SiFigma, SiReact, SiTypescript, SiTailwindcss];
const TOOL_ICONS_INNER = [SiNextdotjs, SiDotnet, SiStripe];

/** 04 — Design: the toolchain, orbiting. */
export function ToolchainVisual() {
  return (
    <div className="absolute inset-0 flex items-start justify-center overflow-hidden pt-10">
      {/*
        Explicit size, not a shrink-to-fit flex box. OrbitingCircles draws its
        orbit ring as an SVG at `absolute inset-0 size-full` with cx/cy at 50%,
        so a zero-size parent collapses the ring to nothing — the icons still
        orbit (they position off --radius) but the halos disappear.
        200px box + r=68 keeps the outer ring clear of the card's copy panel.
        The flex centering is load-bearing too: the orbiting items are absolute
        with auto insets, so their static position comes from the parent's
        align/justify. Without it they resolve to the parent's top-left corner
        while the ring stays centred, and the two come apart.
      */}
      <div className="relative flex size-[200px] items-center justify-center">
        <span className="absolute inset-0 grid place-items-center font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
          Phiro
        </span>

        <OrbitingCircles radius={68} duration={26} iconSize={28} path>
          {TOOL_ICONS.map((Icon, i) => (
            <span
              key={i}
              className="grid size-full place-items-center rounded-full border border-line bg-ink text-dim"
            >
              <Icon className="size-3.5" />
            </span>
          ))}
        </OrbitingCircles>

        <OrbitingCircles radius={40} duration={18} iconSize={24} reverse path>
          {TOOL_ICONS_INNER.map((Icon, i) => (
            <span
              key={i}
              className="grid size-full place-items-center rounded-full border border-gold/25 bg-ink text-gold/80"
            >
              <Icon className="size-3" />
            </span>
          ))}
        </OrbitingCircles>
      </div>
    </div>
  );
}

/** 05 — Partnership: what "we stay after launch" looks like. */
export function DeployVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden px-6 pt-8">
      <Terminal className="h-full max-h-none w-full max-w-none rounded-xl border border-line bg-ink/70 text-[11px]">
        <TypingAnimation className="text-dim" duration={40}>
          &gt; phiro deploy --prod
        </TypingAnimation>
        <AnimatedSpan delay={1400} className="text-faint">
          ✓ Types checked
        </AnimatedSpan>
        <AnimatedSpan delay={1900} className="text-faint">
          ✓ 0 vulnerabilities
        </AnimatedSpan>
        <AnimatedSpan delay={2400} className="text-faint">
          ✓ LCP 0.8s · CLS 0.00
        </AnimatedSpan>
        <AnimatedSpan delay={2900} className="text-gold">
          ✓ Live in 41s
        </AnimatedSpan>
        <AnimatedSpan delay={3400} className="text-emerald-400">
          → Monitoring active
        </AnimatedSpan>
      </Terminal>
    </div>
  );
}

/** Indexed by the `index` field in `content/site.ts`. */
export const SERVICE_VISUALS: Record<string, () => React.JSX.Element> = {
  "01": SaasVisual,
  "02": RealtimeVisual,
  "03": PerformanceVisual,
  "04": ToolchainVisual,
  "05": DeployVisual,
};
