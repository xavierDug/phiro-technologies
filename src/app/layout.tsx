import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter_Tight, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";

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

/** Display face: tight, confident grotesk. Carries every headline. */
const displaySans = Inter_Tight({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display-sans",
  display: "swap",
});

/** Used only for the single italic accent word inside a headline. */
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://phirotechnologies.com"),
  title: {
    default: "Phiro Technologies — Purpose, Engineered",
    template: "%s — Phiro Technologies",
  },
  description:
    "We design and build smart, scalable software for the next generation of digital products.",
  openGraph: {
    type: "website",
    siteName: "Phiro Technologies",
    title: "Phiro Technologies — Purpose, Engineered",
    description:
      "We design and build smart, scalable software for the next generation of digital products.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${displaySans.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-ink text-text font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
