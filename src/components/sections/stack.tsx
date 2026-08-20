"use client";

import type { IconType } from "react-icons";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiDotnet,
  SiNodedotjs,
  SiPostgresql,
  SiStripe,
  SiFirebase,
  SiVercel,
  SiFigma,
  SiGithub,
  SiWordpress,
} from "react-icons/si";
import { TbSql, TbBrandAzure } from "react-icons/tb";
import { PiFileCSharp } from "react-icons/pi";

import LogoLoop from "@/components/ui/LogoLoop";
import { stack } from "@/content/site";

/**
 * Maps the icon slugs in `content/site.ts` to concrete components, so the
 * content file stays free of JSX and React imports.
 */
const ICONS: Record<string, IconType> = {
  nextdotjs: SiNextdotjs,
  react: SiReact,
  typescript: SiTypescript,
  tailwindcss: SiTailwindcss,
  dotnet: SiDotnet,
  csharp: PiFileCSharp,
  nodedotjs: SiNodedotjs,
  postgresql: SiPostgresql,
  microsoftsqlserver: TbSql,
  stripe: SiStripe,
  firebase: SiFirebase,
  vercel: SiVercel,
  microsoftazure: TbBrandAzure,
  figma: SiFigma,
  github: SiGithub,
  wordpress: SiWordpress,
};

const logos = stack.map((item) => {
  const Icon = ICONS[item.icon];
  return {
    node: (
      <span className="flex items-center gap-2.5 text-dim transition-colors duration-300 hover:text-gold">
        {Icon && <Icon className="size-6" aria-hidden="true" />}
        <span className="font-mono text-xs tracking-wide whitespace-nowrap">
          {item.name}
        </span>
      </span>
    ),
    title: item.name,
    ariaLabel: item.name,
  };
});

export function Stack() {
  return (
    <section className="border-t border-line py-16">
      <div className="mx-auto max-w-6xl px-6">
        <p className="eyebrow mb-10 text-center">The tools we reach for</p>
      </div>

      <LogoLoop
        logos={logos}
        speed={44}
        logoHeight={28}
        gap={56}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="#050506"
        ariaLabel="Technologies we build with"
      />
    </section>
  );
}
