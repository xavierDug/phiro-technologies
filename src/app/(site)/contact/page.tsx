import type { Metadata } from "next";

import { ContactPanel } from "@/components/sections/contact-panel";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us what you're building. We reply to every enquiry within one business day.",
};

export default function ContactPage() {
  return <ContactPanel />;
}
