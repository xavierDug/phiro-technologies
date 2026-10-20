"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { buildNavLinks } from "@/content/navigation";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";
import { ButtonLink } from "@/components/ui/button-link";
import { useLocale } from "@/components/layout/locale-provider";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { localePath, stripLocale, type Locale } from "@/lib/seo";

/**
 * Compared on the locale-free path so `/about` and `/fr/about` both light up
 * the same nav item. In-page anchors (Services) are never "current".
 */
function isActive(pathname: string, href: string) {
  if (href.includes("#")) return false;
  const path = stripLocale(pathname);
  const target = stripLocale(href);
  return target !== "/" && path.startsWith(target);
}

function Wordmark({ locale }: { locale: Locale }) {
  return (
    <Link
      href={localePath("/", locale)}
      aria-label="Phiro Technologies"
      className="group flex items-center gap-2.5"
    >
      <Image
        src="/PhiroTechnoNoText.png"
        alt=""
        width={26}
        height={26}
        priority
        className="transition-transform duration-500 ease-[var(--ease-expo)] group-hover:rotate-[18deg]"
      />
      <span className="font-display text-[1.0625rem] font-semibold tracking-[0.16em]">PHIRO</span>
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const { locale, dict } = useLocale();
  const navLinks = useMemo(() => buildNavLinks(dict, locale), [dict, locale]);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  // setState bails out when the value is unchanged, so this only re-renders
  // when the threshold is actually crossed — not on every scroll event.
  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 8));

  // The mobile menu is a modal: lock page scroll and close on Escape.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Navigating closes the menu.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header
        data-scrolled={scrolled || undefined}
        className="sticky top-0 z-50 border-b border-transparent bg-paper/85 backdrop-blur-md transition-[border-color,background-color] duration-300 data-[scrolled]:border-line data-[scrolled]:bg-paper/92"
      >
        <nav
          aria-label="Main"
          className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-6 px-5 sm:px-10"
        >
          <Wordmark locale={locale} />

          <ul className="hidden items-center gap-9 md:flex">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative py-1 text-[0.9375rem] transition-colors duration-300",
                      "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-ink after:transition-transform after:duration-300 after:ease-[var(--ease-expo)]",
                      active
                        ? "text-ink after:scale-x-100"
                        : "text-muted after:scale-x-0 hover:text-ink hover:after:scale-x-100"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-4">
            <LocaleSwitcher className="hidden sm:inline-flex" />
            <ButtonLink
              href={localePath("/contact", locale)}
              variant="ink"
              size="sm"
              className="hidden sm:inline-flex"
            >
              {dict.common.startProject}
            </ButtonLink>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={dict.nav.menu}
              aria-expanded={open}
              className="grid size-11 place-items-center rounded-full border border-line-strong md:hidden"
            >
              <Menu className="size-[18px]" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            role="dialog"
            aria-modal="true"
            aria-label={dict.nav.menu}
            className="fixed inset-0 z-[60] flex flex-col bg-paper px-5 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex h-[4.5rem] items-center justify-between">
              <Wordmark locale={locale} />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={dict.nav.close}
                autoFocus
                className="grid size-11 place-items-center rounded-full border border-line-strong"
              >
                <X className="size-[18px]" aria-hidden="true" />
              </button>
            </div>

            <ul className="mt-10 border-t border-line">
              {navLinks.map((link, i) => (
                <m.li
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: EASE }}
                  className="border-b border-line"
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-5 font-display text-[2.25rem] font-medium tracking-[-0.03em]"
                  >
                    {link.label}
                    <ArrowUpRight className="size-6 text-faint" aria-hidden="true" />
                  </Link>
                </m.li>
              ))}
            </ul>

            <div className="mt-auto flex flex-col gap-4 pb-10">
              <ButtonLink href={localePath("/contact", locale)} icon="up-right" className="w-full">
                {dict.common.startProject}
              </ButtonLink>
              <div className="flex justify-center">
                <LocaleSwitcher />
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
