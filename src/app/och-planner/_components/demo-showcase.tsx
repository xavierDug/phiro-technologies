import { ExternalLink } from "lucide-react";

import { BorderBeam } from "@/components/ui/border-beam";
import { Safari } from "@/components/ui/safari";
import { DEMO } from "../_content/offer";
import { Reveal } from "./reveal";

/**
 * The one piece of real proof available today. There is no client portfolio
 * under this offer yet, so this section carries all of the proof-of-work
 * weight — hence the size and the live link.
 */
export function DemoShowcase() {
    return (
        <section id="demo" className="relative px-5 py-24 sm:px-8 sm:py-28">
            <div className="mx-auto max-w-5xl">
                <Reveal className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--och-blue-bright)]">
                        A real one
                    </p>
                    <h2 className="mt-4 text-3xl font-bold text-[var(--och-text)] sm:text-4xl">
                        This is what your shop could look like.
                    </h2>
                    <p className="mt-4 text-[var(--och-text-muted)]">
                        Not a mockup — a live site, built the same way yours would be. Open it on
                        your phone and see how it behaves.
                    </p>
                </Reveal>

                <Reveal delay={0.1} className="mt-14">
                    <a
                        href={DEMO.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative block overflow-hidden rounded-2xl border border-[var(--och-line)] bg-[var(--och-surface)] p-2 transition-colors hover:border-white/20 sm:p-3"
                    >
                        <Safari url={DEMO.displayUrl} imageSrc={DEMO.screenshot} className="w-full" />
                        <BorderBeam
                            size={190}
                            duration={9}
                            borderWidth={1.5}
                            colorFrom="var(--och-blue)"
                            colorTo="var(--och-blue-bright)"
                        />
                    </a>
                </Reveal>

                <Reveal delay={0.16} className="mt-8 text-center">
                    <a
                        href={DEMO.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[15px] font-semibold text-[var(--och-blue-bright)] underline-offset-4 hover:underline"
                    >
                        Open the live demo
                        <ExternalLink size={15} />
                    </a>
                </Reveal>
            </div>
        </section>
    );
}
