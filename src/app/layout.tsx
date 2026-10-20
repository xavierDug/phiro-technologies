import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter_Tight, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/seo/json-ld";
import { graph, organizationSchema } from "@/lib/schema";
import {
  DEFAULT_LOCALE,
  HREFLANG,
  OG_LOCALE,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  languageAlternates,
} from "@/lib/seo";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

/** Display face: a tight grotesk set at medium weight. Carries every headline. */
const displaySans = Inter_Tight({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-display-sans",
  display: "swap",
});

/** Used for the single italic accent word inside a headline, and pull quotes. */
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  // MUST be the host that serves 200s. The bare apex redirects to www, so
  // building canonicals on it points every crawler at a redirect and splits
  // ranking signals across two hostnames.
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Custom Software & Web Development in Montréal`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "Montréal software studio building custom SaaS platforms, web applications and marketing sites. Clean architecture, measurable performance, support past launch.",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  keywords: [
    "software development Montréal",
    "custom SaaS development",
    "web development agency Québec",
    "Next.js development",
    ".NET development",
    "agence web Montréal",
  ],
  alternates: {
    canonical: "/",
    languages: languageAlternates("/"),
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description:
      "Montréal software studio building custom SaaS platforms, web applications and marketing sites that still make sense in three years.",
    url: SITE_URL,
    locale: OG_LOCALE[DEFAULT_LOCALE],
    alternateLocale: [OG_LOCALE.fr],
    images: [
      { url: "/SeoThumbnail.png", alt: `${SITE_NAME} — ${SITE_TAGLINE}` },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description:
      "Montréal software studio building custom SaaS platforms, web applications and marketing sites.",
    images: ["/SeoThumbnail.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/PhiroTechnoNoText.png",
  },
  verification: {
    google: "Hn9NQOXHWvapap2vHQQRG1PQYfTqK4DZ8sIdApgkfFA",
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f4ef",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={HREFLANG[DEFAULT_LOCALE]}
      className={`${geist.variable} ${geistMono.variable} ${displaySans.variable} ${instrumentSerif.variable}`}
    >
      <body className="bg-paper font-sans text-ink antialiased">
        {/* The Organization node is locale-independent and carries a stable @id
            that article and breadcrumb nodes reference, so it belongs here.
            The WebSite node is emitted by SiteChrome instead — it declares
            inLanguage, which only the locale layout knows. */}
        <JsonLd data={graph(organizationSchema())} />
        {children}
      </body>
    </html>
  );
}
