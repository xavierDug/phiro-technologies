import { LeadForm } from "./lead-form";
import { Reveal } from "./reveal";

export function StartSection() {
    return (
        <section
            id="start"
            className="relative overflow-hidden border-t border-[var(--och-line)] bg-[var(--och-surface)] px-5 py-24 sm:px-8 sm:py-28"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0 h-[26rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--och-blue)] opacity-[0.16] blur-[120px]"
            />

            <div className="relative mx-auto max-w-2xl">
                <Reveal className="text-center">
                    <h2 className="text-3xl font-bold text-[var(--och-text)] sm:text-4xl">
                        Let’s get your shop online.
                    </h2>
                    <p className="mx-auto mt-4 max-w-md text-[var(--och-text-muted)]">
                        Five fields. We’ll come back to you within one business day with what
                        happens next.
                    </p>
                </Reveal>

                <Reveal delay={0.1} className="mt-10">
                    <LeadForm />
                </Reveal>
            </div>
        </section>
    );
}
