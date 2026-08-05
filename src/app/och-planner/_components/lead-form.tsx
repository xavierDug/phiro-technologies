"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

import { FIXED_TIERS, PRICING } from "../_content/offer";

/**
 * Lead capture for the two fixed tiers.
 *
 * Deliberately short: this is cold traffic, and every extra field is drop-off.
 * It captures enough to reply and nothing more — the full AI intake happens in
 * the follow-up, not here. The Custom tier never reaches this form.
 */

const ENDPOINT = "/api/leads/och-planner";

type Status = "idle" | "submitting" | "success" | "error";

interface SubmitResponse {
    ok: boolean;
    errors?: Record<string, string>;
}

const inputClasses =
    "w-full rounded-xl border border-[var(--och-line)] bg-[var(--och-ink)] px-4 py-3 text-[15px] text-[var(--och-text)] placeholder:text-white/25 transition-colors focus:border-[var(--och-blue)] focus:outline-none";

function FieldError({ message }: { message?: string }) {
    if (!message) return null;
    return <p className="mt-1.5 text-[13px] text-red-400">{message}</p>;
}

export function LeadForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<Status>("idle");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [tier, setTier] = useState<string>("");

    /**
     * Read the campaign parameters once, on mount, from the URL the cold email
     * landed on. Held in a ref rather than read at submit time so a later
     * in-page navigation can't wipe the attribution.
     */
    const source = useRef({ utmSource: "", utmMedium: "", utmCampaign: "" });
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        source.current = {
            utmSource: params.get("utm_source") ?? "",
            utmMedium: params.get("utm_medium") ?? "",
            utmCampaign: params.get("utm_campaign") ?? "",
        };
    }, []);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (status === "submitting") return;

        setStatus("submitting");
        setErrors({});

        const data = new FormData(event.currentTarget);
        const payload = {
            businessName: data.get("businessName"),
            contactName: data.get("contactName"),
            email: data.get("email"),
            phone: data.get("phone"),
            tier: data.get("tier"),
            note: data.get("note"),
            company: data.get("company"), // honeypot
            ...source.current,
        };

        try {
            const response = await fetch(ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const result = (await response.json().catch(() => ({ ok: false }))) as SubmitResponse;

            if (!response.ok || !result.ok) {
                setErrors(result.errors ?? { form: "Something went wrong. Please try again." });
                setStatus("error");
                return;
            }

            formRef.current?.reset();
            setTier("");
            setStatus("success");
        } catch {
            setErrors({ form: "Couldn't reach us — check your connection and try again." });
            setStatus("error");
        }
    }

    if (status === "success") {
        return (
            <div className="rounded-2xl border border-[var(--och-blue)]/40 bg-[var(--och-blue-wash)] p-10 text-center">
                <div className="mx-auto grid size-12 place-items-center rounded-full bg-[var(--och-blue)]">
                    <Check size={24} className="text-white" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-[var(--och-text)]">Got it.</h3>
                <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-[var(--och-text-muted)]">
                    We’ll be in touch within one business day with the next step. Nothing else is
                    needed from you right now.
                </p>
            </div>
        );
    }

    return (
        <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className="rounded-2xl border border-[var(--och-line)] bg-[var(--och-surface)] p-6 sm:p-9"
        >
            {/* Honeypot: hidden from people, irresistible to bots. */}
            <div aria-hidden="true" className="h-0 w-0 overflow-hidden">
                <label htmlFor="company">Company</label>
                <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor="businessName" className="mb-2 block text-[14px] font-medium text-[var(--och-text)]">
                        Shop name
                    </label>
                    <input
                        id="businessName"
                        name="businessName"
                        type="text"
                        autoComplete="organization"
                        placeholder="Garage Tremblay"
                        className={inputClasses}
                    />
                    <FieldError message={errors.businessName} />
                </div>

                <div>
                    <label htmlFor="contactName" className="mb-2 block text-[14px] font-medium text-[var(--och-text)]">
                        Your name
                    </label>
                    <input
                        id="contactName"
                        name="contactName"
                        type="text"
                        autoComplete="name"
                        placeholder="Marc Tremblay"
                        className={inputClasses}
                    />
                    <FieldError message={errors.contactName} />
                </div>

                <div>
                    <label htmlFor="email" className="mb-2 block text-[14px] font-medium text-[var(--och-text)]">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        placeholder="you@yourshop.com"
                        className={inputClasses}
                    />
                    <FieldError message={errors.email} />
                </div>

                <div>
                    <label htmlFor="phone" className="mb-2 block text-[14px] font-medium text-[var(--och-text)]">
                        Phone
                    </label>
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        placeholder="(514) 555-0134"
                        className={inputClasses}
                    />
                    <FieldError message={errors.phone} />
                </div>
            </div>

            <fieldset className="mt-7">
                <legend className="mb-3 text-[14px] font-medium text-[var(--och-text)]">
                    Which package?
                </legend>
                <div className="grid gap-3 sm:grid-cols-2">
                    {FIXED_TIERS.map((option) => (
                        <label
                            key={option.id}
                            className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-4 py-3.5 transition-colors has-[:focus-visible]:border-[var(--och-blue)] ${
                                tier === option.id
                                    ? "border-[var(--och-blue)] bg-[var(--och-blue-wash)]"
                                    : "border-[var(--och-line)] bg-[var(--och-ink)] hover:border-white/20"
                            }`}
                        >
                            <span className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    name="tier"
                                    value={option.id}
                                    checked={tier === option.id}
                                    onChange={(event) => setTier(event.target.value)}
                                    className="size-4 accent-[var(--och-blue)]"
                                />
                                <span className="text-[15px] font-medium text-[var(--och-text)]">
                                    {option.name}
                                </span>
                            </span>
                            <span className="text-[15px] font-semibold text-[var(--och-text-muted)]">
                                {option.price}
                            </span>
                        </label>
                    ))}
                </div>
                <FieldError message={errors.tier} />
            </fieldset>

            <div className="mt-7">
                <label htmlFor="note" className="mb-2 block text-[14px] font-medium text-[var(--och-text)]">
                    Anything we should know?{" "}
                    <span className="font-normal text-[var(--och-text-muted)]">Optional</span>
                </label>
                <textarea
                    id="note"
                    name="note"
                    rows={3}
                    placeholder="Do you have a site already? Photos? A deadline?"
                    className={`${inputClasses} resize-y`}
                />
                <FieldError message={errors.note} />
            </div>

            {errors.form && (
                <p role="alert" className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-[14px] text-red-300">
                    {errors.form}
                </p>
            )}

            <button
                type="submit"
                disabled={status === "submitting"}
                className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--och-blue)] px-7 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-[var(--och-blue-bright)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--och-blue-bright)] disabled:cursor-not-allowed disabled:opacity-60"
            >
                {status === "submitting" ? (
                    <>
                        <Loader2 size={17} className="animate-spin" aria-hidden="true" />
                        Sending
                    </>
                ) : (
                    <>
                        Send my details
                        <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
                    </>
                )}
            </button>

            <p className="mt-4 text-center text-[13px] leading-relaxed text-[var(--och-text-muted)]">
                No payment now, and nothing is committed. Hosting is ${PRICING.hostingMonthly}/month
                once your site is live.
            </p>
        </form>
    );
}
