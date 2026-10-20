import type { Metadata } from "next";

import "./och-planner.css";
import { OchMotion } from "./motion";

export const metadata: Metadata = {
    title: "OCH Planner — a professional website for your garage, from $600",
    description:
        "We build and launch a professional website for your garage or auto shop. From $600 one-time, $39/month hosting. Live in days.",
    // The cold email is the only way in; nothing here should be indexed as a
    // Phiro Technologies page or compete with the main site in search.
    robots: { index: false, follow: false },
    openGraph: {
        title: "A professional website for your garage, from $600",
        description:
            "Send us your details, we draft your site, you review it. Live in days — hosting and setup handled.",
        type: "website",
    },
};

/**
 * Campaign chrome. Lives outside the (site) route group so Phiro's global
 * navigation and footer never render here — the visitor arrived expecting OCH
 * Planner and should see OCH Planner.
 */
export default function OchPlannerLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="och-scope min-h-screen antialiased">
            <OchMotion>{children}</OchMotion>
        </div>
    );
}
