import { BOUNDARIES } from "../_content/offer";
import { Reveal } from "./reveal";

/**
 * The ongoing costs, stated on the page before signup rather than discovered
 * in a contract later. Naming the $200 change fee here is what makes it work as
 * a friction valve instead of landing as a surprise.
 */
export function Boundaries() {
    return (
        <section className="border-y border-[var(--och-line)] bg-[var(--och-surface)] px-5 py-24 sm:px-8 sm:py-28">
            <div className="mx-auto max-w-5xl">
                <Reveal className="max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--och-blue-bright)]">
                        What it costs to keep
                    </p>
                    <h2 className="mt-4 text-3xl font-bold text-[var(--och-text)] sm:text-4xl">
                        Every number, before you commit.
                    </h2>
                    <p className="mt-4 text-[var(--och-text-muted)]">
                        You should know what this costs in month twelve, not just on day one.
                    </p>
                </Reveal>

                <dl className="mt-14 grid gap-6 md:grid-cols-3">
                    {BOUNDARIES.map((item, index) => (
                        <Reveal key={item.label} delay={index * 0.08}>
                            <div className="h-full rounded-2xl border border-[var(--och-line)] bg-[var(--och-surface-raised)] p-7">
                                <dt className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--och-text-muted)]">
                                    {item.label}
                                </dt>
                                <dd>
                                    <p className="mt-3 text-2xl font-bold text-[var(--och-text)]">{item.value}</p>
                                    <p className="mt-3 text-[15px] leading-relaxed text-[var(--och-text-muted)]">
                                        {item.body}
                                    </p>
                                </dd>
                            </div>
                        </Reveal>
                    ))}
                </dl>
            </div>
        </section>
    );
}
