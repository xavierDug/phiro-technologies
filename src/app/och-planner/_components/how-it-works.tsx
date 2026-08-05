import { STEPS } from "../_content/offer";
import { Reveal } from "./reveal";

/**
 * Sets the expectation that this is fast and mostly automated — which is the
 * actual differentiator against a local web shop quoting six weeks.
 */
export function HowItWorks() {
    return (
        <section className="border-y border-[var(--och-line)] bg-[var(--och-surface)] px-5 py-24 sm:px-8 sm:py-28">
            <div className="mx-auto max-w-5xl">
                <Reveal className="max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--och-blue-bright)]">
                        How it works
                    </p>
                    <h2 className="mt-4 text-3xl font-bold text-[var(--och-text)] sm:text-4xl">
                        Four steps. You do one of them.
                    </h2>
                </Reveal>

                <ol className="mt-14 grid gap-y-10 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4 lg:gap-x-7">
                    {STEPS.map((step, index) => (
                        <Reveal key={step.title} delay={index * 0.08}>
                            <li className="relative">
                                <div className="flex items-center gap-3">
                                    <span className="grid size-9 shrink-0 place-items-center rounded-full border border-[var(--och-blue)]/40 bg-[var(--och-blue-wash)] text-sm font-semibold text-[var(--och-blue-bright)]">
                                        {index + 1}
                                    </span>
                                    {/* Connector, desktop only — it reads as a stray line when stacked. */}
                                    <span
                                        aria-hidden="true"
                                        className={`h-px flex-1 bg-gradient-to-r from-[var(--och-line)] to-transparent ${
                                            index === STEPS.length - 1 ? "lg:hidden" : "hidden lg:block"
                                        }`}
                                    />
                                </div>
                                <h3 className="mt-5 text-lg font-semibold text-[var(--och-text)]">
                                    {step.title}
                                </h3>
                                <p className="mt-2 text-[15px] leading-relaxed text-[var(--och-text-muted)]">
                                    {step.body}
                                </p>
                            </li>
                        </Reveal>
                    ))}
                </ol>
            </div>
        </section>
    );
}
