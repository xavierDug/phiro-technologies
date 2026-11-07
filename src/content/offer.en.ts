import type { OfferContent } from "@/content/offer";

/** English copy for `/websites`. Prices come from `OFFER_PRICES` via tokens. */
export const offerEn: OfferContent = {
  meta: {
    title: "Website packages",
    description:
      "Fixed-price websites for Montréal and South Shore businesses: from {essential}, live in about 5 business days. Clear packages, monthly hosting, no surprises.",
  },
  hero: {
    eyebrow: "Website packages · Montréal & South Shore",
    title: "A professional website, live in",
    accent: "days",
    lead: "Fixed packages, clear prices, no surprises. Designed and built by a Montréal studio.",
    book: "Book 15 minutes",
    see: "See the packages",
    glance: ["From **{essential}**", "Live in **~5 business days**", "**Fixed** price", "**{deposit}** to start"],
    glanceLabel: "At a glance",
    clientLabel: "Recent work · Members",
    desktopAlt: "Members website on desktop, designed and built by Phiro",
    phoneAlt: "Members website on a phone",
  },
  packages: {
    eyebrow: "Packages",
    title: "Three packages, fixed",
    accent: "prices",
    description: "All prices in CAD, before taxes. Delivery times start the day we receive your texts and photos.",
    recommended: "Recommended",
    quoted: "Quoted",
    items: [
      {
        id: "essential",
        name: "Essential",
        blurb: "One premium page for a business that needs to look credible, fast.",
        priceKey: "essential",
        priceNote: "CAD · before taxes",
        delivery: "About 5 business days after we receive your content.",
        features: [
          "One premium page, about 6 sections",
          "Designed mobile-first",
          "Contact form and click-to-call",
          "Local SEO basics",
          "Your domain, connected",
          "1 revision round",
        ],
        featureStyle: "check",
        cta: "Book 15 minutes",
      },
      {
        id: "standard",
        name: "Standard",
        blurb: "Up to five pages, so each of your services gets the room it needs.",
        priceKey: "standard",
        priceNote: "CAD · before taxes",
        delivery: "About 2 weeks after we receive your content.",
        features: ["Up to 5 pages", "Everything in Essential", "Visitor analytics", "2 revision rounds"],
        featureStyle: "check",
        cta: "Book 15 minutes",
        recommended: true,
      },
      {
        id: "custom",
        name: "Custom",
        blurb: "For a site that has to do more than inform.",
        priceKey: null,
        priceNote: "After a 15-minute call",
        delivery: "Timeline set together, based on scope.",
        features: ["Online booking", "Online store", "Client accounts", "Bilingual site", "Anything larger in scope"],
        featureStyle: "plus",
        cta: "Let's talk",
      },
    ],
  },
  plans: {
    eyebrow: "Monthly",
    title: "Every site needs a",
    accent: "home",
    description: "Pick one. Hosting is the minimum; Care includes hosting and adds small changes each month.",
    perMonth: "/ month",
    items: [
      { name: "Hosting", badge: "Required", priceKey: "hosting", body: "Hosting only. Your site stays online and fast." },
      {
        name: "Care",
        badge: "Includes hosting",
        priceKey: "care",
        body: "Hosting, plus up to 1 hour of changes each month: new photos, hours, prices.",
      },
    ],
  },
  extras: {
    label: "Extras",
    items: [
      { label: "Extra page", value: "{extraPage}" },
      { label: "Additional changes", value: "{hourly} / hour" },
      { label: "Bilingual version", value: "+{bilingual}", note: "of the package" },
    ],
  },
  process: {
    eyebrow: "Process",
    title: "Three steps to",
    accent: "launch",
    description: "You pay a {deposit} deposit to start and the balance at launch. Nothing goes live until you approve it.",
    steps: [
      {
        title: "A 15-minute call",
        body: "We look at your business and your current site, then pick the right package together. No obligation.",
      },
      {
        title: "Concept and content",
        body: "You send your texts, photos and logo with the deposit. We design the site and you review it.",
      },
      { title: "Launch", body: "We connect your domain and put the site live. The balance is due at launch." },
    ],
  },
  work: {
    title: "Recent work",
    seeAll: "See all projects",
  },
  faq: {
    eyebrow: "Questions",
    title: "Before you",
    accent: "ask",
    writePrompt: "Something else on your mind? Write to",
    items: [
      {
        question: "Do I need a domain name?",
        answer: "If you already own one, we connect it. If not, we help you register one in your name, so it stays yours.",
      },
      {
        question: "Who provides the texts and photos?",
        answer:
          "You do, since you know your business best. We send a short checklist of what we need, and the delivery clock starts once we have it.",
      },
      {
        question: "What counts as a revision round?",
        answer:
          "One round is one list of changes on the design we show you. Essential includes one round, Standard two. Changes beyond that are {hourly} an hour.",
      },
      {
        question: "What if we want more later?",
        answer:
          "Add pages at {extraPage} each, switch to Care for monthly changes, or ask us to quote a bigger feature like booking or a store. Your site grows from where it is.",
      },
      {
        question: "What happens if we leave?",
        answer:
          "Your domain, texts and photos are yours. Tell us, and we stop the monthly plan and help you move the site wherever you want.",
      },
      {
        question: "How does payment work?",
        answer:
          "A {deposit} deposit to start, the balance at launch. All prices are in CAD, before taxes. Monthly plans are billed each month.",
      },
    ],
  },
  booking: {
    eyebrow: "Book a call",
    title: "Fifteen minutes, then you",
    accent: "decide",
    lead: "Tell us who you are and when to call. We'll call you back within one business day to set the time. No obligation.",
    phone: "Phone",
    email: "Email",
    studio: "Studio",
    packageLegend: "Which package?",
    packageLabels: { essential: "Essential", standard: "Standard", custom: "Custom", unsure: "Not sure yet" },
    name: "Your name",
    business: "Business name",
    contact: "Phone or email",
    contactPlaceholder: "514 555-0123 or you@business.ca",
    contactHint: "Used only to set up the call.",
    windowLegend: "Best time to call",
    windowLabels: { morning: "Morning", afternoon: "Afternoon", any: "Any time" },
    message: "Anything we should know?",
    messagePlaceholder: "Your trade, your current site, a deadline…",
    optional: "optional",
    submit: "Book 15 minutes",
    sending: "Sending…",
    footnote: "We reply within one business day. Prices are in CAD, before taxes.",
    successTitle: "Thanks, {name}",
    successBody: "We'll call you within one business day to set a time. Nothing else to do for now.",
    errors: {
      name: "Tell us who we're speaking with.",
      business: "Which business is this for?",
      contactRequired: "We need a phone number or an email.",
      contactInvalid: "That doesn't look like a phone number or an email.",
      package: "Pick one, or “Not sure yet”.",
      messageLong: "Please keep it shorter.",
      server: "Something broke on our end. Call or email us instead.",
      network: "We couldn't reach the server. Check your connection and try again.",
    },
  },
};
