import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PrelineScriptWrapper from '@/components/PrelineScriptWrapper';
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: "Phiro Technologies",
  description: "Purpose, engineered.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <Navbar />
      <body className="font-sans">
        {children}
      </body>
      <PrelineScriptWrapper />
    </html>
  );
}
