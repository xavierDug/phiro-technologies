"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";

import { buildNavLinks } from "@/content/site";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";
import { Magnetic } from "@/components/layout/magnetic";
import { useLocale } from "@/components/layout/locale-provider";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { localePath, stripLocale } from "@/lib/seo";

/**
 * Compared on the locale-free path so `/about` and `/fr/about` both light up
 * the same nav item.
 */
function isActive(pathname: string, href: string) {
  const path = stripLocale(pathname);
  const target = stripLocale(href);
  if (target === "/") return path === "/";
  return path.startsWith(target);
}

export function Navbar() {
  const pathname = usePathname();
  const { locale, dict } = useLocale();
  // Memoised so it keeps a stable identity across renders — the measuring
  // effect below lists it as a dependency.
  const navLinks = useMemo(() => buildNavLinks(dict, locale), [dict, locale]);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  const listRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState({ x: 0, width: 0, height: 0 });
  // First paint positions the indicator with no animation; later moves spring.
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    function measure() {
      const list = listRef.current;
      const activeLink = navLinks.find((link) => isActive(pathname, link.href));
      const node = activeLink ? linkRefs.current[activeLink.href] : null;

      if (!list || !node) {
        setIndicator((prev) => ({ ...prev, width: 0 }));
        return;
      }

      const listBox = list.getBoundingClientRect();
      const box = node.getBoundingClientRect();
      setIndicator({
        x: box.left - listBox.left,
        width: box.width,
        height: box.height,
      });
    }

    measure();
    setReady(true);

    // The bar resizes on scroll, so the indicator has to re-measure with it.
    const observer = new ResizeObserver(measure);
    if (listRef.current) observer.observe(listRef.current);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pathname, navLinks]);

  // The bar contracts once you leave the hero, so the WebGL background reads
  // cleanly on load but the nav gains a solid backing while you read.
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <motion.nav
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className={cn(
            // max-width has to be in the transition list too — without it the
            // shrink-on-scroll jumped instantly while everything else eased.
            "mx-auto flex items-center justify-between rounded-full border transition-[max-width,background-color,border-color,padding,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            scrolled
              ? "max-w-4xl border-line-strong bg-ink/70 px-3 py-2 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.9)] backdrop-blur-xl"
              : "max-w-6xl border-line bg-white/[0.03] px-4 py-3 backdrop-blur-md"
          )}
        >
          <Link
            href={localePath("/", locale)}
            aria-label={`Phiro Technologies — ${dict.nav.home}`}
            className="group flex items-center gap-2.5 pl-1"
          >
            <Image
              src="/PhiroTechnoNoText.png"
              alt=""
              width={28}
              height={32}
              priority
              className="transition-transform duration-500 group-hover:rotate-[18deg]"
            />
            <span className="font-display text-lg tracking-[0.14em] text-text">
              PHIRO
            </span>
          </Link>

          <div ref={listRef} className="relative hidden items-center gap-1 md:flex">
            {/* One persistent indicator measured against the active link, rather
                than a `layoutId` pill that mounts inside it. On navigation the
                page scrolls to top, which resizes this bar in the same frame the
                active link changes — a layoutId element caught between two
                simultaneous layout changes visibly snapped in from below.
                Measuring instead means the resize is just another input. */}
            <motion.span
              aria-hidden="true"
              className="absolute left-0 top-0 rounded-full bg-white/[0.07] ring-1 ring-inset ring-white/10"
              initial={false}
              animate={indicator}
              transition={
                ready
                  ? { type: "spring", stiffness: 400, damping: 34, mass: 0.7 }
                  : { duration: 0 }
              }
              style={{ opacity: indicator.width ? 1 : 0 }}
            />

            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  ref={(node) => {
                    linkRefs.current[link.href] = node;
                  }}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative z-10 rounded-full px-4 py-2 text-sm transition-colors duration-300",
                    active ? "text-text" : "text-dim hover:text-text"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <LocaleSwitcher className="hidden sm:inline-block" />
            <Magnetic className="hidden md:block">
              <Link
                href={localePath("/contact", locale)}
                className="group inline-flex items-center gap-1.5 rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-[#ffd75e]"
              >
                {dict.common.startProject}
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Magnetic>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={dict.nav.menu}
              className="grid size-10 place-items-center rounded-full border border-line text-text md:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </motion.nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] md:hidden"
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-ink/90 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />

            <motion.div
              variants={{
                hidden: { opacity: 0, y: -12 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease: EASE }}
              className="relative flex h-full flex-col px-6 pt-8"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-lg tracking-[0.14em]">PHIRO</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={dict.nav.close}
                  className="grid size-10 place-items-center rounded-full border border-line"
                >
                  <X className="size-5" />
                </button>
              </div>

              <nav className="mt-16 flex flex-col">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: EASE }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block border-b border-line py-5 font-display text-4xl tracking-tight transition-colors",
                        isActive(pathname, link.href) ? "text-gold" : "text-text"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36, duration: 0.5, ease: EASE }}
                className="mt-auto pb-10"
              >
                <Link
                  href={localePath("/contact", locale)}
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gold py-4 font-medium text-ink"
                >
                  {dict.common.startProject}
                  <ArrowUpRight className="size-4" />
                </Link>

                <div className="mt-6 flex justify-center">
                  <LocaleSwitcher />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
