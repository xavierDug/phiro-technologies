"use client";

import { useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Loader2, Send } from "lucide-react";

import { buttonStyles } from "@/components/ui/button-link";
import { useLocale } from "@/components/layout/locale-provider";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";
import {
  BUDGET_IDS,
  PROJECT_TYPE_IDS,
  TIMELINE_IDS,
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

/** Step count is fixed at three; only the labels vary by locale. */
const STEP_COUNT = 3;

/** Mirrors the server validator so people are not told about mistakes late. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const FIELD =
  "h-13 w-full rounded-[10px] border border-line-strong bg-paper px-4 text-base text-ink transition-colors placeholder:text-faint focus:border-ink focus:outline-none aria-[invalid=true]:border-error";

const LEGEND = "mb-2 font-display text-[1.75rem] leading-tight font-medium tracking-[-0.02em]";

function OptionGrid<T extends string>({
  options,
  labels,
  value,
  onChange,
  name,
  columns = "sm:grid-cols-2",
}: {
  options: readonly T[];
  labels: Record<T, string>;
  value: T | "";
  onChange: (value: T) => void;
  name: string;
  columns?: string;
}) {
  return (
    <div role="radiogroup" aria-label={name} className={cn("grid gap-2.5", columns)}>
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
              "flex min-h-14 items-center justify-between gap-3 rounded-xl border px-4.5 text-left text-[0.9375rem] transition-[border-color,background-color,box-shadow] duration-200",
              selected
                ? "border-ink bg-card shadow-[inset_0_0_0_1px_var(--ink)]"
                : "border-line-strong bg-paper hover:border-ink/40"
            )}
          >
            {labels[option]}
            <span
              aria-hidden="true"
              className={cn(
                "size-[18px] shrink-0 rounded-full border transition-[border-width,border-color] duration-200",
                selected ? "border-[5px] border-ink" : "border-line-strong"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

function FieldError({ id, message }: { id?: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm text-error">
      {message}
    </p>
  );
}

export function ContactForm() {
  const { dict } = useLocale();
  const t = dict.form;
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

    if (index === 0 && !form.projectType) found.projectType = t.errors.projectType;

    if (index === 1) {
      if (!form.budget) found.budget = t.errors.budget;
      if (!form.timeline) found.timeline = t.errors.timeline;
    }

    if (index === 2) {
      if (!form.name.trim()) found.name = t.errors.name;
      if (!form.email.trim()) found.email = t.errors.emailRequired;
      else if (!EMAIL_PATTERN.test(form.email.trim())) found.email = t.errors.emailInvalid;
      if (form.message.trim().length < 10) found.message = t.errors.message;
    }

    setErrors(found);
    return Object.keys(found).length === 0;
  }

  function next() {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, STEP_COUNT - 1));
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
        setErrors(data?.errors ?? { form: t.errors.generic });
        return;
      }

      setDone(true);
    } catch {
      setErrors({ form: t.errors.network });
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <m.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        role="status"
        className="flex min-h-[520px] flex-col items-start justify-center"
      >
        <span className="grid size-14 place-items-center rounded-full bg-gold">
          <Check className="size-6" aria-hidden="true" />
        </span>
        <h2 className="mt-8 text-5xl">{t.successTitle}.</h2>
        <p className="mt-4 max-w-sm text-lg leading-relaxed text-muted">
          {t.successBody.replace("{name}", form.name.split(" ")[0])}
        </p>
      </m.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative flex min-h-[560px] flex-col">
      {/* Progress */}
      <div className="mb-10">
        <ol className="mb-3.5 flex gap-6">
          {t.steps.map((label, i) => (
            <li
              key={label}
              aria-current={i === step ? "step" : undefined}
              className={cn("text-[0.8125rem] font-medium transition-colors duration-300", i <= step ? "text-ink" : "text-faint")}
            >
              {i + 1}. {label}
            </li>
          ))}
        </ol>
        <div className="h-0.5 w-full rounded-full bg-panel">
          <m.div
            className="h-0.5 rounded-full bg-ink"
            initial={false}
            animate={{ scaleX: (step + 1) / STEP_COUNT }}
            style={{ transformOrigin: "left" }}
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

      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          {step === 0 && (
            <fieldset>
              <legend className={LEGEND}>{t.projectLegend}</legend>
              <p className="mb-7 text-[0.9375rem] text-muted">{t.projectHint}</p>
              <OptionGrid
                name={t.groupProjectType}
                options={PROJECT_TYPE_IDS}
                labels={t.projectTypes}
                value={form.projectType}
                onChange={(value) => update("projectType", value)}
              />
              <FieldError message={errors.projectType} />
            </fieldset>
          )}

          {step === 1 && (
            <div className="space-y-10">
              <fieldset>
                <legend className={LEGEND}>{t.budgetLegend}</legend>
                <p className="mb-7 text-[0.9375rem] text-muted">{t.budgetHint}</p>
                <OptionGrid
                  name={t.groupBudget}
                  options={BUDGET_IDS}
                  labels={t.budgets}
                  value={form.budget}
                  onChange={(value) => update("budget", value)}
                  columns="grid-cols-2 sm:grid-cols-3"
                />
                <FieldError message={errors.budget} />
              </fieldset>

              <fieldset>
                <legend className="mb-5 font-display text-[1.375rem] font-medium tracking-[-0.02em]">
                  {t.timelineLegend}
                </legend>
                <OptionGrid
                  name={t.groupTimeline}
                  options={TIMELINE_IDS}
                  labels={t.timelines}
                  value={form.timeline}
                  onChange={(value) => update("timeline", value)}
                />
                <FieldError message={errors.timeline} />
              </fieldset>
            </div>
          )}

          {step === 2 && (
            <fieldset className="space-y-5">
              <legend className={LEGEND}>{t.contactLegend}</legend>
              <p className="!mt-0 mb-7 text-[0.9375rem] text-muted">{t.contactHint}</p>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium">
                    {t.name}
                  </label>
                  <input
                    id="name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={FIELD}
                  />
                  <FieldError id="name-error" message={errors.name} />
                </div>
                <div>
                  <label htmlFor="company" className="mb-2 block text-sm font-medium">
                    {t.company} <span className="font-normal text-muted">{t.optional}</span>
                  </label>
                  <input
                    id="company"
                    value={form.company}
                    onChange={(e) => update("company", e.target.value)}
                    autoComplete="organization"
                    className={FIELD}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">
                  {t.email}
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={FIELD}
                />
                <FieldError id="email-error" message={errors.email} />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium">
                  {t.message}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  placeholder={t.messagePlaceholder}
                  className={cn(FIELD, "h-auto resize-none py-3.5 leading-relaxed")}
                />
                <FieldError id="message-error" message={errors.message} />
              </div>
            </fieldset>
          )}
        </m.div>
      </AnimatePresence>

      {errors.form && (
        <p role="alert" className="mt-6 rounded-xl border border-error/30 bg-error/5 px-4 py-3 text-sm text-error">
          {errors.form}
        </p>
      )}

      <div className="mt-auto flex items-center gap-3 border-t border-line pt-8">
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className={buttonStyles({ variant: "outline", size: "sm" })}
          >
            <ArrowLeft aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-0.5" />
            {t.back}
          </button>
        )}

        {step < STEP_COUNT - 1 ? (
          <button type="button" onClick={next} className={cn(buttonStyles({ variant: "ink" }), "ml-auto")}>
            {t.continue}
            <ArrowRight aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        ) : (
          <button type="submit" disabled={submitting} className={cn(buttonStyles({ variant: "gold" }), "ml-auto")}>
            {submitting ? (
              <>
                <Loader2 aria-hidden="true" className="animate-spin" />
                {t.sending}
              </>
            ) : (
              <>
                {t.send}
                <Send aria-hidden="true" />
              </>
            )}
          </button>
        )}
      </div>
    </form>
  );
}
