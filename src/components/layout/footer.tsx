"use client";

import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

import ScrollVelocity from "@/components/ui/ScrollVelocity";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { contactDetails, buildNavLinks } from "@/content/site";
import { projects } from "@/content/projects";
import { useLocale } from "@/components/layout/locale-provider";
import { localePath, SOCIAL_PROFILES } from "@/lib/seo";

export function Footer() {
  const year = new Date().getFullYear();
  const { locale, dict } = useLocale();
  const navLinks = buildNavLinks(dict, locale);

  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink">
      <FlickeringGrid
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]"
        squareSize={3}
        gridGap={8}
        color="#f5c843"
        maxOpacity={0.12}
        flickerChance={0.08}
      />

      <div className="relative mx-auto max-w-6xl px-6 pt-24">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <h2 className="max-w-xs text-3xl">
              {dict.footer.ctaTitle}{" "}
              <span className="accent-serif">{dict.footer.ctaAccent}</span>.
            </h2>
            <Link
              href={localePath("/contact", locale)}
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-[#ffd75e]"
            >
              {dict.common.startProject}
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <nav aria-label={dict.footer.site}>
            <p className="eyebrow mb-5">{dict.footer.site}</p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-dim transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={dict.footer.work}>
            <p className="eyebrow mb-5">{dict.footer.work}</p>
            <ul className="space-y-3">
              {projects.slice(0, 4).map((project) => (
                <li key={project.slug}>
                  <Link
                    href={localePath(`/projects/${project.slug}`, locale)}
                    className="text-sm text-dim transition-colors hover:text-gold"
                  >
                    {project.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Name / Address / Phone. These strings are the ones Google matches
              against the Business Profile, so they come from BUSINESS in
              lib/seo.ts rather than being retyped here. */}
          <div>
            <p className="eyebrow mb-5">{dict.footer.contact}</p>
            <ul className="space-y-3 text-sm text-dim">
              <li>
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-gold"
                >
                  <Mail className="size-4 shrink-0" />
                  {contactDetails.email}
                </a>
              </li>
              <li>
                <a
                  href={contactDetails.phoneHref}
                  className="inline-flex items-center gap-2 transition-colors hover:text-gold"
                >
                  <Phone className="size-4 shrink-0" />
                  {contactDetails.phone}
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <MapPin className="size-4 shrink-0" />
                {contactDetails.location}
              </li>
            </ul>
            <div className="mt-6 flex gap-3">
              <a
                href={SOCIAL_PROFILES[0]}
                aria-label="LinkedIn"
                target="_blank"
                rel="noreferrer noopener"
                className="grid size-9 place-items-center rounded-full border border-line text-dim transition-colors hover:border-gold hover:text-gold"
              >
                <FaLinkedin className="size-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Oversized wordmark that reacts to scroll velocity — the last thing
            you see, and the only place the brand is set this large. */}
        <div className="mt-24 select-none" aria-hidden="true">
          <ScrollVelocity
            texts={["PHIRO TECHNOLOGIES —", "PURPOSE, ENGINEERED —"]}
            velocity={40}
            numCopies={6}
            className="font-display text-[clamp(3rem,10vw,8rem)] leading-none tracking-tight text-white/[0.06]"
            parallaxClassName="py-1"
          />
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line py-8 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} Phiro Technologies. {dict.common.allRightsReserved}
          </p>
          <p className="font-mono tracking-[0.18em] uppercase">
            {dict.common.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
