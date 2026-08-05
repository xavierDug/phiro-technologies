import Image from "next/image";

import { CONTACT } from "../_content/offer";
import { OchLogo } from "./och-logo";

/**
 * Phiro's credential lives here and only here.
 *
 * Closer to "Powered by Stripe" than a co-branded lockup: enough to register
 * that a real company stands behind this, not enough to compete with OCH
 * Planner's identity. The gold hairline is the single place Phiro's colour
 * appears on the whole page — that restraint is what makes it read as a mark of
 * credibility rather than a second brand fighting for the visitor's attention.
 */
export function OchFooter() {
    return (
        <footer className="border-t border-[var(--och-line)] px-5 py-12 sm:px-8">
            <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <OchLogo />
                    <p className="mt-3 text-[13px] text-[var(--och-text-muted)]">
                        Websites for independent garages and auto shops.
                    </p>
                </div>

                <div className="flex flex-col gap-4 sm:items-end">
                    <a
                        href="https://phirotechnologies.com"
                        className="group inline-flex items-center gap-2.5 border-b border-[var(--phiro-gold)]/45 pb-1.5 transition-colors hover:border-[var(--phiro-gold)]"
                    >
                        <Image
                            src="/PhiroTechnoNoText.png"
                            alt=""
                            width={18}
                            height={21}
                            className="opacity-80 transition-opacity group-hover:opacity-100"
                        />
                        <span className="text-[13px] text-[var(--och-text-muted)] transition-colors group-hover:text-[var(--och-text)]">
                            Built by <span className="font-medium">Phiro Technologies</span>
                        </span>
                    </a>

                    <a
                        href={`mailto:${CONTACT.email}`}
                        className="text-[13px] text-[var(--och-text-muted)] underline-offset-4 hover:text-[var(--och-text)] hover:underline"
                    >
                        {CONTACT.email}
                    </a>

                    {CONTACT.phone && (
                        <a
                            href={`tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`}
                            className="text-[13px] text-[var(--och-text-muted)] underline-offset-4 hover:text-[var(--och-text)] hover:underline"
                        >
                            {CONTACT.phone}
                        </a>
                    )}
                </div>
            </div>

            <div className="mx-auto mt-10 max-w-6xl border-t border-[var(--och-line)] pt-6">
                <p className="text-[12px] text-[var(--och-text-muted)]">
                    © {new Date().getFullYear()} Phiro Technologies. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
