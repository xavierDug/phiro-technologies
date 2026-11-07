"use client";

import { useEffect, useRef, useState } from "react";
import { m } from "motion/react";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";

import { buttonStyles } from "@/components/ui/button-link";
import type { OfferContent } from "@/content/offer";
import { EASE } from "@/lib/motion";
import type { Locale } from "@/lib/seo";
import { cn } from "@/lib/utils";
import {
  CALL_WINDOW_IDS,
  OFFER_PACKAGE_IDS,
  classifyContact,
  isLeadRef,
  isOfferPackageId,
  type CallWindowId,
  type OfferPackageId,
} from "@/server/leads/offer-lead.dto";

type Copy = OfferContent["booking"];
type ErrorKey = "name" | "business" | "contact" | "package" | "message" | "form";

const REF_STORAGE_KEY = "phiro-ref";
const MAX_MESSAGE_LENGTH = 1500;

const LABEL = "mb-2.5 block text-sm text-on-ink-muted";
const FIELD =
  "block h-13 w-full rounded-xl border border-white/20 bg-transparent px-4 text-base text-on-ink transition-colors placeholder:text-on-ink-faint hover:border-white/40 focus:border-on-ink focus:outline-none aria-[invalid=true]:border-[#f97066]";

/** Reads the outreach tag once per visit; sessionStorage keeps it across in-page navigation. */
function readRef(): string | undefined {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("ref")?.toLowerCase();
    if (fromUrl && isLeadRef(fromUrl)) {
      sessionStorage.setItem(REF_STORAGE_KEY, fromUrl);
      return fromUrl;
    }
    const stored = sessionStorage.getItem(REF_STORAGE_KEY);
    return stored && isLeadRef(stored) ? stored : undefined;
  } catch {
    return undefined;
  }
}

function Chips<T extends string>({
  name,
  options,
  labels,
  prices,
  value,
  onChange,
}: {
  name: string;
  options: readonly T[];
  labels: Record<T, string>;
  prices?: Partial<Record<T, string>>;
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <label key={option} className="group/chip relative inline-flex">
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === option}
            onChange={() => onChange(option)}
            className="peer absolute inset-0 m-0 cursor-pointer opacity-0"
          />
          <span className="pointer-events-none inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-4.5 text-sm text-on-ink transition-colors duration-300 group-hover/chip:border-white/40 peer-checked:border-on-ink peer-checked:bg-on-ink peer-checked:text-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-on-ink">
            {labels[option]}
            {prices?.[option] && (
              <small className="font-mono text-xs text-on-ink-faint transition-colors group-has-[:checked]/chip:text-muted">
                {prices[option]}
              </small>
            )}
          </span>
        </label>
      ))}
    </div>
  );
}

/**
 * The booking form in the closing band. Any link with `data-package` (the
 * package cards, the hero) scrolls here natively via its #anchor; this island
 * only listens for those clicks to check the matching package and move focus
 * to the first field once the scroll has settled.
 */
