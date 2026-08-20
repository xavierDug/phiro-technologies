"use client";

import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import ScrollVelocity from "@/components/ui/ScrollVelocity";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { contactDetails, navLinks } from "@/content/site";
import { projects } from "@/content/projects";

export function Footer() {
  const year = new Date().getFullYear();

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
              Let&apos;s build something{" "}
              <span className="accent-serif">worth keeping</span>.
            </h2>
            <Link
              href="/contact"
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-[#ffd75e]"
            >
              Start a project
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <nav aria-label="Site">
            <p className="eyebrow mb-5">Site</p>
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

          <nav aria-label="Selected work">
            <p className="eyebrow mb-5">Work</p>
            <ul className="space-y-3">
              {projects.slice(0, 4).map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-sm text-dim transition-colors hover:text-gold"
                  >
                    {project.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow mb-5">Contact</p>
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
              <li className="inline-flex items-center gap-2">
                <MapPin className="size-4 shrink-0" />
                {contactDetails.location}
              </li>
            </ul>
            <div className="mt-6 flex gap-3">
              {/* TODO(content): point these at the real profiles. */}
              <a
                href="https://github.com"
                aria-label="GitHub"
                target="_blank"
                rel="noreferrer noopener"
                className="grid size-9 place-items-center rounded-full border border-line text-dim transition-colors hover:border-gold hover:text-gold"
              >
                <FaGithub className="size-4" />
              </a>
              <a
                href="https://linkedin.com"
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
          <p>© {year} Phiro Technologies. All rights reserved.</p>
          <p className="font-mono tracking-[0.18em] uppercase">
            Purpose, engineered
          </p>
        </div>
      </div>
    </footer>
  );
}
