"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Loader2, Send } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";
import {
    BUDGET_IDS,
    BUDGET_LABELS,
    PROJECT_TYPE_IDS,
    PROJECT_TYPE_LABELS,
    TIMELINE_IDS,
    TIMELINE_LABELS,
    type BudgetId,
    type ProjectTypeId,
    type TimelineId,
} from "@/server/contact/contact.dto";

interface FormState {
    name: string;
    email: string;
    company: string;
    projectType: ProjectTypeId | "";
    budget: BudgetId | "";
    timeline: TimelineId | "";
    message: string;
    /** Honeypot. Hidden from humans; bots fill it in. */
    website: string;
}

const EMPTY: FormState = {
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
    website: "",
};

const STEPS = ["Project", "Scope", "Details"] as const;

/** Mirrors the server validator so people are not told about mistakes late. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function OptionGrid<T extends string>({
    options,
    labels,
    value,
    onChange,
    name,
}: {
    options: readonly T[];
    labels: Record<T, string>;
    value: T | "";
    onChange: (value: T) => void;
    name: string;
}) {
    return (
        <div role="radiogroup" aria-label={name} className="grid gap-2.5 sm:grid-cols-2">
            {options.map((option) => {
                const selected = value === option;
                return (
                    <button
                        key={option}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => onChange(option)}
                        className={cn(
                            "flex items-center justify-between rounded-xl border px-4 py-3.5 text-left text-sm transition-all duration-300",
                            selected
                                ? "border-gold/60 bg-gold/10 text-text"
                                : "border-line bg-surface/50 text-dim hover:border-line-strong hover:text-text"
                        )}
                    >
                        {labels[option]}
                        <span
                            className={cn(
                                "grid size-4 shrink-0 place-items-center rounded-full border transition-colors",
                                selected ? "border-gold bg-gold" : "border-line-strong"
                            )}
                        >
                            {selected && <Check className="size-2.5 text-ink" strokeWidth={4} />}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}

function FieldError({ message }: { message?: string }) {
    if (!message) return null;
    return <p className="mt-2 text-xs text-red-400">{message}</p>;
}

export function ContactForm() {
    const [step, setStep] = useState(0);
    const [form, setForm] = useState<FormState>(EMPTY);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);
    const [done, setDone] = useState(false);

    function update<K extends keyof FormState>(key: K, value: FormState[K]) {
        setForm((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => {
            if (!prev[key]) return prev;
            const next = { ...prev };
            delete next[key as string];
            return next;
        });
    }

    /** Validates only the fields on the current step, so errors arrive in context. */
    function validateStep(index: number): boolean {
        const found: Record<string, string> = {};

        if (index === 0) {
            if (!form.projectType) found.projectType = "Pick the closest match.";
        }

        if (index === 1) {
            if (!form.budget) found.budget = "A rough range is fine.";
            if (!form.timeline) found.timeline = "Roughly when are you hoping to start?";
        }

        if (index === 2) {
            if (!form.name.trim()) found.name = "Tell us who we're speaking with.";
            if (!form.email.trim()) {
                found.email = "We need an email to reply to.";
            } else if (!EMAIL_PATTERN.test(form.email.trim())) {
                found.email = "That email doesn't look right.";
            }
            if (form.message.trim().length < 10) {
                found.message = "A sentence or two would help.";
            }
        }

        setErrors(found);
        return Object.keys(found).length === 0;
    }

    function next() {
        if (validateStep(step)) setStep((s) => Math.min(s + 1, STEPS.length - 1));
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (!validateStep(2)) return;

        setSubmitting(true);
        try {
            const response = await fetch("/api/leads/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = (await response.json().catch(() => null)) as {
                ok?: boolean;
                errors?: Record<string, string>;
            } | null;

            if (!response.ok || !data?.ok) {
                const serverErrors = data?.errors ?? {
                    form: "Something went wrong. Please try again.",
                };
                setErrors(serverErrors);
                toast.error(serverErrors.form ?? "Please check the highlighted fields.");
                return;
            }

            setDone(true);
        } catch {
            const message = "Could not reach the server. Check your connection.";
            setErrors({ form: message });
            toast.error(message);
        } finally {
            setSubmitting(false);
        }
    }

    if (done) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="rounded-2xl border border-gold/30 bg-gold/[0.04] p-10 text-center"
            >
                <span className="mx-auto grid size-14 place-items-center rounded-full bg-gold/15">
                    <Check className="size-6 text-gold" />
                </span>
                <h2 className="mt-6 text-2xl tracking-tight">Message sent</h2>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-dim">
                    Thanks {form.name.split(" ")[0]} — we&apos;ve got it. You&apos;ll hear
                    back within one business day, usually sooner.
                </p>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="relative">
            {/* Progress */}
            <div className="mb-10">
                <div className="mb-4 flex items-center justify-between">
                    {STEPS.map((label, i) => (
                        <span
                            key={label}
                            className={cn(
                                "font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-300",
                                i === step ? "text-gold" : i < step ? "text-dim" : "text-faint"
                            )}
                        >
                            {String(i + 1).padStart(2, "0")} {label}
                        </span>
                    ))}
                </div>
                <div className="h-px w-full bg-line">
                    <motion.div
                        className="h-px bg-gold"
                        initial={false}
                        animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                        transition={{ duration: 0.5, ease: EASE }}
                    />
                </div>
            </div>

            {/* Honeypot: off-screen rather than display:none, which some bots skip. */}
            <div aria-hidden="true" className="absolute -left-[9999px] top-0">
                <label htmlFor="website">Website</label>
                <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={(e) => update("website", e.target.value)}
                />
            </div>

            <div className="min-h-[340px]">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -24 }}
                        transition={{ duration: 0.35, ease: EASE }}
                    >
                        {step === 0 && (
                            <fieldset>
                                <legend className="mb-1 text-xl tracking-tight">
                                    What are you building?
                                </legend>
                                <p className="mb-6 text-sm text-dim">
                                    Closest match is fine — we&apos;ll figure out the rest together.
                                </p>
                                <OptionGrid
                                    name="Project type"
                                    options={PROJECT_TYPE_IDS}
                                    labels={PROJECT_TYPE_LABELS}
                                    value={form.projectType}
                                    onChange={(value) => update("projectType", value)}
                                />
                                <FieldError message={errors.projectType} />
                            </fieldset>
                        )}

                        {step === 1 && (
                            <div className="space-y-8">
                                <fieldset>
                                    <legend className="mb-1 text-xl tracking-tight">
                                        Rough budget?
                                    </legend>
                                    <p className="mb-6 text-sm text-dim">
                                        This shapes what we can honestly recommend. No wrong answer.
                                    </p>
                                    <OptionGrid
                                        name="Budget"
                                        options={BUDGET_IDS}
                                        labels={BUDGET_LABELS}
                                        value={form.budget}
                                        onChange={(value) => update("budget", value)}
                                    />
                                    <FieldError message={errors.budget} />
                                </fieldset>

                                <fieldset>
                                    <legend className="mb-4 text-xl tracking-tight">
                                        When do you want to start?
                                    </legend>
                                    <OptionGrid
                                        name="Timeline"
                                        options={TIMELINE_IDS}
                                        labels={TIMELINE_LABELS}
                                        value={form.timeline}
                                        onChange={(value) => update("timeline", value)}
                                    />
                                    <FieldError message={errors.timeline} />
                                </fieldset>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6">
                                <div>
                                    <legend className="mb-1 text-xl tracking-tight">
                                        How do we reach you?
                                    </legend>
                                    <p className="text-sm text-dim">
                                        Last step — then tell us about the project.
                                    </p>
                                </div>

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div>
                                        <Label htmlFor="name" className="mb-2 text-dim">
                                            Name
                                        </Label>
                                        <Input
                                            id="name"
                                            value={form.name}
                                            onChange={(e) => update("name", e.target.value)}
                                            autoComplete="name"
                                            aria-invalid={Boolean(errors.name)}
                                            className="h-12 border-line bg-surface/50"
                                        />
                                        <FieldError message={errors.name} />
                                    </div>

                                    <div>
                                        <Label htmlFor="company" className="mb-2 text-dim">
                                            Company <span className="text-faint">(optional)</span>
                                        </Label>
                                        <Input
                                            id="company"
                                            value={form.company}
                                            onChange={(e) => update("company", e.target.value)}
                                            autoComplete="organization"
                                            className="h-12 border-line bg-surface/50"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="email" className="mb-2 text-dim">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => update("email", e.target.value)}
                                        autoComplete="email"
                                        aria-invalid={Boolean(errors.email)}
                                        className="h-12 border-line bg-surface/50"
                                    />
                                    <FieldError message={errors.email} />
                                </div>

                                <div>
                                    <Label htmlFor="message" className="mb-2 text-dim">
                                        What are you trying to make happen?
                                    </Label>
                                    <Textarea
                                        id="message"
                                        rows={5}
                                        value={form.message}
                                        onChange={(e) => update("message", e.target.value)}
                                        aria-invalid={Boolean(errors.message)}
                                        className="resize-none border-line bg-surface/50"
                                        placeholder="The problem, who it's for, and anything you've already tried."
                                    />
                                    <FieldError message={errors.message} />
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {errors.form && (
                <p className="mt-6 rounded-xl border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-400">
                    {errors.form}
                </p>
            )}

            <div className="mt-10 flex items-center gap-3 border-t border-line pt-8">
                {step > 0 && (
                    <button
                        type="button"
                        onClick={() => setStep((s) => s - 1)}
                        className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm text-dim transition-colors hover:border-line-strong hover:text-text"
                    >
                        <ArrowLeft className="size-4" />
                        Back
                    </button>
                )}

                {step < STEPS.length - 1 ? (
                    <button
                        type="button"
                        onClick={next}
                        className="group ml-auto inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-medium text-ink transition-colors hover:bg-[#ffd75e]"
                    >
                        Continue
                        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </button>
                ) : (
                    <button
                        type="submit"
                        disabled={submitting}
                        className="ml-auto inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-medium text-ink transition-colors hover:bg-[#ffd75e] disabled:pointer-events-none disabled:opacity-60"
                    >
                        {submitting ? (
                            <>
                                <Loader2 className="size-4 animate-spin" />
                                Sending
                            </>
                        ) : (
                            <>
                                Send message
                                <Send className="size-4" />
                            </>
                        )}
                    </button>
                )}
            </div>
        </form>
    );
}
