import { Plus } from "lucide-react";

import { FAQ } from "../_content/offer";
import { Reveal } from "./reveal";

/**
 * Built on native <details>/<summary>: keyboard-accessible and screen-reader
 * correct for free, and it ships no JavaScript for something that is only ever
 * open-or-closed.
 */
export function Faq() {
    return (
        <section className="px-5 py-24 sm:px-8 sm:py-28">
            <div className="mx-auto max-w-3xl">
                <Reveal className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--och-blue-bright)]">
                        Questions
                    </p>
                    <h2 className="mt-4 text-3xl font-bold text-[var(--och-text)] sm:text-4xl">
                        The things shop owners ask us.
                    </h2>
                </Reveal>

                <div className="mt-14 divide-y divide-[var(--och-line)] border-y border-[var(--och-line)]">
                    {FAQ.map((item, index) => (
                        <Reveal key={item.question} delay={Math.min(index, 3) * 0.06}>
                            <details className="group">
                                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-[17px] font-semibold text-[var(--och-text)] transition-colors hover:text-[var(--och-blue-bright)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--och-blue-bright)] [&::-webkit-details-marker]:hidden">
                                    {item.question}
                                    <Plus
                                        size={19}
                                        aria-hidden="true"
                                        className="shrink-0 text-[var(--och-text-muted)] transition-transform duration-200 group-open:rotate-45"
                                    />
                                </summary>
                                <p className="pb-6 pr-10 text-[15px] leading-relaxed text-[var(--och-text-muted)]">
                                    {item.answer}
                                </p>
                            </details>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
