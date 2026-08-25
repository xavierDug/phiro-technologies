"use client";

import { motion } from "motion/react";
import { Clock, Mail, MapPin } from "lucide-react";

import LightRays from "@/components/ui/LightRays";
import { NoiseTexture } from "@/components/ui/noise-texture";
import { ContactForm } from "@/components/sections/contact-form";
import { contactDetails } from "@/content/site";
import { useLocale } from "@/components/layout/locale-provider";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { EASE, fadeUp, stagger, VIEWPORT } from "@/lib/motion";

type ContactCopy = { emailLabel: string; basedIn: string; responseTime: string };

/** Built per render so the labels follow the active locale. */
const buildDirectContact = (copy: ContactCopy, responseTime: string) => [
  {
    icon: Mail,
    label: copy.emailLabel,
    value: contactDetails.email,
    href: `mailto:${contactDetails.email}`,
  },
  { icon: MapPin, label: copy.basedIn, value: contactDetails.location },
  { icon: Clock, label: copy.responseTime, value: responseTime },
];

export function ContactPanel() {
  const reduced = useReducedMotion();
  const { dict } = useLocale();
  const page = dict.sections.pages.contact;
  const directContact = buildDirectContact(
    dict.sections.contact,
    dict.common.responseTime
  );

  return (
    <section className="relative min-h-screen overflow-hidden pt-36 pb-28">
      {/* LightRays hardcodes `z-[3]` on its own root, so the whole background
          stack needs its own negative layer or the rays paint over the form.
          The fade is a mask on the wrapper rather than an overlaid gradient
          band: a fixed-height band left a visible seam once the form grew
          taller than the viewport. */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        {reduced ? (
          <div className="absolute inset-x-0 top-0 h-[70vh] bg-[radial-gradient(50%_80%_at_50%_0%,rgba(245,200,67,0.16),transparent_70%)]" />
        ) : (
          <div className="absolute inset-x-0 top-0 h-[min(90vh,900px)] [mask-image:linear-gradient(to_bottom,black_0%,black_30%,transparent_92%)]">
            <LightRays
              raysOrigin="top-center"
              raysColor="#f5c843"
              raysSpeed={0.7}
              lightSpread={1.1}
              rayLength={1.5}
              fadeDistance={1.4}
              saturation={0.9}
              followMouse
              mouseInfluence={0.08}
              noiseAmount={0.06}
              distortion={0.03}
            />
          </div>
        )}
        <NoiseTexture className="absolute inset-0 opacity-[0.035]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-2xl"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-gold/50" />
            <span className="eyebrow">{page.eyebrow}</span>
          </div>

          <h1 className="text-[clamp(2.5rem,7vw,5rem)]">
            {page.title} <span className="accent-serif">{page.accent}</span>
            <span className="text-gold">.</span>
          </h1>

          <p className="mt-7 max-w-lg text-lg leading-relaxed text-dim">
            {page.description}
          </p>
        </motion.div>

        <div className="mt-20 grid gap-16 lg:grid-cols-[1fr_300px] lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            className="rounded-3xl border border-line bg-surface/40 p-7 backdrop-blur-sm sm:p-10"
          >
            <ContactForm />
          </motion.div>

          <motion.aside
            variants={stagger(0.2, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="space-y-8 lg:sticky lg:top-32 lg:self-start"
          >
            <motion.p variants={fadeUp} className="eyebrow">
              {dict.sections.contact.reachDirectly}
            </motion.p>

            {directContact.map(({ icon: Icon, label, value, href }) => (
              <motion.div key={label} variants={fadeUp} className="flex gap-4">
                <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full border border-line text-gold">
                  <Icon className="size-4" />
                </span>
                <div>
                  <p className="text-xs text-faint">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm text-text transition-colors hover:text-gold"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm text-text">{value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-line bg-surface/50 p-6"
            >
              <p className="text-sm leading-relaxed text-dim">
                Already know exactly what you need? Skip the form and email us
                the brief — we&apos;ll come back with questions, not a template.
              </p>
            </motion.div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
