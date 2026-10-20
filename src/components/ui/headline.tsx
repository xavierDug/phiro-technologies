import { cn } from "@/lib/utils";

interface HeadlineProps {
  title: string;
  accent?: string;
  titleEnd?: string;
  /** Closing mark. A period by default; "?" for a question. */
  punctuation?: string;
  /** On the dark band the accent becomes gold text instead of a highlighter. */
  onInk?: boolean;
}

/**
 * The site's one headline pattern: plain words, one serif-italic accent word,
 * closing punctuation. Rendered as inline content so the caller picks the tag
 * and size.
 */
export function Headline({ title, accent, titleEnd, punctuation = ".", onInk = false }: HeadlineProps) {
  return (
    <>
      {title}
      {accent && (
        <>
          {" "}
          <span className={onInk ? "accent-on-ink" : "accent"}>{accent}</span>
        </>
      )}
      {titleEnd}
      {punctuation}
    </>
  );
}

interface SectionHeadingProps extends HeadlineProps {
  eyebrow: string;
  description?: string;
  as?: "h1" | "h2";
  /** Display size. `page` is for interior page heroes, `section` for sections. */
  size?: "page" | "section";
  className?: string;
  /** Rendered to the right of the heading on wide screens (a link or button). */
  aside?: React.ReactNode;
}

const SIZES = {
  page: "text-[clamp(3rem,7.4vw,6.75rem)] max-w-[14ch]",
  section: "text-[clamp(2.5rem,5vw,4.5rem)] max-w-[16ch]",
} as const;

/**
 * Eyebrow, headline, optional lead, optional aside. Every section opens this
 * way, which is what makes the page read as one design.
 */
export function SectionHeading({
  eyebrow,
  description,
  as: Tag = "h2",
  size = "section",
  className,
  aside,
  ...headline
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-x-16 gap-y-8", className)}>
      <div className="min-w-0">
        <p className="eyebrow mb-6">{eyebrow}</p>
        <Tag className={SIZES[size]}>
          <Headline {...headline} />
        </Tag>
      </div>
      {description && (
        <p className="max-w-md text-lg leading-relaxed text-muted">{description}</p>
      )}
      {aside}
    </div>
  );
}
