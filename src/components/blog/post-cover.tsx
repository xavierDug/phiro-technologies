import { cn } from "@/lib/utils";

/**
 * A typographic cover for an article: the category and the title, set on the
 * ink band. Used wherever a post needs a visual on the page, so every article
 * gets an on-brand cover without commissioning artwork. (The post's `cover`
 * image is still used for social cards and structured data.)
 */
export function PostCover({
  category,
  title,
  className,
  size = "md",
}: {
  category: string;
  title: string;
  className?: string;
  size?: "md" | "lg";
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative flex flex-col justify-between overflow-hidden rounded-2xl bg-ink text-on-ink",
        size === "lg" ? "p-8 sm:p-14" : "p-7 sm:p-10",
        className
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-on-ink-muted">{category}</span>
        <span className="size-2 rounded-full bg-gold" />
      </div>
      <p
        className={cn(
          "max-w-[18ch] font-display font-medium tracking-[-0.035em] text-balance",
          size === "lg" ? "text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.02]" : "text-[clamp(1.6rem,2.6vw,2.25rem)] leading-[1.05]"
        )}
      >
        {title}
      </p>
    </div>
  );
}
