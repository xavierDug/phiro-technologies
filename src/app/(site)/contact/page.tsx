import type { Metadata } from "next";

import { buildMetadata } from "@/lib/metadata";

import { ContactPanel } from "@/components/contact/contact-panel";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Start a project with Phiro Technologies. Tell us what you're building and get a considered reply from a Montréal engineer within one business day.",
  path: "/contact",
  locale: "en",
});

export default function ContactPage() {
  return <ContactPanel locale="en" />;
}
