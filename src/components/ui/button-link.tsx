import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * The site's one button shape: a pill. Variants map to the rules in the brand
 * book — `gold` is the single primary action per viewport, `ink` the strong
 * secondary (and the header CTA), `outline` the quiet alternative, and the
 * `*-on-ink` variants their counterparts on the dark band.
 */
export const buttonStyles = cva(
  "group inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full font-medium whitespace-nowrap transition-colors duration-300 disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        gold: "bg-gold text-ink hover:bg-gold-hover",
        ink: "bg-ink text-paper hover:bg-ink-soft",
        outline: "border border-line-strong text-ink hover:border-ink",
        "outline-on-ink": "border border-line-on-ink text-on-ink hover:border-on-ink",
      },
      size: {
        md: "h-13 px-6.5 text-[0.9375rem]",
        sm: "h-11 px-5 text-sm",
      },
    },
    defaultVariants: { variant: "gold", size: "md" },
  }
);

const ICONS = {
  "up-right": ArrowUpRight,
  right: ArrowRight,
  left: ArrowLeft,
} as const;

/** Nudge each arrow in the direction it points. */
const ICON_MOTION = {
  "up-right": "transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
  right: "transition-transform duration-300 group-hover:translate-x-0.5",
  left: "transition-transform duration-300 group-hover:-translate-x-0.5",
} as const;

type ButtonLinkProps = VariantProps<typeof buttonStyles> & {
  href: string;
  children: React.ReactNode;
  icon?: keyof typeof ICONS;
  className?: string;
  "aria-current"?: "page";
};

/**
 * A link styled as a button. Internal paths go through next/link (prefetch,
 * client navigation); mailto:, tel: and absolute URLs render a plain anchor.
 */
export function ButtonLink({
  href,
  children,
  variant,
  size,
  icon,
  className,
  ...rest
}: ButtonLinkProps) {
  const Icon = icon ? ICONS[icon] : null;
  const leading = icon === "left";
  const iconNode = Icon ? <Icon aria-hidden="true" className={ICON_MOTION[icon!]} /> : null;
  const classes = cn(buttonStyles({ variant, size }), className);
  const content = (
    <>
      {leading && iconNode}
      {children}
      {!leading && iconNode}
    </>
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      {...rest}
    >
      {content}
    </a>
  );
}
