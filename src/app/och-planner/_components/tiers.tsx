import { ArrowRight, Check, MessageSquare } from "lucide-react";

import { BorderBeam } from "@/components/ui/border-beam";
import { CONTACT, CUSTOM_TIER, FIXED_TIERS, PRICING } from "../_content/offer";
import { Reveal } from "./reveal";

/**
 * Pricing.
 *
 * The two fixed tiers sit in the grid and feed the lead form. Custom is
 * deliberately NOT a third card: it is a separate band, below a divider, with
 * its own contact path. Custom needs human scoping by definition, so putting it
 * in the automated intake would defeat the point of having an automated intake.
 * The separation is structural here, not just a different button colour.
 */

const customEnquiryHref = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
    "Custom website — [your shop name]"
)}&body=${encodeURIComponent(
    "Tell us a bit about your shop:\n\n- Shop name:\n- Locations:\n- What you need that the standard packages don't cover:\n- Best number to reach you:\n"
)}`;

export function Tiers() {
    return (
        <section id="pricing" className="px-5 py-24 sm:px-8 sm:py-28">
            <div className="mx-auto max-w-5xl">
                <Reveal className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--och-blue-bright)]">
                        Pricing
                    </p>
                    <h2 className="mt-4 text-3xl font-bold text-[var(--och-text)] sm:text-4xl">
                        Two packages, one price each.
                    </h2>
                    <p className="mt-4 text-[var(--och-text-muted)]">
                        Paid once, up front. Hosting is ${PRICING.hostingMonthly}/month after launch —
                        the only recurring cost there is.
                    </p>
                </Reveal>

                <div className="mt-14 grid gap-6 md:grid-cols-2">
                    {FIXED_TIERS.map((tier, index) => (
                        <Reveal key={tier.id} delay={index * 0.08}>
                            <div
                                className={`relative flex h-full flex-col overflow-hidden rounded-2xl border p-8 ${
                                    tier.featured
                                        ? "border-[var(--och-blue)]/50 bg-gradient-to-b from-[var(--och-blue-deep)] to-[var(--och-surface)]"
                                        : "border-[var(--och-line)] bg-[var(--och-surface)]"
                                }`}
                            >
                                {tier.featured && (
                                    <>
                                        <span className="absolute right-6 top-8 rounded-full bg-[var(--och-blue)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                                            Most chosen
                                        </span>
                                        <BorderBeam
                                            size={140}
                                            duration={10}
                                            colorFrom="var(--och-blue)"
                                            colorTo="var(--och-blue-bright)"
                                        />
                                    </>
                                )}

                                <h3 className="text-lg font-semibold text-[var(--och-text)]">{tier.name}</h3>

                                <div className="mt-5 flex items-baseline gap-2">
                                    <span className="text-5xl font-bold tracking-tight text-[var(--och-text)]">
                                        {tier.price}
                                    </span>
                                    <span className="text-sm text-[var(--och-text-muted)]">one-time</span>
                                </div>

                                <p className="mt-3 text-[15px] text-[var(--och-text-muted)]">{tier.tagline}</p>

                                <ul className="mt-8 flex-1 space-y-3.5 border-t border-[var(--och-line)] pt-8">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex gap-3">
                                            <Check
                                                size={17}
                                                className="mt-0.5 shrink-0 text-[var(--och-blue-bright)]"
                                                aria-hidden="true"
                                            />
                                            <span className="text-[15px] leading-relaxed text-[var(--och-text)]/85">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <p className="mt-8 text-[13px] text-[var(--och-text-muted)]">
                                    + ${PRICING.hostingMonthly}/month hosting after launch
                                </p>

                                <a
                                    href="#start"
                                    className={`group mt-4 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold transition-colors ${
                                        tier.featured
                                            ? "bg-[var(--och-blue)] text-white hover:bg-[var(--och-blue-bright)]"
                                            : "border border-[var(--och-line)] text-[var(--och-text)] hover:border-white/25 hover:bg-white/[0.04]"
                                    }`}
                                >
                                    Choose {tier.name}
                                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                                </a>
                            </div>
                        </Reveal>
                    ))}
                </div>

                {/* --- Custom: separate band, separate contact path. --- */}
                <Reveal delay={0.12} className="mt-6">
                    <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-8">
                        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                            <div className="max-w-xl">
                                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                    <h3 className="text-lg font-semibold text-[var(--och-text)]">
                                        {CUSTOM_TIER.name}
                                    </h3>
                                    <span className="text-lg font-semibold text-[var(--och-text-muted)]">
                                        {CUSTOM_TIER.price}
                                    </span>
                                </div>
                                <p className="mt-2 text-[15px] text-[var(--och-text-muted)]">
                                    {CUSTOM_TIER.tagline}
                                </p>

                                <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                                    {CUSTOM_TIER.features.map((feature) => (
                                        <li
                                            key={feature}
                                            className="flex items-center gap-2 text-[14px] text-[var(--och-text)]/75"
                                        >
                                            <span
                                                aria-hidden="true"
                                                className="size-1 rounded-full bg-[var(--och-text-muted)]"
                                            />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="shrink-0 lg:text-right">
                                <a
                                    href={customEnquiryHref}
                                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-[15px] font-semibold text-[var(--och-text)] transition-colors hover:border-white/40 hover:bg-white/[0.06]"
                                >
                                    <MessageSquare size={16} />
                                    {CUSTOM_TIER.cta}
                                </a>
                                <p className="mt-3 max-w-[16rem] text-[13px] leading-relaxed text-[var(--och-text-muted)] lg:ml-auto">
                                    {CUSTOM_TIER.note}
                                </p>
                                {CONTACT.phone && (
                                    <a
                                        href={`tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`}
                                        className="mt-2 block text-[13px] text-[var(--och-text-muted)] underline-offset-4 hover:text-[var(--och-text)] hover:underline lg:text-right"
                                    >
                                        or call {CONTACT.phone}
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
