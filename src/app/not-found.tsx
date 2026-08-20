import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] max-w-[110vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(245,200,67,0.12),transparent)] blur-2xl"
      />

      <div className="relative text-center">
        <p className="font-display text-[clamp(6rem,20vw,12rem)] leading-none tracking-tight text-white/[0.07]">
          404
        </p>
        <h1 className="mt-2 text-3xl tracking-tight sm:text-4xl">
          This page doesn&apos;t <span className="accent-serif">exist</span>
          <span className="text-gold">.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-sm text-dim">
          The link is broken or the page moved. Neither is your fault.
        </p>
        <Link
          href="/"
          className="group mt-9 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-[#ffd75e]"
        >
          <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
          Back home
        </Link>
      </div>
    </main>
  );
}
