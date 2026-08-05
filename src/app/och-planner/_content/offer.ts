import type { FixedTierId } from "@/server/leads/lead.dto";

/**
 * All OCH Planner offer copy and campaign constants.
 *
 * This file is the drop-in point for the outstanding assets checklist. Every
 * value still waiting on you is marked TODO below — nothing else in the page
 * needs editing when the real ones arrive.
 *
 * Still outstanding:
 *   - Hero headline (echo the cold email) → HERO
 *
 * Done: demo URL/screenshot, contact email/phone, logo (och-logo.tsx),
 * OCH Planner brand blue (och-planner.css).
 */

// --- Money. Stated on the page, before signup, on purpose. -------------------

export const PRICING = {
    /** Recurring hosting. Named on the page rather than discovered later. */
    hostingMonthly: 39,
    /** Flat fee per change round beyond the included one. */
    revisionFee: 200,
    /** Revision rounds bundled into the build price. */
    includedRevisionRounds: 1,
} as const;

// --- Contact ----------------------------------------------------------------

export const CONTACT = {
    /**
     * TODO(open item): confirm the real inbox. Used by the Custom tier CTA,
     * which is deliberately a mailto and NOT the lead form.
     */
    email: "contact@phirotechnologies.com",
    /** TODO(open item): set or leave null to hide the phone line entirely. */
    phone: "+1 (514) 519-0053" as string | null,
} as const;

// --- Demo showcase ----------------------------------------------------------

export const DEMO = {
    /** TODO(open item): the live demo built with the builder. */
    url: "https://test-autoshop.vercel.app/",
    /** Label shown in the browser chrome of the mockup. */
    displayUrl: "test-autoshop.vercel.app",
    /** TODO(open item): replace with a fresh screenshot of the demo site. */
    screenshot: "/Demo.png",
} as const;

// --- Hero -------------------------------------------------------------------

export const HERO = {
    eyebrow: "For independent garages and auto shops",
    /**
     * TODO(open item): rewrite to echo the cold email's opening line once that
     * copy is remade. Continuity between the email and this headline is what
     * keeps a cold click from bouncing.
     */
    headline: "Your shop deserves a website that actually brings in work.",
    subhead:
        "We build it for you — no meetings, no software to learn, no drag-and-drop. Send us your details, we draft the site, you review it. Live in days, from $600.",
    primaryCta: "Get my website",
    secondaryCta: "See a real one",
} as const;

// --- Tiers ------------------------------------------------------------------

export interface FixedTier {
    id: FixedTierId;
    name: string;
    price: string;
    tagline: string;
    features: string[];
    featured: boolean;
}

/**
 * The two tiers that enter the automated funnel. Custom is NOT here — it is a
 * separate shape with a separate contact path, because it needs human scoping
 * by definition and routing it through the lead form would defeat the intake.
 */
export const FIXED_TIERS: FixedTier[] = [
    {
        id: "essential",
        name: "Essential",
        price: "$600",
        tagline: "For a shop that needs to exist online, properly.",
        features: [
            "One-page professional website",
            "Built mobile-first — most people find you on a phone",
            "Your services, hours, address and map",
            "Tap-to-call and tap-for-directions",
            "Set up to be found on Google",
            `${PRICING.includedRevisionRounds} round of revisions included`,
        ],
        featured: false,
    },
    {
        id: "complete",
        name: "Complete",
        price: "$1,100",
        tagline: "For a shop that wants to be found and booked.",
        features: [
            "Everything in Essential",
            "Up to 5 pages — services, about, contact and more",
            "Quote and appointment request form",
            "Photo gallery of your shop and your work",
            "Expanded search setup for your service area",
            "Priority turnaround",
        ],
        featured: true,
    },
];

export const CUSTOM_TIER = {
    name: "Custom",
    price: "Let's talk",
    tagline: "For multi-location shops, or anything with moving parts.",
    features: [
        "Multiple locations or brands",
        "Booking systems and integrations",
        "Features built specifically for how you work",
        "Scoped and quoted on a call",
    ],
    cta: "Talk to us",
    /** Says the quiet part out loud: this one is not a checkout. */
    note: "Not a package — a conversation. We'll scope it with you first.",
} as const;

// --- How it works -----------------------------------------------------------

export const STEPS = [
    {
        title: "Tell us about your shop",
        body: "One short form. Your services, your hours, your contact details. Five minutes, from your phone.",
    },
    {
        title: "We draft your site",
        body: "Our builder turns your details into a first version fast — then a human goes over every line of it before you see anything.",
    },
    {
        title: "You review it",
        body: `You look at the real site, not a mockup. Tell us what to change and we change it — ${PRICING.includedRevisionRounds} round is included.`,
    },
    {
        title: "You go live",
        body: "Domain, hosting and setup are handled on our side. Days, not months.",
    },
] as const;

// --- What's included / boundaries -------------------------------------------

export const BOUNDARIES = [
    {
        label: "In the one-time price",
        value: "Design, build and launch",
        body: `Everything listed in your package, plus ${PRICING.includedRevisionRounds} round of revisions after you see the first version.`,
    },
    {
        label: "Ongoing",
        value: `$${PRICING.hostingMonthly}/month`,
        body: "Hosting, SSL, domain management, uptime monitoring and security updates. Cancel any time.",
    },
    {
        label: "Changes later",
        value: `$${PRICING.revisionFee} flat`,
        body: "Once your included revision round is used, each further round of changes is a flat fee. No hourly billing, no surprise invoices.",
    },
] as const;

// --- FAQ --------------------------------------------------------------------

export const FAQ = [
    {
        question: "Do I need to already have a domain?",
        answer: "No. If you have one, we point it at your new site. If you don't, we register one for you and set it up as part of the build.",
    },
    {
        question: "How long does it actually take?",
        answer: "Most shops are live within a week of sending us their details. The slow part is usually waiting on photos, not the build.",
    },
    {
        question: "What do I have to provide?",
        answer: "Your business name, the services you offer, your hours, your contact details, and any photos you already have. That's it. Nothing technical on your end.",
    },
    {
        question: "What if I don't like it?",
        answer: `You get a full revision round to tell us what's wrong, and we fix it. After that, further rounds of changes are $${PRICING.revisionFee} flat, so you always know the cost before you ask.`,
    },
    {
        question: "Can I change things down the road?",
        answer: `Yes. Changes are $${PRICING.revisionFee} per round, quoted before we start, so nothing lands on an invoice you didn't agree to.`,
    },
    {
        question: "Who's actually building this?",
        answer: "Phiro Technologies, the software studio behind OCH Planner. Real people, and the same team you'll be emailing after you submit the form.",
    },
] as const;
