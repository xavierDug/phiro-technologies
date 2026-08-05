import { ArrowRight } from "lucide-react";

import { DotPattern } from "@/components/ui/dot-pattern";
import { HERO, PRICING } from "../_content/offer";
import { Reveal } from "./reveal";

export function OchHero() {
    return (
        <section className="relative overflow-hidden px-5 pb-24 pt-20 sm:px-8 sm:pb-28 sm:pt-28">
            <DotPattern
                width={28}
                height={28}
                cr={1}
                className="text-white/[0.07] [mask-image:radial-gradient(520px_circle_at_center_top,white,transparent)]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-[-14rem] h-[34rem] w-[52rem] -translate-x-1/2 rounded-full bg-[var(--och-blue)] opacity-[0.18] blur-[130px]"
            />

            <div className="relative mx-auto max-w-3xl text-center">
                <Reveal>
                    <span className="inline-flex items-center rounded-full border border-[var(--och-line)] bg-[var(--och-blue-wash)] px-3.5 py-1.5 text-[13px] font-medium text-[var(--och-blue-bright)]">
                        {HERO.eyebrow}
                    </span>
                </Reveal>

                <Reveal delay={0.08}>
                    <h1 className="mt-7 text-[2.5rem] font-bold leading-[1.06] text-[var(--och-text)] sm:text-6xl">
                        {HERO.headline}
                    </h1>
                </Reveal>

                <Reveal delay={0.16}>
                    <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--och-text-muted)]">
                        {HERO.subhead}
                    </p>
                </Reveal>

                <Reveal delay={0.24}>
                    <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <a
                            href="#start"
                            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--och-blue)] px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[var(--och-blue-bright)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--och-blue-bright)] sm:w-auto"
                        >
                            {HERO.primaryCta}
                            <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
                        </a>
                        <a
                            href="#demo"
                            className="inline-flex w-full items-center justify-center rounded-full border border-[var(--och-line)] px-7 py-3.5 text-[15px] font-semibold text-[var(--och-text)] transition-colors hover:border-white/25 hover:bg-white/[0.04] sm:w-auto"
                        >
                            {HERO.secondaryCta}
                        </a>
                    </div>
                </Reveal>

                {/* The recurring costs get named up front, not after signup. */}
                <Reveal delay={0.32}>
                    <p className="mt-8 text-sm text-[var(--och-text-muted)]">
                        From $600 one-time
                        <span className="mx-2 text-white/20">·</span>
                        ${PRICING.hostingMonthly}/month hosting
                        <span className="mx-2 text-white/20">·</span>
                        cancel any time
                    </p>
                </Reveal>
            </div>
        </section>
    );
}
