import type { Metadata } from "next";
import "./globals.css";
import PrelineScriptWrapper from '@/components/PrelineScriptWrapper';
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

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
      <body className="font-sans">
        <Navbar />
        {children}
        <Footer />
      </body>
      <PrelineScriptWrapper />
    </html>
  );
}