export function BookingForm({
  copy,
  locale,
  prices,
}: {
  copy: Copy;
  locale: Locale;
  /** Formatted package prices, computed on the server. */
  prices: Partial<Record<OfferPackageId, string>>;
}) {
  const [pkg, setPkg] = useState<OfferPackageId>("standard");
  const [callWindow, setCallWindow] = useState<CallWindowId>("any");
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<Partial<Record<ErrorKey, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const refTag = useRef<string | undefined>(undefined);
  const nameInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    refTag.current = readRef();
  }, []);

  useEffect(() => {
    let timer: number | undefined;
    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest?.("a[data-package]");
      const value = link?.getAttribute("data-package");
      if (!isOfferPackageId(value)) return;
      setPkg(value);
      window.clearTimeout(timer);
      // After the smooth scroll; preventScroll so focus does not jump it.
      timer = window.setTimeout(() => nameInput.current?.focus({ preventScroll: true }), 700);
    }
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      window.clearTimeout(timer);
    };
  }, []);

  function clearError(key: ErrorKey) {
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function validate(): boolean {
    const found: Partial<Record<ErrorKey, string>> = {};
    if (!name.trim()) found.name = copy.errors.name;
    if (!business.trim()) found.business = copy.errors.business;
    if (!contact.trim()) found.contact = copy.errors.contactRequired;
    else if (!classifyContact(contact.trim())) found.contact = copy.errors.contactInvalid;
    if (message.length > MAX_MESSAGE_LENGTH) found.message = copy.errors.messageLong;
    setErrors(found);
    return Object.keys(found).length === 0;
  }

  /** Server errors are keys; the wording lives in the visitor's language here. */
  function fromServer(serverErrors: Partial<Record<ErrorKey, string>> | undefined) {
    const mapped: Partial<Record<ErrorKey, string>> = {};
    if (serverErrors?.name) mapped.name = copy.errors.name;
    if (serverErrors?.business) mapped.business = copy.errors.business;
    if (serverErrors?.contact)
      mapped.contact = serverErrors.contact === "invalid" ? copy.errors.contactInvalid : copy.errors.contactRequired;
    if (serverErrors?.package) mapped.package = copy.errors.package;
    if (serverErrors?.message) mapped.message = copy.errors.messageLong;
    if (Object.keys(mapped).length === 0) mapped.form = copy.errors.server;
    return mapped;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/leads/offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          business,
          contact,
          package: pkg,
          callWindow,
          message,
          ref: refTag.current,
          locale,
          website,
        }),
      });
      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        errors?: Partial<Record<ErrorKey, string>>;
      } | null;

      if (!response.ok || !data?.ok) {
        setErrors(fromServer(data?.errors));
        return;
      }
      setDone(true);
    } catch {
      setErrors({ form: copy.errors.network });
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
        className="flex min-h-[28rem] flex-col items-start justify-center rounded-[18px] border border-line-on-ink bg-white/[0.04] p-6 sm:p-10"
      >
        <span className="grid size-14 place-items-center rounded-full bg-gold text-ink">
          <Check className="size-6" aria-hidden="true" />
        </span>
        <h3 className="mt-8 text-[clamp(2rem,4vw,3rem)]">{copy.successTitle.replace("{name}", name.trim().split(" ")[0])}.</h3>
        <p className="mt-4 max-w-sm text-lg leading-relaxed text-on-ink-muted">{copy.successBody}</p>
      </m.div>
    );
  }

  const describedBy = (key: ErrorKey, extra?: string) =>
    [errors[key] ? `bk-${key}-error` : null, extra].filter(Boolean).join(" ") || undefined;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative flex flex-col gap-7 rounded-[18px] border border-line-on-ink bg-white/[0.04] p-6 sm:p-10"
    >
      {/* Honeypot: off-screen rather than display:none, which some bots skip. */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-0">
        <label htmlFor="bk-website">Website</label>
        <input id="bk-website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      <fieldset>
        <legend className={LABEL}>{copy.packageLegend}</legend>
        <Chips
          name="package"
          options={OFFER_PACKAGE_IDS}
          labels={copy.packageLabels}
          prices={prices}
          value={pkg}
          onChange={(value) => {
            setPkg(value);
            clearError("package");
          }}
        />
        {errors.package && <p className="mt-2 text-sm text-[#f97066]">{errors.package}</p>}
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="bk-name" className={LABEL}>
            {copy.name}
          </label>
          <input
            ref={nameInput}
            id="bk-name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              clearError("name");
            }}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            className={FIELD}
          />
          {errors.name && <p id="bk-name-error" className="mt-2 text-sm text-[#f97066]">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="bk-business" className={LABEL}>
            {copy.business}
          </label>
          <input
            id="bk-business"
            value={business}
            onChange={(e) => {
              setBusiness(e.target.value);
              clearError("business");
            }}
            autoComplete="organization"
            aria-invalid={Boolean(errors.business)}
            aria-describedby={describedBy("business")}
            className={FIELD}
          />
          {errors.business && <p id="bk-business-error" className="mt-2 text-sm text-[#f97066]">{errors.business}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="bk-contact" className={LABEL}>
          {copy.contact}
        </label>
        <input
          id="bk-contact"
          value={contact}
          onChange={(e) => {
            setContact(e.target.value);
            clearError("contact");
          }}
          inputMode="email"
          autoComplete="tel"
          placeholder={copy.contactPlaceholder}
          aria-invalid={Boolean(errors.contact)}
          aria-describedby={describedBy("contact", "bk-contact-hint")}
          className={FIELD}
        />
        {errors.contact ? (
          <p id="bk-contact-error" className="mt-2 text-sm text-[#f97066]">{errors.contact}</p>
        ) : null}
        <p id="bk-contact-hint" className="mt-2 text-[0.8125rem] text-on-ink-faint">
          {copy.contactHint}
        </p>
      </div>

      <fieldset>
        <legend className={LABEL}>
          {copy.windowLegend} <span className="text-on-ink-faint">· {copy.optional}</span>
        </legend>
        <Chips
          name="callWindow"
          options={CALL_WINDOW_IDS}
          labels={copy.windowLabels}
          value={callWindow}
          onChange={setCallWindow}
        />
      </fieldset>

      <div>
        <label htmlFor="bk-message" className={LABEL}>
          {copy.message} <span className="text-on-ink-faint">· {copy.optional}</span>
        </label>
        <textarea
          id="bk-message"
          rows={3}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            clearError("message");
          }}
          placeholder={copy.messagePlaceholder}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message")}
          className={cn(FIELD, "h-auto min-h-26 resize-y py-3.5 leading-relaxed")}
        />
        {errors.message && <p id="bk-message-error" className="mt-2 text-sm text-[#f97066]">{errors.message}</p>}
      </div>

      {errors.form && (
        <p role="alert" className="rounded-xl border border-[#f97066]/40 bg-[#f97066]/10 px-4 py-3 text-sm text-on-ink">
          {errors.form}
        </p>
      )}

      <div>
        <button type="submit" disabled={submitting} className={cn(buttonStyles({ variant: "gold" }), "w-full text-base")}>
          {submitting ? (
            <>
              <Loader2 aria-hidden="true" className="animate-spin" />
              {copy.sending}
            </>
          ) : (
            <>
              {copy.submit}
              <ArrowUpRight
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </>
          )}
        </button>
        <p className="mt-3.5 text-center text-[0.8125rem] leading-normal text-on-ink-faint">{copy.footnote}</p>
      </div>
    </form>
  );
}
