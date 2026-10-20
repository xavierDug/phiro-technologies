import { Headline } from "@/components/ui/headline";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  accent: string;
  description?: string;
  children?: React.ReactNode;
}

/**
 * Hero for interior pages. Server-rendered with CSS entrances, so the h1 is
 * painted with the first HTML.
 */
export function PageHero({ eyebrow, title, accent, description, children }: PageHeroProps) {
  return (
    <header className="mx-auto max-w-7xl px-5 pt-16 pb-16 sm:px-10 sm:pt-28 sm:pb-20">
      <p className="eyebrow fade-up mb-8">{eyebrow}</p>
      <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-10">
        <h1
          className="fade-up max-w-[13ch] text-[clamp(3rem,7.4vw,6.75rem)] leading-[0.98] tracking-[-0.045em]"
          style={{ "--delay": "60ms" } as React.CSSProperties}
        >
          <Headline title={title} accent={accent} />
        </h1>
        {description && (
          <p
            className="fade-up max-w-md text-lg leading-relaxed text-muted"
            style={{ "--delay": "160ms" } as React.CSSProperties}
          >
            {description}
          </p>
        )}
      </div>
      {children}
    </header>
  );
}
