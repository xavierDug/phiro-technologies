import { OchLogo } from "./och-logo";

/**
 * OCH Planner leads the chrome. The recipient just saw "OCH Planner" in the
 * email — the page has to match that on arrival or the trust breaks. Phiro's
 * credential lives in the footer instead of competing here.
 */
export function OchHeader() {
    return (
        <header className="sticky top-0 z-50 border-b border-[var(--och-line)] bg-[var(--och-ink)]/85 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
                <OchLogo />

                <a
                    href="#start"
                    className="rounded-full bg-[var(--och-blue)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--och-blue-bright)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--och-blue-bright)] sm:px-5"
                >
                    Get started
                </a>
            </div>
        </header>
    );
}
